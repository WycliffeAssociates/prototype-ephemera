import mapVerses from "src/applicationLogic/mapping/mapTagsToFormattedVerse";
import { AlignedText, AlignedVerse, GreekAlignmentData } from "src/types"
const axios = require("axios");
const {
	books,
} = require("../applicationLogic/data/newTestamentMetadata");


export interface SourceTextAccessor {
    resourceBaseURL: string;

    parseSourceText(sourceText: string, chapter: number) : AlignedVerse[]

    getSourceText(bookName: string, chapter: number): Promise<any>
}


export class OsisEnUlbAccessor implements SourceTextAccessor {
    resourceBaseURL = "taggedOSIS/";

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

    async getSourceText(bookName: string, chapter: number): Promise<any[]> {
        let result: any
        var sourceText = await this.fetchSourceText(bookName);
        result = this.parseSourceText(sourceText, chapter)
        return result
    }


    private async fetchSourceText(bookName: string) {
        try {
            let book;
            if (process.env.REACT_APP_GET_BOOKS_FROM_REPO === "true") {
                book = await axios.get(
                    `http://localhost:8080/?book=${books[bookName].abbreviatedBook}&chapter=1`
                );
                return JSON.parse(book.data);
            } else {
                book = await fetch(`taggedOSIS/${books[bookName].abbreviatedBook}.json`);
                return book.text()
            }
        } catch (error) {
            return undefined;
        }
    }
}

