import { NewFormattedWord, FormattedGreekWord} from '../../../types';
import { EnglishWord } from './EnglishWord';
import { GreekWord } from './GreekWord';
import { SubWordContainer } from './SubWordContainer';
import { PhraseWordContainer } from './PhraseWordContainer';
import { useGreekWords } from '../../../hooks/GreekWordsContext';


interface WordProps {
    handleClick: (params: any) => any,
    versePhrase: NewFormattedWord
}
  
  function Word({versePhrase, handleClick} : WordProps) {

    const { setGreekWords, setShowGreekWords } = useGreekWords();

    function handlePhraseClick(newGreekWords: FormattedGreekWord[]) {
      setGreekWords(newGreekWords);
      setShowGreekWords(true);
    }
  
    if(versePhrase.phraseWords !== undefined) {
      return(
        <PhraseWordContainer 
          handleClick={handleClick} 
          onPhraseClick={handlePhraseClick} 
          versePhrase={versePhrase} 
        />
      )
    } else if(versePhrase.subWords !== undefined) {
      return(
        <SubWordContainer
          handleClick={handleClick} 
          onPhraseClick={handlePhraseClick} 
          versePhrase={versePhrase} 
        />
      )
    } else if(versePhrase.greekWords) {
      return(
        <GreekWord 
          handleClick={handleClick} 
          onPhraseClick={handlePhraseClick} 
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