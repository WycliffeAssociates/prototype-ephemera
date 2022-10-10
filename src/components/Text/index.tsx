import { useState, useEffect } from 'react';
import getChapterVerses from '../../api';
import "../../App.css";
import { FormattedGreekWord, FormattedVerse} from '../../types';
import mapVerses from '../Text/utils/generateVerses'
import Word from './utils/Word'



interface TextProps {
    onPhraseClick: (greekWords : FormattedGreekWord[]) => any;
}

function Text({onPhraseClick}: TextProps)
{
  const [verses, setVerses] = useState([] as FormattedVerse[]);
  const [childClicked, setChildClicked] = useState<any>({});
  const [windowSize, setWindowSize] = useState(getWindowSize());

  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

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

  useEffect(() => {
    let data = getChapterVerses("Philemon", 1);

    setVerses(mapVerses(data));

    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


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


  let verseOutput : any[] = [];

  verses.forEach((verse, verseIdx) => {
    let verseWordOutput : any[] = [];

    verse.verseWords.forEach((verseWord, wordIdx) => {
      
      verseWordOutput.push(<Word handleClick={handleChildClicked} onPhraseClick={onPhraseClick} {...verseWord}/>)
    })

    const tempVerse = (
      <p className="TextContainer__Verse"><sup>{verseIdx + 1}</sup> {verseWordOutput}</p>
    )
    verseOutput.push(tempVerse);
  })
  
  return (
    <>
      {verseOutput}
    </>
  )
}

export default Text;