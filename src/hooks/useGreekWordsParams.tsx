import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { AlignedText } from "src/types";

export function useGreekWordsParams() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [greekWords, setGreekWords] = useState<AlignedText>();

	const [showGreekWords, setShowGreekWords] = useState(false);
	const [greekWordverseNumber, setGreekWordVerseNumber] = useState<number>();

	function setShowGreekWordsParams(show: boolean) {
		const urlParams = new URLSearchParams(searchParams);
		urlParams.set("showGreekWords", show.toString());
		setSearchParams(urlParams);
	}

	function removeShowGreekWordsParams() {
		const urlParams = new URLSearchParams(searchParams);
		urlParams.delete("showGreekWords");
		setSearchParams(urlParams);
	}

	function setGreekWordsVerseNumberParams(verseNumber: number) {
		const urlParams = new URLSearchParams(searchParams);
		urlParams.set("greekWordsVerseNumber", verseNumber.toString());
		setSearchParams(urlParams);
	}

	function removeGreekWordsVerseNumberParams() {
		const urlParams = new URLSearchParams(searchParams);
		urlParams.delete("greekWordsVerseNumber");
		setSearchParams(urlParams);
	}

	type greekWordParams = {
		alignedText?: AlignedText;
		show?: boolean;
		verseNumber?: number;
	};
	function setGreekWordsParams(newParamValues: greekWordParams) {
		const urlParams = new URLSearchParams(searchParams);

		urlParams.delete("morphologyWord");
		urlParams.delete("refBook");
		urlParams.delete("refChapter");
		urlParams.delete("refVerse");
		urlParams.delete("refWord");

		if (newParamValues.alignedText) {
			const encodedGreekWords = encodeURIComponent(
				JSON.stringify(newParamValues.alignedText),
			);
			urlParams.set("greekWords", encodedGreekWords);
		}

		if (newParamValues.show) {
			urlParams.set("showGreekWords", `${newParamValues.show}`);
		}

		if (newParamValues.verseNumber) {
			urlParams.set("greekWordsVerseNumber", `${newParamValues.verseNumber}`);
		}

		setSearchParams(urlParams);
	}

	function removeGreekWordsParams() {
		const urlParams = new URLSearchParams(searchParams);
		urlParams.delete("greekWords");
		setSearchParams(urlParams);
	}

	function getGreekWordsParams() {
		return {
			greekWords: greekWords,
			showGreekWords: showGreekWords,
			greekWordverseNumber: greekWordverseNumber,
		};
	}

	function removeAllParams() {
		const urlParams = new URLSearchParams(searchParams);
		urlParams.delete("greekWords");
		urlParams.delete("showGreekWords");
		urlParams.delete("greekWordsVerseNumber");
		setSearchParams(urlParams);
	}

	useEffect(() => {
		if (searchParams !== undefined) {
			const greekWordsParamValue = searchParams.get("greekWords");
			const showGreekWordsParamValue = searchParams.get("showGreekWords");
			const verseNumberParamValue = searchParams.get("greekWordsVerseNumber");

			if (greekWordsParamValue) {
				const jsonString = decodeURIComponent(greekWordsParamValue || "");
				const parsedGreekWords = JSON.parse(jsonString);
				setGreekWords(parsedGreekWords);
			} else {
				setGreekWords(undefined);
			}

			if (showGreekWordsParamValue) {
				setShowGreekWords(showGreekWordsParamValue === "true");
			} else {
				setShowGreekWords(false);
			}

			if (verseNumberParamValue) {
				setGreekWordVerseNumber(Number.parseInt(verseNumberParamValue));
			} else {
				setGreekWordVerseNumber(undefined);
			}
		}
	}, [
		searchParams.get("greekWords"),
		searchParams.get("showGreekWords"),
		searchParams.get("greekWordsVerseNumber"),
	]);

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
