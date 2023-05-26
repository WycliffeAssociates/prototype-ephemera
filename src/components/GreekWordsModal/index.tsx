import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import { FormattedGreekWord } from '../../types';
import { useBookChapterParams } from '../../hooks/useBookChapterParams';
import MorphologyDialogContent from '../InformationPanel/MorphologyDialogContent';
import VerseReferenceDialogContent from '../InformationPanel/VerseReferenceDialogContent';
import { useEffect } from 'react';
import useMorphologyParams from '../../hooks/useMorphologyParams';
import { Header } from './utils/Header';
import { GreekWordsContent } from './utils/GreekWordsContent';


interface GreekWordsModalProps {
    greekWords : FormattedGreekWord[];
    open: boolean;
    onClose: () => any;
}

function GreekWordsModal({greekWords, open, onClose} : GreekWordsModalProps) {
    const {getBookChaptersParams, removeReferenceParams} = useBookChapterParams();
    const { getMorphologyParams, removeMorphologyParams } = useMorphologyParams();

    const [openVerseReferenceDialog, setOpenVerseReferenceDialog] = useState(false);
    const [refBookChapter, setRefBookChapter] = useState<any>({});
    const [openMorphologyDialog, setOpenMorphologyDialog] = useState(false);

    
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
        let params = getMorphologyParams();

        if(params.morphologyWord  !== undefined) {
            setOpenMorphologyDialog(true);
        } else {
            setOpenMorphologyDialog(false);
        }
    }, [getMorphologyParams().morphologyWord])


    function onVerseReferenceClose() {
        setOpenVerseReferenceDialog(false);
        removeReferenceParams();
    }


    function onMorphologyDialogClose() {
        setOpenMorphologyDialog(false);
        removeMorphologyParams();
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
                <Grid container style={{overflow:"hidden", maxHeight:"fit-content"}}>

                    <Header onClose={onClose} show={!openVerseReferenceDialog && !openMorphologyDialog}/>

                    <Grid 
                        item 
                        xl={12} lg={12} md={12} sm={12} xs={12} 
                        id="greekWordsModal"
                        style={{padding:"0px 0px 40px 0px"}}
                    > 
                        {openVerseReferenceDialog === false && openMorphologyDialog === false? 

                            <GreekWordsContent greekWords={greekWords} onClose={onClose}/>
                        :
                            (openVerseReferenceDialog === true) ? 
                                <VerseReferenceDialogContent 
                                    open={openVerseReferenceDialog} 
                                    onClose={onVerseReferenceClose} 
                                    refBookChapterVerse={refBookChapter} 
                                    fullScreen={true} 
                                />                                
                            :
                                <MorphologyDialogContent 
                                    open={openMorphologyDialog} 
                                    onClose={onMorphologyDialogClose} 
                                    fullScreen={true} 
                                    morphologyWord={getMorphologyParams().morphologyWord} 
                                />
                        }    
                    </Grid> 
                </Grid>
            
            </Dialog>
        </>
    )
}


export default GreekWordsModal;