import { Proskomma } from "proskomma";
import { books } from "src/applicationLogic/data/newTestamentMetadata";
import type { AlignedText, AlignedVerse, GreekAlignmentData } from "src/types";
import type {
	SourceTextAccessor,
	SourceTextFetcher,
	SourceTextResource,
} from ".";

export class Door43UsfmAccessor
	implements SourceTextAccessor, SourceTextFetcher
{
	sourceTextResource: SourceTextResource;
	pk = new Proskomma();

	constructor(resourceType: string, resourceLanguage: string) {
		this.sourceTextResource = {
			resourceType: resourceType.toLowerCase(),
			resourceLanguage: resourceLanguage.toLowerCase(),
			resourceBaseURL: `https://git.door43.org/Door43-Catalog/${resourceLanguage}_${resourceType}/raw/branch/master/`,
		};
	}

	setSourceTextResource(resourceType: string, resourceLanguage: string): void {
		this.sourceTextResource = {
			resourceLanguage: resourceType,
			resourceType: resourceLanguage,
			resourceBaseURL: `https://git.door43.org/Door43-Catalog/${resourceLanguage}_${resourceType}/raw/branch/master/`,
		};
	}

	async getSourceText(
		bookName: string,
		chapter: number | string,
	): Promise<AlignedVerse[]> {
		const sourceText = await this.fetchSourceText(bookName);
		const chapterNum =
			typeof chapter === "number" ? chapter : Number.parseInt(chapter);

		let alignedVerses: AlignedVerse[] = [];
		if (sourceText) {
			this.setUpProskomma(sourceText);
			const dataQuery = this.getDataQuery(chapter);
			const usfmData = JSON.stringify(await this.getUSFMData(dataQuery));
			alignedVerses = this.parseSourceText(usfmData, chapterNum);
		}

		return alignedVerses;
	}

	async fetchSourceText(bookName: string): Promise<string | undefined> {
		try {
			const book = await fetch(
				`${this.sourceTextResource.resourceBaseURL}${books[bookName].abbreviatedBook}.usfm`,
			);
			return book.text();
		} catch (error) {
			return undefined;
		}
	}

	private async setUpProskomma(bookContent: string) {
		const mutation = `mutation { addDocument(selectors: [{key: "lang", value: "eng"}, {key: "abbr", value: "${this.sourceTextResource.resourceType}"}], contentType: "usfm", content: """${bookContent}""") }`;

		await this.pk.gqlQuery(mutation);
	}

	private getDataQuery(chapter: string | number) {
		return `{
            documents {
                id
                cv(chapter: "${chapter}") {
                    items {
                        subType
                        payload
                    }
                }
            }
        }`;
	}

	private async getUSFMData(dataQuery: string) {
		const result = await this.pk.gqlQuery(dataQuery);
		const cvData = result?.data?.documents[0]?.cv[0]?.items.filter(
			(item: any) =>
				item.payload === "milestone/zaln" ||
				item.subType === "wordLike" ||
				(item.payload.includes("x-strong") && item.subType === "start") ||
				item.payload.includes("verse/"),
		);
		return cvData;
	}

	parseSourceText(sourceText: string, chapter: number): AlignedVerse[] {
		const alignedVerses: AlignedVerse[] = [];
		let alignedText: AlignedText[] = [];
		let alignStartCount = 0;
		let text = "";
		let greekAlignmentData: GreekAlignmentData[] = [];
		let verseNum = 1;

		const cvData = JSON.parse(sourceText);

		for (let i = 0; i < cvData.length; i++) {
			const attribute = cvData[i];

			if (
				attribute.subType === "start" &&
				attribute.payload === "milestone/zaln"
			) {
				alignStartCount++;
			} else if (
				attribute.subType === "end" &&
				attribute.payload === "milestone/zaln"
			) {
				alignStartCount--;
			} else if (attribute.subType === "wordLike") {
				const startingChar = text === "" ? "" : " ";
				text += startingChar + attribute.payload;
			} else if (
				attribute.subType === "start" &&
				attribute.payload.includes("x-strong")
			) {
				const strong = this.getStrongs(attribute.payload);
				if (strong) {
					greekAlignmentData.push({ strong: strong });
				}
			} else if (
				attribute.subType === "end" &&
				attribute.payload.includes("verse/")
			) {
				alignedVerses.push({
					verseNum: verseNum,
					alignedVerseText: alignedText,
				});
				verseNum++;
				alignedText = [];
			}

			if (alignStartCount === 0 && text !== "") {
				// Push alignment text
				if (greekAlignmentData.length > 0) {
					alignedText.push({
						text: text,
						greekAlignmentData: greekAlignmentData,
					});
				} else {
					alignedText.push({ text: text });
				}

				// reset buffers
				text = "";
				greekAlignmentData = [];
			}
		}
		return alignedVerses;
	}

	private getStrongs(str: string) {
		// Matches on strongs numbers in the form of "gX" or "GX" where X is a number with 1 or more digits
		// like: "g2200", "G111", and "g5" 
		const regex = /\b[Gg]\d+\b/;
		const match = str.match(regex);

		// Removes trailing 0 if it present. 
		if (match) {
			const extracted = match[0];
			if (
				extracted.length > 4 &&
				extracted.charAt(extracted.length - 1) === "0"
			) {
				return extracted.substring(0, extracted.length - 1);
			}
			return undefined;
		}
	}
}
