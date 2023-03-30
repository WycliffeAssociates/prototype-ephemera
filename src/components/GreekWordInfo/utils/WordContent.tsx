import { useEffect, useState } from 'react';
import { FormattedGreekWord } from '../../../types';
import Grid from '@mui/material/Grid';
import GreekWord from "./GreekWord";
import Description from "./Description";
import Morphology from "./Morphology";
import { VerseReferences } from "./VerseReferences";
import UnprocessedMarkdown from "./UnprocessedMarkdown";
import Button from '@mui/material/Button';


interface WordContentProps {
    wordNumber: number,
    greekWordState: FormattedGreekWord,
    showMoreOptions?: boolean,
}

export function WordContent({wordNumber, greekWordState, showMoreOptions} : WordContentProps) {
    const [showMore, setShowMore] = useState(showMoreOptions);

    useEffect(() => {
        if(showMoreOptions === true)
        {
            setShowMore(false);
        }
    }, [])
    return (
        <div key={`greekWord ${wordNumber}`} className='GreekWordContainer'>
            <Grid container spacing={0} direction="row" style={{padding:"0px"}}>
                <GreekWord 
                    greekWord={greekWordState?.gwtGreekWord}
                />
                <Description 
                    descriptions={greekWordState?.descriptions} 
                    showMore={showMore}
                />
                <Morphology 
                    morphology={greekWordState?.morphology} 
                    abbreviatedMorphology={greekWordState.morph}
                    showMore={showMore}
                />
                {greekWordState.verseReferences && (showMore === true || showMore === undefined) ? <VerseReferences references={greekWordState.verseReferences} referenceWord={greekWordState.strongs}/> : ""} 
                
                {(showMore === true || showMore === undefined) ? 
                    <>
                        {greekWordState?.unprocessedData ? <UnprocessedMarkdown markdown={greekWordState.unprocessedData}/> : ""}
                        {greekWordState?.adviceForTranslators ? <UnprocessedMarkdown markdown={greekWordState.adviceForTranslators}/> : ""}
                    </>
                : ""}

                {showMoreOptions !== undefined ? 
                    <Button onClick={() => setShowMore(!showMore)} variant="outlined" style={{ 
                                                                                        float:"right", 
                                                                                        border: "1px solid #E5E8EB", 
                                                                                        borderRadius: "16px", 
                                                                                        color:"#33445C", 
                                                                                        textTransform:"none",
                                                                                        marginRight:"15px",
                                                                                        marginBottom:"10px",
                                                                                        marginTop:"10px",
                                                                                    }}
                    >
                        Read {showMore ? "Less" : "More"}
                    </Button>
                : ""}
                
            </Grid>
            
        </div>
    )
}