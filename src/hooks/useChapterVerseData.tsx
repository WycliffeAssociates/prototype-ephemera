import { useState, useEffect } from "react";
import { AlignedVerse } from "../types";
import { OsisEnUlbAccessor } from "src/api/SourceTextAccessor";

const accessor = new OsisEnUlbAccessor("ulb", "en");
// const usfmAccessor = new Door43USFMAccessor("ust", "ru");
// const usfmAccessor = new Door43USFMAccessor("glt", "hi");



function useChapterVerseData(
	book: string | undefined,
	chapter: number | string | undefined
) {
	const [verses, setVerses] = useState<AlignedVerse[]>(
		[]
	);

	useEffect(() => {
		const fetchData = async () => {

			if(book && chapter) {
				let alignedSourceText = await accessor.getSourceText(book, chapter);

				// let usfmAllignedSourceText = await usfmAccessor.getSourceText(book, chapter)
				setVerses(alignedSourceText);
			}

			// console.log("test case expected results (mapVerses(data))");
			// console.log(JSON.stringify(mapVerses(data)))
		};

		fetchData();
	}, [book, chapter]);

	return verses;
}

export default useChapterVerseData;
