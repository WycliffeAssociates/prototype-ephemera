import { cp } from "fs";
let PHMJSON = require('./testData/PHM.json');

function getChapter()
{
    return PHMJSON.xml.book.chapter.verse;
}

export default getChapter;