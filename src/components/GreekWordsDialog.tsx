import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GreekWordInfo from './GreekWordInfo';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import { GreekPhraseWord } from '../types'


let word1 : GreekPhraseWord = {
  greekWords: "greek word here/more words",
  englishWords: "hello",
  morphology: "some morphology here",
  descriptions: ["description1, description2","description3"]
}


let testData2 = [word1, word1, word1] as GreekPhraseWord[];

interface GreekWordsDialogProps {
  open: Boolean;
  onClose: () => void;
  greekWord: any;
};

function GreekWordsDialog({open, onClose, greekWord} : GreekWordsDialogProps) {


    useEffect(() => {
      if(greekWord.length > 0)
      {
        console.log(greekWord);
      }
    }, [greekWord])


    return ( 
      <Box 
        display={{ 
          xs: 'none', sm: 'none', 
          md:(open ? "block" : "none"), 
          lg:(open ? "block" : "none"), 
          xl:(open ? "block" : "none")
        }}
      >
     
        {/* TODO try to remove this box element and just use the above parent box element */}
        <Box style={{height:"89vh", width:"100%", backgroundColor:"#f2f2f2"}}>

          <Grid container direction="row">
            <Grid item lg={(open ? 1 : 0)} xl={(open ? 1 : 0)} md={(open ? 1 : 0)}>
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

            <Grid item lg={11} xl={11} md={11} style={{maxHeight: '89vh', overflow: 'auto'}}>

              {testData2.map((data, idx) => (
                <GreekWordInfo key={idx} {...data}/>
              ))}
              
            </Grid>
            <Grid item lg={1} xl={1} md={1}></Grid>
          </Grid>
      
        </Box>
      </Box>
    )
}


export default GreekWordsDialog;