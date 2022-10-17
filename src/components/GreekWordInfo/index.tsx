import Grid from '@mui/material/Grid';
import "../../App.css";
import { FormattedGreekWord } from '../../types';
import { useEffect, useState } from 'react';
import getGreekWord from '../../api/gwtUtils';
import Morphology from '../GreekWordInfo/utils/Morphology';
import Description from '../GreekWordInfo/utils/Description';
import UnprocessedMarkdown from '../GreekWordInfo/utils/UnprocessedMarkdown';
import GreekWord from '../GreekWordInfo/utils/GreekWord';
import mapGWTMarkdown from '../../applicationLogic/mapGWTMarkdown';

interface greekWord {
    currentGreekWord: FormattedGreekWord;
};

function GreekWordInfo({currentGreekWord} : greekWord)
{
    const [greekWordState, setGreekWordState] = useState<FormattedGreekWord>(currentGreekWord)
    const [unprocessedMarkdown, setUnprocessedMarkdown] = useState("");
    const [verseReferences, setVerseReferences] = useState("");
    const [adviceForTranslators, setAdviceForTranslators] = useState("");

    useEffect(() => {

      // cases to examine: 
      // "a slave" ??? (IDK)
      // "I ask" (need to ask about en_gwt folder structure)
      
      (async () => {
        let greekWordMarkDown = await getGreekWord(currentGreekWord.strongs);
        let response = await mapGWTMarkdown(greekWordMarkDown.data);

        if(greekWordMarkDown !== undefined)
        {
          let temp : FormattedGreekWord = {...currentGreekWord};

          temp.gwtGreekWord = response.gwtGreekWord;
          temp.descriptions = response.descriptions;
          temp.morphology = response.morphology;  

          if(response.verseReferences !== undefined) 
          {
            setVerseReferences(response.verseReferences);
          }
          else
          {
            setVerseReferences("");
          }

          if(response.adviceForTranslators !== undefined) 
          {
            setAdviceForTranslators(response.adviceForTranslators);
          }
          else
          {
            setAdviceForTranslators("");
          }

          if(response.unprocessed !== undefined) 
          {
            setUnprocessedMarkdown(response.unprocessed);
          }

          setGreekWordState(temp)
        }
      })();
    }, [currentGreekWord]); 


    return (
      <>
        <Grid container spacing={0} direction="row" style={{padding:"0px"}}>
          <GreekWord greekWord={greekWordState.gwtGreekWord} englishEquivalent={greekWordState.text}/>
          <Morphology morphology={greekWordState.morphology}/>
          <Description descriptions={greekWordState.descriptions} />
        </Grid>
        <UnprocessedMarkdown markdown={unprocessedMarkdown}/>
        {verseReferences !== "" ? <p className="UnprocessedMarkdown">{verseReferences}</p> : ""}
        <UnprocessedMarkdown markdown={adviceForTranslators}/>
      </>
    )
}

export default GreekWordInfo;