import mapVerses from "src/applicationLogic/mapping/mapTagsToFormattedVerse";
import { AlignedText, AlignedVerse, GreekAlignmentData } from "src/types";
import { Proskomma } from "proskomma"
import { books } from "../applicationLogic/data/newTestamentMetadata";
const VITE_APP_GET_BOOKS_FROM_REPO = import.meta.env.VITE_APP_GET_BOOKS_FROM_REPO


export interface SourceTextAccessor {
    resourceBaseURL: string;
    resourceType: string;
    resourceLanguage: string;

    parseSourceText(sourceText: string, chapter: number) : AlignedVerse[]
    getSourceText(bookName: string, chapter: number): Promise<any>
}


export class OsisEnUlbAccessor implements SourceTextAccessor {
    resourceBaseURL = "taggedOSIS/";
    resourceType: string;
    resourceLanguage: string;

    constructor(resourceType: string, resourceLanguage: string) {
        if(resourceType.toLowerCase() !== "ulb" || resourceLanguage.toLowerCase() !== "en") {
            throw new Error(`Resource type ${resourceType} and language ${resourceLanguage} is not available in OSIS`);
        }
        this.resourceType = resourceType;
        this.resourceLanguage = resourceLanguage;
    }


    async getSourceText(bookName: string, chapter: number | string): Promise<AlignedVerse[]> {
        let result: AlignedVerse[]
        var sourceText = await this.fetchSourceText(bookName);

        if(!sourceText) return []; 

        if(typeof(chapter) === "string") {
            result = this.parseSourceText(sourceText, parseInt(chapter))
        } else {
            result = this.parseSourceText(sourceText, chapter)
        }
        return result
    }


    private async fetchSourceText(bookName: string) : Promise<string | undefined> {
        try {
            let book;
            if (VITE_APP_GET_BOOKS_FROM_REPO === "true") {
                book = await fetch(
                    `http://localhost:8080/?book=${books[bookName].abbreviatedBook}&chapter=1`
                )
                return book.text()
            } else {
                book = await fetch(`${this.resourceBaseURL}${books[bookName].abbreviatedBook}.json`);
                return book.text()
            }
        } catch (error) {
            console.log(error)
            return undefined;
        }
    }


    parseSourceText(sourceText: string, chapter: number): AlignedVerse[] {
        let result: any

        let bookJSON = JSON.parse(sourceText)
        if (bookJSON === undefined) {
            return [];
        }
    
        bookJSON = bookJSON.xml.book;
        
        let targetContent : any
        if (
            bookJSON &&
            bookJSON.chapter &&
            Array.isArray(bookJSON.chapter) === false
        ) {
            targetContent = bookJSON.chapter.verse;
        } else {
            targetContent = bookJSON.chapter[chapter - 1].verse;
        }
    
        result = mapVerses(targetContent)

        let alignedVerses: AlignedVerse[] = [];

        result.forEach((osisIshVerses: any, idx: number) => {
            let verseWords = osisIshVerses.verseWords;
            
            let alignedVerseWords: AlignedText[] = [];
            let verseNum = idx;

            if(verseWords) {
                verseWords.forEach((verseWord: any) => {
                    let text = verseWord.englishWords;
                    let greekAlignmentData: GreekAlignmentData[] = []
                    
                    if(verseWord.greekWords) {
                        verseWord.greekWords.forEach((greekWord: any) => {

                            let strongs: string | undefined
                            let morph: string | undefined;

                            let greekWordData: GreekAlignmentData;

                            if(greekWord?.strongs) {
                                strongs = greekWord.strongs
                            }

                            if(greekWord.morph) {
                                morph = greekWord.morph
                            }

                            if(strongs) {
                                greekWordData = {strong: strongs, morph: morph}
                                greekAlignmentData.push(greekWordData)
                            }

                        });
                    }

                    if(verseWord.subWords) {
                        verseWord.subWords.forEach((subWord: any) => {
                            let strongs: string | undefined
                            let morph: string | undefined;

                            let greekWordData: GreekAlignmentData;

                            if(subWord?.word?.strongs) {
                                strongs = subWord?.word?.strongs
                            }

                            if(subWord?.word?.morph) {
                                morph = subWord.word.morph
                            }

                            if(strongs) {
                                greekWordData = {strong: strongs, morph: morph}
                                greekAlignmentData.push(greekWordData)
                            }
                        });
                    }

                    if(verseWord.phraseWords) {
                        verseWord.phraseWords.forEach((phraseWord: any) => {
                            let strongs: string | undefined
                            let morph: string | undefined;

                            let greekWordData: GreekAlignmentData;

                            if(phraseWord?.strongs) {
                                strongs = phraseWord.strongs
                            }

                            if(phraseWord?.morph) {
                                morph = phraseWord.morph
                            }

                            if(strongs) {
                                greekWordData = {strong: strongs, morph: morph}
                                greekAlignmentData.push(greekWordData)
                            }
                        });
                    }

                    let alignedText: AlignedText
                    if(greekAlignmentData.length === 0) {
                        alignedText = {text: text}
                    } else {
                        alignedText = {text: text, greekAlignmentData: greekAlignmentData}
                    }
                     
                    alignedVerseWords.push(alignedText);
                })
            }

            let alignedVerse : AlignedVerse = {alignedVerseText: alignedVerseWords, verseNum: verseNum + 1}
            alignedVerses.push(alignedVerse);
        });

        return alignedVerses    
    }
}



export class Door43USFMAccessor implements SourceTextAccessor {
    resourceBaseURL = `https://git.door43.org/Door43-Catalog/ru_ust/raw/branch/master/`;
    resourceType: string;
    resourceLanguage: string;

    pk = new Proskomma();

    constructor(resourceType: string, resourceLanguage: string) {
        this.resourceType = resourceType.toLowerCase();
        this.resourceLanguage = resourceLanguage.toLowerCase();
        this.resourceBaseURL = `https://git.door43.org/Door43-Catalog/${this.resourceLanguage}_${this.resourceType}/raw/branch/master/`;
    }


    async getSourceText(bookName: string, chapter: number | string): Promise<AlignedVerse[]> {

        let sourceText = await this.fetchSourceText(bookName)
        let chapterNum = typeof(chapter) === "number" ? chapter : parseInt(chapter);

        let alignedVerses : AlignedVerse[]= []
        if(sourceText) {
            this.setUpProskomma(sourceText);
            let dataQuery = this.getDataQuery(chapter);
            let usfmData = JSON.stringify(await this.getUSFMData(dataQuery));
            alignedVerses = this.parseSourceText(usfmData, chapterNum);
        }

        return alignedVerses;
    }


    private async fetchSourceText(bookName: string) : Promise<string | undefined> {
        try {
            let book;
            // TODO: handle cases where book is not available/not found
            // TODO: Probably not here, but I also need to handle cases where no greek alignment data is found. 
            book = await fetch(`${this.resourceBaseURL}${books[bookName].abbreviatedBook}.usfm`);
            return book.text()

        } catch (error) {
            return undefined;
        }
    }


    private async setUpProskomma(bookContent: string) {
        const mutation = `mutation { addDocument(` +
        `selectors: [{key: "lang", value: "eng"}, {key: "abbr", value: "${this.resourceType}"}], ` +
        `contentType: "usfm", ` +
        `content: """${bookContent}""") }`;
    
        await this.pk.gqlQuery(mutation);
    }


    private getDataQuery(chapter: string | number) {
        return `{
            documents {
                id
                cv(chapter: "${chapter}") {
                    items {
                        subType
                        payload
                    }
                }
            }
        }`
    }


    private async getUSFMData(dataQuery: string) {
        const result = await this.pk.gqlQuery(dataQuery);
        let cvData = result?.data?.documents[0]?.cv[0]?.items.filter((item: any) => 
            item.payload === "milestone/zaln" || item.subType === "wordLike" 
            || (item.payload.includes("x-strong") && item.subType === "start")
            || item.payload.includes("verse/")
        )
        return cvData; 
    }


    parseSourceText(sourceText: string, chapter: number): AlignedVerse[] {
        let alignedVerses : AlignedVerse[] = [];
        let alignedText : AlignedText[] = [];
        let alignStartCount = 0; 
        let text = "";
        let greekAlignmentData : GreekAlignmentData[] = []
        let verseNum = 1;

        let cvData = JSON.parse(sourceText);
    
        for(let i = 0; i < cvData.length; i++) {
            let attribute = cvData[i];
    
            if(attribute.subType === "start" && attribute.payload === "milestone/zaln") {
                alignStartCount++; 
            } else if(attribute.subType === "end" && attribute.payload === "milestone/zaln") {
                alignStartCount--; 
            } else if(attribute.subType === "wordLike") {
                let startingChar = text ===   "" ? "" : " "
                text += startingChar + attribute.payload;
            } else if(attribute.subType === "start" && attribute.payload.includes("x-strong")) {
                let strong = this.getStrongs(attribute.payload);
                if(strong) {
                    greekAlignmentData.push({strong: strong});
                }
            } else if(attribute.subType === "end" && attribute.payload.includes("verse/")) {
                alignedVerses.push({verseNum: verseNum, alignedVerseText: alignedText})
                verseNum++;
                alignedText = []
            }
    
            if(alignStartCount === 0 && text !== "") {
                // Push alignment text
                if(greekAlignmentData.length > 0) {
                    alignedText.push({text: text, greekAlignmentData: greekAlignmentData});
                } else {
                    alignedText.push({text: text});
                }
    
                // reset buffers
                text = "";
                greekAlignmentData = [];
            }
        }
        return alignedVerses;
    }
    

    private getStrongs(str: string) {
        const regex = /\b[Gg]\d+\b/;
        const match = str.match(regex);
        
        if (match) {
          const extracted = match[0];
          if(extracted.length > 4 && extracted.charAt(extracted.length - 1) === "0") {
            return extracted.substring(0, extracted.length - 1)
          } else {
            return undefined;
          }
        }
    }
}

