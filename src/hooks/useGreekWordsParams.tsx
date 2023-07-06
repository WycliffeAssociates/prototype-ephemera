import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FormattedGreekWord } from "src/types";

export function useGreekWordsParams() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [greekWords, setGreekWords] =
		useState<FormattedGreekWord[]>([]);
	const [showGreekWords, setShowGreekWords] = useState(false);
	const [greekWordverseNumber, setGreekWordVerseNumber] = useState<number>();


	function setShowGreekWordsParams(show: boolean) {
		let urlParams = new URLSearchParams(searchParams);
		urlParams.set("showGreekWords", show + "");
		setSearchParams(urlParams);
	}

	function removeShowGreekWordsParams() {
		let urlParams = new URLSearchParams(searchParams);
		urlParams.delete("showGreekWords");
		setSearchParams(urlParams);
	}

	function setGreekWordsVerseNumberParams(verseNumber: number) {
		let urlParams = new URLSearchParams(searchParams);
		urlParams.set("greekWordsVerseNumber", verseNumber + "");
		setSearchParams(urlParams);
	}

	function removeGreekWordsVerseNumberParams() {
		let urlParams = new URLSearchParams(searchParams);
		urlParams.delete("greekWordsVerseNumber");
		setSearchParams(urlParams);
	}

	type greekWordParams = {
		greekWords?: FormattedGreekWord[],
		show?: boolean,
		verseNumber?: number
	}
	function setGreekWordsParams(newParamValues: greekWordParams) {
		let urlParams = new URLSearchParams(searchParams);

		urlParams.delete("morphologyWord");
		urlParams.delete("refBook");
		urlParams.delete("refChapter");
		urlParams.delete("refVerse");
		urlParams.delete("refWord");

		if(newParamValues.greekWords) {
			let encodedGreekWords = encodeURIComponent(JSON.stringify(newParamValues.greekWords));
			urlParams.set("greekWords", encodedGreekWords);
		}

		if(newParamValues.show) {
			urlParams.set("showGreekWords", newParamValues.show + "");
		}

		if(newParamValues.verseNumber) {
			urlParams.set("greekWordsVerseNumber", newParamValues.verseNumber + "");
		}
		
		setSearchParams(urlParams);
	}

	function removeGreekWordsParams() {
		let urlParams = new URLSearchParams(searchParams);
		urlParams.delete("greekWords");
		setSearchParams(urlParams);
	}

	function getGreekWordsParams() {
		return { 
			greekWords: greekWords, 
			showGreekWords: showGreekWords, 
			greekWordverseNumber: greekWordverseNumber 
		};
	}

	function removeAllParams() {
		let urlParams = new URLSearchParams(searchParams);
		urlParams.delete("greekWords");
		urlParams.delete("showGreekWords");
		urlParams.delete("greekWordsVerseNumber");
		setSearchParams(urlParams);
	}

	useEffect(() => {
		if (searchParams !== undefined) {
			let greekWordsParamValue = searchParams.get("greekWords");
			let showGreekWordsParamValue = searchParams.get("showGreekWords");
			let verseNumberParamValue = searchParams.get("greekWordsVerseNumber");
			

			if (greekWordsParamValue) {
				const jsonString = decodeURIComponent(greekWordsParamValue || "");
				const parsedGreekWords = JSON.parse(jsonString);
				setGreekWords(parsedGreekWords);
			} else {
				setGreekWords([]);
			}

			if (showGreekWordsParamValue) {
				setShowGreekWords(showGreekWordsParamValue == "true");
			} else {
				setShowGreekWords(false);
			}

			if(verseNumberParamValue) {
				setGreekWordVerseNumber(parseInt(verseNumberParamValue));
			} else {
				setGreekWordVerseNumber(undefined);
			}
		}
	}, [searchParams.get("greekWords"), searchParams.get("showGreekWords"), searchParams.get("greekWordsVerseNumber")]);

	return {
		setGreekWordsParams: setGreekWordsParams,
		getGreekWordsParams: getGreekWordsParams,
		removeGreekWordsParams: removeGreekWordsParams,
		greekWords: greekWords,
		setGreekWordsVerseNumberParams: setGreekWordsVerseNumberParams,
		removeGreekWordsVerseNumberParams: removeGreekWordsVerseNumberParams,
		greekWordverseNumber: greekWordverseNumber,
		setShowGreekWordsParams: setShowGreekWordsParams,
		removeShowGreekWordsParams: removeShowGreekWordsParams,
		showGreekWords: showGreekWords,
		removeAllParams: removeAllParams,
	};
}


export default useGreekWordsParams;