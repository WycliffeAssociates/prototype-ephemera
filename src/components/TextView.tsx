import Grid from '@mui/material/Grid';
import ChapterNavigationBar from './ChapterNavigationBar';
import StationaryChapterNavButton from './StationaryChapterNavButton';
import ArrowRightAltIcon from '@material-ui/icons/ArrowForward';
import ArrowLeftAltIcon from '@material-ui/icons/ArrowBack';
import Text from './Text';
import { NewFormattedGreekWord, NewFormattedVerse, PhraseWord, SubWord } from '../types';





interface TextViewProps {
    onClick: (params: any) => any
}

function TextView({onClick}: TextViewProps)
{

  const onPhraseClick = (words : NewFormattedGreekWord[] |  PhraseWord[] | SubWord[] | undefined) =>
  {
    // console.log("words in TExtView")
    // console.log(words);
    onClick(words);
  }

  return (
    <>
      <Grid className="TextViewContainer" 
            container 
            spacing={1} 
      >  

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{height:"50px", paddingTop:"0px", paddingLeft:"0px"}}>
          <ChapterNavigationBar/>
        </Grid>
      

        <Grid item xs={0} sm={0} md={2}>
          {/* TODO add onClick and icon prop so I can use this for next and previous buttons */}
          <StationaryChapterNavButton children={<ArrowLeftAltIcon className="TextViewContainer__arrowIcon"/>}/>
        </Grid>

        <Grid className="TextContainer" item xs={12} sm={12} md={8} style={{ width: "100%", height: "100%", maxHeight: "90vh"}}>
            <Text onPhraseClick={onPhraseClick}/>
        </Grid>

        <Grid item xs={0} sm={0} md={2}>
          {/* TODO add onClick and icon prop so I can use this for next and previous buttons */}
          <StationaryChapterNavButton children={<ArrowRightAltIcon className="TextViewContainer__arrowIcon"/>}/>
        </Grid>
      </Grid>
    </>
  )
}


export default TextView;