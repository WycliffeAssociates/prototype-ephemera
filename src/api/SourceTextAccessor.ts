import mapVerses from "src/applicationLogic/mapping/mapTagsToFormattedVerse";
import { AlignedText, AlignedVerse, GreekAlignmentData } from "src/types"
// const { Proskomma } = require('proskomma');
// const fse = require('fs-extra');
// const path = require('path');
const axios = require("axios");
const {
	books,
} = require("../applicationLogic/data/newTestamentMetadata");


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

                            if(phraseWord?.word?.strongs) {
                                strongs = phraseWord.word.strongs
                            }

                            if(phraseWord?.word?.morph) {
                                morph = phraseWord.word.morph
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
            if (process.env.REACT_APP_GET_BOOKS_FROM_REPO === "true") {
                book = await axios.get(
                    `http://localhost:8080/?book=${books[bookName].abbreviatedBook}&chapter=1`
                );
                return JSON.parse(book.data);
            } else {
                book = await fetch(`${this.resourceBaseURL}${books[bookName].abbreviatedBook}.json`);
                return book.text()
            }
        } catch (error) {
            return undefined;
        }
    }
}



// export class Door43USFMAccessor implements SourceTextAccessor {
//     resourceBaseURL = `https://git.door43.org/Door43-Catalog/ru_ust/raw/branch/master/`;
//     resourceType: string;
//     resourceLanguage: string;

//     // TODO: get all verses for the chapter instead of just one verse. 
//     dataQuery = 
//         `{
//             documents {
//                 id
//                 cv(chapter: "1", verses: ["1"]) {
//                     items {
//                         subType
//                         payload
//                     }
//                 }
//             }
//         }`;

//     pk = new Proskomma();

//     constructor(resourceType: string, resourceLanguage: string) {
//         this.resourceType = resourceType.toLowerCase();
//         this.resourceLanguage = resourceLanguage.toLowerCase();
//         this.resourceBaseURL = `https://git.door43.org/Door43-Catalog/${this.resourceLanguage}_${this.resourceType}/raw/branch/master/`;
//     }

//     parseSourceText(sourceText: string, chapter: number): AlignedVerse[] {
//         throw new Error("Method not implemented.");
//     }
    
//     async getSourceText(bookName: string, chapter: number | string): Promise<AlignedVerse[]> {

//         let sourceText = await this.fetchSourceText(bookName)

//         console.log("USFM accessor text")
//         console.log(sourceText);

//         if(sourceText) {
//             this.setUpProskomma(sourceText);
//             this.getUSFMData();
//             // TODO: get / parse data here
//         }

//         return []
//     }

//     private async fetchSourceText(bookName: string) : Promise<string | undefined> {
//         try {
//             let book;
//             // TODO: handle cases where book is not available/not found
//             // TODO: Probably not here, but I also need to handle cases where no greek alignment data is found. 
//             book = await fetch(`${this.resourceBaseURL}${books[bookName].abbreviatedBook}.usfm`);
//             return book.text()

//         } catch (error) {
//             return undefined;
//         }
//     }

//     private async setUpProskomma(bookContent: string) {
//         const mutation = `mutation { addDocument(` +
//         `selectors: [{key: "lang", value: "eng"}, {key: "abbr", value: "${this.resourceType}"}], ` +
//         `contentType: "usfm", ` +
//         `content: """${bookContent}""") }`;
    
//         const result = await this.pk.gqlQuery(mutation);
//         console.log(JSON.stringify(result, null, 2));
//     }

//     private async getUSFMData() {
//         const result = await this.pk.gqlQuery(this.dataQuery);
//         let cvData = result.data.documents[0].cv[0].items.filter((item: any) => 
//             item.payload === "milestone/zaln" || item.subType === "wordLike" || item.payload.includes("x-strong") 
//         )
//         console.log(JSON.stringify(cvData, null, 2));
//     }
// }

