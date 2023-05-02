import useChapterVerseData from "../hooks/useChapterVerseData";
import { mapValidULBSettings } from './Text/utils/mapValidULBSettings';
import { useSettings } from '../hooks/SettingsContext';
import { useEffect, useRef, useState } from "react";


interface VerseReferenceTextProps {
    refBook : string,
    refChapter : number,
    refVerse: string,
    refWord: string,
}

export function VerseReferenceText({ refBook, refChapter, refVerse, refWord } : VerseReferenceTextProps ) {

    const verses = useChapterVerseData(refBook, refChapter);
    const { ULBSettings } = useSettings();
    const [verseOutput, setVerseOutput] = useState<any[]>([]);
    const verseRef = useRef<HTMLSpanElement>(null);

    let wordOverwriteStyle : any = mapValidULBSettings(ULBSettings).wordStyles;
    let verseOverwriteStyle : any = mapValidULBSettings(ULBSettings).verseStyles;


    useEffect(() => {
        let tempVerseOutput : any[] = [];

        verses.forEach((verse, verseIdx) => {
            let verseWordOutput : any[] = [];
    
            verse.verseWords.forEach((verseWord, wordIdx) => {
                if((verseIdx + 1) === parseInt(refVerse) && verseWord.greekWords && verseWord.greekWords[0].strongs === refWord) {
                    verseWordOutput.push(<>
                        <span ref={verseRef} className="TextContainer_GreekPhrase" style={{color:"#001533CC", textDecoration:"none", fontSize: wordOverwriteStyle.fontSize}}>
                            <b>{verseWord.englishWords}</b>
                        </span>
                        <span> </span>
                    </>)
                } else {
                    verseWordOutput.push(<>
                        <span className="TextContainer_GreekPhrase" style={{color:"#001533CC", textDecoration:"none", fontSize: wordOverwriteStyle.fontSize}}>
                            {verseWord.englishWords}
                        </span>
                        <span> </span>
                    </>)
                }
    
                
            })
    
            const tempVerse = (
                <p id={`verse-${verse.verseNum}`}key={`verse + ${verse.verseNum}`} className="TextContainer__Verse" style={{...verseOverwriteStyle}}><sup>{verse.verseNum}</sup> {verseWordOutput}</p>
            )
            tempVerseOutput.push(tempVerse);
        });

        setVerseOutput([...tempVerseOutput])
    }, [verses])

    
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