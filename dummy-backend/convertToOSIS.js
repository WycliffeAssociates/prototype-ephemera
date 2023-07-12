const fs = require("fs");
const { XMLParser, XMLBuilder } = require("fast-xml-parser");
const axios = require("axios");

async function convertOrderedXMLtoOsis(orderedXML) {
  let curBook = orderedXML[1].xml[0].book;
  for (let i = 0; i < curBook.length; i++) {
    for (let j = 0; j < curBook[i].chapter.length; j++) {
      let curChapter = curBook[i].chapter[j];
      for (let k = 0; k < curChapter.verse.length; k++) {
        let curVerseWord = curChapter.verse[k];
        let wordBuffer = [];

        // removes ULB, preText, Greek, and residue tags and converts the ULB and Greek tags to notes.
        if (curVerseWord.Greek !== undefined) {
          let greekNote = {
            note: [{ "#text": curVerseWord.Greek[0]["#text"] }],
            ":@": { type: "x-Greek" },
          };
          curChapter.verse.splice(k, 1, greekNote);
          continue;
        }
        if (curVerseWord.ULB !== undefined) {
          let ULBNote = {
            note: [{ "#text": curVerseWord.ULB[0]["#text"] }],
            ":@": { type: "x-ULB" },
          };
          curChapter.verse.splice(k, 1, ULBNote);
          continue;
        }
        if (curVerseWord.preText !== undefined) {
          curChapter.verse.splice(k, 1);
          k--;
          continue;
        }
        if (curVerseWord.residue !== undefined) {
          curChapter.verse.splice(k, 1);
          k--;
          continue;
        }

        // TODO split this into its own function
        // if the current verse child tag is a phrase, then we extract the phrase words and add additional notes.
        if (curVerseWord.phrase !== undefined) {
          // Gets the actual phrase
          let phrase =
            curVerseWord.phrase[curVerseWord.phrase.length - 1].phraseWords[0][
              "#text"
            ];

          // gets phrase words and places them into a buffer
          for (let l = 0; l < curVerseWord.phrase.length; l++) {
            if (curVerseWord.phrase[l].w !== undefined) {
              let curVerseWordAttributes = curVerseWord[":@"];
              if (
                curVerseWordAttributes !== undefined &&
                curVerseWordAttributes.sub !== undefined
              ) {
                let tempW = curVerseWord.phrase[l];
                let subPhraseNote = {
                  note: [{ "#text": phrase }],
                  ":@": { type: "x-subPhraseWords" },
                };
                let subIdxNote = {
                  note: [{ "#text": curVerseWordAttributes.sub }],
                  ":@": { type: "x-sub" },
                };
                tempW.w.unshift(subPhraseNote);
                tempW.w.unshift(subIdxNote);

                wordBuffer.push(tempW);
              } else {
                let tempW = curVerseWord.phrase[l];
                let newNote = {
                  note: [{ "#text": phrase }],
                  ":@": { type: "x-phraseWords" },
                };
                tempW.w.unshift(newNote);
                wordBuffer.push(tempW);
              }
            }
          }

          // takes words in buffer and inserts them outside of the phrase tag and in-line with the rest of the words.
          curChapter.verse.splice(k, 1, wordBuffer[0]);
          for (let h = 1; h < wordBuffer.length; h++) {
            curChapter.verse.splice(k + h, 0, wordBuffer[h]);
          }
          k--;
          continue;
        }

        // extracts w tag's attributes information and convert them to notes
        let curVerseWordAttributes = curVerseWord[":@"];
        if (curVerseWordAttributes !== undefined) {
          if (curVerseWordAttributes["OGNTsort"] !== undefined) {
            let OGNTsortNote = {
              note: [{ "#text": curVerseWordAttributes["OGNTsort"] }],
              ":@": { type: "x-OGNTsort" },
            };
            curVerseWord.w.unshift(OGNTsortNote);
            delete curVerseWordAttributes["OGNTsort"];
          }
          if (curVerseWordAttributes["strongs"] !== undefined) {
            let strongsNote = {
              note: [{ "#text": curVerseWordAttributes["strongs"] }],
              ":@": { type: "x-strongs" },
            };
            curVerseWord.w.unshift(strongsNote);
            delete curVerseWordAttributes["strongs"];
          }
          if (curVerseWordAttributes["text"] !== undefined) {
            let textNote = {
              note: [{ "#text": curVerseWordAttributes["text"] }],
              ":@": { type: "x-text" },
            };
            curVerseWord.w.unshift(textNote);
            delete curVerseWordAttributes["text"];
          }
          if (curVerseWordAttributes["sub"] !== undefined) {
            let subNote = {
              note: [{ "#text": curVerseWordAttributes["sub"] }],
              ":@": { type: "x-sub" },
            };
            curVerseWord.w.unshift(subNote);
            delete curVerseWordAttributes["sub"];
          }
        }
      }
    }
  }
  return orderedXML;
}

async function mapTaggedULBToOsisULB(xml) {
  const orderedParserOptions = {
    commentPropName: "#comment",
    ignoreAttributes: false,
    preserveOrder: true,
    parseTagValue: false,
    trimValues: true,
    attributeNamePrefix: "",
  };
  const orderedParser = new XMLParser(orderedParserOptions);

  // traverses through the JSON representing the ordered XML and removes the phrase tages.
  let orderedXML = await orderedParser.parse(xml);
  orderedXML = await convertOrderedXMLtoOsis(orderedXML);

  // rebuilds the xml from the newly modified JSON object.
  const builder = new XMLBuilder(orderedParserOptions);
  const xmlOutput = await builder.build(orderedXML);

  return xmlOutput;
}

async function getBookFromRepo(bookTitle) {
  if (bookTitle !== undefined) {
    try {
      book = await axios.get(
        `https://content.bibletranslationtools.org/WycliffeAssociates/en_ulb_tagged/raw/branch/master/Checked/${bookTitle}.xml`
      );
      return book.data;
    } catch (error) {
      return undefined;
    }
  } else {
    return undefined;
  }
}

async function mapTaggedOSISToJSONFile(bookTitle) {
  bookTitle = bookTitle === undefined ? process.argv[2] : bookTitle;

  let taggedULBBook = await getBookFromRepo(bookTitle);

  if (taggedULBBook === undefined) {
    console.log("Please enter a valid book name!");
    return undefined;
  }

  // Converts current ULB XML file to an OSIS complient ULB XML file and then converts that to JSON
  let newXML = await mapTaggedULBToOsisULB(taggedULBBook);

  // write xml to file
  await fs.promises.writeFile(
    `taggedOSISXML/${bookTitle}.xml`,
    newXML,
    async (err) => {
      console.log("writing file");
      if (err) {
        console.log("Error adding to folder");
      }
      console.log(`${bookTitle} successfully added to taggedOSIS folder`);
    }
  );

  const orderedParserOptions = {
    ignoreAttributes: false,
    attributesGroupName: "ATTR",
    attributeNamePrefix: "",
    textNodeName: "_text",
  };
  const orderedParser = new XMLParser(orderedParserOptions);

  // traverses through the JSON representing the ordered XML and removes the phrase tages.
  let orderedXML = await orderedParser.parse(newXML);

  let response = undefined;

  // write JSON string to a file
  await fs.promises.writeFile(
    `taggedOSISJSON/${bookTitle}.json`,
    JSON.stringify(orderedXML),
    async (err) => {
      console.log("writing file");
      if (err) {
        console.log("Error adding to folder");
      }
      console.log(`${bookTitle} successfully added to taggedOSIS folder`);
    }
  );
  response = await JSON.stringify(orderedXML);
  return response;
}

module.exports = { mapTaggedOSISToJSONFile };
