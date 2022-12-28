import { useRef } from 'react';
import { NewFormattedGreekWord, NewFormattedWord, PhraseWord, SubWord} from '../../../types';
import { useSettings } from '../../../hooks/SettingsContext';
import { mapValidULBSettings } from '../utils/mapValidULBSettings';

interface GreekWordProps {
    onPhraseClick: (words? : NewFormattedGreekWord[] |  PhraseWord[] | SubWord[]) => void;
    handleClick: (params: any) => any,
    versePhrase: NewFormattedWord,
}

export function GreekWord({onPhraseClick, handleClick, versePhrase} : GreekWordProps) {
    const wordRef = useRef(null);
    const { ULBSettings } = useSettings();
    let overwriteStyles : any = mapValidULBSettings(ULBSettings).wordStyles;

    return (
        <>
            <span ref={wordRef} 
                className="TextContainer__GreekPhrase" 
                style={{...overwriteStyles}}
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
}