import {useBookChapterParams} from '../../../hooks/useBookChapterParams';
import Grid from '@mui/material/Grid';
import { mapValidGWTSettings } from './mapValidGWTSettings';
import { useSettings } from '../../../hooks/SettingsContext';


interface VerseReferencesProps {
    references: string[];
    referenceWord: string;
}

export function VerseReferences({references, referenceWord} : VerseReferencesProps) {
    const {setValidBookChapterParams} = useBookChapterParams();
    const { GWTSettings } = useSettings();
    let overwriteStyle : any = mapValidGWTSettings(GWTSettings);


    function onVerseReferenceClick(verseReference: string) {

        let referenceMatch = verseReference.match(/(\d\W){0,1}([a-zA-Z]+) (\d+):(\d+)/); 
        let verseReferenceBook =  "";
        let verseReferenceChapter = "";
        let verseReferenceVerse = "";

        if(referenceMatch) {
            verseReferenceBook = (referenceMatch[1] !== undefined ? `${referenceMatch[1]}${referenceMatch[2]}` : referenceMatch[2]);
            verseReferenceChapter = referenceMatch[3];
            verseReferenceVerse = referenceMatch[4];
        }

        setValidBookChapterParams(verseReferenceBook, verseReferenceChapter, verseReferenceVerse, referenceWord, true);
    }

    return (
        <>
            <Grid item sm={12} xs={12}>
                <p className="GreekWordInfoSubCategory" style={{...overwriteStyle}}>Where is this word used?</p>
            </Grid>

            {references.map((verseReference, idx : number) => {
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