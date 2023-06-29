import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { FormattedGreekWord } from "../../types";
import TipsDialogContent from "./TipsDialogContent";
import MorphologyDialogContent from "./MorphologyDialogContent";
import VerseReferenceDialogContent from "./VerseReferenceDialogContent";
import { useBookChapterParams } from "../../hooks/useBookChapterParams";
import { useState, useEffect } from "react";
import useMorphologyParams from "../../hooks/useMorphologyParams";
import BannerMessage from "./GreekWordsDialogContent/utils/BannerMessage";
import GreekWordsDialogContent from "./GreekWordsDialogContent";

interface GreekWordsDialogProps {
	open: Boolean;
	onClose?: () => void;
	greekWords: FormattedGreekWord[];
}

function InformationPanel({
	open,
	onClose,
	greekWords,
}: GreekWordsDialogProps) {
	const { getBookChaptersParams, removeReferenceParams } =
		useBookChapterParams();
	const { getMorphologyParams, removeMorphologyParams } =
		useMorphologyParams();

	const [
		openVerseReferenceDialog,
		setOpenVerseReferenceDialog,
	] = useState(false);
	const [refBookChapter, setRefBookChapter] = useState<any>(
		{}
	);
	const [openMorphologyDialog, setOpenMorphologyDialog] =
		useState(false);
	const [openTipsDialog, setOpenTipsDialog] =
		useState(false);

	useEffect(() => {
		let params = getBookChaptersParams();
		let newRefBookChapter = {
			refBook: params.refBook,
			refChapter: params.refChapter,
			refVerse: params.refVerse,
			refWord: params.refWord,
		};

		if (
			newRefBookChapter.refBook !== undefined &&
			newRefBookChapter.refChapter !== undefined
		) {
			setOpenVerseReferenceDialog(true);
		} else {
			setOpenVerseReferenceDialog(false);
		}

		setRefBookChapter({ ...newRefBookChapter });
	}, [getBookChaptersParams().refBook]);

	useEffect(() => {
		setOpenTipsDialog(true);
	}, [
		getBookChaptersParams().book,
		getBookChaptersParams().chapter,
	]);

	useEffect(() => {
		setOpenTipsDialog(false);
		onVerseReferenceClose();
	}, [greekWords]);

	useEffect(() => {
		let params = getMorphologyParams();

		if (params.morphologyWord !== undefined) {
			setOpenMorphologyDialog(true);
		} else {
			setOpenMorphologyDialog(false);
		}
	}, [getMorphologyParams().morphologyWord]);

	function onMorphologyDialogClose() {
		setOpenMorphologyDialog(false);
		removeMorphologyParams();
	}

	function onVerseReferenceClose() {
		setOpenVerseReferenceDialog(false);
		removeReferenceParams();
	}

	useEffect(() => {
		if (openMorphologyDialog || openVerseReferenceDialog) {
			setOpenTipsDialog(false);
		}
	}, [openMorphologyDialog, openVerseReferenceDialog]);

	return (
		<>
			{openVerseReferenceDialog === false &&
			openMorphologyDialog === false &&
			openTipsDialog === false ? (
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<BannerMessage greekWords={greekWords} />
				</Grid>
			) : (
				""
			)}

			<Box
				display={{
					xs: open ? "block" : "none",
					sm: open ? "block" : "none",
					md: open ? "block" : "none",
					lg: open ? "block" : "none",
					xl: open ? "block" : "none",
				}}
				style={{ padding: "20px 40px 0px 40px" }}
			>
				<Grid container direction="row">
					<Grid item lg={12} xl={12} md={12}>
						{openVerseReferenceDialog === false &&
						openMorphologyDialog === false &&
						openTipsDialog == false ? (
							<>
								<GreekWordsDialogContent
									open={true}
									onClose={onClose}
									greekWords={greekWords}
								/>
							</>
						) : (
							<>
								<VerseReferenceDialogContent
									open={
										openVerseReferenceDialog &&
										!openMorphologyDialog &&
										!openTipsDialog
									}
									onClose={onVerseReferenceClose}
									refBookChapterVerse={refBookChapter}
									fullScreen={false}
								/>

								<MorphologyDialogContent
									open={
										openMorphologyDialog &&
										!openVerseReferenceDialog &&
										!openTipsDialog
									}
									onClose={onMorphologyDialogClose}
									fullScreen={false}
									morphologyWord={
										getMorphologyParams().morphologyWord
									}
								/>
								<TipsDialogContent
									open={openTipsDialog}
									onClose={onClose}
								/>
							</>
						)}
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

export default InformationPanel;
