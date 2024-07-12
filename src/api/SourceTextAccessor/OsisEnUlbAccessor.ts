import { books } from "src/applicationLogic/data/newTestamentMetadata";
import mapVerses, {
	VerseTagContentType,
} from "src/applicationLogic/mapping/mapTagsToFormattedVerse";
import type { AlignedText, AlignedVerse, GreekAlignmentData } from "src/types";
import type {
	SourceTextAccessor,
	SourceTextFetcher,
	SourceTextResource,
} from ".";

const VITE_APP_GET_BOOKS_FROM_REPO = import.meta.env
	.VITE_APP_GET_BOOKS_FROM_REPO;

export class OsisEnUlbAccessor
	implements SourceTextAccessor, SourceTextFetcher
{
	sourceTextResource: SourceTextResource;

	constructor(resourceType: string, resourceLanguage: string) {
		if (
			resourceType.toLowerCase() !== "ulb" ||
			resourceLanguage.toLowerCase() !== "en"
		) {
			throw new Error(
				`Resource type ${resourceType} and language ${resourceLanguage} is not available in OSIS`,
			);
		}

		this.sourceTextResource = {
			resourceType: "ulb",
			resourceLanguage: "en",
			resourceBaseURL: "taggedOSIS/",
		};
	}

	setSourceTextResource(resourceType: string, resourceLanguage: string): void {
		if (
			resourceType.toLowerCase() !== "ulb" ||
			resourceLanguage.toLowerCase() !== "en"
		) {
			throw new Error(
				`Resource type ${resourceType} and language ${resourceLanguage} is not available in OSIS`,
			);
		}

		this.sourceTextResource = {
			resourceLanguage: resourceLanguage,
			resourceType: resourceType,
			resourceBaseURL: "taggedOSIS/",
		};
	}

	async getSourceText(
		bookName: string,
		chapter: number | string,
	): Promise<AlignedVerse[]> {
		let result: AlignedVerse[];
		const sourceText = await this.fetchSourceText(bookName);

		if (!sourceText) return [];

		if (typeof chapter === "string") {
			result = this.parseSourceText(sourceText, Number.parseInt(chapter));
		} else {
			result = this.parseSourceText(sourceText, chapter);
		}
		return result;
	}

	async fetchSourceText(bookName: string): Promise<string | undefined> {
		try {
			let book: any;
			if (VITE_APP_GET_BOOKS_FROM_REPO === "true") {
				book = await fetch(
					`http://localhost:8080/?book=${books[bookName].abbreviatedBook}&chapter=1`,
				);
				return book.text();
			}
			book = await fetch(
				`${this.sourceTextResource.resourceBaseURL}${books[bookName].abbreviatedBook}.json`,
			);
			return book.text();
		} catch (error) {
			console.log(error);
			return undefined;
		}
	}

	parseSourceText(sourceText: string, chapter: number): AlignedVerse[] {
		const chapterJson = this.getChapterJson(sourceText, chapter);

		const result = mapVerses(chapterJson, VerseTagContentType.OSIS);

		const alignedVerses: AlignedVerse[] = [];

		result.forEach((osisIshVerses: any, idx: number) => {
			const verseWords = osisIshVerses.verseWords;

			const alignedVerseWords: AlignedText[] = [];
			const verseNum = idx;

			if (verseWords) {
				verseWords.forEach((verseWord: any) => {
					const text = verseWord.englishWords;
					const greekAlignmentData: GreekAlignmentData[] = [];

					if (verseWord.greekWords) {
						this.mapGreekWords(verseWord.greekWords).forEach((gw) =>
							greekAlignmentData.push(gw),
						);
					}

					if (verseWord.subWords) {
						this.mapGreekWords(verseWord.subWords).forEach((gw) =>
							greekAlignmentData.push(gw),
						);
					}

					if (verseWord.phraseWords) {
						this.mapGreekWords(verseWord.phraseWords).forEach((gw) =>
							greekAlignmentData.push(gw),
						);
					}

					let alignedText: AlignedText;
					if (greekAlignmentData.length === 0) {
						alignedText = { text: text };
					} else {
						alignedText = {
							text: text,
							greekAlignmentData: greekAlignmentData,
						};
					}

					alignedVerseWords.push(alignedText);
				});
			}

			const alignedVerse: AlignedVerse = {
				alignedVerseText: alignedVerseWords,
				verseNum: verseNum + 1,
			};
			alignedVerses.push(alignedVerse);
		});

		return alignedVerses;
	}

	private getChapterJson(sourceText: any, chapter: number) {
		let bookJSON = JSON.parse(sourceText);
		if (bookJSON === undefined) {
			return [];
		}

		bookJSON = bookJSON.xml.book;

		let targetContent: any;
		if (bookJSON?.chapter && Array.isArray(bookJSON.chapter) === false) {
			targetContent = bookJSON.chapter.verse;
		} else {
			targetContent = bookJSON.chapter[chapter - 1].verse;
		}

		return targetContent;
	}

	private mapGreekWords(greekWords: any[]): GreekAlignmentData[] {
		const greekAlignmentData: GreekAlignmentData[] = [];
		greekWords.forEach((gw: any) => {
			let strongs: string | undefined;
			let morph: string | undefined;

			let greekWordData: GreekAlignmentData;

			if (gw?.strongs) {
				strongs = gw.strongs;
			}

			if (gw?.morph) {
				morph = gw.morph;
			}

			if (gw?.word?.strongs) {
				strongs = gw.word?.strongs;
			}

			if (gw?.word?.morph) {
				morph = gw.word.morph;
			}

			if (strongs) {
				greekWordData = { strong: strongs, morph: morph };
				greekAlignmentData.push(greekWordData);
			}
		});
		return greekAlignmentData;
	}
}
