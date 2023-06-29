import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Header } from "./utils/Header";
import UnprocessedMarkdown from ".//utils/UnprocessedMarkdown";
import { useSettings } from "../../../hooks/SettingsContext";
import { mapValidGWTSettings } from "../GreekWordInfo/utils/mapValidGWTSettings";
import { useGreekWords } from "../../../hooks/GreekWordsContext";
import { fetchMorphologyWord } from "../../../api/morphology"

interface MorphologyDialogContentProps {
	open: Boolean;
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
	const [
		morphologyWordMarkdown,
		setMorphologyWordMarkdown,
	] = useState<string>();
	const { GWTSettings } = useSettings();
	let overwriteStyle: any =
		mapValidGWTSettings(GWTSettings);
	let { greekWords } = useGreekWords();

	function extractMorphologyFromMarkdown(markdown: string) {
		return markdown.match(/#\W([a-zA-Z]+)/) as any[];
	}

	useEffect(() => {
		(async () => {
			let res = await fetchMorphologyWord(greekWords, morphologyWord);
			if(res) {
				setMorphologyWordMarkdown(res)
			}
		})();
	}, []);

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
							{morphologyWordMarkdown !== undefined &&
							fullScreen === true ? (
								<>
									<h3
										style={{ ...overwriteStyle }}
										className="MorphlolgyDialogContent__header"
									>
										{
											extractMorphologyFromMarkdown(
												morphologyWordMarkdown as string
											)[1]
										}
									</h3>
								</>
							) : (
								""
							)}

							{morphologyWordMarkdown !== undefined ? (
								<UnprocessedMarkdown
									markdown={morphologyWordMarkdown}
								/>
							) : (
								<></>
							)}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	} else {
		return <></>;
	}
}
