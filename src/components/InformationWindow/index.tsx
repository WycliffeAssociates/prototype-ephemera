import { useState } from "react";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import { AlignedText } from "../../types";
import { useBookChapterParams } from "../../hooks/useBookChapterParams";
import MorphologyDialogContent from "../InformationPanel/MorphologyDialogContent";
import VerseReferenceDialogContent from "../InformationPanel/VerseReferenceDialogContent";
import { useEffect } from "react";
import useMorphologyParams from "../../hooks/useMorphologyParams";
import { Header } from "./utils/Header";
import { GreekWordsContent } from "./utils/GreekWordsContent";
import { useInformationLayout } from "src/hooks/useInformationLayout";
import useGreekWordsParams from "src/hooks/useGreekWordsParams";


interface InformationWindowProps {
	alignedText: AlignedText;
	open: boolean;
	onClose: () => any;
}

function InformationWindow({
	alignedText,
	open,
	onClose,
}: InformationWindowProps) {

	const { 
		openMorphologyDialog, 
		openGreekWordsDialog, 
		openVerseReferenceDialog, 
		onVerseReferenceClose, 
		onMorphologyDialogClose  
	} = useInformationLayout();

	const { refBook, refChapter, refVerse, refWord } = useBookChapterParams().getBookChaptersParams();

	const { getMorphologyParams } =
	useMorphologyParams();

	const { showGreekWords } = useGreekWordsParams();


	return (
		<>
			<Dialog fullScreen open={open} onClose={onClose}>
				<Grid
					container
					style={{
						overflow: "hidden",
						maxHeight: "fit-content",
					}}
				>
					<Header
						onClose={onClose}
						show={
							!openVerseReferenceDialog &&
							!openMorphologyDialog
						}
					/>

					<Grid
						item
						xs={12}
						id="InformationWindow"
						style={{ padding: "0px 0px 40px 0px" }}
					>
						{openGreekWordsDialog ?
							<GreekWordsContent
								alignedText={alignedText}
								onClose={onClose}
							/>
						: <></>}

						{openVerseReferenceDialog ? 
							<VerseReferenceDialogContent
								open={openVerseReferenceDialog}
								onClose={onVerseReferenceClose}
								refBook={refBook}
								refChapter={refChapter}
								refVerse={refVerse}
								refWord={refWord}
								fullScreen={true}
							/>
						: <></>}

						{openMorphologyDialog ? 
							<MorphologyDialogContent
								open={openMorphologyDialog}
								onClose={onMorphologyDialogClose}
								fullScreen={true}
								morphologyWord={
									getMorphologyParams().morphologyWord
								}
							/>
						:<></>}
					</Grid>
				</Grid>
			</Dialog>
		</>
	);
}

export default InformationWindow;
