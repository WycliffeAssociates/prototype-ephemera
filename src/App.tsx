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
import PreviousFab from './components/PreviousFab';
import NextFab from './components/NextFab';
import TextView from "./components/TextView";
import GreekWordsDialog from './components/GreekWordsDialog';

import getChapter from './api';



const Item : any = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function App() {

  const [textViewSize, setTextViewSize] = useState<number>(12);
  // const [greekTextDialogOpen, setGreekTextDialogOpen] = useState<"none" | "block">("none")
  const [greekTextDialogOpen, setGreekTextDialogOpen] = useState<Boolean>(false)

  
  // TODO populate this with the selected phrase data
  // const [selectedPhraseData, setSelectedPhraseData] = useState();

  // useEffect(() => {
  //   let data = getChapter(0);
  //   console.log(data);
  // }, [])

  useEffect(() => {
    if(textViewSize !== 12)
    {
      console.log("Greek text info setting to block (aka open)")
      setGreekTextDialogOpen(true);
    }
    else
    {
      console.log("Greek text info setting to none (aka close)")
      setGreekTextDialogOpen(false);
    }
  }, [textViewSize])

  function onGreekTextClose() {
    setGreekTextDialogOpen(false);
    setTextViewSize(12);
  }

  return (
    <div className="App">

      <Box sx={{ flexGrow: 1 }} style={{backgroundColor:"#001533", width:"100%"}}>
        <AppBar position="static" style={{backgroundColor:"#001533", paddingRight:"0px", marginRight:"0px"}}>
          <Toolbar style={{backgroundColor:"#001533", paddingRight:"0px", marginRight:"0px"}}>
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


      <Grid container spacing={1} direction="row" justifyContent={{lg: "flex-start", md: "flex-start", sm:"flex-start"}} alignItems="center" style={{width:"100%", margin:"0px"}}>   
        <Grid item xl={textViewSize} lg={textViewSize} md={textViewSize} sm={12} xs={12}>
          <TextView size={textViewSize} setSize={setTextViewSize}/>
        </Grid>

        <Grid item xl={(textViewSize !== 12 ? 5 : 0)} lg={(textViewSize !== 12 ? 5 : 0)} md={(textViewSize !== 12 ? 5 : 0)} sm={0} xs={0}>
            <GreekWordsDialog open={greekTextDialogOpen} onClose={onGreekTextClose}/>
        </Grid>
      </Grid>

      <PreviousFab/>
      <NextFab/>
    
    </div>
  );
}

export default App;
