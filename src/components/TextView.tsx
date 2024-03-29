import Grid from "@mui/material/Grid";
import Text from "./Text";

function TextView() {
	return (
		<>
			<Grid
				id="TextViewContainer"
				className="TextViewContainer"
				container
				style={{ position: "absolute" }}
				spacing={0}
			>
				<Grid item xs={12}>
					<Grid
						item
						id="TextContainer"
						className="TextContainer"
						container
						xs={12}
					>
						<Text />
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}

export default TextView;
