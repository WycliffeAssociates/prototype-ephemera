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
  w: w[] | string,
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



// TODO add remaining props for english phrase data
interface TextProps {
    onPhraseClick: (greekWordNotes : GreekWord) => any;
}


function Text({onPhraseClick}: TextProps)
{

  const [verses, setVerses] = useState([] as verse[]);
  const [hasConsumedPhraseWord, setHasConsumedPhraseWord] = useState<boolean>(false);
  const numPhraseWordsConsumed = useRef(0);
  const phraseWordsBuffer = useRef(new Array());

  useEffect(() => {
    let data = getChapter()
    setVerses(data);
  }, [])


  // TODO create words first, then pass that inside the 


  let verseText = verses.map((e: any, i : number) => 

  
  <p key={i} style={{
    textAlign: "left",
    fontFamily: 'Lato',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "48px",
    color: "#001533CC"

  }}> 
    {
      // TODO remove this dependancy on map so I can skip over phraseWords
        // 1) create empty array to hold components
        // 2) use a for each loop to iterate through the JSON verses
        // 3) use the below code, but replace each return with a push()
        // 4) if that words, try to just skip over phraseWords while adding the necessary information in a buffer
        //    declared directly above the loop
      e.w.map((word : w, i : number, words : any[]) => {
        if(typeof word === "string")
        {
          i = words.length;
          return (<span>{word} </span>)
        }
        else
        {
          // extracts the note information
          if(word.note !== undefined)
          {
            
            let currentGreekWordNotes : GreekWordNotes;
            let currentGreekWordAttributes: GreekWordAttributes;
            let tempGreekWordNotes : any = {};

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

            if(currentGreekWordNotes.OGNTsort !== undefined)
            {
              if(currentGreekWordNotes.phraseWords !== undefined) {
                // TODO add additional processing to get all greek words for this phrase word.                 
                // Digest remaining phraseWords
                numPhraseWordsConsumed.current += 1;
                phraseWordsBuffer.current.push(currentGreekWord);

                if(numPhraseWordsConsumed.current === 1)
                {
                  return <span>{currentGreekWordNotes.phraseWords} </span>
                }
                else
                {
                  return;
                }
                
              }
              else
              {
                // if(numPhraseWordsConsumed.current > 0)
                // {
                //   console.log(phraseWordsBuffer.current);
                // }
                // numPhraseWordsConsumed.current = 0;

                // numPhraseWordsConsumed.current = 0;
                // let j = 0;
                // console.log("current start of phrase buffer")
                // while(j < phraseWordsBuffer.current.length)
                // {
                //   console.log(phraseWordsBuffer.current[j]);
                //   j++;
                // }
                // j = 0;
                // while(j < phraseWordsBuffer.current.length)
                // {
                //   phraseWordsBuffer.current.pop();
                //   j++;
                // }
              }

              if(word._ !== "√") 
              {
                return <><span onClick={() => {onPhraseClick(currentGreekWord)}} style={{textDecoration:"underline"}}>{word._}</span><span> </span></>
              }
            }
          }
          else
          {
            return (<span>{word._} </span>)
          }
        }
      })
    }
  </p>)

  return (
    <>
      {verseText}
    </>
  )
}

export default Text;