import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { fetchMorphologyWord } from "src/api/morphology";
import { useSettings } from "../../../hooks/SettingsContext";
import { useGreekWordsParams } from "../../../hooks/useGreekWordsParams";
import { mapValidGWTSettings } from "../GreekWordInfo/utils/mapValidGWTSettings";
import UnprocessedMarkdown from ".//utils/UnprocessedMarkdown";
import { Header } from "./utils/Header";

interface MorphologyDialogContentProps {
	open: boolean;
	onClose?: () => void;
	fullScreen?: boolean;
	morphologyWord?: string;
}

export default function MorphologyDialogContent({
	open,
	onClose,
	fullScreen,
	morphologyWord,
}: MorphologyDialogContentProps) {
	const [morphologyWordMarkdown, setMorphologyWordMarkdown] =
		useState<string>();
	const { GWTSettings } = useSettings();
	const overwriteStyle: any = mapValidGWTSettings(GWTSettings);
	const { greekWords } = useGreekWordsParams();

	function extractMorphologyFromMarkdown(markdown: string) {
		const morphologyWord = markdown.match(/#\W([a-zA-Z]+)/);
		if (morphologyWord?.[1]) {
			return morphologyWord[1];
		}
		return "Not Found";
	}

	useEffect(() => {
		(async () => {
			const res = await fetchMorphologyWord(greekWords, morphologyWord);
			if (res) {
				setMorphologyWordMarkdown(res);
			}
		})();
	}, [greekWords, morphologyWord]);

	if (open) {
		return (
			<Grid
				container
				direction="row"
				style={{ overflow: "hidden", maxHeight: "90vh" }}
			>
				<Grid
					item
					xs={12}
					style={{
						textAlign: "left",
						paddingLeft: "15px",
						paddingBottom: "50px",
					}}
				>
					<Grid container direction="row">
						<Header
							onClose={onClose}
							fullScreen={fullScreen}
							morphologyWord={morphologyWord}
						/>

						<Grid
							item
							xs={12}
							style={{
								padding: "0px 40px 0px 0px",
								overflowY: "auto",
								maxHeight: "70vh",
							}}
						>
							{morphologyWordMarkdown !== undefined && fullScreen === true ? (
								<>
									<h3
										style={{ ...overwriteStyle }}
										className="MorphlolgyDialogContent__header"
									>
										{extractMorphologyFromMarkdown(morphologyWordMarkdown)}
									</h3>
								</>
							) : (
								""
							)}

							{morphologyWordMarkdown !== undefined ? (
								<UnprocessedMarkdown markdown={morphologyWordMarkdown} />
							) : (
								<h3>
									ERROR: could not find information for "{morphologyWord}"
								</h3>
							)}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}
	return <></>;
}
