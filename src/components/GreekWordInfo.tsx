import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import "../App.css";
import { FormattedGreekWord, Description } from '../types';
import { useEffect, useState } from 'react';
import { getGreekWord } from '../api/gwtUtils';
import ReactMarkdown from 'react-markdown'

interface greekWord {
    currentGreekWord: FormattedGreekWord;
};

function GreekWordInfo({currentGreekWord} : greekWord)
{
    const [greekWordState, setGreekWordState] = useState<FormattedGreekWord>(currentGreekWord)
    const [testMD, setTestMD] = useState("");

    useEffect(() => {

      // TODO separate this logic from the framework!
      // need an array of {description: string, subDescription: string[]}
      (async () => {
        let greekWordMarkDown = await getGreekWord(currentGreekWord.strongs);

        greekWordMarkDown = await greekWordMarkDown?.data.split(/\n/) as string[];
        let temp : FormattedGreekWord = {...currentGreekWord};

        console.log(greekWordMarkDown);

        let foundDescription = false;
        let processedDescriptions = false;

        let descriptions : Description[] = [];
        let morphology = "";
        let rest = "";

        for(let i = 1; i < greekWordMarkDown.length; i++) 
        {
          if(greekWordMarkDown[i] == "\n") {
            continue;
          }

          if(greekWordMarkDown[i].charAt(0) == "*" && !processedDescriptions) {
            greekWordMarkDown[i] = greekWordMarkDown[i].replace("*", "");
            foundDescription = true;
            descriptions.push({mainDescription: greekWordMarkDown[i] as string, subDescriptions: []})
          }
          else if(greekWordMarkDown[i].search("    *") !== -1 && !processedDescriptions) {
            greekWordMarkDown[i] = greekWordMarkDown[i].replace("*", "");
            descriptions[descriptions.length - 1].subDescriptions?.push(greekWordMarkDown[i])
          }
          else if(!foundDescription) {
            morphology = morphology + greekWordMarkDown[i];
          }
          else {
            if(foundDescription) {
              processedDescriptions = true;
              rest = rest + "\n" + greekWordMarkDown[i];
            }
          }
        }

        temp.gwtGreekWord = greekWordMarkDown[0].substr(1)
        temp.descriptions = [...descriptions];
        temp.morphology = morphology;  

        console.log(rest);
        setTestMD(rest);
        setGreekWordState(temp)
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
          {greekWordState.descriptions !== undefined ? 
            <>
              <Grid item sm={12} xs={12}>
                <p className="GreekWordInfoSubCategory">Description</p>
              </Grid>

              <Grid item sm={12} xs={12}>
                <ul style={{marginTop:"0px", paddingInlineStart: "25px",}}>

                  {greekWordState.descriptions.map((description) => {
                    return (
                              <li><p className="GreekWordInfoSubCategoryValue">
                                {description.mainDescription}
                                {description?.subDescriptions?.map((subDescriptions) => {
                                  return (
                                            <ul><li><p className="GreekWordInfoSubCategoryValue">
                                              {subDescriptions}
                                            </p></li></ul>
                                          )
                                })}
                              </p></li>
                            )
                  })}
                </ul>
              </Grid>
            </>
          : ""}
      </Grid>

        {testMD !== undefined ? <ReactMarkdown children={testMD} components={{
          li: ({node, ...props}) => <li><p className="GreekWordInfoSubCategoryValue">{props.children} </p></li>
        }}/> :  ""}
      </>
    )
}

export default GreekWordInfo;