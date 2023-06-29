import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import Options from "./utils/Options";
import { useSettings } from "../../hooks/SettingsContext";
import useWindowSize from "../../hooks/useWindowSize";
import { Header } from "./utils/Header";

const style = {
	position: "absolute" as "absolute",
	top: "48%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "40%",
	height: "40%",
	background: "#FFFFFF",
	borderRadius: "8px",
	boxShadow: 24,
	p: 1,
	paddingTop: "0px",
	paddingLeft: "0px",
	outline: "none",
};

interface SettingsModalProps {
	open: boolean;
	onClose: () => any;
}

function SettingsModal({
	open,
	onClose,
}: SettingsModalProps) {
	const { ULBSettings, GWTSettings } = useSettings();
	const windowSize = useWindowSize([]);

	function setAllSettingsToDefault() {
		ULBSettings.forEach((setting) => {
			setting.modifier(setting.defaultValue);
		});

		GWTSettings.forEach((setting) => {
			setting.modifier(setting.defaultValue);
		});
	}

	return (
		<Modal
			open={open}
			onClose={() => onClose()}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			hideBackdrop={true}
		>
			<div>
				<ClickAwayListener onClickAway={() => onClose()}>
					<Box
						sx={style}
						style={{
							width: "70%",
							minWidth: "280px",
							maxWidth: "660px",
							minHeight: "370px",
							maxHeight: "250px",
						}}
					>
						<Grid
							container
							direction="row"
							justifyContent="center"
						>
							<Header onClose={onClose} />

							<Grid
								item
								lg={6}
								xl={6}
								md={6}
								sm={12}
								xs={12}
								style={{
									borderRight:
										windowSize.innerWidth >= 900
											? "1px solid black"
											: "none",
									borderBottom:
										windowSize.innerWidth < 900
											? "1px solid black"
											: "none",
									padding:
										windowSize.innerWidth >= 900
											? "0px 20px 0px 20px"
											: "0px 20px 20px 20px",
								}}
							>
								<Options
									panelSettings={ULBSettings}
									title="LEFT PANEL"
								/>
							</Grid>

							<Grid
								item
								lg={6}
								xl={6}
								md={6}
								sm={12}
								xs={12}
								style={{
									padding:
										windowSize.innerWidth >= 900
											? "0px 20px 0px 20px"
											: "20px 20px 0px 20px",
								}}
							>
								<Options
									panelSettings={GWTSettings}
									title="RIGHT PANEL"
								/>
							</Grid>

							<Grid
								item
								lg={4}
								xl={4}
								md={4}
								sm={4}
								xs={4}
								style={{
									marginTop: "20px",
								}}
							>
								<Button
									variant="outlined"
									sx={{ m: 0.25, p: 0.25 }}
									style={{ width: "90%", height: "25px" }}
									onClick={setAllSettingsToDefault}
								>
									reset
								</Button>
							</Grid>
						</Grid>
					</Box>
				</ClickAwayListener>
			</div>
		</Modal>
	);
}
export default SettingsModal;
