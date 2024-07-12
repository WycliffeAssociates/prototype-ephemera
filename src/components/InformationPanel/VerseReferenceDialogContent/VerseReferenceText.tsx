import { useEffect, useRef, useState } from "react";
import useBookChapterParams from "src/hooks/useBookChapterParams";
import useSourceTextResourceParams from "src/hooks/useSourceTextResourceParams";
import { useSettings } from "../../../hooks/SettingsContext";
import useChapterVerseData from "../../../hooks/useChapterVerseData";
import type { AlignedText, GreekAlignmentData } from "../../../types";
import { mapValidGWTSettings } from "../GreekWordInfo/utils/mapValidGWTSettings";

export function VerseReferenceText() {
	const { sourceTextResourceLanguage, sourceTextResourceType } =
		useSourceTextResourceParams();
	const { refBook, refChapter, refVerse, refWord } =
		useBookChapterParams().getBookChaptersParams();

	const verses = useChapterVerseData(
		refBook,
		refChapter,
		sourceTextResourceType,
		sourceTextResourceLanguage,
	);
	const [verseOutput, setVerseOutput] = useState<any[]>([]);
	const verseRef = useRef<HTMLSpanElement>(null);

	const { GWTSettings } = useSettings();
	const overwriteStyle: any = mapValidGWTSettings(GWTSettings);

	function checkGreekWordsForReference(greekWords: GreekAlignmentData[]) {
		return greekWords?.some(
			(greekWordAlignmentData) => greekWordAlignmentData.strong === refWord,
		);
	}

	function checkForReferences(verseWord: AlignedText) {
		if (verseWord.greekAlignmentData) {
			return checkGreekWordsForReference(verseWord.greekAlignmentData);
		}
	}

	useEffect(() => {
		const tempVerseOutput: any[] = [];

		verses.forEach((verse, verseIdx) => {
			const verseWordOutput: any[] = [];

			verse.alignedVerseText.forEach((alignedVerseText, wordIdx) => {
				if (
					verseIdx + 1 === Number.parseInt(refVerse as string) &&
					checkForReferences(alignedVerseText)
				) {
					verseWordOutput.push(
						<>
							<span
								ref={verseRef}
								className="TextContainer_GreekPhrase"
								style={{
									color: "#001533CC",
									textDecoration: "none",
									...overwriteStyle,
								}}
							>
								<b>{alignedVerseText.text}</b>
							</span>
							<span> </span>
						</>,
					);
				} else if (checkForReferences(alignedVerseText)) {
					verseWordOutput.push(
						<>
							<span
								className="TextContainer_GreekPhrase"
								style={{
									color: "#001533CC",
									textDecoration: "none",
									...overwriteStyle,
								}}
							>
								<b>{alignedVerseText.text}</b>
							</span>
							<span> </span>
						</>,
					);
				} else {
					verseWordOutput.push(
						<>
							<span
								className="TextContainer_GreekPhrase"
								style={{
									color: "#001533CC",
									textDecoration: "none",
									...overwriteStyle,
								}}
							>
								{alignedVerseText.text}
							</span>
							<span> </span>
						</>,
					);
				}
			});

			const tempVerse = (
				<p
					id={`verse-${verse.verseNum}`}
					key={`verse + ${verse.verseNum}`}
					className="TextContainer__Verse"
					style={{ ...overwriteStyle }}
				>
					<sup>{verse.verseNum}</sup> {verseWordOutput}
				</p>
			);
			tempVerseOutput.push(tempVerse);
		});

		setVerseOutput([...tempVerseOutput]);
	}, [verses, GWTSettings]);

	useEffect(() => {
		if (verseRef != null && verseRef.current != null) {
			let scrollableParent: HTMLElement | null = null;
			const potentialScrollableParent = verseRef.current.parentNode;
			if (
				verseRef.current &&
				potentialScrollableParent &&
				potentialScrollableParent.parentNode instanceof HTMLElement
			) {
				scrollableParent = potentialScrollableParent.parentNode;
				scrollableParent.scrollTo(0, verseRef.current.offsetTop - 40);
			}
		}
	}, [verseOutput]);

	return (
		<>
			{verses.length === 0 ? (
				<h3>
					ERROR: could not find verse reference for{" "}
					{`${refBook} ${refChapter}:${refVerse}`}
				</h3>
			) : (
				<>{verseOutput}</>
			)}
		</>
	);
}
