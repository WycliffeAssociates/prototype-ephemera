import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

interface NavigationHeaderProps {
	onClick?: (params?: any) => void;
}

export function NavigationHeader({
	onClick,
}: NavigationHeaderProps) {
	return (
		<>
			<Grid item xs={8}>
				<h3 className="BannerHeader">Navigation</h3>
			</Grid>

			<Grid
				item
				xs={2}
				style={{ margin: "auto" }}
			>
				<Button
					onClick={onClick}
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
		</>
	);
}
