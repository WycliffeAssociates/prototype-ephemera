import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TipsDialogContent from "./TipsDialogContent";
import MorphologyDialogContent from "./MorphologyDialogContent";
import VerseReferenceDialogContent from "./VerseReferenceDialogContent";
import { useBookChapterParams } from "../../hooks/useBookChapterParams";
import { useState, useEffect } from "react";
import useMorphologyParams from "../../hooks/useMorphologyParams";
import BannerMessage from "./GreekWordsDialogContent/utils/BannerMessage";
import GreekWordsDialogContent from "./GreekWordsDialogContent";
import { useInformationLayout } from "../../hooks/useInformationLayout";
import { AlignedText } from "src/types";

interface GreekWordsDialogProps {
	open: Boolean;
	onClose?: () => void;
	alignedText: AlignedText;
}

function InformationPanel({
	open,
	onClose,
	alignedText,
}: GreekWordsDialogProps) {
	
	const { 
		openMorphologyDialog, 
		openGreekWordsDialog, 
		openTipsDialog, 
		openVerseReferenceDialog, 
		onVerseReferenceClose, 
		onMorphologyDialogClose  
	} = useInformationLayout();

	const { refBook, refChapter, refVerse, refWord } = useBookChapterParams().getBookChaptersParams();
	const [refBookChapter, setRefBookChapter] = useState<any>(
		{}
	);
	
	const { getMorphologyParams } =
		useMorphologyParams();


	useEffect(() => {
		if (
			refBook !== undefined &&
			refChapter !== undefined
		) {
			let newRefBookChapter = {
				refBook: refBook,
				refChapter: refChapter,
				refVerse: refVerse,
				refWord: refWord
			}
			setRefBookChapter({ ...newRefBookChapter });
		}

	}, [refBook, refChapter, refVerse, refWord]);


	return (
		<>
			{openGreekWordsDialog ? (
				<Grid item xs={12}>
					<BannerMessage alignedText={alignedText} />
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
						{openTipsDialog ? 
							<TipsDialogContent open={openTipsDialog} onClose={onClose}/>
						: <></>}

						{openVerseReferenceDialog ? 
							<VerseReferenceDialogContent
								open={
									openVerseReferenceDialog
								}
								onClose={onVerseReferenceClose}
								refBookChapterVerse={refBookChapter}
								fullScreen={false}
							/>
						: <></>}

						{openGreekWordsDialog ? 
							<GreekWordsDialogContent
								open={true}
								onClose={onClose}
								alignedText={alignedText}
							/>
						: <></>}

						{openMorphologyDialog ? 
							<MorphologyDialogContent
							open={
								openMorphologyDialog
							}
							onClose={onMorphologyDialogClose}
							fullScreen={false}
							morphologyWord={
								getMorphologyParams().morphologyWord
							}
						/>
						: <></>}
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

export default InformationPanel;
