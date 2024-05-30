import axios from "axios";
import { books } from "../applicationLogic/data/newTestamentMetadata";
const VITE_APP_GET_BOOKS_FROM_REPO = import.meta.env
	.VITE_APP_GET_BOOKS_FROM_REPO;

async function getBook(bookTitle: string) {
	try {
		let book: any;
		if (VITE_APP_GET_BOOKS_FROM_REPO === "true") {
			book = await axios.get(
				`http://localhost:8080/?book=${books[bookTitle].abbreviatedBook}&chapter=1`,
			);
			return JSON.parse(book.data);
		}

		book = await fetch(`taggedOSIS/${books[bookTitle].abbreviatedBook}.json`);
		return book.json();
	} catch (error) {
		return undefined;
	}
}

async function getChapterVerses(bookTitle: string, chapterNumber: number) {
	let book = await getBook(bookTitle);

	if (book === undefined) {
		return undefined;
	}

	book = book.xml.book;

	if (book?.chapter && Array.isArray(book.chapter) === false) {
		return book.chapter.verse;
	}

	return book.chapter[chapterNumber - 1].verse;
}

export default getChapterVerses;
