import { useRef } from "react";
import { useSettings } from "../../../hooks/SettingsContext";
import type { AlignedText } from "../../../types";
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
	const overwriteStyles: any = mapValidULBSettings(ULBSettings).wordStyles;

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
