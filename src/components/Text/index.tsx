import { useState, useEffect, useRef } from 'react';
import getChapter from '../../api';
import "../../App.css";
import { FormattedGreekWord, FormattedVerse} from '../../types';
import generateVerses from '../Text/utils/generateVerses';


interface WordProps {
  onPhraseClick: (greekWords : FormattedGreekWord[]) => void;
  englishWords : string,
  isPhrase? : boolean,
  containsSubWords? : boolean,
  greekWords? : FormattedGreekWord[],
  handleClick: (params: any) => any,
}

function Word({onPhraseClick, greekWords, englishWords, isPhrase, containsSubWords, handleClick} : WordProps) {

  const wordRef = useRef(null);

  if(!greekWords)
  {
    return(
      <>
        <span>
          {englishWords}
        </span>
        <span> </span>
      </>
    )
  }
  else if(isPhrase)
  {
    return(
      <>
        <span ref={wordRef} 
              className="TextContainer__GreekPhrase"  
              onClick={() => {onPhraseClick(greekWords); handleClick(wordRef)}}>
          {englishWords}
        </span>
        <span> </span>
      </>
    )
  }
  else if(containsSubWords)
  {
    return(
      <>
        <span ref={wordRef} 
              className="TextContainer__GreekPhrase" 
              onClick={() => {onPhraseClick(greekWords); handleClick(wordRef)}}>
          {englishWords}
        </span>
        <span> </span>
      </>
    )
  }
  else
  {
    return(
      <>
        <span ref={wordRef} 
              className="TextContainer__GreekPhrase" 
              onClick={() => {onPhraseClick(greekWords); handleClick(wordRef)}}>
          {englishWords}
        </span>
        <span> </span>
      </>
    )
  }

}


interface TextProps {
    onPhraseClick: (greekWords : FormattedGreekWord[]) => any;
}

function Text({onPhraseClick}: TextProps)
{
  const [verses, setVerses] = useState([] as FormattedVerse[]);
  const [childClicked, setChildClicked] = useState<any>({});

  function handleChildClicked(newChildClicked: any) {

    if(childClicked?.current?.style?.color !== undefined) 
    {
      childClicked.current.style.color = "#001533CC";
      newChildClicked.current.style.color = "blue";
    } 

    setChildClicked(newChildClicked);
  }

  useEffect(() => {
    let data = getChapter();
    setVerses(generateVerses(data));
  }, []);


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