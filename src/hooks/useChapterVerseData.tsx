import { useEffect, useState } from "react";
import { SourceTextAccessorFactory } from "src/api/SourceTextAccessor/index";
import type { AlignedVerse } from "../types";

const sourceTextAccessorFactory = new SourceTextAccessorFactory();

function useChapterVerseData(
	book: string | undefined,
	chapter: number | string | undefined,
	resourceType: string | undefined,
	resourceLanguage: string | undefined,
) {
	const [verses, setVerses] = useState<AlignedVerse[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			if (book && chapter && resourceType && resourceLanguage) {
				const accessor = sourceTextAccessorFactory.getSourceTextAccessor(
					resourceType,
					resourceLanguage,
				);
				const alignedText = await accessor.getSourceText(book, chapter);
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
