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


interface GreekWordInfoProps {
    currentGreekWord: FormattedGreekWord;
};

function GreekWordInfo({currentGreekWord} : GreekWordInfoProps)
{
    
    const [greekWordsState, setGreekWordsState] = useState<FormattedGreekWord[]>([])

    useEffect(() => {
      (async () => {

        // TODO: discuss if I should move this to application logic folder. 
        if(greekWordsState.length !== 0) {
          greekWordsState.splice(0,greekWordsState.length)
        }

        let greekWordMarkDown = await getGreekWord(currentGreekWord.strongs);
        
        if(greekWordMarkDown !== undefined) {
          let gwtWords = await mapGWTMarkdown(greekWordMarkDown.data);
          let wordsInfo : FormattedGreekWord[] = [];
          gwtWords.forEach((gwtWord) => {
            wordsInfo.push({...currentGreekWord, ...gwtWord}); 
          })


          setGreekWordsState(wordsInfo)
        }
      })();
    }, [currentGreekWord]); 


    const greekWords : any[] = [];
    greekWordsState.forEach((greekWordState) => {
      greekWords.push(
      <>
        <Grid container spacing={0} direction="row" style={{padding:"0px"}}>
          <GreekWord greekWord={greekWordState?.gwtGreekWord} englishEquivalent={greekWordState?.text as string}/>
          <Morphology morphology={greekWordState?.morphology}/>
          <Description descriptions={greekWordState?.descriptions} />
        </Grid>
        {greekWordState?.unprocessedData ? <UnprocessedMarkdown markdown={greekWordState.unprocessedData}/> : ""}
        {greekWordState?.verseReferences ? <p className="UnprocessedMarkdown">{greekWordState?.verseReferences}</p> : ""}
        {greekWordState?.adviceForTranslators ? <UnprocessedMarkdown markdown={greekWordState.adviceForTranslators}/> : ""}
      </>
      )
    })

    return (
      <>
        {greekWords}
      </>
    )
}

export default GreekWordInfo;