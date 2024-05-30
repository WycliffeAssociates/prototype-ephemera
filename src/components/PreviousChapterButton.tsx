import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import useBookChapterParams from "../hooks/useBookChapterParams";

const BootstrapButton = styled(Button)({
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

function PreviousChapterButton() {
	const [show, setShow] = useState(true);
	const { getBookChaptersParams, setValidBookChapterParams } =
		useBookChapterParams();
	const bookChapter = getBookChaptersParams();

	useEffect(() => {
		const currentChapter = Number.parseInt(`${bookChapter.chapter}`);
		if (currentChapter === 1) {
			setShow(false);
		} else if (!show) {
			setShow(true);
		}
	}, [bookChapter.chapter, show]);

	const onClick = () => {
		const newChapter = Number.parseInt(`${bookChapter.chapter}`) - 1;
		if (bookChapter.book) {
			const newBookChapter = {
				book: bookChapter.book,
				chapter: newChapter.toString(),
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
				style={{ float: "left", paddingLeft: "13%" }}
			>
				<Fab
					color="primary"
					aria-label="add"
					style={{
						width: "50px",
						height: "50px",
						backgroundColor: "white",
						color: "black",
					}}
					onClick={onClick}
				>
					<ChevronLeftIcon />
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
				style={{ float: "left", paddingLeft: "8%" }}
			>
				<BootstrapButton variant="contained" disableRipple onClick={onClick}>
					<ChevronLeftIcon /> Previous Chapter
				</BootstrapButton>
			</Box>
		</>
	);
}

export default PreviousChapterButton;
