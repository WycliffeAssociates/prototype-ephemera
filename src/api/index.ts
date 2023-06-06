const axios = require('axios');
const { books } = require('../applicationLogic/data/newTestamentMetadata');

async function getBook(bookTitle: string)
{
    try {
        let book;
        if(process.env.REACT_APP_GET_BOOKS_FROM_REPO === "true")
        {
            book = await axios.get(`http://localhost:8080/?book=${books[bookTitle].abbreviatedBook}&chapter=1`);
            return JSON.parse(book.data);
        }
        else
        {
            book = await axios.get(`taggedOSIS/${books[bookTitle].abbreviatedBook}.json`);
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

    if(book && book.chapter && Array.isArray(book.chapter) === false)
    {
        return book.chapter.verse;
    }

    return book.chapter[chapterNumber - 1].verse;
}

export default getChapterVerses;