import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Header } from './utils/Header';
import UnprocessedMarkdown from './/utils/UnprocessedMarkdown';
import { useSettings } from '../../hooks/SettingsContext';
import { mapValidGWTSettings } from '../GreekWordInfo/utils/mapValidGWTSettings';

interface MorphologyDialogContentProps {
    open: Boolean;
    onClose?: () => void;
    fullScreen?: boolean;
    morphologyWord?: string
};
  

export function MorphologyDialogContent({open, onClose, fullScreen, morphologyWord} : MorphologyDialogContentProps) {

    const [morphologyWordMarkdown, setMorphologyWordMarkdown] = useState<string>();
    const { GWTSettings } = useSettings();
    let overwriteStyle : any = mapValidGWTSettings(GWTSettings);

    function extractMorphologyFromMarkdown(markdown: string) {
        return markdown.match(/#\W([a-zA-Z]+)/) as any[];
    }



    useEffect(() => {
        if(morphologyWord !== undefined)
        {
            (async function () {
                try {
                    let response = await axios.get(`https://content.bibletranslationtools.org/WycliffeAssociates/en_gwt/raw/branch/master/02_morphology_files/${morphologyWord}.md`);
                    setMorphologyWordMarkdown(response.data);
                } catch(error) {
                    console.log(error);
                }
            })();
        }
    }, []);



    if(open) {
      return (
        <Grid 
            container 
            lg={12} xl={12} md={12} sm={12} xs={12} 
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


