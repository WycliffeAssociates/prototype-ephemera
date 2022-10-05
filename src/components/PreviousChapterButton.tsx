import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';



function PreviousChapterButton()
{
  return (
    <Box display={{ xs: 'block', sm: 'block', md:"none", lg:"none", xl:"none" }}>
      <Fab className="TextViewContainer__ChapterButton" color="primary" aria-label="add">
        <p>I</p>
      </Fab>
    </Box>
  )
}

export default PreviousChapterButton;