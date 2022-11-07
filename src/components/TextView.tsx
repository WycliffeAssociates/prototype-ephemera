import Grid from '@mui/material/Grid';
import ChapterNavigationBar from './ChapterNavigationBar';
import StationaryChapterNavButton from './StationaryChapterNavButton';
import ArrowRightAltIcon from '@material-ui/icons/ArrowForward';
import ArrowLeftAltIcon from '@material-ui/icons/ArrowBack';
import Text from './Text';
import { NewFormattedGreekWord, PhraseWord, SubWord } from '../types';
import NavigationDialog from "./NavigationDialog"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useWindowSize from '../hooks/useWindowSize';



interface TextViewProps {
    onClick: (params: any) => any
}

function TextView({onClick}: TextViewProps)
{
  const [navigationDialogOpen, setNavigationDialogOpen] = useState(false);
  const { search } = useLocation();
  const windowSize = useWindowSize([]);

  let NavigationDialogFullScreen = (windowSize.innerWidth < 900 ? true : false);

  useEffect(() => {
    setNavigationDialogOpen(false);
  }, [search])

  const onPhraseClick = (words : NewFormattedGreekWord[] |  PhraseWord[] | SubWord[] | undefined) =>
  {
    onClick(words);
  }

  const onNavBarClick = () => {
    setNavigationDialogOpen(true);
  }

  const onNavigationDialogClose = () => {
    setNavigationDialogOpen(false);
  }

  return (
    <>
      <Grid className="TextViewContainer" 
            container 
            spacing={1} 
      >  

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{height:"50px", paddingTop:"0px", paddingLeft:"0px"}}>
          <ChapterNavigationBar onClick={onNavBarClick} />
        </Grid>
      

        <Grid item xs={0} sm={0} md={2}>
          <StationaryChapterNavButton nextChapter={false} children={<ArrowLeftAltIcon className="TextViewContainer__arrowIcon"/>}/>
        </Grid>

        <Grid id="TextContainer" className="TextContainer" item xs={12} sm={12} md={8} style={{ width: "100%", height: "100%", maxHeight: "90vh"}}>
            <Text onPhraseClick={onPhraseClick}/>
        </Grid>

        <Grid item xs={0} sm={0} md={2}>
          <StationaryChapterNavButton nextChapter={true} children={<ArrowRightAltIcon className="TextViewContainer__arrowIcon"/>}/>
        </Grid>
      </Grid>


      <NavigationDialog 
        open={navigationDialogOpen} 
        onClose={onNavigationDialogClose} 
        fullScreen={NavigationDialogFullScreen}
      />
    </>
  )
}


export default TextView;