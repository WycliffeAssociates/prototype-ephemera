import useChapterVerseData from "../hooks/useChapterVerseData";
import { mapValidULBSettings } from './Text/utils/mapValidULBSettings';
import { useSettings } from '../hooks/SettingsContext';
import { useEffect } from "react";


interface VerseReferenceTextProps {
    refBook : string,
    refChapter : number,
    refVerse: string,
    refWord: string,
}

export function VerseReferenceText({ refBook, refChapter, refVerse, refWord } : VerseReferenceTextProps ) {

    const verses = useChapterVerseData(refBook, refChapter);
    const { ULBSettings } = useSettings();

    let wordOverwriteStyle : any = mapValidULBSettings(ULBSettings).wordStyles;
    let verseOverwriteStyle : any = mapValidULBSettings(ULBSettings).verseStyles;

    let verseOutput : any[] = [];

    verses.forEach((verse, verseIdx) => {
        let verseWordOutput : any[] = [];

        verse.verseWords.forEach((verseWord, wordIdx) => {
            if((verseIdx + 1) === parseInt(refVerse) && verseWord.greekWords && verseWord.greekWords[0].strongs === refWord) {
                verseWordOutput.push(<>
                    <span className="TextContainer_GreekPhrase" style={{color:"#001533CC", textDecoration:"none", fontSize: wordOverwriteStyle.fontSize}}>
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
        verseOutput.push(tempVerse);
    })
    
    useEffect(() => {
        const verseReferenceParagraph = document.getElementById(`verse-${refVerse}`);
        console.log(verseReferenceParagraph)
        //verseReferenceParagraph?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        if(verseReferenceParagraph != null && verseReferenceParagraph.parentNode != null)
        {
            let test = document.getElementById("verseReferenceContainer");
            console.log(verseReferenceParagraph.getBoundingClientRect());
            test?.scrollTo(0,verseReferenceParagraph.offsetTop - 230) // TODO: works
            // /setTimeout(() => { test?.scrollTo(0,verseReferenceParagraph.offsetTop - 230); }, 100);
            //test?.scrollTo(0,230) // TODO: works
        }
    }, [verses])
    
    return (
        <div style={{padding:"0px"}}>
            {verses.length === 0 ? "Please enter a valid book / chapter" : verseOutput }
        </div>
    )

}