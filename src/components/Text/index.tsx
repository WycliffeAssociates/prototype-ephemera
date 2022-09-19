import { useState, useEffect } from 'react';
import getChapter from '../../api';
import "../../App.css";
import { FormattedGreekWord, FormattedVerse} from '../../types';

import generateVerses from '../Text/utils/generateVerses'


// TODO: take thsi word and interface into its separate file. 
interface WordProps {
  onPhraseClick: (greekWords : FormattedGreekWord[]) => any;
  englishWords : string,
  isPhrase? : boolean,
  containsSubWords? : boolean,
  greekWords? : FormattedGreekWord[]
}

function Word({onPhraseClick, greekWords, englishWords, isPhrase, containsSubWords} : WordProps) {

  if(!greekWords)
  {
    return(<><span>{englishWords}</span><span> </span></>)
  }
  else if(isPhrase)
  {
    return(<><span className="TextContainer__GreekPhrase" onClick={() => {onPhraseClick([...greekWords])}}>{englishWords}</span><span> </span></>)
  }
  else if(containsSubWords)
  {
    return(<><span className="TextContainer__GreekPhrase" onClick={() => {onPhraseClick([...greekWords])}}>{englishWords}</span><span> </span></>)
  }
  else
  {
    return(<><span className="TextContainer__GreekPhrase" onClick={() => {onPhraseClick([...greekWords])}}>{englishWords}</span><span> </span></>)
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
    setVerses(generateVerses(data));
   
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