import React, { useState, useEffect } from 'react';

// TODO add remaining props for english phrase data
interface TextProps {
    onPhraseClick: () => any;
}


function Text({onPhraseClick}: TextProps)
{

  // TODO make this dynamic and get the data from the given JSON version of the XML
  let verseText = [...Array(25)].map((e, i) => 
    <p key={i} style={{
      textAlign: "left",
      fontFamily: 'Lato',
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "20px",
      lineHeight: "48px",
      color: "#001533CC"

  }}> 
    The book <span onClick={() => {onPhraseClick()}}>of the genalogy</span> of Jesus Christ, son of david, son of Abraham The book of the genalogy of Jesus Christ, son of david, son of Abraham
  </p>)

  return (
    <>
      {verseText}
    </>
  )
}

export default Text;