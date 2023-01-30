import { useState, useEffect } from 'react';
import "../../App.css";
import Word from './utils/Word';
import useBookChapterParams from "../../hooks/useBookChapterParams"
import useWindowSize from '../../hooks/useWindowSize';
import useChapterVerseData from "../../hooks/useChapterVerseData";
import { useSettings } from '../../hooks/SettingsContext';
import { mapValidULBSettings } from './utils/mapValidULBSettings';
import { useGreekWords } from '../../hooks/GreekWordsContext';


function Text()
{
  const bookChapter = useBookChapterParams();
  const verses = useChapterVerseData(bookChapter.book, bookChapter.chapter);
  const windowSize = useWindowSize([bookChapter.book, bookChapter.chapter]);
  const [childClicked, setChildClicked] = useState<any>({});
  const { ULBSettings } = useSettings();
  const { showGreekWords } = useGreekWords();
  
  const defaultTextColor = "#001533CC";
  const highlightColor = "blue";


  useEffect(() => {
    scrollSelectedPhraseIntoView()
  }, [childClicked, windowSize.innerWidth])

  useEffect(() => {
    resetTextData()
  }, [verses]);

    
  // TODO: add use effect that listens to when the greek word dialog open variable from useContext is set to close, then it will set the selected word's
  // color back to default. 
  useEffect(() => {
    if(!showGreekWords) {
      if(childClicked?.current?.style?.color !== undefined) 
      {
        childClicked.current.style.color = defaultTextColor;
      } 
    }
  }, [showGreekWords])


  function scrollSelectedPhraseIntoView() {
    // NOTE: 900px is the current breakpoint for mobile devices. 
    // Scroll to top when possible, else scroll to the bottom
    // TODO: add case where phrase is already at the top or at the bottom
    if(childClicked?.current !== undefined && windowSize.innerWidth < 900)
    {
      let startBottom = childClicked.current.getBoundingClientRect().bottom;
      childClicked?.current.scrollIntoView({block: "start"})
      let endBottom = childClicked.current.getBoundingClientRect().bottom;

      if(startBottom == endBottom)
      {
        childClicked?.current.scrollIntoView({block: "end"})
      }
    }
  }

  function resetTextData() {
    // Makes sure that all text is default color after navigating to another chapter. 
    if(childClicked?.current?.style?.color !== undefined) 
    {
      childClicked.current.style.color = defaultTextColor;
    } 
    // Makes sure that the next chapter is starting from verse 1. 
    document.getElementById("TextContainer")?.scroll(0,0)
    setChildClicked({})
  }

  function highlightSelectedPhrase(newChildClicked: any) {
    if(childClicked?.current?.style?.color !== undefined) 
    {
      childClicked.current.style.color = defaultTextColor;
    } 
    if(newChildClicked?.current?.style?.color !== undefined)
    {
      newChildClicked.current.style.color = highlightColor;
    }
  }
  
  function handleChildClicked(newChildClicked: any) {
    highlightSelectedPhrase(newChildClicked)
    setChildClicked(newChildClicked);
  }

  let overwriteStyle : any = mapValidULBSettings(ULBSettings).verseStyles;
  let verseOutput : any[] = [];

  verses.forEach((verse) => {
    let verseWordOutput : any[] = [];

    verse.verseWords.forEach((verseWord, idx) => {
      verseWordOutput.push(<Word key={`v${verse.verseNum} w${idx}`} handleClick={handleChildClicked} versePhrase={{...verseWord}}/>)
    })

    const tempVerse = (
      <p key={`verse + ${verse.verseNum}`} className="TextContainer__Verse" style={{...overwriteStyle}}><sup>{verse.verseNum}</sup> {verseWordOutput}</p>
    )
    verseOutput.push(tempVerse);
  })
  
  return (
    <>
      {verses.length === 0 ? "Please enter a valid book / chapter" : verseOutput }
    </>
  )
}

export default Text;