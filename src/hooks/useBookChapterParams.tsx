import { useState, useEffect } from "react";
import {
	useNavigate,
	createSearchParams,
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
		let previousBookChapter = JSON.parse(
			localStorage.getItem("lastBookChapter") as string
		);
		if (previousBookChapter?.chapter !== chapter) {
			localStorage.setItem(
				"lastBookChapter",
				JSON.stringify({ book: book, chapter: chapter })
			);
		}
	}
}

export function useBookChapterParams() {
	const [book, setBook] = useState("");
	const [chapter, setChapter] = useState<number>();
	const [refBook, setRefBook] = useState<string>();
	const [refVerse, setRefVerse] = useState<string>();
	const [refWord, setRefWord] = useState<string>();
	const [refChapter, setRefChapter] = useState<number>();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	let bookChapterQueryParameters = [
		{
			name: "book", 
			stateSetter: (newVal : string) => {setBook(newVal)},
			stateGetter: () => {return book}
		}, 
		{
			name: "chapter", 
			stateSetter: (newVal : string) => {setChapter(parseInt(newVal))},
			stateGetter: () => {return chapter}
		},
		{
			name: "refBook",
			stateSetter: (newVal : string) => {setRefBook(newVal)},
			stateGetter: () => {return refBook}
		},
		{
			name: "refChapter", 
			stateSetter: (newVal : string) => {setRefChapter(parseInt(newVal))},
			stateGetter: () => {return refChapter}
		},
		{
			name: "refVerse",
			stateSetter: (newVal : string) => {setRefVerse(newVal)},
			stateGetter: () => {return refVerse}
		},
		{
			name: "refWord", 
			stateSetter: (newVal : string) => {setRefWord(newVal)},
			stateGetter: () => {return refWord}
		},
		
	]

	function navigateToMostRecentBookChapter() {
		let lastBookChapter:
			| { book: string; chapter: string }
			| undefined;
		lastBookChapter = JSON.parse(
			localStorage.getItem("lastBookChapter") as string
		);
		
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
		newBook: string,
		newChapter: string,
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

		if (validateBookChapter(newBook, newChapter)) {
			let urlParams = new URLSearchParams(searchParams);

			if(isReference && newVerse && referenceWord) {
				urlParams.set("refBook", newBook);
				urlParams.set("refChapter", newChapter);
				urlParams.set("refVerse", newVerse);
				urlParams.set("refWord", referenceWord)

			} else {
				urlParams.set("book", newBook);
				urlParams.set("chapter", newChapter);
			}
			setSearchParams(urlParams);
		}
	}

	function removeReferenceParams() {
		let params: any;

		let oldParams = getBookChaptersParams();
		params = {
			book: oldParams.book,
			chapter: oldParams.chapter,
		};

		const options = {
			pathname: "/",
			search: `?${createSearchParams(params)}`,
		};

		navigate(options, { replace: true });

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

		bookChapterQueryParameters.forEach((param) => {
			let paramValue = urlParams.get(param.name);
			if(paramValue && paramValue !== " " && parseInt(paramValue) !== param.stateGetter()) {
				param.stateSetter(paramValue);
			}
		})
	}, [searchParams.get("book"), searchParams.get("chapter"), searchParams.get("refBook")]);

	useEffect(() => {
		storeValidBookChapterParams(book, chapter + "");
	}, [book, chapter]);

	return {
		setValidBookChapterParams: setValidBookChapterParams,
		getBookChaptersParams: getBookChaptersParams,
		removeReferenceParams: removeReferenceParams,
		navigateToMostRecentBookChapter: navigateToMostRecentBookChapter
	};
}

export default useBookChapterParams;
