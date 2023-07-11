import Grid from "@mui/material/Grid";
import { SettingsOption } from "../../../types";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";

const SettingsModal__decreaseButton = {
	height: "30px",
	width: "30px",
	maxHeight: "30px",
	maxWidth: "30px",
	minWidth: "30px",
};

const SettingsModal__increaseButton = {
	height: "30px",
	width: "30px",
	maxHeight: "30px",
	maxWidth: "30px",
	minWidth: "30px",
};

interface PannelSettingsOptionsProps {
	settings: SettingsOption[];
}

function PanelSettingsOptions({
	settings,
}: PannelSettingsOptionsProps) {
	return (
		<Grid container direction="row">
			{settings.map((setting, idx: number) => {
				if (setting.inputType === "switch" && typeof(setting.value) === "boolean") {
					return (
						<Grid
							key={`setting ${idx}`}
							item
							xs={12}
						>
							<Switch
								size="medium"
								checked={setting.value}
								onChange={() =>
									setting.modifier(!setting.value)
								}
							/>
						</Grid>
					);
				} else if (setting.inputType === "increment") {
					return (
						<Grid
							key={`setting ${idx}`}
							item
							xs={12}
						>
							<Button
								variant="outlined"
								sx={{ m: 0.25, p: 0.25 }}
								style={SettingsModal__decreaseButton}
								onClick={() => {
									setting.modifier(
										(parseInt(setting.value + "")) - 1
									);
								}}
							>
								-
							</Button>
							<p className="SettingsModal__settingsValue">
								{setting.value}
								{setting.unit ? setting.unit : ""}
							</p>
							<Button
								variant="outlined"
								sx={{ m: 0.25, p: 0.25 }}
								style={{
									...SettingsModal__increaseButton,
									float: "right",
								}}
								onClick={() => {
									setting.modifier(
										(parseInt(setting.value + "")) + 1
									);
								}}
							>
								+
							</Button>
						</Grid>
					);
				} else if (setting.inputType === "button") {
					return (
						<Grid
							key={`setting ${idx}`}
							item
							xs={12}
						>
							<Button
								variant="outlined"
								onClick={() => {
									setting.modifier(
										(parseInt(setting.value + "")) - 1
									);
								}}
							>
								Reset
							</Button>
						</Grid>
					);
				} else {
					return <></>;
				}
			})}
		</Grid>
	);
}

interface OptionsProps {
	panelSettings: SettingsOption[];
	title?: string;
}

function Options({ panelSettings, title }: OptionsProps) {
	return (
		<Grid container>
			{title !== undefined ? (
				<Grid item xs={12}>
					<span className="SettingsModal__Options__title">
						{title}
					</span>
				</Grid>
			) : (
				""
			)}

			<Grid item xs={6}>
				<>
					{panelSettings.map((setting, idx: number) => {
						return (
							<span
								key={`setting name ${idx}`}
								className="SettingsModal__settingsOption"
							>
								{setting.name}
							</span>
						);
					})}
				</>
			</Grid>

			<Grid item xs={6}>
				<PanelSettingsOptions settings={panelSettings} />
			</Grid>
		</Grid>
	);
}

export default Options;
