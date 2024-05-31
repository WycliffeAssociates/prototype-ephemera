import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useBookChapterParams from "./useBookChapterParams";
import useMorphologyParams from "./useMorphologyParams";

export function useInformationLayout() {
	const {
		removeReferenceParams,
		refBook,
		refChapter,
		refVerse,
		book,
		chapter,
	} = useBookChapterParams();
	const { morphologyWord, removeMorphologyParams } = useMorphologyParams();
	const [searchParams] = useSearchParams();

	const [openGreekWordsDialog, setOpenGreekWordsDialog] = useState(false);

	const [openVerseReferenceDialog, setOpenVerseReferenceDialog] =
		useState(false);

	const [openMorphologyDialog, setOpenMorphologyDialog] = useState(false);
	const [openTipsDialog, setOpenTipsDialog] = useState(false);

	// Opens the verse reference content depending on if query parameters are present
	useEffect(() => {
		if (refBook && refChapter && refVerse) {
			setOpenVerseReferenceDialog(true);
		} else {
			setOpenVerseReferenceDialog(false);
		}
	}, [refBook, refChapter, refVerse]);

	// Opens the Tips dialog whenver the user navigates to a new book / chapter
	useEffect(() => {
		if (book && chapter) {
			setOpenTipsDialog(true);
		}
	}, [book, chapter]);

	// Opens the morphology content depending on if query parameters are present
	useEffect(() => {
		if (morphologyWord !== undefined) {
			setOpenMorphologyDialog(true);
		} else {
			setOpenMorphologyDialog(false);
		}
	}, [morphologyWord]);

	function onMorphologyDialogClose() {
		setOpenMorphologyDialog(false);
		removeMorphologyParams();
	}

	function onVerseReferenceClose() {
		setOpenVerseReferenceDialog(false);
		removeReferenceParams();
	}

	useEffect(() => {
		if (
			openMorphologyDialog ||
			openVerseReferenceDialog ||
			openGreekWordsDialog
		) {
			setOpenTipsDialog(false);
		}
	}, [openMorphologyDialog, openVerseReferenceDialog, openGreekWordsDialog]);

	useEffect(() => {
		const paramsUsed = Array.from(searchParams.keys());

		const onlyBookChapterParams =
			paramsUsed.length === 2 &&
			searchParams.get("book") &&
			searchParams.get("chapter");
		const mostRecentParamAdded = paramsUsed[paramsUsed.length - 1];

		if (onlyBookChapterParams) {
			setOpenGreekWordsDialog(false);
			setOpenMorphologyDialog(false);
			setOpenVerseReferenceDialog(false);
			setOpenTipsDialog(true);
		} else if (mostRecentParamAdded === "refWord") {
			setOpenGreekWordsDialog(false);
			setOpenMorphologyDialog(false);
			setOpenVerseReferenceDialog(true);
			setOpenTipsDialog(false);
		} else if (mostRecentParamAdded === "morphologyWord") {
			setOpenGreekWordsDialog(false);
			setOpenMorphologyDialog(true);
			setOpenVerseReferenceDialog(false);
			setOpenTipsDialog(false);
		} else if (mostRecentParamAdded === "greekWordsVerseNumber") {
			if (searchParams.get("showGreekWords") === "true") {
				setOpenGreekWordsDialog(true);
				setOpenMorphologyDialog(false);
				setOpenVerseReferenceDialog(false);
				setOpenTipsDialog(false);
			}
		} else {
			// TODO: figure out what to do if query parameter is not recognized
		}
	}, [searchParams]);

	return {
		openMorphologyDialog: openMorphologyDialog,
		openVerseReferenceDialog: openVerseReferenceDialog,
		openTipsDialog: openTipsDialog,
		openGreekWordsDialog: openGreekWordsDialog,
		onMorphologyDialogClose: onMorphologyDialogClose,
		onVerseReferenceClose: onVerseReferenceClose,
	};
}
