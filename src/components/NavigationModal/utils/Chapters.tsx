import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { books as newTestamentMetadata } from "../../../applicationLogic/data/newTestamentMetadata";
import useBookChapterParams from "../../../hooks/useBookChapterParams";

interface ChapterProps {
	chapterNum: number;
	onClick: (params: any) => any;
	isActiveChapter?: boolean;
}

function Chapter({ chapterNum, onClick, isActiveChapter }: ChapterProps) {
	const baseStyle = {
		height: "56px",
		width: "93.5px",
		borderRadius: "3px",
	};

	let chapterStyle: any;
	if (isActiveChapter) {
		chapterStyle = {
			color: "blue",
			backgroundColor: "#F2F7FD",
			...baseStyle,
		};
	} else {
		chapterStyle = {
			color: "black",
			...baseStyle,
		};
	}

	return (
		<Grid item xs={3} style={chapterStyle}>
			<p onClick={() => onClick(chapterNum)}>{chapterNum}</p>
		</Grid>
	);
}

interface ChaptersProps {
	selectedBook: string;
}

function Chapters({ selectedBook }: ChaptersProps) {
	const [numChapters, setNumChapters] = useState(0);
	const { setValidBookChapterParams, getBookChaptersParams } =
		useBookChapterParams();
	const currentBookChapter = getBookChaptersParams();

	useEffect(() => {
		// If a book has been clicked, then use the selected books chapters
		// else use the most recently clicked book's chapters
		if (selectedBook && selectedBook !== "") {
			setNumChapters(newTestamentMetadata[selectedBook].numChapters);
		} else if (currentBookChapter.book && currentBookChapter.book !== "") {
			setNumChapters(newTestamentMetadata[currentBookChapter.book].numChapters);
		} else {
			setNumChapters(0);
		}
	}, [selectedBook, currentBookChapter.book]);

	const chapters: any[] = [];

	function onChapterClick(chapterNum: number) {
		const params = {
			book: selectedBook !== "" ? selectedBook : `${currentBookChapter.book}`,
			chapter: `${chapterNum}`,
		};

		if (params.book) {
			setValidBookChapterParams(params, false);
		}
	}

	if (numChapters !== undefined) {
		for (let i = 0; i < numChapters; i++) {
			const chapterElement = (
				<Chapter
					key={`chapter ${i}`}
					chapterNum={i + 1}
					onClick={onChapterClick}
					isActiveChapter={
						selectedBook === currentBookChapter.book &&
						i + 1 === Number.parseInt(`${currentBookChapter.chapter}`)
					}
				/>
			);
			chapters.push(chapterElement);
		}
	}

	return (
		<Grid
			container
			direction="row"
			justifyContent="flex-start"
			alignItems="flex-start"
			style={{
				height: "100%",
				padding: "0px 0px 40px 0px",
			}}
		>
			{numChapters > 0 ? chapters.map((chapter) => chapter) : ""}
		</Grid>
	);
}

export default Chapters;
