import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GreekWordInfo from './GreekWordInfo';


type greekWord = {
  greekWords: string,
  englishWords: string,
  morphology: string,
  descriptions: string[],
};

let word1 : greekWord = {
  greekWords: "asdkfjasdgjkb/asdfasdf",
  englishWords: "hello",
  morphology: "some morphology here",
  descriptions: ["description1, description2","description3"]
}

let word2 : greekWord = {
  greekWords: "asdkfkb/bbsfsdfs",
  englishWords: "hello",
  morphology: "some morphology here",
  descriptions: ["description1, description2","description3"]
}

let word3 : greekWord = {
  greekWords: "lllllltrtds/pppzzz",
  englishWords: "hello",
  morphology: "some morphology here",
  descriptions: ["description1", "description2","description3"]
}

let testData = [word1, word2, word3] as greekWord[];


function GreekWordsDialog() {
    return (      
      <Box style={{height:"90vh", width:"100%", backgroundColor:"#f2f2f2"}}>

        <Grid container direction="row">
          <Grid item lg={1} xl={1} md={1}></Grid>
          <Grid item lg={10} xl={10} md={10} style={{maxHeight: '75vh', overflow: 'auto'}}>

            {testData.map((data, idx) => (
              <GreekWordInfo key={idx} {...data}/>
            ))}
            
          </Grid>
        </Grid>
    
      </Box>
    )
}


export default GreekWordsDialog;