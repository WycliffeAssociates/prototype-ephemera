import { NewFormattedGreekWord, NewFormattedWord, PhraseWord, SubWord } from '../../../types';
import { useRef } from 'react';
import { useSettings } from '../../../hooks/SettingsContext';
import { mapValidULBSettings } from '../utils/mapValidULBSettings';


interface SubWordProps {
    onPhraseClick: (words : NewFormattedGreekWord[]) => void;
    handleClick: (params: any) => any,
    versePhrase: NewFormattedWord,
}

export function SubWordContainer({versePhrase, onPhraseClick, handleClick} : SubWordProps) {
    const wordRef = useRef(null);
    const { ULBSettings } = useSettings();
    let overwriteStyles : any = mapValidULBSettings(ULBSettings).wordStyles;
    let words : NewFormattedGreekWord[] = [];

    if(versePhrase?.subWords) {
        versePhrase.subWords.forEach((subWord) => {
        if(typeof subWord.word !== "string" && subWord.word.strongs !== undefined) {
            words.push(subWord.word);
        }
        })
    }

    return (
        <>
            <span ref={wordRef} 
                className="TextContainer__GreekPhrase" 
                style={{...overwriteStyles}}
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
}