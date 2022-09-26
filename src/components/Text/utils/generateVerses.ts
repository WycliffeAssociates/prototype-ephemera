import { WordTag, 
    VerseTag, 
    ValidGreekWordNoteKeys, 
    GreekWordNotes, 
    GreekWordAttributes, 
    FormattedGreekWord } from '../../../types'


function generateVerses (verses : VerseTag[]) {

    const verseOutput : any[] = [];

    // populates verseOutput with verse
    verses.forEach((verse : VerseTag, idx : number, verses : VerseTag[]) => {

        const verseWordOutput : any[] = [];
        let hasConsumedPhraseWord : boolean = false;
        let hasConsumedSubWord : boolean = false;
        let currentPhraseWords : string = "";
        let greekWordBuffer : FormattedGreekWord[] = [];
 
        // populates the verseWordOutput with verse words
        verse.w.forEach((word : WordTag | string, i : number, words : any[]) => {

        // takes case of cases where there is no attributes or children in the <w> tag. 
        if(typeof word !== "string")
        {
            let currentGreekWordNotes : GreekWordNotes = {} as any;
            let currentGreekWordAttributes: GreekWordAttributes;
            let tempGreekWordNotes : any = {};

            if(word.note !== undefined)
            {
            word.note.forEach((e) => {
                let greekWordNoteKey : ValidGreekWordNoteKeys = e.ATTR.type;
                let greekWordNoteValue : string = e._text;
                tempGreekWordNotes[greekWordNoteKey.slice(2)] = greekWordNoteValue;
            });

            currentGreekWordNotes = tempGreekWordNotes as GreekWordNotes;
            }

            currentGreekWordAttributes = word.ATTR;

            let currentGreekWord : FormattedGreekWord = {
                                                ...currentGreekWordNotes, 
                                                ...currentGreekWordAttributes, 
                                                description: {mainDescription: "", subDescriptions: []},
                                                text: word._text
                                            }

            // if phraseWord or subWord, insert to buffer
            if(currentGreekWordNotes.phraseWords !== undefined || currentGreekWordNotes.sub !== undefined) 
            {
                hasConsumedPhraseWord = (currentGreekWordNotes.phraseWords !== undefined );
                hasConsumedSubWord = (currentGreekWordNotes.sub !== undefined);
                greekWordBuffer.push(currentGreekWord);
                currentPhraseWords = (hasConsumedPhraseWord && currentGreekWordNotes.phraseWords !== undefined) 
                                        ? currentGreekWordNotes.phraseWords : "";
            }
            else // is a normal greek word
            {
                let greekWords : FormattedGreekWord[] = [];

                // check if buffer needs to be emptied. 
                if(hasConsumedPhraseWord || hasConsumedSubWord)
                {
                    // NOTE: for some reason, this loop prevents the data being passed to the onPhraseClick from being overwritten
                    let length = greekWordBuffer.length;
                    for(let j = 0; j < length; j++)
                    {
                        let tempGreekWord = {... greekWordBuffer.pop() as FormattedGreekWord};
                        greekWords.unshift(tempGreekWord);
                    }
                }
                
                if(hasConsumedPhraseWord) // if buffer contains phrase words NOTE: current word is NOT processed
                {
                    let tempWord = {
                        englishWords: currentPhraseWords,
                        greekWords: greekWords,
                        isPhrase: true
                    }

                    verseWordOutput.push(tempWord)
                    hasConsumedPhraseWord = false;
                    greekWordBuffer.splice(0, greekWordBuffer.length);
                }
                
                if(hasConsumedSubWord)// buffer contain subWords. NOTE: Current word is processed in this case
                {
                    currentGreekWord.text = currentGreekWord.text.replace('[1]', greekWords[0].text);
                    greekWords.push({...currentGreekWord})

                    let tempWord = {
                        englishWords: currentGreekWord.text,
                        greekWords: greekWords,
                        containsSubWords: true
                    }

                    verseWordOutput.push(tempWord)
                    hasConsumedSubWord = false;
                    greekWordBuffer.splice(0, greekWordBuffer.length);
                }
                else if(word._text !== "√") // current word has english backing
                {
                    let tempWord = {
                       englishWords: word._text,
                       greekWords: [currentGreekWord]
                    }
                    verseWordOutput.push(tempWord)
                }
            }
        }
        else // word is just a string, but we still need to check buffer. 
        {
            let greekWords : FormattedGreekWord[] = [];
            // check if buffer needs to be emptied. 
            if(hasConsumedPhraseWord || hasConsumedSubWord)
            {
            // NOTE: for some reason, this loop prevents the data being passed to the onPhraseClick from being overwritten
            let length = greekWordBuffer.length;
            for(let j = 0; j < length; j++)
            {
                let tempGreekWord = greekWordBuffer.pop() as FormattedGreekWord;
                greekWords.unshift({...tempGreekWord});
            }
            }
            
            if(hasConsumedPhraseWord) // if buffer contains phrase words NOTE: current word is NOT processed
            {

                let tempWord = {
                    englishWords: currentPhraseWords, 
                    greekWords: greekWords,
                    isPhrase: true
                }

                verseWordOutput.push(tempWord)
                hasConsumedPhraseWord = false;
                greekWordBuffer.splice(0, greekWordBuffer.length);
                }
            
                if(hasConsumedSubWord)// buffer contain subWords. NOTE: Current word is processed in this case
                {
                    // TODO: update this to accout for cases wheere there are multiple sub words. 
                    word = word.replace('[1]', greekWords[0].text);

                    let tempWord = {
                        englishWords: word,
                        greekWords: greekWords,
                        containsSubWords: true
                    }

                    verseWordOutput.push(tempWord)
                    hasConsumedSubWord = false;
                    greekWordBuffer.splice(0, greekWordBuffer.length);
                }
                else// check if current word has english backing
                {
                    let tempWord = {
                        englishWords: word
                    }
                    // <><span>{word}</span><span> </span></>
                    verseWordOutput.push(tempWord)
                }
        }
        });

        // Ensures that phrase words at the end of a verse are processed
        if(hasConsumedPhraseWord)
        {
        let greekWords : FormattedGreekWord[] = [];
        let length = greekWordBuffer.length;
        for(let j = 0; j < length; j++)
        {
            let tempGreekWord = greekWordBuffer.pop() as FormattedGreekWord;
            greekWords.push({...tempGreekWord});
        }

        let tempWord = {
            englishWords: currentPhraseWords,
            greekWords: greekWords,
            isPhrase: true
        }
        verseWordOutput.push(tempWord)
        hasConsumedPhraseWord = false;
        }

        let tempVerse = {
            verseWords: verseWordOutput
        }
        verseOutput.push(tempVerse);
    })

    return verseOutput;
}


export default generateVerses;