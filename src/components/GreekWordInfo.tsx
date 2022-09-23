import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import "../App.css";
import { FormattedGreekWord } from '../types';
import { useEffect, useState } from 'react';
import { getGreekWord } from '../api/gwtUtils';

interface greekWord {
    currentGreekWord: FormattedGreekWord;
};

function GreekWordInfo({currentGreekWord} : greekWord)
{
    const [greekWordState, setGreekWordState] = useState<FormattedGreekWord>(currentGreekWord)

    useEffect(() => {

      // TODO separate this logic from the framework!
      (async () => {
        let greekWordMarkDown = await getGreekWord(currentGreekWord.strongs);
        let temp : FormattedGreekWord;
        greekWordMarkDown = await greekWordMarkDown?.data.split(/\n/);

        temp = {...currentGreekWord};
        temp.gwtGreekWord = greekWordMarkDown[0]
        setGreekWordState(temp)

        console.log(greekWordMarkDown);
      })();

    }, [currentGreekWord]); 

    return (
      <>
      <Grid container spacing={0} direction="row" style={{padding:"0px"}}>
        <Grid item sm={12} xs={12}>
          <p className="GreekWord">{greekWordState.gwtGreekWord}</p> 
        </Grid>
        <Grid item sm={12} xs={12}>
          <p className="EnglishWord">{greekWordState.text}</p> 
        </Grid>

        <Grid item sm={12} xs={12}>
          <p className="GreekWordInfoSubCategory">Morphology</p>
        </Grid>
        <Grid item sm={12} xs={12}>
              <p className="GreekWordInfoSubCategoryValue">{greekWordState.morph}</p>
        </Grid>

        {/* <Grid item sm={12} xs={12}>
        <p className="GreekWordInfoSubCategory">Description</p>
        </Grid>
        <Grid item sm={12} xs={12}>
          <ul style={{marginTop:"0px", paddingInlineStart: "25px",}}>
            {descriptions.map((description, idx) => (
                <li>
                  <p className="GreekWordInfoSubCategoryValue">{description}</p>
                </li> 
            ))}
          </ul>
        </Grid> */}
      </Grid>
      </>
    )
}

export default GreekWordInfo;