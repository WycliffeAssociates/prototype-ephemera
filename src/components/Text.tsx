import { CollectionsBookmarkRounded } from '@material-ui/icons';
import React, { useState, useEffect, useRef } from 'react';
import getChapter from '../api';

type Note = {
  ATTR: any,
  _: any,
}

type w = {
  ATTR: any,
  note: Note[],
  _: string,
}

type verse = {
  ATTR: any,
  note: [],
  w: w[]
}

type ValidGreekWordNoteKeys = "OGNTsort" | "text" | "sub" | "phraseWords" | "strongs";

type GreekWordNotes = {
  [key in ValidGreekWordNoteKeys] : string;
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
    let currentPhraseWords : string = "";
    let greekWordBuffer : GreekWord[] = [];

    // populates the verseWordOutput with verse words
    verse.w.forEach((word : w | string, i : number, words : any[]) => {
      // takes case of cases where there is no attributes or children in the <w> tag. 
      if(typeof word === "string")
      {
        verseWordOutput.push((<span>{word} </span>))
      }
      else
      {
        let currentGreekWordNotes : GreekWordNotes;
        let currentGreekWordAttributes: GreekWordAttributes;
        let tempGreekWordNotes : any = {};

        if(word.note !== undefined)
        {
          // extracts the notes for the greek word
          word.note.forEach((e) => {
            let greekWordNoteKey : ValidGreekWordNoteKeys = e.ATTR.type;
            let greekWordNoteValue : string = e._;
            tempGreekWordNotes[greekWordNoteKey.slice(2)] = greekWordNoteValue;
          });

          currentGreekWordNotes = tempGreekWordNotes as GreekWordNotes;

          // Extracts the attributes for the greek word
          currentGreekWordAttributes = word.ATTR;

          let currentGreekWord : GreekWord= {notes : currentGreekWordNotes, attributes : currentGreekWordAttributes, text: word._}

          // Ensures that it is infact a valis greek word, then processes phraseWords and subWords accordingly
          if(currentGreekWordNotes.OGNTsort !== undefined)
          {
            if(currentGreekWordNotes.phraseWords !== undefined) 
            {
              hasConsumedPhraseWord = true;
              greekWordBuffer.push(currentGreekWord);
              currentPhraseWords = currentGreekWordNotes.phraseWords;
            }
            else
            {
              // Check if we have consumed phrase words, if so, render correct data with GreekWord buffer.
              if(hasConsumedPhraseWord)
              {
                // NOTE: for some reason, this loop prevents the data being passed to the onPhraseClick from being overwritten
                let greekWords : GreekWord[] = [];
                let length = greekWordBuffer.length;
                for(let j = 0; j < length; j++)
                {
                  let tempGreekWord = greekWordBuffer.pop() as GreekWord;
                  greekWords.unshift(tempGreekWord);
                }

                // Cleans up buffer and resets flag.
                hasConsumedPhraseWord = false;
                greekWordBuffer.splice(0, greekWordBuffer.length);

                verseWordOutput.push(<><span onClick={() => {onPhraseClick([...greekWords])}} style={{textDecoration:"underline"}}>{currentPhraseWords}</span><span> </span></>)
              }
              
              // checks if the word has English backing, if so, display and pass corresponging greek word data
              if(word._ !== "√") 
              {
                verseWordOutput.push(<><span onClick={() => {onPhraseClick([currentGreekWord])}} style={{textDecoration:"underline"}}>{word._}</span><span> </span></>)
              }
            }
          }
        }
        else
        {
          verseWordOutput.push((<span>{word._} </span>))
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
      <p key={idx} style={{
        textAlign: "left",
        fontFamily: 'Lato',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "20px",
        lineHeight: "48px",
        color: "#001533CC"

      }}><sup>{idx + 1}</sup> {verseWordOutput}</p>
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