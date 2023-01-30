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
import { VerseReferences } from './utils/VerseReferences';


interface GreekWordInfoProps {
    currentGreekWord: FormattedGreekWord;
};

function GreekWordInfo({currentGreekWord} : GreekWordInfoProps)
{
    
    const [greekWordsState, setGreekWordsState] = useState<FormattedGreekWord[]>([])

    useEffect(() => {
      (async () => {
        let greekWordMarkDown = await getGreekWord(currentGreekWord.strongs);
        let wordsInfo : FormattedGreekWord[] = [];

        if(greekWordMarkDown !== undefined) {
          let gwtWords = await mapGWTMarkdown(greekWordMarkDown.data);
          gwtWords.forEach((gwtWord) => {
            wordsInfo.push({...currentGreekWord, ...gwtWord}); 
          })

        }
        setGreekWordsState(wordsInfo)

      })();
    }, [currentGreekWord]); 


    const greekWords : any[] = [];

    greekWordsState.forEach((greekWordState) => {
      greekWords.push(
      <div className='GreekWordContainer'>
        <Grid container spacing={0} direction="row" style={{padding:"0px"}}>
          <GreekWord greekWord={greekWordState?.gwtGreekWord} englishEquivalent={greekWordState?.text as string}/>
          <Morphology morphology={greekWordState?.morphology} abbreviatedMorphology={greekWordState.morph}/>
          <Description descriptions={greekWordState?.descriptions} />
          {greekWordState.verseReferences ? <VerseReferences references={greekWordState.verseReferences}/> : ""}
        </Grid>
        {greekWordState?.unprocessedData ? <UnprocessedMarkdown markdown={greekWordState.unprocessedData}/> : ""}
        {greekWordState?.adviceForTranslators ? <UnprocessedMarkdown markdown={greekWordState.adviceForTranslators}/> : ""}
      </div>
      )
    })

    if(greekWords.length === 0) {
      return (
        <>
          <Grid container spacing={0} direction="row" style={{padding:"0px"}}>
            <span style={{paddingTop:"50%"}}>Requested word "{currentGreekWord.text}" (with Strong number {currentGreekWord.strongs}) cannot be found.</span>
          </Grid>

        </>
      )
    } else {
      return (
        <>
          {greekWords}
        </>
      )
    }

}

export default GreekWordInfo;