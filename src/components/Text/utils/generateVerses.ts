import { WordTag, 
    VerseTag,
    NoteTag,
    ValidGreekWordNoteKeys, 
    GreekWordNotes, 
    GreekWordAttributes, 
    FormattedGreekWord} from '../../../types'


function mapVerses (verses : VerseTag[]) {

    const verseOutput : any[] = [];

    // populates verseOutput with verse
    verses.forEach((verse : VerseTag) => {

        let flags = {consumedPhraseWord: false, consumedSubWord: false};
        let buffers = {verseWords : [] as any[], currentPhraseWords : "", greekWords : [] as FormattedGreekWord[]}
    
        // populates the verseWordOutput with verse words
        verse.w.forEach((word : WordTag | string) => {
            mapVerseWord(word, flags, buffers)
        });

        // Ensures that phrase words at the end of a verse are processed
        if(flags.consumedPhraseWord)
        {
            let greekWords : FormattedGreekWord[] = emptyGreekWordBuffer(buffers.greekWords);
            let tempWord = processConsumedPhraseWords(buffers.greekWords, buffers.currentPhraseWords, greekWords)
            buffers.verseWords.push(tempWord);
        }

        let tempVerse = {
            verseWords: buffers.verseWords
        }
        verseOutput.push(tempVerse);
    })

    return verseOutput;
}


type WordMapFlags = {
    consumedPhraseWord: boolean, 
    consumedSubWord: boolean
}

type WordMapBuffers = {
    verseWords : any[], 
    currentPhraseWords :string, 
    greekWords : FormattedGreekWord[]
}


function mapVerseWord(word: WordTag |string, flags: WordMapFlags, buffers: WordMapBuffers) {
    if(typeof word !== "string")
    {
        let currentGreekWordNotes : GreekWordNotes = mapNotes(word.note);;
        let currentGreekWordAttributes: GreekWordAttributes = word.ATTR;;
    
        let currentGreekWord : FormattedGreekWord = {
                                            ...currentGreekWordNotes, 
                                            ...currentGreekWordAttributes, 
                                            text: word._text
                                        }
    
        // if phraseWord or subWord, insert to buffer
        if(currentGreekWordNotes.phraseWords !== undefined || currentGreekWordNotes.sub !== undefined) 
        {
            flags.consumedPhraseWord = (currentGreekWordNotes.phraseWords !== undefined );
            flags.consumedSubWord = (currentGreekWordNotes.sub !== undefined);
    
            buffers.greekWords.push(currentGreekWord);
            buffers.currentPhraseWords = (flags.consumedPhraseWord && currentGreekWordNotes.phraseWords !== undefined) 
                                    ? currentGreekWordNotes.phraseWords : "";
        }
        else // is a normal word
        {
            mapWord(currentGreekWord, flags, buffers)
        }
    }
    else // word is just a string, but we still need to check buffer. 
    {
        mapWord(word, flags, buffers)
    }
}


function mapWord(word : FormattedGreekWord | string, flags: WordMapFlags, buffers: WordMapBuffers)
{
    let greekWords : FormattedGreekWord[] = [];

    // check if buffer needs to be emptied. 
    if(flags.consumedPhraseWord || flags.consumedSubWord)
    {
        greekWords = emptyGreekWordBuffer(buffers.greekWords);
    }
    
    if(flags.consumedPhraseWord) // if buffer contains phrase words NOTE: current word is NOT processed
    {
        let tempWord = processConsumedPhraseWords(buffers.greekWords, buffers.currentPhraseWords, greekWords) 
        buffers.verseWords.push(tempWord);
    }
    else if(flags.consumedSubWord)// buffer contain subWords. NOTE: Current word is processed in this case
    {
        let tempWord = processConsumedSubWords(word, greekWords, buffers.greekWords)
        buffers.verseWords.push(tempWord);
    }
    else if(typeof word !== 'string')
    {
        if(word.text !== "√") // current word has english backing
        {
            let tempWord = {
               englishWords: word.text,
               greekWords: [word]
            }
            buffers.verseWords.push(tempWord)
        }
    }
    else
    {
        let tempWord = {
            englishWords: word
        }
        buffers.verseWords.push(tempWord)
    }

    flags.consumedPhraseWord = false;
    flags.consumedSubWord = false;
}


function mapNotes(notes : NoteTag[] | undefined) {
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


function emptyGreekWordBuffer(greekWordBuffer : FormattedGreekWord[]) {
    let greekWords: FormattedGreekWord[] = [];
    let length = greekWordBuffer.length;
    for(let j = 0; j < length; j++)
    {
        let tempGreekWord = {... greekWordBuffer.pop() as FormattedGreekWord};
        greekWords.unshift(tempGreekWord);
    }
    return greekWords;
}


function processConsumedPhraseWords(greekWordBuffer: FormattedGreekWord[], 
                                    currentPhraseWords: string, greekWords: FormattedGreekWord[]) {
    let tempWord = {
        englishWords: currentPhraseWords,
        greekWords: greekWords,
        isPhrase: true
    }
    
    greekWordBuffer.splice(0, greekWordBuffer.length);

    return tempWord;
}


function processConsumedSubWords(currentWord: FormattedGreekWord | string, greekWords: FormattedGreekWord[], 
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


export default mapVerses;