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

function getChapter(chapter : number)
{

    return PHMJSON?.xml.book[0].chapter[chapter].verse;
}

export default getChapter;



