import Grid from '@mui/material/Grid';
import ChapterNavigationBar from './ChapterNavigationBar';
import StationaryChapterNavButton from './StationaryChapterNavButton';
import ArrowRightAltIcon from '@material-ui/icons/ArrowForward';
import ArrowLeftAltIcon from '@material-ui/icons/ArrowBack';
import Text from './Text';


interface TextViewProps {
    size: number,
    setSize: (params: any) => any,
}

function TextView({size, setSize}: TextViewProps)
{

  // TODO add an onTextClick function for the text component that sets the TextView size to 8
  // TODO add an onTextClose function for the text component that sets the TextView size to 12 

  const onPhraseClick = () =>
  {
    
    if(size === 12)
    {
        setSize(7);
    }
    else
    {
        setSize(12);
    }
  }


  return (
    <>
    {/*TODO Need to add style to make it appear and disappear depending on scroll.  */}
    {/* <ChapterNavigationBar/> */}

    {/* <Grid container spacing={1} direction="row" justifyContent={{lg: "center", md: "center", sm:"flex-start"}} alignItems="flex-start">   */}
    <Grid container spacing={1} direction="row" justifyContent={{lg: "center", md: "center", sm:"flex-start"}} alignItems="flex-start">  

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <ChapterNavigationBar/>
      </Grid>
    

      <Grid item xs={0} sm={0} md={1}>
        <StationaryChapterNavButton children={<ArrowLeftAltIcon style={{color:"black", backgroundColor: "#f2f2f2"}}/>}/>
      </Grid>

      {/*TODO Need to add style to make this grid scrollable on text overflow.  */}
      <Grid item xs={12} sm={12} md={8}  style={{maxHeight: '70vh', overflow: 'auto'}}>
        {/* <Item>             */}
          <Text onPhraseClick={onPhraseClick}/>
        {/* </Item> */}
      </Grid>

      <Grid item xs={0} sm={0} md={1}>
        {/* TODO add onClick and icon prop so I can use this for next and previous buttons */}
        <StationaryChapterNavButton children={<ArrowRightAltIcon style={{color:"black", backgroundColor: "#f2f2f2"}}/>}/>
      </Grid>
    </Grid>
    </>
  )
}


export default TextView;