import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';


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

export default NextFab;