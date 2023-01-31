import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useBookChapterParams from '../hooks/useBookChapterParams';


function PreviousChapterButton()
{
  const {getBookChaptersParams, setValidBookChapterParams} = useBookChapterParams();
  let bookChapter = getBookChaptersParams();

  const onClick = () => {
    let newChapter = parseInt(bookChapter.chapter) - 1;
    setValidBookChapterParams(bookChapter.book, newChapter + "");
  }

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
        
        <ChevronLeftIcon onClick={onClick}/>
      </Fab>
    </Box>
  )
}

export default PreviousChapterButton;