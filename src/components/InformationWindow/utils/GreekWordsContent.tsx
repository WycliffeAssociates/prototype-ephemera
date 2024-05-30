import { useEffect, useRef, useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";
import type { AlignedText } from "../../../types";
import GreekWordInfo from "../../InformationPanel/GreekWordInfo";
import TipsDialogContent from "../../InformationPanel/TipsDialogContent";
import { BannerMessage } from "./BannerMessage";

interface GreekWordsContentProps {
	alignedText: AlignedText;
	onClose: () => any;
}

export function GreekWordsContent({
	alignedText,
	onClose,
}: GreekWordsContentProps) {
	const [modalHeight, setModalHeight] = useState("");
	const windowSize = useWindowSize([]);
	const containerRef = useRef(null);

	useEffect(() => {
		const height = windowSize.innerHeight / 7.5; // Ratio for window height to scrollable area
		setModalHeight(`${height} vh`);
	}, [windowSize.innerHeight]);

	return (
		<>
			<BannerMessage alignedText={alignedText} />

			{alignedText?.greekAlignmentData &&
			alignedText.greekAlignmentData.length > 0 ? (
				<div
					ref={containerRef}
					style={{
						maxHeight: modalHeight,
						overflowY: "auto",
						padding: "0px 0px 40px 0px",
						paddingRight: "15px",
						scrollPadding: "50px",
					}}
				>
					{alignedText.greekAlignmentData.map((greekAlignmentData, idx) => (
						<div
							style={{
								borderBottom: "solid",
								borderColor: "#d9d9d9",
								overflow: "hidden",
							}}
						>
							<GreekWordInfo
								key={idx}
								currentGreekWord={greekAlignmentData}
								showMoreOptions={true}
								containerRef={containerRef}
							/>
						</div>
					))}
				</div>
			) : (
				<TipsDialogContent open={true} onClose={onClose} />
			)}
		</>
	);
}
