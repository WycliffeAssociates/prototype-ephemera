import Grid from '@mui/material/Grid';
import ChapterNavigationBar from './ChapterNavigationBar';
import StationaryChapterNavButton from './StationaryChapterNavButton';
import ArrowRightAltIcon from '@material-ui/icons/ArrowForward';
import ArrowLeftAltIcon from '@material-ui/icons/ArrowBack';
import Text from './Text';
import react, {useEffect, useState} from 'react';


type ValidGreekWordAttributeKeys = "lemma" | "morph";

type GreekWordAttributes = {
  [key in ValidGreekWordAttributeKeys] : string;
}

type ValidGreekWordNoteKeys = "OGNTsort" | "text" | "sub" | "phraseWords" | "strongs";

type GreekWordNotes = {
  [key in ValidGreekWordNoteKeys] : string;
}

type GreekWord = {
  notes : GreekWordNotes;
  attributes : GreekWordAttributes;
}

interface TextViewProps {
    size: number,
    setSize: (params: any) => any,
    setCurrentGreekWord: (params: any) => any,
}

function TextView({size, setSize, setCurrentGreekWord}: TextViewProps)
{

  const onPhraseClick = (greekWord : GreekWord[]) =>
  {
    setCurrentGreekWord(greekWord);

    if(size === 12)
    {
        setSize(7);
    }
    // else
    // {
    //     setSize(12);
    // }
  }


  return (
    <>

    <Grid container spacing={1} direction="row" justifyContent={{lg: "center", md: "center", sm:"flex-start"}} alignItems="flex-start" style={{paddingTop:"0px"}}>  

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <ChapterNavigationBar/>
      </Grid>
    

      <Grid item xs={0} sm={0} md={1}>
        {/* TODO add onClick and icon prop so I can use this for next and previous buttons */}
        <StationaryChapterNavButton children={<ArrowLeftAltIcon style={{color:"black", backgroundColor: "#f2f2f2"}}/>}/>
      </Grid>

      <Grid item xs={12} sm={12} md={8}  style={{maxHeight: '70vh', overflow: 'auto'}}>
          <Text onPhraseClick={onPhraseClick}/>
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