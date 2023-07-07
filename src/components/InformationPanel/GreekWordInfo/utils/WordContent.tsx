import {
	MutableRefObject,
	useEffect,
	useState,
} from "react";
import { FormattedGreekWord } from "../../../../types";
import Grid from "@mui/material/Grid";
import GreekWord from "./GreekWord";
import Description from "./Description";
import Morphology from "./Morphology";
import { VerseReferences } from "./VerseReferences";
import UnprocessedMarkdown from "./UnprocessedMarkdown";
import Button from "@mui/material/Button";
import { useSettings } from "../../../../hooks/SettingsContext";
import { mapValidGWTSettings } from "./mapValidGWTSettings";
import useWindowSize from "../../../../hooks/useWindowSize";

interface WordContentProps {
	wordNumber: number;
	greekWordState: FormattedGreekWord;
	showMoreOptions?: boolean;
	containerRef: MutableRefObject<HTMLDivElement | null>;
}

export function WordContent({
	wordNumber,
	greekWordState,
	showMoreOptions,
	containerRef,
}: WordContentProps) {
	const [showMore, setShowMore] = useState(showMoreOptions);
	const { GWTSettings } = useSettings();
	const { innerHeight } = useWindowSize([]);
	let overwriteStyle: any =
		mapValidGWTSettings(GWTSettings);

	useEffect(() => {
		if (showMoreOptions === true) {
			setShowMore(false);
		}
	}, []);

	useEffect(() => {
		if (
			containerRef?.current !== null &&
			containerRef?.current !== undefined
		) {
			let el : HTMLElement = containerRef.current;

			if (el !== null && el !== undefined) {
				if (el.clientHeight >= el.scrollHeight) {
					let continueReadingBtn = document.getElementById(
						"continueReadingBtn"
					);
					if (
						continueReadingBtn !== null &&
						continueReadingBtn !== undefined
					) {
						continueReadingBtn.style.display = "none";
					}
				} else {
					let continueReadingBtn = document.getElementById(
						"continueReadingBtn"
					);
					if (
						continueReadingBtn !== null &&
						continueReadingBtn !== undefined
					) {
						continueReadingBtn.style.display = "block";
					}
				}
			}
		}
	}, [greekWordState, innerHeight, containerRef]);

	return (
		<div
			key={`greekWord ${wordNumber}`}
			className="GreekWordContainer"
		>
			<Grid
				container
				spacing={0}
				direction="row"
				style={{ padding: "0px" }}
			>
				<GreekWord
					greekWord={greekWordState?.gwtGreekWord}
				/>
				<Description
					descriptions={greekWordState?.descriptions}
					showMore={showMore}
				/>
				<Morphology
					morphology={greekWordState?.morphology}
					abbreviatedMorphology={greekWordState.morph}
					showMore={showMore}
				/>
				{greekWordState.verseReferences &&
				(showMore === true || showMore === undefined) ? (
					<VerseReferences
						references={greekWordState.verseReferences}
						referenceWord={greekWordState.strongs}
					/>
				) : (
					""
				)}

				{showMore === true || showMore === undefined ? (
					<>
						{greekWordState?.unprocessedData ? (
							<UnprocessedMarkdown
								markdown={greekWordState.unprocessedData}
							/>
						) : (
							""
						)}
						{greekWordState?.adviceForTranslators ? (
							<UnprocessedMarkdown
								markdown={
									greekWordState.adviceForTranslators
								}
							/>
						) : (
							""
						)}
					</>
				) : (
					""
				)}

				{showMoreOptions !== undefined ? (
					<Button
						onClick={() => setShowMore(!showMore)}
						variant="outlined"
						style={{
							float: "right",
							border: "1px solid #E5E8EB",
							borderRadius: "16px",
							color: "#33445C",
							textTransform: "none",
							marginRight: "15px",
							marginBottom: "10px",
							marginTop: "10px",
							...overwriteStyle,
						}}
					>
						Read {showMore ? "Less" : "More"}
					</Button>
				) : (
					""
				)}
			</Grid>
		</div>
	);
}
