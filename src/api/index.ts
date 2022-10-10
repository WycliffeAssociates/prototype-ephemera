let TITUSJSON = require('./testData/TIT.json')
let PHMJSON = require('./testData/PHM.json');
let FirstTim = require('./testData/1TI.json');

let books : any = {Titus: TITUSJSON, Philemon: PHMJSON, "1 Timothy": FirstTim}

function getBook(bookTitle: string)
{
    // TODO: once OSIS is implemented in some repo (not hardcoded in the testData folder), 
    // change this to fetch that data from where it is stored. 

    return books[bookTitle].xml.book;
}


function getChapterVerses(bookTitle: string, chapterNumber: number)
{
    let book = getBook(bookTitle);

    if(!Array.isArray(book.chapter))
    {
        return book.chapter.verse;
    }

    return book.chapter[chapterNumber - 1].verse;
}

export default getChapterVerses;