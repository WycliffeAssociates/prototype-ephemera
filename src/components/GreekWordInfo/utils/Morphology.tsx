import {useEffect, useState} from "react"
import Grid from '@mui/material/Grid';
import { useSettings } from '../../../hooks/SettingsContext';
import { mapValidGWTSettings } from './mapValidGWTSettings';
import { getMorphDescription } from '../../../applicationLogic/mapMorph';



interface morphologyProps {
    morphology?: string,
    abbreviatedMorphology?: string
};

function Morphology({morphology, abbreviatedMorphology} : morphologyProps) {
    const { GWTSettings } = useSettings();
    let overwriteStyle : any = mapValidGWTSettings(GWTSettings);
    const [morphologyLinks, setMorphologyLinks] = useState<string[]>([]);


    useEffect(() => {
        if(abbreviatedMorphology)
            setMorphologyLinks( [...getMorphDescription(abbreviatedMorphology).split(",")]);
        else
            setMorphologyLinks([]);
    }, [abbreviatedMorphology])
    
    if(morphology !== undefined)
    {
        return (
            <>
                <Grid item sm={12} xs={12}>
                    <p className="GreekWordInfoSubCategory" style={{...overwriteStyle}}>What type of word is this?</p>
                </Grid>

                <Grid item sm={12} xs={12}>
                    <p className="GreekWordInfoSubCategoryValue" style={{...overwriteStyle}}>{morphology}</p>
                    <div style={{float:"left"}}> 
                        {morphologyLinks.map((link, idx) => {
                            if(idx != morphologyLinks.length - 1)
                            {
                                return (
                                    <> 
                                        <span
                                            className="GreekWordInfoSubCategoryValue"
                                            style={{textDecoration: "underline", cursor:"pointer", color:"blue", width:"100%", ...overwriteStyle}}
                                        >
                                            {link}
                                        </span>
                                        <span> | </span>
                                    </>
                                )
                            } else {
                                return (
                                    <span
                                        className="GreekWordInfoSubCategoryValue"
                                        style={{textDecoration: "underline", cursor:"pointer", color:"blue", width:"100%", ...overwriteStyle}}
                                    >
                                        {link}
                                    </span>
                                )  
                            }
                            
                        })}
                    </div>
                </Grid>
            </>
        )
    }
    else
    {
        return (<></>)
    }

}


export default Morphology;