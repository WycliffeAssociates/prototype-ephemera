import useChapterVerseData from "../hooks/useChapterVerseData";
import { useSettings } from '../hooks/SettingsContext';
import { useEffect, useRef, useState } from "react";
import { NewFormattedGreekWord, NewFormattedWord, PhraseWord, SubWord } from "../types";
import { mapValidGWTSettings } from "./GreekWordInfo/utils/mapValidGWTSettings";


interface VerseReferenceTextProps {
    refBook : string,
    refChapter : number,
    refVerse: string,
    refWord: string,
}

export function VerseReferenceText({ refBook, refChapter, refVerse, refWord } : VerseReferenceTextProps ) {

    const verses = useChapterVerseData(refBook, refChapter);
    const [verseOutput, setVerseOutput] = useState<any[]>([]);
    const verseRef = useRef<HTMLSpanElement>(null);
    
    const { GWTSettings } = useSettings();
    let overwriteStyle : any = mapValidGWTSettings(GWTSettings);

    useEffect(() => {
        console.log("changing settings");
        console.log(overwriteStyle);
    }, [GWTSettings])

    function checkSubWordsForReference(subWords : SubWord[] | undefined) {
        return subWords?.map((foo) => { 
            foo.word = foo.word as NewFormattedGreekWord; 
            return foo.word.strongs;
        }).includes(refWord);
    }

    function checkGreekWordsForReference(greekWords : NewFormattedGreekWord[] | undefined) {
        return greekWords?.map((foo) => foo.strongs).includes(refWord);
    }

    function checkPhraseWordsForReference(phraseWords : PhraseWord[] | undefined) {
        return phraseWords?.map((foo) => foo.strongs).includes(refWord);
    }

    function checkForReferences(verseWord : NewFormattedWord) {
        return checkSubWordsForReference(verseWord.subWords) || checkGreekWordsForReference(verseWord.greekWords) || checkPhraseWordsForReference(verseWord.phraseWords);
    }

    useEffect(() => {
        let tempVerseOutput : any[] = [];

        verses.forEach((verse, verseIdx) => {
            let verseWordOutput : any[] = [];
    
            verse.verseWords.forEach((verseWord, wordIdx) => {
                if((verseIdx + 1) === parseInt(refVerse) && checkForReferences(verseWord)) {
                    verseWordOutput.push(<>
                        <span 
                            ref={verseRef} 
                            className="TextContainer_GreekPhrase" 
                            style={{
                                    color:"#001533CC", 
                                    textDecoration:"none", 
                                    ...overwriteStyle                                
                            }}
                        >
                            <b>{verseWord.englishWords}</b>
                        </span>
                        <span> </span>
                    </>)
                } else if(checkForReferences(verseWord)) {
                    verseWordOutput.push(<>
                        <span 
                            className="TextContainer_GreekPhrase" 
                            style={{
                                    color:"#001533CC", 
                                    textDecoration:"none", 
                                    ...overwriteStyle
                                   }}
                        >
                            <b>{verseWord.englishWords}</b>
                        </span>
                        <span> </span>
                    </>)
                } else {
                    verseWordOutput.push(<>
                        <span 
                            className="TextContainer_GreekPhrase" 
                            style={{
                                        color:"#001533CC", 
                                        textDecoration:"none", 
                                        ...overwriteStyle
                                   }}
                        >
                            {verseWord.englishWords}
                        </span>
                        <span> </span>
                    </>)
                }
    
                
            })
    
            const tempVerse = (
                <p 
                    id={`verse-${verse.verseNum}`} 
                    key={`verse + ${verse.verseNum}`} 
                    className="TextContainer__Verse" 
                    style={{...overwriteStyle}}>
                        <sup>{verse.verseNum}</sup> {verseWordOutput}
                </p>
            )
            tempVerseOutput.push(tempVerse);
        });

        setVerseOutput([...tempVerseOutput])
    }, [verses, GWTSettings])

    
    useEffect(() => {
        if(verseRef != null && verseRef.current != null)
        {                
            let scrollableParent = verseRef.current.parentNode?.parentNode as HTMLElement;
            scrollableParent.scrollTo(0,verseRef.current.offsetTop - 40)
        }
    },[verseOutput])



    return (
        <> 
            {verses.length === 0 ? "Please enter a valid book / chapter" : <>{verseOutput}</> }
        </>
    )

}