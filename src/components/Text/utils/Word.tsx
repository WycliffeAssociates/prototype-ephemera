import { NewFormattedGreekWord, NewFormattedWord, PhraseWord, SubWord} from '../../../types';
import { useRef } from 'react';


interface WordProps {
    onPhraseClick: (words? : NewFormattedGreekWord[] |  PhraseWord[] | SubWord[]) => void;
    handleClick: (params: any) => any,
    versePhrase: NewFormattedWord
  }
  
  
  function Word({onPhraseClick, versePhrase, handleClick} : WordProps) {
  
    const wordRef = useRef(null);
  
    if(versePhrase.phraseWords === undefined && versePhrase.subWords === undefined && versePhrase.subPhraseWords === undefined && versePhrase.greekWords === undefined)
    {
      return(
        <>
          <span style={{color:"#001533CC"}}>
            {versePhrase.englishWords}
          </span>
          <span> </span>
        </>
      )
    }
    
    else if(versePhrase.phraseWords !== undefined)
    {
      return(
        <>
          <span ref={wordRef} 
                className="TextContainer__GreekPhrase"  
                onClick={() => {onPhraseClick(versePhrase.phraseWords); handleClick(wordRef); console.log(versePhrase.phraseWords)}}>
            {versePhrase.englishWords}
          </span>
          <span> </span>
        </>
      )
    }
    
    else if(versePhrase.subWords !== undefined)
    {
      let words : NewFormattedGreekWord[] = [];

      versePhrase.subWords.forEach((subWord, idx, subWords) => {
        if(typeof subWord.word !== "string" && subWord.word.strongs !== undefined)
        {
          words.push(subWord.word);
        }
      })
      
      return(
        <>
          <span ref={wordRef} 
                className="TextContainer__GreekPhrase" 
                onClick={() => {onPhraseClick(words); handleClick(wordRef); console.log(versePhrase.subWords)}}>
            {versePhrase.englishWords}
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
                onClick={() => {onPhraseClick(versePhrase.greekWords); handleClick(wordRef); console.log(versePhrase.greekWords)}}>
            {versePhrase.englishWords}
          </span>
          <span> </span>
        </>
      )
    }
    
  
  }

  export default Word;