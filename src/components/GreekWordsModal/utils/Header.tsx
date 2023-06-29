import { Button, Divider, Grid } from "@mui/material";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useSettings } from "../../../hooks/SettingsContext";
import { mapValidGWTSettings } from "../../InformationPanel/GreekWordInfo/utils/mapValidGWTSettings";

interface HeaderProps {
	onClose: () => any;
	show: boolean;
}

export function Header({ onClose, show }: HeaderProps) {
	const { GWTSettings } = useSettings();
	let overwriteStyle: any =
		mapValidGWTSettings(GWTSettings);

	if (show === false) {
		return <></>;
	}

	return (
		<>
			<Grid item xs={8}>
				<h3
					style={{ ...overwriteStyle }}
					className="BannerHeader"
				>
					Greek Word Translation
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
					}}
				>
					<ArrowBackIcon />
				</Button>
			</Grid>

			<Grid item xs={12}>
				<Divider />
			</Grid>
		</>
	);
}
