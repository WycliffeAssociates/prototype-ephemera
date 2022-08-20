import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GreekWordInfo from './GreekWordInfo';


function GreekWordsDialog() {
    return (      
      <Box style={{height:"90vh", width:"100%", backgroundColor:"#f2f2f2"}}>

        <Grid container direction="row">
          <Grid item lg={1} xl={1} md={1}></Grid>
          <Grid item lg={10} xl={10} md={10}>
            <GreekWordInfo/>
          </Grid>
        </Grid>
    
      </Box>
    )
}


export default GreekWordsDialog;