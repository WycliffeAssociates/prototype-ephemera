import { Console } from 'console';
import { buffer } from 'stream/consumers';
import { WordTag, 
    VerseTag,
    NoteTag,
    ValidGreekWordNoteKeys, 
    GreekWordNotes, 
    GreekWordAttributes, 
    FormattedGreekWord,
    NewFormattedGreekWord,
    NewFormattedWord,
    NewFormattedVerse,
    SubWord,
    PhraseWord,} from '../../../types'


function mapVerses (verses : VerseTag[]) {

    const verseOutput : any[] = [];

    // populates verseOutput with verse
    verses.forEach((verse : VerseTag) => {

        let flags = {consumedPhraseWord: false, consumedSubWord: false, consumedSubPhraseWord: false};
        let buffers = {verseWords : [] as any[], subWords : [] as SubWord[], phraseWords : [] as PhraseWord[]}
    
        // populates the verseWordOutput with verse words
        verse.w.forEach((word : WordTag | string) => {
            mapVerseWord(word, flags, buffers)
        });

        // Ensures that phrase words at the end of a verse are processed
        if(flags.consumedPhraseWord)
        {
            let tempWord = processConsumedPhraseWords(buffers.phraseWords)
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
    consumedSubWord: boolean,
    consumedSubPhraseWord: boolean,
}

type WordMapBuffers = {
    verseWords : any[], 
    phraseWords : PhraseWord[],
    subWords: SubWord[],
}


function mapVerseWord(word: WordTag |string, flags: WordMapFlags, buffers: WordMapBuffers) {

    if(typeof word !== "string")
    {
        
        let currentGreekWordNotes : GreekWordNotes = mapNotes(word.note);
        let currentGreekWordAttributes: GreekWordAttributes = word.ATTR;;
    
        let sub = currentGreekWordNotes.sub;


        delete currentGreekWordNotes.sub;

        let currentGreekWord : NewFormattedGreekWord = {
                                            ...currentGreekWordNotes, 
                                            ...currentGreekWordAttributes, 
                                            text: word._text
                                }    
        if(currentGreekWordNotes.phraseWords !== undefined)
        {
            flags.consumedPhraseWord = true;
            buffers.phraseWords.push({...currentGreekWord, phraseWords: currentGreekWordNotes.phraseWords});
        }
        else if(sub !== undefined)
        {
            flags.consumedSubWord = true;
            let subWord : SubWord = {subIdx: sub as string, word: {...currentGreekWord} as NewFormattedGreekWord};
            buffers.subWords.push(subWord);
        }
        else if(currentGreekWordNotes.subPhraseWords !== undefined)
        {
            // TODO: finish
            // flags.consumedSubPhraseWord = true;
            // buffers.subWords.push(currentGreekWord);
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


function mapWord(word : NewFormattedGreekWord | string, flags: WordMapFlags, buffers: WordMapBuffers)
{

    if(typeof word !== "string" && word.text === "√" && flags.consumedPhraseWord === false)
    {
        // flags.consumedPhraseWord = false;
        return;
    }


    if(flags.consumedPhraseWord) // if buffer contains phrase words NOTE: current word is NOT processed
    {


        // TODO: may need to handle leftover sub words here
        // TODO: may also need to handle leftover phrase words, in the case that one phrase is directly
        // followed by another. SHould be just a check against the phraseWords attribute. All words belonging to the same phrase
        // will have the same value for that. 

        let tempWord = processConsumedPhraseWords(buffers.phraseWords) 
        buffers.verseWords.push(tempWord);

        if(typeof word !== 'string')
        {
            // TODO: check if I can remove this if statement
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
    }
    else if(flags.consumedSubWord)// buffer contain subWords. NOTE: Current word is processed in this case
    {
        let leftOverPhraseWords = processConsumedPhraseWords(buffers.phraseWords) 

        if(leftOverPhraseWords.phraseWords.length > 0)
        {
            buffers.verseWords.push(leftOverPhraseWords);
        }
        
        let tempWord = processConsumedSubWords(word, buffers.subWords);

        buffers.verseWords.push(tempWord);

    }
    else if(typeof word !== 'string')
    {
        // TODO: check if I can remove this if statement
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
    flags.consumedSubPhraseWord = false;
}



function mapNotes(notes : NoteTag[] | undefined) {
    let tempGreekWordNotes : any = {};
    if(notes !== undefined)
    {

        if(!Array.isArray(notes))
        {
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
        englishWords: pharseWords[0]?.phraseWords,
        phraseWords: [...greekWordBuffer],
    }

    greekWordBuffer.splice(0, pharseWords.length);

    return tempWord;
}



function processConsumedSubWords(currentWord: NewFormattedGreekWord | string, subWordBuffer: SubWord[])
{

    let returnWords : any[] = [...subWordBuffer]

    let currentEnglishWord = ""; 
    if(typeof currentWord !== "string")
    {
        for(let i = 0; i < subWordBuffer.length; i++ )
        {
            let currentSubWord = subWordBuffer[i].word;
            if(typeof currentSubWord !== "string")
            {
                currentWord.text = currentWord.text.replace(subWordBuffer[i].subIdx as string, currentSubWord.text);
            }
        }
        returnWords.push({word: currentWord})
        currentEnglishWord = currentWord.text;
    }
    else
    {
        for(let i = 0; i < subWordBuffer.length; i++ )
        {
            let currentSubWord = subWordBuffer[i].word;
            if(typeof currentSubWord !== "string")
            {
                currentWord = currentWord.replace(subWordBuffer[i].subIdx as string, currentSubWord.text);
            }
        }
        currentEnglishWord = currentWord;
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