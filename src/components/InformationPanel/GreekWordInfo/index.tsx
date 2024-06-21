import Grid from "@mui/material/Grid";
import "../../../App.css";
import { type MutableRefObject, useEffect, useState } from "react";
import getGreekWord from "../../../api/gwtUtils";
import mapGWTMarkdown from "../../../applicationLogic/mapping/mapGWTMarkdown";
import type { FormattedGreekWord, GreekAlignmentData } from "../../../types";
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
	const [greekWordsState, setGreekWordsState] = useState<FormattedGreekWord[]>(
		[],
	);

	useEffect(() => {
		(async () => {
			const greekWordMarkDown = await getGreekWord(currentGreekWord.strong);
			const wordsInfo: any[] = [];

			if (greekWordMarkDown !== undefined) {
				const gwtWords = await mapGWTMarkdown(greekWordMarkDown.data);
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

	if (greekWordsState.length === 0) {
		return (
			<>
				<Grid container spacing={0} direction="row" style={{ padding: "0px" }}>
					<span style={{ paddingTop: "50%" }}>
						Requested word with Strong number {currentGreekWord.strong} cannot
						be found.
					</span>
				</Grid>
			</>
		);
	}
	return <>
		{greekWordsState.map((greekWordState, idx: number) => {
				return (<WordContent
					wordNumber={idx}
					greekWordState={greekWordState}
					showMoreOptions={showMoreOptions}
					containerRef={containerRef}
				/>)
		})}
	</>;
}

export default GreekWordInfo;
