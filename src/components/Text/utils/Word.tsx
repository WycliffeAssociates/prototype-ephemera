import { FormattedGreekWord} from '../../../types';
import { useRef } from 'react';


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

  export default Word;