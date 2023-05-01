import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useBookChapterParams from '../hooks/useBookChapterParams';
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";


const BootstrapButton = styled(Button)({
  height: 48,
  borderRadius: 20,
  textTransform: "none",
  fontSize: 20,
  padding: "12px 16px 12px 16px",
  lineHeight: 1.0,
  backgroundColor:"white",
  color:"black",
  maxWidth: 231,
  minWidth: 231,
});


function PreviousChapterButton()
{
  const {getBookChaptersParams, setValidBookChapterParams} = useBookChapterParams();
  let bookChapter = getBookChaptersParams();

  const onClick = () => {
    let newChapter = parseInt(bookChapter.chapter) - 1;
    setValidBookChapterParams(bookChapter.book, newChapter + "");
  }

  return (
    <> 
      <Box display={{ xs: 'block', sm: 'block', md:"block", lg:"block", xl:"none" }} style={{float:"left", paddingLeft:"13%"}}>
        <Fab color="primary" aria-label="add"
          style={{
              width: "50px",
              height: "50px",
              backgroundColor:"white",
              color:"black",
            }}
          onClick={onClick}
        >
          <ChevronLeftIcon/>
        </Fab>
      </Box>

      <Box 
        display={{ xs: 'none', sm: 'none', md:"none", lg:"none", xl:"block" }}
        style={{float:"left", paddingLeft:"8%"}}
      >
        <BootstrapButton variant="contained" disableRipple onClick={onClick}>
          <ChevronLeftIcon/> Previous Chapter
        </BootstrapButton>
      </Box>
    </>
  )
}

export default PreviousChapterButton;