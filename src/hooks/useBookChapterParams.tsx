import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	books,
	books as newTestamentMetadata,
} from "../applicationLogic/data/newTestamentMetadata";

function validateBookChapter(book: string, chapter: string): boolean {
	if (newTestamentMetadata[book] !== undefined) {
		const chapterNumber = Number.parseInt(chapter);
		if (
			chapterNumber > 0 &&
			chapter <= newTestamentMetadata[book].numChapters
		) {
			return true;
		}
	}
	return false;
}

function storeValidBookChapterParams(book: string, chapter: string) {
	if (validateBookChapter(book, chapter)) {
		const storedBookChapter = localStorage.getItem("lastBookChapter");
		if (storedBookChapter) {
			const previousBookChapter = JSON.parse(storedBookChapter);

			if (previousBookChapter?.chapter !== chapter) {
				localStorage.setItem(
					"lastBookChapter",
					JSON.stringify({ book: book, chapter: chapter }),
				);
			}
		} else {
			localStorage.setItem(
				"lastBookChapter",
				JSON.stringify({ book: book, chapter: chapter }),
			);
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
	const [invalidParams, setInvalidParams] = useState<string[]>([]);

	const bookChapterQueryParameters: {
		[key: string]: {
			stateSetter: Dispatch<SetStateAction<string | undefined>>;
			stateGetter: () => string | number | undefined;
			validator?: (input: string | number, context?: any) => boolean;
			defaultValue?: string;
		};
	} = {
		book: {
			stateSetter: setBook,
			stateGetter: () => {
				return book;
			},
			validator: (input: string | number) => {
				return !!books[input];
			},
			defaultValue: "Matthew",
		},
		chapter: {
			stateSetter: setChapter,
			stateGetter: () => {
				return chapter;
			},
			validator: (input: string | number, context: string) => {
				const urlParams = new URLSearchParams(searchParams);
				let isValidChapter = false;
				const currentBookParamValue = urlParams.get("book");
				const currentBook = currentBookParamValue ? currentBookParamValue : "";
				const newChapter =
					typeof input === "string" ? Number.parseInt(input) : input;
				isValidChapter =
					newChapter <= books[currentBook]?.numChapters && newChapter >= 1;
				return isValidChapter;
			},
			defaultValue: "1",
		},
		refBook: {
			stateSetter: setRefBook,
			stateGetter: () => {
				return refBook;
			},
		},
		refChapter: {
			stateSetter: setRefChapter,
			stateGetter: () => {
				return refChapter;
			},
		},
		refVerse: {
			stateSetter: setRefVerse,
			stateGetter: () => {
				return refVerse;
			},
		},
		refWord: {
			stateSetter: setRefWord,
			stateGetter: () => {
				return refWord;
			},
		},
	};

	function navigateToMostRecentBookChapter() {
		let lastBookChapter: { book: string; chapter: string } | undefined;
		const storedBookChapter = localStorage.getItem("lastBookChapter");
		if (storedBookChapter) {
			lastBookChapter = JSON.parse(storedBookChapter);
		}

		//let urlParams = new URLSearchParams(searchParams);
		const bookParam = searchParams.get("book");
		const chapterParam = searchParams.get("chapter");

		if (lastBookChapter && !bookParam && !chapterParam) {
			const newBookChapter = {
				book: lastBookChapter.book,
				chapter: lastBookChapter.chapter,
			};
			setValidBookChapterParams(newBookChapter, false);
		} else {
			if (bookParam && chapterParam) {
				const newBookChapter = {
					book: bookParam,
					chapter: chapterParam,
				};
				setValidBookChapterParams(newBookChapter, true);
			} else {
				const newBookChapter = {
					book: "Matthew",
					chapter: "1",
				};
				setValidBookChapterParams(newBookChapter, false);
			}
		}
	}

	type BookChapterParams = {
		book: string;
		chapter: string;
	};

	type VerseReferenceParams = {
		bookReference: string;
		chapterReference: string;
		verseReference: string;
		word: string;
	};

	function setValidBookChapterParams(
		bookChapterParams: BookChapterParams,
		keepParams: boolean,
	) {
		const urlParams = new URLSearchParams(searchParams);

		if (bookChapterParams) {
			let { book, chapter } = bookChapterParams;

			// NOTE: this is a hardcoded fix for a content issue found when
			// examining Philemon's 1:24 "Demas". The entry for that word in the gwt repo
			// has a verse reference going to "Colossian", however, the en_ulb names the book "Colossians"

			if (book === "Colossian") {
				book = "Colossians";
			}

			const isValidBookChapter = validateBookChapter(book, chapter);

			if (isValidBookChapter) {
				urlParams.set("book", book);
				urlParams.set("chapter", chapter);

				if (keepParams !== true) {
					trimNonBookChapterURLParams(urlParams);
					trimReferenceURLParams(urlParams);
				}
			}
		}
		setSearchParams(urlParams);
	}

	function setValidVerseReferenceParams(
		verseReferenceParams: VerseReferenceParams,
	) {
		const urlParams = new URLSearchParams(searchParams);

		if (verseReferenceParams) {
			const { bookReference, chapterReference, verseReference, word } =
				verseReferenceParams;

			urlParams.set("refBook", bookReference);
			urlParams.set("refChapter", chapterReference);
			urlParams.set("refVerse", verseReference);
			urlParams.set("refWord", word);
		}
		setSearchParams(urlParams);
	}

	// removes all query parameters excepts ones related to book/chapter
	function trimNonBookChapterURLParams(params: URLSearchParams) {
		const paramsArray = Array.from(params.entries());

		paramsArray.forEach((param) => {
			const paramName = param[0];
			if (bookChapterQueryParameters[paramName] === undefined) {
				params.delete(paramName);
			}
		});
	}

	function trimReferenceURLParams(params: URLSearchParams) {
		params.delete("refBook");
		params.delete("refChapter");
		params.delete("refVerse");
		params.delete("refWord");
	}

	function removeReferenceParams() {
		const urlParams = new URLSearchParams(searchParams);
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
			chapter: `${chapter}`,
			refBook: refBook,
			refChapter: `${refChapter}`,
			refVerse: refVerse,
			refWord: refWord,
		};
	}

	function resetInvalidQueryParameters() {
		const urlParams = new URLSearchParams(searchParams);

		for (let i = 0; i < invalidParams.length; i++) {
			const paramKey = invalidParams[i];
			const bookChapterParamState = bookChapterQueryParameters[paramKey];
			const defaultParamValue = bookChapterParamState.defaultValue;
			if (defaultParamValue) {
				urlParams.set(paramKey, defaultParamValue);
			}
		}

		setSearchParams(urlParams);
	}

	function setStatesToQueryParams() {
		const urlParams = new URLSearchParams(searchParams);
		// Iterates through book/chapter query parameters and sets
		// the state variable for that corresponding query parameter
		let hasValidSearchParams = true;
		const foundInvalidParams: string[] = [];

		for (const key in bookChapterQueryParameters) {
			const bookChapterParamState = bookChapterQueryParameters[key];
			const paramValue = urlParams.get(key);

			if (paramValue && paramValue !== " ") {
				let newValue: string = paramValue;

				if (
					bookChapterParamState.validator &&
					bookChapterParamState.defaultValue
				) {
					const isNewValueValid = bookChapterParamState.validator(paramValue);
					newValue = isNewValueValid
						? paramValue
						: bookChapterParamState.defaultValue;

					if (!isNewValueValid) {
						hasValidSearchParams = false;
						foundInvalidParams.push(key);
					}
				}

				if (newValue !== bookChapterParamState.stateGetter()) {
					bookChapterParamState.stateSetter(newValue);
				}
			}
		}

		if (!hasValidSearchParams) {
			setInvalidParams([...foundInvalidParams]);
		}
	}

	useEffect(() => {
		if (searchParams) {
			setStatesToQueryParams();
		}
	}, [setStatesToQueryParams, searchParams]);

	useEffect(() => {
		if (invalidParams.length > 0) {
			resetInvalidQueryParameters();
		}
	}, [invalidParams, resetInvalidQueryParameters]);

	useEffect(() => {
		if (book && chapter) {
			storeValidBookChapterParams(book, `${chapter}`);
		}
	}, [book, chapter]);

	return {
		setValidBookChapterParams: setValidBookChapterParams,
		setValidVerseReferenceParams: setValidVerseReferenceParams,
		getBookChaptersParams: getBookChaptersParams,
		removeReferenceParams: removeReferenceParams,
		navigateToMostRecentBookChapter: navigateToMostRecentBookChapter,
		book: book,
		chapter: chapter,
		refBook: refBook,
		refVerse: refVerse,
		refWord: refWord,
		refChapter: refChapter,
	};
}

export default useBookChapterParams;
