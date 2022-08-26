import { cp } from "fs";

let PHMXML = require('./testData/PHM.xml');
let PHMTxt = require('./testData/PHMJSON.txt');
let PHMJSON = require('./testData/PHM.json');

// let XMLParser = require('react-xml-parser');

// function getBook(book : number)
// {

//     return PHMJSON.book[book];
// }

// function getChapter(chapter : number)
// {

//     return PHMJSON;
// }

// function getVerse(verse : number)
// {

//     return PHMJSON;
// }

function getChapter()
{
    // console.log(PHMJSON.xml.book.chapter.verse);
    return PHMJSON.xml.book.chapter.verse;
}

export default getChapter;



