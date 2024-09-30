import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { books } from "../applicationLogic/data/newTestamentMetadata";
import useBookChapterParams from "../hooks/useBookChapterParams";

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
	const [show, setShow] = useState(true);
	const { book, chapter, setValidBookChapterParams } = useBookChapterParams();

	useEffect(() => {
		if (book) {
			const currentChapter = Number.parseInt(`${chapter}`);
			const chapterMax = books[book].numChapters;

			if (currentChapter === chapterMax) {
				setShow(false);
			} else if (!show) {
				setShow(true);
			}
		}
	}, [book, chapter, show]);

	const onClick = () => {
		const newChapter = Number.parseInt(`${chapter}`) + 1;
		if (book) {
			const newBookChapter = {
				book: book,
				chapter: `${newChapter}`,
			};
			setValidBookChapterParams(newBookChapter, false);
		}
	};

	if (!show) {
		return <></>;
	}
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
					<ChevronRightIcon />
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
