import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
	useSearchParams,
} from "react-router-dom";
import { books as newTestamentMetadata } from "../applicationLogic/data/newTestamentMetadata";


function validateBookChapter(
	book: string,
	chapter: string
): boolean {
	if (newTestamentMetadata[book] !== undefined) {
		let chapterNumber = parseInt(chapter);
		if (
			chapterNumber > 0 &&
			chapter <= newTestamentMetadata[book].numChapters
		) {
			return true;
		}
	}
	return false;
}

function storeValidBookChapterParams(
	book: string,
	chapter: string
) {
	if (validateBookChapter(book, chapter)) {

		let storedBookChapter = localStorage.getItem("lastBookChapter");
		if(storedBookChapter) {
			let previousBookChapter = JSON.parse(
				storedBookChapter
			);
		
			if (previousBookChapter?.chapter !== chapter) {
				localStorage.setItem(
					"lastBookChapter",
					JSON.stringify({ book: book, chapter: chapter })
				);
			}
		}
	}
}

export function useBookChapterParams() {
	const [book, setBook] = useState<string | undefined>("");
	const [chapter, setChapter] = useState<string>();
	const [refBook, setRefBook] = useState<string>();
	const [refVerse, setRefVerse] = useState<string>();
	const [refWord, setRefWord] = useState<string>();
	const [refChapter, setRefChapter] = useState<string>();
	const [searchParams, setSearchParams] = useSearchParams();

	let bookChapterQueryParameters: {
		[key: string]: {
		  stateSetter: Dispatch<SetStateAction<string | undefined>>
		  stateGetter: () => string | number | undefined
		}
	  } =  {
		"book": { 
			stateSetter: setBook,
			stateGetter: () => {return book}
		}, 
		"chapter": { 
			stateSetter: setChapter,
			stateGetter: () => {return chapter}
		},
		"refBook": {
			stateSetter: setRefBook,
			stateGetter: () => {return refBook}
		},
		"refChapter": { 
			stateSetter: setRefChapter,
			stateGetter: () => {return refChapter}
		},
		"refVerse": {
			stateSetter: setRefVerse,
			stateGetter: () => {return refVerse}
		},
		"refWord": { 
			stateSetter: setRefWord,
			stateGetter: () => {return refWord}
		},
		
	}

	function navigateToMostRecentBookChapter() {
		let lastBookChapter:
			| { book: string; chapter: string }
			| undefined;
		let storedBookChapter = localStorage.getItem("lastBookChapter");
		if(storedBookChapter) {
			lastBookChapter = JSON.parse(
				storedBookChapter
			);
		}
		
		
		
		//let urlParams = new URLSearchParams(searchParams);
		let bookParam = searchParams.get("book");
		let chapterParam = searchParams.get("chapter")
	
		if (lastBookChapter && (!bookParam && !chapterParam)) {
			setValidBookChapterParams(
				lastBookChapter.book,
				lastBookChapter.chapter
			);
		} else {
			if(bookParam && chapterParam) {
				setValidBookChapterParams(
					bookParam,
					chapterParam
				);
			} else {
				setValidBookChapterParams("Matthew", "1");
			}
		}
	}

	function setValidBookChapterParams(
		newBook?: string,
		newChapter?: string,
		newVerse?: string,
		referenceWord?: string,
		isReference?: boolean
	) {
		// NOTE: this is a hardcoded fix for a content issue found when
		// examining Philemon's 1:24 "Demas". The entry for that word in the gwt repo
		// has a verse reference going to "Colossian", however, the en_ulb names the book "Colossians"
		if (newBook === "Colossian") {
			newBook = "Colossians";
		}

		if (newBook && newChapter && validateBookChapter(newBook, newChapter)) {
			let urlParams = new URLSearchParams(searchParams);

			if(isReference && newVerse && referenceWord) {
				urlParams.set("refBook", newBook);
				urlParams.set("refChapter", newChapter);
				urlParams.set("refVerse", newVerse);
				urlParams.set("refWord", referenceWord)

			} else {
				urlParams.set("book", newBook);
				urlParams.set("chapter", newChapter);
				trimURLParams(urlParams);
			}
			setSearchParams(urlParams);
		}
	}

	// removes all query parameters excepts ones related to book/chapter
	function trimURLParams(params: URLSearchParams) {
		const paramsArray = Array.from(params.entries());

		paramsArray.forEach((param) => {
			let paramName = param[0];
			if(bookChapterQueryParameters[paramName] === undefined) {
				params.delete(paramName);
			}
		})
	}

	function removeReferenceParams() {

		let urlParams = new URLSearchParams(searchParams);
		urlParams.delete("refBook");
		urlParams.delete("refChapter");
		urlParams.delete("refVerse");
		urlParams.delete("refWord");
		setSearchParams(urlParams);

		setRefBook(undefined);
		setRefChapter(undefined);
		setRefVerse(undefined);
		setRefWord(undefined);
	}

	function getBookChaptersParams() {
		return {
			book: book,
			chapter: chapter + "",
			refBook: refBook,
			refChapter: refChapter + "",
			refVerse: refVerse,
			refWord: refWord,
		};
	}

	useEffect(() => {

		let urlParams = new URLSearchParams(searchParams);

		// Iterates through book/chapter query parameters and sets
		// the state variable for that corresponding query parameter
		for (const key in bookChapterQueryParameters) {
			let bookChapterParamState  = bookChapterQueryParameters[key];
			let paramValue = urlParams.get(key);
			if(paramValue && paramValue !== " " && parseInt(paramValue) !== bookChapterParamState.stateGetter()) {
				bookChapterParamState.stateSetter(paramValue);
			}
		}

	}, [searchParams.get("book"), searchParams.get("chapter"), searchParams.get("refBook")]);

	useEffect(() => {
		if(book && chapter) {
			storeValidBookChapterParams(book, chapter + "");
		}
	}, [book, chapter]);

	return {
		setValidBookChapterParams: setValidBookChapterParams,
		getBookChaptersParams: getBookChaptersParams,
		removeReferenceParams: removeReferenceParams,
		navigateToMostRecentBookChapter: navigateToMostRecentBookChapter
	};
}

export default useBookChapterParams;
