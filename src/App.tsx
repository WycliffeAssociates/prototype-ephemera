import {useState, useEffect} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import NextChapterButton from './components/NextChapterButton';
import PreviousChapterButton from './components/PreviousChapterButton';
import TextView from "./components/TextView";
import GreekWordsDialog from './components/GreekWordsDialog';
import GreekWordsModal from './components/GreekWordsModal';
import { FormattedGreekWord } from './types';






function App() {

  const [textViewSize, setTextViewSize] = useState<number>(12);
  const [greekTextDialogOpen, setGreekTextDialogOpen] = useState<boolean>(false);
  const [greekTextModalOpen, setGreekTextModalOpen] = useState<boolean>(false);
  const [currentGreekWords, setCurrentGreekWords] = useState<FormattedGreekWord[]>([]);

  // TOOD: add this windowSize logic in a custom hook
  const [windowSize, setWindowSize] = useState(getWindowSize());

  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

  useEffect(() => {

    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  function onTextClick(greekWords : FormattedGreekWord[] | undefined)
  {
    if(greekWords !== undefined)
    {
      setCurrentGreekWords(greekWords);
    }

    // Reduces the size of the TextView to make room for GreekWordsDialog
    if(windowSize.innerWidth >= 900 && textViewSize === 12)
    {
      setTextViewSize(7);
      setGreekTextDialogOpen(true);
    }

    if(windowSize.innerWidth < 900)
    {
      setGreekTextModalOpen(true);
    }

  }

  function onGreekTextClose() {
    setGreekTextDialogOpen(false);
    setTextViewSize(12);
  }

  return (
    <div className="App">
      <Grid 
        className="MainViewContainer" 
        container 
        spacing={1} 
        justifyContent="flex-start" 
        alignItems="center"
      >   
        {/* TOOD: add navbar here where the height is changed depending on TextContainer scroll.  */}
        <Grid item xl={textViewSize} lg={textViewSize} md={textViewSize} sm={12} xs={12} style={{height:"100%"}}>
          <TextView onClick={onTextClick}/>
        </Grid>

        <Grid 
          item 
          xl={(textViewSize !== 12 ? 5 : 0)} 
          lg={(textViewSize !== 12 ? 5 : 0)} 
          md={(textViewSize !== 12 ? 5 : 0)} 
          sm={0} 
          xs={0}
          style={{height:"100%", padding:"0px"}}
        >
          <GreekWordsDialog open={greekTextDialogOpen} onClose={onGreekTextClose} greekWords={currentGreekWords}/>
        </Grid>
      </Grid>

      <NextChapterButton/>
      <PreviousChapterButton/>

      <GreekWordsModal open={greekTextModalOpen} onClose={() => setGreekTextModalOpen(false)} greekWords={currentGreekWords}/>
    
    </div>
  );
}

export default App;
