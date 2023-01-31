import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {useBookChapterParams} from '../hooks/useBookChapterParams';


function NextChapterButton()
{
  // const navigate = useNavigate();
  const {getBookChaptersParams, setValidBookChapterParams} = useBookChapterParams();
  let bookChapter = getBookChaptersParams();

  const onClick = () => {
    let newChapter = bookChapter.chapter + 1;
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
            right: "5%"
          }}
      >
        <ChevronRightIcon onClick={onClick}/>
      </Fab>
    </Box>
  )
}

export default NextChapterButton;