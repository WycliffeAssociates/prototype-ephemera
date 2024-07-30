import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useSettings } from "../../../../hooks/SettingsContext";
import { useBookChapterParams } from "../../../../hooks/useBookChapterParams";
import { useGreekWordsParams } from "../../../../hooks/useGreekWordsParams";
import { mapValidGWTSettings } from "./mapValidGWTSettings";

interface VerseReferencesProps {
	references: string[];
	referenceWord: string;
}

export function VerseReferences({
	references,
	referenceWord,
}: VerseReferencesProps) {
	const [filteredVersereferences, setFilteredVerseReferences] = useState<
		string[]
	>([]);
	const { greekWordverseNumber } = useGreekWordsParams();
	const { setValidVerseReferenceParams, book, chapter } =
		useBookChapterParams();
	const { GWTSettings } = useSettings();
	const overwriteStyle: any = mapValidGWTSettings(GWTSettings);

	useEffect(() => {
		const tempVerseReferences: string[] = [];

		references.forEach((reference) => {
			const referenceInformation = parseVerseReferenceInformation(reference);
			const referenceBook = referenceInformation.book;
			const referenceChapter = referenceInformation.chapter;
			const referenceVerse = Number.parseInt(referenceInformation.verse);

			if (
				book !== referenceBook ||
				chapter !== referenceChapter ||
				referenceVerse !== greekWordverseNumber
			) {
				tempVerseReferences.push(reference);
			}
		});

		setFilteredVerseReferences([...tempVerseReferences]);
	}, [greekWordverseNumber, references, book, chapter]);

	function parseVerseReferenceInformation(verseReference: string) {
		const referenceMatch = verseReference.match(
			/(\d\W){0,1}([a-zA-Z]+) (\d+):(\d+)/,
		);
		let verseReferenceBook = "";
		let verseReferenceChapter = "";
		let verseReferenceVerse = "";

		if (referenceMatch) {
			verseReferenceBook =
				referenceMatch[1] !== undefined
					? `${referenceMatch[1]}${referenceMatch[2]}`
					: referenceMatch[2];
			verseReferenceChapter = referenceMatch[3];
			verseReferenceVerse = referenceMatch[4];
		}

		return {
			book: verseReferenceBook,
			chapter: verseReferenceChapter,
			verse: verseReferenceVerse,
		};
	}

	function onVerseReferenceClick(verseReference: string) {
		const verReferenceInfo = parseVerseReferenceInformation(verseReference);

		const verseReferenceBook = verReferenceInfo.book;
		const verseReferenceChapter = verReferenceInfo.chapter;
		const verseReferenceVerse = verReferenceInfo.verse;

		const newVerseRerence = {
			bookReference: verseReferenceBook,
			chapterReference: verseReferenceChapter,
			verseReference: verseReferenceVerse,
			word: referenceWord,
		};
		setValidVerseReferenceParams(newVerseRerence);
	}

	return (
		<>
			<Grid item xs={12}>
				<p className="GreekWordInfoSubCategory" style={{ ...overwriteStyle }}>
					Where else is this word used?
				</p>
			</Grid>

			{filteredVersereferences.map((verseReference, idx: number) => {
				return (
					<p
						key={`reference ${idx}`}
						className="GreekWordInfoSubCategoryValue"
						style={{
							textDecoration: "underline",
							cursor: "pointer",
							color: "blue",
							width: "100%",
							...overwriteStyle,
						}}
						onClick={() => onVerseReferenceClick(verseReference)}
					>
						{verseReference}&nbsp;
					</p>
				);
			})}
		</>
	);
}
