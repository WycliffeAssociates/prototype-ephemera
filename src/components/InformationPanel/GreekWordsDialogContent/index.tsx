import Grid from "@mui/material/Grid";
import { FormattedGreekWord } from "../../../types";
import TipsDialogContent from "../TipsDialogContent";
import GreekWordInfo from "../GreekWordInfo";
import Divider from "@mui/material/Divider";
import { ContinueReadingButton } from "./utils/ContinueReadingButton";
import { useEffect, useRef, useState } from "react";

interface GreekWordsDialogProps {
	open: Boolean;
	onClose?: () => void;
	greekWords: FormattedGreekWord[];
}

function GreekWordsDialogContent({
	open,
	onClose,
	greekWords,
}: GreekWordsDialogProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);

	// scrolls the container to the top when the greek words change
	useEffect(() => {
		if (
			containerRef !== null &&
			containerRef !== undefined
		) {
			let el =
				containerRef.current as unknown as HTMLElement;
			if (el !== null) {
				el.scrollTo(0, 0);
			}
		}
	}, [greekWords]);

	if (open === false) return <></>;

	return (
		<>
			{greekWords !== undefined && greekWords.length > 0 ? (
				<>
					<div
						ref={containerRef}
						style={{
							overflow: "auto",
							maxHeight: "72vh",
							paddingRight: "40px",
						}}
					>
						{greekWords.map((data, idx) => (
							<>
								<GreekWordInfo
									key={idx}
									currentGreekWord={data}
									containerRef={containerRef}
								/>
								<Grid
									item
									xl={12}
									lg={12}
									md={12}
									sm={12}
									xs={12}
								>
									<Divider />
								</Grid>
							</>
						))}
					</div>

					<ContinueReadingButton
						containerRef={containerRef}
						rightPosition="20.17%"
					/>
				</>
			) : (
				<TipsDialogContent open={true} onClose={onClose} />
			)}
		</>
	);
}

export default GreekWordsDialogContent;
