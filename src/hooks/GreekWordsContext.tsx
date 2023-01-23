import React, { useState, useContext } from "react";
import { FormattedGreekWord } from '../types';

const GreekWordContext = React.createContext({
    greekWords: undefined as FormattedGreekWord[] | undefined,
    setGreekWords: (newGreekWords: FormattedGreekWord[]) => {},
    showGreekWords: false as boolean,
    setShowGreekWords: (open: boolean) => {},
});

export function useGreekWords() {
    return useContext(GreekWordContext);
}

export function GreekWordsProvider({children} : any) {
    const [showGreekWords, setShowGreekWords] = useState(false);
    const [currentGreekWords, setCurrentGreekWords] = useState<FormattedGreekWord[]>([]);

    return (
        <GreekWordContext.Provider value={{
                                        greekWords:currentGreekWords,  
                                        setGreekWords: setCurrentGreekWords,
                                        showGreekWords: showGreekWords,
                                        setShowGreekWords: setShowGreekWords
                                    }}>
            {children}
        </GreekWordContext.Provider>
    )
}