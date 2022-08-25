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
    setVerses(getChapter(0));
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
          if(word.note !== undefined)
          {
            let isGreekWord : boolean = word.note.some((e) => {return (e.ATTR.type === "x-OGNTsort")})

            let greekWordNotes : any[] = [];

            word.note.forEach((e) => {
              let noteKey = e.ATTR.type as string;
              let value = e._;
              let tempNote = {[noteKey] : value};
              greekWordNotes.push(tempNote);
            })

            if(isGreekWord && word._ !== "√") return <><span onClick={() => {onPhraseClick(greekWordNotes)}} style={{textDecoration:"underline"}}>{word._}</span><span> </span></>
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