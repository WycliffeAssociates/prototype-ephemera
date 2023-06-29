import { GWTInformation } from "../../types";
import { books as newTestamentBooks } from "../data/newTestamentMetadata";

// TODO: fix this blob using regex
// header: # *\S*
// Main/sub description:  {0,4}\* *[\w| |[[:punct:]]+
// sub descriptions are indented by four spaces.
// verse references: [A-Za-z]+ \d+:\d+
// Advice for translators: [A|a]dvice for [T|t]ranslators +[\w| |[[:punct:]]+
// Everything that is not a description, verse reference, or advice for translators: ^(?!#)^(?!\*)^(?!\n)^(?![S | s]ee)^(?![A|a]dvice for [T|t]ranslators)[\S* | |[[:punct:]]*

function mapGWTMarkdown(greekWordMarkDown: string) {
	let greekWordMarkDownArray: string[] =
		greekWordMarkDown.split(/\n/) as string[];

	let startingIndex;
	for (
		startingIndex = 0;
		greekWordMarkDownArray[startingIndex] === "";
		startingIndex++
	);

	let gwtInformation: GWTInformation = {
		descriptions: [],
		morphology: "",
		gwtGreekWord:
			greekWordMarkDownArray[startingIndex].substr(1),
		unprocessed: "",
	};

	let gwtWords: GWTInformation[] = [];
	let foundDescription = false;
	let processedDescriptions = false;

	for (
		let i = startingIndex + 1;
		i < greekWordMarkDownArray.length;
		i++
	) {
		if (
			greekWordMarkDownArray[i] == "\n" ||
			greekWordMarkDownArray[i] === ""
		) {
			continue;
		}

		if (
			greekWordMarkDownArray[i].charAt(0) == "*" &&
			greekWordMarkDownArray[i].charAt(1) == "*"
		) {
			processedDescriptions = true;
			gwtInformation.adviceForTranslators =
				greekWordMarkDownArray[i];
		} else if (
			greekWordMarkDownArray[i].search("See:") !== -1
		) {
			processedDescriptions = true;

			if (
				greekWordMarkDownArray[i].match(/\d+:\d+/) != null
			) {
				// see if any verse references are present
				let validVerseReferences: string[] = [];
				let references: any[] | null =
					greekWordMarkDownArray[i].split(";");
				let previousBook: string;
				if (references != null) {
					references[0] = references[0].replace(
						/See:\W*/g,
						""
					);

					references.forEach((reference) => {
						let book = reference.match(
							/((\d +){0,1}[A-Za-z]+)/
						);
						let chapterVerses = reference.match(
							/(\d+:\d+(,\W*\d+)*)/
						);

						book = book === null ? previousBook : book[0];
						previousBook = book;

						if (
							chapterVerses !== null &&
							chapterVerses[2] === undefined
						) {
							// there are not additional verses to process
							validVerseReferences.push(
								`${book} ${chapterVerses[1]}`
							);
						} else {
							// there are additional verses to process
							chapterVerses = chapterVerses[0].replace(
								/,\W*/,
								";"
							);
							chapterVerses = chapterVerses.split(":");
							let chapter = chapterVerses[0];
							let verses = chapterVerses[1].split(";");

							verses.forEach((verse: string) => {
								validVerseReferences.push(
									`${book} ${chapter}:${verse}`
								);
							});
						}
					});
				}
				gwtInformation.verseReferences =
					validVerseReferences;
			}
		} else if (
			greekWordMarkDownArray[i].charAt(0) == "*" &&
			!processedDescriptions
		) {
			greekWordMarkDownArray[i] = greekWordMarkDownArray[
				i
			].replace("*", "");
			foundDescription = true;
			gwtInformation.descriptions.push({
				mainDescription: greekWordMarkDownArray[
					i
				] as string,
				subDescriptions: [],
			});
		} else if (
			greekWordMarkDownArray[i].search("    *") !== -1 &&
			!processedDescriptions
		) {
			greekWordMarkDownArray[i] = greekWordMarkDownArray[
				i
			].replace("*", "");
			gwtInformation.descriptions[
				gwtInformation.descriptions.length - 1
			].subDescriptions?.push(greekWordMarkDownArray[i]);
		} else if (!foundDescription) {
			gwtInformation.morphology =
				gwtInformation.morphology +
				"\n" +
				greekWordMarkDownArray[i];
		} else if (greekWordMarkDownArray[i].charAt(0) == "#") {
			gwtWords.push(gwtInformation);
			gwtInformation = {
				descriptions: [],
				morphology: "",
				gwtGreekWord:
					greekWordMarkDownArray[startingIndex].substr(1),
				unprocessed: "",
			};
			foundDescription = false;
			processedDescriptions = false;
		} else {
			if (foundDescription) {
				processedDescriptions = true;
				gwtInformation.unprocessed =
					gwtInformation.unprocessed +
					"\n" +
					greekWordMarkDownArray[i];
			}
		}
	}
	gwtWords.push(gwtInformation);
	return gwtWords;
}

export default mapGWTMarkdown;
