import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';
import StationaryChapterNavButton from './StationaryChapterNavButton';
import ArrowRightAltIcon from '@material-ui/icons/ArrowForward';
import ArrowLeftAltIcon from '@material-ui/icons/ArrowBack';
import Button from '@mui/material/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import ChapterNavigationBar from './ChapterNavigationBar';
import Text from './Text';
import NavigationModal from "./NavigationModal"
import useWindowSize from '../hooks/useWindowSize';
import SettingsModal from './SettingsModal';
import {useSettings} from '../hooks/SettingsContext';


function TextView()
{
  const [navigationModalOpen, setNavigationModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const { search } = useLocation();
  const windowSize = useWindowSize([]);
  const {ULBSettings, GWTSettings,} = useSettings();

  let navigationModalFullScreen = (windowSize.innerWidth < 900 ? true : false);

  useEffect(() => {
    setNavigationModalOpen(false);
  }, [search])

  const onNavBarClick = () => {
    setNavigationModalOpen(true);
  }

  const onNavigationModalClose = () => {
    setNavigationModalOpen(false);
  }

  const onSettingsModalClose = () => {
    setSettingsModalOpen(false);
  }

  const onSettingsModalOpen = () => {
    setSettingsModalOpen(true);
  }

  return (
    <>
      <Grid className="TextViewContainer" 
            container 
            spacing={1} 
      >  
        <Grid 
          item 
          xs={12} sm={12} md={12} lg={12} xl={12} 
          style={{marginTop:"15px", height:"50px", paddingTop:"0px", paddingLeft:"0px"}}
        >
          <Grid 
            container 
            direction="row" 
            justifyContent={{lg: "center", md: "center", sm:"flex-start"}} 
            alignItems="flex-start" 
            style={{marginLeft:"0px", marginBottom:"0px", height:"100%"}}
          >
            <ChapterNavigationBar onClick={onNavBarClick} />

            <Grid item lg={1} md={1} sm={2} xs={2}>
              <Button onClick={() => onSettingsModalOpen()} style={{height:"50px"}}><SettingsIcon style={{color:"#001A3D99"}}/></Button> 
            </Grid>
          </Grid>
        </Grid>
      
        <Grid item xs={0} sm={0} md={2}>
          <StationaryChapterNavButton 
            nextChapter={false} 
            children={<ArrowLeftAltIcon className="TextViewContainer__arrowIcon"/>}
          />
        </Grid>

        <Grid 
          id="TextContainer" 
          className="TextContainer" 
          item 
          xs={12} sm={12} md={8} 
          style={{ width: "100%", height: "100%", maxHeight: "90vh"}}
        >
            <Text/>
        </Grid>

        <Grid item xs={0} sm={0} md={2}>
          <StationaryChapterNavButton 
            nextChapter={true} 
            children={<ArrowRightAltIcon className="TextViewContainer__arrowIcon"/>}
          />
        </Grid>
      </Grid>

      <NavigationModal
        open={navigationModalOpen} 
        onClose={onNavigationModalClose} 
        fullScreen={navigationModalFullScreen}
      />

      <SettingsModal
        open={settingsModalOpen} 
        onClose={onSettingsModalClose} 
        settings={[...ULBSettings, ...GWTSettings]}
      />
    </>
  )
}


export default TextView;