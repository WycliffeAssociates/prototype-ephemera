import React from 'react';
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



const Item : any = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function App() {

  const [textViewSize, setTextViewSize] = useState(12);  

  return (
    <div className="App">

      <Box sx={{ flexGrow: 1 }} style={{backgroundColor:"#001533"}}>
        <AppBar position="static" style={{backgroundColor:"#001533"}}>
          <Toolbar>
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


      <Grid container spacing={1} direction="row" justifyContent={{lg: "flex-start", md: "flex-start", sm:"flex-start"}} alignItems="center" style={{width:"100%"}}>   
        <Grid item xl={textViewSize} lg={textViewSize} md={textViewSize} sm={12} xs={12}>
          <TextView size={textViewSize} setSize={setTextViewSize}/>
        </Grid>

        <Grid item xl={(textViewSize !== 12 ? 5 : 0)} lg={(textViewSize !== 12 ? 5 : 0)} md={(textViewSize !== 12 ? 5 : 0)} sm={0} xs={0}>
          {/* TODO implement this div, but set its display to none when there is no selected text.  */}
          {/* <div style={{height:"90vh", width:"100%", backgroundColor:"#f2f2f2"}}></div> */}
        </Grid>
      </Grid>

      <PreviousFab/>
      <NextFab/>
    
    </div>
  );
}

export default App;
