import Grid from '@mui/material/Grid';
import "../../App.css";
import { FormattedGreekWord } from '../../types';
import { useEffect, useState } from 'react';
import getGreekWord from '../../api/gwtUtils';
import mapGWTMarkdown from '../../applicationLogic/mapGWTMarkdown';
import { WordContent } from './utils/WordContent';


interface GreekWordInfoProps {
    currentGreekWord: FormattedGreekWord;
    showMoreOptions?: boolean,
};

function GreekWordInfo({currentGreekWord, showMoreOptions} : GreekWordInfoProps)
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

    greekWordsState.forEach((greekWordState, idx : number) => {
      greekWords.push(
        <WordContent wordNumber={idx} greekWordState={greekWordState} showMoreOptions={showMoreOptions}/>
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