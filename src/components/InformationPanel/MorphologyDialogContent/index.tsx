import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Header } from './utils/Header';
import UnprocessedMarkdown from './/utils/UnprocessedMarkdown';
import { useSettings } from '../../../hooks/SettingsContext';
import { mapValidGWTSettings } from '../GreekWordInfo/utils/mapValidGWTSettings';
import { useGreekWords } from '../../../hooks/GreekWordsContext';
import { fullMorphToFileName } from '../../../applicationLogic/mapping/mapFullMorph';


interface missingReport {
    word: string,
    abbreviated: string,
    full: string,
    strongs: string,
    ogntSort: string,
}

async function reportMissingMorphology(data : missingReport) {

    try {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://wagwtfeedbackhandler.azurewebsites.net/api/MissingHandler',
            headers: {
                'Accept': '*/*',
                'User-Agent': 'GWT',
                'x-functions-key': 'LFRaycifocGWKg-97QV13FFYNxMpXop847cwTlxdgXb2AzFuQXNxbg==',
                'Content-Type': 'text/plain',
            },
            data : data
        };

        let res = await axios.request(config);
    
        console.log("report status = " + JSON.stringify(res.status));
    } catch (error) {
        console.log(error);
    }

}
  

interface MorphologyDialogContentProps {
    open: Boolean;
    onClose?: () => void;
    fullScreen?: boolean;
    morphologyWord?: string
};


export default function MorphologyDialogContent({open, onClose, fullScreen, morphologyWord} : MorphologyDialogContentProps) {

    const [morphologyWordMarkdown, setMorphologyWordMarkdown] = useState<string>();
    const { GWTSettings } = useSettings();
    let overwriteStyle : any = mapValidGWTSettings(GWTSettings);
    let { greekWords } = useGreekWords();

    function extractMorphologyFromMarkdown(markdown: string) {
        return markdown.match(/#\W([a-zA-Z]+)/) as any[];
    }


    useEffect(() => {
        if(morphologyWord !== undefined)
        {
            (async function () {
                try {
                    let fileName : string = morphologyWord;

                    if(fullMorphToFileName[fileName] !== undefined) {
                        fileName = fullMorphToFileName[fileName];
                    }
                    
                    let response = await axios.get(`https://content.bibletranslationtools.org/WycliffeAssociates/en_gwt/raw/branch/master/02_morphology_files/${fileName}.md`);
                    setMorphologyWordMarkdown(response.data);
                } catch(error) {
                    if(greekWords) {

                        let greekWord = greekWords[greekWords?.length - 1] as any;
                        let requestBody = {
                            word: greekWords[greekWords?.length - 1].text,
                            abbreviated: greekWords[greekWords?.length - 1].morph,
                            full: morphologyWord,
                            strongs: greekWords[greekWords?.length - 1].strongs,
                            ogntSort: (greekWord.OGNTsort ? greekWord.OGNTsort : greekWord.OGNTSort)+"",
                        };

                        reportMissingMorphology(requestBody);

                    }
                    
                }
            })();
        }
    }, []);



    if(open) {
      return (
        <Grid 
            container 
            direction="row" 
            style={{ overflow:"hidden", maxHeight: '90vh',}}
        >

            <Grid 
                item 
                lg={12} xl={12} md={12} sm={12} xs={12} 
                style={{ textAlign:"left", paddingLeft:"15px", paddingBottom:"50px"}}
            >
                <Grid container direction="row" >

                    
                    <Header onClose={onClose} fullScreen={fullScreen} morphologyWord={morphologyWord}/>

                    <Grid item 
                            xl={12} lg={12} md={12} sm={12} xs={12} 
                            style={{padding: "0px 40px 0px 0px", overflowY:"auto", maxHeight:"70vh"}}
                    >
                        { morphologyWordMarkdown !== undefined && fullScreen === true ? 
                            <>
                                <h3 
                                    style={{...overwriteStyle}}
                                    className='MorphlolgyDialogContent__header'
                                >
                                    {extractMorphologyFromMarkdown(morphologyWordMarkdown as string)[1]}
                                </h3>
                            </>
                            
                        :""}

                        { morphologyWordMarkdown !== undefined ? 
                            <UnprocessedMarkdown markdown={morphologyWordMarkdown}/> 
                        : <></>}
                        
                    </Grid>
                </Grid>
            </Grid>
      </Grid>
      )
    } else {
      return <></>
    }


}


