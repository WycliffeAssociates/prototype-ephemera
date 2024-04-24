import mapVerses from "src/applicationLogic/mapping/mapTagsToFormattedVerse";
import { AlignedText, AlignedVerse } from "src/types"
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
                    let strongs: string[] = [];
                    
                    if(verseWord.greekWords) {
                        verseWord.greekWords.forEach((greekWord: any) => {
                            if(greekWord?.strongs) {
                                strongs.push(greekWord.strongs);
                            }
                        });
                    }

                    if(verseWord.subWords) {
                        verseWord.subWords.forEach((subWord: any) => {
                            if(subWord?.word?.strongs) {
                                strongs.push(subWord.word.strongs);
                            }
                        });
                    }

                    if(verseWord.phraseWords) {
                        verseWord.phraseWords.forEach((phraseWord: any) => {
                            if(phraseWord?.word?.strongs) {
                                strongs.push(phraseWord.word.strongs);
                            }
                        });
                    }

                    let alignedText: AlignedText
                    if(strongs.length === 0) {
                        alignedText = {text: text}
                    } else {
                        alignedText = {text: text, strongs: strongs}
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

