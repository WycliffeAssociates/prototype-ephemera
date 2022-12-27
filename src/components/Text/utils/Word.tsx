import { NewFormattedGreekWord, NewFormattedWord, PhraseWord, SubWord} from '../../../types';
import { useRef } from 'react';
import { useSettings } from '../../../hooks/SettingsContext';
import { mapValidULBSettings } from '../utils/mapValidULBSettings';


interface WordProps {
    onPhraseClick: (words? : NewFormattedGreekWord[] |  PhraseWord[] | SubWord[]) => void;
    handleClick: (params: any) => any,
    versePhrase: NewFormattedWord
  }
  
  function Word({onPhraseClick, versePhrase, handleClick} : WordProps) {

    const wordRef = useRef(null);
    const { ULBSettings } = useSettings();
    let overwriteStyle : any = mapValidULBSettings(ULBSettings);
  
    if(versePhrase.phraseWords !== undefined) {
      let words : NewFormattedGreekWord[] = [...versePhrase.phraseWords];

      if(versePhrase.subWords !== undefined) {
        versePhrase.subWords.forEach((subWord) => {
          if(typeof subWord.word !== "string" && subWord.word.strongs !== undefined) {
            words.unshift(subWord.word);
          }
        })
      }

      return(
        <>
          <span ref={wordRef} 
                className="TextContainer__GreekPhrase"
                style={{...overwriteStyle}}
                onClick={() => {onPhraseClick(words); handleClick(wordRef); console.log(words)}}
          >
            {versePhrase.englishWords}
          </span>
          <span> </span>
        </>
      )
    } else if(versePhrase.subWords !== undefined) {
      let words : NewFormattedGreekWord[] = [];

      versePhrase.subWords.forEach((subWord) => {
        if(typeof subWord.word !== "string" && subWord.word.strongs !== undefined) {
          words.push(subWord.word);
        }
      })
    
      return(
        <>
          <span ref={wordRef} 
                className="TextContainer__GreekPhrase" 
                style={{...overwriteStyle}}
                onClick={() => {
                  onPhraseClick(words); 
                  handleClick(wordRef); 
                  console.log(versePhrase.subWords);
                }}
            >
            {versePhrase.englishWords}
          </span>
          <span> </span>
        </>
      )
    } else if(versePhrase.greekWords) {

      return(
        <>
          <span ref={wordRef} 
                className="TextContainer__GreekPhrase" 
                style={{...overwriteStyle}}
                onClick={() => {
                  onPhraseClick(versePhrase.greekWords); 
                  handleClick(wordRef); 
                  console.log(versePhrase.greekWords)
                }}
            >
            {versePhrase.englishWords}
          </span>
          <span> </span>
        </>
      )
    } else {
      return(
        <>
          <span style={{color:"#001533CC", textDecoration:"none", fontSize: overwriteStyle.fontSize}}>
            {versePhrase.englishWords}
          </span>
          <span> </span>
        </>
      )
    }
    
  
  }

  export default Word;