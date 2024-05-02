import { useState, useEffect } from "react";
import { AlignedVerse } from "../types";
import { SourceTextAccessorFactory } from "src/api/SourceTextAccessor/index";

function useChapterVerseData(
	book: string | undefined,
	chapter: number | string | undefined,
	resourceType: string | undefined,
	resourceLanguage: string | undefined
) {
	const [verses, setVerses] = useState<AlignedVerse[]>([]);
	const sourceTextAccessorFactory = new SourceTextAccessorFactory()

	useEffect(() => {
		const fetchData = async () => {
			if(book && chapter && resourceType && resourceLanguage) {			
				let accessor = sourceTextAccessorFactory.getSourceTextAccessor(resourceType, resourceLanguage);
				let alignedText = await accessor.getSourceText(book, chapter);
				setVerses(alignedText);
			}

			// console.log("test case expected results (mapVerses(data))");
			// console.log(JSON.stringify(mapVerses(data)))
		};

		fetchData();
	}, [book, chapter, resourceType, resourceLanguage]);

	return verses;
}

export default useChapterVerseData;
