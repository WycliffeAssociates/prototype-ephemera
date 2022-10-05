import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';


function NextChapterButton()
{
  return (
    <Box display={{ xs: 'block', sm: 'block', md:"none", lg:"none", xl:"none" }}>
      <Fab className="TextViewContainer__NextChapterButton" color="primary" aria-label="add" onClick={() => {console.log("onclickhere")}}>
        <p>N</p>
      </Fab>
    </Box>
  )
}

export default NextChapterButton;