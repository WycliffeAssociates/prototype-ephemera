import { useEffect, useState } from "react";
import useBookChapterParams from "./useBookChapterParams";
import useMorphologyParams from "./useMorphologyParams";
import { useSearchParams } from "react-router-dom";


export function useInformationLayout() {

    const { getBookChaptersParams, removeReferenceParams } =
		useBookChapterParams();
	const { getMorphologyParams, removeMorphologyParams } =
		useMorphologyParams();
    const [searchParams] = useSearchParams();

    const [
        openGreekWordsDialog,
        setOpenGreekWordsDialog
    ] = useState(false);

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

    // Opens the verse reference content depending on if query parameters are present
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
    }, [getBookChaptersParams().refBook, getBookChaptersParams().refChapter, getBookChaptersParams().refVerse]);

    // Opens the Tips dialog whenver the user navigates to a new book / chapter
    useEffect(() => {
        setOpenTipsDialog(true);
    }, [
        getBookChaptersParams().book,
        getBookChaptersParams().chapter,
    ]);

    // Opens the morphology content depending on if query parameters are present
    useEffect(() => {
        let params = getMorphologyParams();

        if (params.morphologyWord !== undefined) {
            setOpenMorphologyDialog(true);
        } else {
            setOpenMorphologyDialog(false);
        }
    }, [getMorphologyParams().morphologyWord]);

    // useEffect(() => {

    // })


    function onMorphologyDialogClose() {
        setOpenMorphologyDialog(false);
        removeMorphologyParams();
    }

    function onVerseReferenceClose() {
        setOpenVerseReferenceDialog(false);
        removeReferenceParams();
    }

    useEffect(() => {
        if (openMorphologyDialog || openVerseReferenceDialog || openGreekWordsDialog) {
            setOpenTipsDialog(false);
        }
    }, [openMorphologyDialog, openVerseReferenceDialog, openGreekWordsDialog]);

    useEffect(() => {

        let paramsUsed = Array.from(searchParams.keys());

        let onlyBookChapterParams = (paramsUsed.length === 2 && searchParams.get("book") && searchParams.get("chapter"));
        let mostRecentParamAdded = paramsUsed[paramsUsed.length - 1];

        if(onlyBookChapterParams) {
            setOpenGreekWordsDialog(false);
            setOpenMorphologyDialog(false);
            setOpenVerseReferenceDialog(false);
            setOpenTipsDialog(true);
        } else if(mostRecentParamAdded === "refWord") {
            setOpenGreekWordsDialog(false);
            setOpenMorphologyDialog(false);
            setOpenVerseReferenceDialog(true);
            setOpenTipsDialog(false);
        } else if(mostRecentParamAdded === "morphologyWord") {
            setOpenGreekWordsDialog(false);
            setOpenMorphologyDialog(true);
            setOpenVerseReferenceDialog(false);
            setOpenTipsDialog(false);
        } else if(mostRecentParamAdded === "greekWordsVerseNumber") {
            if(searchParams.get("showGreekWords") === "true") {
                setOpenGreekWordsDialog(true);
                setOpenMorphologyDialog(false);
                setOpenVerseReferenceDialog(false);
                setOpenTipsDialog(false);
            }
            

        } else {
            // TODO: figure out what to do if query parameter is not recognized
        }

    }, [searchParams])

    return {
        openMorphologyDialog: openMorphologyDialog,
        openVerseReferenceDialog: openVerseReferenceDialog,
        openTipsDialog: openTipsDialog,
        openGreekWordsDialog: openGreekWordsDialog,
        onMorphologyDialogClose: onMorphologyDialogClose,
        onVerseReferenceClose: onVerseReferenceClose,
    }
}