import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import MenuIcon from '@material-ui/icons/Menu';
import useBookChapterParams from '../hooks/useBookChapterParams';


interface ChapterNavigationBarProps {
  onClick: (params: any) => any
}

function ChapterNavigationBar( {onClick} : ChapterNavigationBarProps)
{

  let bookChapter = useBookChapterParams();


  return (
     <>
       <Grid item lg={6} md={6} sm={10} xs={10}>
        <ButtonGroup 
          variant="outlined" 
          aria-label="outlined button group" 
          style={{width:"100%", height:"48px", backgroundColor:"#f2f2f2", borderRadius:"25px 25px 25px 25px"}} 
        >
          <Button 
            onClick={onClick} 
            style={{width:"85%", borderColor:"#d9d9d9", borderRadius:"25px 0px 0px 25px"}}
          > 
            <MenuIcon style={{paddingRight:"15px", color:"#001A3D99"}}/>
            <span className="ChapterNavigationBar__Span ChapterNavigationBar__BookName">
              {bookChapter.book}
            </span>
          </Button>
          <Button 
            onClick={onClick} 
            style={{width:"15%", borderColor:"#d9d9d9", borderRadius:"0px 25px 25px 0px"}}
          >
            <span className="ChapterNavigationBar__Span">
              {bookChapter.chapter}
            </span>
          </Button>
        </ButtonGroup>
      </Grid>
    </>
  )
}


export default ChapterNavigationBar;