import { XMLBuilder, XMLParser } from "fast-xml-parser";
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

export class WacsXmlAccessor implements SourceTextAccessor, SourceTextFetcher {
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
			resourceType: resourceType.toLowerCase(),
			resourceLanguage: resourceLanguage.toLowerCase(),
			resourceBaseURL:
				"https://content.bibletranslationtools.org/WycliffeAssociates/en_ulb_tagged/raw/branch/master/Checked/",
		};
	}

	setSourceTextResource(resourceType: string, resourceLanguage: string): void {
		if (
			resourceType.toLowerCase() !== "ulb" ||
			resourceLanguage.toLowerCase() !== "en"
		) {
			throw new Error(
				`Resource type ${resourceType} and language ${resourceLanguage} is not available in WACS`,
			);
		}

		this.sourceTextResource = {
			resourceLanguage: resourceType,
			resourceType: resourceLanguage,
			resourceBaseURL:
				"https://content.bibletranslationtools.org/WycliffeAssociates/en_ulb_tagged/raw/branch/master/Checked/",
		};
	}

	async getSourceText(
		bookName: string,
		chapter: string | number,
	): Promise<AlignedVerse[]> {
		const sourceText = await this.fetchSourceText(bookName);

		if (sourceText) {
			const chapterNum =
				typeof chapter === "number" ? chapter : Number.parseInt(chapter);

			const strJson = await this.mapTagsToJSON(sourceText, chapterNum);
			if (strJson) {
				return this.parseSourceText(strJson, chapterNum);
			}
		}

		return [];
	}

	async fetchSourceText(bookName: string): Promise<string | undefined> {
		try {
			let book: any;
			book = await fetch(
				`${this.sourceTextResource.resourceBaseURL}${books[bookName].abbreviatedBook}.xml`,
			);
			return book.text();
		} catch (error) {
			return undefined;
		}
	}

	parseSourceText(sourceText: string, chapter: number): AlignedVerse[] {
		const chapterJson = this.getChapterJson(sourceText, chapter);

		const result = mapVerses(chapterJson, VerseTagContentType.XML);

		const alignedVerses: AlignedVerse[] = [];

		result.forEach((osisIshVerses: any, idx: number) => {
			const verseWords = osisIshVerses.verseWords;

			const alignedVerseWords: AlignedText[] = [];
			const verseNum = idx;

			if (verseWords) {
				for (const verseWord of verseWords) {
					const text = verseWord.englishWords;
					const greekAlignmentData: GreekAlignmentData[] = [];

					if (verseWord.greekWords) {
						for (const gw of this.mapGreekWords(verseWord.greekWords)) {
							greekAlignmentData.push(gw);
						}
					}

					if (verseWord.subWords) {
						for (const gw of this.mapGreekWords(verseWord.subWords)) {
							greekAlignmentData.push(gw);
						}
					}

					if (verseWord.phraseWords) {
						for (const gw of this.mapGreekWords(verseWord.phraseWords)) {
							greekAlignmentData.push(gw);
						}
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
				}
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

	private async mapTagsToJSON(taggedULBBook: string, chapter: number) {
		const newXML = await this.buildXmlWithFlatPhraseWords(
			taggedULBBook,
			chapter,
		);

		const orderedParserOptions = {
			ignoreAttributes: false,
			attributesGroupName: "ATTR",
			attributeNamePrefix: "",
			textNodeName: "_text",
		};
		const orderedParser = new XMLParser(orderedParserOptions);

		// traverses through the JSON representing the ordered XML and removes the phrase tages.
		const orderedXML = await orderedParser.parse(newXML);

		let response = undefined;

		response = await JSON.stringify(orderedXML);
		return response;
	}

	private async buildXmlWithFlatPhraseWords(xml: any, chapter: number) {
		const orderedParserOptions = {
			commentPropName: "#comment",
			ignoreAttributes: false,
			preserveOrder: true,
			parseTagValue: false,
			trimValues: true,
			attributeNamePrefix: "",
		};
		const orderedParser = new XMLParser(orderedParserOptions);

		// traverses through the JSON representing the ordered XML and removes the phrase tages.
		let orderedXML = await orderedParser.parse(xml);
		orderedXML = await this.flatMapPhraseWords(orderedXML, chapter);

		// rebuilds the xml from the newly modified JSON object.
		const builder = new XMLBuilder(orderedParserOptions);
		const xmlOutput = await builder.build(orderedXML);

		return xmlOutput;
	}

	private async flatMapPhraseWords(orderedXML: any, chapter: number) {
		const currentBookChapter = orderedXML[1].xml[0].book[chapter - 1].chapter;

		for (let i = 0; i < currentBookChapter.length; i++) {
			const curChapterVerse = currentBookChapter[i];

			for (let k = 0; k < curChapterVerse.verse.length; k++) {
				const curVerseWord = curChapterVerse.verse[k];
				const wordBuffer = [];

				// if the current verse child tag is a phrase, then we extract the phrase words.
				if (curVerseWord.phrase) {
					// Gets the actual phrase
					const phrase =
						curVerseWord.phrase[curVerseWord.phrase.length - 1].phraseWords[0][
							"#text"
						];

					// gets phrase words and places them into a buffer
					for (let l = 0; l < curVerseWord.phrase.length; l++) {
						if (curVerseWord.phrase[l].w) {
							const curVerseWordAttributes = curVerseWord[":@"];

							if (curVerseWordAttributes && curVerseWordAttributes.sub) {
								const tempW = curVerseWord.phrase[l];
								const tempWAttributes = tempW[":@"];

								tempWAttributes["subPhraseWords"] = phrase;
								tempWAttributes["sub"] = curVerseWordAttributes.sub;
								wordBuffer.push(tempW);
							} else {
								const tempW = curVerseWord.phrase[l];
								const tempWAttributes = tempW[":@"];
								tempWAttributes["phraseWords"] = phrase;
								wordBuffer.push(tempW);
							}
						}
					}

					// takes words in buffer and inserts them outside of the phrase tag and in-line with the rest of the words.
					curChapterVerse.verse.splice(k, 1, wordBuffer[0]);
					for (let h = 1; h < wordBuffer.length; h++) {
						curChapterVerse.verse.splice(k + h, 0, wordBuffer[h]);
					}
					k--;
					continue;
				}
			}
		}

		return orderedXML;
	}
}
