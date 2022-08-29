import { CollectionsBookmarkRounded } from '@material-ui/icons';
import React, { useState, useEffect, useRef } from 'react';
import getChapter from '../api';
import "../App.css";


type Note = {
  ATTR: any,
  _: any,
}

type w = {
  ATTR: any,
  note?: Note[],
  _: string,
}

type verse = {
  ATTR: any,
  note?: [],
  w: w[]
}

type ValidGreekWordNoteKeys = "OGNTsort" | "text" | "sub" | "phraseWords" | "strongs";

type GreekWordNotes = {
  OGNTSort : string,
  strongs : string,
  text? : string,
  sub? : string,
  phraseWords? : string,
}

type ValidGreekWordAttributeKeys = "lemma" | "morph";

type GreekWordAttributes = {
  [key in ValidGreekWordAttributeKeys] : string;
}

type GreekWord = {
  notes : GreekWordNotes;
  attributes : GreekWordAttributes;
  text : string;
}


interface TextProps {
    onPhraseClick: (greekWordNotes : GreekWord[]) => any;
}

function Text({onPhraseClick}: TextProps)
{
  const [verses, setVerses] = useState([] as verse[]);

  useEffect(() => {
    let data = getChapter()
    setVerses(data);
  }, [])

  const verseOutput : any[] = [];

  // populates verseOutput with verse
  verses.forEach((verse : verse, idx : number, verses : verse[]) => {

    const verseWordOutput : any[] = [];
    let hasConsumedPhraseWord : boolean = false;
    let hasConsumedSubWord : boolean = false;
    let currentPhraseWords : string = "";
    let greekWordBuffer : GreekWord[] = [];

    // populates the verseWordOutput with verse words
    verse.w.forEach((word : w | string, i : number, words : any[]) => {

      // takes case of cases where there is no attributes or children in the <w> tag. 
      if(typeof word !== "string")
      {
        let currentGreekWordNotes : GreekWordNotes = {} as GreekWordNotes;
        let currentGreekWordAttributes: GreekWordAttributes;
        let tempGreekWordNotes : any = {};

        if(word.note !== undefined)
        {
          word.note.forEach((e) => {
            let greekWordNoteKey : ValidGreekWordNoteKeys = e.ATTR.type;
            let greekWordNoteValue : string = e._;
            tempGreekWordNotes[greekWordNoteKey.slice(2)] = greekWordNoteValue;
          });

          currentGreekWordNotes = tempGreekWordNotes as GreekWordNotes;
        }

        currentGreekWordAttributes = word.ATTR;

        let currentGreekWord : GreekWord= {notes : currentGreekWordNotes, attributes : currentGreekWordAttributes, text: word._}

        // if phraseWord or subWord, insert to buffer
        if(currentGreekWordNotes.phraseWords !== undefined || currentGreekWordNotes.sub !== undefined) 
        {
          hasConsumedPhraseWord = (currentGreekWordNotes.phraseWords !== undefined );
          hasConsumedSubWord = (currentGreekWordNotes.sub !== undefined);
          greekWordBuffer.push(currentGreekWord);
          currentPhraseWords = (hasConsumedPhraseWord && currentGreekWordNotes.phraseWords !== undefined) ? currentGreekWordNotes.phraseWords : "";
        }
        else // is a normal greek word
        {
          let greekWords : GreekWord[] = [];

          // check if buffer needs to be emptied. 
          if(hasConsumedPhraseWord || hasConsumedSubWord)
          {
            // NOTE: for some reason, this loop prevents the data being passed to the onPhraseClick from being overwritten
            let length = greekWordBuffer.length;
            for(let j = 0; j < length; j++)
            {
              let tempGreekWord = greekWordBuffer.pop() as GreekWord;
              greekWords.unshift(tempGreekWord);
            }
          }
          
          if(hasConsumedPhraseWord) // if buffer contains phrase words NOTE: current word is NOT processed
          {
            verseWordOutput.push(<><span className="GreekPhrase" onClick={() => {onPhraseClick([...greekWords])}}>{currentPhraseWords}</span><span> </span></>)
            hasConsumedPhraseWord = false;
            greekWordBuffer.splice(0, greekWordBuffer.length);
          }
          
          if(hasConsumedSubWord)// buffer contain subWords. NOTE: Current word is processed in this case
          {
            currentGreekWord.text = currentGreekWord.text.replace('[1]', greekWords[0].text);
            greekWords.push(currentGreekWord)
            verseWordOutput.push(<><span className="GreekPhrase" onClick={() => {onPhraseClick([...greekWords])}}>{currentGreekWord.text}</span><span> </span></>)
            hasConsumedSubWord = false;
            greekWordBuffer.splice(0, greekWordBuffer.length);
          }
          else if(word._ !== "√") // current word has english backing
          {
            verseWordOutput.push(<><span className="GreekPhrase" onClick={() => {onPhraseClick([currentGreekWord])}}>{word._}</span><span> </span></>)
          }
        }
      }
      else // word is just a string, but we still need to check buffer. 
      {
        let greekWords : GreekWord[] = [];
        // check if buffer needs to be emptied. 
        if(hasConsumedPhraseWord || hasConsumedSubWord)
        {
          // NOTE: for some reason, this loop prevents the data being passed to the onPhraseClick from being overwritten
          let length = greekWordBuffer.length;
          for(let j = 0; j < length; j++)
          {
            let tempGreekWord = greekWordBuffer.pop() as GreekWord;
            greekWords.unshift(tempGreekWord);
          }
        }
        
        if(hasConsumedPhraseWord) // if buffer contains phrase words NOTE: current word is NOT processed
        {
          verseWordOutput.push(<><span className="GreekPhrase" onClick={() => {onPhraseClick([...greekWords])}}>{currentPhraseWords}</span><span> </span></>)
          hasConsumedPhraseWord = false;
          greekWordBuffer.splice(0, greekWordBuffer.length);
        }
        
        if(hasConsumedSubWord)// buffer contain subWords. NOTE: Current word is processed in this case
        {
          word = word.replace('[1]', greekWords[0].text);
          verseWordOutput.push(<><span className="GreekPhrase" onClick={() => {onPhraseClick([...greekWords])}}>{word}</span><span> </span></>)
          hasConsumedSubWord = false;
          greekWordBuffer.splice(0, greekWordBuffer.length);
        }
        else// check if current word has english backing
        {
          verseWordOutput.push(<><span>{word}</span><span> </span></>)
        }
      }
    });

    // Ensures that phrase words at the end of a verse are processed
    if(hasConsumedPhraseWord)
    {
      let greekWords : GreekWord[] = [];
      let length = greekWordBuffer.length;
      for(let j = 0; j < length; j++)
      {
        let tempGreekWord = greekWordBuffer.pop() as GreekWord;
        greekWords.push(tempGreekWord);
      }

      verseWordOutput.push(<><span onClick={() => {onPhraseClick([...greekWords])}} style={{textDecoration:"underline"}}>{currentPhraseWords}</span><span> </span></>)
      hasConsumedPhraseWord = false;
    }

    // renders verse with verse words
    const tempVerse = (
      <p className="Verse" key={idx}><sup>{idx + 1}</sup> {verseWordOutput}</p>
    )
    verseOutput.push(tempVerse);
  })

  return (
    <>
      {verseOutput}
    </>
  )
}

export default Text;