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
        temp.gwtGreekWord = greekWordMarkDown[0].substr(1)
        temp.description = {mainDescription: "", subDescriptions: []};

        let foundMorphology = false;
        let foundDescription = false;

        for(let i = 1; i < greekWordMarkDown.length; i++)
        {
          // console.log(greekWordMarkDown[i].search("    *"))
          if(greekWordMarkDown[i] !== "")
          {
            if(greekWordMarkDown[i].charAt(0) !== "*" && foundMorphology == false)
            {
              temp.morphology = greekWordMarkDown[i]
              foundMorphology = true;
            }
            else if(greekWordMarkDown[i].charAt(0) === "*")
            {
              temp.description.mainDescription = greekWordMarkDown[i].substr(1);
            }
            else if(greekWordMarkDown[i].search("    *") === 0)
            {
              temp.description.subDescriptions.push(greekWordMarkDown[i].replace("*", ""));
            }

          }

        }   

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
          { greekWordState.text !== "√" ? <p className="EnglishWord">{greekWordState.text}</p> : ""}
        </Grid>

        <Grid item sm={12} xs={12}>
          <p className="GreekWordInfoSubCategory">Morphology</p>
        </Grid>
        <Grid item sm={12} xs={12}>
              <p className="GreekWordInfoSubCategoryValue">{greekWordState.morphology}</p>
        </Grid>
          {greekWordState.description !== undefined ? 
            <>
              <Grid item sm={12} xs={12}>
                <p className="GreekWordInfoSubCategory">{greekWordState.description.mainDescription !== "" ? "Description" : ""}</p>
              </Grid>

              <Grid item sm={12} xs={12}>
                <ul style={{marginTop:"0px", paddingInlineStart: "25px",}}>

                    {greekWordState.description.mainDescription !== "" ? 
                      <li>
                        <p className="GreekWordInfoSubCategoryValue">{greekWordState.description.mainDescription}</p>
                      </li> 
                    : ""}


                    {greekWordState?.description.subDescriptions.length > 0 ? 
                    
                      <ul>
                         {greekWordState?.description.subDescriptions.map((description, idx) => (
                              <li>
                                <p className="GreekWordInfoSubCategoryValue"> {description}</p>
                              </li> 
                          ))}
                      </ul>
                    : ""}
                </ul>
                
              </Grid>
            </>
          
          : ""}
      </Grid>
      </>
    )
}

export default GreekWordInfo;