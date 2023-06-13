import {useBookChapterParams} from '../../../../hooks/useBookChapterParams';
import Grid from '@mui/material/Grid';
import { mapValidGWTSettings } from './mapValidGWTSettings';
import { useSettings } from '../../../../hooks/SettingsContext';
import { useEffect, useState } from 'react';
import { useGreekWords } from '../../../../hooks/GreekWordsContext';


interface VerseReferencesProps {
    references: string[];
    referenceWord: string;
}

export function VerseReferences({references, referenceWord} : VerseReferencesProps) {

    const [filteredVersereferences, setFilteredVerseReferences] = useState<string[]>([])
    const { verseNumber } = useGreekWords();
    const {setValidBookChapterParams, getBookChaptersParams} = useBookChapterParams();
    const { GWTSettings } = useSettings();
    let overwriteStyle : any = mapValidGWTSettings(GWTSettings);

    useEffect(() => {
        let currentBook = getBookChaptersParams().book;
        let currentChapter = getBookChaptersParams().chapter;
        let tempVerseReferences : string[] = [];
        
        references.forEach((reference) => {

            let referenceInformation = parseVerseReferenceInformation(reference);
            let referenceBook = referenceInformation.book;
            let referenceChapter = referenceInformation.chapter;
            let referenceVerse = parseInt(referenceInformation.verse);

            if(currentBook !== referenceBook || currentChapter !== referenceChapter || referenceVerse !== verseNumber) {
                tempVerseReferences.push(reference);
            }
        })

        setFilteredVerseReferences([...tempVerseReferences]);
        
    }, [verseNumber, references, getBookChaptersParams().book]);

    function parseVerseReferenceInformation(verseReference: string) {
        let referenceMatch = verseReference.match(/(\d\W){0,1}([a-zA-Z]+) (\d+):(\d+)/); 
        let verseReferenceBook =  "";
        let verseReferenceChapter = "";
        let verseReferenceVerse = "";

        if(referenceMatch) {
            verseReferenceBook = (referenceMatch[1] !== undefined ? `${referenceMatch[1]}${referenceMatch[2]}` : referenceMatch[2]);
            verseReferenceChapter = referenceMatch[3];
            verseReferenceVerse = referenceMatch[4];
        }

        return {book: verseReferenceBook, chapter: verseReferenceChapter, verse: verseReferenceVerse};
    }

    function onVerseReferenceClick(verseReference: string) {

        let verReferenceInfo = parseVerseReferenceInformation(verseReference)

        let verseReferenceBook =  verReferenceInfo.book;
        let verseReferenceChapter = verReferenceInfo.chapter;
        let verseReferenceVerse = verReferenceInfo.verse;

        setValidBookChapterParams(verseReferenceBook, verseReferenceChapter, verseReferenceVerse, referenceWord, true);
    }

    return (
        <>
            <Grid item sm={12} xs={12}>
                <p className="GreekWordInfoSubCategory" style={{...overwriteStyle}}>Where else is this word used?</p>
            </Grid>

            {filteredVersereferences.map((verseReference, idx : number) => {
                return (
                    <p 
                        key={`reference ${idx}`}
                        className="GreekWordInfoSubCategoryValue"
                        style={{textDecoration: "underline", cursor:"pointer", color:"blue", width:"100%", ...overwriteStyle}}
                        onClick={() => onVerseReferenceClick(verseReference)}
                    >{verseReference}&nbsp;</p>
                )
            })}
        </>
    )
}