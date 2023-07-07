import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import useBookChapterParams from "../hooks/useBookChapterParams";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const DesktopNextChapterButton = styled(Button)({
	height: 48,
	borderRadius: 20,
	textTransform: "none",
	fontSize: 20,
	padding: "12px 16px 12px 16px",
	lineHeight: 1.0,
	backgroundColor: "white",
	color: "black",
	maxWidth: 231,
	minWidth: 231,
});

function NextChapterButton() {
	const {
		getBookChaptersParams,
		setValidBookChapterParams,
	} = useBookChapterParams();
	let bookChapter = getBookChaptersParams();

	const onClick = () => {
		let newChapter = parseInt(bookChapter.chapter) + 1;
		if(bookChapter.book) {
			let newBookChapter = {
				book: bookChapter.book,
				chapter: newChapter + ""
			}
			setValidBookChapterParams(
				newBookChapter,
				false
			);
		}
	};
	return (
		<>
			<Box
				display={{
					xs: "block",
					sm: "block",
					md: "block",
					lg: "block",
					xl: "none",
				}}
				style={{ float: "right", paddingRight: "15%" }}
			>
				<Fab
					color="primary"
					aria-label="add"
					style={{
						maxWidth: "50px",
						minWidth: "50px",
						maxHeight: "50px",
						minHeight: "50px",
						backgroundColor: "white",
						color: "black",
					}}
					onClick={onClick}
				>
					<ChevronRightIcon/>
				</Fab>
			</Box>

			<Box
				display={{
					xs: "none",
					sm: "none",
					md: "none",
					lg: "none",
					xl: "block",
				}}
				style={{ float: "right", paddingRight: "15%" }}
			>
				<DesktopNextChapterButton
					variant="contained"
					disableRipple
					onClick={onClick}
				>
					Next Chapter <ChevronRightIcon />
				</DesktopNextChapterButton>
			</Box>
		</>
	);
}

export default NextChapterButton;
