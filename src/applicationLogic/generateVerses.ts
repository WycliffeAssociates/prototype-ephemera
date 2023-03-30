import { WordTag, 
    VerseTag,
    NoteTag,
    ValidGreekWordNoteKeys, 
    GreekWordNotes, 
    GreekWordAttributes, 
    NewFormattedGreekWord,
    SubWord,
    PhraseWord,} from '../types';


function mapVerses (verses : VerseTag[]) {

    const verseOutput : any[] = [];

    if(verses === undefined) {
        return verseOutput;
    }

    // populates verseOutput with verse
    verses.forEach((verse : VerseTag) => {

        let flags = {consumedPhraseWord: false, consumedSubWord: false, consumedSubPhraseWord: false};
        let buffers = {verseWords : [] as any[], subWords : [] as SubWord[], phraseWords : [] as PhraseWord[], subPhraseWords : [] as any[]}
    
        // populates the verseWordOutput with verse words
        verse.w.forEach((word : WordTag | string) => {
            mapVerseWord(word, flags, buffers)
        });

        // Ensures that phrase words at the end of a verse are processed
        if(flags.consumedPhraseWord) {
            let tempWord = processConsumedPhraseWords(buffers.phraseWords)
            buffers.verseWords.push(tempWord);
        }

        let tempVerse = {
            verseNum: parseInt(verse.ATTR.name.slice(verse.ATTR.name.indexOf(':') + 1)),
            verseWords: buffers.verseWords
        }
        verseOutput.push(tempVerse);
    })
    return verseOutput;
}


type WordMapFlags = {
    consumedPhraseWord: boolean, 
    consumedSubWord: boolean,
    consumedSubPhraseWord: boolean,
}

type WordMapBuffers = {
    verseWords : any[], 
    phraseWords : PhraseWord[],
    subWords: SubWord[],
    subPhraseWords: any[],
}


function mapVerseWord(word: WordTag |string, flags: WordMapFlags, buffers: WordMapBuffers) {

    if(typeof word !== "string") {
        // Fails gracefully for cases where given data is not valid
        if(word._text === undefined) {
            return;
        }

        let currentGreekWordNotes : GreekWordNotes = mapNotes(word.note);
        let currentGreekWordAttributes: GreekWordAttributes = word.ATTR;;
    
        let sub = currentGreekWordNotes.sub;

        delete currentGreekWordNotes.sub;

        let currentGreekWord : NewFormattedGreekWord = {
                                            ...currentGreekWordNotes, 
                                            ...currentGreekWordAttributes, 
                                            text: word._text
                                }    
        if(currentGreekWordNotes.phraseWords !== undefined) {
            flags.consumedPhraseWord = true;
            buffers.phraseWords.push({...currentGreekWord, phraseWords: currentGreekWordNotes.phraseWords});
        } else if(sub !== undefined) {
            flags.consumedSubWord = true;
            let subWord : SubWord = {subIdx: sub as string, word: {...currentGreekWord} as NewFormattedGreekWord};
            buffers.subWords.push(subWord);
        } else if(currentGreekWordNotes.subPhraseWords !== undefined) {
            flags.consumedSubPhraseWord = true;
            buffers.subPhraseWords.push(currentGreekWord);
        }
        else { // is a normal word
            mapWord(currentGreekWord, flags, buffers)
        }
    }
    else { // word is just a string, but we still need to check buffer. 
        mapWord(word, flags, buffers)
    }
}


function mapWord(word : NewFormattedGreekWord | string, flags: WordMapFlags, buffers: WordMapBuffers)
{

    if(typeof word !== "string" && word.text === "√" && flags.consumedPhraseWord === false) {
        return;
    }

    if(flags.consumedPhraseWord) { // if buffer contains phrase words NOTE: current word is NOT processed
        // TODO: may also need to handle leftover phrase words, in the case that one phrase is directly
        // followed by another. Should be just a check against the phraseWords attribute. All words belonging to the same phrase
        // will have the same value for that. 
        let subWords;
        if(flags.consumedSubWord && typeof word !== "string" && word.text === "√") {
            return;
        }

        if(flags.consumedSubWord) { 
            subWords = processConsumedSubWords(word, buffers.subWords);
        } 

        let tempWord = processConsumedPhraseWords(buffers.phraseWords);

        buffers.verseWords.push(tempWord);

        if(typeof word !== 'string') {
            if(subWords) {
                buffers.verseWords.push(subWords);
            } else if(word.text !== "√") {
                let tempWord = {
                   englishWords: word.text,
                   greekWords: [word],
                }
                buffers.verseWords.push(tempWord)
            }
        } else {
            let tempWord = {
                englishWords: word
            }
            buffers.verseWords.push(tempWord)
        }
    } else if(flags.consumedSubWord) { // buffer contain subWords. NOTE: Current word is processed in this case
        
        let leftOverPhraseWords = processConsumedPhraseWords(buffers.phraseWords) 

        if(leftOverPhraseWords.phraseWords.length > 0) {
            buffers.verseWords.push(leftOverPhraseWords);
        }
        
        let tempWord = processConsumedSubWords(word, buffers.subWords);

        buffers.verseWords.push(tempWord);
    } else if(typeof word !== 'string') {
        // TODO: check if I can remove this if statement
        if(word.text !== "√") { // current word has english backing 
            let tempWord = {
               englishWords: word.text,
               greekWords: [word]
            }
            buffers.verseWords.push(tempWord)
        }
    } else {
        let tempWord = {
            englishWords: word
        }
        buffers.verseWords.push(tempWord)
    }

    flags.consumedPhraseWord = false;
    flags.consumedSubWord = false;
    flags.consumedSubPhraseWord = false;
}



function mapNotes(notes : NoteTag[] | undefined) {
    let tempGreekWordNotes : any = {};
    if(notes !== undefined) {

        if(!Array.isArray(notes)) {
            notes = [notes];
        }

        notes.forEach((e) => {
            let greekWordNoteKey : ValidGreekWordNoteKeys = e.ATTR.type;
            let greekWordNoteValue : string = e._text;
            tempGreekWordNotes[greekWordNoteKey.slice(2)] = greekWordNoteValue;
        });
        tempGreekWordNotes = tempGreekWordNotes as GreekWordNotes;
    }
    return tempGreekWordNotes;  
}


function processConsumedPhraseWords(greekWordBuffer: PhraseWord[]) {


    let pharseWords = greekWordBuffer.filter((word) => (word.text === "√"))
    let tempWord = {
        englishWords: pharseWords[0]?.subPhraseWords ? pharseWords[0]?.subPhraseWords : pharseWords[0]?.phraseWords,
        phraseWords: [...greekWordBuffer],
        subWords: [] as any[],
    }

    greekWordBuffer.splice(0, pharseWords.length);

    return tempWord;
}



function processConsumedSubWords(currentWord: NewFormattedGreekWord | string, subWordBuffer: SubWord[])
{
    // TODO: refactor so I am not having two nearly identical forloops. Also, abstract this out to anotehr function since there seesm to be so many edge cases 
    // when handling sub words, and additional functions are likely going to be needed
    let returnWords : any[] = [...subWordBuffer]
    let currentEnglishWord = ""; 

    let source : string = "";
    if(typeof(currentWord) === "string") {
        source = currentWord;
    } else if (currentWord.text === "√" && currentWord.phraseWords) {
        source = currentWord.phraseWords;
    } else {
        source = currentWord.text
    }


    // if(typeof currentWord !== "string") {
    for(let i = 0; i < subWordBuffer.length; i++ )
    {
        let currentSubWord = subWordBuffer[i].word;
        if(typeof(currentSubWord) !== "string")
        {
            // TODO: add else if for phrasewords
            if(currentSubWord.subPhraseWords) {
                source = source.replace(subWordBuffer[i].subIdx as string, currentSubWord.subPhraseWords);
            }
            else if(currentSubWord.phraseWords) {
                currentSubWord.phraseWords = currentSubWord.phraseWords.replace(subWordBuffer[i].subIdx as string, currentSubWord.text);

                // TODO: see if I can bring this out of the for loop to decrease run time
                if(typeof currentWord !== "string" && currentWord.phraseWords) {
                    currentWord.phraseWords = currentSubWord.phraseWords
                }
            } else {
                source = source.replace(subWordBuffer[i].subIdx as string, currentSubWord.text);
            }
        }
    }
    currentEnglishWord = source;
    if(typeof currentWord !== "string" && !currentWord.phraseWords) {
        currentWord.text = source;
        returnWords.push({word: currentWord});
    } 

    let tempWord = {
        englishWords: currentEnglishWord,
        subWords: returnWords
    }

    subWordBuffer.splice(0, subWordBuffer.length);

    return tempWord;
}


function emptyBuffer<BufferType>(greekWordBuffer : BufferType[]) {
    let greekWords: BufferType[] = [];
    let length = greekWordBuffer.length;
    for(let j = 0; j < length; j++)
    {
        let tempGreekWord = {... greekWordBuffer.pop() as BufferType};
        greekWords.unshift(tempGreekWord);
    }
    return greekWords;
}


export default mapVerses;