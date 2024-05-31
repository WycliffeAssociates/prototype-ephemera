import { useEffect, useState } from "react";
import "../../App.css";
import useSourceTextResourceParams from "src/hooks/useSourceTextResourceParams";
import { useSettings } from "../../hooks/SettingsContext";
import useBookChapterParams from "../../hooks/useBookChapterParams";
import useChapterVerseData from "../../hooks/useChapterVerseData";
import { useGreekWordsParams } from "../../hooks/useGreekWordsParams";
import Word from "./utils/Word";
import { mapValidULBSettings } from "./utils/mapValidULBSettings";

function Text() {
	const bookChapter = useBookChapterParams().getBookChaptersParams();

	const { sourceTextResourceLanguage, sourceTextResourceType } =
		useSourceTextResourceParams();

	const verses = useChapterVerseData(
		bookChapter.book,
		Number.parseInt(bookChapter.chapter),
		sourceTextResourceType,
		sourceTextResourceLanguage,
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
			if (childClicked?.current?.style?.color !== undefined) {
				childClicked.current.style.color = defaultTextColor;
				childClicked.current.style.textDecoration = "none";
			}
		}
	}, [childClicked, showGreekWords]);

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
		if (newChildClicked?.current?.style?.color !== undefined) {
			newChildClicked.current.style.color = highlightColor;
			newChildClicked.current.style.textDecoration = "underline";
		}
	}

	function handleChildClicked(newChildClicked: any) {
		highlightSelectedPhrase(newChildClicked);
		setChildClicked(newChildClicked);
	}

	const overwriteStyle: any = mapValidULBSettings(ULBSettings).verseStyles;
	const verseOutput: any[] = [];

	verses.forEach((verse, idx) => {
		const verseWordOutput: any[] = [];
		let extraMarginTop = "20px";
		if (idx === 0) {
			extraMarginTop = "0px";
		}

		verse.alignedVerseText.forEach((alignedVerseWord, idx) => {
			verseWordOutput.push(
				<Word
					key={`v${verse.verseNum} w${idx}`}
					handleClick={handleChildClicked}
					versePhrase={{ ...alignedVerseWord }}
					verseNumber={verse.verseNum}
				/>,
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
		<div id="TextContainerContent" style={{ paddingBottom: "100px" }}>
			{verses.length === 0
				? "Please enter a valid book / chapter"
				: verseOutput}
		</div>
	);
}

export default Text;
