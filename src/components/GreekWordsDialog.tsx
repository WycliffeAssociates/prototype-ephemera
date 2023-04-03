import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GreekWordInfo from './GreekWordInfo';
import { FormattedGreekWord } from '../types'
import { TipsDialogContent } from './TipsDialogContent';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { useBookChapterParams } from '../hooks/useBookChapterParams';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { VerseReferenceDialogContent } from './VerseReferenceDialogContent';
import Divider from '@mui/material/Divider';



interface GreekWordsDialogProps {
  open: Boolean;
  onClose?: () => void;
  greekWords: FormattedGreekWord[];
};


interface GreekWordsBannerProps {
  greekWords: FormattedGreekWord[];
};



function BannerMessage({greekWords} : GreekWordsBannerProps)
{
  if(greekWords && greekWords?.length >= 4) {
    return (

      <Grid item lg={12} xl={12} md={12} sm={12} style={{backgroundColor:"#E6EEFB", width:"100%", height:"58px", display:"table"}}>

      <Grid container style={{height:"100%",}} direction={"row"} justifyContent={"flex-start"} alignItems={"center"} >
        <Grid item style={{paddingLeft:"3%",}} xl={12} lg={12} md={12} sm={12} xs={12}>
          <InfoIcon style={{verticalAlign:"middle", lineHeight:"1px", float:"left",}}/>
          <span style={{paddingLeft:"1%", float:"left",}}>There are {greekWords.length} Greek word translations</span>     
        </Grid>
      </Grid>

      </Grid>
    )
  } else {
    return <></>
  }

}


function GreekWordsDialog({open, onClose, greekWords} : GreekWordsDialogProps) {

    const {getBookChaptersParams, removeReferenceParams} = useBookChapterParams();
    const [openVerseReferenceDialog, setOpenVerseReferenceDialog] = useState(false);
    const [refBookChapter, setRefBookChapter] = useState<any>({});
    
    useEffect(() => {
       let params = getBookChaptersParams();
       let newRefBookChapter = {refBook: params.refBook, refChapter: params.refChapter, refVerse: params.refVerse, refWord: params.refWord};

       if(newRefBookChapter.refBook !== undefined && newRefBookChapter.refChapter !== undefined) {
          setOpenVerseReferenceDialog(true);
       } else {
          setOpenVerseReferenceDialog(false);
       }

       setRefBookChapter({...newRefBookChapter});
    }, [getBookChaptersParams().refBook])

    useEffect(() => {
      onVerseReferenceClose();
    }, [greekWords])


    function onVerseReferenceClose() {
      setOpenVerseReferenceDialog(false);
      removeReferenceParams();
    }


    return ( 
      <Box 
        display={{ 
          xs: (open ? "block" : "none"), sm: (open ? "block" : "none"), 
          md:(open ? "block" : "none"), 
          lg:(open ? "block" : "none"), 
          xl:(open ? "block" : "none")
        }}
        style={{height:"100%", width:"100%", backgroundColor:"#FFFFFF;"}}
      >

        <Grid container direction="row" style={{paddingTop: "8px"}}>

          <Grid item lg={12} xl={12} md={12} style={{maxHeight: '89vh', overflow: 'auto'}}>
    
            {openVerseReferenceDialog === false ? 
              <>
                {greekWords !== undefined && greekWords.length > 0 ? 
                  <>
                    <BannerMessage greekWords={greekWords}/>
                      {greekWords.map((data, idx) => (
                      <> 
                      <GreekWordInfo key={idx} currentGreekWord={data}/>
                      <Grid 
                          item
                          xl={12} lg={12} md={12} sm={12} xs={12} 
                      >
                          <Divider />
                      </Grid>
                      </>
                    ))}
                  </>
                  
                :
                  <TipsDialogContent open={true} onClose={onClose}/> 
                }
              </>
            :
              <VerseReferenceDialogContent open={openVerseReferenceDialog} onClose={onVerseReferenceClose} refBookChapterVerse={refBookChapter} /> 
            }
            


          </Grid>
        </Grid>
      </Box>
    )
}


export default GreekWordsDialog;