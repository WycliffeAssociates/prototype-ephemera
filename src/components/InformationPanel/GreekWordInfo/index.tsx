import Grid from "@mui/material/Grid";
import "../../../App.css";
import { FormattedGreekWord, GreekAlignmentData } from "../../../types";
import {
	MutableRefObject,
	useEffect,
	useState,
} from "react";
import getGreekWord from "../../../api/gwtUtils";
import mapGWTMarkdown from "../../../applicationLogic/mapping/mapGWTMarkdown";
import { WordContent } from "./utils/WordContent";

interface GreekWordInfoProps {
	currentGreekWord: GreekAlignmentData;
	showMoreOptions?: boolean;
	containerRef: MutableRefObject<HTMLDivElement | null>;
}

function GreekWordInfo({
	currentGreekWord,
	showMoreOptions,
	containerRef,
}: GreekWordInfoProps) {
	const [greekWordsState, setGreekWordsState] = useState<
		FormattedGreekWord[]
	>([]);

	const [greekWordsContent, setGreekWordsContent] =
		useState<any[]>([]);

	useEffect(() => {
		(async () => {
			let greekWordMarkDown = await getGreekWord(
				currentGreekWord.strong
			);
			let wordsInfo: any[] = [];

			if (greekWordMarkDown !== undefined) {
				let gwtWords = await mapGWTMarkdown(
					greekWordMarkDown.data
				);
				gwtWords.forEach((gwtWord) => {
					wordsInfo.push({
						strongs: currentGreekWord.strong,
						morph: currentGreekWord.morph,
						...gwtWord,
					});
				});
			}
			setGreekWordsState(wordsInfo);
		})();
	}, [currentGreekWord]);

	useEffect(() => {
		const greekWords: any[] = [];

		greekWordsState.forEach(
			(greekWordState, idx: number) => {
				greekWords.push(
					<WordContent
						wordNumber={idx}
						greekWordState={greekWordState}
						showMoreOptions={showMoreOptions}
						containerRef={containerRef}
					/>
				);
			}
		);

		setGreekWordsContent([...greekWords]);
	}, [containerRef, greekWordsState, showMoreOptions]);

	if (greekWordsContent.length === 0) {
		return (
			<>
				<Grid
					container
					spacing={0}
					direction="row"
					style={{ padding: "0px" }}
				>
					<span style={{ paddingTop: "50%" }}>
						Requested word with
						Strong number {currentGreekWord.strong} cannot
						be found.
					</span>
				</Grid>
			</>
		);
	} else {
		return <>{greekWordsContent}</>;
	}
}

export default GreekWordInfo;
