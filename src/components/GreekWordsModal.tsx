import {useState} from 'react';
import GreekWordInfo from './GreekWordInfo';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import { FormattedGreekWord } from '../types';
import { VerseReferenceDialogContent } from './VerseReferenceDialogContent';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { useBookChapterParams } from '../hooks/useBookChapterParams';
import { TipsDialogContent } from './TipsDialogContent';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useEffect } from 'react';


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

    function onVerseReferenceClose() {
        setOpenVerseReferenceDialog(false);
        removeReferenceParams();
    }

    useEffect(() => {
        onVerseReferenceClose();
    }, [greekWords])


    return (
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
            >
                <Grid container>

                    {!openVerseReferenceDialog ? 
                        <>
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
                        </>
                    :
                        <></>
                    }
                    


                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}> 
                        {openVerseReferenceDialog === false ? 
                            <>
                                {greekWords !== undefined && greekWords.length > 0 ? 
                                    <>
                                        <BannerMessage greekWords={greekWords}/>
                                        {greekWords.map((data, idx) => (
                                            <div style={{borderBottom: "solid", borderColor: "#d9d9d9", overflow:"hidden"}}> 
                                                <GreekWordInfo key={idx} currentGreekWord={data} showMoreOptions={true}/>                                          
                                            </div>
                                        ))}
                                    </>
                                    
                                    :
                                    <TipsDialogContent open={true} onClose={onClose}/> 
                                }
                            </>
                        :
                            <VerseReferenceDialogContent 
                                open={openVerseReferenceDialog} 
                                onClose={onVerseReferenceClose} 
                                refBookChapterVerse={refBookChapter} 
                                fullScreen={true} 
                            /> 
                        }
                    </Grid> 
                </Grid>
            
            </Dialog>
        </>
    )
}


export default GreekWordsModal;