import React, { useEffect } from 'react';
import {useState} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import NextChapterButton from './components/NextChapterButton';
import PreviousChapterButton from './components/PreviousChapterButton';
import TextView from "./components/TextView";
import GreekWordsDialog from './components/GreekWordsDialog';



const Item : any = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function App() {

  const [textViewSize, setTextViewSize] = useState<number>(12);
  const [greekTextDialogOpen, setGreekTextDialogOpen] = useState<Boolean>(false)
  const [currentGreekWord, setCurrentGreekWord] = useState([])

  // Open dialog to display Greek phrase information 
  // when there is space for it on the screen.
  useEffect(() => {
    if(textViewSize !== 12)
    {
      setGreekTextDialogOpen(true);
    }
    else
    {
      setGreekTextDialogOpen(false);
    }
  }, [textViewSize])

  function onGreekTextClose() {
    setGreekTextDialogOpen(false);
    setTextViewSize(12);
  }

  return (
    <div className="App">

      <Box className="BannerContainer" sx={{ flexGrow: 1 }}>
        <AppBar className="BannerContainer__elem" position="static">
          <Toolbar className="BannerContainer__elem">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              WA logo here
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>


      <Grid 
        className="MainViewContainer" 
        container 
        spacing={1} 
        justifyContent="flex-start" 
        alignItems="center"
      >   
        <Grid item xl={textViewSize} lg={textViewSize} md={textViewSize} sm={12} xs={12}>
          <TextView size={textViewSize} setSize={setTextViewSize} setCurrentGreekWord={setCurrentGreekWord}/>
        </Grid>

        <Grid 
          item 
          xl={(textViewSize !== 12 ? 5 : 0)} 
          lg={(textViewSize !== 12 ? 5 : 0)} 
          md={(textViewSize !== 12 ? 5 : 0)} 
          sm={0} 
          xs={0}
        >
          <GreekWordsDialog open={greekTextDialogOpen} onClose={onGreekTextClose} greekWord={currentGreekWord}/>
        </Grid>
      </Grid>

      <NextChapterButton/>
      <PreviousChapterButton/>
    
    </div>
  );
}

export default App;
