import {useEffect, useState} from "react"
import Grid from '@mui/material/Grid';
import { useSettings } from '../../../hooks/SettingsContext';
import { mapValidGWTSettings } from './mapValidGWTSettings';
import { getMorphDescription } from '../../../applicationLogic/mapMorph';
import useMorphologyParams from "../../../hooks/useMorphologyParams";



interface morphologyProps {
    morphology?: string,
    abbreviatedMorphology?: string,
    showMore?: boolean,
};

function Morphology({morphology, abbreviatedMorphology, showMore} : morphologyProps) {
    const { GWTSettings } = useSettings();
    let overwriteStyle : any = mapValidGWTSettings(GWTSettings);
    const [morphologyLinks, setMorphologyLinks] = useState<string[]>([]);
    const { setMorphologyParams } = useMorphologyParams();

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
                {showMore === true || showMore === undefined 
                ?
                    <Grid item sm={12} xs={12}>
                        <p className="GreekWordInfoSubCategory" style={{...overwriteStyle}}>What type of word is this?</p>
                    </Grid>
                :""}
                

                <Grid item sm={12} xs={12}>

                    {showMore === true || showMore === undefined 
                    ? 
                        <p className="GreekWordInfoSubCategoryValue" style={{...overwriteStyle}}>{morphology}</p>
                    :""}
                    
                    <div style={{float:"left"}}> 
                        {morphologyLinks.map((link, idx) => {
                            if(idx != morphologyLinks.length - 1)
                            {
                                return (
                                    <> 
                                        <span
                                            className="GreekWordInfoSubCategoryValue"
                                            style={{textDecoration: "underline", cursor:"pointer", color:"blue", width:"100%", ...overwriteStyle}}
                                            onClick={() => setMorphologyParams(link.trim().toLowerCase())}
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
                                        onClick={() => setMorphologyParams(link.trim().toLowerCase())}
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