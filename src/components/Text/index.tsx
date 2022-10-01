import { useState, useEffect } from 'react';
import getChapter from '../../api';
import "../../App.css";
import { FormattedGreekWord, FormattedVerse} from '../../types';
import mapVerses from '../Text/utils/generateVerses'

interface WordProps {
  onPhraseClick: (greekWords : FormattedGreekWord[]) => void;
  englishWords : string,
  isPhrase? : boolean,
  containsSubWords? : boolean,
  greekWords? : FormattedGreekWord[]
}

function Word({onPhraseClick, greekWords, englishWords, isPhrase, containsSubWords} : WordProps) {
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
              <span className="TextContainer__GreekPhrase" onClick={() => {onPhraseClick([...greekWords])}}>
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
              <span className="TextContainer__GreekPhrase" onClick={() => {onPhraseClick([...greekWords])}}>
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
              <span className="TextContainer__GreekPhrase" onClick={() => {onPhraseClick([...greekWords])}}>
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

  useEffect(() => {
    let data = getChapter();
    setVerses(mapVerses(data));
  }, [])


  let verseOutput : any[] = [];

  verses.forEach((verse, index) => {
    let verseWordOutput : any[] = [];

    verse.verseWords.forEach((verseWord, idx) => {
      verseWordOutput.push(<Word onPhraseClick={onPhraseClick} {...verseWord} />)
    })

    const tempVerse = (
          <p className="TextContainer__Verse"><sup>{index + 1}</sup> {verseWordOutput}</p>
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