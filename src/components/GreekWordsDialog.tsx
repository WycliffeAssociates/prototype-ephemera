import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GreekWordInfo from './GreekWordInfo';
import { FormattedGreekWord } from '../types'
import { TipsDialogContent } from './TipsDialogContent';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { useBookChapterParams } from '../hooks/useBookChapterParams';
import { useState, useEffect } from 'react';
import { VerseReferenceDialogContent } from './VerseReferenceDialogContent';
import Divider from '@mui/material/Divider';
import useMorphologyParams from '../hooks/useMorphologyParams';
import { MorphologyDialogContent } from './MorphologyDialogContent';


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
    const { getMorphologyParams, removeMorphologyParams } = useMorphologyParams();

    const [openVerseReferenceDialog, setOpenVerseReferenceDialog] = useState(false);
    const [refBookChapter, setRefBookChapter] = useState<any>({});
    const [openMorphologyDialog, setOpenMorphologyDialog] = useState(false);
    const [openTipsDialog, setOpenTipsDialog] = useState(false);

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
        setOpenTipsDialog(true)
    }, [getBookChaptersParams().book, getBookChaptersParams().chapter])


    useEffect(() => {
      setOpenTipsDialog(false);
      onVerseReferenceClose();
    }, [greekWords])


    useEffect(() => {
      let params = getMorphologyParams();

      if(params.morphologyWord  !== undefined) {
          setOpenMorphologyDialog(true);
      } else {
          setOpenMorphologyDialog(false);
      }
    }, [getMorphologyParams().morphologyWord])


  function onMorphologyDialogClose() {
    setOpenMorphologyDialog(false);
    removeMorphologyParams();
  }


  function onVerseReferenceClose() {
    setOpenVerseReferenceDialog(false);
    removeReferenceParams();
  }

  useEffect(() => {
    if(openMorphologyDialog || openVerseReferenceDialog) {
      setOpenTipsDialog(false);
    }
  }, [openMorphologyDialog, openVerseReferenceDialog])


  return ( 
    <>
      {openVerseReferenceDialog === false && openMorphologyDialog === false ? 
        <Grid item
              xs = {12}
              sm = {12}
              md = {12}
              lg = {12}
              xl = {12}
        >
          <BannerMessage greekWords={greekWords}/>
        </Grid>      
      :""}


      <Box 
        display={{ 
          xs: (open ? "block" : "none"), sm: (open ? "block" : "none"), 
          md:(open ? "block" : "none"), 
          lg:(open ? "block" : "none"), 
          xl:(open ? "block" : "none")
        }}
        style={{backgroundColor:"#FFFFFF;", padding:"20px 40px 0px 40px"}}
      >

        <Grid container direction="row">

          <Grid item lg={12} xl={12} md={12}>
    
            {openVerseReferenceDialog === false && openMorphologyDialog === false && openTipsDialog == false? 
              <>
                {greekWords !== undefined && greekWords.length > 0 ? 
                  <div style={{overflow:"auto", maxHeight:"72vh"}}>
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
                  </div>
                  
                :
                  <TipsDialogContent open={true} onClose={onClose}/> 
                }
              </>
            :
              <>
                <VerseReferenceDialogContent 
                    open={openVerseReferenceDialog && !openMorphologyDialog && !openTipsDialog} 
                    onClose={onVerseReferenceClose} 
                    refBookChapterVerse={refBookChapter} 
                    fullScreen={false} 
                /> 
              
                <MorphologyDialogContent 
                    open={openMorphologyDialog && !openVerseReferenceDialog && !openTipsDialog} 
                    onClose={onMorphologyDialogClose} 
                    fullScreen={false} 
                    morphologyWord={getMorphologyParams().morphologyWord} 
                />
                <TipsDialogContent open={openTipsDialog} onClose={onClose}/> 
                  {/* {openTipsDialog ? <TipsDialogContent open={openTipsDialog} onClose={onClose}/> : ""} */}
                   
              </>
            }
            


          </Grid>
        </Grid>
      </Box>
    </>
  )
}


export default GreekWordsDialog;