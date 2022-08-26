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



// TODO add remaining props for english phrase data
interface TextProps {
    onPhraseClick: (greekWordNotes : GreekWord[]) => any;
}


function Text({onPhraseClick}: TextProps)
{

  const [verses, setVerses] = useState([] as verse[]);
  const numPhraseWordsConsumed = useRef(0);
  const phraseWordsBuffer = useRef(new Array());

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

                verseWordOutput.push(<><span onClick={() => {onPhraseClick([...greekWords])}} style={{textDecoration:"underline"}}>{currentPhraseWords}</span><span> </span></>)
                
                // Cleans up buffer and resets flag.
                hasConsumedPhraseWord = false;
                greekWordBuffer.splice(0, greekWordBuffer.length);
                
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


  // let verseText = verses.map((e: any, i : number) => 

  
  // <p key={i} style={{
  //   textAlign: "left",
  //   fontFamily: 'Lato',
  //   fontStyle: "normal",
  //   fontWeight: "400",
  //   fontSize: "20px",
  //   lineHeight: "48px",
  //   color: "#001533CC"

  // }}> 
  //   {
  //     // TODO remove this dependancy on map so I can skip over phraseWords
  //       // 1) create empty array to hold components
  //       // 2) use a for each loop to iterate through the JSON verses
  //       // 3) use the below code, but replace each return with a push()
  //       // 4) if that words, try to just skip over phraseWords while adding the necessary information in a buffer
  //       //    declared directly above the loop
  //     e.w.map((word : w, i : number, words : any[]) => {
  //       if(typeof word === "string")
  //       {
  //         i = words.length;
  //         return (<span>{word} </span>)
  //       }
  //       else
  //       {
  //         // extracts the note information
  //         if(word.note !== undefined)
  //         {
            
  //           let currentGreekWordNotes : GreekWordNotes;
  //           let currentGreekWordAttributes: GreekWordAttributes;
  //           let tempGreekWordNotes : any = {};

  //           // extracts the notes for the greek word
  //           word.note.forEach((e) => {
  //             let greekWordNoteKey : ValidGreekWordNoteKeys = e.ATTR.type;
  //             let greekWordNoteValue : string = e._;
  //             tempGreekWordNotes[greekWordNoteKey.slice(2)] = greekWordNoteValue;
  //           });

  //           currentGreekWordNotes = tempGreekWordNotes as GreekWordNotes;

  //           // Extracts the attributes for the greek word
  //           currentGreekWordAttributes = word.ATTR;

  //           let currentGreekWord : GreekWord= {notes : currentGreekWordNotes, attributes : currentGreekWordAttributes, text: word._}

  //           if(currentGreekWordNotes.OGNTsort !== undefined)
  //           {
  //             if(currentGreekWordNotes.phraseWords !== undefined) {
  //               // TODO add additional processing to get all greek words for this phrase word.                 
  //               // Digest remaining phraseWords
  //               return <span>{currentGreekWordNotes.phraseWords} </span>
  //             }

  //             if(word._ !== "√") 
  //             {
  //               return <><span onClick={() => {onPhraseClick(currentGreekWord)}} style={{textDecoration:"underline"}}>{word._}</span><span> </span></>
  //             }
  //           }
  //         }
  //         else
  //         {
  //           return (<span>{word._} </span>)
  //         }
  //       }
  //     })
  //   }
  // </p>)

  return (
    <>
      {/* {verseText} */}
      {verseOutput}
    </>
  )
}

export default Text;