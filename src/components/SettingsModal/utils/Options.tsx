import Grid from "@mui/material/Grid";
import { SettingsOption } from "../../../types";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { MenuItem, NativeSelect, Select, SelectChangeEvent } from "@mui/material";
import useSourceTextResourceParams from "src/hooks/useSourceTextResourceParams";

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

	const { setSourceTextResourceLanguageParam, setSourceTextResourceTypeParam } = useSourceTextResourceParams()

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
				} else if(setting.inputType === "dropdown") {

					if(setting.name === "Language") {

						return (
							<Grid
								key={`setting ${idx}`}
								item
								xs={12}
							>
								<NativeSelect defaultValue={"en"} onChange={(event) => {
									setting.modifier(event.target.value)
									setSourceTextResourceLanguageParam(event.target.value);
								}}>	
									<option value={"en"}>en</option>
									<option value={"hi"}>hi</option>
									<option value={"ru"}>ru</option>
									<option value={"bn"}>bn</option>
									<option value={"mr"}>mr</option>
									<option value={"ne"}>ne</option>
									<option value={"or"}>or</option>
									<option value={"gu"}>gu</option>
									<option value={"kn"}>kn</option>
									<option value={"te"}>te</option>

								</NativeSelect>
							</Grid>
						)
					} else if(setting.name === "Type") {

						return (
							<Grid
								key={`setting ${idx}`}
								item
								xs={12}
							>
								<NativeSelect defaultValue={"ulb"} onChange={(event) => {
									setting.modifier(event.target.value)
									setSourceTextResourceTypeParam(event.target.value);
								}}>
									<option value={"ulb"}>ULB</option>
									<option value={"glt"}>GLT</option>
									<option value={"ust"}>UST</option>
								</NativeSelect>
							</Grid>
						)
					}

				}
				
				else {
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
