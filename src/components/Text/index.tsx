import { useState, useEffect } from 'react';
import "../../App.css";
import { FormattedGreekWord, PhraseWord, SubWord} from '../../types';
import Word from './utils/Word';
import useBookChapterParams from "../../hooks/useBookChapterParams"
import useWindowSize from '../../hooks/useWindowSize';
import useChapterVerseData from "../../hooks/useChapterVerseData"


interface TextProps {
    onPhraseClick: (words : FormattedGreekWord[] |  PhraseWord[] | SubWord[] | undefined) => any;
}

function Text({onPhraseClick}: TextProps)
{
  const bookChapter = useBookChapterParams();
  const verses = useChapterVerseData(bookChapter.book, bookChapter.chapter);
  const windowSize = useWindowSize([bookChapter.book, bookChapter.chapter]);
  const [childClicked, setChildClicked] = useState<any>({});


  useEffect(() => {
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
  }, [childClicked, windowSize.innerWidth])



  useEffect(() => {

    // Makes sure that all text is default color after navigating to another chapter. 
    if(childClicked?.current?.style?.color !== undefined) 
    {
      childClicked.current.style.color = "#001533CC";
    } 

    // Makes sure that the next chapter is starting from verse 1. 
    document.getElementById("TextContainer")?.scroll(0,0)

    setChildClicked({})
  }, [verses]);


  function handleChildClicked(newChildClicked: any) {

    if(childClicked?.current?.style?.color !== undefined) 
    {
      childClicked.current.style.color = "#001533CC";
    } 

    if(newChildClicked?.current?.style?.color !== undefined)
    {
      newChildClicked.current.style.color = "blue";
    }

    setChildClicked(newChildClicked);
  }

  let verseOutput : any[] = [];

  verses.forEach((verse, verseIdx) => {
    let verseWordOutput : any[] = [];

    verse.verseWords.forEach((verseWord, wordIdx) => {
      
      verseWordOutput.push(<Word handleClick={handleChildClicked} onPhraseClick={onPhraseClick} versePhrase={{...verseWord}}/>)
    })

    const tempVerse = (
      <p className="TextContainer__Verse"><sup>{verse.verseNum}</sup> {verseWordOutput}</p>
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