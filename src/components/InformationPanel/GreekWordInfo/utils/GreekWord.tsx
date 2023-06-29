import Grid from "@mui/material/Grid";
import { useSettings } from "../../../../hooks/SettingsContext";
import { mapValidGWTSettings } from "./mapValidGWTSettings";
import { useEffect, useState } from "react";

interface greekWordProps {
	greekWord: string | undefined;
}

function GreekWord({ greekWord }: greekWordProps) {
	const { GWTSettings } = useSettings();
	const [fontSize, setFontSize] = useState("24px");
	let overwriteStyle: any =
		mapValidGWTSettings(GWTSettings);

	useEffect(() => {
		if (overwriteStyle?.fontSize != undefined) {
			let nonAdjustedFontSize = parseInt(
				overwriteStyle.fontSize.match(/\d+/g)
			);
			let adjustedFontSize =
				24 + (nonAdjustedFontSize - 20);

			let tempOverwriteStyle = { ...overwriteStyle };
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
