import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import type { AlignedText } from "src/types";
import { useBookChapterParams } from "../../hooks/useBookChapterParams";
import { useInformationLayout } from "../../hooks/useInformationLayout";
import useMorphologyParams from "../../hooks/useMorphologyParams";
import GreekWordsDialogContent from "./GreekWordsDialogContent";
import BannerMessage from "./GreekWordsDialogContent/utils/BannerMessage";
import MorphologyDialogContent from "./MorphologyDialogContent";
import TipsDialogContent from "./TipsDialogContent";
import VerseReferenceDialogContent from "./VerseReferenceDialogContent";

interface GreekWordsDialogProps {
	open: boolean;
	onClose?: () => void;
	alignedText?: AlignedText;
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
		onMorphologyDialogClose,
	} = useInformationLayout();

	const { refBook, refChapter, refVerse, refWord } =
		useBookChapterParams().getBookChaptersParams();

	const { getMorphologyParams } = useMorphologyParams();

	return (
		<>
			{openGreekWordsDialog && alignedText ? (
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
						{openTipsDialog ? (
							<TipsDialogContent open={openTipsDialog} onClose={onClose} />
						) : (
							<></>
						)}

						{openVerseReferenceDialog ? (
							<VerseReferenceDialogContent
								open={openVerseReferenceDialog}
								onClose={onVerseReferenceClose}
								fullScreen={false}
							/>
						) : (
							<></>
						)}

						{openGreekWordsDialog && alignedText ? (
							<GreekWordsDialogContent
								open={true}
								onClose={onClose}
								alignedText={alignedText}
							/>
						) : (
							<></>
						)}

						{openMorphologyDialog ? (
							<MorphologyDialogContent
								open={openMorphologyDialog}
								onClose={onMorphologyDialogClose}
								fullScreen={false}
								morphologyWord={getMorphologyParams().morphologyWord}
							/>
						) : (
							<></>
						)}
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

export default InformationPanel;
