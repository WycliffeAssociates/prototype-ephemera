import { useState, useEffect } from "react";
import { NewFormattedVerse } from "../types";
import getChapterVerses from "../api";
import mapVerses from "../applicationLogic/mapping/mapTagsToFormattedVerse";

function useChapterVerseData(
	book: string | undefined,
	chapter: number
) {
	const [verses, setVerses] = useState<NewFormattedVerse[]>(
		[]
	);

	useEffect(() => {
		const fetchData = async () => {
			if(book) {
				const data = await getChapterVerses(book, chapter);
				setVerses(mapVerses(data));
			}

			// console.log("test case expected results (mapVerses(data))");
			// console.log(JSON.stringify(mapVerses(data)))
		};

		fetchData();
	}, [book, chapter]);

	return verses;
}

export default useChapterVerseData;
