import { useState, useEffect } from "react";
import "../../App.css";
import Word from "./utils/Word";
import useBookChapterParams from "../../hooks/useBookChapterParams";
import useChapterVerseData from "../../hooks/useChapterVerseData";
import { useSettings } from "../../hooks/SettingsContext";
import { mapValidULBSettings } from "./utils/mapValidULBSettings";
import { useGreekWordsParams } from "../../hooks/useGreekWordsParams";

function Text() {
	const bookChapter =
		useBookChapterParams().getBookChaptersParams();
	const verses = useChapterVerseData(
		bookChapter.book,
		parseInt(bookChapter.chapter)
	);
	const [childClicked, setChildClicked] = useState<any>({});
	const { ULBSettings } = useSettings();
	const { showGreekWords } = useGreekWordsParams();

	const defaultTextColor = "#001533CC";
	const highlightColor = "blue";

	useEffect(() => {
		resetTextData();
	}, [verses]);

	// color back to default.
	useEffect(() => {
		if (!showGreekWords) {
			if (
				childClicked?.current?.style?.color !== undefined
			) {
				childClicked.current.style.color = defaultTextColor;
				childClicked.current.style.textDecoration = "none";
			}
		}
	}, [showGreekWords]);

	function resetTextData() {
		// Makes sure that all text is default color after navigating to another chapter.
		if (childClicked?.current?.style?.color !== undefined) {
			childClicked.current.style.color = defaultTextColor;
			childClicked.current.style.textDecoration = "none";
		}
		// Makes sure that the next chapter is starting from verse 1.
		document.getElementById("TextContainer")?.scroll(0, 0);
		setChildClicked({});
	}

	function highlightSelectedPhrase(newChildClicked: any) {
		if (childClicked?.current?.style?.color !== undefined) {
			childClicked.current.style.color = defaultTextColor;
			childClicked.current.style.textDecoration = "none";
		}
		if (
			newChildClicked?.current?.style?.color !== undefined
		) {
			newChildClicked.current.style.color = highlightColor;
			newChildClicked.current.style.textDecoration =
				"underline";
		}
	}

	function handleChildClicked(newChildClicked: any) {
		highlightSelectedPhrase(newChildClicked);
		setChildClicked(newChildClicked);
	}

	let overwriteStyle: any =
		mapValidULBSettings(ULBSettings).verseStyles;
	let verseOutput: any[] = [];

	verses.forEach((verse, idx) => {
		let verseWordOutput: any[] = [];
		let extraMarginTop: string = "20px";
		if (idx == 0) {
			extraMarginTop = "0px";
		}
		verse.verseWords.forEach((verseWord, idx) => {
			verseWordOutput.push(
				<Word
					key={`v${verse.verseNum} w${idx}`}
					handleClick={handleChildClicked}
					versePhrase={{ ...verseWord }}
					verseNumber={verse.verseNum}
				/>
			);
		});

		const tempVerse = (
			<p
				key={`verse + ${verse.verseNum}`}
				className="TextContainer__Verse"
				style={{
					...overwriteStyle,
					marginTop: extraMarginTop,
				}}
			>
				<sup>{verse.verseNum}</sup> {verseWordOutput}
			</p>
		);
		verseOutput.push(tempVerse);
	});

	return (
		<div
			id="TextContainerContent"
			style={{ paddingBottom: "100px" }}
		>
			{verses.length === 0
				? "Please enter a valid book / chapter"
				: verseOutput}
		</div>
	);
}

export default Text;
