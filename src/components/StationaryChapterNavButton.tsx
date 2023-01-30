import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useBookChapterParams from '../hooks/useBookChapterParams';


interface ButtonProps {
    nextChapter: boolean;
    children: any
  }
  function StationaryChapterNavButton({children, nextChapter}: ButtonProps)
  {
    const {getBookChaptersParams, setBookChapterParams} = useBookChapterParams();
    
    let bookChapter = getBookChaptersParams();
    let chapterNumber = parseInt(bookChapter.chapter);
    let newChapter = (nextChapter === true? (chapterNumber + 1) : (chapterNumber - 1));

    const onClick = () => {
      setBookChapterParams(bookChapter.book, newChapter + "");
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