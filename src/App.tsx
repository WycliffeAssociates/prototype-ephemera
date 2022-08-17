import React from 'react';
import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Fab from '@mui/material/Fab';
import { borders } from '@material-ui/system';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';

import ArrowRightAltIcon from '@material-ui/icons/ArrowForward';
import ArrowLeftAltIcon from '@material-ui/icons/ArrowBack';
import internal from 'stream';
import SettingsIcon from '@material-ui/icons/Settings';
import { textTransform } from '@mui/system';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

import WA_logo from "./WA_logo.png";


const Item : any = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function ChapterNavigationBar()
{
  return (

    <Grid container direction="row" justifyContent={{lg: "center", md: "center", sm:"flex-start"}} alignItems="flex-start" style={{marginTop:"15px", marginLeft:"15px", marginBottom:"15px", height:"50px"}}>
      <Grid item lg={6} md={6} sm={10} xs={10}>
        <ButtonGroup variant="outlined" aria-label="outlined button group" style={{width:"100%", height:"48px", backgroundColor:"#f2f2f2", borderRadius:"25px 25px 25px 25px"}} >
          <Button onClick={() => {console.log("onClickHere")}} style={{width:"85%", borderColor:"#d9d9d9", borderRadius:"25px 0px 0px 25px"}}> 
            <span style={{
                          width:"100%", 
                          textAlign:"left",
                          color: "#001533CC",
                          fontWeight: "400",
                          textTransform:"none",
                          fontSize: "16px",
                          }}>
              Matthew
              </span>
          </Button>
          <Button onClick={() => {console.log("onClickHere")}} style={{width:"15%", borderColor:"#d9d9d9", borderRadius:"0px 25px 25px 0px"}}>
            <span style={{
                        width:"100%", 
  
                        color: "#001533CC",
                        fontWeight: "400",
                        textTransform:"none",
                        fontSize: "16px",
                        }}>
              1
            </span>
          </Button>
        </ButtonGroup>
      </Grid>

      <Grid item lg={1} md={1} sm={2} xs={2}>
      <Button onClick={() => {console.log("onClickHere")}} style={{height:"50px"}}><SettingsIcon style={{color:"#001A3D99"}}/></Button>
         
      </Grid>
    </Grid>
  )
}

function Text()
{
  let verseText = [...Array(25)].map((e, i) => 
    <p key={i} style={{
      textAlign: "left",
      fontFamily: 'Lato',
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "20px",
      lineHeight: "48px",
      color: "#001533CC"

  }}> 
    The book of the genalogy of Jesus Christ, son of david, son of Abraham The book of the genalogy of Jesus Christ, son of david, son of Abraham
  </p>)

  return (
    <>
      {verseText}
    </>
  )
}


function PreviousFab()
{
  return (
    <Box display={{ xs: 'block', sm: 'block', md:"none", lg:"none", xl:"none" }}>
      <Fab color="primary" aria-label="add"
        style={{
            width: "50px",
            height: "50px",
            backgroundColor:"white",
            color:"black",
            position: "fixed",
            top: "85%",
            left: "5%"
          }}
      >
        <p>I</p>
      </Fab>
    </Box>
  )
}

function NextFab()
{
  return (
    <Box display={{ xs: 'block', sm: 'block', md:"none", lg:"none", xl:"none" }}>
      <Fab color="primary" aria-label="add" style={{
          width: "50px",
          height: "50px",
          backgroundColor:"white", 
          color:"black",
          position: "fixed",
          top: "85%",
          right: "5%"
        }}
        onClick={() => {console.log("onclickhere")}}>
        <p>N</p>
      </Fab>
    </Box>
  )
}


interface ButtonProps {
  // 👇️ turn off type checking
  onTextClick: () => any;
}
function StationaryChapterNavButton({children}: any)
{
  return (
    <Box style={{height:"60vh"}} display={{ xs: 'none', sm: 'none', md:"block", lg:"block", xl:"block" }}>
      {/* <Item  style={{height:"100%"}}>  */}
        <Button style={{
          maxWidth: '40px', 
          maxHeight: '104px', 
          minWidth: '40px', 
          minHeight: '104px',
          top:"40%",  
          backgroundColor:"#f2f2f2",
          border: '0.5px solid',
          borderColor: "#d9d9d9"
          }}
          onClick={() => {console.log("onClickHere");} }
        >{children}</Button>
      {/* </Item> */}
    </Box>
  )
}

// background: rgba(0, 21, 51, 0.05);

function TextView(size: any, setSize:(newSize: any) => void)
{

  // TODO add an onTextClick function for the text component that sets the TextView size to 8
  // TODO add an onTextClose function for the text component that sets the TextView size to 12 

  return (
    <>
    {/*TODO Need to add style to make it appear and disappear depending on scroll.  */}
    {/* <ChapterNavigationBar/> */}

    {/* <Grid container spacing={1} direction="row" justifyContent={{lg: "center", md: "center", sm:"flex-start"}} alignItems="flex-start">   */}
    <Grid container spacing={1} direction="row" justifyContent={{lg: "center", md: "center", sm:"flex-start"}} alignItems="flex-start">  

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <ChapterNavigationBar/>
      </Grid>
    

      <Grid item xs={0} sm={0} md={1}>
        <StationaryChapterNavButton children={<ArrowLeftAltIcon style={{color:"black", backgroundColor: "#f2f2f2"}}/>}/>
      </Grid>

      {/*TODO Need to add style to make this grid scrollable on text overflow.  */}
      <Grid item xs={12} sm={12} md={8}  style={{maxHeight: '70vh', overflow: 'auto'}}>
        {/* <Item>             */}
          <Text/>
        {/* </Item> */}
      </Grid>

      <Grid item xs={0} sm={0} md={1}>
        {/* TODO add onClick and icon prop so I can use this for next and previous buttons */}
        <StationaryChapterNavButton children={<ArrowRightAltIcon style={{color:"black", backgroundColor: "#f2f2f2"}}/>}/>
      </Grid>
    </Grid>
    </>
  )
}



interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}




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

      {/* <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            Scroll to hide App bar
          </Typography>
        </Toolbar>
      </AppBar> */}





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
