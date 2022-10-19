import { useState, useEffect } from 'react';
import getChapterVerses from '../../api';
import "../../App.css";
import { FormattedGreekWord, NewFormattedVerse, PhraseWord, SubWord} from '../../types';
import mapVerses from '../Text/utils/generateVerses'
import Word from './utils/Word'



interface TextProps {
    onPhraseClick: (words : FormattedGreekWord[] |  PhraseWord[] | SubWord[] | undefined) => any;
}

function Text({onPhraseClick}: TextProps)
{

  let queryString = window.location.search.split("?");
  queryString = queryString[1].split("&");
  let book = "Philemon";
  let chapter = 1;

  queryString.forEach((param) => {
      let paramArr = param.split("=");
      let paramName = paramArr[0];
      let paramValue = paramArr[1];

      if(paramName === "book")
      {
        book = paramValue.replace("%20", " ");
        book = book.toLowerCase();
      }

      if(paramName === "chapter")
      {
        chapter = parseInt(paramValue);
      }
  })


  const [verses, setVerses] = useState([] as NewFormattedVerse[]);
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

    const fetchData = async () => {
      const data = await getChapterVerses(book, chapter);
      setVerses(mapVerses(data));
    }

    fetchData();

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
      
      verseWordOutput.push(<Word handleClick={handleChildClicked} onPhraseClick={onPhraseClick} versePhrase={{...verseWord}}/>)
    })

    const tempVerse = (
      <p className="TextContainer__Verse"><sup>{verseIdx + 1}</sup> {verseWordOutput}</p>
    )
    verseOutput.push(tempVerse);
  })
  
  return (
    <>{verses.length === 0 ? "Please enter a valid book / chapter" : verseOutput }
    </>
  )
}

export default Text;