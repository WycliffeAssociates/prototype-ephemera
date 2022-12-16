import Grid from '@mui/material/Grid';
import ChapterNavigationBar from './ChapterNavigationBar';
import StationaryChapterNavButton from './StationaryChapterNavButton';
import ArrowRightAltIcon from '@material-ui/icons/ArrowForward';
import ArrowLeftAltIcon from '@material-ui/icons/ArrowBack';
import Text from './Text';
import { NewFormattedGreekWord, PhraseWord, SubWord, SettingsOption } from '../types';
import NavigationModal from "./NavigationModal"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useWindowSize from '../hooks/useWindowSize';
import Button from '@mui/material/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsModal from './SettingsModal';
import { valueToPercent } from '@mui/base';


interface TextViewProps {
    onClick: (params: any) => any
}

function TextView({onClick}: TextViewProps)
{
  const [navigationModalOpen, setNavigationModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const { search } = useLocation();
  const windowSize = useWindowSize([]);
  const [ULBLineHeightValue, setULBLineHeightValue] = useState<number>(100);
  const [ULBFontSizeValue, setULBFontSizeValue] = useState<number>(20);
  const [underlineTextValue, setUnderlineTextValue] = useState<boolean>(true);
  const [GWTLineHeightValue, setGWTLineHeightValue] = useState<number>(100);
  const [GWTFontSizeValue, setGWTFontSizeValue] = useState<number>(20);


  let navigationModalFullScreen = (windowSize.innerWidth < 900 ? true : false);

  useEffect(() => {
    setNavigationModalOpen(false);
  }, [search])

  const onPhraseClick = (words : NewFormattedGreekWord[] |  PhraseWord[] | SubWord[] | undefined) =>
  {
    onClick(words);
  }

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

  // TODO: Possibly add this to a hook with Context
  const underlineSetting : SettingsOption = {
    name: "Underline Text",
    value: underlineTextValue,
    modifier: function () {
      setUnderlineTextValue(!underlineTextValue);
    },
    type:"switch",
  }

  const ULBTextFontSetting : SettingsOption = {
    name: "ULB Font Size",
    value: ULBFontSizeValue,
    modifier: function (newValue: number | string | number | boolean | undefined) {
      setULBFontSizeValue(newValue as number);
    },
    type:"increment",
    unit:"px",
  }

  const ULBLineHeightSetting : SettingsOption = {
    name: "ULB Line Height",
    value: ULBLineHeightValue,
    modifier: function (newValue: number | string | number | boolean | undefined) {
      setULBLineHeightValue(newValue as number);
    },
    type:"increment",
    unit:"%",
  }

  const GWTTextFontSetting : SettingsOption = {
    name: "GWT Font Size",
    value: GWTFontSizeValue,
    modifier: function (newValue: number | string | number | boolean | undefined) {
      setGWTFontSizeValue(newValue as number);
    },
    type:"increment",
    unit:"px",
  }

  const GWTLineHeightSetting : SettingsOption = {
    name: "GWT Line Height",
    value: GWTLineHeightValue,
    modifier: function (newValue: number | string | number | boolean | undefined) {
      setGWTLineHeightValue(newValue as number);
    },
    type:"increment",
    unit:"%",
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
            <Text 
              onPhraseClick={onPhraseClick} 
              ULBTextSettings={{
                lineHeight: ULBLineHeightSetting.value + (ULBLineHeightSetting.unit ? ULBLineHeightSetting.unit : "%"), 
                fontSize: ULBTextFontSetting.value + (ULBTextFontSetting.unit ? ULBTextFontSetting.unit : "px"), 
                underlineText: underlineTextValue
              }}
              />
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
        settings={[
          underlineSetting, 
          ULBTextFontSetting, 
          ULBLineHeightSetting, 
          GWTTextFontSetting, 
          GWTLineHeightSetting
        ]}
      />
    </>
  )
}


export default TextView;