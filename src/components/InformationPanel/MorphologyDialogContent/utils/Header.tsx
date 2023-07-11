import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Divider from "@mui/material/Divider";
import { mapValidGWTSettings } from "../../GreekWordInfo/utils/mapValidGWTSettings";
import { useSettings } from "../../../../hooks/SettingsContext";

interface HeaderProps {
	onClose?: () => void;
	fullScreen?: boolean;
	morphologyWord?: string;
}

export function Header({
	onClose,
	fullScreen,
	morphologyWord,
}: HeaderProps) {
	const { GWTSettings } = useSettings();
	let overwriteStyle: any =
		mapValidGWTSettings(GWTSettings);

	function capitalizeFirstLetter(
		str: string | undefined
	): string {
		if (str === undefined) {
			return "";
		}

		if (/^[a-zA-Z]/.test(str)) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		} else {
			return str;
		}
	}

	return (
		<>
			<Grid item xs={8}>
				<h3
					className="BannerHeader"
					style={{
						color: !fullScreen ? "#015AD9" : "black",
						...overwriteStyle,
					}}
				>
					{fullScreen === false && morphologyWord
						? capitalizeFirstLetter(
								morphologyWord.trim()
						  )
						: "Learn More"}
				</h3>
			</Grid>

			<Grid
				item
				xs={2}
				style={{ margin: "auto" }}
			>
				<Button
					onClick={onClose}
					variant="outlined"
					style={{
						float: "right",
						border: "1px solid #E5E8EB",
						borderRadius: "16px",
						color: "#33445C",
						textTransform: "none",
						minWidth:
							fullScreen === false ? "115px" : "65px",
					}}
				>
					<ArrowBackIcon />{" "}
					{fullScreen !== true ? "Go Back" : ""}
				</Button>
			</Grid>

			<Grid item xs={12}>
				<Divider />
			</Grid>
		</>
	);
}
