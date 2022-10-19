const axios = require('axios');

let books : any = {
    matthew: "41-MAT",
    mark: "42-MRK",
    luke: "43-LUK",
    john: "44-JHN",
    acts: "45-ACT",
    romans: "46-ROM",
    "1-corinthians": "47-1CO",
    "2-corinthians": "48-2CO",
    galatians:  "49-GAL",
    ephesians:  "50-EPH",
    philippians:  "51-PHP",
    colossians: "52-COL",
    "1-thessalonians": "53-1TH",
    "2-thessalonians": "54-2TH",
    "1-timothy": "55-1TI",
    "2-timothy": "56-2TI",
    titus: "57-TIT",
    philemon: "58-PHM",
    hebrews: "59-HEB",
    james: "60-JAS",
    "1-peter": "61-1PE",
    "2-peter": "62-2PE",
    "1-john": "63-1JN",
    "2-john": "64-2JN",
    "3-john": "65-3JN",
    jude: "66-JUD",
    revelation: "67-REV",

}

async function getBook(bookTitle: string)
{
    try {
        let book;
        if(process.env.REACT_APP_GET_BOOKS_FROM_REPO === "true")
        {
            book = await axios.get(`http://localhost:8080/?book=${books[bookTitle]}&chapter=1`);
            return JSON.parse(book.data);
        }
        else
        {
            book = await axios.get(`taggedOSIS/${books[bookTitle]}.json`);
            return book.data;
        }
        
    } catch (error) {
        return undefined;
    }
}


async function getChapterVerses(bookTitle: string, chapterNumber: number)
{
    let book = await getBook(bookTitle);

    if(book === undefined)
    {
        return undefined;
    }

    book = book.xml.book

    console.log(book);

    if(book && book.chapter && Array.isArray(book.chapter) === false)
    {
        return book.chapter.verse;
    }

    return book.chapter[chapterNumber - 1].verse;
}

export default getChapterVerses;