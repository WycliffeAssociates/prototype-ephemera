import { AlignedText } from "../../../types";
import { useSettings } from "../../../hooks/SettingsContext";
import { mapValidULBSettings } from "../utils/mapValidULBSettings";

interface EnglishWordProps {
	versePhrase: AlignedText;
}

export function EnglishWord({
	versePhrase,
}: EnglishWordProps) {
	const { ULBSettings } = useSettings();
	let overwriteStyles: any =
		mapValidULBSettings(ULBSettings).wordStyles;

	return (
		<>
			<span
				style={{
					color: "#001533CC",
					textDecoration: "none",
					fontSize: overwriteStyles.fontSize,
				}}
			>
				{versePhrase.text}
			</span>
			<span> </span>
		</>
	);
}
