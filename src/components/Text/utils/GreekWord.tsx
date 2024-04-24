import { useRef } from "react";
import { AlignedText } from "../../../types";
import { useSettings } from "../../../hooks/SettingsContext";
import { mapValidULBSettings } from "../utils/mapValidULBSettings";

interface GreekWordProps {
	onPhraseClick: (words: AlignedText) => void;
	handleClick: (params: any) => any;
	versePhrase: AlignedText;
}

export function GreekWord({
	onPhraseClick,
	handleClick,
	versePhrase,
}: GreekWordProps) {
	const wordRef = useRef(null);
	const { ULBSettings } = useSettings();
	let overwriteStyles: any =
		mapValidULBSettings(ULBSettings).wordStyles;

	return (
		<>
			<span
				ref={wordRef}
				className="TextContainer__GreekPhrase"
				style={{ ...overwriteStyles }}
				onClick={() => {
					onPhraseClick(versePhrase);
					handleClick(wordRef);
					console.log(versePhrase);
				}}
			>
				{versePhrase.text}
			</span>
			<span> </span>
		</>
	);
}
