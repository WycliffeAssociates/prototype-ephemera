import { useSettings } from "../../../hooks/SettingsContext";
import type { AlignedText } from "../../../types";
import { mapValidULBSettings } from "../utils/mapValidULBSettings";

interface EnglishWordProps {
	versePhrase: AlignedText;
}

export function EnglishWord({ versePhrase }: EnglishWordProps) {
	const { ULBSettings } = useSettings();
	const overwriteStyles: any = mapValidULBSettings(ULBSettings).wordStyles;

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
