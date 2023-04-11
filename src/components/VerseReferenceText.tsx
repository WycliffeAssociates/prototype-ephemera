import useChapterVerseData from "../hooks/useChapterVerseData";
import { mapValidULBSettings } from './Text/utils/mapValidULBSettings';
import { useSettings } from '../hooks/SettingsContext';


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
            <p key={`verse + ${verse.verseNum}`} className="TextContainer__Verse" style={{...verseOverwriteStyle}}><sup>{verse.verseNum}</sup> {verseWordOutput}</p>
        )
        verseOutput.push(tempVerse);
    })
    
    return (
        <div style={{padding:"0px"}}>
            {verses.length === 0 ? "Please enter a valid book / chapter" : verseOutput }
        </div>
    )

}