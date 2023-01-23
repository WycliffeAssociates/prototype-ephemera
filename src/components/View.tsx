import {useState, useEffect} from 'react';
import '../App.css';
import Grid from '@mui/material/Grid';
import NextChapterButton from './NextChapterButton';
import PreviousChapterButton from './PreviousChapterButton';
import TextView from "./TextView";
import GreekWordsDialog from './GreekWordsDialog';
import GreekWordsModal from './GreekWordsModal';
import useWindowSize from '../hooks/useWindowSize';
import { useGreekWords } from '../hooks/GreekWordsContext';

export function View() {
    const [textViewSize, setTextViewSize] = useState<number>(12);
    const windowSize = useWindowSize([]);
    const {greekWords, showGreekWords, setShowGreekWords} = useGreekWords();
    const [greekTextDialogOpen, setGreekTextDialogOpen] = useState<boolean>(false);
    const [greekTextModalOpen, setGreekTextModalOpen] = useState<boolean>(false); 

    useEffect(() => {
      // Reduces the size of the TextView to make room for GreekWordsDialog
      if(showGreekWords && windowSize.innerWidth >= 900 && textViewSize === 12)
      {
        setTextViewSize(7);
        setGreekTextDialogOpen(true);
      }
  
      if(showGreekWords && windowSize.innerWidth < 900)
      {
        setGreekTextModalOpen(true);
      }
    }, [greekWords, showGreekWords])

    function onGreekWordsDialogClose() {
        setShowGreekWords(false);
        setTextViewSize(12);
    }

    function onGreekWordsModalClose() {
        setShowGreekWords(false);
        setGreekTextModalOpen(false)
    }

    return (
        <>
            <Grid 
                className="MainViewContainer" 
                container 
                spacing={1} 
                justifyContent="flex-start" 
                alignItems="center"
            >   
            <Grid 
                item 
                xl={textViewSize} lg={textViewSize} md={textViewSize} sm={12} xs={12} 
                style={{height:"100%"}}
            >
                <TextView/>
            </Grid>

            <Grid 
                item 
                xl={(textViewSize !== 12 ? 5 : 0)} 
                lg={(textViewSize !== 12 ? 5 : 0)} 
                md={(textViewSize !== 12 ? 5 : 0)} 
                sm={0} xs={0}
                style={{height:"100%", padding:"0px"}}
            >
                <GreekWordsDialog 
                    open={greekTextDialogOpen} 
                    onClose={onGreekWordsDialogClose} 
                    greekWords={greekWords ? greekWords : []}
                />
            </Grid>
            </Grid>

            <NextChapterButton/>
            <PreviousChapterButton/>

            <GreekWordsModal 
                open={greekTextModalOpen} 
                onClose={() =>(onGreekWordsModalClose())} 
                greekWords={greekWords ? greekWords : []}
            />
        </>
    )
}