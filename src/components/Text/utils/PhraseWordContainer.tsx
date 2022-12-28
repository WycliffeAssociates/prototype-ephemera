import { useRef } from 'react';
import { NewFormattedGreekWord, NewFormattedWord, PhraseWord, SubWord} from '../../../types';
import { useSettings } from '../../../hooks/SettingsContext';
import { mapValidULBSettings } from '../utils/mapValidULBSettings';


interface PhraseWordProps {
    onPhraseClick: (words? : NewFormattedGreekWord[] |  PhraseWord[] | SubWord[]) => void;
    handleClick: (params: any) => any,
    versePhrase: NewFormattedWord,
}

export function PhraseWordContainer({onPhraseClick, handleClick, versePhrase} : PhraseWordProps) {
    const wordRef = useRef(null);
    const { ULBSettings } = useSettings();
    let overwriteStyles : any = mapValidULBSettings(ULBSettings).wordStyles;

    let words : NewFormattedGreekWord[] = [];

    if(versePhrase?.phraseWords) {
        words = [...versePhrase.phraseWords];
    }

    if(versePhrase.subWords !== undefined) {
      versePhrase.subWords.forEach((subWord) => {
        if(typeof subWord.word !== "string" && subWord.word.strongs !== undefined) {
          words.unshift(subWord.word);
        }
      })
    }

    return (
        <>
        <span ref={wordRef} 
            className="TextContainer__GreekPhrase"
            style={{...overwriteStyles}}
            onClick={() => {onPhraseClick(words); handleClick(wordRef); console.log(words)}}
          >
            {versePhrase.englishWords}
          </span>
          <span> </span>
        </>
    )
}