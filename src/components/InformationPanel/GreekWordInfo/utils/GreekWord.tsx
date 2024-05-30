import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useSettings } from "../../../../hooks/SettingsContext";
import { mapValidGWTSettings } from "./mapValidGWTSettings";

interface greekWordProps {
	greekWord: string | undefined;
}

function GreekWord({ greekWord }: greekWordProps) {
	const { GWTSettings } = useSettings();
	const [fontSize, setFontSize] = useState("24px");
	const overwriteStyle: any = mapValidGWTSettings(GWTSettings);

	useEffect(() => {
		if (overwriteStyle?.fontSize != undefined) {
			const nonAdjustedFontSize = Number.parseInt(
				overwriteStyle.fontSize.match(/\d+/g),
			);
			const adjustedFontSize = 24 + (nonAdjustedFontSize - 20);

			const tempOverwriteStyle = { ...overwriteStyle };
			tempOverwriteStyle.fontSize = adjustedFontSize + "px";
			setFontSize(adjustedFontSize + "px");
		}
	}, [GWTSettings]);

	return (
		<>
			<Grid item xs={12}>
				<p
					style={{
						color: "blue",
						...overwriteStyle,
						fontSize: fontSize,
					}}
					className="GreekWord"
				>
					{greekWord}
				</p>
			</Grid>
		</>
	);
}

export default GreekWord;
