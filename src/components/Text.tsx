import React, { useState, useEffect } from 'react';

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


// TODO add remaining props for english phrase data
interface TextProps {
    onPhraseClick: (greekWordNotes : any[]) => any;
}


function Text({onPhraseClick}: TextProps)
{

  const [verses, setVerses] = useState([] as verse[]);

  useEffect(() => {
    let data = getChapter()
    setVerses(data);
  }, [])


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
      e.w.map((word : w, i : number) => {
        if(typeof word === "string")
        {
          return (<span>{word} </span>)
        }
        else
        {
          console.log(word)
          if(word.note !== undefined)
          {
            let isGreekWord : boolean = word.note.some((e) => {return (e.ATTR !== undefined && e.ATTR.type !== undefined &&e?.ATTR?.type === "x-OGNTsort")})
            let isPhraseWord : boolean = word.note.some((e) => {return (e.ATTR !== undefined && e.ATTR.type !== undefined &&e?.ATTR?.type === "x-phraseWords")})
            
            let greekWordNotes : any[] = [];
            let greekWordNotesObj : any = {};

            // TODO get rid of this array implementation and just stick with the object implementation 
            // TODO also adjust the onPhraseClick interface to accept the object, not an array of objects. 
            word.note.forEach((e) => {
              let noteKey : string = e.ATTR.type as string;
              let value = e._;
              let tempNote = {[noteKey] : value};
            
              greekWordNotesObj[noteKey.substr(2)] = value; 
            });

            if(isGreekWord)
            {
              if(isPhraseWord) {
                console.log(greekWordNotes)
                return <span>{greekWordNotesObj.phraseWords}</span>
              }
              if(word._ !== "√") 
              {
                return <><span onClick={() => {onPhraseClick(greekWordNotes)}} style={{textDecoration:"underline"}}>{word._}</span><span> </span></>
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