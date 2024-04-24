import { Grid } from "@mui/material";
import { useSettings } from "../../../../hooks/SettingsContext";
import { AlignedText } from "../../../../types";
import { mapValidGWTSettings } from "../../GreekWordInfo/utils/mapValidGWTSettings";
import InfoIcon from "@material-ui/icons/InfoOutlined";

interface GreekWordsBannerProps {
	alignedText: AlignedText;
}

export default function BannerMessage({
	alignedText,
}: GreekWordsBannerProps) {
	const { GWTSettings } = useSettings();
	let overwriteStyle: any =
		mapValidGWTSettings(GWTSettings);

	if (alignedText && alignedText?.strongs && alignedText?.strongs.length >= 4) {
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
							There are {alignedText?.strongs.length} Greek word
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
