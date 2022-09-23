import { WordTag, 
    VerseTag, 
    ValidGreekWordNoteKeys, 
    GreekWordNotes, 
    GreekWordAttributes, 
    FormattedGreekWord, 
    NoteTag} from '../../../types'


function extractNoteElements(notes : NoteTag[] | undefined) {
    let tempGreekWordNotes : any = {};
    if(notes !== undefined)
    {
        notes.forEach((e) => {
            let greekWordNoteKey : ValidGreekWordNoteKeys = e.ATTR.type;
            let greekWordNoteValue : string = e._text;
            tempGreekWordNotes[greekWordNoteKey.slice(2)] = greekWordNoteValue;
        });
        tempGreekWordNotes = tempGreekWordNotes as GreekWordNotes;
    }
    return tempGreekWordNotes;  
}


function emptyGreekWordBuffer(greekWordBuffer : FormattedGreekWord[], greekWords : FormattedGreekWord[]) {
    let length = greekWordBuffer.length;
    for(let j = 0; j < length; j++)
    {
        let tempGreekWord = {... greekWordBuffer.pop() as FormattedGreekWord};
        greekWords.unshift(tempGreekWord);
    }
}



function handleConsumedPhraseWords(greekWordBuffer: FormattedGreekWord[], 
                                    currentPhraseWords: string, greekWords: FormattedGreekWord[]) {
    let tempWord = {
        englishWords: currentPhraseWords,
        greekWords: greekWords,
        isPhrase: true
    }
    
    greekWordBuffer.splice(0, greekWordBuffer.length);

    return tempWord;
}



function handleConsumedSubWords(currentWord: FormattedGreekWord | string, greekWords: FormattedGreekWord[], 
                                greekWordBuffer: FormattedGreekWord[])
{
    let currentEnglishWord = ""; 
    if(typeof currentWord !== "string")
    {
        currentWord.text = currentWord.text.replace('[1]', greekWords[0].text);
        greekWords.push({...currentWord}) // Examine verse 3
        currentEnglishWord = currentWord.text;
    }
    else
    {
        currentWord = currentWord.replace('[1]', greekWords[0].text);
        currentEnglishWord = currentWord;
    }

    let tempWord = {
        englishWords: currentEnglishWord,
        greekWords: greekWords,
        containsSubWords: true
    }

    greekWordBuffer.splice(0, greekWordBuffer.length);

    return tempWord;
}



function handleGreekWord(hasConsumedPhraseWord: boolean, hasConsumedSubWord: boolean, 
                        greekWordBuffer: FormattedGreekWord[], currentGreekWord: FormattedGreekWord | string, 
                        currentPhraseWords: string)
{
    let verseWordOutput: any[] = [];
    let greekWords : FormattedGreekWord[] = [];

    // check if buffer needs to be emptied. 
    if(hasConsumedPhraseWord || hasConsumedSubWord)
    {
        emptyGreekWordBuffer(greekWordBuffer, greekWords);
    }
    
    if(hasConsumedPhraseWord) // if buffer contains phrase words NOTE: current word is NOT processed
    {
        let tempWord = handleConsumedPhraseWords(greekWordBuffer, currentPhraseWords, greekWords) 
        verseWordOutput.push(tempWord);
    }
    else if(hasConsumedSubWord)// buffer contain subWords. NOTE: Current word is processed in this case
    {
        let tempWord = handleConsumedSubWords(currentGreekWord, greekWords, greekWordBuffer)
        verseWordOutput.push(tempWord);
    }
    else if(typeof currentGreekWord !== 'string')
    {
        if(currentGreekWord.text !== "√") // current word has english backing
        {
            let tempWord = {
               englishWords: currentGreekWord.text,
               greekWords: [currentGreekWord]
            }
            verseWordOutput.push(tempWord)
        }
    }
    else
    {
        let tempWord = {
            englishWords: currentGreekWord
        }
        verseWordOutput.push(tempWord)
    }

    return verseWordOutput;
}


function generateVerses (verses : VerseTag[]) {

    const verseOutput : any[] = [];

    // populates verseOutput with verse
    verses.forEach((verse : VerseTag, idx : number, verses : VerseTag[]) => {

        let verseWordOutput : any[] = [];
        let hasConsumedPhraseWord : boolean = false;
        let hasConsumedSubWord : boolean = false;
        let currentPhraseWords : string = "";
        let greekWordBuffer : FormattedGreekWord[] = [];
 
        // populates the verseWordOutput with verse words
        verse.w.forEach((word : WordTag | string) => {

            // TODO Convert to function. handleVerseWord(word, verseWordOutput)
            // takes case of cases where there is no attributes or children in the <w> tag. 
            if(typeof word !== "string")
            {
                let currentGreekWordNotes : GreekWordNotes = extractNoteElements(word.note);;
                let currentGreekWordAttributes: GreekWordAttributes = word.ATTR;;

                let currentGreekWord : FormattedGreekWord = {
                                                    ...currentGreekWordNotes, 
                                                    ...currentGreekWordAttributes, 
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
                    let words = handleGreekWord(hasConsumedPhraseWord, hasConsumedSubWord, greekWordBuffer, currentGreekWord, currentPhraseWords)
                    verseWordOutput = verseWordOutput.concat(words);
                    hasConsumedPhraseWord = false;
                    hasConsumedSubWord = false;
                }
            }
            else // word is just a string, but we still need to check buffer. 
            {
                let words = handleGreekWord(hasConsumedPhraseWord, hasConsumedSubWord, greekWordBuffer, word, currentPhraseWords)
                verseWordOutput = verseWordOutput.concat(words);
                hasConsumedPhraseWord = false;
                hasConsumedSubWord = false;
            }
        });

        // Ensures that phrase words at the end of a verse are processed
        if(hasConsumedPhraseWord)
        {
            let greekWords : FormattedGreekWord[] = [];
            emptyGreekWordBuffer(greekWordBuffer, greekWords);
            let tempWord = handleConsumedPhraseWords(greekWordBuffer, currentPhraseWords, greekWords)
            hasConsumedPhraseWord = false;
            verseWordOutput.push(tempWord);
        }

        let tempVerse = {
            verseWords: verseWordOutput
        }
        verseOutput.push(tempVerse);
    })

    return verseOutput;
}


export default generateVerses;