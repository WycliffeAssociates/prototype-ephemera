import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import useBookChapterParams from "../hooks/useBookChapterParams";

interface ChapterNavigationBarProps {
	onClick: (params: any) => any;
}

function ChapterNavigationBar({
	onClick,
}: ChapterNavigationBarProps) {
	let bookChapter =
		useBookChapterParams().getBookChaptersParams();

	return (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			style={{
				padding: "20px 40px 20px 40px",
				borderWidth: "0px 2px 2px 0px",
				borderColor: "rgb(229, 232, 235)",
				borderStyle: "solid",
			}}
		>
			<Grid item xs={10}>
				<ButtonGroup
					variant="outlined"
					aria-label="outlined button group"
					style={{
						width: "100%",
						height: "48px",
						backgroundColor: "#f2f2f2",
						borderRadius: "25px 25px 25px 25px",
					}}
				>
					<Button
						onClick={() => onClick("Books")}
						style={{
							width: "85%",
							borderColor: "#d9d9d9",
							borderRadius: "25px 0px 0px 25px",
						}}
					>
						<span className="ChapterNavigationBar__Span ChapterNavigationBar__BookName">
							{bookChapter.book}
						</span>
					</Button>
					<Button
						onClick={() => onClick("Chapters")}
						style={{
							width: "15%",
							borderColor: "#d9d9d9",
							borderRadius: "0px 25px 25px 0px",
						}}
					>
						<span className="ChapterNavigationBar__Span">
							{bookChapter.chapter}
						</span>
					</Button>
				</ButtonGroup>
			</Grid>
		</Grid>
	);
}

export default ChapterNavigationBar;
