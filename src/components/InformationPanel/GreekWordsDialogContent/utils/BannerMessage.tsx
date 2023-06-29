import { Grid } from "@mui/material";
import { useSettings } from "../../../../hooks/SettingsContext";
import { FormattedGreekWord } from "../../../../types";
import { mapValidGWTSettings } from "../../GreekWordInfo/utils/mapValidGWTSettings";
import InfoIcon from "@material-ui/icons/InfoOutlined";

interface GreekWordsBannerProps {
	greekWords: FormattedGreekWord[];
}

export default function BannerMessage({
	greekWords,
}: GreekWordsBannerProps) {
	const { GWTSettings } = useSettings();
	let overwriteStyle: any =
		mapValidGWTSettings(GWTSettings);

	if (greekWords && greekWords?.length >= 4) {
		return (
			<Grid
				item
				lg={12}
				xl={12}
				md={12}
				sm={12}
				style={{
					backgroundColor: "#E6EEFB",
					width: "100%",
					height: "58px",
					display: "table",
				}}
			>
				<Grid
					container
					style={{ height: "100%" }}
					direction={"row"}
					justifyContent={"flex-start"}
					alignItems={"center"}
				>
					<Grid
						item
						style={{ paddingLeft: "3%" }}
						xl={12}
						lg={12}
						md={12}
						sm={12}
						xs={12}
					>
						<InfoIcon
							style={{
								verticalAlign: "middle",
								lineHeight: "1px",
								float: "left",
							}}
						/>
						<span
							style={{
								paddingLeft: "1%",
								float: "left",
								...overwriteStyle,
							}}
						>
							There are {greekWords.length} Greek word
							translations
						</span>
					</Grid>
				</Grid>
			</Grid>
		);
	} else {
		return <></>;
	}
}
