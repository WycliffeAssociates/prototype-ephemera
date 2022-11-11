import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useBookChapterParams from '../hooks/useBookChapterParams';
import {useNavigate, createSearchParams } from "react-router-dom";
import { books as newTestamentMetadata} from "../applicationLogic/newTestamentMetadata"


function PreviousChapterButton()
{
  const navigate = useNavigate();
  const bookChapter = useBookChapterParams();

  let newChapter = bookChapter.chapter - 1;

  const onClick = () => {
    if(newChapter > 0 && newChapter <= newTestamentMetadata[bookChapter.book].numChapters) {
      const params = {
        book: bookChapter.book,
        chapter: (newChapter > 0 && newChapter <= newTestamentMetadata[bookChapter.book].numChapters ? newChapter + "" : (bookChapter.chapter - 1) + "")
      };

      const options = {
        pathname: '/',
        search: `?${createSearchParams(params)}`,
      };
      navigate(options, { replace: true });
    }
    else
    {
      console.log("chapter number out of bounds");
    }
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