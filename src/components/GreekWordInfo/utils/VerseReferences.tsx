import {useBookChapterParams} from '../../../hooks/useBookChapterParams';
import Grid from '@mui/material/Grid';
import { mapValidGWTSettings } from './mapValidGWTSettings';
import { useSettings } from '../../../hooks/SettingsContext';


interface VerseReferencesProps {
    references: string[];
}

export function VerseReferences({references} : VerseReferencesProps) {
    const {setValidBookChapterParams} = useBookChapterParams();
    const { GWTSettings } = useSettings();
    let overwriteStyle : any = mapValidGWTSettings(GWTSettings);


    function onVerseReferenceClick(verseReference: string) {
        let verseReferenceBook : string= "" + verseReference.match(/[a-zA-Z]+/); // TODO: update to match the fact that some books start with a number and a space. 
        let verseReferenceChapter : string= "" + verseReference.match(/\d+/);

        setValidBookChapterParams(verseReferenceBook, verseReferenceChapter, true);
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