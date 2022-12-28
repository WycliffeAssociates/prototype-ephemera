import { NewFormattedGreekWord, NewFormattedWord, PhraseWord, SubWord} from '../../../types';
import { EnglishWord } from './EnglishWord';
import { GreekWord } from './GreekWord';
import { SubWordContainer } from './SubWordContainer';
import { PhraseWordContainer } from './PhraseWordContainer';


interface WordProps {
    onPhraseClick: (words? : NewFormattedGreekWord[] |  PhraseWord[] | SubWord[]) => void;
    handleClick: (params: any) => any,
    versePhrase: NewFormattedWord
}
  
  function Word({onPhraseClick, versePhrase, handleClick} : WordProps) {
  
    if(versePhrase.phraseWords !== undefined) {
      return(
        <PhraseWordContainer 
          handleClick={handleClick} 
          onPhraseClick={onPhraseClick} 
          versePhrase={versePhrase} 
        />
      )
    } else if(versePhrase.subWords !== undefined) {
      return(
        <SubWordContainer
          handleClick={handleClick} 
          onPhraseClick={onPhraseClick} 
          versePhrase={versePhrase} 
        />
      )
    } else if(versePhrase.greekWords) {
      return(
        <GreekWord 
          handleClick={handleClick} 
          onPhraseClick={onPhraseClick} 
          versePhrase={versePhrase} 
        />
      )
    } else {
      return(
        <EnglishWord versePhrase={versePhrase}/>
      )
    }
  }

  export default Word;