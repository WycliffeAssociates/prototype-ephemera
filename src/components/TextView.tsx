import Grid from '@mui/material/Grid';
import ChapterNavigationBar from './ChapterNavigationBar';
import StationaryChapterNavButton from './StationaryChapterNavButton';
import ArrowRightAltIcon from '@material-ui/icons/ArrowForward';
import ArrowLeftAltIcon from '@material-ui/icons/ArrowBack';
import Text from './Text';
import { FormattedGreekWord } from '../types'


interface TextViewProps {
    size: number,
    setSize: (params: any) => any,
    setCurrentGreekWord: (params: any) => any,
}

function TextView({size, setSize, setCurrentGreekWord}: TextViewProps)
{

  const onPhraseClick = (greekWords : FormattedGreekWord[]) =>
  {
    setCurrentGreekWord(greekWords);

    // Reduces the size of the TextView to make room for GreekWordsDialog
    if(size === 12)
    {
        setSize(7);
    }
  }

  return (
    <>

    <Grid className="TextViewContainer" 
          container 
          spacing={1} 
          justifyContent={{lg: "center", md: "center"}} 
          alignItems="flex-start"
    >  

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <ChapterNavigationBar/>
      </Grid>
    

      <Grid item xs={0} sm={0} md={1}>
        {/* TODO add onClick and icon prop so I can use this for next and previous buttons */}
        <StationaryChapterNavButton children={<ArrowLeftAltIcon className="TextViewContainer__arrowIcon"/>}/>
      </Grid>

      <Grid className="TextContainer" item xs={12} sm={12} md={8}>
          <Text onPhraseClick={onPhraseClick}/>
      </Grid>

      <Grid item xs={0} sm={0} md={1}>
        {/* TODO add onClick and icon prop so I can use this for next and previous buttons */}
        <StationaryChapterNavButton children={<ArrowRightAltIcon className="TextViewContainer__arrowIcon"/>}/>
      </Grid>
    </Grid>
    </>
  )
}


export default TextView;