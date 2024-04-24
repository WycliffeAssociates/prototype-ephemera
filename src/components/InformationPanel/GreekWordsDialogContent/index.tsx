import Grid from "@mui/material/Grid";
import TipsDialogContent from "../TipsDialogContent";
import GreekWordInfo from "../GreekWordInfo";
import Divider from "@mui/material/Divider";
import { useEffect, useRef } from "react";
import { AlignedText } from "src/types";

interface GreekWordsDialogProps {
	open: Boolean;
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
		if (
			containerRef !== null &&
			containerRef !== undefined
		) {
			let el : HTMLElement | null =
				containerRef.current;
			if (el !== null) {
				el.scrollTo(0, 0);
			}
		}
	}, [alignedText]);

	if (open === false) return <></>;

	return (
		<>
			{alignedText !== undefined && alignedText.strongs && alignedText?.strongs.length > 0 ? (
				<>
					<div
						ref={containerRef}
						style={{
							overflow: "auto",
							maxHeight: "72vh",
							paddingRight: "40px",
						}}
					>
						{alignedText.strongs.map((strong, idx) => (
							<>
								<GreekWordInfo
									key={idx}
									currentGreekWord={strong}
									containerRef={containerRef}
								/>
								<Grid
									item
									xs={12}
								>
									<Divider />
								</Grid>
							</>
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
