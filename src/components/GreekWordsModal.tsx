import {useState} from 'react';
import Modal from '@mui/material/Modal';
import GreekWordInfo from './GreekWordInfo';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { FormattedGreekWord } from '../types';
import GreekWordsDialog from './GreekWordsDialog';
import { VerseReferenceDialogContent } from './VerseReferenceDialogContent';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { useBookChapterParams } from '../hooks/useBookChapterParams';
import { TipsDialogContent } from './TipsDialogContent';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';



const style = {
    position: 'absolute' as 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    height: "60%",
    background: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: 24,
    p: 1,
    paddingTop: "0px",
    paddingLeft:"0px",
    outline: 'none'
};


interface GreekWordsModalProps {
    greekWords : FormattedGreekWord[];
    open: boolean;
    onClose: () => any;
}


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

function GreekWordsModal({greekWords, open, onClose} : GreekWordsModalProps) {
    const {getBookChaptersParams, removeReferenceParams} = useBookChapterParams();
    const [openVerseReferenceDialog, setOpenVerseReferenceDialog] = useState(false);
    const [refBookChapter, setRefBookChapter] = useState<any>({});
    

    function onVerseReferenceClose() {
        setOpenVerseReferenceDialog(false);
        removeReferenceParams();
    }


    return (
        <>
            {/* <Modal open={open}         
                onClose={() => onClose()}
                hideBackdrop={true}> 
                <Box sx={style}>
                    <Grid container direction="row" style={{paddingTop: "8px", height:"100%",}}>
                        <Grid item lg={1} xl={1} md={1} sm={1} xs={1} style={{height:"100%"}}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                style={{margin:"0px", paddingLeft:"4px", paddingRight:"0px", height:"40px", width:"40px"}}
                                onClick={() => onClose()}
                            >
                                <KeyboardArrowRightIcon style={{margin:"0px"}}/>
                            </IconButton>
                        </Grid>

                        <Grid item lg={10} xl={10} md={10} sm={10}  xs={10} style={{maxHeight: '89vh',overflowY: "auto", height:"100%"}}>

                            {greekWords.map((data, idx) => (
                                <GreekWordInfo key={idx} currentGreekWord={data}/>
                            ))}
                        
                        </Grid>
                    </Grid>
                </Box>
            </Modal> */}

            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
            >
                <Grid container>
                    <Grid 
                        item
                        xl={8} lg={8} md={8} sm={8} xs={8}
                    >
                        <h3 style={{float:"left", paddingLeft:"2%",}}>Greek Word Translation</h3>
                    </Grid>

                    <Grid 
                        item xl={2} lg={2} md={2} sm={2} xs={2} 
                        style={{margin: "auto",}}
                    >
                        <Button onClick={onClose} variant="outlined" style={{float:"right", border: "1px solid #E5E8EB", borderRadius: "16px", color:"#33445C", textTransform:"none",}}>
                            <ArrowBackIcon/>
                        </Button>
                    </Grid> 

                    <Grid 
                        item
                        xl={12} lg={12} md={12} sm={12} xs={12} 
                    >
                        <Divider />
                    </Grid>


                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}> 
                        {openVerseReferenceDialog === false ? 
                            <>
                                {greekWords !== undefined && greekWords.length > 0 ? 
                                    <>
                                        <BannerMessage greekWords={greekWords}/>
                                        {greekWords.map((data, idx) => (
                                            <div style={{borderBottom: "solid", borderColor: "#d9d9d9", overflow:"hidden"}}> 
                                                <GreekWordInfo key={idx} currentGreekWord={data} showMoreOptions={true}/>
                                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    {/* <Button onClick={() => setShowMore(!showMore)} variant="outlined" style={{ 
                                                                                                            float:"right", 
                                                                                                            border: "1px solid #E5E8EB", 
                                                                                                            borderRadius: "16px", 
                                                                                                            color:"#33445C", 
                                                                                                            textTransform:"none",
                                                                                                            marginRight:"15px",
                                                                                                            marginBottom:"10px"
                                                                                                        }}
                                                    >
                                                        Read {showMore ? "Less" : "More"}
                                                    </Button> */}
                                                </Grid>                                                
                                            </div>
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
            
            </Dialog>
        </>
    )
}


export default GreekWordsModal;