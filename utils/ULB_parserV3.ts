const xml2js = require('xml2js');
const fs = require('fs');
var he = require('he');
const {XMLParser, XMLBuilder} = require('fast-xml-parser');

const parser = new xml2js.Parser({ attrkey: "ATTR", trim:"true", normalize:"true" });


// A phrase is an English word(s) that has some greek word(s) behinding it. 
type Phrase = {
    OGNTsort : number,
    strongs : String,
    morph : String,
    phrase : String,
    sub : number,
}

type Verse = {
    verseName : String,
    greek : String,
    ULB : String,
    phrases : Phrase[],
}

type Note = {
    ATTR: any,
    _: String,
}



function convertOrderedXMLtoOsis(orderedXML : any)
{
    let curBook = orderedXML[1].xml[0].book;
    for(let i = 0; i < curBook.length; i++)
    {
        for(let j = 0; j < curBook[i].chapter.length; j++)
        {
            let curChapter = curBook[i].chapter[j];
            for(let k = 0; k < curChapter.verse.length; k++)
            {
                let curVerseWord = curChapter.verse[k];
                let wordBuffer = [] as any;

                // removes ULB, preText, Greek, and residue tags and converts the ULB and Greek tags to notes. 
                if(curVerseWord.Greek !== undefined)
                {
                    let greekNote = {note: [{'#text': curVerseWord.Greek[0]['#text']}], ':@': {'type': 'x-Greek'}};
                    curChapter.verse.splice(k, 1, greekNote);
                    continue;
                }
                if(curVerseWord.ULB !== undefined)
                {
                    let ULBNote = {note: [{'#text': curVerseWord.ULB[0]['#text']}], ':@': {'type': 'x-ULB'}};
                    curChapter.verse.splice(k, 1, ULBNote);
                    continue;
                }
                if(curVerseWord.preText !== undefined)
                {
                    curChapter.verse.splice(k, 1);
                    k--;
                    continue;
                }
                if(curVerseWord.residue !== undefined)
                {
                    curChapter.verse.splice(k, 1);
                    k--;
                    continue;
                }


                // TODO split this into its own function 
                // if the current verse child tag is a phrase, then we extract the phrase words and add additional notes. 
                if(curVerseWord.phrase !== undefined)
                { 
                    // Gets the actual phrase
                    let phrase = curVerseWord.phrase[curVerseWord.phrase.length - 1].phraseWords[0]["#text"];

                    // gets phrase words and places them into a buffer
                    for(let l = 0; l < curVerseWord.phrase.length; l++)
                    {
                        if(curVerseWord.phrase[l].w !== undefined)
                        { 
                            let tempW = curVerseWord.phrase[l];
                            let newNote = {note: [{'#text': phrase}], ':@': {'type': 'x-phraseWords'}}
                            tempW.w.unshift(newNote);
                            wordBuffer.push(tempW);
                        }

                    }

                    // takes words in buffer and inserts them outside of the phrase tag and in-line with the rest of the words. 
                    curChapter.verse.splice(k, 1, wordBuffer[0])
                    for(let h = 1; h < wordBuffer.length; h++)
                    {
                        curChapter.verse.splice(k+h, 0, wordBuffer[h]);
                    }
                    k--;
                    continue;
                }

                // extracts w tag's attributes information and convert them to notes
               let curVerseWordAttributes = curVerseWord[':@'];
               //console.log(curVerseWordAttributes);
               if(curVerseWordAttributes !== undefined)
               {
                    if(curVerseWordAttributes['OGNTsort'] !== undefined)
                    {
                        let OGNTsortNote = {note: [{'#text': curVerseWordAttributes['OGNTsort']}], ':@': {'type': 'x-OGNTsort'}};
                        curVerseWord.w.unshift(OGNTsortNote);
                        delete curVerseWordAttributes['OGNTsort'];
                    }
                    if(curVerseWordAttributes['strongs'] !== undefined)
                    {
                        let strongsNote = {note: [{'#text': curVerseWordAttributes['strongs']}], ':@': {'type': 'x-strongs'}};
                        curVerseWord.w.unshift(strongsNote);
                        delete curVerseWordAttributes['strongs'];
                    }
                    if(curVerseWordAttributes['text'] !== undefined)
                    {
                        let textNote = {note: [{'#text': curVerseWordAttributes['text']}], ':@': {'type': 'x-text'}};
                        curVerseWord.w.unshift(textNote);
                        delete curVerseWordAttributes['text'];
                    }
                    if(curVerseWordAttributes['sub'] !== undefined)
                    {
                        let subNote = {note: [{'#text': curVerseWordAttributes['sub']}], ':@': {'type': 'x-sub'}};
                        curVerseWord.w.unshift(subNote);
                        delete curVerseWordAttributes['sub'];
                    }
               }
            }
        }
    }

    // console.log(orderedXML[1].xml);
    return orderedXML;
}



// "testXML/58-PHM.xml"
function taggedULBToOsisULB(inputFilePath: String)
{
    // this example reads the file synchronously
    // you can read it asynchronously also
    let xml_string = fs.readFileSync(inputFilePath, "utf8");

    let osisULB = {};

    const orderedParserOptions = {
        commentPropName: "#comment",
        ignoreAttributes: false,
        preserveOrder: true,
        parseTagValue: false,
        trimValues: true, //default
        attributeNamePrefix: '',
        // attributesGroupName: "ATTR_"
    };
    const orderedParser = new XMLParser(orderedParserOptions);
    
    // traverses through the JSON representing the ordered XML and removes the phrase tages. 
    let orderedXML = orderedParser.parse(xml_string);
    orderedXML = convertOrderedXMLtoOsis(orderedXML)

    // rebuilds the xml from the newly modified JSON object. 
    const options = {
        commentPropName: "#comment",
        ignoreAttributes: false,
        preserveOrder: true
    };
    const builder = new XMLBuilder(orderedParserOptions);
    const xmlOutput = builder.build(orderedXML);

    // passes the new XML file to the parser again to add notes to words. 
    // parser.parseString(xmlOutput, function(error : any, result : any) {
    //     if(error !== null) {
    //         console.log(error);
    //     }
    //     osisULB = result;
    // });

    // console.log(xmlOutput);

    return xmlOutput;

}



function exportJSONAsXML(data: any, newFileName: String)
{
    // convert SJON objec to XML
    const builder = new xml2js.Builder({attrkey: 'ATTR', trim:"true", normalize:"true"});
    const xml = builder.buildObject(data);

    // write updated XML string to a file
    fs.writeFile(newFileName, xml, (err: any) => {
        if (err) {
            throw err;
        }

        console.log(`Updated XML is written to ` + newFileName + ".");
    });
}



// TODO uncomment. 
// Converts current ULB to OSIS complient ULB XML and then converts that to JSON
// let newXML = taggedULBToOsisULB("testXML/58-PHM.xml");
// fs.writeFile("PHMWithNotesWithoutSpacing.xml", newXML, (err: any) => {
//     if (err) {
//         throw err;
//     }

//     console.log(`Updated XML is written to ` + "PHMWithNotesWithoutSpacing.xml" + ".");
// });





const orderedParserOptions = {
    ignoreAttributes: false,
    attributesGroupName: "ATTR",
    attributeNamePrefix: '',
    textNodeName: "_",
};
const orderedParser = new XMLParser(orderedParserOptions);
let new_xml_string = fs.readFileSync("PHMWithNotesWithoutSpacing.xml", "utf8");
// traverses through the JSON representing the ordered XML and removes the phrase tages. 
let orderedXML = orderedParser.parse(new_xml_string);
console.log(orderedXML);


// write JSON string to a file
fs.writeFile('PHMJSON2.json', JSON.stringify(orderedXML), (err : any) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});
