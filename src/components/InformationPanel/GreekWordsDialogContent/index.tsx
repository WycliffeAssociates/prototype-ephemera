import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { useEffect, useRef } from "react";
import React from "react";
import type { AlignedText } from "src/types";
import GreekWordInfo from "../GreekWordInfo";
import TipsDialogContent from "../TipsDialogContent";

interface GreekWordsDialogProps {
	open: boolean;
	onClose?: () => void;
	alignedText: AlignedText;
}

function GreekWordsDialogContent({
	open,
	onClose,
	alignedText,
}: GreekWordsDialogProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);

	// scrolls the container to the top when the greek words change
	useEffect(() => {
		if (containerRef !== null && containerRef !== undefined) {
			const el: HTMLElement | null = containerRef.current;
			if (el !== null) {
				el.scrollTo(0, 0);
			}
		}
	}, [alignedText]);

	if (open === false) return <></>;

	return (
		<>
			{alignedText?.greekAlignmentData &&
			alignedText.greekAlignmentData.length > 0 ? (
				<>
					<div
						ref={containerRef}
						style={{
							overflow: "auto",
							maxHeight: "72vh",
							paddingRight: "40px",
						}}
					>
						{alignedText.greekAlignmentData.map((greekAlignmentData, idx) => (
							<React.Fragment
								key={`GreekWordsDialogContent__EmptyFragment${idx}`}
							>
								<GreekWordInfo
									key={idx}
									currentGreekWord={greekAlignmentData}
									containerRef={containerRef}
								/>
								<Grid item xs={12}>
									<Divider />
								</Grid>
							</React.Fragment>
						))}
					</div>
				</>
			) : (
				<TipsDialogContent open={true} onClose={onClose} />
			)}
		</>
	);
}

export default GreekWordsDialogContent;
