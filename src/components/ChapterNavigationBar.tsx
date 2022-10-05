import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import SettingsIcon from '@material-ui/icons/Settings';



function ChapterNavigationBar()
{
  return (

    <Grid container direction="row" justifyContent={{lg: "center", md: "center", sm:"flex-start"}} alignItems="flex-start" style={{marginTop:"15px", marginLeft:"0px", marginBottom:"15px", height:"50px"}}>
      <Grid item lg={6} md={6} sm={10} xs={10}>
        <ButtonGroup variant="outlined" aria-label="outlined button group" style={{width:"100%", height:"48px", backgroundColor:"#f2f2f2", borderRadius:"25px 25px 25px 25px"}} >
          <Button onClick={() => {console.log("onClickHere")}} style={{width:"85%", borderColor:"#d9d9d9", borderRadius:"25px 0px 0px 25px"}}> 
            <span 
              style={{
                width:"100%", 
                textAlign:"left",
                color: "#001533CC",
                fontWeight: "400",
                textTransform:"none",
                fontSize: "16px",
                }}
              >
                Philemon
              </span>
          </Button>
          <Button onClick={() => {console.log("onClickHere")}} style={{width:"15%", borderColor:"#d9d9d9", borderRadius:"0px 25px 25px 0px"}}>
            <span 
              style={{
                width:"100%", 
                color: "#001533CC",
                fontWeight: "400",
                textTransform:"none",
                fontSize: "16px",
                }}
            >
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


export default ChapterNavigationBar;