import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useNavigate, createSearchParams } from "react-router-dom";
import useBookChapterParams from '../hooks/useBookChapterParams';
import { books as newTestamentMetadata} from "../applicationLogic/newTestamentMetadata"


interface ButtonProps {
    nextChapter: boolean;
    children: any
  }
  function StationaryChapterNavButton({children, nextChapter}: ButtonProps)
  {
    const navigate = useNavigate();
    const bookChapter = useBookChapterParams();

    let newChapter = (nextChapter === true? (bookChapter.chapter + 1) : (bookChapter.chapter - 1));


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
        // TODO: possible move to next (or previous) book
        console.log("chapter number out of bounds");
      }
    }
    

    return (
      <Box style={{height:"100%"}} display={{ xs: 'none', sm: 'none', md:"block", lg:"block", xl:"block" }}>
          <Button style={{
            maxWidth: '40px', 
            maxHeight: '104px', 
            minWidth: '40px', 
            minHeight: '104px',
            top:"40%",  
            backgroundColor:"#f2f2f2",
            border: '0.5px solid',
            borderColor: "#d9d9d9",
            }}
            onClick={() => {onClick()} }
          >{children}</Button>
      </Box>
    )
  }

  export default StationaryChapterNavButton;