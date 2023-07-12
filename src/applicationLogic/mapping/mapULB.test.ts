import getChapterVerses from "../../api";
import mapVerses from "./mapTagsToFormattedVerse";
import * as Matthew from "../../../public/taggedOSIS/41-MAT.json";
import * as Mark from "../../../public/taggedOSIS/42-MRK.json";
import * as First_timothy from "../../../public/taggedOSIS/55-1TI.json";
import * as Philemon from "../../../public/taggedOSIS/58-PHM.json";
import * as Acts from "../../../public/taggedOSIS/45-ACT.json";
import { VerseTag } from "../../types";
import _ from "lodash";

// book = await axios.get(`taggedOSIS/${books[bookTitle].abbreviatedBook}.json`);

describe("Mark 9:1", function () {
	it("Should match with verse 1", async function () {
		let verses = mapVerses(
			Mark.xml.book.chapter[8].verse as VerseTag[]
		);
		const diff = difference(
			verses[1],
			expectedResults[0][0]
		);

		if (diff.length > 0) {
			console.error(diff);
		}

		// TODO: add method here to specify which differences to ignore.

		expect(
			_.isEqual(verses[1], expectedResults[0][0])
		).toBe(true);
	});
});

describe("1 Timothy 6:1 (starts with multiple sub words and ends with one sub word)", function () {
	it("Should match with verse 1", async function () {
		let verses = mapVerses(
			First_timothy.xml.book.chapter[5].verse as VerseTag[]
		);
		const diff = difference(
			verses[0],
			expectedResults[2][0]
		);

		if (diff.length > 0) {
			console.error(diff);
		}

		// TODO: add method here to specify which differences to ignore.

		expect(
			_.isEqual(verses[0], expectedResults[2][0])
		).toBe(true);
	});
});

describe("Matthew 10:42", function () {
	it("Starts with phrase word, directly followed by unbroken series of sub words, contains a sub word that is also a phrase word", async function () {
		let verses = mapVerses(
			Matthew.xml.book.chapter[9].verse as VerseTag[]
		);
		const diff = difference(
			verses[41],
			expectedResults[3][0]
		);

		if (diff.length > 0) {
			console.error(diff);
		}

		// TODO: add method here to specify which differences to ignore.

		expect(
			_.isEqual(verses[41], expectedResults[3][0])
		).toBe(true);
	});
});

describe("Philemon 1", function () {
	it("Should match full chapter", async function () {
		let verses = mapVerses(
			Philemon.xml.book.chapter.verse as VerseTag[]
		);
		const diff = difference(verses, expectedResults[4]);

		if (diff.length > 0) {
			console.error(diff);
		}

		// TODO: add method here to specify which differences to ignore.

		expect(_.isEqual(verses, expectedResults[4])).toBe(
			true
		);
	});
});

describe("1 Timothy 6:7", function () {
	it("Checks subphrase word", async function () {
		let verses = mapVerses(
			First_timothy.xml.book.chapter[5].verse as VerseTag[]
		);
		const diff = difference(
			verses[6],
			expectedResults[5][0]
		);

		if (diff.length > 0) {
			console.error(diff);
		}

		// TODO: add method here to specify which differences to ignore.

		expect(
			_.isEqual(verses[6], expectedResults[5][0])
		).toBe(true);
	});
});

describe("1 Timothy 1:18", function () {
	it("Checks subphrase word interrupted by root", async function () {
		let verses = mapVerses(
			First_timothy.xml.book.chapter[0].verse as VerseTag[]
		);
		const diff = difference(
			verses[17],
			expectedResults[6][0]
		);

		if (diff.length > 0) {
			console.error(diff);
		}

		// TODO: add method here to specify which differences to ignore.

		expect(
			_.isEqual(verses[17], expectedResults[6][0])
		).toBe(true);
	});
});

describe("Matthew 6:9", function () {
	it("Checks subword interupted by a root word", async function () {
		let verses = mapVerses(
			Matthew.xml.book.chapter[5].verse as VerseTag[]
		);
		const diff = difference(
			verses[8],
			expectedResults[7][0]
		);

		if (diff.length > 0) {
			console.error(diff);
		}

		// TODO: add method here to specify which differences to ignore.

		expect(
			_.isEqual(verses[8], expectedResults[7][0])
		).toBe(true);
	});
});

describe("Matthew 16:22", function () {
	it("Phraseword, followed by a subphrase word, subphrase word is immediately substituted", async function () {
		let verses = mapVerses(
			Matthew.xml.book.chapter[15].verse as VerseTag[]
		);
		const diff = difference(
			verses[21],
			expectedResults[8][0]
		);

		if (diff.length > 0) {
			console.error(diff);
		}

		// TODO: add method here to specify which differences to ignore.

		expect(
			_.isEqual(verses[21], expectedResults[8][0])
		).toBe(true);
	});
});

describe("Act 1", function () {
	it("Checks full chapter", async function () {
		let verses = mapVerses(
			Acts.xml.book.chapter[0].verse as VerseTag[]
		);
		const diff = difference(verses, expectedResults[9]);

		if (diff.length > 0) {
			console.error(diff);
		}

		// TODO: add method here to specify which differences to ignore.

		expect(_.isEqual(verses, expectedResults[9])).toBe(
			true
		);
	});
});

describe("Phrase words that need sub words injected into them", function () {
	let chapters = [13, 12, 2, 3, 4, 5, 6, 13];
	let verses = [15, 14, 17, 9, 38, 4, 17, 16];

	for (let i = 0; i < chapters.length; i++) {
		it(`Checks multiple cases found in Mark ${chapters[i]}:${verses[i]}`, async function () {
			let bookVerses = mapVerses(
				Mark.xml.book.chapter[chapters[i] - 1]
					.verse as VerseTag[]
			);
			const diff = difference(
				bookVerses[verses[i] - 1],
				subAndPhraseWordsExpectedResults[i][0]
			);

			if (diff.length > 0) {
				console.error(diff);
			}

			// TODO: add method here to specify which differences to ignore.

			expect(
				_.isEqual(
					bookVerses[verses[i] - 1],
					subAndPhraseWordsExpectedResults[i][0]
				)
			).toBe(true);
		});
	}

	it(`Checks case where ends in phrase word needing injected sub words Acts 2:12`, async function () {
		let bookVerses = mapVerses(
			Acts.xml.book.chapter[1].verse as VerseTag[]
		);
		const diff = difference(
			bookVerses[11],
			expectedResults[10][0]
		);

		if (diff.length > 0) {
			console.error(diff);
		}

		// TODO: add method here to specify which differences to ignore.

		expect(
			_.isEqual(bookVerses[11], expectedResults[10][0])
		).toBe(true);
	});
});

describe("Matthew 13:54", function () {
	it("Nested sub words", async function () {
		let verses = mapVerses(
			Matthew.xml.book.chapter[12].verse as VerseTag[]
		);
		const diff = difference(
			verses[53],
			expectedResults[11][0]
		);

		if (diff.length > 0) {
			console.error(diff);
		}

		// TODO: add method here to specify which differences to ignore.

		expect(
			_.isEqual(verses[53], expectedResults[11][0])
		).toBe(true);
	});
});

describe("Mark 6:16", function () {
	it("Sub word interrupted by Greek word", async function () {
		let verses = mapVerses(
			Mark.xml.book.chapter[5].verse as VerseTag[]
		);
		const diff = difference(
			verses[15],
			expectedResults[12][0]
		);

		if (diff.length > 0) {
			console.error(diff);
		}

		// TODO: add method here to specify which differences to ignore.

		expect(
			_.isEqual(verses[15], expectedResults[12][0])
		).toBe(true);
	});
});

describe("Matthew 12:40", function () {
	it("Injected sub word is a checkmark", async function () {
		let verses = mapVerses(
			Matthew.xml.book.chapter[11].verse as VerseTag[]
		);
		const diff = difference(
			verses[39],
			expectedResults[13][0]
		);

		if (diff.length > 0) {
			console.error(diff);
		}

		// TODO: add method here to specify which differences to ignore.

		expect(
			_.isEqual(verses[39], expectedResults[13][0])
		).toBe(true);
	});
});

export {};

function difference(origObj: any, newObj: any) {
	function changes(newObj: any, origObj: any) {
		let arrayIndexCounter = 0;
		return _.transform(
			newObj,
			function (result: any, value: any, key: any) {
				if (!_.isEqual(value, origObj[key])) {
					let resultKey = _.isArray(origObj)
						? arrayIndexCounter++
						: key;
					result[resultKey] =
						_.isObject(value) && _.isObject(origObj[key])
							? changes(value, origObj[key])
							: value;
				}
			}
		);
	}
	return changes(newObj, origObj);
}

const subAndPhraseWordsExpectedResults = [
	[
		{
			verseNum: 15,
			verseWords: [
				{
					englishWords:
						"let him who is on the housetop not go down",
					phraseWords: [
						{
							text: "√",
							strongs: "G2597",
							OGNTsort: 27098,
							phraseWords:
								"let [1] [2] [3] [4] [5] go down",
							morph: "V-2AAM-3S",
							lemma: "καταβαίνω",
						},
					],
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "him who is",
								strongs: "G3588",
								OGNTsort: 27092,
								morph: "T-NSM",
								lemma: "ὁ",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "on",
								strongs: "G1909",
								OGNTsort: 27094,
								morph: "PREP",
								lemma: "ἐπί",
							},
						},
						{
							subIdx: "[3]",
							word: {
								text: "the",
								strongs: "G3588",
								OGNTsort: 27095,
								morph: "T-GSN",
								lemma: "ὁ",
							},
						},
						{
							subIdx: "[4]",
							word: {
								text: "housetop",
								strongs: "G1430",
								OGNTsort: 27096,
								morph: "N-GSN",
								lemma: "δῶμα",
							},
						},
						{
							subIdx: "[5]",
							word: {
								text: "not",
								strongs: "G3361",
								OGNTsort: 27097,
								morph: "PRT-N",
								lemma: "μή",
							},
						},
					],
				},
				{
					englishWords: "into the house",
					phraseWords: [
						{
							text: "√",
							strongs: "G1525",
							OGNTsort: 27100,
							phraseWords: "into the house",
							morph: "V-2AAM-3S",
							lemma: "εἰσέρχομαι",
						},
						{
							text: "√",
							strongs: "G846",
							OGNTsort: 27106,
							phraseWords: "into the house",
							morph: "P-GSM",
							lemma: "αὐτός",
						},
						{
							text: "√",
							strongs: "G3588",
							OGNTsort: 27104,
							phraseWords: "into the house",
							morph: "T-GSF",
							lemma: "ὁ",
						},
						{
							text: "√",
							strongs: "G3614",
							OGNTsort: 27105,
							phraseWords: "into the house",
							morph: "N-GSF",
							lemma: "οἰκία",
						},
					],
					subWords: [],
				},
				{
					englishWords: "or",
					greekWords: [
						{
							text: "or",
							strongs: "G3366",
							OGNTsort: 27099,
							morph: "CONJ",
							lemma: "μηδέ",
						},
					],
				},
				{
					englishWords: "take",
					greekWords: [
						{
							text: "take",
							strongs: "G142",
							OGNTsort: 27101,
							morph: "V-AAN",
							lemma: "αἴρω",
						},
					],
				},
				{
					englishWords: "anything",
					greekWords: [
						{
							text: "anything",
							strongs: "G5100",
							OGNTsort: 27102,
							morph: "X-ASN",
							lemma: "τις",
						},
					],
				},
				{
					englishWords: "out",
					greekWords: [
						{
							text: "out",
							strongs: "G1537",
							OGNTsort: 27103,
							morph: "PREP",
							lemma: "ἐκ",
						},
					],
				},
				{ englishWords: "of it," },
			],
		},
	],
	[
		{
			verseNum: 14,
			verseWords: [
				{
					englishWords: "When they came,",
					greekWords: [
						{
							text: "When they came,",
							strongs: "G2064",
							OGNTsort: 26242,
							morph: "V-2AAP-NPM",
							lemma: "ἔρχομαι",
						},
					],
				},
				{
					englishWords: "they said",
					greekWords: [
						{
							text: "they said",
							strongs: "G3004",
							OGNTsort: 26243,
							morph: "V-PAI-3P",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: "to him,",
					greekWords: [
						{
							text: "to him,",
							strongs: "G846",
							OGNTsort: 26244,
							morph: "P-DSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: '"Teacher,',
					greekWords: [
						{
							text: '"Teacher,',
							strongs: "G1320",
							OGNTsort: 26245,
							morph: "N-VSM",
							lemma: "διδάσκαλος",
						},
					],
				},
				{
					englishWords:
						"what people think is not a concern",
					phraseWords: [
						{
							text: "√",
							strongs: "G3199",
							OGNTsort: 26252,
							phraseWords:
								"what people think is [1] a concern",
							morph: "V-PAI-3S",
							lemma: "μέλω",
						},
						{
							text: "√",
							strongs: "G3762",
							OGNTsort: 26255,
							phraseWords:
								"what people think is [1] a concern",
							morph: "A-GSM",
							lemma: "οὐδείς",
						},
					],
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "not",
								strongs: "G3756",
								OGNTsort: 26251,
								morph: "PRT-N",
								lemma: "οὐ",
							},
						},
					],
				},
				{
					englishWords: "to",
					subWords: [
						{
							word: {
								text: "to",
								strongs: "G4012",
								OGNTsort: 26254,
								morph: "PREP",
								lemma: "περί",
							},
						},
					],
				},
				{
					englishWords: "you",
					greekWords: [
						{
							text: "you",
							strongs: "G4771",
							OGNTsort: 26253,
							morph: "P-2DS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "because",
					greekWords: [
						{
							text: "because",
							strongs: "G1063",
							OGNTsort: 26257,
							morph: "CONJ",
							lemma: "γάρ",
						},
					],
				},
				{
					englishWords:
						"you do not show partiality to anyone.",
					phraseWords: [
						{
							text: "√",
							strongs: "G991",
							OGNTsort: 26258,
							phraseWords:
								"you do [2] show partiality to anyone.",
							morph: "V-PAI-2S",
							lemma: "βλέπω",
						},
						{
							text: "√",
							strongs: "G1519",
							OGNTsort: 26259,
							phraseWords:
								"you do [2] show partiality to anyone.",
							morph: "PREP",
							lemma: "εἰς",
						},
						{
							text: "√",
							strongs: "G4383",
							OGNTsort: 26260,
							phraseWords:
								"you do [2] show partiality to anyone.",
							morph: "N-ASN",
							lemma: "πρόσωπον",
						},
						{
							text: "√",
							strongs: "G444",
							OGNTsort: 26261,
							phraseWords:
								"you do [2] show partiality to anyone.",
							morph: "N-GPM",
							lemma: "ἄνθρωπος",
						},
					],
					subWords: [
						{
							subIdx: "[2]",
							word: {
								text: "not",
								strongs: "G3756",
								OGNTsort: 26256,
								morph: "PRT-N",
								lemma: "οὐ",
							},
						},
					],
				},
				{
					englishWords: "You truly teach",
					subWords: [
						{
							subIdx: "[3]",
							word: {
								text: "√",
								strongs: "G1909",
								OGNTsort: 26263,
								subPhraseWords: "truly",
								morph: "PREP",
								lemma: "ἐπί",
							},
						},
						{
							subIdx: "[3]",
							word: {
								text: "√",
								strongs: "G225",
								OGNTsort: 26264,
								subPhraseWords: "truly",
								morph: "N-GSF",
								lemma: "ἀλήθεια",
							},
						},
						{
							word: {
								text: "You truly teach",
								strongs: "G1321",
								OGNTsort: 26269,
								morph: "V-PAI-2S",
								lemma: "διδάσκω",
							},
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 26265,
							morph: "T-ASF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "way",
					greekWords: [
						{
							text: "way",
							strongs: "G3598",
							OGNTsort: 26266,
							morph: "N-ASF",
							lemma: "ὁδός",
						},
					],
				},
				{
					englishWords: "of God.",
					greekWords: [
						{
							text: "of God.",
							strongs: "G2316",
							OGNTsort: 26268,
							morph: "N-GSM",
							lemma: "θεός",
						},
					],
				},
				{
					englishWords: "Is it lawful",
					greekWords: [
						{
							text: "Is it lawful",
							strongs: "G1832",
							OGNTsort: 26270,
							morph: "V-PAI-3S",
							lemma: "ἔξεστι, ἐξόν",
						},
					],
				},
				{
					englishWords: "to pay",
					greekWords: [
						{
							text: "to pay",
							strongs: "G1325",
							OGNTsort: 26271,
							morph: "V-2AAN",
							lemma: "δίδωμι",
						},
					],
				},
				{
					englishWords: "taxes",
					greekWords: [
						{
							text: "taxes",
							strongs: "G2778",
							OGNTsort: 26272,
							morph: "N-ASM",
							lemma: "κῆνσος",
						},
					],
				},
				{
					englishWords: "to Caesar",
					greekWords: [
						{
							text: "to Caesar",
							strongs: "G2541",
							OGNTsort: 26273,
							morph: "N-DSM-T",
							lemma: "Καῖσαρ",
						},
					],
				},
				{
					englishWords: "or",
					greekWords: [
						{
							text: "or",
							strongs: "G2228",
							OGNTsort: 26274,
							morph: "CONJ",
							lemma: "ἤ",
						},
					],
				},
				{
					englishWords: "not?",
					greekWords: [
						{
							text: "not?",
							strongs: "G3756",
							OGNTsort: 26275,
							morph: "PRT-N",
							lemma: "οὐ",
						},
					],
				},
				{
					englishWords: "Should we pay",
					greekWords: [
						{
							text: "Should we pay",
							strongs: "G1325",
							OGNTsort: 26276,
							morph: "V-2AAS-1P",
							lemma: "δίδωμι",
						},
					],
				},
				{
					englishWords: "or",
					greekWords: [
						{
							text: "or",
							strongs: "G2228",
							OGNTsort: 26277,
							morph: "CONJ",
							lemma: "ἤ",
						},
					],
				},
				{
					englishWords: 'not?"',
					greekWords: [
						{
							text: 'not?"',
							strongs: "G3361",
							OGNTsort: 26278,
							morph: "PRT-N",
							lemma: "μή",
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 17,
			verseWords: [
				{
					englishWords: "When Jesus heard this",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "Jesus",
								strongs: "G2424",
								OGNTsort: 19338,
								morph: "N-NSM-P",
								lemma: "Ἰησοῦς",
							},
						},
						{
							word: {
								text: "When Jesus heard this",
								strongs: "G191",
								OGNTsort: 19336,
								morph: "V-AAP-NSM",
								lemma: "ἀκούω",
							},
						},
					],
				},
				{
					englishWords: "he said",
					greekWords: [
						{
							text: "he said",
							strongs: "G3004",
							OGNTsort: 19339,
							morph: "V-PAI-3S",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: "to them,",
					greekWords: [
						{
							text: "to them,",
							strongs: "G846",
							OGNTsort: 19340,
							morph: "P-DPM",
							lemma: "αὐτός",
						},
					],
				},
				{ englishWords: '"People who are' },
				{
					englishWords: "strong in body",
					greekWords: [
						{
							text: "strong in body",
							strongs: "G2480",
							OGNTsort: 19346,
							morph: "V-PAP-NPM",
							lemma: "ἰσχύω",
						},
					],
				},
				{
					englishWords: "do not need",
					phraseWords: [
						{
							text: "√",
							strongs: "G5532",
							OGNTsort: 19343,
							phraseWords: "do [2] need",
							morph: "N-ASF",
							lemma: "χρεία",
						},
						{
							text: "√",
							strongs: "G2192",
							OGNTsort: 19344,
							phraseWords: "do [2] need",
							morph: "V-PAI-3P",
							lemma: "ἔχω",
						},
					],
					subWords: [
						{
							subIdx: "[2]",
							word: {
								text: "not",
								strongs: "G3756",
								OGNTsort: 19342,
								morph: "PRT-N",
								lemma: "οὐ",
							},
						},
					],
				},
				{
					englishWords: "a physician;",
					subWords: [
						{
							word: {
								text: "a physician;",
								strongs: "G2395",
								OGNTsort: 19347,
								morph: "N-GSM",
								lemma: "ἰατρός",
							},
						},
					],
				},
				{
					englishWords: "only",
					greekWords: [
						{
							text: "only",
							strongs: "G235",
							OGNTsort: 19348,
							morph: "CONJ",
							lemma: "ἀλλά",
						},
					],
				},
				{
					englishWords: "people who are sick",
					phraseWords: [
						{
							text: "√",
							strongs: "G2192",
							OGNTsort: 19351,
							phraseWords: "people who are sick",
							morph: "V-PAP-NPM",
							lemma: "ἔχω",
						},
					],
					subWords: [],
				},
				{ englishWords: "need one." },
				{
					englishWords: "I did not come",
					subWords: [
						{
							subIdx: "[2]",
							word: {
								text: "not",
								strongs: "G3756",
								OGNTsort: 19352,
								morph: "PRT-N",
								lemma: "οὐ",
							},
						},
						{
							word: {
								text: "I did not come",
								strongs: "G2064",
								OGNTsort: 19353,
								morph: "V-2AAI-1S",
								lemma: "ἔρχομαι",
							},
						},
					],
				},
				{
					englishWords: "to call",
					greekWords: [
						{
							text: "to call",
							strongs: "G2564",
							OGNTsort: 19354,
							morph: "V-AAN",
							lemma: "καλέω",
						},
					],
				},
				{
					englishWords: "righteous people,",
					greekWords: [
						{
							text: "righteous people,",
							strongs: "G1342",
							OGNTsort: 19355,
							morph: "A-APM",
							lemma: "δίκαιος",
						},
					],
				},
				{
					englishWords: "but",
					greekWords: [
						{
							text: "but",
							strongs: "G235",
							OGNTsort: 19356,
							morph: "CONJ",
							lemma: "ἀλλά",
						},
					],
				},
				{
					englishWords: 'sinners."',
					greekWords: [
						{
							text: 'sinners."',
							strongs: "G268",
							OGNTsort: 19357,
							morph: "A-APM",
							lemma: "ἁμαρτωλός",
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 9,
			verseWords: [
				{
					englishWords: "He told",
					greekWords: [
						{
							text: "He told",
							strongs: "G2036",
							OGNTsort: 19737,
							morph: "V-2AAI-3S",
							lemma: "ἔπω, ἐρῶ, εἶπον",
						},
					],
				},
				{
					englishWords: "his",
					greekWords: [
						{
							text: "his",
							strongs: "G846",
							OGNTsort: 19740,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "disciples",
					greekWords: [
						{
							text: "disciples",
							strongs: "G3101",
							OGNTsort: 19739,
							morph: "N-DPM",
							lemma: "μαθητής",
						},
					],
				},
				{
					englishWords: "to have a small boat ready",
					phraseWords: [
						{
							text: "√",
							strongs: "G2443",
							OGNTsort: 19741,
							phraseWords: "to have [1] ready",
							morph: "CONJ",
							lemma: "ἵνα",
						},
						{
							text: "√",
							strongs: "G4342",
							OGNTsort: 19743,
							phraseWords: "to have [1] ready",
							morph: "V-PAS-3S",
							lemma: "προσκαρτερέω",
						},
					],
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "a small boat",
								strongs: "G4142",
								OGNTsort: 19742,
								morph: "N-NSN",
								lemma: "πλοιάριον",
							},
						},
					],
				},
				{
					englishWords: "for him",
					subWords: [
						{
							word: {
								text: "for him",
								strongs: "G846",
								OGNTsort: 19744,
								morph: "P-DSM",
								lemma: "αὐτός",
							},
						},
					],
				},
				{
					englishWords: "because of",
					greekWords: [
						{
							text: "because of",
							strongs: "G1223",
							OGNTsort: 19745,
							morph: "PREP",
							lemma: "διά",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 19746,
							morph: "T-ASM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "crowd,",
					greekWords: [
						{
							text: "crowd,",
							strongs: "G3793",
							OGNTsort: 19747,
							morph: "N-ASM",
							lemma: "ὄχλος",
						},
					],
				},
				{
					englishWords: "so that",
					greekWords: [
						{
							text: "so that",
							strongs: "G2443",
							OGNTsort: 19748,
							morph: "CONJ",
							lemma: "ἵνα",
						},
					],
				},
				{
					englishWords: "they would not press against",
					subWords: [
						{
							subIdx: "[2]",
							word: {
								text: "not",
								strongs: "G3361",
								OGNTsort: 19749,
								morph: "PRT-N",
								lemma: "μή",
							},
						},
						{
							word: {
								text: "they would not press against",
								strongs: "G2346",
								OGNTsort: 19750,
								morph: "V-PAS-3P",
								lemma: "θλίβω",
							},
						},
					],
				},
				{
					englishWords: "him.",
					greekWords: [
						{
							text: "him.",
							strongs: "G846",
							OGNTsort: 19751,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 38,
			verseWords: [
				{
					englishWords: "But",
					greekWords: [
						{
							text: "But",
							strongs: "G2532",
							OGNTsort: 20752,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{ englishWords: "Jesus" },
				{
					englishWords: "himself",
					greekWords: [
						{
							text: "himself",
							strongs: "G846",
							OGNTsort: 20753,
							morph: "P-NSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "was",
					greekWords: [
						{
							text: "was",
							strongs: "G1510",
							OGNTsort: 20754,
							morph: "V-IAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 20755,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 20756,
							morph: "T-DSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "stern,",
					greekWords: [
						{
							text: "stern,",
							strongs: "G4403",
							OGNTsort: 20757,
							morph: "N-DSF",
							lemma: "πρύμνα",
						},
					],
				},
				{
					englishWords: "asleep",
					greekWords: [
						{
							text: "asleep",
							strongs: "G2518",
							OGNTsort: 20761,
							morph: "V-PAP-NSM",
							lemma: "καθεύδω",
						},
					],
				},
				{
					englishWords: "on",
					greekWords: [
						{
							text: "on",
							strongs: "G1909",
							OGNTsort: 20758,
							morph: "PREP",
							lemma: "ἐπί",
						},
					],
				},
				{
					englishWords: "a cushion.",
					greekWords: [
						{
							text: "a cushion.",
							strongs: "G4344",
							OGNTsort: 20760,
							morph: "N-ASN",
							lemma: "προσκεφάλαιον",
						},
					],
				},
				{
					englishWords: "They woke him up,",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "him",
								strongs: "G846",
								OGNTsort: 20764,
								morph: "P-ASM",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: "They woke him up,",
								strongs: "G1453",
								OGNTsort: 20763,
								morph: "V-PAI-3P",
								lemma: "ἐγείρω",
							},
						},
					],
				},
				{
					englishWords: "saying,",
					greekWords: [
						{
							text: "saying,",
							strongs: "G3004",
							OGNTsort: 20766,
							morph: "V-PAI-3P",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: '"Teacher,',
					greekWords: [
						{
							text: '"Teacher,',
							strongs: "G1320",
							OGNTsort: 20768,
							morph: "N-VSM",
							lemma: "διδάσκαλος",
						},
					],
				},
				{
					englishWords: "do you not care",
					phraseWords: [
						{
							text: "√",
							strongs: "G3199",
							OGNTsort: 20770,
							phraseWords: "do you [2] care",
							morph: "V-PAI-3S",
							lemma: "μέλω",
						},
						{
							text: "√",
							strongs: "G4771",
							OGNTsort: 20771,
							phraseWords: "do you [2] care",
							morph: "P-2DS",
							lemma: "σύ",
						},
					],
					subWords: [
						{
							subIdx: "[2]",
							word: {
								text: "not",
								strongs: "G3756",
								OGNTsort: 20769,
								morph: "PRT-N",
								lemma: "οὐ",
							},
						},
					],
				},
				{
					englishWords: "that",
					subWords: [
						{
							word: {
								text: "that",
								strongs: "G3754",
								OGNTsort: 20772,
								morph: "CONJ",
								lemma: "ὅτι",
							},
						},
					],
				},
				{
					englishWords: 'we are about to die?"',
					greekWords: [
						{
							text: 'we are about to die?"',
							strongs: "G622",
							OGNTsort: 20773,
							morph: "V-PMI-1P",
							lemma: "ἀπολλύω",
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 4,
			verseWords: [
				{
					englishWords: "He had been bound",
					phraseWords: [
						{
							text: "√",
							strongs: "G846",
							OGNTsort: 20868,
							phraseWords: "He had been bound",
							morph: "P-ASM",
							lemma: "αὐτός",
						},
						{
							text: "√",
							strongs: "G1210",
							OGNTsort: 20873,
							phraseWords: "He had been bound",
							morph: "V-RPN",
							lemma: "δέω",
						},
					],
					subWords: [],
				},
				{
					englishWords: "many times",
					greekWords: [
						{
							text: "many times",
							strongs: "G4178",
							OGNTsort: 20869,
							morph: "ADV",
							lemma: "πολλάκις",
						},
					],
				},
				{
					englishWords: "with shackles",
					greekWords: [
						{
							text: "with shackles",
							strongs: "G3976",
							OGNTsort: 20870,
							morph: "N-DPF",
							lemma: "πέδη",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 20871,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "with chains.",
					greekWords: [
						{
							text: "with chains.",
							strongs: "G254",
							OGNTsort: 20872,
							morph: "N-DPF",
							lemma: "ἅλυσις",
						},
					],
				},
				{
					englishWords: "He tore the chains apart",
					phraseWords: [
						{
							text: "√",
							strongs: "G1288",
							OGNTsort: 20875,
							phraseWords: "He tore [1] [2] apart",
							morph: "V-RPN",
							lemma: "διασπάω",
						},
						{
							text: "√",
							strongs: "G5259",
							OGNTsort: 20876,
							phraseWords: "He tore [1] [2] apart",
							morph: "PREP",
							lemma: "ὑπό",
						},
						{
							text: "√",
							strongs: "G846",
							OGNTsort: 20877,
							phraseWords: "He tore [1] [2] apart",
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "the",
								strongs: "G3588",
								OGNTsort: 20878,
								morph: "T-APF",
								lemma: "ὁ",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "chains",
								strongs: "G254",
								OGNTsort: 20879,
								morph: "N-APF",
								lemma: "ἅλυσις",
							},
						},
					],
				},
				{
					englishWords: "and",
					subWords: [
						{
							word: {
								text: "and",
								strongs: "G2532",
								OGNTsort: 20880,
								morph: "CONJ",
								lemma: "καί",
							},
						},
					],
				},
				{ englishWords: "his" },
				{
					englishWords: "shackles",
					greekWords: [
						{
							text: "shackles",
							strongs: "G3976",
							OGNTsort: 20882,
							morph: "N-APF",
							lemma: "πέδη",
						},
					],
				},
				{
					englishWords: "were shattered.",
					greekWords: [
						{
							text: "were shattered.",
							strongs: "G4937",
							OGNTsort: 20883,
							morph: "V-RPN",
							lemma: "συντρίβω",
						},
					],
				},
				{
					englishWords: "No one",
					greekWords: [
						{
							text: "No one",
							strongs: "G3762",
							OGNTsort: 20885,
							morph: "A-NSM",
							lemma: "οὐδείς",
						},
					],
				},
				{
					englishWords: "had the strength",
					greekWords: [
						{
							text: "had the strength",
							strongs: "G2480",
							OGNTsort: 20886,
							morph: "V-IAI-3S",
							lemma: "ἰσχύω",
						},
					],
				},
				{
					englishWords: "to subdue",
					greekWords: [
						{
							text: "to subdue",
							strongs: "G1150",
							OGNTsort: 20888,
							morph: "V-AAN",
							lemma: "δαμάζω",
						},
					],
				},
				{
					englishWords: "him.",
					greekWords: [
						{
							text: "him.",
							strongs: "G846",
							OGNTsort: 20887,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 17,
			verseWords: [
				{
					englishWords: "For",
					greekWords: [
						{
							text: "For",
							strongs: "G1063",
							OGNTsort: 21807,
							morph: "CONJ",
							lemma: "γάρ",
						},
					],
				},
				{
					englishWords: "Herod",
					greekWords: [
						{
							text: "Herod",
							strongs: "G2264",
							OGNTsort: 21809,
							morph: "N-NSM-P",
							lemma: "Ἡρώδης",
						},
					],
				},
				{
					englishWords: "sent",
					greekWords: [
						{
							text: "sent",
							strongs: "G649",
							OGNTsort: 21810,
							morph: "V-AAP-NSM",
							lemma: "ἀποστέλλω",
						},
					],
				},
				{
					englishWords: "to have John arrested",
					phraseWords: [
						{
							text: "√",
							strongs: "G2902",
							OGNTsort: 21811,
							phraseWords: "to have [1] arrested",
							morph: "V-AAI-3S",
							lemma: "κρατέω",
						},
					],
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "John",
								strongs: "G2491",
								OGNTsort: 21813,
								morph: "N-ASM-P",
								lemma: "Ἰωάννης",
							},
						},
					],
				},
				{
					englishWords: "and",
					subWords: [
						{
							word: {
								text: "and",
								strongs: "G2532",
								OGNTsort: 21814,
								morph: "CONJ",
								lemma: "καί",
							},
						},
					],
				},
				{
					englishWords: "he had him bound",
					subWords: [
						{
							subIdx: "[2]",
							word: {
								text: "him",
								strongs: "G846",
								OGNTsort: 21816,
								morph: "P-ASM",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: "he had him bound",
								strongs: "G1210",
								OGNTsort: 21815,
								morph: "V-AAI-3S",
								lemma: "δέω",
							},
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 21817,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "prison",
					greekWords: [
						{
							text: "prison",
							strongs: "G5438",
							OGNTsort: 21818,
							morph: "N-DSF",
							lemma: "φυλακή",
						},
					],
				},
				{
					englishWords: "on account of",
					greekWords: [
						{
							text: "on account of",
							strongs: "G1223",
							OGNTsort: 21819,
							morph: "PREP",
							lemma: "διά",
						},
					],
				},
				{
					englishWords: "Herodias",
					greekWords: [
						{
							text: "Herodias",
							strongs: "G2266",
							OGNTsort: 21820,
							morph: "N-ASF-P",
							lemma: "Ἡρωδιάς",
						},
					],
				},
				{
					englishWords: "(his",
					greekWords: [
						{
							text: "(his",
							strongs: "G846",
							OGNTsort: 21826,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "brother",
					greekWords: [
						{
							text: "brother",
							strongs: "G80",
							OGNTsort: 21825,
							morph: "N-GSM",
							lemma: "ἀδελφός",
						},
					],
				},
				{
					englishWords: "Philip's",
					greekWords: [
						{
							text: "Philip's",
							strongs: "G5376",
							OGNTsort: 21823,
							morph: "N-GSM-P",
							lemma: "Φίλιππος",
						},
					],
				},
				{
					englishWords: "wife),",
					greekWords: [
						{
							text: "wife),",
							strongs: "G1135",
							OGNTsort: 21822,
							morph: "N-ASF",
							lemma: "γυνή",
						},
					],
				},
				{
					englishWords: "because",
					greekWords: [
						{
							text: "because",
							strongs: "G3754",
							OGNTsort: 21827,
							morph: "CONJ",
							lemma: "ὅτι",
						},
					],
				},
				{
					englishWords: "he had married",
					greekWords: [
						{
							text: "he had married",
							strongs: "G1060",
							OGNTsort: 21829,
							morph: "V-AAI-3S",
							lemma: "γαμέω",
						},
					],
				},
				{
					englishWords: "her.",
					greekWords: [
						{
							text: "her.",
							strongs: "G846",
							OGNTsort: 21828,
							morph: "P-ASF",
							lemma: "αὐτός",
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 16,
			verseWords: [
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 27107,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords:
						"let him who is in the field not return",
					phraseWords: [
						{
							text: "√",
							strongs: "G1994",
							OGNTsort: 27113,
							phraseWords: "let [1] [2] [3] [4] [5] return",
							morph: "V-AAM-3S",
							lemma: "ἐπιστρέφω",
						},
						{
							text: "√",
							strongs: "G1519",
							OGNTsort: 27114,
							phraseWords: "let [1] [2] [3] [4] [5] return",
							morph: "PREP",
							lemma: "εἰς",
						},
						{
							text: "√",
							strongs: "G3588",
							OGNTsort: 27115,
							phraseWords: "let [1] [2] [3] [4] [5] return",
							morph: "T-APN",
							lemma: "ὁ",
						},
						{
							text: "√",
							strongs: "G3694",
							OGNTsort: 27116,
							phraseWords: "let [1] [2] [3] [4] [5] return",
							morph: "ADV",
							lemma: "ὀπίσω",
						},
					],
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "him who is",
								strongs: "G3588",
								OGNTsort: 27108,
								morph: "T-NSM",
								lemma: "ὁ",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "in",
								strongs: "G1519",
								OGNTsort: 27109,
								morph: "PREP",
								lemma: "εἰς",
							},
						},
						{
							subIdx: "[3]",
							word: {
								text: "the",
								strongs: "G3588",
								OGNTsort: 27110,
								morph: "T-ASM",
								lemma: "ὁ",
							},
						},
						{
							subIdx: "[4]",
							word: {
								text: "field",
								strongs: "G68",
								OGNTsort: 27111,
								morph: "N-ASM",
								lemma: "ἀγρός",
							},
						},
						{
							subIdx: "[5]",
							word: {
								text: "not",
								strongs: "G3361",
								OGNTsort: 27112,
								morph: "PRT-N",
								lemma: "μή",
							},
						},
					],
				},
				{
					englishWords: "to take",
					subWords: [
						{
							word: {
								text: "to take",
								strongs: "G142",
								OGNTsort: 27117,
								morph: "V-AAN",
								lemma: "αἴρω",
							},
						},
					],
				},
				{
					englishWords: "his",
					greekWords: [
						{
							text: "his",
							strongs: "G846",
							OGNTsort: 27120,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "cloak.",
					greekWords: [
						{
							text: "cloak.",
							strongs: "G2440",
							OGNTsort: 27119,
							morph: "N-ASN",
							lemma: "ἱμάτιον",
						},
					],
				},
			],
		},
	],
];

const expectedResults = [
	[
		{
			verseNum: 2,
			verseWords: [
				{
					englishWords: "Six days later,",
					phraseWords: [
						{
							text: "√",
							strongs: "G1803",
							OGNTsort: 23768,
							phraseWords: "Six days later,",
							morph: "A-APF-NUI",
							lemma: "ἕξ",
						},
						{
							text: "√",
							strongs: "G3326",
							OGNTsort: 23766,
							phraseWords: "Six days later,",
							morph: "PREP",
							lemma: "μετά",
						},
						{
							text: "√",
							strongs: "G2250",
							OGNTsort: 23767,
							phraseWords: "Six days later,",
							morph: "N-APF",
							lemma: "ἡμέρα",
						},
					],
					subWords: [],
				},
				{
					englishWords: "Jesus",
					greekWords: [
						{
							text: "Jesus",
							strongs: "G2424",
							OGNTsort: 23771,
							morph: "N-NSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
				{
					englishWords:
						"took Peter and James and John with him",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "Peter",
								strongs: "G4074",
								OGNTsort: 23773,
								morph: "N-ASM-P",
								lemma: "Πέτρος",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "and",
								strongs: "G2532",
								OGNTsort: 23774,
								morph: "CONJ",
								lemma: "καί",
							},
						},
						{
							subIdx: "[3]",
							word: {
								text: "James",
								strongs: "G2385",
								OGNTsort: 23776,
								morph: "N-ASM-P",
								lemma: "Ἰάκωβος",
							},
						},
						{
							subIdx: "[4]",
							word: {
								text: "and",
								strongs: "G2532",
								OGNTsort: 23777,
								morph: "CONJ",
								lemma: "καί",
							},
						},
						{
							subIdx: "[5]",
							word: {
								text: "John",
								strongs: "G2491",
								OGNTsort: 23779,
								morph: "N-ASM-P",
								lemma: "Ἰωάννης",
							},
						},
						{
							word: {
								text: "took Peter and James and John with him",
								strongs: "G3880",
								OGNTsort: 23769,
								morph: "V-PAI-3S",
								lemma: "παραλαμβάνω",
							},
						},
					],
				},
				{
					englishWords: "up",
					greekWords: [
						{
							text: "up",
							strongs: "G399",
							OGNTsort: 23781,
							morph: "V-PAI-3S",
							lemma: "ἀναφέρω",
						},
					],
				},
				{
					englishWords: "a high",
					greekWords: [
						{
							text: "a high",
							strongs: "G5308",
							OGNTsort: 23785,
							morph: "A-ASN",
							lemma: "ὑψηλός",
						},
					],
				},
				{
					englishWords: "mountain,",
					greekWords: [
						{
							text: "mountain,",
							strongs: "G3735",
							OGNTsort: 23784,
							morph: "N-ASN",
							lemma: "ὄρος",
						},
					],
				},
				{
					englishWords: "alone",
					greekWords: [
						{
							text: "alone",
							strongs: "G3441",
							OGNTsort: 23788,
							morph: "A-APM",
							lemma: "μόνος",
						},
					],
				},
				{
					englishWords: "by themselves.",
					phraseWords: [
						{
							text: "√",
							strongs: "G2596",
							OGNTsort: 23786,
							phraseWords: "by themselves.",
							morph: "PREP",
							lemma: "κατά",
						},
						{
							text: "√",
							strongs: "G2398",
							OGNTsort: 23787,
							phraseWords: "by themselves.",
							morph: "A-ASF",
							lemma: "ἴδιος",
						},
					],
					subWords: [],
				},
				{
					englishWords: "Then",
					greekWords: [
						{
							text: "Then",
							strongs: "G2532",
							OGNTsort: 23789,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "he was transfigured",
					greekWords: [
						{
							text: "he was transfigured",
							strongs: "G3339",
							OGNTsort: 23790,
							morph: "V-API-3S",
							lemma: "μεταμορφόω",
						},
					],
				},
				{
					englishWords: "before",
					greekWords: [
						{
							text: "before",
							strongs: "G1715",
							OGNTsort: 23791,
							morph: "PREP",
							lemma: "ἔμπροσθεν",
						},
					],
				},
				{
					englishWords: "them.",
					greekWords: [
						{
							text: "them.",
							strongs: "G846",
							OGNTsort: 23792,
							morph: "P-GPM",
							lemma: "αὐτός",
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 1,
			verseWords: [
				{
					englishWords: "He said",
					greekWords: [
						{
							text: "He said",
							strongs: "G3004",
							OGNTsort: 23739,
							morph: "V-IAI-3S",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: "to them,",
					greekWords: [
						{
							text: "to them,",
							strongs: "G846",
							OGNTsort: 23740,
							morph: "P-DPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: '"Truly',
					greekWords: [
						{
							text: '"Truly',
							strongs: "G281",
							OGNTsort: 23741,
							morph: "HEB",
							lemma: "ἀμήν",
						},
					],
				},
				{
					englishWords: "I say",
					greekWords: [
						{
							text: "I say",
							strongs: "G3004",
							OGNTsort: 23742,
							morph: "V-PAI-1S",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: "to you,",
					greekWords: [
						{
							text: "to you,",
							strongs: "G4771",
							OGNTsort: 23743,
							morph: "P-2DP",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "there are",
					greekWords: [
						{
							text: "there are",
							strongs: "G1510",
							OGNTsort: 23745,
							morph: "V-PAI-3P",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "some",
					greekWords: [
						{
							text: "some",
							strongs: "G5100",
							OGNTsort: 23746,
							morph: "X-NPM",
							lemma: "τις",
						},
					],
				},
				{ englishWords: "of you" },
				{
					englishWords: "who",
					greekWords: [
						{
							text: "who",
							strongs: "G3588",
							OGNTsort: 23748,
							morph: "T-GPM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "are standing",
					greekWords: [
						{
							text: "are standing",
							strongs: "G2476",
							OGNTsort: 23749,
							morph: "V-RAP-GPM",
							lemma: "ἵστημι",
						},
					],
				},
				{
					englishWords: "here",
					greekWords: [
						{
							text: "here",
							strongs: "G5602",
							OGNTsort: 23747,
							morph: "ADV",
							lemma: "ὧδε",
						},
					],
				},
				{
					englishWords: "who",
					greekWords: [
						{
							text: "who",
							strongs: "G3748",
							OGNTsort: 23750,
							morph: "R-NPM",
							lemma: "ὅστις, ἥτις",
						},
					],
				},
				{
					englishWords: "will not taste",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "√",
								strongs: "G3756",
								OGNTsort: 23751,
								subPhraseWords: "not",
								morph: "PRT-N",
								lemma: "οὐ",
							},
						},
						{
							subIdx: "[1]",
							word: {
								text: "√",
								strongs: "G3361",
								OGNTsort: 23752,
								subPhraseWords: "not",
								morph: "PRT-N",
								lemma: "μή",
							},
						},
						{
							word: {
								text: "will not taste",
								strongs: "G1089",
								OGNTsort: 23753,
								morph: "V-ADS-3P",
								lemma: "γεύω",
							},
						},
					],
				},
				{
					englishWords: "death",
					greekWords: [
						{
							text: "death",
							strongs: "G2288",
							OGNTsort: 23754,
							morph: "N-GSM",
							lemma: "θάνατος",
						},
					],
				},
				{
					englishWords: "before",
					phraseWords: [
						{
							text: "√",
							strongs: "G2193",
							OGNTsort: 23755,
							phraseWords: "before",
							morph: "CONJ",
							lemma: "ἕως",
						},
						{
							text: "√",
							strongs: "G302",
							OGNTsort: 23756,
							phraseWords: "before",
							morph: "PRT",
							lemma: "ἄν",
						},
					],
					subWords: [],
				},
				{
					englishWords: "they see",
					greekWords: [
						{
							text: "they see",
							strongs: "G1492",
							OGNTsort: 23757,
							morph: "V-2AAS-3P",
							lemma: "εἴδω",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 23758,
							morph: "T-ASF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "kingdom",
					greekWords: [
						{
							text: "kingdom",
							strongs: "G932",
							OGNTsort: 23759,
							morph: "N-ASF",
							lemma: "βασιλεία",
						},
					],
				},
				{
					englishWords: "of God",
					greekWords: [
						{
							text: "of God",
							strongs: "G2316",
							OGNTsort: 23761,
							morph: "N-GSM",
							lemma: "θεός",
						},
					],
				},
				{
					englishWords: "come",
					greekWords: [
						{
							text: "come",
							strongs: "G2064",
							OGNTsort: 23762,
							morph: "V-2RAP-ASF",
							lemma: "ἔρχομαι",
						},
					],
				},
				{
					englishWords: "with",
					greekWords: [
						{
							text: "with",
							strongs: "G1722",
							OGNTsort: 23763,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: 'power."',
					greekWords: [
						{
							text: 'power."',
							strongs: "G1411",
							OGNTsort: 23764,
							morph: "N-DSF",
							lemma: "δύναμις",
						},
					],
				},
			],
		},
		{
			verseNum: 2,
			verseWords: [
				{
					englishWords: "Six days later,",
					phraseWords: [
						{
							text: "√",
							strongs: "G1803",
							OGNTsort: 23768,
							phraseWords: "Six days later,",
							morph: "A-APF-NUI",
							lemma: "ἕξ",
						},
						{
							text: "√",
							strongs: "G3326",
							OGNTsort: 23766,
							phraseWords: "Six days later,",
							morph: "PREP",
							lemma: "μετά",
						},
						{
							text: "√",
							strongs: "G2250",
							OGNTsort: 23767,
							phraseWords: "Six days later,",
							morph: "N-APF",
							lemma: "ἡμέρα",
						},
					],
					subWords: [],
				},
				{
					englishWords: "Jesus",
					greekWords: [
						{
							text: "Jesus",
							strongs: "G2424",
							OGNTsort: 23771,
							morph: "N-NSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
				{
					englishWords:
						"took Peter and James and John with him",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "Peter",
								strongs: "G4074",
								OGNTsort: 23773,
								morph: "N-ASM-P",
								lemma: "Πέτρος",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "and",
								strongs: "G2532",
								OGNTsort: 23774,
								morph: "CONJ",
								lemma: "καί",
							},
						},
						{
							subIdx: "[3]",
							word: {
								text: "James",
								strongs: "G2385",
								OGNTsort: 23776,
								morph: "N-ASM-P",
								lemma: "Ἰάκωβος",
							},
						},
						{
							subIdx: "[4]",
							word: {
								text: "and",
								strongs: "G2532",
								OGNTsort: 23777,
								morph: "CONJ",
								lemma: "καί",
							},
						},
						{
							subIdx: "[5]",
							word: {
								text: "John",
								strongs: "G2491",
								OGNTsort: 23779,
								morph: "N-ASM-P",
								lemma: "Ἰωάννης",
							},
						},
						{
							word: {
								text: "took Peter and James and John with him",
								strongs: "G3880",
								OGNTsort: 23769,
								morph: "V-PAI-3S",
								lemma: "παραλαμβάνω",
							},
						},
					],
				},
				{
					englishWords: "up",
					greekWords: [
						{
							text: "up",
							strongs: "G399",
							OGNTsort: 23781,
							morph: "V-PAI-3S",
							lemma: "ἀναφέρω",
						},
					],
				},
				{
					englishWords: "a high",
					greekWords: [
						{
							text: "a high",
							strongs: "G5308",
							OGNTsort: 23785,
							morph: "A-ASN",
							lemma: "ὑψηλός",
						},
					],
				},
				{
					englishWords: "mountain,",
					greekWords: [
						{
							text: "mountain,",
							strongs: "G3735",
							OGNTsort: 23784,
							morph: "N-ASN",
							lemma: "ὄρος",
						},
					],
				},
				{
					englishWords: "alone",
					greekWords: [
						{
							text: "alone",
							strongs: "G3441",
							OGNTsort: 23788,
							morph: "A-APM",
							lemma: "μόνος",
						},
					],
				},
				{
					englishWords: "by themselves.",
					phraseWords: [
						{
							text: "√",
							strongs: "G2596",
							OGNTsort: 23786,
							phraseWords: "by themselves.",
							morph: "PREP",
							lemma: "κατά",
						},
						{
							text: "√",
							strongs: "G2398",
							OGNTsort: 23787,
							phraseWords: "by themselves.",
							morph: "A-ASF",
							lemma: "ἴδιος",
						},
					],
					subWords: [],
				},
				{
					englishWords: "Then",
					greekWords: [
						{
							text: "Then",
							strongs: "G2532",
							OGNTsort: 23789,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "he was transfigured",
					greekWords: [
						{
							text: "he was transfigured",
							strongs: "G3339",
							OGNTsort: 23790,
							morph: "V-API-3S",
							lemma: "μεταμορφόω",
						},
					],
				},
				{
					englishWords: "before",
					greekWords: [
						{
							text: "before",
							strongs: "G1715",
							OGNTsort: 23791,
							morph: "PREP",
							lemma: "ἔμπροσθεν",
						},
					],
				},
				{
					englishWords: "them.",
					greekWords: [
						{
							text: "them.",
							strongs: "G846",
							OGNTsort: 23792,
							morph: "P-GPM",
							lemma: "αὐτός",
						},
					],
				},
			],
		},
		{
			verseNum: 3,
			verseWords: [
				{
					englishWords: "His",
					greekWords: [
						{
							text: "His",
							strongs: "G846",
							OGNTsort: 23796,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "garments",
					greekWords: [
						{
							text: "garments",
							strongs: "G2440",
							OGNTsort: 23795,
							morph: "N-NPN",
							lemma: "ἱμάτιον",
						},
					],
				},
				{
					englishWords: "became",
					greekWords: [
						{
							text: "became",
							strongs: "G1096",
							OGNTsort: 23797,
							morph: "V-2ADI-3S",
							lemma: "γίνομαι",
						},
					],
				},
				{
					englishWords: "radiantly brilliant,",
					greekWords: [
						{
							text: "radiantly brilliant,",
							strongs: "G4744",
							OGNTsort: 23798,
							morph: "V-PAP-NPN",
							lemma: "στίλβω",
						},
					],
				},
				{
					englishWords: "extremely",
					greekWords: [
						{
							text: "extremely",
							strongs: "G3029",
							OGNTsort: 23800,
							morph: "ADV",
							lemma: "λίαν",
						},
					],
				},
				{
					englishWords: "white,",
					greekWords: [
						{
							text: "white,",
							strongs: "G3022",
							OGNTsort: 23799,
							morph: "A-NPN",
							lemma: "λευκός",
						},
					],
				},
				{
					englishWords: "whiter than",
					phraseWords: [
						{
							text: "√",
							strongs: "G3756",
							OGNTsort: 23806,
							phraseWords: "whiter than",
							morph: "PRT-N",
							lemma: "οὐ",
						},
						{
							text: "√",
							strongs: "G3779",
							OGNTsort: 23808,
							phraseWords: "whiter than",
							morph: "ADV",
							lemma: "οὕτω, οὕτως",
						},
					],
					subWords: [],
				},
				{
					englishWords: "any",
					greekWords: [
						{
							text: "any",
							strongs: "G3634",
							OGNTsort: 23801,
							morph: "K-APN",
							lemma: "οἷος",
						},
					],
				},
				{
					englishWords: "bleacher",
					greekWords: [
						{
							text: "bleacher",
							strongs: "G1102",
							OGNTsort: 23802,
							morph: "N-NSM",
							lemma: "γναφεύς",
						},
					],
				},
				{
					englishWords: "on",
					greekWords: [
						{
							text: "on",
							strongs: "G1909",
							OGNTsort: 23803,
							morph: "PREP",
							lemma: "ἐπί",
						},
					],
				},
				{
					englishWords: "earth",
					greekWords: [
						{
							text: "earth",
							strongs: "G1093",
							OGNTsort: 23805,
							morph: "N-GSF",
							lemma: "γῆ",
						},
					],
				},
				{
					englishWords: "could",
					greekWords: [
						{
							text: "could",
							strongs: "G1410",
							OGNTsort: 23807,
							morph: "V-PNI-3S",
							lemma: "δύναμαι",
						},
					],
				},
				{
					englishWords: "bleach",
					greekWords: [
						{
							text: "bleach",
							strongs: "G3021",
							OGNTsort: 23809,
							morph: "V-AAN",
							lemma: "λευκαίνω",
						},
					],
				},
				{ englishWords: "them." },
			],
		},
		{
			verseNum: 4,
			verseWords: [
				{
					englishWords: "Then",
					greekWords: [
						{
							text: "Then",
							strongs: "G2532",
							OGNTsort: 23810,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "Elijah",
					greekWords: [
						{
							text: "Elijah",
							strongs: "G2243",
							OGNTsort: 23813,
							morph: "N-NSM-P",
							lemma: "Ἡλίας",
						},
					],
				},
				{
					englishWords: "with",
					greekWords: [
						{
							text: "with",
							strongs: "G4862",
							OGNTsort: 23814,
							morph: "PREP",
							lemma: "σύν",
						},
					],
				},
				{
					englishWords: "Moses",
					greekWords: [
						{
							text: "Moses",
							strongs: "G3475",
							OGNTsort: 23815,
							morph: "N-DSM-P",
							lemma: "Μωϋσῆς, Μωσῆς",
						},
					],
				},
				{
					englishWords: "appeared",
					greekWords: [
						{
							text: "appeared",
							strongs: "G3708",
							OGNTsort: 23811,
							morph: "V-API-3S",
							lemma: "ὁράω",
						},
					],
				},
				{
					englishWords: "to them,",
					greekWords: [
						{
							text: "to them,",
							strongs: "G846",
							OGNTsort: 23812,
							morph: "P-DPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 23816,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "they were",
					greekWords: [
						{
							text: "they were",
							strongs: "G1510",
							OGNTsort: 23817,
							morph: "V-IAI-3P",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "talking",
					greekWords: [
						{
							text: "talking",
							strongs: "G4814",
							OGNTsort: 23818,
							morph: "V-PAP-NPM",
							lemma: "συλλαλέω",
						},
					],
				},
				{
					englishWords: "with Jesus.",
					greekWords: [
						{
							text: "with Jesus.",
							strongs: "G2424",
							OGNTsort: 23820,
							morph: "N-DSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
			],
		},
		{
			verseNum: 5,
			verseWords: [
				{
					englishWords: "Peter",
					greekWords: [
						{
							text: "Peter",
							strongs: "G4074",
							OGNTsort: 23824,
							morph: "N-NSM-P",
							lemma: "Πέτρος",
						},
					],
				},
				{
					englishWords: "answered",
					greekWords: [
						{
							text: "answered",
							strongs: "G611",
							OGNTsort: 23822,
							morph: "V-AOP-NSM",
							lemma: "ἀποκρίνω",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "said",
					greekWords: [
						{
							text: "said",
							strongs: "G3004",
							OGNTsort: 23825,
							morph: "V-PAI-3S",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: "to Jesus,",
					greekWords: [
						{
							text: "to Jesus,",
							strongs: "G2424",
							OGNTsort: 23827,
							morph: "N-DSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
				{
					englishWords: '"Rabbi,',
					greekWords: [
						{
							text: '"Rabbi,',
							strongs: "G4461",
							OGNTsort: 23828,
							morph: "HEB-T",
							lemma: "ῥαββί",
						},
					],
				},
				{
					englishWords: "it is",
					greekWords: [
						{
							text: "it is",
							strongs: "G1510",
							OGNTsort: 23830,
							morph: "V-PAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "good",
					greekWords: [
						{
							text: "good",
							strongs: "G2570",
							OGNTsort: 23829,
							morph: "A-NSN",
							lemma: "καλός",
						},
					],
				},
				{
					englishWords: "for us",
					greekWords: [
						{
							text: "for us",
							strongs: "G1473",
							OGNTsort: 23831,
							morph: "P-1AP",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "to be",
					greekWords: [
						{
							text: "to be",
							strongs: "G1510",
							OGNTsort: 23833,
							morph: "V-PAN",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "here,",
					greekWords: [
						{
							text: "here,",
							strongs: "G5602",
							OGNTsort: 23832,
							morph: "ADV",
							lemma: "ὧδε",
						},
					],
				},
				{
					englishWords: "and so",
					greekWords: [
						{
							text: "and so",
							strongs: "G2532",
							OGNTsort: 23834,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "let us make",
					greekWords: [
						{
							text: "let us make",
							strongs: "G4160",
							OGNTsort: 23835,
							morph: "V-AAS-1P",
							lemma: "ποιέω",
						},
					],
				},
				{
					englishWords: "three",
					greekWords: [
						{
							text: "three",
							strongs: "G5140",
							OGNTsort: 23836,
							morph: "A-APF",
							lemma: "τρεῖς, τρία",
						},
					],
				},
				{
					englishWords: "shelters,",
					greekWords: [
						{
							text: "shelters,",
							strongs: "G4633",
							OGNTsort: 23837,
							morph: "N-APF",
							lemma: "σκηνή",
						},
					],
				},
				{
					englishWords: "one",
					greekWords: [
						{
							text: "one",
							strongs: "G1520",
							OGNTsort: 23839,
							morph: "A-ASF",
							lemma: "εἷς",
						},
					],
				},
				{
					englishWords: "for you,",
					greekWords: [
						{
							text: "for you,",
							strongs: "G4771",
							OGNTsort: 23838,
							morph: "P-2DS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "one",
					greekWords: [
						{
							text: "one",
							strongs: "G1520",
							OGNTsort: 23842,
							morph: "A-ASF",
							lemma: "εἷς",
						},
					],
				},
				{
					englishWords: "for Moses,",
					greekWords: [
						{
							text: "for Moses,",
							strongs: "G3475",
							OGNTsort: 23841,
							morph: "N-DSM-P",
							lemma: "Μωϋσῆς, Μωσῆς",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 23843,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "one",
					greekWords: [
						{
							text: "one",
							strongs: "G1520",
							OGNTsort: 23845,
							morph: "A-ASF",
							lemma: "εἷς",
						},
					],
				},
				{
					englishWords: 'for Elijah."',
					greekWords: [
						{
							text: 'for Elijah."',
							strongs: "G2243",
							OGNTsort: 23844,
							morph: "N-DSM-P",
							lemma: "Ἡλίας",
						},
					],
				},
			],
		},
		{
			verseNum: 6,
			verseWords: [
				{
					englishWords: "(For",
					greekWords: [
						{
							text: "(For",
							strongs: "G1063",
							OGNTsort: 23847,
							morph: "CONJ",
							lemma: "γάρ",
						},
					],
				},
				{
					englishWords: "he did not know",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "not",
								strongs: "G3756",
								OGNTsort: 23846,
								morph: "PRT-N",
								lemma: "οὐ",
							},
						},
						{
							word: {
								text: "he did not know",
								strongs: "G1492",
								OGNTsort: 23848,
								morph: "V-2LAI-3S",
								lemma: "εἴδω",
							},
						},
					],
				},
				{
					englishWords: "what",
					greekWords: [
						{
							text: "what",
							strongs: "G5101",
							OGNTsort: 23849,
							morph: "I-ASN",
							lemma: "τίς",
						},
					],
				},
				{
					englishWords: "to say,",
					greekWords: [
						{
							text: "to say,",
							strongs: "G611",
							OGNTsort: 23850,
							morph: "V-AOS-3S",
							lemma: "ἀποκρίνω",
						},
					],
				},
				{
					englishWords: "for",
					greekWords: [
						{
							text: "for",
							strongs: "G1063",
							OGNTsort: 23852,
							morph: "CONJ",
							lemma: "γάρ",
						},
					],
				},
				{
					englishWords: "they were",
					greekWords: [
						{
							text: "they were",
							strongs: "G1096",
							OGNTsort: 23853,
							morph: "V-2ADI-3P",
							lemma: "γίνομαι",
						},
					],
				},
				{
					englishWords: "terrified.)",
					greekWords: [
						{
							text: "terrified.)",
							strongs: "G1630",
							OGNTsort: 23851,
							morph: "A-NPM",
							lemma: "ἔκφοβος",
						},
					],
				},
			],
		},
		{
			verseNum: 7,
			verseWords: [
				{
					englishWords: "A cloud",
					greekWords: [
						{
							text: "A cloud",
							strongs: "G3507",
							OGNTsort: 23856,
							morph: "N-NSF",
							lemma: "νεφέλη",
						},
					],
				},
				{
					englishWords: "came",
					greekWords: [
						{
							text: "came",
							strongs: "G1096",
							OGNTsort: 23855,
							morph: "V-2ADI-3S",
							lemma: "γίνομαι",
						},
					],
				},
				{
					englishWords: "and overshadowed",
					greekWords: [
						{
							text: "and overshadowed",
							strongs: "G1982",
							OGNTsort: 23857,
							morph: "V-PAP-NSF",
							lemma: "ἐπισκιάζω",
						},
					],
				},
				{
					englishWords: "them.",
					greekWords: [
						{
							text: "them.",
							strongs: "G846",
							OGNTsort: 23858,
							morph: "P-DPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "Then",
					greekWords: [
						{
							text: "Then",
							strongs: "G2532",
							OGNTsort: 23859,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "a voice",
					greekWords: [
						{
							text: "a voice",
							strongs: "G5456",
							OGNTsort: 23861,
							morph: "N-NSF",
							lemma: "φωνή",
						},
					],
				},
				{
					englishWords: "came",
					greekWords: [
						{
							text: "came",
							strongs: "G1096",
							OGNTsort: 23860,
							morph: "V-2ADI-3S",
							lemma: "γίνομαι",
						},
					],
				},
				{
					englishWords: "out of",
					greekWords: [
						{
							text: "out of",
							strongs: "G1537",
							OGNTsort: 23862,
							morph: "PREP",
							lemma: "ἐκ",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 23863,
							morph: "T-GSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "cloud,",
					greekWords: [
						{
							text: "cloud,",
							strongs: "G3507",
							OGNTsort: 23864,
							morph: "N-GSF",
							lemma: "νεφέλη",
						},
					],
				},
				{
					englishWords: '"This',
					greekWords: [
						{
							text: '"This',
							strongs: "G3778",
							OGNTsort: 23865,
							morph: "D-NSM",
							lemma: "οὗτος",
						},
					],
				},
				{
					englishWords: "is",
					greekWords: [
						{
							text: "is",
							strongs: "G1510",
							OGNTsort: 23866,
							morph: "V-PAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "my",
					greekWords: [
						{
							text: "my",
							strongs: "G1473",
							OGNTsort: 23869,
							morph: "P-1GS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "beloved",
					greekWords: [
						{
							text: "beloved",
							strongs: "G27",
							OGNTsort: 23871,
							morph: "A-NSM",
							lemma: "ἀγαπητός",
						},
					],
				},
				{
					englishWords: "Son.",
					greekWords: [
						{
							text: "Son.",
							strongs: "G5207",
							OGNTsort: 23868,
							morph: "N-NSM",
							lemma: "υἱός",
						},
					],
				},
				{
					englishWords: "Listen to",
					greekWords: [
						{
							text: "Listen to",
							strongs: "G191",
							OGNTsort: 23872,
							morph: "V-PAM-2P",
							lemma: "ἀκούω",
						},
					],
				},
				{
					englishWords: 'him."',
					greekWords: [
						{
							text: 'him."',
							strongs: "G846",
							OGNTsort: 23873,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
			],
		},
		{
			verseNum: 8,
			verseWords: [
				{
					englishWords: "Suddenly,",
					greekWords: [
						{
							text: "Suddenly,",
							strongs: "G1819",
							OGNTsort: 23875,
							morph: "ADV",
							lemma: "ἐξάπινα",
						},
					],
				},
				{
					englishWords: "when they looked around,",
					greekWords: [
						{
							text: "when they looked around,",
							strongs: "G4017",
							OGNTsort: 23876,
							morph: "V-AMP-NPM",
							lemma: "περιβλέπω",
						},
					],
				},
				{
					englishWords: "they no longer saw",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "no longer",
								strongs: "G3765",
								OGNTsort: 23877,
								morph: "ADV",
								lemma: "οὐκέτι",
							},
						},
						{
							word: {
								text: "they no longer saw",
								strongs: "G1492",
								OGNTsort: 23879,
								morph: "V-2AAI-3P",
								lemma: "εἴδω",
							},
						},
					],
				},
				{
					englishWords: "anyone",
					phraseWords: [
						{
							text: "√",
							strongs: "G3762",
							OGNTsort: 23878,
							phraseWords: "anyone",
							morph: "A-ASM",
							lemma: "οὐδείς",
						},
					],
					subWords: [],
				},
				{
					englishWords: "with",
					greekWords: [
						{
							text: "with",
							strongs: "G3326",
							OGNTsort: 23884,
							morph: "PREP",
							lemma: "μετά",
						},
					],
				},
				{
					englishWords: "them,",
					greekWords: [
						{
							text: "them,",
							strongs: "G1438",
							OGNTsort: 23885,
							morph: "F-3GPM",
							lemma: "ἑαυτοῦ",
						},
					],
				},
				{
					englishWords: "but",
					greekWords: [
						{
							text: "but",
							strongs: "G235",
							OGNTsort: 23880,
							morph: "CONJ",
							lemma: "ἀλλά",
						},
					],
				},
				{
					englishWords: "only",
					greekWords: [
						{
							text: "only",
							strongs: "G3441",
							OGNTsort: 23883,
							morph: "A-ASM",
							lemma: "μόνος",
						},
					],
				},
				{
					englishWords: "Jesus.",
					greekWords: [
						{
							text: "Jesus.",
							strongs: "G2424",
							OGNTsort: 23882,
							morph: "N-ASM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
			],
		},
		{
			verseNum: 9,
			verseWords: [
				{
					englishWords: "As they were coming down",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "they",
								strongs: "G846",
								OGNTsort: 23888,
								morph: "P-GPM",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: "As they were coming down",
								strongs: "G2597",
								OGNTsort: 23887,
								morph: "V-PAP-GPM",
								lemma: "καταβαίνω",
							},
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 23890,
							morph: "T-GSN",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "mountain,",
					greekWords: [
						{
							text: "mountain,",
							strongs: "G3735",
							OGNTsort: 23891,
							morph: "N-GSN",
							lemma: "ὄρος",
						},
					],
				},
				{
					englishWords: "he commanded",
					greekWords: [
						{
							text: "he commanded",
							strongs: "G1291",
							OGNTsort: 23892,
							morph: "V-AMI-3S",
							lemma: "διαστέλλω",
						},
					],
				},
				{
					englishWords: "them",
					greekWords: [
						{
							text: "them",
							strongs: "G846",
							OGNTsort: 23893,
							morph: "P-DPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "to tell",
					phraseWords: [
						{
							text: "√",
							strongs: "G2443",
							OGNTsort: 23894,
							phraseWords: "to tell",
							morph: "CONJ",
							lemma: "ἵνα",
						},
						{
							text: "√",
							strongs: "G1334",
							OGNTsort: 23898,
							phraseWords: "to tell",
							morph: "V-ADS-3P",
							lemma: "διηγέομαι",
						},
					],
					subWords: [],
				},
				{
					englishWords: "no one",
					greekWords: [
						{
							text: "no one",
							strongs: "G3367",
							OGNTsort: 23895,
							morph: "A-DSM",
							lemma: "μηδείς",
						},
					],
				},
				{
					englishWords: "what",
					greekWords: [
						{
							text: "what",
							strongs: "G3739",
							OGNTsort: 23896,
							morph: "R-APN",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "they had seen",
					greekWords: [
						{
							text: "they had seen",
							strongs: "G1492",
							OGNTsort: 23897,
							morph: "V-2AAI-3P",
							lemma: "εἴδω",
						},
					],
				},
				{
					englishWords: "until",
					phraseWords: [
						{
							text: "√",
							strongs: "G1487",
							OGNTsort: 23899,
							phraseWords: "until",
							morph: "CONJ",
							lemma: "εἰ",
						},
						{
							text: "√",
							strongs: "G3361",
							OGNTsort: 23900,
							phraseWords: "until",
							morph: "PRT-N",
							lemma: "μή",
						},
						{
							text: "√",
							strongs: "G3752",
							OGNTsort: 23901,
							phraseWords: "until",
							morph: "CONJ",
							lemma: "ὅταν",
						},
					],
					subWords: [],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 23902,
							morph: "T-NSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "Son",
					greekWords: [
						{
							text: "Son",
							strongs: "G5207",
							OGNTsort: 23903,
							morph: "N-NSM",
							lemma: "υἱός",
						},
					],
				},
				{
					englishWords: "of Man",
					greekWords: [
						{
							text: "of Man",
							strongs: "G444",
							OGNTsort: 23905,
							morph: "N-GSM",
							lemma: "ἄνθρωπος",
						},
					],
				},
				{
					englishWords: "had risen",
					greekWords: [
						{
							text: "had risen",
							strongs: "G450",
							OGNTsort: 23908,
							morph: "V-2AAS-3S",
							lemma: "ἀνίστημι",
						},
					],
				},
				{
					englishWords: "from",
					greekWords: [
						{
							text: "from",
							strongs: "G1537",
							OGNTsort: 23906,
							morph: "PREP",
							lemma: "ἐκ",
						},
					],
				},
				{
					englishWords: "the dead.",
					greekWords: [
						{
							text: "the dead.",
							strongs: "G3498",
							OGNTsort: 23907,
							morph: "A-GPM",
							lemma: "νεκρός",
						},
					],
				},
			],
		},
		{
			verseNum: 10,
			verseWords: [
				{
					englishWords: "So",
					greekWords: [
						{
							text: "So",
							strongs: "G2532",
							OGNTsort: 23909,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords:
						"they kept the matter to themselves,",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "the",
								strongs: "G3588",
								OGNTsort: 23910,
								morph: "T-ASM",
								lemma: "ὁ",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "matter",
								strongs: "G3056",
								OGNTsort: 23911,
								morph: "N-ASM",
								lemma: "λόγος",
							},
						},
						{
							word: {
								text: "they kept the matter to themselves,",
								strongs: "G2902",
								OGNTsort: 23912,
								morph: "V-AAI-3P",
								lemma: "κρατέω",
							},
						},
					],
				},
				{ englishWords: "but" },
				{
					englishWords: "they discussed",
					greekWords: [
						{
							text: "they discussed",
							strongs: "G4802",
							OGNTsort: 23915,
							morph: "V-PAP-NPM",
							lemma: "συζητέω",
						},
					],
				},
				{
					englishWords: "among",
					greekWords: [
						{
							text: "among",
							strongs: "G4314",
							OGNTsort: 23913,
							morph: "PREP",
							lemma: "πρός",
						},
					],
				},
				{
					englishWords: "themselves",
					greekWords: [
						{
							text: "themselves",
							strongs: "G1438",
							OGNTsort: 23914,
							morph: "F-3APM",
							lemma: "ἑαυτοῦ",
						},
					],
				},
				{
					englishWords: "what",
					greekWords: [
						{
							text: "what",
							strongs: "G5101",
							OGNTsort: 23916,
							morph: "I-NSN",
							lemma: "τίς",
						},
					],
				},
				{
					englishWords: '"rising',
					greekWords: [
						{
							text: '"rising',
							strongs: "G450",
							OGNTsort: 23921,
							morph: "V-2AAN",
							lemma: "ἀνίστημι",
						},
					],
				},
				{
					englishWords: "from",
					greekWords: [
						{
							text: "from",
							strongs: "G1537",
							OGNTsort: 23919,
							morph: "PREP",
							lemma: "ἐκ",
						},
					],
				},
				{
					englishWords: 'the dead"',
					greekWords: [
						{
							text: 'the dead"',
							strongs: "G3498",
							OGNTsort: 23920,
							morph: "A-GPM",
							lemma: "νεκρός",
						},
					],
				},
				{
					englishWords: "could mean.",
					greekWords: [
						{
							text: "could mean.",
							strongs: "G1510",
							OGNTsort: 23917,
							morph: "V-PAI-3S",
							lemma: "εἰμί",
						},
					],
				},
			],
		},
		{
			verseNum: 11,
			verseWords: [
				{
					englishWords: "They asked",
					greekWords: [
						{
							text: "They asked",
							strongs: "G1905",
							OGNTsort: 23923,
							morph: "V-IAI-3P",
							lemma: "ἐπερωτάω",
						},
					],
				},
				{
					englishWords: "him,",
					greekWords: [
						{
							text: "him,",
							strongs: "G846",
							OGNTsort: 23924,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
				{ englishWords: '"Why' },
				{
					englishWords: "do the scribes say",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "the",
								strongs: "G3588",
								OGNTsort: 23928,
								morph: "T-NPM",
								lemma: "ὁ",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "scribes",
								strongs: "G1122",
								OGNTsort: 23929,
								morph: "N-NPM",
								lemma: "γραμματεύς",
							},
						},
						{
							word: {
								text: "do the scribes say",
								strongs: "G3004",
								OGNTsort: 23927,
								morph: "V-PAI-3P",
								lemma: "λέγω",
							},
						},
					],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G3754",
							OGNTsort: 23930,
							morph: "CONJ",
							lemma: "ὅτι",
						},
					],
				},
				{
					englishWords: "Elijah",
					greekWords: [
						{
							text: "Elijah",
							strongs: "G2243",
							OGNTsort: 23931,
							morph: "N-ASM-P",
							lemma: "Ἡλίας",
						},
					],
				},
				{
					englishWords: "must",
					greekWords: [
						{
							text: "must",
							strongs: "G1210",
							OGNTsort: 23932,
							morph: "V-PAI-3S",
							lemma: "δέω",
						},
					],
				},
				{
					englishWords: "come",
					greekWords: [
						{
							text: "come",
							strongs: "G2064",
							OGNTsort: 23933,
							morph: "V-2AAN",
							lemma: "ἔρχομαι",
						},
					],
				},
				{
					englishWords: 'first?"',
					greekWords: [
						{
							text: 'first?"',
							strongs: "G4413",
							OGNTsort: 23934,
							morph: "A-ASN",
							lemma: "πρῶτος",
						},
					],
				},
			],
		},
		{
			verseNum: 12,
			verseWords: [
				{
					englishWords: "He",
					greekWords: [
						{
							text: "He",
							strongs: "G3588",
							OGNTsort: 23935,
							morph: "T-NSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "said",
					greekWords: [
						{
							text: "said",
							strongs: "G5346",
							OGNTsort: 23937,
							morph: "V-IAI-3S",
							lemma: "φημί",
						},
					],
				},
				{
					englishWords: "to them,",
					greekWords: [
						{
							text: "to them,",
							strongs: "G846",
							OGNTsort: 23938,
							morph: "P-DPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: '"Elijah',
					greekWords: [
						{
							text: '"Elijah',
							strongs: "G2243",
							OGNTsort: 23939,
							morph: "N-NSM-P",
							lemma: "Ἡλίας",
						},
					],
				},
				{
					englishWords: "does come",
					greekWords: [
						{
							text: "does come",
							strongs: "G2064",
							OGNTsort: 23941,
							morph: "V-2AAP-NSM",
							lemma: "ἔρχομαι",
						},
					],
				},
				{
					englishWords: "first",
					greekWords: [
						{
							text: "first",
							strongs: "G4413",
							OGNTsort: 23942,
							morph: "A-ASN",
							lemma: "πρῶτος",
						},
					],
				},
				{
					englishWords: "to restore",
					greekWords: [
						{
							text: "to restore",
							strongs: "G600",
							OGNTsort: 23943,
							morph: "V-PAI-3S",
							lemma: "ἀποκαθίστημι",
						},
					],
				},
				{
					englishWords: "all things.",
					greekWords: [
						{
							text: "all things.",
							strongs: "G3956",
							OGNTsort: 23944,
							morph: "A-APN",
							lemma: "πᾶς",
						},
					],
				},
				{
					englishWords: "Why",
					greekWords: [
						{
							text: "Why",
							strongs: "G4459",
							OGNTsort: 23946,
							morph: "ADV",
							lemma: "πως",
						},
					],
				},
				{
					englishWords: "then",
					greekWords: [
						{
							text: "then",
							strongs: "G2532",
							OGNTsort: 23945,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "is it written",
					greekWords: [
						{
							text: "is it written",
							strongs: "G1125",
							OGNTsort: 23947,
							morph: "V-RPI-3S",
							lemma: "γράφω",
						},
					],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G2443",
							OGNTsort: 23953,
							morph: "CONJ",
							lemma: "ἵνα",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 23949,
							morph: "T-ASM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "Son",
					greekWords: [
						{
							text: "Son",
							strongs: "G5207",
							OGNTsort: 23950,
							morph: "N-ASM",
							lemma: "υἱός",
						},
					],
				},
				{
					englishWords: "of Man",
					greekWords: [
						{
							text: "of Man",
							strongs: "G444",
							OGNTsort: 23952,
							morph: "N-GSM",
							lemma: "ἄνθρωπος",
						},
					],
				},
				{
					englishWords: "must suffer",
					greekWords: [
						{
							text: "must suffer",
							strongs: "G3958",
							OGNTsort: 23955,
							morph: "V-2AAS-3S",
							lemma: "πάσχω",
						},
					],
				},
				{
					englishWords: "many things",
					greekWords: [
						{
							text: "many things",
							strongs: "G4183",
							OGNTsort: 23954,
							morph: "A-APN",
							lemma: "πολύς",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 23956,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "be despised?",
					greekWords: [
						{
							text: "be despised?",
							strongs: "G1847",
							OGNTsort: 23957,
							morph: "V-APS-3S",
							lemma: "ἐξουδενόω",
						},
					],
				},
			],
		},
		{
			verseNum: 13,
			verseWords: [
				{
					englishWords: "But",
					greekWords: [
						{
							text: "But",
							strongs: "G235",
							OGNTsort: 23958,
							morph: "CONJ",
							lemma: "ἀλλά",
						},
					],
				},
				{
					englishWords: "I say",
					greekWords: [
						{
							text: "I say",
							strongs: "G3004",
							OGNTsort: 23959,
							morph: "V-PAI-1S",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: "to you",
					greekWords: [
						{
							text: "to you",
							strongs: "G4771",
							OGNTsort: 23960,
							morph: "P-2DP",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G3754",
							OGNTsort: 23961,
							morph: "CONJ",
							lemma: "ὅτι",
						},
					],
				},
				{
					englishWords: "Elijah",
					greekWords: [
						{
							text: "Elijah",
							strongs: "G2243",
							OGNTsort: 23963,
							morph: "N-NSM-P",
							lemma: "Ἡλίας",
						},
					],
				},
				{
					englishWords: "has come,",
					greekWords: [
						{
							text: "has come,",
							strongs: "G2064",
							OGNTsort: 23964,
							morph: "V-2RAI-3S",
							lemma: "ἔρχομαι",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 23965,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "they did",
					greekWords: [
						{
							text: "they did",
							strongs: "G4160",
							OGNTsort: 23966,
							morph: "V-AAI-3P",
							lemma: "ποιέω",
						},
					],
				},
				{
					englishWords: "whatever",
					greekWords: [
						{
							text: "whatever",
							strongs: "G3745",
							OGNTsort: 23968,
							morph: "K-APN",
							lemma: "ὅσος",
						},
					],
				},
				{
					englishWords: "they wanted",
					greekWords: [
						{
							text: "they wanted",
							strongs: "G2309",
							OGNTsort: 23969,
							morph: "V-IAI-3P",
							lemma: "θέλω",
						},
					],
				},
				{
					englishWords: "to him,",
					greekWords: [
						{
							text: "to him,",
							strongs: "G846",
							OGNTsort: 23967,
							morph: "P-DSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "just as",
					greekWords: [
						{
							text: "just as",
							strongs: "G2531",
							OGNTsort: 23970,
							morph: "CONJ",
							lemma: "καθώς",
						},
					],
				},
				{
					englishWords: "it is written",
					greekWords: [
						{
							text: "it is written",
							strongs: "G1125",
							OGNTsort: 23971,
							morph: "V-RPI-3S",
							lemma: "γράφω",
						},
					],
				},
				{
					englishWords: "about",
					greekWords: [
						{
							text: "about",
							strongs: "G1909",
							OGNTsort: 23972,
							morph: "PREP",
							lemma: "ἐπί",
						},
					],
				},
				{
					englishWords: 'him."',
					greekWords: [
						{
							text: 'him."',
							strongs: "G846",
							OGNTsort: 23973,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
			],
		},
		{
			verseNum: 14,
			verseWords: [
				{
					englishWords: "When they came",
					greekWords: [
						{
							text: "When they came",
							strongs: "G2064",
							OGNTsort: 23975,
							morph: "V-2AAP-NPM",
							lemma: "ἔρχομαι",
						},
					],
				},
				{
					englishWords: "to",
					greekWords: [
						{
							text: "to",
							strongs: "G4314",
							OGNTsort: 23976,
							morph: "PREP",
							lemma: "πρός",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 23977,
							morph: "T-APM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "disciples,",
					greekWords: [
						{
							text: "disciples,",
							strongs: "G3101",
							OGNTsort: 23978,
							morph: "N-APM",
							lemma: "μαθητής",
						},
					],
				},
				{
					englishWords: "they saw",
					greekWords: [
						{
							text: "they saw",
							strongs: "G1492",
							OGNTsort: 23979,
							morph: "V-2AAI-3P",
							lemma: "εἴδω",
						},
					],
				},
				{
					englishWords: "a great",
					greekWords: [
						{
							text: "a great",
							strongs: "G4183",
							OGNTsort: 23981,
							morph: "A-ASM",
							lemma: "πολύς",
						},
					],
				},
				{
					englishWords: "crowd",
					greekWords: [
						{
							text: "crowd",
							strongs: "G3793",
							OGNTsort: 23980,
							morph: "N-ASM",
							lemma: "ὄχλος",
						},
					],
				},
				{
					englishWords: "around",
					greekWords: [
						{
							text: "around",
							strongs: "G4012",
							OGNTsort: 23982,
							morph: "PREP",
							lemma: "περί",
						},
					],
				},
				{
					englishWords: "them,",
					greekWords: [
						{
							text: "them,",
							strongs: "G846",
							OGNTsort: 23983,
							morph: "P-APM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 23984,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "scribes",
					greekWords: [
						{
							text: "scribes",
							strongs: "G1122",
							OGNTsort: 23985,
							morph: "N-APM",
							lemma: "γραμματεύς",
						},
					],
				},
				{
					englishWords: "were arguing",
					greekWords: [
						{
							text: "were arguing",
							strongs: "G4802",
							OGNTsort: 23986,
							morph: "V-PAP-APM",
							lemma: "συζητέω",
						},
					],
				},
				{
					englishWords: "with",
					greekWords: [
						{
							text: "with",
							strongs: "G4314",
							OGNTsort: 23987,
							morph: "PREP",
							lemma: "πρός",
						},
					],
				},
				{
					englishWords: "them.",
					greekWords: [
						{
							text: "them.",
							strongs: "G846",
							OGNTsort: 23988,
							morph: "P-APM",
							lemma: "αὐτός",
						},
					],
				},
			],
		},
		{
			verseNum: 15,
			verseWords: [
				{
					englishWords: "As soon as",
					greekWords: [
						{
							text: "As soon as",
							strongs: "G2112",
							OGNTsort: 23990,
							morph: "ADV",
							lemma: "εὐθέως",
						},
					],
				},
				{
					englishWords: "they saw",
					greekWords: [
						{
							text: "they saw",
							strongs: "G1492",
							OGNTsort: 23994,
							morph: "V-2AAP-NPM",
							lemma: "εἴδω",
						},
					],
				},
				{ englishWords: "Jesus," },
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 23992,
							morph: "T-NSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "whole",
					greekWords: [
						{
							text: "whole",
							strongs: "G3956",
							OGNTsort: 23991,
							morph: "A-NSM",
							lemma: "πᾶς",
						},
					],
				},
				{
					englishWords: "crowd",
					greekWords: [
						{
							text: "crowd",
							strongs: "G3793",
							OGNTsort: 23993,
							morph: "N-NSM",
							lemma: "ὄχλος",
						},
					],
				},
				{
					englishWords: "was amazed",
					greekWords: [
						{
							text: "was amazed",
							strongs: "G1568",
							OGNTsort: 23996,
							morph: "V-API-3P",
							lemma: "ἐκθαμβέω",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 23997,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "as they ran up",
					greekWords: [
						{
							text: "as they ran up",
							strongs: "G4370",
							OGNTsort: 23998,
							morph: "V-PAP-NPM",
							lemma: "προστρέχω",
						},
					],
				},
				{ englishWords: "to him" },
				{
					englishWords: "they greeted",
					greekWords: [
						{
							text: "they greeted",
							strongs: "G782",
							OGNTsort: 23999,
							morph: "V-INI-3P",
							lemma: "ἀσπάζομαι",
						},
					],
				},
				{
					englishWords: "him.",
					greekWords: [
						{
							text: "him.",
							strongs: "G846",
							OGNTsort: 24000,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
			],
		},
		{
			verseNum: 16,
			verseWords: [
				{
					englishWords: "He asked",
					greekWords: [
						{
							text: "He asked",
							strongs: "G1905",
							OGNTsort: 24002,
							morph: "V-AAI-3S",
							lemma: "ἐπερωτάω",
						},
					],
				},
				{ englishWords: "his disciples," },
				{
					englishWords: '"What',
					greekWords: [
						{
							text: '"What',
							strongs: "G5101",
							OGNTsort: 24004,
							morph: "I-ASN",
							lemma: "τίς",
						},
					],
				},
				{
					englishWords: 'are you arguing with them about?"',
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "with",
								strongs: "G4314",
								OGNTsort: 24006,
								morph: "PREP",
								lemma: "πρός",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "them",
								strongs: "G846",
								OGNTsort: 24007,
								morph: "P-APM",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: 'are you arguing with them about?"',
								strongs: "G4802",
								OGNTsort: 24005,
								morph: "V-PAI-2P",
								lemma: "συζητέω",
							},
						},
					],
				},
			],
		},
		{
			verseNum: 17,
			verseWords: [
				{
					englishWords: "Someone",
					greekWords: [
						{
							text: "Someone",
							strongs: "G1520",
							OGNTsort: 24011,
							morph: "A-NSM",
							lemma: "εἷς",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1537",
							OGNTsort: 24012,
							morph: "PREP",
							lemma: "ἐκ",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 24013,
							morph: "T-GSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "crowd",
					greekWords: [
						{
							text: "crowd",
							strongs: "G3793",
							OGNTsort: 24014,
							morph: "N-GSM",
							lemma: "ὄχλος",
						},
					],
				},
				{
					englishWords: "answered",
					greekWords: [
						{
							text: "answered",
							strongs: "G611",
							OGNTsort: 24009,
							morph: "V-ADI-3S",
							lemma: "ἀποκρίνω",
						},
					],
				},
				{
					englishWords: "him,",
					greekWords: [
						{
							text: "him,",
							strongs: "G846",
							OGNTsort: 24010,
							morph: "P-DSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: '"Teacher,',
					greekWords: [
						{
							text: '"Teacher,',
							strongs: "G1320",
							OGNTsort: 24015,
							morph: "N-VSM",
							lemma: "διδάσκαλος",
						},
					],
				},
				{
					englishWords: "I brought",
					greekWords: [
						{
							text: "I brought",
							strongs: "G5342",
							OGNTsort: 24016,
							morph: "V-AAI-1S",
							lemma: "φέρω",
						},
					],
				},
				{
					englishWords: "my",
					greekWords: [
						{
							text: "my",
							strongs: "G1473",
							OGNTsort: 24019,
							morph: "P-1GS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "son",
					greekWords: [
						{
							text: "son",
							strongs: "G5207",
							OGNTsort: 24018,
							morph: "N-ASM",
							lemma: "υἱός",
						},
					],
				},
				{
					englishWords: "to",
					greekWords: [
						{
							text: "to",
							strongs: "G4314",
							OGNTsort: 24020,
							morph: "PREP",
							lemma: "πρός",
						},
					],
				},
				{
					englishWords: "you.",
					greekWords: [
						{
							text: "you.",
							strongs: "G4771",
							OGNTsort: 24021,
							morph: "P-2AS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "He has",
					greekWords: [
						{
							text: "He has",
							strongs: "G2192",
							OGNTsort: 24022,
							morph: "V-PAP-ASM",
							lemma: "ἔχω",
						},
					],
				},
				{
					englishWords: "a spirit",
					greekWords: [
						{
							text: "a spirit",
							strongs: "G4151",
							OGNTsort: 24023,
							morph: "N-ASN",
							lemma: "πνεῦμα",
						},
					],
				},
				{ englishWords: "that makes him" },
				{
					englishWords: "unable to speak.",
					greekWords: [
						{
							text: "unable to speak.",
							strongs: "G216",
							OGNTsort: 24024,
							morph: "A-ASN",
							lemma: "ἄλαλος",
						},
					],
				},
			],
		},
		{
			verseNum: 18,
			verseWords: [
				{
					englishWords: "It seizes",
					greekWords: [
						{
							text: "It seizes",
							strongs: "G2638",
							OGNTsort: 24029,
							morph: "V-2AAS-3S",
							lemma: "καταλαμβάνω",
						},
					],
				},
				{
					englishWords: "him",
					greekWords: [
						{
							text: "him",
							strongs: "G846",
							OGNTsort: 24028,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "it throws him down,",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "him",
								strongs: "G846",
								OGNTsort: 24031,
								morph: "P-ASM",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: "it throws him down,",
								strongs: "G4486",
								OGNTsort: 24030,
								morph: "V-PAI-3S",
								lemma: "ῥήγνυμι",
							},
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 24032,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "he foams at the mouth,",
					greekWords: [
						{
							text: "he foams at the mouth,",
							strongs: "G875",
							OGNTsort: 24033,
							morph: "V-PAI-3S",
							lemma: "ἀφρίζω",
						},
					],
				},
				{
					englishWords: "grinds",
					greekWords: [
						{
							text: "grinds",
							strongs: "G5149",
							OGNTsort: 24035,
							morph: "V-PAI-3S",
							lemma: "τρίζω",
						},
					],
				},
				{ englishWords: "his" },
				{
					englishWords: "teeth,",
					greekWords: [
						{
							text: "teeth,",
							strongs: "G3599",
							OGNTsort: 24037,
							morph: "N-APM",
							lemma: "ὀδούς",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 24038,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "becomes rigid.",
					greekWords: [
						{
							text: "becomes rigid.",
							strongs: "G3583",
							OGNTsort: 24039,
							morph: "V-PPI-3S",
							lemma: "ξηραίνω",
						},
					],
				},
				{
					englishWords: "I asked",
					greekWords: [
						{
							text: "I asked",
							strongs: "G2036",
							OGNTsort: 24041,
							morph: "V-2AAI-1S",
							lemma: "ἔπω, ἐρῶ, εἶπον",
						},
					],
				},
				{
					englishWords: "your",
					greekWords: [
						{
							text: "your",
							strongs: "G4771",
							OGNTsort: 24044,
							morph: "P-2GS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "disciples",
					greekWords: [
						{
							text: "disciples",
							strongs: "G3101",
							OGNTsort: 24043,
							morph: "N-DPM",
							lemma: "μαθητής",
						},
					],
				},
				{
					englishWords: "to drive [2] out",
					phraseWords: [
						{
							text: "√",
							strongs: "G2443",
							OGNTsort: 24045,
							phraseWords: "to drive [2] out",
							morph: "CONJ",
							lemma: "ἵνα",
						},
						{
							text: "√",
							strongs: "G1544",
							OGNTsort: 24047,
							phraseWords: "to drive [2] out",
							morph: "V-2AAS-3P",
							lemma: "ἐκβάλλω",
						},
					],
					subWords: [],
				},
				{ englishWords: "of him," },
				{
					englishWords: "but",
					greekWords: [
						{
							text: "but",
							strongs: "G2532",
							OGNTsort: 24048,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "they could",
					greekWords: [
						{
							text: "they could",
							strongs: "G2480",
							OGNTsort: 24050,
							morph: "V-AAI-3P",
							lemma: "ἰσχύω",
						},
					],
				},
				{
					englishWords: 'not."',
					greekWords: [
						{
							text: 'not."',
							strongs: "G3756",
							OGNTsort: 24049,
							morph: "PRT-N",
							lemma: "οὐ",
						},
					],
				},
			],
		},
		{
			verseNum: 19,
			verseWords: [
				{
					englishWords: "He",
					greekWords: [
						{
							text: "He",
							strongs: "G3588",
							OGNTsort: 24051,
							morph: "T-NSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "answered",
					greekWords: [
						{
							text: "answered",
							strongs: "G611",
							OGNTsort: 24053,
							morph: "V-AOP-NSM",
							lemma: "ἀποκρίνω",
						},
					],
				},
				{
					englishWords: "them,",
					greekWords: [
						{
							text: "them,",
							strongs: "G846",
							OGNTsort: 24054,
							morph: "P-DPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: '"Unbelieving',
					greekWords: [
						{
							text: '"Unbelieving',
							strongs: "G571",
							OGNTsort: 24058,
							morph: "A-VSF",
							lemma: "ἄπιστος",
						},
					],
				},
				{
					englishWords: "generation,",
					greekWords: [
						{
							text: "generation,",
							strongs: "G1074",
							OGNTsort: 24057,
							morph: "N-VSF",
							lemma: "γενεά",
						},
					],
				},
				{
					englishWords: "how long",
					phraseWords: [
						{
							text: "√",
							strongs: "G2193",
							OGNTsort: 24059,
							phraseWords: "how long",
							morph: "PREP",
							lemma: "ἕως",
						},
						{
							text: "√",
							strongs: "G4219",
							OGNTsort: 24060,
							phraseWords: "how long",
							morph: "PRT-I",
							lemma: "πότε",
						},
					],
					subWords: [],
				},
				{
					englishWords: "will I have to stay",
					subWords: [
						{ subIdx: "[1]", word: { text: "have to" } },
						{
							word: {
								text: "will I have to stay",
								strongs: "G1510",
								OGNTsort: 24063,
								morph: "V-FDI-1S",
								lemma: "εἰμί",
							},
						},
					],
				},
				{
					englishWords: "with",
					greekWords: [
						{
							text: "with",
							strongs: "G4314",
							OGNTsort: 24061,
							morph: "PREP",
							lemma: "πρός",
						},
					],
				},
				{
					englishWords: "you?",
					greekWords: [
						{
							text: "you?",
							strongs: "G4771",
							OGNTsort: 24062,
							morph: "P-2AP",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "How long",
					phraseWords: [
						{
							text: "√",
							strongs: "G2193",
							OGNTsort: 24064,
							phraseWords: "How long",
							morph: "PREP",
							lemma: "ἕως",
						},
						{
							text: "√",
							strongs: "G4219",
							OGNTsort: 24065,
							phraseWords: "How long",
							morph: "PRT-I",
							lemma: "πότε",
						},
					],
					subWords: [],
				},
				{
					englishWords: "will I bear",
					greekWords: [
						{
							text: "will I bear",
							strongs: "G430",
							OGNTsort: 24066,
							morph: "V-FDI-1S",
							lemma: "ἀνέχω",
						},
					],
				},
				{
					englishWords: "with you?",
					greekWords: [
						{
							text: "with you?",
							strongs: "G4771",
							OGNTsort: 24067,
							morph: "P-2GP",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "Bring",
					greekWords: [
						{
							text: "Bring",
							strongs: "G5342",
							OGNTsort: 24068,
							morph: "V-PAM-2P",
							lemma: "φέρω",
						},
					],
				},
				{
					englishWords: "him",
					greekWords: [
						{
							text: "him",
							strongs: "G846",
							OGNTsort: 24069,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "to",
					greekWords: [
						{
							text: "to",
							strongs: "G4314",
							OGNTsort: 24070,
							morph: "PREP",
							lemma: "πρός",
						},
					],
				},
				{
					englishWords: 'me."',
					greekWords: [
						{
							text: 'me."',
							strongs: "G1473",
							OGNTsort: 24071,
							morph: "P-1AS",
							lemma: "ἐγώ",
						},
					],
				},
			],
		},
		{
			verseNum: 20,
			verseWords: [
				{
					englishWords: "They brought",
					greekWords: [
						{
							text: "They brought",
							strongs: "G5342",
							OGNTsort: 24073,
							morph: "V-AAI-3P",
							lemma: "φέρω",
						},
					],
				},
				{ englishWords: "the boy" },
				{
					englishWords: "to",
					greekWords: [
						{
							text: "to",
							strongs: "G4314",
							OGNTsort: 24075,
							morph: "PREP",
							lemma: "πρός",
						},
					],
				},
				{
					englishWords: "him.",
					greekWords: [
						{
							text: "him.",
							strongs: "G846",
							OGNTsort: 24076,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "When the spirit saw",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "the",
								strongs: "G3588",
								OGNTsort: 24080,
								morph: "T-NSN",
								lemma: "ὁ",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "spirit",
								strongs: "G4151",
								OGNTsort: 24081,
								morph: "N-NSN",
								lemma: "πνεῦμα",
							},
						},
						{
							word: {
								text: "When the spirit saw",
								strongs: "G1492",
								OGNTsort: 24078,
								morph: "V-2AAP-NSM",
								lemma: "εἴδω",
							},
						},
					],
				},
				{ englishWords: "Jesus," },
				{
					englishWords:
						"it immediately threw him into a convulsion.",
					subWords: [
						{
							subIdx: "[3]",
							word: {
								text: "immediately",
								strongs: "G2112",
								OGNTsort: 24082,
								morph: "ADV",
								lemma: "εὐθέως",
							},
						},
						{
							subIdx: "[4]",
							word: {
								text: "him",
								strongs: "G846",
								OGNTsort: 24084,
								morph: "P-ASM",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: "it immediately threw him into a convulsion.",
								strongs: "G4952",
								OGNTsort: 24083,
								morph: "V-AAI-3S",
								lemma: "συσπαράσσω",
							},
						},
					],
				},
				{ englishWords: "The boy" },
				{
					englishWords: "fell",
					greekWords: [
						{
							text: "fell",
							strongs: "G4098",
							OGNTsort: 24086,
							morph: "V-2AAP-NSM",
							lemma: "πίπτω",
						},
					],
				},
				{
					englishWords: "on",
					greekWords: [
						{
							text: "on",
							strongs: "G1909",
							OGNTsort: 24087,
							morph: "PREP",
							lemma: "ἐπί",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 24088,
							morph: "T-GSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "ground",
					greekWords: [
						{
							text: "ground",
							strongs: "G1093",
							OGNTsort: 24089,
							morph: "N-GSF",
							lemma: "γῆ",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "foamed at the mouth.",
					greekWords: [
						{
							text: "foamed at the mouth.",
							strongs: "G875",
							OGNTsort: 24091,
							morph: "V-PAP-NSM",
							lemma: "ἀφρίζω",
						},
					],
				},
			],
		},
		{
			verseNum: 21,
			verseWords: [
				{ englishWords: "Jesus" },
				{
					englishWords: "asked",
					greekWords: [
						{
							text: "asked",
							strongs: "G1905",
							OGNTsort: 24093,
							morph: "V-AAI-3S",
							lemma: "ἐπερωτάω",
						},
					],
				},
				{
					englishWords: "his",
					greekWords: [
						{
							text: "his",
							strongs: "G846",
							OGNTsort: 24096,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "father,",
					greekWords: [
						{
							text: "father,",
							strongs: "G3962",
							OGNTsort: 24095,
							morph: "N-ASM",
							lemma: "πατήρ",
						},
					],
				},
				{
					englishWords: '"For how much',
					phraseWords: [
						{
							text: "√",
							strongs: "G4214",
							OGNTsort: 24097,
							phraseWords: '"For how much',
							morph: "Q-NSM",
							lemma: "πόσος",
						},
						{
							text: "√",
							strongs: "G1510",
							OGNTsort: 24099,
							phraseWords: '"For how much',
							morph: "V-PAI-3S",
							lemma: "εἰμί",
						},
					],
					subWords: [],
				},
				{
					englishWords: "time",
					greekWords: [
						{
							text: "time",
							strongs: "G5550",
							OGNTsort: 24098,
							morph: "N-NSM",
							lemma: "χρόνος",
						},
					],
				},
				{
					englishWords: "has he been",
					phraseWords: [
						{
							text: "√",
							strongs: "G1096",
							OGNTsort: 24102,
							phraseWords: "has he been",
							morph: "V-2RAI-3S",
							lemma: "γίνομαι",
						},
						{
							text: "√",
							strongs: "G846",
							OGNTsort: 24103,
							phraseWords: "has he been",
							morph: "P-DSM",
							lemma: "αὐτός",
						},
					],
					subWords: [],
				},
				{
					englishWords: "like",
					greekWords: [
						{
							text: "like",
							strongs: "G5613",
							OGNTsort: 24100,
							morph: "ADV",
							lemma: "ὡς",
						},
					],
				},
				{
					englishWords: 'this?"',
					greekWords: [
						{
							text: 'this?"',
							strongs: "G3778",
							OGNTsort: 24101,
							morph: "D-NSN",
							lemma: "οὗτος",
						},
					],
				},
				{
					englishWords: "The",
					greekWords: [
						{
							text: "The",
							strongs: "G3588",
							OGNTsort: 24104,
							morph: "T-NSM",
							lemma: "ὁ",
						},
					],
				},
				{ englishWords: "father" },
				{
					englishWords: "said,",
					greekWords: [
						{
							text: "said,",
							strongs: "G2036",
							OGNTsort: 24106,
							morph: "V-2AAI-3S",
							lemma: "ἔπω, ἐρῶ, εἶπον",
						},
					],
				},
				{
					englishWords: '"Since',
					greekWords: [
						{
							text: '"Since',
							strongs: "G1537",
							OGNTsort: 24107,
							morph: "PREP",
							lemma: "ἐκ",
						},
					],
				},
				{
					englishWords: "childhood.",
					greekWords: [
						{
							text: "childhood.",
							strongs: "G3812",
							OGNTsort: 24108,
							morph: "ADV",
							lemma: "παιδιόθεν",
						},
					],
				},
			],
		},
		{
			verseNum: 22,
			verseWords: [
				{
					englishWords: "It has often thrown",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "often",
								strongs: "G4178",
								OGNTsort: 24110,
								morph: "ADV",
								lemma: "πολλάκις",
							},
						},
						{
							word: {
								text: "It has often thrown",
								strongs: "G906",
								OGNTsort: 24115,
								morph: "V-2AAI-3S",
								lemma: "βάλλω",
							},
						},
					],
				},
				{
					englishWords: "him",
					greekWords: [
						{
							text: "him",
							strongs: "G846",
							OGNTsort: 24114,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 24112,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "the fire",
					greekWords: [
						{
							text: "the fire",
							strongs: "G4442",
							OGNTsort: 24113,
							morph: "N-ASN",
							lemma: "πῦρ",
						},
					],
				},
				{
					englishWords: "or",
					greekWords: [
						{
							text: "or",
							strongs: "G2532",
							OGNTsort: 24116,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 24117,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "the waters",
					greekWords: [
						{
							text: "the waters",
							strongs: "G5204",
							OGNTsort: 24118,
							morph: "N-APN",
							lemma: "ὕδωρ, ὕδατος",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "tried to destroy",
					phraseWords: [
						{
							text: "√",
							strongs: "G2443",
							OGNTsort: 24119,
							phraseWords: "tried to destroy",
							morph: "CONJ",
							lemma: "ἵνα",
						},
						{
							text: "√",
							strongs: "G622",
							OGNTsort: 24120,
							phraseWords: "tried to destroy",
							morph: "V-AAS-3S",
							lemma: "ἀπολλύω",
						},
					],
					subWords: [],
				},
				{
					englishWords: "him.",
					greekWords: [
						{
							text: "him.",
							strongs: "G846",
							OGNTsort: 24121,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "If",
					greekWords: [
						{
							text: "If",
							strongs: "G1487",
							OGNTsort: 24123,
							morph: "CONJ",
							lemma: "εἰ",
						},
					],
				},
				{
					englishWords: "you are able to do",
					greekWords: [
						{
							text: "you are able to do",
							strongs: "G1410",
							OGNTsort: 24125,
							morph: "V-PNI-2S",
							lemma: "δύναμαι",
						},
					],
				},
				{
					englishWords: "anything,",
					greekWords: [
						{
							text: "anything,",
							strongs: "G5100",
							OGNTsort: 24124,
							morph: "X-ASN",
							lemma: "τις",
						},
					],
				},
				{
					englishWords: "have pity",
					greekWords: [
						{
							text: "have pity",
							strongs: "G4697",
							OGNTsort: 24128,
							morph: "V-AOP-NSM",
							lemma: "σπλαγχνίζω",
						},
					],
				},
				{
					englishWords: "on",
					greekWords: [
						{
							text: "on",
							strongs: "G1909",
							OGNTsort: 24129,
							morph: "PREP",
							lemma: "ἐπί",
						},
					],
				},
				{
					englishWords: "us",
					greekWords: [
						{
							text: "us",
							strongs: "G1473",
							OGNTsort: 24130,
							morph: "P-1AP",
							lemma: "ἐγώ",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "help",
					greekWords: [
						{
							text: "help",
							strongs: "G997",
							OGNTsort: 24126,
							morph: "V-AAM-2S",
							lemma: "βοηθέω",
						},
					],
				},
				{
					englishWords: 'us."',
					greekWords: [
						{
							text: 'us."',
							strongs: "G1473",
							OGNTsort: 24127,
							morph: "P-1DP",
							lemma: "ἐγώ",
						},
					],
				},
			],
		},
		{
			verseNum: 23,
			verseWords: [
				{
					englishWords: "Jesus",
					greekWords: [
						{
							text: "Jesus",
							strongs: "G2424",
							OGNTsort: 24133,
							morph: "N-NSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
				{
					englishWords: "said",
					greekWords: [
						{
							text: "said",
							strongs: "G2036",
							OGNTsort: 24134,
							morph: "V-2AAI-3S",
							lemma: "ἔπω, ἐρῶ, εἶπον",
						},
					],
				},
				{
					englishWords: "to him,",
					greekWords: [
						{
							text: "to him,",
							strongs: "G846",
							OGNTsort: 24135,
							morph: "P-DSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "\"'If",
					greekWords: [
						{
							text: "\"'If",
							strongs: "G1487",
							OGNTsort: 24137,
							morph: "CONJ",
							lemma: "εἰ",
						},
					],
				},
				{
					englishWords: "you are able'?",
					greekWords: [
						{
							text: "you are able'?",
							strongs: "G1410",
							OGNTsort: 24138,
							morph: "V-PNI-2S",
							lemma: "δύναμαι",
						},
					],
				},
				{
					englishWords: "All things",
					greekWords: [
						{
							text: "All things",
							strongs: "G3956",
							OGNTsort: 24139,
							morph: "A-NPN",
							lemma: "πᾶς",
						},
					],
				},
				{
					englishWords: "are possible",
					greekWords: [
						{
							text: "are possible",
							strongs: "G1415",
							OGNTsort: 24140,
							morph: "A-NPN",
							lemma: "δυνατός",
						},
					],
				},
				{
					englishWords: "for the one who",
					greekWords: [
						{
							text: "for the one who",
							strongs: "G3588",
							OGNTsort: 24141,
							morph: "T-DSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: 'believes."',
					greekWords: [
						{
							text: 'believes."',
							strongs: "G4100",
							OGNTsort: 24142,
							morph: "V-PAP-DSM",
							lemma: "πιστεύω",
						},
					],
				},
			],
		},
		{
			verseNum: 24,
			verseWords: [
				{
					englishWords: "Immediately",
					greekWords: [
						{
							text: "Immediately",
							strongs: "G2112",
							OGNTsort: 24143,
							morph: "ADV",
							lemma: "εὐθέως",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 24145,
							morph: "T-NSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "father",
					greekWords: [
						{
							text: "father",
							strongs: "G3962",
							OGNTsort: 24146,
							morph: "N-NSM",
							lemma: "πατήρ",
						},
					],
				},
				{
					englishWords: "child",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "of the",
								strongs: "G3588",
								OGNTsort: 24147,
								morph: "T-GSN",
								lemma: "ὁ",
							},
						},
						{
							word: {
								text: "child",
								strongs: "G3813",
								OGNTsort: 24148,
								morph: "N-GSN",
								lemma: "παιδίον",
							},
						},
					],
				},
				{
					englishWords: "cried out",
					greekWords: [
						{
							text: "cried out",
							strongs: "G2896",
							OGNTsort: 24144,
							morph: "V-AAP-NSM",
							lemma: "κράζω",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "said,",
					greekWords: [
						{
							text: "said,",
							strongs: "G3004",
							OGNTsort: 24149,
							morph: "V-IAI-3S",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: '"I believe!',
					greekWords: [
						{
							text: '"I believe!',
							strongs: "G4100",
							OGNTsort: 24150,
							morph: "V-PAI-1S",
							lemma: "πιστεύω",
						},
					],
				},
				{
					englishWords: "Help",
					greekWords: [
						{
							text: "Help",
							strongs: "G997",
							OGNTsort: 24151,
							morph: "V-PAM-2S",
							lemma: "βοηθέω",
						},
					],
				},
				{
					englishWords: "my",
					greekWords: [
						{
							text: "my",
							strongs: "G1473",
							OGNTsort: 24152,
							morph: "P-1GS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: 'unbelief!"',
					greekWords: [
						{
							text: 'unbelief!"',
							strongs: "G570",
							OGNTsort: 24154,
							morph: "N-DSF",
							lemma: "ἀπιστία",
						},
					],
				},
			],
		},
		{
			verseNum: 25,
			verseWords: [
				{
					englishWords: "When Jesus saw",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "Jesus",
								strongs: "G2424",
								OGNTsort: 24158,
								morph: "N-NSM-P",
								lemma: "Ἰησοῦς",
							},
						},
						{
							word: {
								text: "When Jesus saw",
								strongs: "G1492",
								OGNTsort: 24155,
								morph: "V-2AAP-NSM",
								lemma: "εἴδω",
							},
						},
					],
				},
				{
					englishWords: "the crowd",
					greekWords: [
						{
							text: "the crowd",
							strongs: "G3793",
							OGNTsort: 24161,
							morph: "N-NSM",
							lemma: "ὄχλος",
						},
					],
				},
				{
					englishWords: "running",
					greekWords: [
						{
							text: "running",
							strongs: "G1998",
							OGNTsort: 24160,
							morph: "V-PAI-3S",
							lemma: "ἐπισυντρέχω",
						},
					],
				},
				{ englishWords: "to them," },
				{
					englishWords: "he rebuked",
					greekWords: [
						{
							text: "he rebuked",
							strongs: "G2008",
							OGNTsort: 24162,
							morph: "V-AAI-3S",
							lemma: "ἐπιτιμάω",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 24165,
							morph: "T-DSN",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "unclean",
					greekWords: [
						{
							text: "unclean",
							strongs: "G169",
							OGNTsort: 24166,
							morph: "A-DSN",
							lemma: "ἀκάθαρτος",
						},
					],
				},
				{
					englishWords: "spirit",
					greekWords: [
						{
							text: "spirit",
							strongs: "G4151",
							OGNTsort: 24164,
							morph: "N-DSN",
							lemma: "πνεῦμα",
						},
					],
				},
				{
					englishWords: "and said,",
					greekWords: [
						{
							text: "and said,",
							strongs: "G3004",
							OGNTsort: 24167,
							morph: "V-PAP-NSM",
							lemma: "λέγω",
						},
					],
				},
				{ englishWords: '"You' },
				{
					englishWords: "mute",
					greekWords: [
						{
							text: "mute",
							strongs: "G216",
							OGNTsort: 24170,
							morph: "A-VSN",
							lemma: "ἄλαλος",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 24171,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "deaf",
					greekWords: [
						{
							text: "deaf",
							strongs: "G2974",
							OGNTsort: 24172,
							morph: "A-VSN",
							lemma: "κωφός",
						},
					],
				},
				{
					englishWords: "spirit,",
					greekWords: [
						{
							text: "spirit,",
							strongs: "G4151",
							OGNTsort: 24173,
							morph: "N-VSN",
							lemma: "πνεῦμα",
						},
					],
				},
				{
					englishWords: "I",
					greekWords: [
						{
							text: "I",
							strongs: "G1473",
							OGNTsort: 24174,
							morph: "P-1NS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "command",
					greekWords: [
						{
							text: "command",
							strongs: "G2004",
							OGNTsort: 24175,
							morph: "V-PAI-1S",
							lemma: "ἐπιτάσσω",
						},
					],
				},
				{
					englishWords: "you,",
					greekWords: [
						{
							text: "you,",
							strongs: "G4771",
							OGNTsort: 24176,
							morph: "P-2DS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "come out",
					greekWords: [
						{
							text: "come out",
							strongs: "G1831",
							OGNTsort: 24177,
							morph: "V-2AAM-2S",
							lemma: "ἐξέρχομαι",
						},
					],
				},
				{
					englishWords: "of",
					greekWords: [
						{
							text: "of",
							strongs: "G1537",
							OGNTsort: 24178,
							morph: "PREP",
							lemma: "ἐκ",
						},
					],
				},
				{
					englishWords: "him,",
					greekWords: [
						{
							text: "him,",
							strongs: "G846",
							OGNTsort: 24179,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 24180,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: 'never enter into him again."',
					subWords: [
						{
							subIdx: "[2]",
							word: {
								text: "enter",
								strongs: "G1525",
								OGNTsort: 24182,
								morph: "V-2AAS-2S",
								lemma: "εἰσέρχομαι",
							},
						},
						{
							subIdx: "[3]",
							word: {
								text: "into",
								strongs: "G1519",
								OGNTsort: 24183,
								morph: "PREP",
								lemma: "εἰς",
							},
						},
						{
							subIdx: "[4]",
							word: {
								text: "him",
								strongs: "G846",
								OGNTsort: 24184,
								morph: "P-ASM",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: 'never enter into him again."',
								strongs: "G3371",
								OGNTsort: 24181,
								morph: "ADV",
								lemma: "μηκέτι",
							},
						},
					],
				},
			],
		},
		{
			verseNum: 26,
			verseWords: [
				{
					englishWords: "It cried out",
					greekWords: [
						{
							text: "It cried out",
							strongs: "G2896",
							OGNTsort: 24186,
							morph: "V-AAP-NSM",
							lemma: "κράζω",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 24187,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "convulsed",
					greekWords: [
						{
							text: "convulsed",
							strongs: "G4682",
							OGNTsort: 24189,
							morph: "V-AAP-NSM",
							lemma: "σπαράσσω",
						},
					],
				},
				{ englishWords: "the boy" },
				{
					englishWords: "greatly",
					greekWords: [
						{
							text: "greatly",
							strongs: "G4183",
							OGNTsort: 24188,
							morph: "A-APN",
							lemma: "πολύς",
						},
					],
				},
				{ englishWords: "and then" },
				{
					englishWords: "came out.",
					greekWords: [
						{
							text: "came out.",
							strongs: "G1831",
							OGNTsort: 24190,
							morph: "V-2AAI-3S",
							lemma: "ἐξέρχομαι",
						},
					],
				},
				{ englishWords: "The boy" },
				{
					englishWords: "looked",
					greekWords: [
						{
							text: "looked",
							strongs: "G1096",
							OGNTsort: 24192,
							morph: "V-2ADI-3S",
							lemma: "γίνομαι",
						},
					],
				},
				{
					englishWords: "like",
					greekWords: [
						{
							text: "like",
							strongs: "G5616",
							OGNTsort: 24193,
							morph: "CONJ",
							lemma: "ὡσεί",
						},
					],
				},
				{ englishWords: "one who was" },
				{
					englishWords: "dead,",
					greekWords: [
						{
							text: "dead,",
							strongs: "G3498",
							OGNTsort: 24194,
							morph: "A-NSM",
							lemma: "νεκρός",
						},
					],
				},
				{
					englishWords: "so that",
					greekWords: [
						{
							text: "so that",
							strongs: "G5620",
							OGNTsort: 24195,
							morph: "CONJ",
							lemma: "ὥστε",
						},
					],
				},
				{
					englishWords: "many",
					greekWords: [
						{
							text: "many",
							strongs: "G4183",
							OGNTsort: 24197,
							morph: "A-APM",
							lemma: "πολύς",
						},
					],
				},
				{
					englishWords: "said,",
					greekWords: [
						{
							text: "said,",
							strongs: "G3004",
							OGNTsort: 24198,
							morph: "V-PAN",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: '"He is dead."',
					greekWords: [
						{
							text: '"He is dead."',
							strongs: "G599",
							OGNTsort: 24200,
							morph: "V-2AAI-3S",
							lemma: "ἀποθνήσκω",
						},
					],
				},
			],
		},
		{
			verseNum: 27,
			verseWords: [
				{
					englishWords: "But",
					greekWords: [
						{
							text: "But",
							strongs: "G1161",
							OGNTsort: 24202,
							morph: "CONJ",
							lemma: "δέ",
						},
					],
				},
				{
					englishWords: "Jesus",
					greekWords: [
						{
							text: "Jesus",
							strongs: "G2424",
							OGNTsort: 24203,
							morph: "N-NSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
				{
					englishWords: "took",
					greekWords: [
						{
							text: "took",
							strongs: "G2902",
							OGNTsort: 24204,
							morph: "V-AAP-NSM",
							lemma: "κρατέω",
						},
					],
				},
				{
					englishWords: "him",
					greekWords: [
						{
							text: "him",
							strongs: "G846",
							OGNTsort: 24207,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "by the",
					greekWords: [
						{
							text: "by the",
							strongs: "G3588",
							OGNTsort: 24205,
							morph: "T-GSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "hand",
					greekWords: [
						{
							text: "hand",
							strongs: "G5495",
							OGNTsort: 24206,
							morph: "N-GSF",
							lemma: "χείρ",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "lifted him up,",
					subWords: [
						{
							subIdx: "[3]",
							word: {
								text: "him",
								strongs: "G846",
								OGNTsort: 24209,
								morph: "P-ASM",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: "lifted him up,",
								strongs: "G1453",
								OGNTsort: 24208,
								morph: "V-AAI-3S",
								lemma: "ἐγείρω",
							},
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 24210,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{ englishWords: "the boy" },
				{
					englishWords: "stood up.",
					greekWords: [
						{
							text: "stood up.",
							strongs: "G450",
							OGNTsort: 24211,
							morph: "V-2AAI-3S",
							lemma: "ἀνίστημι",
						},
					],
				},
			],
		},
		{
			verseNum: 28,
			verseWords: [
				{
					englishWords: "When Jesus came",
					subWords: [
						{ subIdx: "[1]", word: { text: "Jesus" } },
						{
							word: {
								text: "When Jesus came",
								strongs: "G1525",
								OGNTsort: 24213,
								morph: "V-2AAP-GSM",
								lemma: "εἰσέρχομαι",
							},
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 24215,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "the house,",
					greekWords: [
						{
							text: "the house,",
							strongs: "G3624",
							OGNTsort: 24216,
							morph: "N-ASM",
							lemma: "οἶκος",
						},
					],
				},
				{
					englishWords: "his",
					greekWords: [
						{
							text: "his",
							strongs: "G846",
							OGNTsort: 24219,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "disciples",
					greekWords: [
						{
							text: "disciples",
							strongs: "G3101",
							OGNTsort: 24218,
							morph: "N-NPM",
							lemma: "μαθητής",
						},
					],
				},
				{
					englishWords: "asked",
					greekWords: [
						{
							text: "asked",
							strongs: "G1905",
							OGNTsort: 24222,
							morph: "V-IAI-3P",
							lemma: "ἐπερωτάω",
						},
					],
				},
				{
					englishWords: "him",
					greekWords: [
						{
							text: "him",
							strongs: "G846",
							OGNTsort: 24223,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "privately,",
					phraseWords: [
						{
							text: "√",
							strongs: "G2596",
							OGNTsort: 24220,
							phraseWords: "privately,",
							morph: "PREP",
							lemma: "κατά",
						},
						{
							text: "√",
							strongs: "G2398",
							OGNTsort: 24221,
							phraseWords: "privately,",
							morph: "A-ASF",
							lemma: "ἴδιος",
						},
					],
					subWords: [],
				},
				{
					englishWords: '"Why',
					greekWords: [
						{
							text: '"Why',
							strongs: "G3754",
							OGNTsort: 24224,
							morph: "ADV",
							lemma: "ὅτι",
						},
					],
				},
				{
					englishWords: "could",
					greekWords: [
						{
							text: "could",
							strongs: "G1410",
							OGNTsort: 24227,
							morph: "V-AOI-1P",
							lemma: "δύναμαι",
						},
					],
				},
				{
					englishWords: "we",
					greekWords: [
						{
							text: "we",
							strongs: "G1473",
							OGNTsort: 24225,
							morph: "P-1NP",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "not",
					greekWords: [
						{
							text: "not",
							strongs: "G3756",
							OGNTsort: 24226,
							morph: "PRT-N",
							lemma: "οὐ",
						},
					],
				},
				{
					englishWords: 'cast it out?"',
					subWords: [
						{
							subIdx: "[2]",
							word: {
								text: "it",
								strongs: "G846",
								OGNTsort: 24229,
								morph: "P-ASN",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: 'cast it out?"',
								strongs: "G1544",
								OGNTsort: 24228,
								morph: "V-2AAN",
								lemma: "ἐκβάλλω",
							},
						},
					],
				},
			],
		},
		{
			verseNum: 29,
			verseWords: [
				{
					englishWords: "He said",
					greekWords: [
						{
							text: "He said",
							strongs: "G2036",
							OGNTsort: 24231,
							morph: "V-2AAI-3S",
							lemma: "ἔπω, ἐρῶ, εἶπον",
						},
					],
				},
				{
					englishWords: "to them,",
					greekWords: [
						{
							text: "to them,",
							strongs: "G846",
							OGNTsort: 24232,
							morph: "P-DPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: '"This',
					greekWords: [
						{
							text: '"This',
							strongs: "G3778",
							OGNTsort: 24233,
							morph: "D-NSN",
							lemma: "οὗτος",
						},
					],
				},
				{
					englishWords: "kind",
					greekWords: [
						{
							text: "kind",
							strongs: "G1085",
							OGNTsort: 24235,
							morph: "N-NSN",
							lemma: "γένος",
						},
					],
				},
				{
					englishWords: "cannot be cast out",
					phraseWords: [
						{
							text: "√",
							strongs: "G1722",
							OGNTsort: 24236,
							phraseWords: "cannot be cast out",
							morph: "PREP",
							lemma: "ἐν",
						},
						{
							text: "√",
							strongs: "G3762",
							OGNTsort: 24237,
							phraseWords: "cannot be cast out",
							morph: "A-DSN",
							lemma: "οὐδείς",
						},
						{
							text: "√",
							strongs: "G1410",
							OGNTsort: 24238,
							phraseWords: "cannot be cast out",
							morph: "V-PNI-3S",
							lemma: "δύναμαι",
						},
						{
							text: "√",
							strongs: "G1831",
							OGNTsort: 24239,
							phraseWords: "cannot be cast out",
							morph: "V-2AAN",
							lemma: "ἐξέρχομαι",
						},
						{
							text: "√",
							strongs: "G1487",
							OGNTsort: 24240,
							phraseWords: "except",
							morph: "CONJ",
							lemma: "εἰ",
						},
						{
							text: "√",
							strongs: "G3361",
							OGNTsort: 24241,
							phraseWords: "except",
							morph: "PRT-N",
							lemma: "μή",
						},
					],
					subWords: [],
				},
				{
					englishWords: "by",
					greekWords: [
						{
							text: "by",
							strongs: "G1722",
							OGNTsort: 24242,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: 'prayer."',
					greekWords: [
						{
							text: 'prayer."',
							strongs: "G4335",
							OGNTsort: 24243,
							morph: "N-DSF",
							lemma: "προσευχή",
						},
					],
				},
			],
		},
		{
			verseNum: 30,
			verseWords: [
				{
					englishWords: "They went out",
					greekWords: [
						{
							text: "They went out",
							strongs: "G1831",
							OGNTsort: 24245,
							morph: "V-2AAP-NPM",
							lemma: "ἐξέρχομαι",
						},
					],
				},
				{
					englishWords: "from there",
					greekWords: [
						{
							text: "from there",
							strongs: "G2547",
							OGNTsort: 24244,
							morph: "ADV",
							lemma: "κἀκεῖθεν",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "passed",
					greekWords: [
						{
							text: "passed",
							strongs: "G3899",
							OGNTsort: 24246,
							morph: "V-INI-3P",
							lemma: "παραπορεύομαι",
						},
					],
				},
				{
					englishWords: "through",
					greekWords: [
						{
							text: "through",
							strongs: "G1223",
							OGNTsort: 24247,
							morph: "PREP",
							lemma: "διά",
						},
					],
				},
				{
					englishWords: "Galilee.",
					greekWords: [
						{
							text: "Galilee.",
							strongs: "G1056",
							OGNTsort: 24249,
							morph: "N-GSF-L",
							lemma: "Γαλιλαία",
						},
					],
				},
				{
					englishWords: "He did not want",
					subWords: [
						{
							subIdx: "[2]",
							word: {
								text: "not",
								strongs: "G3756",
								OGNTsort: 24251,
								morph: "PRT-N",
								lemma: "οὐ",
							},
						},
						{
							word: {
								text: "He did not want",
								strongs: "G2309",
								OGNTsort: 24252,
								morph: "V-IAI-3S",
								lemma: "θέλω",
							},
						},
					],
				},
				{
					englishWords: "anyone",
					greekWords: [
						{
							text: "anyone",
							strongs: "G5100",
							OGNTsort: 24254,
							morph: "X-NSM",
							lemma: "τις",
						},
					],
				},
				{
					englishWords: "to know",
					phraseWords: [
						{
							text: "√",
							strongs: "G2443",
							OGNTsort: 24253,
							phraseWords: "to know",
							morph: "CONJ",
							lemma: "ἵνα",
						},
						{
							text: "√",
							strongs: "G1097",
							OGNTsort: 24255,
							phraseWords: "to know",
							morph: "V-2AAS-3S",
							lemma: "γινώσκω",
						},
					],
					subWords: [],
				},
				{ englishWords: "where they were," },
			],
		},
		{
			verseNum: 31,
			verseWords: [
				{
					englishWords: "for",
					greekWords: [
						{
							text: "for",
							strongs: "G1063",
							OGNTsort: 24257,
							morph: "CONJ",
							lemma: "γάρ",
						},
					],
				},
				{
					englishWords: "he was teaching",
					greekWords: [
						{
							text: "he was teaching",
							strongs: "G1321",
							OGNTsort: 24256,
							morph: "V-IAI-3S",
							lemma: "διδάσκω",
						},
					],
				},
				{
					englishWords: "his",
					greekWords: [
						{
							text: "his",
							strongs: "G846",
							OGNTsort: 24260,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "disciples.",
					greekWords: [
						{
							text: "disciples.",
							strongs: "G3101",
							OGNTsort: 24259,
							morph: "N-APM",
							lemma: "μαθητής",
						},
					],
				},
				{
					englishWords: "He said",
					greekWords: [
						{
							text: "He said",
							strongs: "G3004",
							OGNTsort: 24262,
							morph: "V-IAI-3S",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: "to them,",
					greekWords: [
						{
							text: "to them,",
							strongs: "G846",
							OGNTsort: 24263,
							morph: "P-DPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: '"The',
					greekWords: [
						{
							text: '"The',
							strongs: "G3588",
							OGNTsort: 24265,
							morph: "T-NSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "Son",
					greekWords: [
						{
							text: "Son",
							strongs: "G5207",
							OGNTsort: 24266,
							morph: "N-NSM",
							lemma: "υἱός",
						},
					],
				},
				{
					englishWords: "of Man",
					greekWords: [
						{
							text: "of Man",
							strongs: "G444",
							OGNTsort: 24268,
							morph: "N-GSM",
							lemma: "ἄνθρωπος",
						},
					],
				},
				{
					englishWords: "will be given over",
					greekWords: [
						{
							text: "will be given over",
							strongs: "G3860",
							OGNTsort: 24269,
							morph: "V-PPI-3S",
							lemma: "παραδίδωμι",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 24270,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "the hands",
					greekWords: [
						{
							text: "the hands",
							strongs: "G5495",
							OGNTsort: 24271,
							morph: "N-APF",
							lemma: "χείρ",
						},
					],
				},
				{
					englishWords: "of men,",
					greekWords: [
						{
							text: "of men,",
							strongs: "G444",
							OGNTsort: 24272,
							morph: "N-GPM",
							lemma: "ἄνθρωπος",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 24273,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "they will put him to death.",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "him",
								strongs: "G846",
								OGNTsort: 24275,
								morph: "P-ASM",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: "they will put him to death.",
								strongs: "G615",
								OGNTsort: 24274,
								morph: "V-FAI-3P",
								lemma: "ἀποκτείνω",
							},
						},
					],
				},
				{
					englishWords: "When he has been put to death,",
					greekWords: [
						{
							text: "When he has been put to death,",
							strongs: "G615",
							OGNTsort: 24277,
							morph: "V-APP-NSM",
							lemma: "ἀποκτείνω",
						},
					],
				},
				{
					englishWords: "after",
					greekWords: [
						{
							text: "after",
							strongs: "G3326",
							OGNTsort: 24278,
							morph: "PREP",
							lemma: "μετά",
						},
					],
				},
				{
					englishWords: "three",
					greekWords: [
						{
							text: "three",
							strongs: "G5140",
							OGNTsort: 24279,
							morph: "A-APF",
							lemma: "τρεῖς, τρία",
						},
					],
				},
				{
					englishWords: "days",
					greekWords: [
						{
							text: "days",
							strongs: "G2250",
							OGNTsort: 24280,
							morph: "N-APF",
							lemma: "ἡμέρα",
						},
					],
				},
				{
					englishWords: "he will rise",
					greekWords: [
						{
							text: "he will rise",
							strongs: "G450",
							OGNTsort: 24281,
							morph: "V-FMI-3S",
							lemma: "ἀνίστημι",
						},
					],
				},
				{ englishWords: 'again."' },
			],
		},
		{
			verseNum: 32,
			verseWords: [
				{
					englishWords: "But",
					greekWords: [
						{
							text: "But",
							strongs: "G1161",
							OGNTsort: 24283,
							morph: "CONJ",
							lemma: "δέ",
						},
					],
				},
				{
					englishWords: "they",
					greekWords: [
						{
							text: "they",
							strongs: "G3588",
							OGNTsort: 24282,
							morph: "T-NPM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "did not understand",
					greekWords: [
						{
							text: "did not understand",
							strongs: "G50",
							OGNTsort: 24284,
							morph: "V-IAI-3P",
							lemma: "ἀγνοέω",
						},
					],
				},
				{
					englishWords: "this",
					greekWords: [
						{
							text: "this",
							strongs: "G3588",
							OGNTsort: 24285,
							morph: "T-ASN",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "statement,",
					greekWords: [
						{
							text: "statement,",
							strongs: "G4487",
							OGNTsort: 24286,
							morph: "N-ASN",
							lemma: "ῥῆμα",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 24287,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "they were afraid",
					greekWords: [
						{
							text: "they were afraid",
							strongs: "G5399",
							OGNTsort: 24288,
							morph: "V-INI-3P",
							lemma: "φοβέω",
						},
					],
				},
				{
					englishWords: "to ask",
					greekWords: [
						{
							text: "to ask",
							strongs: "G1905",
							OGNTsort: 24290,
							morph: "V-AAN",
							lemma: "ἐπερωτάω",
						},
					],
				},
				{
					englishWords: "him.",
					greekWords: [
						{
							text: "him.",
							strongs: "G846",
							OGNTsort: 24289,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
			],
		},
		{
			verseNum: 33,
			verseWords: [
				{
					englishWords: "Then",
					greekWords: [
						{
							text: "Then",
							strongs: "G2532",
							OGNTsort: 24291,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "they came",
					greekWords: [
						{
							text: "they came",
							strongs: "G2064",
							OGNTsort: 24292,
							morph: "V-2AAI-3P",
							lemma: "ἔρχομαι",
						},
					],
				},
				{
					englishWords: "to",
					greekWords: [
						{
							text: "to",
							strongs: "G1519",
							OGNTsort: 24293,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "Capernaum.",
					greekWords: [
						{
							text: "Capernaum.",
							strongs: "G2584",
							OGNTsort: 24294,
							morph: "N-ASF-L",
							lemma: "Καπερναούμ",
						},
					],
				},
				{
					englishWords: "After he entered",
					greekWords: [
						{
							text: "After he entered",
							strongs: "G1096",
							OGNTsort: 24299,
							morph: "V-2ADP-NSM",
							lemma: "γίνομαι",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 24297,
							morph: "T-DSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "house",
					greekWords: [
						{
							text: "house",
							strongs: "G3614",
							OGNTsort: 24298,
							morph: "N-DSF",
							lemma: "οἰκία",
						},
					],
				},
				{
					englishWords: "he asked",
					greekWords: [
						{
							text: "he asked",
							strongs: "G1905",
							OGNTsort: 24300,
							morph: "V-IAI-3S",
							lemma: "ἐπερωτάω",
						},
					],
				},
				{
					englishWords: "them,",
					greekWords: [
						{
							text: "them,",
							strongs: "G846",
							OGNTsort: 24301,
							morph: "P-APM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: '"What',
					greekWords: [
						{
							text: '"What',
							strongs: "G5101",
							OGNTsort: 24302,
							morph: "I-ASN",
							lemma: "τίς",
						},
					],
				},
				{
					englishWords: "were you discussing",
					greekWords: [
						{
							text: "were you discussing",
							strongs: "G1260",
							OGNTsort: 24306,
							morph: "V-INI-2P",
							lemma: "διαλογίζομαι",
						},
					],
				},
				{
					englishWords: "on",
					greekWords: [
						{
							text: "on",
							strongs: "G1722",
							OGNTsort: 24303,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 24304,
							morph: "T-DSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: 'way?"',
					greekWords: [
						{
							text: 'way?"',
							strongs: "G3598",
							OGNTsort: 24305,
							morph: "N-DSF",
							lemma: "ὁδός",
						},
					],
				},
			],
		},
		{
			verseNum: 34,
			verseWords: [
				{
					englishWords: "But",
					greekWords: [
						{
							text: "But",
							strongs: "G1161",
							OGNTsort: 24308,
							morph: "CONJ",
							lemma: "δέ",
						},
					],
				},
				{
					englishWords: "they",
					greekWords: [
						{
							text: "they",
							strongs: "G3588",
							OGNTsort: 24307,
							morph: "T-NPM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "were silent.",
					greekWords: [
						{
							text: "were silent.",
							strongs: "G4623",
							OGNTsort: 24309,
							morph: "V-IAI-3P",
							lemma: "σιωπάω",
						},
					],
				},
				{
					englishWords: "For",
					greekWords: [
						{
							text: "For",
							strongs: "G1063",
							OGNTsort: 24312,
							morph: "CONJ",
							lemma: "γάρ",
						},
					],
				},
				{
					englishWords:
						"they had been arguing with one with another on the way about",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "with",
								strongs: "G4314",
								OGNTsort: 24310,
								morph: "PREP",
								lemma: "πρός",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "one with another",
								strongs: "G240",
								OGNTsort: 24311,
								morph: "C-APM",
								lemma: "ἀλλήλων",
							},
						},
						{
							subIdx: "[3]",
							word: {
								text: "on",
								strongs: "G1722",
								OGNTsort: 24314,
								morph: "PREP",
								lemma: "ἐν",
							},
						},
						{
							subIdx: "[4]",
							word: {
								text: "the",
								strongs: "G3588",
								OGNTsort: 24315,
								morph: "T-DSF",
								lemma: "ὁ",
							},
						},
						{
							subIdx: "[5]",
							word: {
								text: "way",
								strongs: "G3598",
								OGNTsort: 24316,
								morph: "N-DSF",
								lemma: "ὁδός",
							},
						},
						{
							word: {
								text: "they had been arguing with one with another on the way about",
								strongs: "G1256",
								OGNTsort: 24313,
								morph: "V-AOI-3P",
								lemma: "διαλέγω",
							},
						},
					],
				},
				{
					englishWords: "who",
					greekWords: [
						{
							text: "who",
							strongs: "G5101",
							OGNTsort: 24317,
							morph: "I-NSM",
							lemma: "τίς",
						},
					],
				},
				{ englishWords: "was" },
				{
					englishWords: "the greatest.",
					greekWords: [
						{
							text: "the greatest.",
							strongs: "G3173",
							OGNTsort: 24318,
							morph: "A-NSM-C",
							lemma: "μέγας",
						},
					],
				},
			],
		},
		{
			verseNum: 35,
			verseWords: [
				{
					englishWords: "Sitting down,",
					greekWords: [
						{
							text: "Sitting down,",
							strongs: "G2523",
							OGNTsort: 24320,
							morph: "V-AAP-NSM",
							lemma: "καθίζω",
						},
					],
				},
				{
					englishWords: "he called the twelve together",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "the",
								strongs: "G3588",
								OGNTsort: 24322,
								morph: "T-APM",
								lemma: "ὁ",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "twelve",
								strongs: "G1427",
								OGNTsort: 24323,
								morph: "A-APM-NUI",
								lemma: "δώδεκα",
							},
						},
						{
							word: {
								text: "he called the twelve together",
								strongs: "G5455",
								OGNTsort: 24321,
								morph: "V-AAI-3S",
								lemma: "φωνέω",
							},
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 24324,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "he said",
					greekWords: [
						{
							text: "he said",
							strongs: "G3004",
							OGNTsort: 24325,
							morph: "V-PAI-3S",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: "to them,",
					greekWords: [
						{
							text: "to them,",
							strongs: "G846",
							OGNTsort: 24326,
							morph: "P-DPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: '"If',
					greekWords: [
						{
							text: '"If',
							strongs: "G1487",
							OGNTsort: 24327,
							morph: "CONJ",
							lemma: "εἰ",
						},
					],
				},
				{
					englishWords: "anyone",
					greekWords: [
						{
							text: "anyone",
							strongs: "G5100",
							OGNTsort: 24328,
							morph: "X-NSM",
							lemma: "τις",
						},
					],
				},
				{
					englishWords: "wants",
					greekWords: [
						{
							text: "wants",
							strongs: "G2309",
							OGNTsort: 24329,
							morph: "V-PAI-3S",
							lemma: "θέλω",
						},
					],
				},
				{
					englishWords: "to be",
					greekWords: [
						{
							text: "to be",
							strongs: "G1510",
							OGNTsort: 24331,
							morph: "V-PAN",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "first,",
					greekWords: [
						{
							text: "first,",
							strongs: "G4413",
							OGNTsort: 24330,
							morph: "A-NSM",
							lemma: "πρῶτος",
						},
					],
				},
				{
					englishWords: "he must be",
					greekWords: [
						{
							text: "he must be",
							strongs: "G1510",
							OGNTsort: 24332,
							morph: "V-FDI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "last",
					greekWords: [
						{
							text: "last",
							strongs: "G2078",
							OGNTsort: 24334,
							morph: "A-NSM",
							lemma: "ἔσχατος",
						},
					],
				},
				{
					englishWords: "of all",
					greekWords: [
						{
							text: "of all",
							strongs: "G3956",
							OGNTsort: 24333,
							morph: "A-GPM",
							lemma: "πᾶς",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 24335,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "servant",
					greekWords: [
						{
							text: "servant",
							strongs: "G1249",
							OGNTsort: 24337,
							morph: "N-NSM",
							lemma: "διάκονος",
						},
					],
				},
				{
					englishWords: 'of all."',
					greekWords: [
						{
							text: 'of all."',
							strongs: "G3956",
							OGNTsort: 24336,
							morph: "A-GPM",
							lemma: "πᾶς",
						},
					],
				},
			],
		},
		{
			verseNum: 36,
			verseWords: [
				{
					englishWords: "He took",
					greekWords: [
						{
							text: "He took",
							strongs: "G2983",
							OGNTsort: 24339,
							morph: "V-2AAP-NSM",
							lemma: "λαμβάνω",
						},
					],
				},
				{
					englishWords: "a little child",
					greekWords: [
						{
							text: "a little child",
							strongs: "G3813",
							OGNTsort: 24340,
							morph: "N-ASN",
							lemma: "παιδίον",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "placed",
					greekWords: [
						{
							text: "placed",
							strongs: "G2476",
							OGNTsort: 24341,
							morph: "V-2AAI-3S",
							lemma: "ἵστημι",
						},
					],
				},
				{
					englishWords: "him",
					greekWords: [
						{
							text: "him",
							strongs: "G846",
							OGNTsort: 24342,
							morph: "P-ASN",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 24343,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "their",
					greekWords: [
						{
							text: "their",
							strongs: "G846",
							OGNTsort: 24345,
							morph: "P-GPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "midst.",
					greekWords: [
						{
							text: "midst.",
							strongs: "G3319",
							OGNTsort: 24344,
							morph: "A-DSN",
							lemma: "μέσος",
						},
					],
				},
				{
					englishWords: "He took him in his arms",
					subWords: [
						{
							subIdx: "[2]",
							word: {
								text: "him",
								strongs: "G846",
								OGNTsort: 24348,
								morph: "P-ASN",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: "He took him in his arms",
								strongs: "G1723",
								OGNTsort: 24347,
								morph: "V-ADP-NSM",
								lemma: "ἐναγκαλίζομαι",
							},
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "said",
					greekWords: [
						{
							text: "said",
							strongs: "G2036",
							OGNTsort: 24349,
							morph: "V-2AAI-3S",
							lemma: "ἔπω, ἐρῶ, εἶπον",
						},
					],
				},
				{
					englishWords: "to them,",
					greekWords: [
						{
							text: "to them,",
							strongs: "G846",
							OGNTsort: 24350,
							morph: "P-DPM",
							lemma: "αὐτός",
						},
					],
				},
			],
		},
		{
			verseNum: 37,
			verseWords: [
				{
					englishWords: '"Whoever',
					phraseWords: [
						{
							text: "√",
							strongs: "G3739",
							OGNTsort: 24351,
							phraseWords: '"Whoever',
							morph: "R-NSM",
							lemma: "ὅς, ἥ",
						},
						{
							text: "√",
							strongs: "G302",
							OGNTsort: 24352,
							phraseWords: '"Whoever',
							morph: "PRT",
							lemma: "ἄν",
						},
					],
					subWords: [],
				},
				{
					englishWords: "receives",
					greekWords: [
						{
							text: "receives",
							strongs: "G1209",
							OGNTsort: 24357,
							morph: "V-ADS-3S",
							lemma: "δέχομαι",
						},
					],
				},
				{
					englishWords: "such a",
					phraseWords: [
						{
							text: "√",
							strongs: "G1520",
							OGNTsort: 24353,
							phraseWords: "such a",
							morph: "A-ASN",
							lemma: "εἷς",
						},
						{
							text: "√",
							strongs: "G3588",
							OGNTsort: 24354,
							phraseWords: "such a",
							morph: "T-GPN",
							lemma: "ὁ",
						},
						{
							text: "√",
							strongs: "G5108",
							OGNTsort: 24355,
							phraseWords: "such a",
							morph: "D-GPN",
							lemma: "τοιοῦτος",
						},
					],
					subWords: [],
				},
				{
					englishWords: "child",
					greekWords: [
						{
							text: "child",
							strongs: "G3813",
							OGNTsort: 24356,
							morph: "N-GPN",
							lemma: "παιδίον",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1909",
							OGNTsort: 24358,
							morph: "PREP",
							lemma: "ἐπί",
						},
					],
				},
				{
					englishWords: "my",
					greekWords: [
						{
							text: "my",
							strongs: "G1473",
							OGNTsort: 24361,
							morph: "P-1GS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "name",
					greekWords: [
						{
							text: "name",
							strongs: "G3686",
							OGNTsort: 24360,
							morph: "N-DSN",
							lemma: "ὄνομα",
						},
					],
				},
				{
					englishWords: "receives",
					greekWords: [
						{
							text: "receives",
							strongs: "G1209",
							OGNTsort: 24363,
							morph: "V-PNI-3S",
							lemma: "δέχομαι",
						},
					],
				},
				{
					englishWords: "me;",
					greekWords: [
						{
							text: "me;",
							strongs: "G1473",
							OGNTsort: 24362,
							morph: "P-1AS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "whoever",
					phraseWords: [
						{
							text: "√",
							strongs: "G3739",
							OGNTsort: 24365,
							phraseWords: "whoever",
							morph: "R-NSM",
							lemma: "ὅς, ἥ",
						},
						{
							text: "√",
							strongs: "G302",
							OGNTsort: 24366,
							phraseWords: "whoever",
							morph: "PRT",
							lemma: "ἄν",
						},
					],
					subWords: [],
				},
				{
					englishWords: "receives",
					greekWords: [
						{
							text: "receives",
							strongs: "G1209",
							OGNTsort: 24368,
							morph: "V-PNS-3S",
							lemma: "δέχομαι",
						},
					],
				},
				{
					englishWords: "me",
					greekWords: [
						{
							text: "me",
							strongs: "G1473",
							OGNTsort: 24367,
							morph: "P-1AS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "does not receive",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "not",
								strongs: "G3756",
								OGNTsort: 24369,
								morph: "PRT-N",
								lemma: "οὐ",
							},
						},
						{
							word: {
								text: "does not receive",
								strongs: "G1209",
								OGNTsort: 24371,
								morph: "V-PNI-3S",
								lemma: "δέχομαι",
							},
						},
					],
				},
				{
					englishWords: "me",
					greekWords: [
						{
							text: "me",
							strongs: "G1473",
							OGNTsort: 24370,
							morph: "P-1AS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "but",
					greekWords: [
						{
							text: "but",
							strongs: "G235",
							OGNTsort: 24372,
							morph: "CONJ",
							lemma: "ἀλλά",
						},
					],
				},
				{
					englishWords: "the one who",
					greekWords: [
						{
							text: "the one who",
							strongs: "G3588",
							OGNTsort: 24373,
							morph: "T-ASM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "sent",
					greekWords: [
						{
							text: "sent",
							strongs: "G649",
							OGNTsort: 24374,
							morph: "V-AAP-ASM",
							lemma: "ἀποστέλλω",
						},
					],
				},
				{
					englishWords: 'me."',
					greekWords: [
						{
							text: 'me."',
							strongs: "G1473",
							OGNTsort: 24375,
							morph: "P-1AS",
							lemma: "ἐγώ",
						},
					],
				},
			],
		},
		{
			verseNum: 38,
			verseWords: [
				{
					englishWords: "John",
					greekWords: [
						{
							text: "John",
							strongs: "G2491",
							OGNTsort: 24379,
							morph: "N-NSM-P",
							lemma: "Ἰωάννης",
						},
					],
				},
				{
					englishWords: "said",
					greekWords: [
						{
							text: "said",
							strongs: "G5346",
							OGNTsort: 24376,
							morph: "V-IAI-3S",
							lemma: "φημί",
						},
					],
				},
				{
					englishWords: "to him,",
					greekWords: [
						{
							text: "to him,",
							strongs: "G846",
							OGNTsort: 24377,
							morph: "P-DSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: '"Teacher,',
					greekWords: [
						{
							text: '"Teacher,',
							strongs: "G1320",
							OGNTsort: 24380,
							morph: "N-VSM",
							lemma: "διδάσκαλος",
						},
					],
				},
				{
					englishWords: "we saw",
					greekWords: [
						{
							text: "we saw",
							strongs: "G1492",
							OGNTsort: 24381,
							morph: "V-2AAI-1P",
							lemma: "εἴδω",
						},
					],
				},
				{
					englishWords: "someone",
					greekWords: [
						{
							text: "someone",
							strongs: "G5100",
							OGNTsort: 24382,
							morph: "X-ASM",
							lemma: "τις",
						},
					],
				},
				{
					englishWords: "driving out",
					greekWords: [
						{
							text: "driving out",
							strongs: "G1544",
							OGNTsort: 24387,
							morph: "V-PAP-ASM",
							lemma: "ἐκβάλλω",
						},
					],
				},
				{
					englishWords: "demons",
					greekWords: [
						{
							text: "demons",
							strongs: "G1140",
							OGNTsort: 24388,
							morph: "N-APN",
							lemma: "δαιμόνιον",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 24383,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "your",
					greekWords: [
						{
							text: "your",
							strongs: "G4771",
							OGNTsort: 24386,
							morph: "P-2GS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "name",
					greekWords: [
						{
							text: "name",
							strongs: "G3686",
							OGNTsort: 24385,
							morph: "N-DSN",
							lemma: "ὄνομα",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 24389,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "we stopped",
					greekWords: [
						{
							text: "we stopped",
							strongs: "G2967",
							OGNTsort: 24390,
							morph: "V-IAI-1P",
							lemma: "κωλύω",
						},
					],
				},
				{
					englishWords: "him,",
					greekWords: [
						{
							text: "him,",
							strongs: "G846",
							OGNTsort: 24391,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "because",
					greekWords: [
						{
							text: "because",
							strongs: "G3754",
							OGNTsort: 24392,
							morph: "CONJ",
							lemma: "ὅτι",
						},
					],
				},
				{
					englishWords: "he does not follow",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "not",
								strongs: "G3756",
								OGNTsort: 24393,
								morph: "PRT-N",
								lemma: "οὐ",
							},
						},
						{
							word: {
								text: "he does not follow",
								strongs: "G190",
								OGNTsort: 24394,
								morph: "V-IAI-3S",
								lemma: "ἀκολουθέω",
							},
						},
					],
				},
				{
					englishWords: 'us."',
					greekWords: [
						{
							text: 'us."',
							strongs: "G1473",
							OGNTsort: 24395,
							morph: "P-1DP",
							lemma: "ἐγώ",
						},
					],
				},
			],
		},
		{
			verseNum: 39,
			verseWords: [
				{
					englishWords: "But",
					greekWords: [
						{
							text: "But",
							strongs: "G1161",
							OGNTsort: 24397,
							morph: "CONJ",
							lemma: "δέ",
						},
					],
				},
				{
					englishWords: "Jesus",
					greekWords: [
						{
							text: "Jesus",
							strongs: "G2424",
							OGNTsort: 24398,
							morph: "N-NSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
				{
					englishWords: "said,",
					greekWords: [
						{
							text: "said,",
							strongs: "G2036",
							OGNTsort: 24399,
							morph: "V-2AAI-3S",
							lemma: "ἔπω, ἐρῶ, εἶπον",
						},
					],
				},
				{
					englishWords: '"Do not stop',
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "not",
								strongs: "G3361",
								OGNTsort: 24400,
								morph: "PRT-N",
								lemma: "μή",
							},
						},
						{
							word: {
								text: '"Do not stop',
								strongs: "G2967",
								OGNTsort: 24401,
								morph: "V-PAM-2P",
								lemma: "κωλύω",
							},
						},
					],
				},
				{
					englishWords: "him,",
					greekWords: [
						{
							text: "him,",
							strongs: "G846",
							OGNTsort: 24402,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "for",
					greekWords: [
						{
							text: "for",
							strongs: "G1063",
							OGNTsort: 24404,
							morph: "CONJ",
							lemma: "γάρ",
						},
					],
				},
				{
					englishWords: "there is",
					greekWords: [
						{
							text: "there is",
							strongs: "G1510",
							OGNTsort: 24405,
							morph: "V-PAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "no one",
					greekWords: [
						{
							text: "no one",
							strongs: "G3762",
							OGNTsort: 24403,
							morph: "A-NSM",
							lemma: "οὐδείς",
						},
					],
				},
				{
					englishWords: "who",
					greekWords: [
						{
							text: "who",
							strongs: "G3739",
							OGNTsort: 24406,
							morph: "R-NSM",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "will do",
					greekWords: [
						{
							text: "will do",
							strongs: "G4160",
							OGNTsort: 24407,
							morph: "V-FAI-3S",
							lemma: "ποιέω",
						},
					],
				},
				{
					englishWords: "a mighty work",
					greekWords: [
						{
							text: "a mighty work",
							strongs: "G1411",
							OGNTsort: 24408,
							morph: "N-ASF",
							lemma: "δύναμις",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1909",
							OGNTsort: 24409,
							morph: "PREP",
							lemma: "ἐπί",
						},
					],
				},
				{
					englishWords: "my",
					greekWords: [
						{
							text: "my",
							strongs: "G1473",
							OGNTsort: 24412,
							morph: "P-1GS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "name",
					greekWords: [
						{
							text: "name",
							strongs: "G3686",
							OGNTsort: 24411,
							morph: "N-DSN",
							lemma: "ὄνομα",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 24413,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "can",
					greekWords: [
						{
							text: "can",
							strongs: "G1410",
							OGNTsort: 24414,
							morph: "V-FDI-3S",
							lemma: "δύναμαι",
						},
					],
				},
				{
					englishWords: "soon afterwards",
					greekWords: [
						{
							text: "soon afterwards",
							strongs: "G5035",
							OGNTsort: 24415,
							morph: "ADV",
							lemma: "ταχύ",
						},
					],
				},
				{
					englishWords: "say anything bad about",
					greekWords: [
						{
							text: "say anything bad about",
							strongs: "G2551",
							OGNTsort: 24416,
							morph: "V-AAN",
							lemma: "κακολογέω",
						},
					],
				},
				{
					englishWords: "me.",
					greekWords: [
						{
							text: "me.",
							strongs: "G1473",
							OGNTsort: 24417,
							morph: "P-1AS",
							lemma: "ἐγώ",
						},
					],
				},
			],
		},
		{
			verseNum: 40,
			verseWords: [
				{
					englishWords: "Whoever",
					greekWords: [
						{
							text: "Whoever",
							strongs: "G3739",
							OGNTsort: 24418,
							morph: "R-NSM",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "is",
					greekWords: [
						{
							text: "is",
							strongs: "G1510",
							OGNTsort: 24421,
							morph: "V-PAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "not",
					greekWords: [
						{
							text: "not",
							strongs: "G3756",
							OGNTsort: 24420,
							morph: "PRT-N",
							lemma: "οὐ",
						},
					],
				},
				{
					englishWords: "against",
					greekWords: [
						{
							text: "against",
							strongs: "G2596",
							OGNTsort: 24422,
							morph: "PREP",
							lemma: "κατά",
						},
					],
				},
				{
					englishWords: "us",
					greekWords: [
						{
							text: "us",
							strongs: "G1473",
							OGNTsort: 24423,
							morph: "P-1GP",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "is",
					greekWords: [
						{
							text: "is",
							strongs: "G1510",
							OGNTsort: 24426,
							morph: "V-PAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "for",
					greekWords: [
						{
							text: "for",
							strongs: "G5228",
							OGNTsort: 24424,
							morph: "PREP",
							lemma: "ὑπέρ",
						},
					],
				},
				{
					englishWords: "us.",
					greekWords: [
						{
							text: "us.",
							strongs: "G1473",
							OGNTsort: 24425,
							morph: "P-1GP",
							lemma: "ἐγώ",
						},
					],
				},
			],
		},
		{
			verseNum: 41,
			verseWords: [
				{
					englishWords: "Whoever",
					phraseWords: [
						{
							text: "√",
							strongs: "G3739",
							OGNTsort: 24427,
							phraseWords: "Whoever",
							morph: "R-NSM",
							lemma: "ὅς, ἥ",
						},
						{
							text: "√",
							strongs: "G302",
							OGNTsort: 24429,
							phraseWords: "Whoever",
							morph: "PRT",
							lemma: "ἄν",
						},
					],
					subWords: [],
				},
				{
					englishWords: "gives",
					greekWords: [
						{
							text: "gives",
							strongs: "G4222",
							OGNTsort: 24430,
							morph: "V-AAS-3S",
							lemma: "ποτίζω",
						},
					],
				},
				{
					englishWords: "you",
					greekWords: [
						{
							text: "you",
							strongs: "G4771",
							OGNTsort: 24431,
							morph: "P-2AP",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "a cup",
					greekWords: [
						{
							text: "a cup",
							strongs: "G4221",
							OGNTsort: 24432,
							morph: "N-ASN",
							lemma: "ποτήριον",
						},
					],
				},
				{
					englishWords: "of water",
					greekWords: [
						{
							text: "of water",
							strongs: "G5204",
							OGNTsort: 24433,
							morph: "N-GSN",
							lemma: "ὕδωρ, ὕδατος",
						},
					],
				},
				{ englishWords: "to drink" },
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 24434,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{ englishWords: "my" },
				{
					englishWords: "name",
					greekWords: [
						{
							text: "name",
							strongs: "G3686",
							OGNTsort: 24435,
							morph: "N-DSN",
							lemma: "ὄνομα",
						},
					],
				},
				{
					englishWords: "because",
					greekWords: [
						{
							text: "because",
							strongs: "G3754",
							OGNTsort: 24436,
							morph: "CONJ",
							lemma: "ὅτι",
						},
					],
				},
				{
					englishWords: "you belong to",
					phraseWords: [
						{
							text: "√",
							strongs: "G1510",
							OGNTsort: 24438,
							phraseWords: "you belong to",
							morph: "V-PAI-2P",
							lemma: "εἰμί",
						},
					],
					subWords: [],
				},
				{
					englishWords: "Christ,",
					greekWords: [
						{
							text: "Christ,",
							strongs: "G5547",
							OGNTsort: 24437,
							morph: "N-GSM-T",
							lemma: "Χριστός",
						},
					],
				},
				{
					englishWords: "truly",
					greekWords: [
						{
							text: "truly",
							strongs: "G281",
							OGNTsort: 24439,
							morph: "HEB",
							lemma: "ἀμήν",
						},
					],
				},
				{
					englishWords: "I say",
					greekWords: [
						{
							text: "I say",
							strongs: "G3004",
							OGNTsort: 24440,
							morph: "V-PAI-1S",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: "to you,",
					greekWords: [
						{
							text: "to you,",
							strongs: "G4771",
							OGNTsort: 24441,
							morph: "P-2DP",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "he will not lose",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "√",
								strongs: "G3756",
								OGNTsort: 24443,
								subPhraseWords: "not",
								morph: "PRT-N",
								lemma: "οὐ",
							},
						},
						{
							subIdx: "[1]",
							word: {
								text: "√",
								strongs: "G3361",
								OGNTsort: 24444,
								subPhraseWords: "not",
								morph: "PRT-N",
								lemma: "μή",
							},
						},
						{
							word: {
								text: "he will not lose",
								strongs: "G622",
								OGNTsort: 24445,
								morph: "V-AAS-3S",
								lemma: "ἀπολλύω",
							},
						},
					],
				},
				{
					englishWords: "his",
					greekWords: [
						{
							text: "his",
							strongs: "G846",
							OGNTsort: 24448,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "reward.",
					greekWords: [
						{
							text: "reward.",
							strongs: "G3408",
							OGNTsort: 24447,
							morph: "N-ASM",
							lemma: "μισθός",
						},
					],
				},
			],
		},
		{
			verseNum: 42,
			verseWords: [
				{
					englishWords: "Whoever",
					phraseWords: [
						{
							text: "√",
							strongs: "G3739",
							OGNTsort: 24450,
							phraseWords: "Whoever",
							morph: "R-NSM",
							lemma: "ὅς, ἥ",
						},
						{
							text: "√",
							strongs: "G302",
							OGNTsort: 24451,
							phraseWords: "Whoever",
							morph: "PRT",
							lemma: "ἄν",
						},
					],
					subWords: [],
				},
				{
					englishWords:
						"causes one of these little ones who believes in me to stumble,",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "one",
								strongs: "G1520",
								OGNTsort: 24453,
								morph: "A-ASM",
								lemma: "εἷς",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "of these",
								strongs: "G3778",
								OGNTsort: 24456,
								morph: "D-GPM",
								lemma: "οὗτος",
							},
						},
						{
							subIdx: "[3]",
							word: {
								text: "little ones",
								strongs: "G3398",
								OGNTsort: 24455,
								morph: "A-GPM",
								lemma: "μικρός",
							},
						},
						{
							subIdx: "[4]",
							word: {
								text: "who believes",
								strongs: "G4100",
								OGNTsort: 24458,
								morph: "V-PAP-GPM",
								lemma: "πιστεύω",
							},
						},
						{
							subIdx: "[5]",
							word: {
								text: "in",
								strongs: "G1519",
								OGNTsort: 24459,
								morph: "PREP",
								lemma: "εἰς",
							},
						},
						{
							subIdx: "[6]",
							word: {
								text: "me",
								strongs: "G1473",
								OGNTsort: 24460,
								morph: "P-1AS",
								lemma: "ἐγώ",
							},
						},
						{
							word: {
								text: "causes one of these little ones who believes in me to stumble,",
								strongs: "G4624",
								OGNTsort: 24452,
								morph: "V-AAS-3S",
								lemma: "σκανδαλίζω",
							},
						},
					],
				},
				{
					englishWords: "it would be",
					greekWords: [
						{
							text: "it would be",
							strongs: "G1510",
							OGNTsort: 24462,
							morph: "V-PAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "better",
					phraseWords: [
						{
							text: "√",
							strongs: "G2570",
							OGNTsort: 24461,
							phraseWords: "better",
							morph: "A-NSN",
							lemma: "καλός",
						},
						{
							text: "√",
							strongs: "G3123",
							OGNTsort: 24464,
							phraseWords: "better",
							morph: "ADV",
							lemma: "μᾶλλον",
						},
					],
					subWords: [],
				},
				{
					englishWords: "for him",
					greekWords: [
						{
							text: "for him",
							strongs: "G846",
							OGNTsort: 24463,
							morph: "P-DSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "to have a large millstone tied",
					subWords: [
						{
							subIdx: "[7]",
							word: {
								text: "√",
								strongs: "G1487",
								OGNTsort: 24465,
								subPhraseWords: "a large millstone",
								morph: "CONJ",
								lemma: "εἰ",
							},
						},
						{
							subIdx: "[7]",
							word: {
								text: "√",
								strongs: "G3458",
								OGNTsort: 24467,
								subPhraseWords: "a large millstone",
								morph: "N-NSM",
								lemma: "μύλος",
							},
						},
						{
							subIdx: "[7]",
							word: {
								text: "√",
								strongs: "G3684",
								OGNTsort: 24468,
								subPhraseWords: "a large millstone",
								morph: "A-NSM",
								lemma: "ὀνικός",
							},
						},
						{
							word: {
								text: "to have a large millstone tied",
								strongs: "G4029",
								OGNTsort: 24466,
								morph: "V-PNI-3S",
								lemma: "περίκειμαι",
							},
						},
					],
				},
				{
					englishWords: "around",
					greekWords: [
						{
							text: "around",
							strongs: "G4012",
							OGNTsort: 24469,
							morph: "PREP",
							lemma: "περί",
						},
					],
				},
				{
					englishWords: "his",
					greekWords: [
						{
							text: "his",
							strongs: "G846",
							OGNTsort: 24472,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "neck",
					greekWords: [
						{
							text: "neck",
							strongs: "G5137",
							OGNTsort: 24471,
							morph: "N-ASM",
							lemma: "τράχηλος",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 24473,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "be thrown",
					greekWords: [
						{
							text: "be thrown",
							strongs: "G906",
							OGNTsort: 24474,
							morph: "V-RPI-3S",
							lemma: "βάλλω",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 24475,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 24476,
							morph: "T-ASF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "sea.",
					greekWords: [
						{
							text: "sea.",
							strongs: "G2281",
							OGNTsort: 24477,
							morph: "N-ASF",
							lemma: "θάλασσα",
						},
					],
				},
			],
		},
		{
			verseNum: 43,
			verseWords: [
				{
					englishWords: "If",
					greekWords: [
						{
							text: "If",
							strongs: "G1437",
							OGNTsort: 24479,
							morph: "CONJ",
							lemma: "ἐάν",
						},
					],
				},
				{
					englishWords: "your",
					greekWords: [
						{
							text: "your",
							strongs: "G4771",
							OGNTsort: 24484,
							morph: "P-2GS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "hand",
					greekWords: [
						{
							text: "hand",
							strongs: "G5495",
							OGNTsort: 24483,
							morph: "N-NSF",
							lemma: "χείρ",
						},
					],
				},
				{
					englishWords: "causes you to stumble,",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "you",
								strongs: "G4771",
								OGNTsort: 24481,
								morph: "P-2AS",
								lemma: "σύ",
							},
						},
						{
							word: {
								text: "causes you to stumble,",
								strongs: "G4624",
								OGNTsort: 24480,
								morph: "V-PAS-3S",
								lemma: "σκανδαλίζω",
							},
						},
					],
				},
				{
					englishWords: "cut it off.",
					subWords: [
						{
							subIdx: "[2]",
							word: {
								text: "it",
								strongs: "G846",
								OGNTsort: 24486,
								morph: "P-ASF",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: "cut it off.",
								strongs: "G609",
								OGNTsort: 24485,
								morph: "V-AAM-2S",
								lemma: "ἀποκόπτω",
							},
						},
					],
				},
				{
					englishWords: "It is",
					greekWords: [
						{
							text: "It is",
							strongs: "G1510",
							OGNTsort: 24488,
							morph: "V-PAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "better",
					greekWords: [
						{
							text: "better",
							strongs: "G2570",
							OGNTsort: 24487,
							morph: "A-NSN",
							lemma: "καλός",
						},
					],
				},
				{
					englishWords: "for you",
					greekWords: [
						{
							text: "for you",
							strongs: "G4771",
							OGNTsort: 24489,
							morph: "P-2AS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "to enter",
					greekWords: [
						{
							text: "to enter",
							strongs: "G1525",
							OGNTsort: 24491,
							morph: "V-2AAN",
							lemma: "εἰσέρχομαι",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 24492,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "life",
					greekWords: [
						{
							text: "life",
							strongs: "G2222",
							OGNTsort: 24494,
							morph: "N-ASF",
							lemma: "ζωή",
						},
					],
				},
				{
					englishWords: "maimed",
					greekWords: [
						{
							text: "maimed",
							strongs: "G2948",
							OGNTsort: 24490,
							morph: "A-ASM",
							lemma: "κυλλός",
						},
					],
				},
				{
					englishWords: "than",
					greekWords: [
						{
							text: "than",
							strongs: "G2228",
							OGNTsort: 24495,
							morph: "CONJ",
							lemma: "ἤ",
						},
					],
				},
				{
					englishWords: "to have",
					greekWords: [
						{
							text: "to have",
							strongs: "G2192",
							OGNTsort: 24499,
							morph: "V-PAP-ASM",
							lemma: "ἔχω",
						},
					],
				},
				{
					englishWords: "two",
					greekWords: [
						{
							text: "two",
							strongs: "G1417",
							OGNTsort: 24497,
							morph: "A-APF-NUI",
							lemma: "δύο",
						},
					],
				},
				{
					englishWords: "hands",
					greekWords: [
						{
							text: "hands",
							strongs: "G5495",
							OGNTsort: 24498,
							morph: "N-APF",
							lemma: "χείρ",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "to go",
					greekWords: [
						{
							text: "to go",
							strongs: "G565",
							OGNTsort: 24500,
							morph: "V-2AAN",
							lemma: "ἀπέρχομαι",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 24501,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "hell,",
					greekWords: [
						{
							text: "hell,",
							strongs: "G1067",
							OGNTsort: 24503,
							morph: "N-ASF-T",
							lemma: "γέεννα",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 24504,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 24507,
							morph: "T-ASN",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "unquenchable",
					greekWords: [
						{
							text: "unquenchable",
							strongs: "G762",
							OGNTsort: 24508,
							morph: "A-ASN",
							lemma: "ἄσβεστος",
						},
					],
				},
				{
					englishWords: "fire.",
					greekWords: [
						{
							text: "fire.",
							strongs: "G4442",
							OGNTsort: 24506,
							morph: "N-ASN",
							lemma: "πῦρ",
						},
					],
				},
			],
		},
		{
			verseNum: 45,
			verseWords: [
				{
					englishWords: "If",
					greekWords: [
						{
							text: "If",
							strongs: "G1437",
							OGNTsort: 24510,
							morph: "CONJ",
							lemma: "ἐάν",
						},
					],
				},
				{
					englishWords: "your",
					greekWords: [
						{
							text: "your",
							strongs: "G4771",
							OGNTsort: 24513,
							morph: "P-2GS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "foot",
					greekWords: [
						{
							text: "foot",
							strongs: "G4228",
							OGNTsort: 24512,
							morph: "N-NSM",
							lemma: "πούς",
						},
					],
				},
				{
					englishWords: "causes you to stumble,",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "you",
								strongs: "G4771",
								OGNTsort: 24515,
								morph: "P-2AS",
								lemma: "σύ",
							},
						},
						{
							word: {
								text: "causes you to stumble,",
								strongs: "G4624",
								OGNTsort: 24514,
								morph: "V-PAS-3S",
								lemma: "σκανδαλίζω",
							},
						},
					],
				},
				{
					englishWords: "cut it off.",
					subWords: [
						{
							subIdx: "[2]",
							word: {
								text: "it",
								strongs: "G846",
								OGNTsort: 24517,
								morph: "P-ASM",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: "cut it off.",
								strongs: "G609",
								OGNTsort: 24516,
								morph: "V-AAM-2S",
								lemma: "ἀποκόπτω",
							},
						},
					],
				},
				{
					englishWords: "It is",
					greekWords: [
						{
							text: "It is",
							strongs: "G1510",
							OGNTsort: 24519,
							morph: "V-PAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "better",
					greekWords: [
						{
							text: "better",
							strongs: "G2570",
							OGNTsort: 24518,
							morph: "A-NSN",
							lemma: "καλός",
						},
					],
				},
				{
					englishWords: "for you",
					greekWords: [
						{
							text: "for you",
							strongs: "G4771",
							OGNTsort: 24520,
							morph: "P-2AS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "to enter",
					greekWords: [
						{
							text: "to enter",
							strongs: "G1525",
							OGNTsort: 24521,
							morph: "V-2AAN",
							lemma: "εἰσέρχομαι",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 24522,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "life",
					greekWords: [
						{
							text: "life",
							strongs: "G2222",
							OGNTsort: 24524,
							morph: "N-ASF",
							lemma: "ζωή",
						},
					],
				},
				{
					englishWords: "lame",
					greekWords: [
						{
							text: "lame",
							strongs: "G5560",
							OGNTsort: 24525,
							morph: "A-ASM",
							lemma: "χωλός",
						},
					],
				},
				{
					englishWords: "than",
					greekWords: [
						{
							text: "than",
							strongs: "G2228",
							OGNTsort: 24526,
							morph: "CONJ",
							lemma: "ἤ",
						},
					],
				},
				{
					englishWords: "to have",
					greekWords: [
						{
							text: "to have",
							strongs: "G2192",
							OGNTsort: 24530,
							morph: "V-PAP-ASM",
							lemma: "ἔχω",
						},
					],
				},
				{ englishWords: "your" },
				{
					englishWords: "two",
					greekWords: [
						{
							text: "two",
							strongs: "G1417",
							OGNTsort: 24528,
							morph: "A-APM-NUI",
							lemma: "δύο",
						},
					],
				},
				{
					englishWords: "feet",
					greekWords: [
						{
							text: "feet",
							strongs: "G4228",
							OGNTsort: 24529,
							morph: "N-APM",
							lemma: "πούς",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "be thrown",
					greekWords: [
						{
							text: "be thrown",
							strongs: "G906",
							OGNTsort: 24531,
							morph: "V-APN",
							lemma: "βάλλω",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 24532,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "hell.",
					greekWords: [
						{
							text: "hell.",
							strongs: "G1067",
							OGNTsort: 24534,
							morph: "N-ASF-T",
							lemma: "γέεννα",
						},
					],
				},
			],
		},
		{
			verseNum: 47,
			verseWords: [
				{
					englishWords: "If",
					greekWords: [
						{
							text: "If",
							strongs: "G1437",
							OGNTsort: 24536,
							morph: "CONJ",
							lemma: "ἐάν",
						},
					],
				},
				{
					englishWords: "your",
					greekWords: [
						{
							text: "your",
							strongs: "G4771",
							OGNTsort: 24539,
							morph: "P-2GS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "eye",
					greekWords: [
						{
							text: "eye",
							strongs: "G3788",
							OGNTsort: 24538,
							morph: "N-NSM",
							lemma: "ὀφθαλμός",
						},
					],
				},
				{
					englishWords: "causes you to stumble,",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "you",
								strongs: "G4771",
								OGNTsort: 24541,
								morph: "P-2AS",
								lemma: "σύ",
							},
						},
						{
							word: {
								text: "causes you to stumble,",
								strongs: "G4624",
								OGNTsort: 24540,
								morph: "V-PAS-3S",
								lemma: "σκανδαλίζω",
							},
						},
					],
				},
				{
					englishWords: "tear it out.",
					subWords: [
						{
							subIdx: "[2]",
							word: {
								text: "it",
								strongs: "G846",
								OGNTsort: 24543,
								morph: "P-ASM",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: "tear it out.",
								strongs: "G1544",
								OGNTsort: 24542,
								morph: "V-2AAM-2S",
								lemma: "ἐκβάλλω",
							},
						},
					],
				},
				{
					englishWords: "It is",
					greekWords: [
						{
							text: "It is",
							strongs: "G1510",
							OGNTsort: 24546,
							morph: "V-PAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "better",
					greekWords: [
						{
							text: "better",
							strongs: "G2570",
							OGNTsort: 24544,
							morph: "A-NSN",
							lemma: "καλός",
						},
					],
				},
				{
					englishWords: "for you",
					greekWords: [
						{
							text: "for you",
							strongs: "G4771",
							OGNTsort: 24545,
							morph: "P-2AS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "to enter",
					greekWords: [
						{
							text: "to enter",
							strongs: "G1525",
							OGNTsort: 24548,
							morph: "V-2AAN",
							lemma: "εἰσέρχομαι",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 24549,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 24550,
							morph: "T-ASF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "kingdom",
					greekWords: [
						{
							text: "kingdom",
							strongs: "G932",
							OGNTsort: 24551,
							morph: "N-ASF",
							lemma: "βασιλεία",
						},
					],
				},
				{
					englishWords: "of God",
					greekWords: [
						{
							text: "of God",
							strongs: "G2316",
							OGNTsort: 24553,
							morph: "N-GSM",
							lemma: "θεός",
						},
					],
				},
				{
					englishWords: "with one eye",
					greekWords: [
						{
							text: "with one eye",
							strongs: "G3442",
							OGNTsort: 24547,
							morph: "A-ASM",
							lemma: "μονόφθαλμος",
						},
					],
				},
				{
					englishWords: "than",
					greekWords: [
						{
							text: "than",
							strongs: "G2228",
							OGNTsort: 24554,
							morph: "CONJ",
							lemma: "ἤ",
						},
					],
				},
				{
					englishWords: "to have",
					greekWords: [
						{
							text: "to have",
							strongs: "G2192",
							OGNTsort: 24557,
							morph: "V-PAP-ASM",
							lemma: "ἔχω",
						},
					],
				},
				{
					englishWords: "two",
					greekWords: [
						{
							text: "two",
							strongs: "G1417",
							OGNTsort: 24555,
							morph: "A-APM-NUI",
							lemma: "δύο",
						},
					],
				},
				{
					englishWords: "eyes",
					greekWords: [
						{
							text: "eyes",
							strongs: "G3788",
							OGNTsort: 24556,
							morph: "N-APM",
							lemma: "ὀφθαλμός",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "to be thrown",
					greekWords: [
						{
							text: "to be thrown",
							strongs: "G906",
							OGNTsort: 24558,
							morph: "V-APN",
							lemma: "βάλλω",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 24559,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "hell,",
					greekWords: [
						{
							text: "hell,",
							strongs: "G1067",
							OGNTsort: 24561,
							morph: "N-ASF-T",
							lemma: "γέεννα",
						},
					],
				},
			],
		},
		{
			verseNum: 48,
			verseWords: [
				{
					englishWords: "where",
					greekWords: [
						{
							text: "where",
							strongs: "G3699",
							OGNTsort: 24562,
							morph: "ADV",
							lemma: "ὅπου",
						},
					],
				},
				{
					englishWords: "their",
					greekWords: [
						{
							text: "their",
							strongs: "G846",
							OGNTsort: 24565,
							morph: "P-GPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "worm",
					greekWords: [
						{
							text: "worm",
							strongs: "G4663",
							OGNTsort: 24564,
							morph: "N-NSM",
							lemma: "σκώληξ",
						},
					],
				},
				{
					englishWords: "does not die,",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "not",
								strongs: "G3756",
								OGNTsort: 24566,
								morph: "PRT-N",
								lemma: "οὐ",
							},
						},
						{
							word: {
								text: "does not die,",
								strongs: "G5053",
								OGNTsort: 24567,
								morph: "V-PAI-3S",
								lemma: "τελευτάω",
							},
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 24568,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 24569,
							morph: "T-NSN",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "fire",
					greekWords: [
						{
							text: "fire",
							strongs: "G4442",
							OGNTsort: 24570,
							morph: "N-NSN",
							lemma: "πῦρ",
						},
					],
				},
				{
					englishWords: "is not put out.",
					subWords: [
						{
							subIdx: "[2]",
							word: {
								text: "not",
								strongs: "G3756",
								OGNTsort: 24571,
								morph: "PRT-N",
								lemma: "οὐ",
							},
						},
						{
							word: {
								text: "is not put out.",
								strongs: "G4570",
								OGNTsort: 24572,
								morph: "V-PPI-3S",
								lemma: "σβέννυμι",
							},
						},
					],
				},
			],
		},
		{
			verseNum: 49,
			verseWords: [
				{
					englishWords: "For",
					greekWords: [
						{
							text: "For",
							strongs: "G1063",
							OGNTsort: 24574,
							morph: "CONJ",
							lemma: "γάρ",
						},
					],
				},
				{
					englishWords: "everyone",
					greekWords: [
						{
							text: "everyone",
							strongs: "G3956",
							OGNTsort: 24573,
							morph: "A-NSM",
							lemma: "πᾶς",
						},
					],
				},
				{
					englishWords: "will be salted",
					greekWords: [
						{
							text: "will be salted",
							strongs: "G233",
							OGNTsort: 24576,
							morph: "V-FPI-3S",
							lemma: "ἁλίζω",
						},
					],
				},
				{
					englishWords: "with fire.",
					greekWords: [
						{
							text: "with fire.",
							strongs: "G4442",
							OGNTsort: 24575,
							morph: "N-DSN",
							lemma: "πῦρ",
						},
					],
				},
			],
		},
		{
			verseNum: 50,
			verseWords: [
				{
					englishWords: "Salt",
					greekWords: [
						{
							text: "Salt",
							strongs: "G217",
							OGNTsort: 24579,
							morph: "N-NSN",
							lemma: "ἅλας",
						},
					],
				},
				{ englishWords: "is" },
				{
					englishWords: "good,",
					greekWords: [
						{
							text: "good,",
							strongs: "G2570",
							OGNTsort: 24577,
							morph: "A-NSN",
							lemma: "καλός",
						},
					],
				},
				{
					englishWords: "but",
					greekWords: [
						{
							text: "but",
							strongs: "G1161",
							OGNTsort: 24581,
							morph: "CONJ",
							lemma: "δέ",
						},
					],
				},
				{
					englishWords: "if",
					greekWords: [
						{
							text: "if",
							strongs: "G1437",
							OGNTsort: 24580,
							morph: "CONJ",
							lemma: "ἐάν",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 24582,
							morph: "T-NSN",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "salt",
					greekWords: [
						{
							text: "salt",
							strongs: "G217",
							OGNTsort: 24583,
							morph: "N-NSN",
							lemma: "ἅλας",
						},
					],
				},
				{
					englishWords: "has lost its saltiness,",
					phraseWords: [
						{
							text: "√",
							strongs: "G358",
							OGNTsort: 24584,
							phraseWords: "has lost its saltiness,",
							morph: "A-NSN",
							lemma: "ἄναλος",
						},
						{
							text: "√",
							strongs: "G1096",
							OGNTsort: 24585,
							phraseWords: "has lost its saltiness,",
							morph: "V-2ADS-3S",
							lemma: "γίνομαι",
						},
						{
							text: "√",
							strongs: "G1722",
							OGNTsort: 24586,
							phraseWords: "how",
							morph: "PREP",
							lemma: "ἐν",
						},
						{
							text: "√",
							strongs: "G5101",
							OGNTsort: 24587,
							phraseWords: "how",
							morph: "I-DSN",
							lemma: "τίς",
						},
					],
					subWords: [],
				},
				{
					englishWords: "can you make it salty",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "it",
								strongs: "G846",
								OGNTsort: 24588,
								morph: "P-ASN",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: "can you make it salty",
								strongs: "G741",
								OGNTsort: 24589,
								morph: "V-FAI-2P",
								lemma: "ἀρτύω",
							},
						},
					],
				},
				{ englishWords: "again?" },
				{
					englishWords: "Have",
					greekWords: [
						{
							text: "Have",
							strongs: "G2192",
							OGNTsort: 24590,
							morph: "V-PAM-2P",
							lemma: "ἔχω",
						},
					],
				},
				{
					englishWords: "salt",
					greekWords: [
						{
							text: "salt",
							strongs: "G217",
							OGNTsort: 24593,
							morph: "N-ASN",
							lemma: "ἅλας",
						},
					],
				},
				{
					englishWords: "among",
					greekWords: [
						{
							text: "among",
							strongs: "G1722",
							OGNTsort: 24591,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "yourselves,",
					greekWords: [
						{
							text: "yourselves,",
							strongs: "G1438",
							OGNTsort: 24592,
							morph: "F-2DPM",
							lemma: "ἑαυτοῦ",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 24594,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "be at peace",
					greekWords: [
						{
							text: "be at peace",
							strongs: "G1514",
							OGNTsort: 24595,
							morph: "V-PAM-2P",
							lemma: "εἰρηνεύω",
						},
					],
				},
				{
					englishWords: "with",
					greekWords: [
						{
							text: "with",
							strongs: "G1722",
							OGNTsort: 24596,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: 'one another."',
					greekWords: [
						{
							text: 'one another."',
							strongs: "G240",
							OGNTsort: 24597,
							morph: "C-DPM",
							lemma: "ἀλλήλων",
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 1,
			verseWords: [
				{
					englishWords:
						"Let all who are under the yoke as slaves regard",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "all who",
								strongs: "G3745",
								OGNTsort: 113051,
								morph: "K-NPM",
								lemma: "ὅσος",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "are",
								strongs: "G1510",
								OGNTsort: 113052,
								morph: "V-PAI-3P",
								lemma: "εἰμί",
							},
						},
						{
							subIdx: "[3]",
							word: {
								text: "under",
								strongs: "G5259",
								OGNTsort: 113053,
								morph: "PREP",
								lemma: "ὑπό",
							},
						},
						{
							subIdx: "[4]",
							word: {
								text: "the yoke",
								strongs: "G2218",
								OGNTsort: 113054,
								morph: "N-ASM",
								lemma: "ζυγός",
							},
						},
						{
							subIdx: "[5]",
							word: {
								text: "as slaves",
								strongs: "G1401",
								OGNTsort: 113055,
								morph: "N-NPM",
								lemma: "δοῦλος",
							},
						},
						{
							word: {
								text: "Let all who are under the yoke as slaves regard",
								strongs: "G2233",
								OGNTsort: 113062,
								morph: "V-PNM-3P",
								lemma: "ἡγέομαι",
							},
						},
					],
				},
				{
					englishWords: "their own",
					greekWords: [
						{
							text: "their own",
							strongs: "G2398",
							OGNTsort: 113057,
							morph: "A-APM",
							lemma: "ἴδιος",
						},
					],
				},
				{
					englishWords: "masters",
					greekWords: [
						{
							text: "masters",
							strongs: "G1203",
							OGNTsort: 113058,
							morph: "N-APM",
							lemma: "δεσπότης",
						},
					],
				},
				{
					englishWords: "as worthy",
					greekWords: [
						{
							text: "as worthy",
							strongs: "G514",
							OGNTsort: 113061,
							morph: "A-APM",
							lemma: "ἄξιος",
						},
					],
				},
				{
					englishWords: "of all",
					greekWords: [
						{
							text: "of all",
							strongs: "G3956",
							OGNTsort: 113059,
							morph: "A-GSF",
							lemma: "πᾶς",
						},
					],
				},
				{
					englishWords: "honor.",
					greekWords: [
						{
							text: "honor.",
							strongs: "G5092",
							OGNTsort: 113060,
							morph: "N-GSF",
							lemma: "τιμή",
						},
					],
				},
				{ englishWords: "They should do this" },
				{
					englishWords: "so that",
					greekWords: [
						{
							text: "so that",
							strongs: "G2443",
							OGNTsort: 113063,
							morph: "CONJ",
							lemma: "ἵνα",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 113065,
							morph: "T-NSN",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "name",
					greekWords: [
						{
							text: "name",
							strongs: "G3686",
							OGNTsort: 113066,
							morph: "N-NSN",
							lemma: "ὄνομα",
						},
					],
				},
				{
					englishWords: "of",
					greekWords: [
						{
							text: "of",
							strongs: "G3588",
							OGNTsort: 113067,
							morph: "T-GSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "God",
					greekWords: [
						{
							text: "God",
							strongs: "G2316",
							OGNTsort: 113068,
							morph: "N-GSM",
							lemma: "θεός",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 113069,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 113070,
							morph: "T-NSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "teaching",
					greekWords: [
						{
							text: "teaching",
							strongs: "G1319",
							OGNTsort: 113071,
							morph: "N-NSF",
							lemma: "διδασκαλία",
						},
					],
				},
				{
					englishWords: "might not be blasphemed.",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "not",
								strongs: "G3361",
								OGNTsort: 113064,
								morph: "PRT-N",
								lemma: "μή",
							},
						},
						{
							word: {
								text: "might not be blasphemed.",
								strongs: "G987",
								OGNTsort: 113072,
								morph: "V-PPS-3S",
								lemma: "βλασφημέω",
							},
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 42,
			verseWords: [
				{
					englishWords: "Whoever",
					phraseWords: [
						{
							text: "√",
							strongs: "G3739",
							OGNTsort: 5582,
							phraseWords: "Whoever",
							morph: "R-NSM",
							lemma: "ὅς, ἥ",
						},
						{
							text: "√",
							strongs: "G302",
							OGNTsort: 5583,
							phraseWords: "Whoever",
							morph: "PRT",
							lemma: "ἄν",
						},
					],
					subWords: [],
				},
				{
					englishWords:
						"gives to one of these little ones even a cup of cold water to drink",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "to one",
								strongs: "G1520",
								OGNTsort: 5585,
								morph: "A-ASM",
								lemma: "εἷς",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "of",
								strongs: "G3588",
								OGNTsort: 5586,
								morph: "T-GPM",
								lemma: "ὁ",
							},
						},
						{
							subIdx: "[3]",
							word: {
								text: "these",
								strongs: "G3778",
								OGNTsort: 5588,
								morph: "D-GPM",
								lemma: "οὗτος",
							},
						},
						{
							subIdx: "[4]",
							word: {
								text: "little ones",
								strongs: "G3398",
								OGNTsort: 5587,
								morph: "A-GPM",
								lemma: "μικρός",
							},
						},
						{
							subIdx: "[5]",
							word: {
								text: "even",
								strongs: "G3440",
								OGNTsort: 5591,
								morph: "ADV",
								lemma: "μόνον",
							},
						},
						{
							subIdx: "[6]",
							word: {
								text: "a cup",
								strongs: "G4221",
								OGNTsort: 5589,
								morph: "N-ASN",
								lemma: "ποτήριον",
							},
						},
						{
							subIdx: "[7]",
							word: {
								text: "of cold water",
								strongs: "G5593",
								OGNTsort: 5590,
								morph: "A-GSN",
								lemma: "ψυχρός",
							},
						},
						{
							word: {
								text: "gives to one of these little ones even a cup of cold water to drink",
								strongs: "G4222",
								OGNTsort: 5584,
								morph: "V-AAS-3S",
								lemma: "ποτίζω",
							},
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1519",
							OGNTsort: 5592,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "the name",
					greekWords: [
						{
							text: "the name",
							strongs: "G3686",
							OGNTsort: 5593,
							morph: "N-ASN",
							lemma: "ὄνομα",
						},
					],
				},
				{
					englishWords: "of a disciple,",
					greekWords: [
						{
							text: "of a disciple,",
							strongs: "G3101",
							OGNTsort: 5594,
							morph: "N-GSM",
							lemma: "μαθητής",
						},
					],
				},
				{
					englishWords: "truly",
					greekWords: [
						{
							text: "truly",
							strongs: "G281",
							OGNTsort: 5595,
							morph: "HEB",
							lemma: "ἀμήν",
						},
					],
				},
				{
					englishWords: "I say",
					greekWords: [
						{
							text: "I say",
							strongs: "G3004",
							OGNTsort: 5596,
							morph: "V-PAI-1S",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: "to you,",
					greekWords: [
						{
							text: "to you,",
							strongs: "G4771",
							OGNTsort: 5597,
							morph: "P-2DP",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "he will in no way lose",
					subWords: [
						{
							subIdx: "[8]",
							word: {
								text: "√",
								strongs: "G3756",
								OGNTsort: 5598,
								subPhraseWords: "in no way",
								morph: "PRT-N",
								lemma: "οὐ",
							},
						},
						{
							subIdx: "[8]",
							word: {
								text: "√",
								strongs: "G3361",
								OGNTsort: 5599,
								subPhraseWords: "in no way",
								morph: "PRT-N",
								lemma: "μή",
							},
						},
						{
							word: {
								text: "he will in no way lose",
								strongs: "G622",
								OGNTsort: 5600,
								morph: "V-AAS-3S",
								lemma: "ἀπολλύω",
							},
						},
					],
				},
				{
					englishWords: "his",
					greekWords: [
						{
							text: "his",
							strongs: "G846",
							OGNTsort: 5603,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: 'reward."',
					greekWords: [
						{
							text: 'reward."',
							strongs: "G3408",
							OGNTsort: 5602,
							morph: "N-ASM",
							lemma: "μισθός",
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 1,
			verseWords: [
				{
					englishWords: "Paul,",
					greekWords: [
						{
							text: "Paul,",
							strongs: "G3972",
							OGNTsort: 115291,
							morph: "N-NSM-P",
							lemma: "Παῦλος",
						},
					],
				},
				{
					englishWords: "a prisoner",
					greekWords: [
						{
							text: "a prisoner",
							strongs: "G1198",
							OGNTsort: 115292,
							morph: "N-NSM",
							lemma: "δέσμιος",
						},
					],
				},
				{
					englishWords: "of Christ",
					greekWords: [
						{
							text: "of Christ",
							strongs: "G5547",
							OGNTsort: 115293,
							morph: "N-GSM-T",
							lemma: "Χριστός",
						},
					],
				},
				{
					englishWords: "Jesus,",
					greekWords: [
						{
							text: "Jesus,",
							strongs: "G2424",
							OGNTsort: 115294,
							morph: "N-GSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 115295,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 115297,
							morph: "T-NSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "brother",
					greekWords: [
						{
							text: "brother",
							strongs: "G80",
							OGNTsort: 115298,
							morph: "N-NSM",
							lemma: "ἀδελφός",
						},
					],
				},
				{
					englishWords: "Timothy,",
					greekWords: [
						{
							text: "Timothy,",
							strongs: "G5095",
							OGNTsort: 115296,
							morph: "N-NSM-P",
							lemma: "Τιμόθεος",
						},
					],
				},
				{
					englishWords: "to Philemon,",
					greekWords: [
						{
							text: "to Philemon,",
							strongs: "G5371",
							OGNTsort: 115299,
							morph: "N-DSM-P",
							lemma: "Φιλήμων",
						},
					],
				},
				{
					englishWords: "our",
					greekWords: [
						{
							text: "our",
							strongs: "G1473",
							OGNTsort: 115304,
							morph: "P-1GP",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "dear friend",
					greekWords: [
						{
							text: "dear friend",
							strongs: "G27",
							OGNTsort: 115301,
							morph: "A-DSM",
							lemma: "ἀγαπητός",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 115302,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "fellow worker,",
					greekWords: [
						{
							text: "fellow worker,",
							strongs: "G4904",
							OGNTsort: 115303,
							morph: "A-DSM",
							lemma: "συνεργός",
						},
					],
				},
			],
		},
		{
			verseNum: 2,
			verseWords: [
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 115305,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "to Apphia",
					greekWords: [
						{
							text: "to Apphia",
							strongs: "G682",
							OGNTsort: 115306,
							morph: "N-DSF-P",
							lemma: "Ἀπφία",
						},
					],
				},
				{
					englishWords: "our",
					greekWords: [
						{
							text: "our",
							strongs: "G1473",
							OGNTsort: 115313,
							morph: "P-1GP",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "sister,",
					greekWords: [
						{
							text: "sister,",
							strongs: "G79",
							OGNTsort: 115308,
							morph: "N-DSF",
							lemma: "ἀδελφή",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 115309,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "to Archippus",
					greekWords: [
						{
							text: "to Archippus",
							strongs: "G751",
							OGNTsort: 115310,
							morph: "N-DSM-P",
							lemma: "Ἄρχιππος",
						},
					],
				},
				{ englishWords: "our" },
				{
					englishWords: "fellow soldier,",
					greekWords: [
						{
							text: "fellow soldier,",
							strongs: "G4961",
							OGNTsort: 115312,
							morph: "N-DSM",
							lemma: "συστρατιώτης",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 115314,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "to the",
					greekWords: [
						{
							text: "to the",
							strongs: "G3588",
							OGNTsort: 115315,
							morph: "T-DSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "church",
					greekWords: [
						{
							text: "church",
							strongs: "G1577",
							OGNTsort: 115319,
							morph: "N-DSF",
							lemma: "ἐκκλησία",
						},
					],
				},
				{
					englishWords: "that meets in",
					greekWords: [
						{
							text: "that meets in",
							strongs: "G2596",
							OGNTsort: 115316,
							morph: "PREP",
							lemma: "κατά",
						},
					],
				},
				{
					englishWords: "your",
					greekWords: [
						{
							text: "your",
							strongs: "G4771",
							OGNTsort: 115318,
							morph: "P-2GS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "home.",
					greekWords: [
						{
							text: "home.",
							strongs: "G3624",
							OGNTsort: 115317,
							morph: "N-ASM",
							lemma: "οἶκος",
						},
					],
				},
			],
		},
		{
			verseNum: 3,
			verseWords: [
				{
					englishWords: "May grace be",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "grace",
								strongs: "G5485",
								OGNTsort: 115320,
								morph: "N-NSF",
								lemma: "χάρις",
							},
						},
					],
				},
				{
					englishWords: "to you",
					greekWords: [
						{
							text: "to you",
							strongs: "G4771",
							OGNTsort: 115321,
							morph: "P-2DP",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 115322,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "peace",
					greekWords: [
						{
							text: "peace",
							strongs: "G1515",
							OGNTsort: 115323,
							morph: "N-NSF",
							lemma: "εἰρήνη",
						},
					],
				},
				{
					englishWords: "from",
					greekWords: [
						{
							text: "from",
							strongs: "G575",
							OGNTsort: 115324,
							morph: "PREP",
							lemma: "ἀπό",
						},
					],
				},
				{
					englishWords: "God",
					greekWords: [
						{
							text: "God",
							strongs: "G2316",
							OGNTsort: 115325,
							morph: "N-GSM",
							lemma: "θεός",
						},
					],
				},
				{
					englishWords: "our",
					greekWords: [
						{
							text: "our",
							strongs: "G1473",
							OGNTsort: 115327,
							morph: "P-1GP",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "Father",
					greekWords: [
						{
							text: "Father",
							strongs: "G3962",
							OGNTsort: 115326,
							morph: "N-GSM",
							lemma: "πατήρ",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 115328,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "the Lord",
					greekWords: [
						{
							text: "the Lord",
							strongs: "G2962",
							OGNTsort: 115329,
							morph: "N-GSM",
							lemma: "κύριος",
						},
					],
				},
				{
					englishWords: "Jesus",
					greekWords: [
						{
							text: "Jesus",
							strongs: "G2424",
							OGNTsort: 115330,
							morph: "N-GSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
				{
					englishWords: "Christ.",
					greekWords: [
						{
							text: "Christ.",
							strongs: "G5547",
							OGNTsort: 115331,
							morph: "N-GSM-T",
							lemma: "Χριστός",
						},
					],
				},
			],
		},
		{
			verseNum: 4,
			verseWords: [
				{
					englishWords: "I always thank",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "always",
								strongs: "G3842",
								OGNTsort: 115336,
								morph: "ADV",
								lemma: "πάντοτε",
							},
						},
						{
							word: {
								text: "I always thank",
								strongs: "G2168",
								OGNTsort: 115332,
								morph: "V-PAI-1S",
								lemma: "εὐχαριστέω",
							},
						},
					],
				},
				{
					englishWords: "my",
					greekWords: [
						{
							text: "my",
							strongs: "G1473",
							OGNTsort: 115335,
							morph: "P-1GS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "God",
					greekWords: [
						{
							text: "God",
							strongs: "G2316",
							OGNTsort: 115334,
							morph: "N-DSM",
							lemma: "θεός",
						},
					],
				},
				{
					englishWords: "when I mention",
					phraseWords: [
						{
							text: "√",
							strongs: "G4160",
							OGNTsort: 115339,
							phraseWords: "when I mention",
							morph: "V-PMP-NSM",
							lemma: "ποιέω",
						},
						{
							text: "√",
							strongs: "G3417",
							OGNTsort: 115337,
							phraseWords: "when I mention",
							morph: "N-ASF",
							lemma: "μνεία",
						},
					],
					subWords: [],
				},
				{
					englishWords: "you",
					greekWords: [
						{
							text: "you",
							strongs: "G4771",
							OGNTsort: 115338,
							morph: "P-2GS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1909",
							OGNTsort: 115340,
							morph: "PREP",
							lemma: "ἐπί",
						},
					],
				},
				{
					englishWords: "my",
					greekWords: [
						{
							text: "my",
							strongs: "G1473",
							OGNTsort: 115343,
							morph: "P-1GS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "prayers,",
					greekWords: [
						{
							text: "prayers,",
							strongs: "G4335",
							OGNTsort: 115342,
							morph: "N-GPF",
							lemma: "προσευχή",
						},
					],
				},
			],
		},
		{
			verseNum: 5,
			verseWords: [
				{ englishWords: "because I" },
				{
					englishWords: "hear about",
					greekWords: [
						{
							text: "hear about",
							strongs: "G191",
							OGNTsort: 115344,
							morph: "V-PAP-NSM",
							lemma: "ἀκούω",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 115349,
							morph: "T-ASF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "faith",
					greekWords: [
						{
							text: "faith",
							strongs: "G4102",
							OGNTsort: 115350,
							morph: "N-ASF",
							lemma: "πίστις",
						},
					],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G3739",
							OGNTsort: 115351,
							morph: "R-ASF",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "you have",
					greekWords: [
						{
							text: "you have",
							strongs: "G2192",
							OGNTsort: 115352,
							morph: "V-PAI-2S",
							lemma: "ἔχω",
						},
					],
				},
				{
					englishWords: "toward",
					greekWords: [
						{
							text: "toward",
							strongs: "G4314",
							OGNTsort: 115353,
							morph: "PREP",
							lemma: "πρός",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 115354,
							morph: "T-ASM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "Lord",
					greekWords: [
						{
							text: "Lord",
							strongs: "G2962",
							OGNTsort: 115355,
							morph: "N-ASM",
							lemma: "κύριος",
						},
					],
				},
				{
					englishWords: "Jesus",
					greekWords: [
						{
							text: "Jesus",
							strongs: "G2424",
							OGNTsort: 115356,
							morph: "N-ASM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 115357,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 115346,
							morph: "T-ASF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "love",
					greekWords: [
						{
							text: "love",
							strongs: "G26",
							OGNTsort: 115347,
							morph: "N-ASF",
							lemma: "ἀγάπη",
						},
					],
				},
				{ englishWords: "you have" },
				{
					englishWords: "for",
					greekWords: [
						{
							text: "for",
							strongs: "G1519",
							OGNTsort: 115358,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "all",
					greekWords: [
						{
							text: "all",
							strongs: "G3956",
							OGNTsort: 115359,
							morph: "A-APM",
							lemma: "πᾶς",
						},
					],
				},
				{
					englishWords: "his",
					greekWords: [
						{
							text: "his",
							strongs: "G3588",
							OGNTsort: 115360,
							morph: "T-APM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "holy people.",
					greekWords: [
						{
							text: "holy people.",
							strongs: "G40",
							OGNTsort: 115361,
							morph: "A-APM",
							lemma: "ἅγιος",
						},
					],
				},
			],
		},
		{
			verseNum: 6,
			verseWords: [
				{
					englishWords: "I pray that",
					greekWords: [
						{
							text: "I pray that",
							strongs: "G3704",
							OGNTsort: 115362,
							morph: "CONJ",
							lemma: "ὅπως",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 115363,
							morph: "T-NSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "sharing",
					greekWords: [
						{
							text: "sharing",
							strongs: "G2842",
							OGNTsort: 115364,
							morph: "N-NSF",
							lemma: "κοινωνία",
						},
					],
				},
				{
					englishWords: "of your",
					greekWords: [
						{
							text: "of your",
							strongs: "G4771",
							OGNTsort: 115367,
							morph: "P-2GS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "faith",
					greekWords: [
						{
							text: "faith",
							strongs: "G4102",
							OGNTsort: 115366,
							morph: "N-GSF",
							lemma: "πίστις",
						},
					],
				},
				{
					englishWords: "may be",
					greekWords: [
						{
							text: "may be",
							strongs: "G1096",
							OGNTsort: 115369,
							morph: "V-2ADS-3S",
							lemma: "γίνομαι",
						},
					],
				},
				{
					englishWords: "effective,",
					greekWords: [
						{
							text: "effective,",
							strongs: "G1756",
							OGNTsort: 115368,
							morph: "A-NSF",
							lemma: "ἐνεργής, ἐναργής",
						},
					],
				},
				{ englishWords: "so you will have" },
				{
					englishWords: "a full understanding",
					greekWords: [
						{
							text: "a full understanding",
							strongs: "G1922",
							OGNTsort: 115371,
							morph: "N-DSF",
							lemma: "ἐπίγνωσις",
						},
					],
				},
				{
					englishWords: "of every",
					greekWords: [
						{
							text: "of every",
							strongs: "G3956",
							OGNTsort: 115372,
							morph: "A-GSN",
							lemma: "πᾶς",
						},
					],
				},
				{
					englishWords: "good thing",
					greekWords: [
						{
							text: "good thing",
							strongs: "G18",
							OGNTsort: 115373,
							morph: "A-GSN",
							lemma: "ἀγαθός",
						},
					],
				},
				{
					englishWords: "we have",
					phraseWords: [
						{
							text: "√",
							strongs: "G3588",
							OGNTsort: 115374,
							phraseWords: "we have",
							morph: "T-GSN",
							lemma: "ὁ",
						},
						{
							text: "√",
							strongs: "G1722",
							OGNTsort: 115375,
							phraseWords: "we have",
							morph: "PREP",
							lemma: "ἐν",
						},
						{
							text: "√",
							strongs: "G1473",
							OGNTsort: 115376,
							phraseWords: "we have",
							morph: "P-1DP",
							lemma: "ἐγώ",
						},
					],
					subWords: [],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1519",
							OGNTsort: 115377,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "Christ.",
					greekWords: [
						{
							text: "Christ.",
							strongs: "G5547",
							OGNTsort: 115378,
							morph: "N-ASM-T",
							lemma: "Χριστός",
						},
					],
				},
			],
		},
		{
			verseNum: 7,
			verseWords: [
				{
					englishWords: "For",
					greekWords: [
						{
							text: "For",
							strongs: "G1063",
							OGNTsort: 115380,
							morph: "CONJ",
							lemma: "γάρ",
						},
					],
				},
				{
					englishWords: "I have had",
					greekWords: [
						{
							text: "I have had",
							strongs: "G2192",
							OGNTsort: 115382,
							morph: "V-2AAI-1S",
							lemma: "ἔχω",
						},
					],
				},
				{
					englishWords: "much",
					greekWords: [
						{
							text: "much",
							strongs: "G4183",
							OGNTsort: 115381,
							morph: "A-ASF",
							lemma: "πολύς",
						},
					],
				},
				{
					englishWords: "joy",
					greekWords: [
						{
							text: "joy",
							strongs: "G5479",
							OGNTsort: 115379,
							morph: "N-ASF",
							lemma: "χαρά",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 115383,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "comfort",
					greekWords: [
						{
							text: "comfort",
							strongs: "G3874",
							OGNTsort: 115384,
							morph: "N-ASF",
							lemma: "παράκλησις",
						},
					],
				},
				{
					englishWords: "because of",
					greekWords: [
						{
							text: "because of",
							strongs: "G1909",
							OGNTsort: 115385,
							morph: "PREP",
							lemma: "ἐπί",
						},
					],
				},
				{
					englishWords: "your",
					greekWords: [
						{
							text: "your",
							strongs: "G4771",
							OGNTsort: 115388,
							morph: "P-2GS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "love,",
					greekWords: [
						{
							text: "love,",
							strongs: "G26",
							OGNTsort: 115387,
							morph: "N-DSF",
							lemma: "ἀγάπη",
						},
					],
				},
				{
					englishWords: "because",
					greekWords: [
						{
							text: "because",
							strongs: "G3754",
							OGNTsort: 115389,
							morph: "CONJ",
							lemma: "ὅτι",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 115390,
							morph: "T-NPN",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "hearts",
					greekWords: [
						{
							text: "hearts",
							strongs: "G4698",
							OGNTsort: 115391,
							morph: "N-NPN",
							lemma: "σπλάγχνον",
						},
					],
				},
				{
					englishWords: "of God's holy people",
					phraseWords: [
						{
							text: "√",
							strongs: "G3588",
							OGNTsort: 115392,
							phraseWords: "of God's holy people",
							morph: "T-GPM",
							lemma: "ὁ",
						},
						{
							text: "√",
							strongs: "G40",
							OGNTsort: 115393,
							phraseWords: "of God's holy people",
							morph: "A-GPM",
							lemma: "ἅγιος",
						},
					],
					subWords: [],
				},
				{
					englishWords: "have been refreshed",
					greekWords: [
						{
							text: "have been refreshed",
							strongs: "G373",
							OGNTsort: 115394,
							morph: "V-RPI-3S",
							lemma: "ἀναπαύω",
						},
					],
				},
				{
					englishWords: "by",
					greekWords: [
						{
							text: "by",
							strongs: "G1223",
							OGNTsort: 115395,
							morph: "PREP",
							lemma: "διά",
						},
					],
				},
				{
					englishWords: "you,",
					greekWords: [
						{
							text: "you,",
							strongs: "G4771",
							OGNTsort: 115396,
							morph: "P-2GS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "brother.",
					greekWords: [
						{
							text: "brother.",
							strongs: "G80",
							OGNTsort: 115397,
							morph: "N-VSM",
							lemma: "ἀδελφός",
						},
					],
				},
			],
		},
		{
			verseNum: 8,
			verseWords: [
				{
					englishWords: "Therefore,",
					greekWords: [
						{
							text: "Therefore,",
							strongs: "G1352",
							OGNTsort: 115398,
							morph: "CONJ",
							lemma: "διό",
						},
					],
				},
				{
					englishWords: "although",
					greekWords: [
						{
							text: "although",
							strongs: "G4183",
							OGNTsort: 115399,
							morph: "A-ASF",
							lemma: "πολύς",
						},
					],
				},
				{
					englishWords: "I have",
					greekWords: [
						{
							text: "I have",
							strongs: "G2192",
							OGNTsort: 115403,
							morph: "V-PAP-NSM",
							lemma: "ἔχω",
						},
					],
				},
				{ englishWords: "all the" },
				{
					englishWords: "boldness",
					greekWords: [
						{
							text: "boldness",
							strongs: "G3954",
							OGNTsort: 115402,
							morph: "N-ASF",
							lemma: "παρρησία",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 115400,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "Christ",
					greekWords: [
						{
							text: "Christ",
							strongs: "G5547",
							OGNTsort: 115401,
							morph: "N-DSM-T",
							lemma: "Χριστός",
						},
					],
				},
				{
					englishWords: "to command",
					greekWords: [
						{
							text: "to command",
							strongs: "G2004",
							OGNTsort: 115404,
							morph: "V-PAN",
							lemma: "ἐπιτάσσω",
						},
					],
				},
				{
					englishWords: "you",
					greekWords: [
						{
							text: "you",
							strongs: "G4771",
							OGNTsort: 115405,
							morph: "P-2DS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "to do what you should do,",
					phraseWords: [
						{
							text: "√",
							strongs: "G3588",
							OGNTsort: 115406,
							phraseWords: "to do what you should do,",
							morph: "T-ASN",
							lemma: "ὁ",
						},
						{
							text: "√",
							strongs: "G433",
							OGNTsort: 115407,
							phraseWords: "to do what you should do,",
							morph: "V-PAP-ASN",
							lemma: "ἀνήκω",
						},
					],
					subWords: [],
				},
			],
		},
		{
			verseNum: 9,
			verseWords: [
				{
					englishWords: "yet because of",
					greekWords: [
						{
							text: "yet because of",
							strongs: "G1223",
							OGNTsort: 115408,
							morph: "PREP",
							lemma: "διά",
						},
					],
				},
				{
					englishWords: "love,",
					greekWords: [
						{
							text: "love,",
							strongs: "G26",
							OGNTsort: 115410,
							morph: "N-ASF",
							lemma: "ἀγάπη",
						},
					],
				},
				{
					englishWords: "I appeal to",
					greekWords: [
						{
							text: "I appeal to",
							strongs: "G3870",
							OGNTsort: 115412,
							morph: "V-PAI-1S",
							lemma: "παρακαλέω",
						},
					],
				},
				{ englishWords: "you" },
				{
					englishWords: "instead—",
					greekWords: [
						{
							text: "instead—",
							strongs: "G3123",
							OGNTsort: 115411,
							morph: "ADV",
							lemma: "μᾶλλον",
						},
					],
				},
				{
					englishWords: "I,",
					phraseWords: [
						{
							text: "√",
							strongs: "G5108",
							OGNTsort: 115413,
							phraseWords: "I,",
							morph: "D-NSM",
							lemma: "τοιοῦτος",
						},
						{
							text: "√",
							strongs: "G1510",
							OGNTsort: 115414,
							phraseWords: "I,",
							morph: "V-PAP-NSM",
							lemma: "εἰμί",
						},
						{
							text: "√",
							strongs: "G5613",
							OGNTsort: 115415,
							phraseWords: "I,",
							morph: "CONJ",
							lemma: "ὡς",
						},
					],
					subWords: [],
				},
				{
					englishWords: "Paul,",
					greekWords: [
						{
							text: "Paul,",
							strongs: "G3972",
							OGNTsort: 115416,
							morph: "N-NSM-P",
							lemma: "Παῦλος",
						},
					],
				},
				{
					englishWords: "an old man,",
					greekWords: [
						{
							text: "an old man,",
							strongs: "G4246",
							OGNTsort: 115417,
							morph: "N-NSM",
							lemma: "πρεσβύτης",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G1161",
							OGNTsort: 115419,
							morph: "CONJ",
							lemma: "δέ",
						},
					],
				},
				{
					englishWords: "now",
					greekWords: [
						{
							text: "now",
							strongs: "G3570",
							OGNTsort: 115418,
							morph: "ADV",
							lemma: "νυνί",
						},
					],
				},
				{
					englishWords: "a prisoner",
					greekWords: [
						{
							text: "a prisoner",
							strongs: "G1198",
							OGNTsort: 115421,
							morph: "N-NSM",
							lemma: "δέσμιος",
						},
					],
				},
				{
					englishWords: "for Christ",
					greekWords: [
						{
							text: "for Christ",
							strongs: "G5547",
							OGNTsort: 115422,
							morph: "N-GSM-T",
							lemma: "Χριστός",
						},
					],
				},
				{
					englishWords: "Jesus.",
					greekWords: [
						{
							text: "Jesus.",
							strongs: "G2424",
							OGNTsort: 115423,
							morph: "N-GSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
			],
		},
		{
			verseNum: 10,
			verseWords: [
				{
					englishWords: "I am appealing to",
					greekWords: [
						{
							text: "I am appealing to",
							strongs: "G3870",
							OGNTsort: 115424,
							morph: "V-PAI-1S",
							lemma: "παρακαλέω",
						},
					],
				},
				{
					englishWords: "you",
					greekWords: [
						{
							text: "you",
							strongs: "G4771",
							OGNTsort: 115425,
							morph: "P-2AS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "concerning",
					greekWords: [
						{
							text: "concerning",
							strongs: "G4012",
							OGNTsort: 115426,
							morph: "PREP",
							lemma: "περί",
						},
					],
				},
				{
					englishWords: "my",
					greekWords: [
						{
							text: "my",
							strongs: "G1699",
							OGNTsort: 115428,
							morph: "S-1SGSN",
							lemma: "ἐμός",
						},
					],
				},
				{
					englishWords: "child",
					greekWords: [
						{
							text: "child",
							strongs: "G5043",
							OGNTsort: 115429,
							morph: "N-GSN",
							lemma: "τέκνον",
						},
					],
				},
				{
					englishWords: "Onesimus,",
					greekWords: [
						{
							text: "Onesimus,",
							strongs: "G3682",
							OGNTsort: 115435,
							morph: "N-ASM-P",
							lemma: "Ὀνήσιμος",
						},
					],
				},
				{
					englishWords: "whom",
					greekWords: [
						{
							text: "whom",
							strongs: "G3739",
							OGNTsort: 115430,
							morph: "R-ASM",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "I have fathered",
					greekWords: [
						{
							text: "I have fathered",
							strongs: "G1080",
							OGNTsort: 115431,
							morph: "V-AAI-1S",
							lemma: "γεννάω",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 115432,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "my",
					greekWords: [
						{
							text: "my",
							strongs: "G3588",
							OGNTsort: 115433,
							morph: "T-DPM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "chains.",
					greekWords: [
						{
							text: "chains.",
							strongs: "G1199",
							OGNTsort: 115434,
							morph: "N-DPM",
							lemma: "δεσμός",
						},
					],
				},
			],
		},
		{
			verseNum: 11,
			verseWords: [
				{ englishWords: "For" },
				{
					englishWords: "he",
					greekWords: [
						{
							text: "he",
							strongs: "G3588",
							OGNTsort: 115436,
							morph: "T-ASM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "once",
					greekWords: [
						{
							text: "once",
							strongs: "G4218",
							OGNTsort: 115437,
							morph: "PRT",
							lemma: "ποτέ",
						},
					],
				},
				{
					englishWords: "was useless",
					greekWords: [
						{
							text: "was useless",
							strongs: "G890",
							OGNTsort: 115439,
							morph: "A-ASM",
							lemma: "ἄχρηστος",
						},
					],
				},
				{
					englishWords: "to you,",
					greekWords: [
						{
							text: "to you,",
							strongs: "G4771",
							OGNTsort: 115438,
							morph: "P-2DS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "but",
					greekWords: [
						{
							text: "but",
							strongs: "G1161",
							OGNTsort: 115441,
							morph: "CONJ",
							lemma: "δέ",
						},
					],
				},
				{
					englishWords: "now",
					greekWords: [
						{
							text: "now",
							strongs: "G3570",
							OGNTsort: 115440,
							morph: "ADV",
							lemma: "νυνί",
						},
					],
				},
				{ englishWords: "he is" },
				{
					englishWords: "useful",
					greekWords: [
						{
							text: "useful",
							strongs: "G2173",
							OGNTsort: 115446,
							morph: "A-ASM",
							lemma: "εὔχρηστος",
						},
					],
				},
				{
					englishWords: "both",
					greekWords: [
						{
							text: "both",
							strongs: "G2532",
							OGNTsort: 115442,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "to you",
					greekWords: [
						{
							text: "to you",
							strongs: "G4771",
							OGNTsort: 115443,
							morph: "P-2DS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 115444,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "to me.",
					greekWords: [
						{
							text: "to me.",
							strongs: "G1473",
							OGNTsort: 115445,
							morph: "P-1DS",
							lemma: "ἐγώ",
						},
					],
				},
			],
		},
		{
			verseNum: 12,
			verseWords: [
				{
					englishWords: "I have sent him back",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "him",
								strongs: "G3739",
								OGNTsort: 115447,
								morph: "R-ASM",
								lemma: "ὅς, ἥ",
							},
						},
						{
							word: {
								text: "I have sent him back",
								strongs: "G375",
								OGNTsort: 115448,
								morph: "V-AAI-1S",
								lemma: "ἀναπέμπω",
							},
						},
					],
				},
				{
					englishWords: "to you,",
					greekWords: [
						{
							text: "to you,",
							strongs: "G4771",
							OGNTsort: 115449,
							morph: "P-2DS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "he",
					greekWords: [
						{
							text: "he",
							strongs: "G846",
							OGNTsort: 115450,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "who",
					greekWords: [
						{
							text: "who",
							strongs: "G3778",
							OGNTsort: 115451,
							morph: "D-NSN",
							lemma: "οὗτος",
						},
					],
				},
				{
					englishWords: "is",
					greekWords: [
						{
							text: "is",
							strongs: "G1510",
							OGNTsort: 115452,
							morph: "V-PAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "my very",
					greekWords: [
						{
							text: "my very",
							strongs: "G1699",
							OGNTsort: 115454,
							morph: "S-1SAPN",
							lemma: "ἐμός",
						},
					],
				},
				{
					englishWords: "heart.",
					greekWords: [
						{
							text: "heart.",
							strongs: "G4698",
							OGNTsort: 115455,
							morph: "N-APN",
							lemma: "σπλάγχνον",
						},
					],
				},
			],
		},
		{
			verseNum: 13,
			verseWords: [
				{
					englishWords: "I",
					greekWords: [
						{
							text: "I",
							strongs: "G1473",
							OGNTsort: 115457,
							morph: "P-1NS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "wish",
					greekWords: [
						{
							text: "wish",
							strongs: "G1014",
							OGNTsort: 115458,
							morph: "V-INI-1S",
							lemma: "βούλομαι",
						},
					],
				},
				{
					englishWords: "I could have kept",
					greekWords: [
						{
							text: "I could have kept",
							strongs: "G2722",
							OGNTsort: 115461,
							morph: "V-PAN",
							lemma: "κατέχω",
						},
					],
				},
				{
					englishWords: "him",
					greekWords: [
						{
							text: "him",
							strongs: "G3739",
							OGNTsort: 115456,
							morph: "R-ASM",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "with",
					greekWords: [
						{
							text: "with",
							strongs: "G4314",
							OGNTsort: 115459,
							morph: "PREP",
							lemma: "πρός",
						},
					],
				},
				{
					englishWords: "me",
					greekWords: [
						{
							text: "me",
							strongs: "G1683",
							OGNTsort: 115460,
							morph: "F-1ASM",
							lemma: "ἐμαυτοῦ",
						},
					],
				},
				{
					englishWords: "so",
					greekWords: [
						{
							text: "so",
							strongs: "G2443",
							OGNTsort: 115462,
							morph: "CONJ",
							lemma: "ἵνα",
						},
					],
				},
				{
					englishWords: "he could serve",
					greekWords: [
						{
							text: "he could serve",
							strongs: "G1247",
							OGNTsort: 115466,
							morph: "V-PAS-3S",
							lemma: "διακονέω",
						},
					],
				},
				{
					englishWords: "me",
					greekWords: [
						{
							text: "me",
							strongs: "G1473",
							OGNTsort: 115465,
							morph: "P-1DS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "for",
					greekWords: [
						{
							text: "for",
							strongs: "G5228",
							OGNTsort: 115463,
							morph: "PREP",
							lemma: "ὑπέρ",
						},
					],
				},
				{
					englishWords: "you",
					greekWords: [
						{
							text: "you",
							strongs: "G4771",
							OGNTsort: 115464,
							morph: "P-2GS",
							lemma: "σύ",
						},
					],
				},
				{ englishWords: "while I am" },
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 115467,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "chains",
					greekWords: [
						{
							text: "chains",
							strongs: "G1199",
							OGNTsort: 115469,
							morph: "N-DPM",
							lemma: "δεσμός",
						},
					],
				},
				{
					englishWords: "for the sake of the",
					greekWords: [
						{
							text: "for the sake of the",
							strongs: "G3588",
							OGNTsort: 115470,
							morph: "T-GSN",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "gospel.",
					greekWords: [
						{
							text: "gospel.",
							strongs: "G2098",
							OGNTsort: 115471,
							morph: "N-GSN",
							lemma: "εὐαγγέλιον",
						},
					],
				},
			],
		},
		{
			verseNum: 14,
			verseWords: [
				{
					englishWords: "But",
					greekWords: [
						{
							text: "But",
							strongs: "G1161",
							OGNTsort: 115473,
							morph: "CONJ",
							lemma: "δέ",
						},
					],
				},
				{
					englishWords: "I did not want to do anything",
					phraseWords: [
						{
							text: "√",
							strongs: "G3762",
							OGNTsort: 115477,
							phraseWords: "I did not want to do anything",
							morph: "A-ASN",
							lemma: "οὐδείς",
						},
						{
							text: "√",
							strongs: "G2309",
							OGNTsort: 115478,
							phraseWords: "I did not want to do anything",
							morph: "V-AAI-1S",
							lemma: "θέλω",
						},
						{
							text: "√",
							strongs: "G4160",
							OGNTsort: 115479,
							phraseWords: "I did not want to do anything",
							morph: "V-AAN",
							lemma: "ποιέω",
						},
					],
					subWords: [],
				},
				{
					englishWords: "without",
					greekWords: [
						{
							text: "without",
							strongs: "G5565",
							OGNTsort: 115472,
							morph: "PREP",
							lemma: "χωρίς",
						},
					],
				},
				{
					englishWords: "your",
					greekWords: [
						{
							text: "your",
							strongs: "G4674",
							OGNTsort: 115475,
							morph: "S-2SGSF",
							lemma: "σός",
						},
					],
				},
				{
					englishWords: "consent.",
					greekWords: [
						{
							text: "consent.",
							strongs: "G1106",
							OGNTsort: 115476,
							morph: "N-GSF",
							lemma: "γνώμη",
						},
					],
				},
				{
					englishWords: "I did not want",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "not",
								strongs: "G3361",
								OGNTsort: 115481,
								morph: "PRT-N",
								lemma: "μή",
							},
						},
					],
				},
				{
					englishWords: "your",
					greekWords: [
						{
							text: "your",
							strongs: "G4771",
							OGNTsort: 115487,
							morph: "P-2GS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "good deed",
					greekWords: [
						{
							text: "good deed",
							strongs: "G18",
							OGNTsort: 115486,
							morph: "A-NSN",
							lemma: "ἀγαθός",
						},
					],
				},
				{
					englishWords: "to be",
					greekWords: [
						{
							text: "to be",
							strongs: "G1510",
							OGNTsort: 115488,
							morph: "V-PAS-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "from",
					greekWords: [
						{
							text: "from",
							strongs: "G2596",
							OGNTsort: 115483,
							morph: "PREP",
							lemma: "κατά",
						},
					],
				},
				{
					englishWords: "necessity",
					greekWords: [
						{
							text: "necessity",
							strongs: "G318",
							OGNTsort: 115484,
							morph: "N-ASF",
							lemma: "ἀνάγκη",
						},
					],
				},
				{
					englishWords: "but",
					greekWords: [
						{
							text: "but",
							strongs: "G235",
							OGNTsort: 115489,
							morph: "CONJ",
							lemma: "ἀλλά",
						},
					],
				},
				{
					englishWords: "from",
					greekWords: [
						{
							text: "from",
							strongs: "G2596",
							OGNTsort: 115490,
							morph: "PREP",
							lemma: "κατά",
						},
					],
				},
				{
					englishWords: "good will.",
					greekWords: [
						{
							text: "good will.",
							strongs: "G1595",
							OGNTsort: 115491,
							morph: "A-ASN",
							lemma: "ἑκούσιος",
						},
					],
				},
			],
		},
		{
			verseNum: 15,
			verseWords: [
				{
					englishWords: "Perhaps",
					greekWords: [
						{
							text: "Perhaps",
							strongs: "G5029",
							OGNTsort: 115492,
							morph: "ADV",
							lemma: "τάχα",
						},
					],
				},
				{
					englishWords: "for",
					greekWords: [
						{
							text: "for",
							strongs: "G1223",
							OGNTsort: 115494,
							morph: "PREP",
							lemma: "διά",
						},
					],
				},
				{
					englishWords: "this",
					greekWords: [
						{
							text: "this",
							strongs: "G3778",
							OGNTsort: 115495,
							morph: "D-ASN",
							lemma: "οὗτος",
						},
					],
				},
				{
					englishWords: "he was separated",
					greekWords: [
						{
							text: "he was separated",
							strongs: "G5563",
							OGNTsort: 115496,
							morph: "V-API-3S",
							lemma: "χωρίζω",
						},
					],
				},
				{ englishWords: "from you" },
				{
					englishWords: "for",
					greekWords: [
						{
							text: "for",
							strongs: "G4314",
							OGNTsort: 115497,
							morph: "PREP",
							lemma: "πρός",
						},
					],
				},
				{
					englishWords: "a time,",
					greekWords: [
						{
							text: "a time,",
							strongs: "G5610",
							OGNTsort: 115498,
							morph: "N-ASF",
							lemma: "ὥρα",
						},
					],
				},
				{
					englishWords: "so that",
					greekWords: [
						{
							text: "so that",
							strongs: "G2443",
							OGNTsort: 115499,
							morph: "CONJ",
							lemma: "ἵνα",
						},
					],
				},
				{
					englishWords: "you might have him back",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "him",
								strongs: "G846",
								OGNTsort: 115501,
								morph: "P-ASM",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: "you might have him back",
								strongs: "G568",
								OGNTsort: 115502,
								morph: "V-PAS-2S",
								lemma: "ἀπέχω",
							},
						},
					],
				},
				{
					englishWords: "forever.",
					greekWords: [
						{
							text: "forever.",
							strongs: "G166",
							OGNTsort: 115500,
							morph: "A-ASM",
							lemma: "αἰώνιος",
						},
					],
				},
			],
		},
		{
			verseNum: 16,
			verseWords: [
				{
					englishWords: "No longer",
					greekWords: [
						{
							text: "No longer",
							strongs: "G3765",
							OGNTsort: 115503,
							morph: "ADV",
							lemma: "οὐκέτι",
						},
					],
				},
				{
					englishWords: "would he be",
					greekWords: [
						{
							text: "would he be",
							strongs: "G5613",
							OGNTsort: 115504,
							morph: "CONJ",
							lemma: "ὡς",
						},
					],
				},
				{
					englishWords: "a slave,",
					greekWords: [
						{
							text: "a slave,",
							strongs: "G1401",
							OGNTsort: 115505,
							morph: "N-ASM",
							lemma: "δοῦλος",
						},
					],
				},
				{
					englishWords: "but",
					greekWords: [
						{
							text: "but",
							strongs: "G235",
							OGNTsort: 115506,
							morph: "CONJ",
							lemma: "ἀλλά",
						},
					],
				},
				{
					englishWords: "better than",
					greekWords: [
						{
							text: "better than",
							strongs: "G5228",
							OGNTsort: 115507,
							morph: "PREP",
							lemma: "ὑπέρ",
						},
					],
				},
				{
					englishWords: "a slave,",
					greekWords: [
						{
							text: "a slave,",
							strongs: "G1401",
							OGNTsort: 115508,
							morph: "N-ASM",
							lemma: "δοῦλος",
						},
					],
				},
				{
					englishWords: "a beloved",
					greekWords: [
						{
							text: "a beloved",
							strongs: "G27",
							OGNTsort: 115510,
							morph: "A-ASM",
							lemma: "ἀγαπητός",
						},
					],
				},
				{
					englishWords: "brother.",
					greekWords: [
						{
							text: "brother.",
							strongs: "G80",
							OGNTsort: 115509,
							morph: "N-ASM",
							lemma: "ἀδελφός",
						},
					],
				},
				{ englishWords: "He is beloved" },
				{
					englishWords: "especially",
					greekWords: [
						{
							text: "especially",
							strongs: "G3122",
							OGNTsort: 115511,
							morph: "ADV",
							lemma: "μάλιστα",
						},
					],
				},
				{
					englishWords: "to me,",
					greekWords: [
						{
							text: "to me,",
							strongs: "G1473",
							OGNTsort: 115512,
							morph: "P-1DS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G1161",
							OGNTsort: 115514,
							morph: "CONJ",
							lemma: "δέ",
						},
					],
				},
				{
					englishWords: "much more so",
					phraseWords: [
						{
							text: "√",
							strongs: "G4214",
							OGNTsort: 115513,
							phraseWords: "much more so",
							morph: "Q-DSN",
							lemma: "πόσος",
						},
						{
							text: "√",
							strongs: "G3123",
							OGNTsort: 115515,
							phraseWords: "much more so",
							morph: "ADV",
							lemma: "μᾶλλον",
						},
					],
					subWords: [],
				},
				{
					englishWords: "to you,",
					greekWords: [
						{
							text: "to you,",
							strongs: "G4771",
							OGNTsort: 115516,
							morph: "P-2DS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 115518,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "both",
					greekWords: [
						{
							text: "both",
							strongs: "G2532",
							OGNTsort: 115517,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "the flesh",
					greekWords: [
						{
							text: "the flesh",
							strongs: "G4561",
							OGNTsort: 115519,
							morph: "N-DSF",
							lemma: "σάρξ",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 115520,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 115521,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "the Lord.",
					greekWords: [
						{
							text: "the Lord.",
							strongs: "G2962",
							OGNTsort: 115522,
							morph: "N-DSM",
							lemma: "κύριος",
						},
					],
				},
			],
		},
		{
			verseNum: 17,
			verseWords: [
				{
					englishWords: "So",
					greekWords: [
						{
							text: "So",
							strongs: "G3767",
							OGNTsort: 115524,
							morph: "CONJ",
							lemma: "οὖν",
						},
					],
				},
				{
					englishWords: "if",
					greekWords: [
						{
							text: "if",
							strongs: "G1487",
							OGNTsort: 115523,
							morph: "CONJ",
							lemma: "εἰ",
						},
					],
				},
				{
					englishWords: "you have",
					greekWords: [
						{
							text: "you have",
							strongs: "G2192",
							OGNTsort: 115526,
							morph: "V-PAI-2S",
							lemma: "ἔχω",
						},
					],
				},
				{
					englishWords: "me",
					greekWords: [
						{
							text: "me",
							strongs: "G1473",
							OGNTsort: 115525,
							morph: "P-1AS",
							lemma: "ἐγώ",
						},
					],
				},
				{ englishWords: "as" },
				{
					englishWords: "a partner,",
					greekWords: [
						{
							text: "a partner,",
							strongs: "G2844",
							OGNTsort: 115527,
							morph: "N-ASM",
							lemma: "κοινωνός",
						},
					],
				},
				{
					englishWords: "receive",
					greekWords: [
						{
							text: "receive",
							strongs: "G4355",
							OGNTsort: 115528,
							morph: "V-2AMM-2S",
							lemma: "προσλαμβάνω",
						},
					],
				},
				{
					englishWords: "him",
					greekWords: [
						{
							text: "him",
							strongs: "G846",
							OGNTsort: 115529,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "as",
					greekWords: [
						{
							text: "as",
							strongs: "G5613",
							OGNTsort: 115530,
							morph: "CONJ",
							lemma: "ὡς",
						},
					],
				},
				{
					englishWords: "me.",
					greekWords: [
						{
							text: "me.",
							strongs: "G1473",
							OGNTsort: 115531,
							morph: "P-1AS",
							lemma: "ἐγώ",
						},
					],
				},
			],
		},
		{
			verseNum: 18,
			verseWords: [
				{
					englishWords: "If",
					greekWords: [
						{
							text: "If",
							strongs: "G1487",
							OGNTsort: 115532,
							morph: "CONJ",
							lemma: "εἰ",
						},
					],
				},
				{
					englishWords: "he has wronged",
					greekWords: [
						{
							text: "he has wronged",
							strongs: "G91",
							OGNTsort: 115535,
							morph: "V-AAI-3S",
							lemma: "ἀδικέω",
						},
					],
				},
				{
					englishWords: "you",
					greekWords: [
						{
							text: "you",
							strongs: "G4771",
							OGNTsort: 115536,
							morph: "P-2AS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "or",
					greekWords: [
						{
							text: "or",
							strongs: "G2228",
							OGNTsort: 115537,
							morph: "CONJ",
							lemma: "ἤ",
						},
					],
				},
				{
					englishWords: "owes",
					greekWords: [
						{
							text: "owes",
							strongs: "G3784",
							OGNTsort: 115538,
							morph: "V-PAI-3S",
							lemma: "ὀφείλω",
						},
					],
				},
				{ englishWords: "you" },
				{
					englishWords: "anything,",
					greekWords: [
						{
							text: "anything,",
							strongs: "G5100",
							OGNTsort: 115534,
							morph: "X-ASN",
							lemma: "τις",
						},
					],
				},
				{
					englishWords: "charge",
					greekWords: [
						{
							text: "charge",
							strongs: "G1677",
							OGNTsort: 115541,
							morph: "V-PAM-2S",
							lemma: "ἐλλογέω",
						},
					],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G3778",
							OGNTsort: 115539,
							morph: "D-ASN",
							lemma: "οὗτος",
						},
					],
				},
				{
					englishWords: "to me.",
					greekWords: [
						{
							text: "to me.",
							strongs: "G1473",
							OGNTsort: 115540,
							morph: "P-1DS",
							lemma: "ἐγώ",
						},
					],
				},
			],
		},
		{
			verseNum: 19,
			verseWords: [
				{
					englishWords: "I,",
					greekWords: [
						{
							text: "I,",
							strongs: "G1473",
							OGNTsort: 115542,
							morph: "P-1NS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "Paul,",
					greekWords: [
						{
							text: "Paul,",
							strongs: "G3972",
							OGNTsort: 115543,
							morph: "N-NSM-P",
							lemma: "Παῦλος",
						},
					],
				},
				{
					englishWords: "write this",
					greekWords: [
						{
							text: "write this",
							strongs: "G1125",
							OGNTsort: 115544,
							morph: "V-2AAI-1S",
							lemma: "γράφω",
						},
					],
				},
				{
					englishWords: "with my own",
					greekWords: [
						{
							text: "with my own",
							strongs: "G1699",
							OGNTsort: 115546,
							morph: "S-1SDSF",
							lemma: "ἐμός",
						},
					],
				},
				{
					englishWords: "hand.",
					greekWords: [
						{
							text: "hand.",
							strongs: "G5495",
							OGNTsort: 115547,
							morph: "N-DSF",
							lemma: "χείρ",
						},
					],
				},
				{
					englishWords: "I myself",
					greekWords: [
						{
							text: "I myself",
							strongs: "G1473",
							OGNTsort: 115548,
							morph: "P-1NS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "will pay it back—",
					greekWords: [
						{
							text: "will pay it back—",
							strongs: "G661",
							OGNTsort: 115549,
							morph: "V-FAI-1S",
							lemma: "ἀποτίνω",
						},
					],
				},
				{
					englishWords: "not to mention",
					phraseWords: [
						{
							text: "√",
							strongs: "G2443",
							OGNTsort: 115550,
							phraseWords: "not to mention",
							morph: "CONJ",
							lemma: "ἵνα",
						},
						{
							text: "√",
							strongs: "G3361",
							OGNTsort: 115551,
							phraseWords: "not to mention",
							morph: "PRT-N",
							lemma: "μή",
						},
						{
							text: "√",
							strongs: "G3004",
							OGNTsort: 115552,
							phraseWords: "not to mention",
							morph: "V-PAS-1S",
							lemma: "λέγω",
						},
					],
					subWords: [],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G3754",
							OGNTsort: 115554,
							morph: "CONJ",
							lemma: "ὅτι",
						},
					],
				},
				{
					englishWords: "you owe",
					greekWords: [
						{
							text: "you owe",
							strongs: "G4359",
							OGNTsort: 115558,
							morph: "V-PAI-2S",
							lemma: "προσοφείλω",
						},
					],
				},
				{
					englishWords: "me",
					greekWords: [
						{
							text: "me",
							strongs: "G1473",
							OGNTsort: 115557,
							morph: "P-1DS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "your own self!",
					greekWords: [
						{
							text: "your own self!",
							strongs: "G4572",
							OGNTsort: 115556,
							morph: "F-2ASM",
							lemma: "σεαυτοῦ",
						},
					],
				},
			],
		},
		{
			verseNum: 20,
			verseWords: [
				{
					englishWords: "Yes,",
					greekWords: [
						{
							text: "Yes,",
							strongs: "G3483",
							OGNTsort: 115559,
							morph: "PRT",
							lemma: "ναί",
						},
					],
				},
				{
					englishWords: "brother,",
					greekWords: [
						{
							text: "brother,",
							strongs: "G80",
							OGNTsort: 115560,
							morph: "N-VSM",
							lemma: "ἀδελφός",
						},
					],
				},
				{
					englishWords: "let me benefit",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "me",
								strongs: "G1473",
								OGNTsort: 115561,
								morph: "P-1NS",
								lemma: "ἐγώ",
							},
						},
						{
							word: {
								text: "let me benefit",
								strongs: "G3685",
								OGNTsort: 115563,
								morph: "V-2ADO-1S",
								lemma: "ὀνίνημι",
							},
						},
					],
				},
				{
					englishWords: "from you",
					greekWords: [
						{
							text: "from you",
							strongs: "G4771",
							OGNTsort: 115562,
							morph: "P-2GS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 115564,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "the Lord;",
					greekWords: [
						{
							text: "the Lord;",
							strongs: "G2962",
							OGNTsort: 115565,
							morph: "N-DSM",
							lemma: "κύριος",
						},
					],
				},
				{
					englishWords: "refresh",
					greekWords: [
						{
							text: "refresh",
							strongs: "G373",
							OGNTsort: 115566,
							morph: "V-AAM-2S",
							lemma: "ἀναπαύω",
						},
					],
				},
				{
					englishWords: "my",
					greekWords: [
						{
							text: "my",
							strongs: "G1473",
							OGNTsort: 115567,
							morph: "P-1GS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "heart",
					greekWords: [
						{
							text: "heart",
							strongs: "G4698",
							OGNTsort: 115569,
							morph: "N-APN",
							lemma: "σπλάγχνον",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 115570,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "Christ.",
					greekWords: [
						{
							text: "Christ.",
							strongs: "G5547",
							OGNTsort: 115571,
							morph: "N-DSM-T",
							lemma: "Χριστός",
						},
					],
				},
			],
		},
		{
			verseNum: 21,
			verseWords: [
				{
					englishWords: "Confident",
					greekWords: [
						{
							text: "Confident",
							strongs: "G3982",
							OGNTsort: 115572,
							morph: "V-2RAP-NSM",
							lemma: "πείθω",
						},
					],
				},
				{
					englishWords: "about your",
					greekWords: [
						{
							text: "about your",
							strongs: "G4771",
							OGNTsort: 115575,
							morph: "P-2GS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "obedience,",
					greekWords: [
						{
							text: "obedience,",
							strongs: "G5218",
							OGNTsort: 115574,
							morph: "N-DSF",
							lemma: "ὑπακοή",
						},
					],
				},
				{
					englishWords: "I am writing",
					greekWords: [
						{
							text: "I am writing",
							strongs: "G1125",
							OGNTsort: 115576,
							morph: "V-2AAI-1S",
							lemma: "γράφω",
						},
					],
				},
				{
					englishWords: "to you.",
					greekWords: [
						{
							text: "to you.",
							strongs: "G4771",
							OGNTsort: 115577,
							morph: "P-2DS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "I know",
					greekWords: [
						{
							text: "I know",
							strongs: "G1492",
							OGNTsort: 115578,
							morph: "V-RAP-NSM",
							lemma: "εἴδω",
						},
					],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G3754",
							OGNTsort: 115579,
							morph: "CONJ",
							lemma: "ὅτι",
						},
					],
				},
				{
					englishWords: "you will do",
					greekWords: [
						{
							text: "you will do",
							strongs: "G4160",
							OGNTsort: 115584,
							morph: "V-FAI-2S",
							lemma: "ποιέω",
						},
					],
				},
				{
					englishWords: "even",
					greekWords: [
						{
							text: "even",
							strongs: "G2532",
							OGNTsort: 115580,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "more",
					greekWords: [
						{
							text: "more",
							strongs: "G5228",
							OGNTsort: 115581,
							morph: "PREP",
							lemma: "ὑπέρ",
						},
					],
				},
				{
					englishWords: "than",
					greekWords: [
						{
							text: "than",
							strongs: "G3739",
							OGNTsort: 115582,
							morph: "R-APN",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "I ask.",
					greekWords: [
						{
							text: "I ask.",
							strongs: "G3004",
							OGNTsort: 115583,
							morph: "V-PAI-1S",
							lemma: "λέγω",
						},
					],
				},
			],
		},
		{
			verseNum: 22,
			verseWords: [
				{
					englishWords: "At the same time,",
					greekWords: [
						{
							text: "At the same time,",
							strongs: "G260",
							OGNTsort: 115585,
							morph: "ADV",
							lemma: "ἅμα",
						},
					],
				},
				{
					englishWords: "prepare",
					greekWords: [
						{
							text: "prepare",
							strongs: "G2090",
							OGNTsort: 115588,
							morph: "V-PAM-2S",
							lemma: "ἑτοιμάζω",
						},
					],
				},
				{
					englishWords: "a guest room",
					greekWords: [
						{
							text: "a guest room",
							strongs: "G3578",
							OGNTsort: 115590,
							morph: "N-ASF",
							lemma: "ξενία",
						},
					],
				},
				{
					englishWords: "for me,",
					greekWords: [
						{
							text: "for me,",
							strongs: "G1473",
							OGNTsort: 115589,
							morph: "P-1DS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "for",
					greekWords: [
						{
							text: "for",
							strongs: "G1063",
							OGNTsort: 115592,
							morph: "CONJ",
							lemma: "γάρ",
						},
					],
				},
				{
					englishWords: "I hope",
					greekWords: [
						{
							text: "I hope",
							strongs: "G1679",
							OGNTsort: 115591,
							morph: "V-PAI-1S",
							lemma: "ἐλπίζω",
						},
					],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G3754",
							OGNTsort: 115593,
							morph: "CONJ",
							lemma: "ὅτι",
						},
					],
				},
				{
					englishWords: "through",
					greekWords: [
						{
							text: "through",
							strongs: "G1223",
							OGNTsort: 115594,
							morph: "PREP",
							lemma: "διά",
						},
					],
				},
				{
					englishWords: "your",
					greekWords: [
						{
							text: "your",
							strongs: "G4771",
							OGNTsort: 115597,
							morph: "P-2GP",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "prayers",
					greekWords: [
						{
							text: "prayers",
							strongs: "G4335",
							OGNTsort: 115596,
							morph: "N-GPF",
							lemma: "προσευχή",
						},
					],
				},
				{
					englishWords: "I will be returned",
					greekWords: [
						{
							text: "I will be returned",
							strongs: "G5483",
							OGNTsort: 115598,
							morph: "V-FPI-1S",
							lemma: "χαρίζω",
						},
					],
				},
				{
					englishWords: "to you.",
					greekWords: [
						{
							text: "to you.",
							strongs: "G4771",
							OGNTsort: 115599,
							morph: "P-2DP",
							lemma: "σύ",
						},
					],
				},
			],
		},
		{
			verseNum: 23,
			verseWords: [
				{
					englishWords: "Epaphras,",
					greekWords: [
						{
							text: "Epaphras,",
							strongs: "G1889",
							OGNTsort: 115602,
							morph: "N-NSM-P",
							lemma: "Ἐπαφρᾶς",
						},
					],
				},
				{
					englishWords: "my",
					greekWords: [
						{
							text: "my",
							strongs: "G1473",
							OGNTsort: 115605,
							morph: "P-1GS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "fellow prisoner",
					greekWords: [
						{
							text: "fellow prisoner",
							strongs: "G4869",
							OGNTsort: 115604,
							morph: "N-NSM",
							lemma: "συναιχμάλωτος",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 115606,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "Christ",
					greekWords: [
						{
							text: "Christ",
							strongs: "G5547",
							OGNTsort: 115607,
							morph: "N-DSM-T",
							lemma: "Χριστός",
						},
					],
				},
				{
					englishWords: "Jesus,",
					greekWords: [
						{
							text: "Jesus,",
							strongs: "G2424",
							OGNTsort: 115608,
							morph: "N-DSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
				{
					englishWords: "greets",
					greekWords: [
						{
							text: "greets",
							strongs: "G782",
							OGNTsort: 115600,
							morph: "V-PNI-3S",
							lemma: "ἀσπάζομαι",
						},
					],
				},
				{
					englishWords: "you.",
					greekWords: [
						{
							text: "you.",
							strongs: "G4771",
							OGNTsort: 115601,
							morph: "P-2AS",
							lemma: "σύ",
						},
					],
				},
			],
		},
		{
			verseNum: 24,
			verseWords: [
				{ englishWords: "So do" },
				{
					englishWords: "Mark,",
					greekWords: [
						{
							text: "Mark,",
							strongs: "G3138",
							OGNTsort: 115609,
							morph: "N-NSM-P",
							lemma: "Μάρκος",
						},
					],
				},
				{
					englishWords: "Aristarchus,",
					greekWords: [
						{
							text: "Aristarchus,",
							strongs: "G708",
							OGNTsort: 115610,
							morph: "N-NSM-P",
							lemma: "Ἀρίσταρχος",
						},
					],
				},
				{
					englishWords: "Demas,",
					greekWords: [
						{
							text: "Demas,",
							strongs: "G1214",
							OGNTsort: 115611,
							morph: "N-NSM-P",
							lemma: "Δημᾶς",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "Luke,",
					greekWords: [
						{
							text: "Luke,",
							strongs: "G3065",
							OGNTsort: 115612,
							morph: "N-NSM-P",
							lemma: "Λουκᾶς",
						},
					],
				},
				{
					englishWords: "my",
					greekWords: [
						{
							text: "my",
							strongs: "G1473",
							OGNTsort: 115615,
							morph: "P-1GS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "fellow workers.",
					phraseWords: [
						{
							text: "√",
							strongs: "G3588",
							OGNTsort: 115613,
							phraseWords: "fellow workers.",
							morph: "T-NPM",
							lemma: "ὁ",
						},
						{
							text: "√",
							strongs: "G4904",
							OGNTsort: 115614,
							phraseWords: "fellow workers.",
							morph: "A-NPM",
							lemma: "συνεργός",
						},
					],
					subWords: [],
				},
			],
		},
		{
			verseNum: 25,
			verseWords: [
				{
					englishWords: "The",
					greekWords: [
						{
							text: "The",
							strongs: "G3588",
							OGNTsort: 115616,
							morph: "T-NSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "grace",
					greekWords: [
						{
							text: "grace",
							strongs: "G5485",
							OGNTsort: 115617,
							morph: "N-NSF",
							lemma: "χάρις",
						},
					],
				},
				{
					englishWords: "of",
					greekWords: [
						{
							text: "of",
							strongs: "G3588",
							OGNTsort: 115618,
							morph: "T-GSM",
							lemma: "ὁ",
						},
					],
				},
				{ englishWords: "our" },
				{
					englishWords: "Lord",
					greekWords: [
						{
							text: "Lord",
							strongs: "G2962",
							OGNTsort: 115619,
							morph: "N-GSM",
							lemma: "κύριος",
						},
					],
				},
				{
					englishWords: "Jesus",
					greekWords: [
						{
							text: "Jesus",
							strongs: "G2424",
							OGNTsort: 115620,
							morph: "N-GSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
				{
					englishWords: "Christ",
					greekWords: [
						{
							text: "Christ",
							strongs: "G5547",
							OGNTsort: 115621,
							morph: "N-GSM-T",
							lemma: "Χριστός",
						},
					],
				},
				{ englishWords: "be" },
				{
					englishWords: "with",
					greekWords: [
						{
							text: "with",
							strongs: "G3326",
							OGNTsort: 115622,
							morph: "PREP",
							lemma: "μετά",
						},
					],
				},
				{
					englishWords: "your",
					greekWords: [
						{
							text: "your",
							strongs: "G4771",
							OGNTsort: 115625,
							morph: "P-2GP",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "spirit.",
					greekWords: [
						{
							text: "spirit.",
							strongs: "G4151",
							OGNTsort: 115624,
							morph: "N-GSN",
							lemma: "πνεῦμα",
						},
					],
				},
				{ englishWords: "Amen." },
			],
		},
	],
	[
		{
			verseNum: 7,
			verseWords: [
				{
					englishWords: "for",
					greekWords: [
						{
							text: "for",
							strongs: "G1063",
							OGNTsort: 113158,
							morph: "CONJ",
							lemma: "γάρ",
						},
					],
				},
				{
					englishWords: "we brought",
					greekWords: [
						{
							text: "we brought",
							strongs: "G1533",
							OGNTsort: 113159,
							morph: "V-AAI-1P",
							lemma: "εἰσφέρω",
						},
					],
				},
				{
					englishWords: "nothing",
					greekWords: [
						{
							text: "nothing",
							strongs: "G3762",
							OGNTsort: 113157,
							morph: "A-ASN",
							lemma: "οὐδείς",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 113160,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 113161,
							morph: "T-ASM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "world,",
					greekWords: [
						{
							text: "world,",
							strongs: "G2889",
							OGNTsort: 113162,
							morph: "N-ASM",
							lemma: "κόσμος",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "we can",
					greekWords: [
						{
							text: "we can",
							strongs: "G1410",
							OGNTsort: 113167,
							morph: "V-PNI-1P",
							lemma: "δύναμαι",
						},
					],
				},
				{
					englishWords: "take nothing out of it.",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "√",
								strongs: "G3761",
								OGNTsort: 113164,
								subPhraseWords: "nothing",
								morph: "CONJ-N",
								lemma: "οὐδέ",
							},
						},
						{
							subIdx: "[1]",
							word: {
								text: "√",
								strongs: "G5100",
								OGNTsort: 113166,
								subPhraseWords: "nothing",
								morph: "X-ASN",
								lemma: "τις",
							},
						},
						{
							word: {
								text: "take nothing out of it.",
								strongs: "G1627",
								OGNTsort: 113165,
								morph: "V-2AAN",
								lemma: "ἐκφέρω",
							},
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 18,
			verseWords: [
				{
					englishWords: "I am placing this command before",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "this",
								strongs: "G3778",
								OGNTsort: 112064,
								morph: "D-ASF",
								lemma: "οὗτος",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "command",
								strongs: "G3852",
								OGNTsort: 112066,
								morph: "N-ASF",
								lemma: "παραγγελία",
							},
						},
						{
							word: {
								text: "I am placing this command before",
								strongs: "G3908",
								OGNTsort: 112067,
								morph: "V-PMI-1S",
								lemma: "παρατίθημι",
							},
						},
					],
				},
				{
					englishWords: "you,",
					greekWords: [
						{
							text: "you,",
							strongs: "G4771",
							OGNTsort: 112068,
							morph: "P-2DS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "Timothy,",
					greekWords: [
						{
							text: "Timothy,",
							strongs: "G5095",
							OGNTsort: 112070,
							morph: "N-VSM-P",
							lemma: "Τιμόθεος",
						},
					],
				},
				{
					englishWords: "my child,",
					greekWords: [
						{
							text: "my child,",
							strongs: "G5043",
							OGNTsort: 112069,
							morph: "N-VSN",
							lemma: "τέκνον",
						},
					],
				},
				{
					englishWords: "in accordance with",
					greekWords: [
						{
							text: "in accordance with",
							strongs: "G2596",
							OGNTsort: 112071,
							morph: "PREP",
							lemma: "κατά",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 112072,
							morph: "T-APF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "prophecies",
					greekWords: [
						{
							text: "prophecies",
							strongs: "G4394",
							OGNTsort: 112076,
							morph: "N-APF",
							lemma: "προφητεία",
						},
					],
				},
				{
					englishWords: "previously made",
					greekWords: [
						{
							text: "previously made",
							strongs: "G4254",
							OGNTsort: 112073,
							morph: "V-PAP-APF",
							lemma: "προάγω",
						},
					],
				},
				{
					englishWords: "about",
					greekWords: [
						{
							text: "about",
							strongs: "G1909",
							OGNTsort: 112074,
							morph: "PREP",
							lemma: "ἐπί",
						},
					],
				},
				{
					englishWords: "you,",
					greekWords: [
						{
							text: "you,",
							strongs: "G4771",
							OGNTsort: 112075,
							morph: "P-2AS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G2443",
							OGNTsort: 112077,
							morph: "ADV",
							lemma: "ἵνα",
						},
					],
				},
				{
					englishWords: "you might fight",
					greekWords: [
						{
							text: "you might fight",
							strongs: "G4754",
							OGNTsort: 112078,
							morph: "V-PMS-2S",
							lemma: "στρατεύω",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 112081,
							morph: "T-ASF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "good",
					greekWords: [
						{
							text: "good",
							strongs: "G2570",
							OGNTsort: 112082,
							morph: "A-ASF",
							lemma: "καλός",
						},
					],
				},
				{
					englishWords: "fight,",
					greekWords: [
						{
							text: "fight,",
							strongs: "G4752",
							OGNTsort: 112083,
							morph: "N-ASF",
							lemma: "στρατεία",
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 9,
			verseWords: [
				{
					englishWords: "Therefore",
					greekWords: [
						{
							text: "Therefore",
							strongs: "G3767",
							OGNTsort: 2671,
							morph: "CONJ",
							lemma: "οὖν",
						},
					],
				},
				{
					englishWords: "pray",
					greekWords: [
						{
							text: "pray",
							strongs: "G4336",
							OGNTsort: 2672,
							morph: "V-PNM-2P",
							lemma: "προσεύχομαι",
						},
					],
				},
				{
					englishWords: "like this:",
					greekWords: [
						{
							text: "like this:",
							strongs: "G3779",
							OGNTsort: 2670,
							morph: "ADV",
							lemma: "οὕτω, οὕτως",
						},
					],
				},
				{
					englishWords: "'Our",
					greekWords: [
						{
							text: "'Our",
							strongs: "G1473",
							OGNTsort: 2675,
							morph: "P-1GP",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "Father",
					greekWords: [
						{
							text: "Father",
							strongs: "G3962",
							OGNTsort: 2674,
							morph: "N-VSM",
							lemma: "πατήρ",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 2677,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "heaven,",
					greekWords: [
						{
							text: "heaven,",
							strongs: "G3772",
							OGNTsort: 2679,
							morph: "N-DPM",
							lemma: "οὐρανός",
						},
					],
				},
				{
					englishWords: "may your name be honored as holy.",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "your",
								strongs: "G4771",
								OGNTsort: 2683,
								morph: "P-2GS",
								lemma: "σύ",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "name",
								strongs: "G3686",
								OGNTsort: 2682,
								morph: "N-NSN",
								lemma: "ὄνομα",
							},
						},
						{
							word: {
								text: "may your name be honored as holy.",
								strongs: "G37",
								OGNTsort: 2680,
								morph: "V-APM-3S",
								lemma: "ἁγιάζω",
							},
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 22,
			verseWords: [
				{
					englishWords: "Then",
					greekWords: [
						{
							text: "Then",
							strongs: "G2532",
							OGNTsort: 9618,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "Peter",
					greekWords: [
						{
							text: "Peter",
							strongs: "G4074",
							OGNTsort: 9622,
							morph: "N-NSM-P",
							lemma: "Πέτρος",
						},
					],
				},
				{
					englishWords: "took him aside",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "him",
								strongs: "G846",
								OGNTsort: 9620,
								morph: "P-ASM",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: "took him aside",
								strongs: "G4355",
								OGNTsort: 9619,
								morph: "V-2AMP-NSM",
								lemma: "προσλαμβάνω",
							},
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "rebuked",
					greekWords: [
						{
							text: "rebuked",
							strongs: "G2008",
							OGNTsort: 9624,
							morph: "V-PAN",
							lemma: "ἐπιτιμάω",
						},
					],
				},
				{
					englishWords: "him,",
					greekWords: [
						{
							text: "him,",
							strongs: "G846",
							OGNTsort: 9625,
							morph: "P-DSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "saying,",
					greekWords: [
						{
							text: "saying,",
							strongs: "G3004",
							OGNTsort: 9626,
							morph: "V-PAP-NSM",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: '"May this be far',
					phraseWords: [
						{
							text: "√",
							strongs: "G2436",
							OGNTsort: 9627,
							phraseWords: '"May this be far',
							morph: "A-NSM",
							lemma: "ἵλεως",
						},
					],
					subWords: [],
				},
				{
					englishWords: "from you,",
					greekWords: [
						{
							text: "from you,",
							strongs: "G4771",
							OGNTsort: 9628,
							morph: "P-2DS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "Lord!",
					greekWords: [
						{
							text: "Lord!",
							strongs: "G2962",
							OGNTsort: 9629,
							morph: "N-VSM",
							lemma: "κύριος",
						},
					],
				},
				{
					englishWords: "May this never happen",
					subWords: [
						{
							subIdx: "[2]",
							word: {
								text: "this",
								strongs: "G3778",
								OGNTsort: 9634,
								morph: "D-NSN",
								lemma: "οὗτος",
							},
						},
						{
							subIdx: "[3]",
							word: {
								text: "√",
								strongs: "G3756",
								OGNTsort: 9630,
								subPhraseWords: "never",
								morph: "PRT-N",
								lemma: "οὐ",
							},
						},
						{
							subIdx: "[3]",
							word: {
								text: "√",
								strongs: "G3361",
								OGNTsort: 9631,
								subPhraseWords: "never",
								morph: "PRT-N",
								lemma: "μή",
							},
						},
						{
							word: {
								text: "May this never happen",
								strongs: "G1510",
								OGNTsort: 9632,
								morph: "V-FDI-3S",
								lemma: "εἰμί",
							},
						},
					],
				},
				{
					englishWords: 'to you!"',
					greekWords: [
						{
							text: 'to you!"',
							strongs: "G4771",
							OGNTsort: 9633,
							morph: "P-2DS",
							lemma: "σύ",
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 1,
			verseWords: [
				{
					englishWords: "The",
					greekWords: [
						{
							text: "The",
							strongs: "G3588",
							OGNTsort: 64768,
							morph: "T-ASM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "former",
					greekWords: [
						{
							text: "former",
							strongs: "G4413",
							OGNTsort: 64770,
							morph: "A-ASM",
							lemma: "πρῶτος",
						},
					],
				},
				{
					englishWords: "account",
					greekWords: [
						{
							text: "account",
							strongs: "G3056",
							OGNTsort: 64771,
							morph: "N-ASM",
							lemma: "λόγος",
						},
					],
				},
				{
					englishWords: "I wrote,",
					greekWords: [
						{
							text: "I wrote,",
							strongs: "G4160",
							OGNTsort: 64772,
							morph: "V-AMI-1S",
							lemma: "ποιέω",
						},
					],
				},
				{
					englishWords: "Theophilus,",
					greekWords: [
						{
							text: "Theophilus,",
							strongs: "G2321",
							OGNTsort: 64776,
							morph: "N-VSM-P",
							lemma: "Θεόφιλος",
						},
					],
				},
				{ englishWords: "told" },
				{
					englishWords: "all",
					greekWords: [
						{
							text: "all",
							strongs: "G3956",
							OGNTsort: 64774,
							morph: "A-GPN",
							lemma: "πᾶς",
						},
					],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G3739",
							OGNTsort: 64777,
							morph: "R-GPN",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "Jesus",
					greekWords: [
						{
							text: "Jesus",
							strongs: "G2424",
							OGNTsort: 64780,
							morph: "N-NSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
				{
					englishWords: "began",
					greekWords: [
						{
							text: "began",
							strongs: "G757",
							OGNTsort: 64778,
							morph: "V-ADI-3S",
							lemma: "ἄρχω",
						},
					],
				},
				{
					englishWords: "to do",
					greekWords: [
						{
							text: "to do",
							strongs: "G4160",
							OGNTsort: 64781,
							morph: "V-PAN",
							lemma: "ποιέω",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 64783,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "to teach,",
					greekWords: [
						{
							text: "to teach,",
							strongs: "G1321",
							OGNTsort: 64784,
							morph: "V-PAN",
							lemma: "διδάσκω",
						},
					],
				},
			],
		},
		{
			verseNum: 2,
			verseWords: [
				{
					englishWords: "until",
					greekWords: [
						{
							text: "until",
							strongs: "G891",
							OGNTsort: 64785,
							morph: "PREP",
							lemma: "ἄχρι",
						},
					],
				},
				{
					englishWords: "the day",
					greekWords: [
						{
							text: "the day",
							strongs: "G2250",
							OGNTsort: 64787,
							morph: "N-GSF",
							lemma: "ἡμέρα",
						},
					],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G3739",
							OGNTsort: 64786,
							morph: "R-GSF",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "he was taken up,",
					greekWords: [
						{
							text: "he was taken up,",
							strongs: "G353",
							OGNTsort: 64796,
							morph: "V-API-3S",
							lemma: "ἀναλαμβάνω",
						},
					],
				},
				{
					englishWords: "after he had given commands",
					greekWords: [
						{
							text: "after he had given commands",
							strongs: "G1781",
							OGNTsort: 64788,
							morph: "V-ANP-NSM",
							lemma: "ἐντέλλω",
						},
					],
				},
				{
					englishWords: "through",
					greekWords: [
						{
							text: "through",
							strongs: "G1223",
							OGNTsort: 64791,
							morph: "PREP",
							lemma: "διά",
						},
					],
				},
				{
					englishWords: "the Holy",
					greekWords: [
						{
							text: "the Holy",
							strongs: "G40",
							OGNTsort: 64793,
							morph: "A-GSN",
							lemma: "ἅγιος",
						},
					],
				},
				{
					englishWords: "Spirit",
					greekWords: [
						{
							text: "Spirit",
							strongs: "G4151",
							OGNTsort: 64792,
							morph: "N-GSN",
							lemma: "πνεῦμα",
						},
					],
				},
				{
					englishWords: "to the",
					greekWords: [
						{
							text: "to the",
							strongs: "G3588",
							OGNTsort: 64789,
							morph: "T-DPM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "apostles",
					greekWords: [
						{
							text: "apostles",
							strongs: "G652",
							OGNTsort: 64790,
							morph: "N-DPM",
							lemma: "ἀπόστολος",
						},
					],
				},
				{
					englishWords: "he had chosen.",
					greekWords: [
						{
							text: "he had chosen.",
							strongs: "G1586",
							OGNTsort: 64795,
							morph: "V-AMI-3S",
							lemma: "ἐκλέγω",
						},
					],
				},
			],
		},
		{
			verseNum: 3,
			verseWords: [
				{
					englishWords: "After",
					greekWords: [
						{
							text: "After",
							strongs: "G3326",
							OGNTsort: 64802,
							morph: "PREP",
							lemma: "μετά",
						},
					],
				},
				{
					englishWords: "his",
					greekWords: [
						{
							text: "his",
							strongs: "G846",
							OGNTsort: 64805,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "suffering,",
					greekWords: [
						{
							text: "suffering,",
							strongs: "G3958",
							OGNTsort: 64804,
							morph: "V-2AAN",
							lemma: "πάσχω",
						},
					],
				},
				{
					englishWords: "he presented",
					greekWords: [
						{
							text: "he presented",
							strongs: "G3936",
							OGNTsort: 64799,
							morph: "V-AAI-3S",
							lemma: "παρίστημι",
						},
					],
				},
				{
					englishWords: "himself",
					greekWords: [
						{
							text: "himself",
							strongs: "G1438",
							OGNTsort: 64800,
							morph: "F-3ASM",
							lemma: "ἑαυτοῦ",
						},
					],
				},
				{
					englishWords: "alive",
					greekWords: [
						{
							text: "alive",
							strongs: "G2198",
							OGNTsort: 64801,
							morph: "V-PAP-ASM",
							lemma: "ζάω",
						},
					],
				},
				{
					englishWords: "to them",
					greekWords: [
						{
							text: "to them",
							strongs: "G3739",
							OGNTsort: 64797,
							morph: "R-DPM",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "with",
					greekWords: [
						{
							text: "with",
							strongs: "G1722",
							OGNTsort: 64806,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "many",
					greekWords: [
						{
							text: "many",
							strongs: "G4183",
							OGNTsort: 64807,
							morph: "A-DPN",
							lemma: "πολύς",
						},
					],
				},
				{
					englishWords: "convincing proofs.",
					greekWords: [
						{
							text: "convincing proofs.",
							strongs: "G5039",
							OGNTsort: 64808,
							morph: "N-DPN",
							lemma: "τεκμήριον",
						},
					],
				},
				{
					englishWords: "For",
					greekWords: [
						{
							text: "For",
							strongs: "G1223",
							OGNTsort: 64809,
							morph: "PREP",
							lemma: "διά",
						},
					],
				},
				{
					englishWords: "forty",
					greekWords: [
						{
							text: "forty",
							strongs: "G5062",
							OGNTsort: 64811,
							morph: "A-GPF-NUI",
							lemma: "τεσσαράκοντα",
						},
					],
				},
				{
					englishWords: "days",
					greekWords: [
						{
							text: "days",
							strongs: "G2250",
							OGNTsort: 64810,
							morph: "N-GPF",
							lemma: "ἡμέρα",
						},
					],
				},
				{
					englishWords: "he appeared",
					greekWords: [
						{
							text: "he appeared",
							strongs: "G3700",
							OGNTsort: 64812,
							morph: "V-PNP-NSM",
							lemma: "ὀπτάνομαι",
						},
					],
				},
				{
					englishWords: "to them,",
					greekWords: [
						{
							text: "to them,",
							strongs: "G846",
							OGNTsort: 64813,
							morph: "P-DPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 64814,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "he spoke",
					greekWords: [
						{
							text: "he spoke",
							strongs: "G3004",
							OGNTsort: 64815,
							morph: "V-PAP-NSM",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: "about",
					greekWords: [
						{
							text: "about",
							strongs: "G4012",
							OGNTsort: 64817,
							morph: "PREP",
							lemma: "περί",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 64818,
							morph: "T-GSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "kingdom",
					greekWords: [
						{
							text: "kingdom",
							strongs: "G932",
							OGNTsort: 64819,
							morph: "N-GSF",
							lemma: "βασιλεία",
						},
					],
				},
				{
					englishWords: "of God.",
					greekWords: [
						{
							text: "of God.",
							strongs: "G2316",
							OGNTsort: 64821,
							morph: "N-GSM",
							lemma: "θεός",
						},
					],
				},
			],
		},
		{
			verseNum: 4,
			verseWords: [
				{
					englishWords: "When",
					greekWords: [
						{
							text: "When",
							strongs: "G2532",
							OGNTsort: 64822,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "he was meeting together with",
					greekWords: [
						{
							text: "he was meeting together with",
							strongs: "G4871",
							OGNTsort: 64823,
							morph: "V-PNP-NSM",
							lemma: "συναλίζω",
						},
					],
				},
				{ englishWords: "them," },
				{
					englishWords: "he commanded",
					greekWords: [
						{
							text: "he commanded",
							strongs: "G3853",
							OGNTsort: 64824,
							morph: "V-AAI-3S",
							lemma: "παραγγέλλω",
						},
					],
				},
				{
					englishWords: "them",
					greekWords: [
						{
							text: "them",
							strongs: "G846",
							OGNTsort: 64825,
							morph: "P-DPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "not",
					greekWords: [
						{
							text: "not",
							strongs: "G3361",
							OGNTsort: 64828,
							morph: "PRT-N",
							lemma: "μή",
						},
					],
				},
				{
					englishWords: "to leave",
					greekWords: [
						{
							text: "to leave",
							strongs: "G5563",
							OGNTsort: 64829,
							morph: "V-PPN",
							lemma: "χωρίζω",
						},
					],
				},
				{
					englishWords: "Jerusalem,",
					greekWords: [
						{
							text: "Jerusalem,",
							strongs: "G2414",
							OGNTsort: 64827,
							morph: "N-GPN-L",
							lemma: "Ἱεροσόλυμα",
						},
					],
				},
				{
					englishWords: "but",
					greekWords: [
						{
							text: "but",
							strongs: "G235",
							OGNTsort: 64830,
							morph: "CONJ",
							lemma: "ἀλλά",
						},
					],
				},
				{
					englishWords: "to wait for",
					greekWords: [
						{
							text: "to wait for",
							strongs: "G4037",
							OGNTsort: 64831,
							morph: "V-PAN",
							lemma: "περιμένω",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 64832,
							morph: "T-ASF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "promise",
					greekWords: [
						{
							text: "promise",
							strongs: "G1860",
							OGNTsort: 64833,
							morph: "N-ASF",
							lemma: "ἐπαγγελία",
						},
					],
				},
				{
					englishWords: "of the",
					greekWords: [
						{
							text: "of the",
							strongs: "G3588",
							OGNTsort: 64834,
							morph: "T-GSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "Father,",
					greekWords: [
						{
							text: "Father,",
							strongs: "G3962",
							OGNTsort: 64835,
							morph: "N-GSM",
							lemma: "πατήρ",
						},
					],
				},
				{
					englishWords: "about which",
					greekWords: [
						{
							text: "about which",
							strongs: "G3739",
							OGNTsort: 64836,
							morph: "R-ASF",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{ englishWords: "he said," },
				{
					englishWords: '"You heard',
					greekWords: [
						{
							text: '"You heard',
							strongs: "G191",
							OGNTsort: 64837,
							morph: "V-AAI-2P",
							lemma: "ἀκούω",
						},
					],
				},
				{
					englishWords: "from me",
					greekWords: [
						{
							text: "from me",
							strongs: "G1473",
							OGNTsort: 64838,
							morph: "P-1GS",
							lemma: "ἐγώ",
						},
					],
				},
			],
		},
		{
			verseNum: 5,
			verseWords: [
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G3754",
							OGNTsort: 64839,
							morph: "CONJ",
							lemma: "ὅτι",
						},
					],
				},
				{
					englishWords: "John",
					greekWords: [
						{
							text: "John",
							strongs: "G2491",
							OGNTsort: 64840,
							morph: "N-NSM-P",
							lemma: "Ἰωάννης",
						},
					],
				},
				{
					englishWords: "indeed",
					greekWords: [
						{
							text: "indeed",
							strongs: "G3303",
							OGNTsort: 64841,
							morph: "PRT",
							lemma: "μέν",
						},
					],
				},
				{
					englishWords: "baptized",
					greekWords: [
						{
							text: "baptized",
							strongs: "G907",
							OGNTsort: 64842,
							morph: "V-AAI-3S",
							lemma: "βαπτίζω",
						},
					],
				},
				{
					englishWords: "with water,",
					greekWords: [
						{
							text: "with water,",
							strongs: "G5204",
							OGNTsort: 64843,
							morph: "N-DSN",
							lemma: "ὕδωρ, ὕδατος",
						},
					],
				},
				{
					englishWords: "but",
					greekWords: [
						{
							text: "but",
							strongs: "G1161",
							OGNTsort: 64845,
							morph: "CONJ",
							lemma: "δέ",
						},
					],
				},
				{
					englishWords: "you",
					greekWords: [
						{
							text: "you",
							strongs: "G4771",
							OGNTsort: 64844,
							morph: "P-2NP",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "will be baptized",
					greekWords: [
						{
							text: "will be baptized",
							strongs: "G907",
							OGNTsort: 64848,
							morph: "V-FPI-2P",
							lemma: "βαπτίζω",
						},
					],
				},
				{
					englishWords: "with",
					greekWords: [
						{
							text: "with",
							strongs: "G1722",
							OGNTsort: 64846,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "the Holy",
					greekWords: [
						{
							text: "the Holy",
							strongs: "G40",
							OGNTsort: 64849,
							morph: "A-DSN",
							lemma: "ἅγιος",
						},
					],
				},
				{
					englishWords: "Spirit",
					greekWords: [
						{
							text: "Spirit",
							strongs: "G4151",
							OGNTsort: 64847,
							morph: "N-DSN",
							lemma: "πνεῦμα",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G3326",
							OGNTsort: 64851,
							morph: "PREP",
							lemma: "μετά",
						},
					],
				},
				{
					englishWords: "a few",
					greekWords: [
						{
							text: "a few",
							strongs: "G4183",
							OGNTsort: 64852,
							morph: "A-APF",
							lemma: "πολύς",
						},
					],
				},
				{
					englishWords: 'days."',
					greekWords: [
						{
							text: 'days."',
							strongs: "G2250",
							OGNTsort: 64854,
							morph: "N-APF",
							lemma: "ἡμέρα",
						},
					],
				},
			],
		},
		{
			verseNum: 6,
			verseWords: [
				{
					englishWords: "When they were assembled together",
					phraseWords: [
						{
							text: "√",
							strongs: "G3588",
							OGNTsort: 64855,
							phraseWords:
								"When they were assembled together",
							morph: "T-NPM",
							lemma: "ὁ",
						},
						{
							text: "√",
							strongs: "G4905",
							OGNTsort: 64858,
							phraseWords:
								"When they were assembled together",
							morph: "V-2AAP-NPM",
							lemma: "συνέρχομαι",
						},
					],
					subWords: [],
				},
				{
					englishWords: "they asked",
					greekWords: [
						{
							text: "they asked",
							strongs: "G2065",
							OGNTsort: 64859,
							morph: "V-IAI-3P",
							lemma: "ἐρωτάω",
						},
					],
				},
				{
					englishWords: "him,",
					greekWords: [
						{
							text: "him,",
							strongs: "G846",
							OGNTsort: 64860,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: '"Lord,',
					greekWords: [
						{
							text: '"Lord,',
							strongs: "G2962",
							OGNTsort: 64862,
							morph: "N-VSM",
							lemma: "κύριος",
						},
					],
				},
				{ englishWords: "is" },
				{
					englishWords: "this",
					greekWords: [
						{
							text: "this",
							strongs: "G3778",
							OGNTsort: 64867,
							morph: "D-DSM",
							lemma: "οὗτος",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 64865,
							morph: "T-DSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "time",
					greekWords: [
						{
							text: "time",
							strongs: "G5550",
							OGNTsort: 64866,
							morph: "N-DSM",
							lemma: "χρόνος",
						},
					],
				},
				{
					englishWords: "you will restore",
					greekWords: [
						{
							text: "you will restore",
							strongs: "G600",
							OGNTsort: 64868,
							morph: "V-PAI-2S",
							lemma: "ἀποκαθίστημι",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 64869,
							morph: "T-ASF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "kingdom",
					greekWords: [
						{
							text: "kingdom",
							strongs: "G932",
							OGNTsort: 64870,
							morph: "N-ASF",
							lemma: "βασιλεία",
						},
					],
				},
				{
					englishWords: 'to Israel?"',
					greekWords: [
						{
							text: 'to Israel?"',
							strongs: "G2474",
							OGNTsort: 64872,
							morph: "N-DSM-L",
							lemma: "Ἰσραήλ",
						},
					],
				},
			],
		},
		{
			verseNum: 7,
			verseWords: [
				{
					englishWords: "He said",
					greekWords: [
						{
							text: "He said",
							strongs: "G2036",
							OGNTsort: 64873,
							morph: "V-2AAI-3S",
							lemma: "ἔπω, ἐρῶ, εἶπον",
						},
					],
				},
				{
					englishWords: "to",
					greekWords: [
						{
							text: "to",
							strongs: "G4314",
							OGNTsort: 64875,
							morph: "PREP",
							lemma: "πρός",
						},
					],
				},
				{
					englishWords: "them,",
					greekWords: [
						{
							text: "them,",
							strongs: "G846",
							OGNTsort: 64876,
							morph: "P-APM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: '"It is',
					greekWords: [
						{
							text: '"It is',
							strongs: "G1510",
							OGNTsort: 64879,
							morph: "V-PAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "not",
					greekWords: [
						{
							text: "not",
							strongs: "G3756",
							OGNTsort: 64877,
							morph: "PRT-N",
							lemma: "οὐ",
						},
					],
				},
				{
					englishWords: "for you",
					greekWords: [
						{
							text: "for you",
							strongs: "G4771",
							OGNTsort: 64878,
							morph: "P-2GP",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "to know",
					greekWords: [
						{
							text: "to know",
							strongs: "G1097",
							OGNTsort: 64880,
							morph: "V-2AAN",
							lemma: "γινώσκω",
						},
					],
				},
				{
					englishWords: "the times",
					greekWords: [
						{
							text: "the times",
							strongs: "G5550",
							OGNTsort: 64881,
							morph: "N-APM",
							lemma: "χρόνος",
						},
					],
				},
				{
					englishWords: "or",
					greekWords: [
						{
							text: "or",
							strongs: "G2228",
							OGNTsort: 64882,
							morph: "CONJ",
							lemma: "ἤ",
						},
					],
				},
				{
					englishWords: "the seasons",
					greekWords: [
						{
							text: "the seasons",
							strongs: "G2540",
							OGNTsort: 64883,
							morph: "N-APM",
							lemma: "καιρός",
						},
					],
				},
				{
					englishWords: "which",
					greekWords: [
						{
							text: "which",
							strongs: "G3739",
							OGNTsort: 64884,
							morph: "R-APM",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 64885,
							morph: "T-NSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "Father",
					greekWords: [
						{
							text: "Father",
							strongs: "G3962",
							OGNTsort: 64886,
							morph: "N-NSM",
							lemma: "πατήρ",
						},
					],
				},
				{
					englishWords: "has determined",
					greekWords: [
						{
							text: "has determined",
							strongs: "G5087",
							OGNTsort: 64887,
							morph: "V-2AMI-3S",
							lemma: "τίθημι",
						},
					],
				},
				{
					englishWords: "by",
					greekWords: [
						{
							text: "by",
							strongs: "G1722",
							OGNTsort: 64888,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "his own",
					greekWords: [
						{
							text: "his own",
							strongs: "G2398",
							OGNTsort: 64890,
							morph: "A-DSF",
							lemma: "ἴδιος",
						},
					],
				},
				{
					englishWords: "authority.",
					greekWords: [
						{
							text: "authority.",
							strongs: "G1849",
							OGNTsort: 64891,
							morph: "N-DSF",
							lemma: "ἐξουσία",
						},
					],
				},
			],
		},
		{
			verseNum: 8,
			verseWords: [
				{
					englishWords: "But",
					greekWords: [
						{
							text: "But",
							strongs: "G235",
							OGNTsort: 64892,
							morph: "CONJ",
							lemma: "ἀλλά",
						},
					],
				},
				{
					englishWords: "you will receive",
					greekWords: [
						{
							text: "you will receive",
							strongs: "G2983",
							OGNTsort: 64893,
							morph: "V-FDI-2P",
							lemma: "λαμβάνω",
						},
					],
				},
				{
					englishWords: "power",
					greekWords: [
						{
							text: "power",
							strongs: "G1411",
							OGNTsort: 64894,
							morph: "N-ASF",
							lemma: "δύναμις",
						},
					],
				},
				{
					englishWords: "when the Holy Spirit comes",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "the",
								strongs: "G3588",
								OGNTsort: 64896,
								morph: "T-GSN",
								lemma: "ὁ",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "Holy",
								strongs: "G40",
								OGNTsort: 64897,
								morph: "A-GSN",
								lemma: "ἅγιος",
							},
						},
						{
							subIdx: "[3]",
							word: {
								text: "Spirit",
								strongs: "G4151",
								OGNTsort: 64898,
								morph: "N-GSN",
								lemma: "πνεῦμα",
							},
						},
						{
							word: {
								text: "when the Holy Spirit comes",
								strongs: "G1904",
								OGNTsort: 64895,
								morph: "V-2AAP-GSN",
								lemma: "ἐπέρχομαι",
							},
						},
					],
				},
				{
					englishWords: "upon",
					greekWords: [
						{
							text: "upon",
							strongs: "G1909",
							OGNTsort: 64899,
							morph: "PREP",
							lemma: "ἐπί",
						},
					],
				},
				{
					englishWords: "you,",
					greekWords: [
						{
							text: "you,",
							strongs: "G4771",
							OGNTsort: 64900,
							morph: "P-2AP",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 64901,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "you will be",
					greekWords: [
						{
							text: "you will be",
							strongs: "G1510",
							OGNTsort: 64902,
							morph: "V-FDI-2P",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "my",
					greekWords: [
						{
							text: "my",
							strongs: "G1473",
							OGNTsort: 64903,
							morph: "P-1GS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "witnesses",
					greekWords: [
						{
							text: "witnesses",
							strongs: "G3144",
							OGNTsort: 64904,
							morph: "N-NPM",
							lemma: "μάρτυς",
						},
					],
				},
				{
					englishWords: "both",
					greekWords: [
						{
							text: "both",
							strongs: "G5037",
							OGNTsort: 64906,
							morph: "CONJ",
							lemma: "τε",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 64905,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "Jerusalem",
					greekWords: [
						{
							text: "Jerusalem",
							strongs: "G2419",
							OGNTsort: 64907,
							morph: "N-DSF-L",
							lemma: "Ἱερουσαλήμ",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 64908,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 64909,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "all",
					greekWords: [
						{
							text: "all",
							strongs: "G3956",
							OGNTsort: 64910,
							morph: "A-DSF",
							lemma: "πᾶς",
						},
					],
				},
				{
					englishWords: "Judea",
					greekWords: [
						{
							text: "Judea",
							strongs: "G2449",
							OGNTsort: 64912,
							morph: "N-DSF-L",
							lemma: "Ἰουδαία",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 64913,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "Samaria,",
					greekWords: [
						{
							text: "Samaria,",
							strongs: "G4540",
							OGNTsort: 64914,
							morph: "N-DSF-L",
							lemma: "Σαμάρεια",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 64915,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "to",
					greekWords: [
						{
							text: "to",
							strongs: "G2193",
							OGNTsort: 64916,
							morph: "PREP",
							lemma: "ἕως",
						},
					],
				},
				{
					englishWords: "the ends",
					greekWords: [
						{
							text: "the ends",
							strongs: "G2078",
							OGNTsort: 64917,
							morph: "A-GSN",
							lemma: "ἔσχατος",
						},
					],
				},
				{
					englishWords: "of the",
					greekWords: [
						{
							text: "of the",
							strongs: "G3588",
							OGNTsort: 64918,
							morph: "T-GSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: 'earth."',
					greekWords: [
						{
							text: 'earth."',
							strongs: "G1093",
							OGNTsort: 64919,
							morph: "N-GSF",
							lemma: "γῆ",
						},
					],
				},
			],
		},
		{
			verseNum: 9,
			verseWords: [
				{
					englishWords: "When",
					greekWords: [
						{
							text: "When",
							strongs: "G2532",
							OGNTsort: 64920,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{ englishWords: "the Lord Jesus" },
				{
					englishWords: "had said",
					greekWords: [
						{
							text: "had said",
							strongs: "G2036",
							OGNTsort: 64922,
							morph: "V-2AAP-NSM",
							lemma: "ἔπω, ἐρῶ, εἶπον",
						},
					],
				},
				{
					englishWords: "these things,",
					greekWords: [
						{
							text: "these things,",
							strongs: "G3778",
							OGNTsort: 64921,
							morph: "D-APN",
							lemma: "οὗτος",
						},
					],
				},
				{
					englishWords: "as they were looking up,",
					phraseWords: [
						{
							text: "√",
							strongs: "G846",
							OGNTsort: 64924,
							phraseWords: "as they were looking up,",
							morph: "P-GPM",
							lemma: "αὐτός",
						},
						{
							text: "√",
							strongs: "G991",
							OGNTsort: 64923,
							phraseWords: "as they were looking up,",
							morph: "V-PAP-GPM",
							lemma: "βλέπω",
						},
					],
					subWords: [],
				},
				{
					englishWords: "he was raised up,",
					greekWords: [
						{
							text: "he was raised up,",
							strongs: "G1869",
							OGNTsort: 64925,
							morph: "V-API-3S",
							lemma: "ἐπαίρω",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 64926,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "a cloud",
					greekWords: [
						{
							text: "a cloud",
							strongs: "G3507",
							OGNTsort: 64927,
							morph: "N-NSF",
							lemma: "νεφέλη",
						},
					],
				},
				{
					englishWords: "hid",
					greekWords: [
						{
							text: "hid",
							strongs: "G5274",
							OGNTsort: 64928,
							morph: "V-2AAI-3S",
							lemma: "ὑπολαμβάνω",
						},
					],
				},
				{
					englishWords: "him",
					greekWords: [
						{
							text: "him",
							strongs: "G846",
							OGNTsort: 64929,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "from",
					greekWords: [
						{
							text: "from",
							strongs: "G575",
							OGNTsort: 64930,
							morph: "PREP",
							lemma: "ἀπό",
						},
					],
				},
				{
					englishWords: "their",
					greekWords: [
						{
							text: "their",
							strongs: "G846",
							OGNTsort: 64933,
							morph: "P-GPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "eyes.",
					greekWords: [
						{
							text: "eyes.",
							strongs: "G3788",
							OGNTsort: 64932,
							morph: "N-GPM",
							lemma: "ὀφθαλμός",
						},
					],
				},
			],
		},
		{
			verseNum: 10,
			verseWords: [
				{
					englishWords: "While",
					greekWords: [
						{
							text: "While",
							strongs: "G5613",
							OGNTsort: 64935,
							morph: "CONJ",
							lemma: "ὡς",
						},
					],
				},
				{
					englishWords: "they were",
					greekWords: [
						{
							text: "they were",
							strongs: "G1510",
							OGNTsort: 64937,
							morph: "V-IAI-3P",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "looking intensely",
					greekWords: [
						{
							text: "looking intensely",
							strongs: "G816",
							OGNTsort: 64936,
							morph: "V-PAP-NPM",
							lemma: "ἀτενίζω",
						},
					],
				},
				{
					englishWords: "to",
					greekWords: [
						{
							text: "to",
							strongs: "G1519",
							OGNTsort: 64938,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "heaven",
					greekWords: [
						{
							text: "heaven",
							strongs: "G3772",
							OGNTsort: 64940,
							morph: "N-ASM",
							lemma: "οὐρανός",
						},
					],
				},
				{
					englishWords: "as he went,",
					phraseWords: [
						{
							text: "√",
							strongs: "G846",
							OGNTsort: 64942,
							phraseWords: "as he went,",
							morph: "P-GSM",
							lemma: "αὐτός",
						},
						{
							text: "√",
							strongs: "G4198",
							OGNTsort: 64941,
							phraseWords: "as he went,",
							morph: "V-PNP-GSM",
							lemma: "πορεύω",
						},
					],
					subWords: [],
				},
				{
					englishWords: "suddenly,",
					greekWords: [
						{
							text: "suddenly,",
							strongs: "G2400",
							OGNTsort: 64944,
							morph: "INJ",
							lemma: "ἰδού",
						},
					],
				},
				{
					englishWords: "two",
					greekWords: [
						{
							text: "two",
							strongs: "G1417",
							OGNTsort: 64946,
							morph: "A-NPM-NUI",
							lemma: "δύο",
						},
					],
				},
				{
					englishWords: "men",
					greekWords: [
						{
							text: "men",
							strongs: "G435",
							OGNTsort: 64945,
							morph: "N-NPM",
							lemma: "ἀνήρ",
						},
					],
				},
				{
					englishWords: "stood",
					greekWords: [
						{
							text: "stood",
							strongs: "G3936",
							OGNTsort: 64947,
							morph: "V-LAI-3P",
							lemma: "παρίστημι",
						},
					],
				},
				{
					englishWords: "by them",
					greekWords: [
						{
							text: "by them",
							strongs: "G846",
							OGNTsort: 64948,
							morph: "P-DPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 64949,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "white",
					greekWords: [
						{
							text: "white",
							strongs: "G3022",
							OGNTsort: 64951,
							morph: "A-DPF",
							lemma: "λευκός",
						},
					],
				},
				{
					englishWords: "clothing.",
					greekWords: [
						{
							text: "clothing.",
							strongs: "G2066",
							OGNTsort: 64950,
							morph: "N-DPF",
							lemma: "ἐσθής",
						},
					],
				},
			],
		},
		{
			verseNum: 11,
			verseWords: [
				{
					englishWords: "They",
					greekWords: [
						{
							text: "They",
							strongs: "G3739",
							OGNTsort: 64952,
							morph: "R-NPM",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "said,",
					greekWords: [
						{
							text: "said,",
							strongs: "G2036",
							OGNTsort: 64954,
							morph: "V-2AAI-3P",
							lemma: "ἔπω, ἐρῶ, εἶπον",
						},
					],
				},
				{ englishWords: '"You' },
				{
					englishWords: "men",
					greekWords: [
						{
							text: "men",
							strongs: "G435",
							OGNTsort: 64955,
							morph: "N-VPM",
							lemma: "ἀνήρ",
						},
					],
				},
				{
					englishWords: "of Galilee,",
					greekWords: [
						{
							text: "of Galilee,",
							strongs: "G1057",
							OGNTsort: 64956,
							morph: "N-VPM-LG",
							lemma: "Γαλιλαῖος",
						},
					],
				},
				{
					englishWords: "why",
					greekWords: [
						{
							text: "why",
							strongs: "G5101",
							OGNTsort: 64957,
							morph: "I-ASN",
							lemma: "τίς",
						},
					],
				},
				{
					englishWords: "do you stand",
					greekWords: [
						{
							text: "do you stand",
							strongs: "G2476",
							OGNTsort: 64958,
							morph: "V-RAI-2P",
							lemma: "ἵστημι",
						},
					],
				},
				{ englishWords: "here" },
				{
					englishWords: "looking",
					greekWords: [
						{
							text: "looking",
							strongs: "G991",
							OGNTsort: 64959,
							morph: "V-PAP-NPM",
							lemma: "βλέπω",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 64960,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "heaven?",
					greekWords: [
						{
							text: "heaven?",
							strongs: "G3772",
							OGNTsort: 64962,
							morph: "N-ASM",
							lemma: "οὐρανός",
						},
					],
				},
				{
					englishWords: "This",
					greekWords: [
						{
							text: "This",
							strongs: "G3778",
							OGNTsort: 64963,
							morph: "D-NSM",
							lemma: "οὗτος",
						},
					],
				},
				{
					englishWords: "Jesus",
					greekWords: [
						{
							text: "Jesus",
							strongs: "G2424",
							OGNTsort: 64965,
							morph: "N-NSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
				{
					englishWords: "who",
					greekWords: [
						{
							text: "who",
							strongs: "G3588",
							OGNTsort: 64966,
							morph: "T-NSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "has been taken up",
					greekWords: [
						{
							text: "has been taken up",
							strongs: "G353",
							OGNTsort: 64967,
							morph: "V-APP-NSM",
							lemma: "ἀναλαμβάνω",
						},
					],
				},
				{
					englishWords: "from",
					greekWords: [
						{
							text: "from",
							strongs: "G575",
							OGNTsort: 64968,
							morph: "PREP",
							lemma: "ἀπό",
						},
					],
				},
				{
					englishWords: "you",
					greekWords: [
						{
							text: "you",
							strongs: "G4771",
							OGNTsort: 64969,
							morph: "P-2GP",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 64970,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "heaven,",
					greekWords: [
						{
							text: "heaven,",
							strongs: "G3772",
							OGNTsort: 64972,
							morph: "N-ASM",
							lemma: "οὐρανός",
						},
					],
				},
				{
					englishWords: "will return",
					greekWords: [
						{
							text: "will return",
							strongs: "G2064",
							OGNTsort: 64974,
							morph: "V-FDI-3S",
							lemma: "ἔρχομαι",
						},
					],
				},
				{ englishWords: "in the" },
				{
					englishWords: "same manner",
					greekWords: [
						{
							text: "same manner",
							strongs: "G5158",
							OGNTsort: 64976,
							morph: "N-ASM",
							lemma: "τρόπος",
						},
					],
				},
				{ englishWords: "as" },
				{
					englishWords: "you saw",
					greekWords: [
						{
							text: "you saw",
							strongs: "G2300",
							OGNTsort: 64977,
							morph: "V-ADI-2P",
							lemma: "θεάομαι",
						},
					],
				},
				{
					englishWords: "him",
					greekWords: [
						{
							text: "him",
							strongs: "G846",
							OGNTsort: 64978,
							morph: "P-ASM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "going",
					greekWords: [
						{
							text: "going",
							strongs: "G4198",
							OGNTsort: 64979,
							morph: "V-PNP-ASM",
							lemma: "πορεύω",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 64980,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: 'heaven."',
					greekWords: [
						{
							text: 'heaven."',
							strongs: "G3772",
							OGNTsort: 64982,
							morph: "N-ASM",
							lemma: "οὐρανός",
						},
					],
				},
			],
		},
		{
			verseNum: 12,
			verseWords: [
				{
					englishWords: "Then",
					greekWords: [
						{
							text: "Then",
							strongs: "G5119",
							OGNTsort: 64983,
							morph: "ADV",
							lemma: "τότε",
						},
					],
				},
				{
					englishWords: "they returned",
					greekWords: [
						{
							text: "they returned",
							strongs: "G5290",
							OGNTsort: 64984,
							morph: "V-AAI-3P",
							lemma: "ὑποστρέφω",
						},
					],
				},
				{
					englishWords: "to",
					greekWords: [
						{
							text: "to",
							strongs: "G1519",
							OGNTsort: 64985,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "Jerusalem",
					greekWords: [
						{
							text: "Jerusalem",
							strongs: "G2419",
							OGNTsort: 64986,
							morph: "N-ASF-L",
							lemma: "Ἱερουσαλήμ",
						},
					],
				},
				{
					englishWords: "from",
					greekWords: [
						{
							text: "from",
							strongs: "G575",
							OGNTsort: 64987,
							morph: "PREP",
							lemma: "ἀπό",
						},
					],
				},
				{
					englishWords: "the mountain",
					greekWords: [
						{
							text: "the mountain",
							strongs: "G3735",
							OGNTsort: 64988,
							morph: "N-GSN",
							lemma: "ὄρος",
						},
					],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G3588",
							OGNTsort: 64989,
							morph: "T-GSN",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "is called",
					greekWords: [
						{
							text: "is called",
							strongs: "G2564",
							OGNTsort: 64990,
							morph: "V-PPP-GSN",
							lemma: "καλέω",
						},
					],
				},
				{
					englishWords: "Olives,",
					greekWords: [
						{
							text: "Olives,",
							strongs: "G1638",
							OGNTsort: 64991,
							morph: "N-GSM-L",
							lemma: "ἐλαιών",
						},
					],
				},
				{
					englishWords: "which",
					greekWords: [
						{
							text: "which",
							strongs: "G3739",
							OGNTsort: 64992,
							morph: "R-NSN",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "is",
					greekWords: [
						{
							text: "is",
							strongs: "G1510",
							OGNTsort: 64993,
							morph: "V-PAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "near to",
					greekWords: [
						{
							text: "near to",
							strongs: "G1451",
							OGNTsort: 64994,
							morph: "PREP",
							lemma: "ἐγγύς",
						},
					],
				},
				{
					englishWords: "Jerusalem,",
					greekWords: [
						{
							text: "Jerusalem,",
							strongs: "G2419",
							OGNTsort: 64995,
							morph: "N-GSF-L",
							lemma: "Ἱερουσαλήμ",
						},
					],
				},
				{
					englishWords: "a Sabbath day's",
					greekWords: [
						{
							text: "a Sabbath day's",
							strongs: "G4521",
							OGNTsort: 64996,
							morph: "N-GSN",
							lemma: "σάββατον",
						},
					],
				},
				{
					englishWords: "journey.",
					greekWords: [
						{
							text: "journey.",
							strongs: "G3598",
							OGNTsort: 64998,
							morph: "N-ASF",
							lemma: "ὁδός",
						},
					],
				},
			],
		},
		{
			verseNum: 13,
			verseWords: [
				{
					englishWords: "When",
					greekWords: [
						{
							text: "When",
							strongs: "G3753",
							OGNTsort: 65000,
							morph: "CONJ",
							lemma: "ὅτε",
						},
					],
				},
				{
					englishWords: "they arrived,",
					greekWords: [
						{
							text: "they arrived,",
							strongs: "G1525",
							OGNTsort: 65001,
							morph: "V-2AAI-3P",
							lemma: "εἰσέρχομαι",
						},
					],
				},
				{
					englishWords: "they went up",
					greekWords: [
						{
							text: "they went up",
							strongs: "G305",
							OGNTsort: 65005,
							morph: "V-2AAI-3P",
							lemma: "ἀναβαίνω",
						},
					],
				},
				{
					englishWords: "into",
					greekWords: [
						{
							text: "into",
							strongs: "G1519",
							OGNTsort: 65002,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 65003,
							morph: "T-ASN",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "upper chamber,",
					greekWords: [
						{
							text: "upper chamber,",
							strongs: "G5253",
							OGNTsort: 65004,
							morph: "N-ASN",
							lemma: "ὑπερῷον",
						},
					],
				},
				{
					englishWords: "where",
					greekWords: [
						{
							text: "where",
							strongs: "G3757",
							OGNTsort: 65006,
							morph: "ADV",
							lemma: "οὗ",
						},
					],
				},
				{
					englishWords: "they were",
					greekWords: [
						{
							text: "they were",
							strongs: "G1510",
							OGNTsort: 65007,
							morph: "V-IAI-3P",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "staying.",
					greekWords: [
						{
							text: "staying.",
							strongs: "G2650",
							OGNTsort: 65008,
							morph: "V-PAP-NPM",
							lemma: "καταμένω",
						},
					],
				},
				{
					englishWords: "They",
					greekWords: [
						{
							text: "They",
							strongs: "G3588",
							OGNTsort: 65009,
							morph: "T-NSM",
							lemma: "ὁ",
						},
					],
				},
				{ englishWords: "were" },
				{
					englishWords: "Peter,",
					greekWords: [
						{
							text: "Peter,",
							strongs: "G4074",
							OGNTsort: 65011,
							morph: "N-NSM-P",
							lemma: "Πέτρος",
						},
					],
				},
				{
					englishWords: "John,",
					greekWords: [
						{
							text: "John,",
							strongs: "G2491",
							OGNTsort: 65013,
							morph: "N-NSM-P",
							lemma: "Ἰωάννης",
						},
					],
				},
				{
					englishWords: "James,",
					greekWords: [
						{
							text: "James,",
							strongs: "G2385",
							OGNTsort: 65015,
							morph: "N-NSM-P",
							lemma: "Ἰάκωβος",
						},
					],
				},
				{
					englishWords: "Andrew,",
					greekWords: [
						{
							text: "Andrew,",
							strongs: "G406",
							OGNTsort: 65017,
							morph: "N-NSM-P",
							lemma: "Ἀνδρέας",
						},
					],
				},
				{
					englishWords: "Philip,",
					greekWords: [
						{
							text: "Philip,",
							strongs: "G5376",
							OGNTsort: 65018,
							morph: "N-NSM-P",
							lemma: "Φίλιππος",
						},
					],
				},
				{
					englishWords: "Thomas,",
					greekWords: [
						{
							text: "Thomas,",
							strongs: "G2381",
							OGNTsort: 65020,
							morph: "N-NSM-P",
							lemma: "Θωμᾶς",
						},
					],
				},
				{
					englishWords: "Bartholomew,",
					greekWords: [
						{
							text: "Bartholomew,",
							strongs: "G918",
							OGNTsort: 65021,
							morph: "N-NSM-P",
							lemma: "Βαρθολομαῖος",
						},
					],
				},
				{
					englishWords: "Matthew,",
					greekWords: [
						{
							text: "Matthew,",
							strongs: "G3156",
							OGNTsort: 65023,
							morph: "N-NSM-P",
							lemma: "Ματθαῖος",
						},
					],
				},
				{
					englishWords: "James",
					greekWords: [
						{
							text: "James",
							strongs: "G2385",
							OGNTsort: 65024,
							morph: "N-NSM-P",
							lemma: "Ἰάκωβος",
						},
					],
				},
				{ englishWords: "son" },
				{
					englishWords: "of Alphaeus,",
					greekWords: [
						{
							text: "of Alphaeus,",
							strongs: "G256",
							OGNTsort: 65025,
							morph: "N-GSM-P",
							lemma: "Ἀλφαῖος",
						},
					],
				},
				{
					englishWords: "Simon",
					greekWords: [
						{
							text: "Simon",
							strongs: "G4613",
							OGNTsort: 65027,
							morph: "N-NSM-P",
							lemma: "Σίμων",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 65028,
							morph: "T-NSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "Zealot,",
					greekWords: [
						{
							text: "Zealot,",
							strongs: "G2207",
							OGNTsort: 65029,
							morph: "N-NSM-T",
							lemma: "ζηλωτής",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 65030,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "Judas",
					greekWords: [
						{
							text: "Judas",
							strongs: "G2455",
							OGNTsort: 65031,
							morph: "N-NSM-P",
							lemma: "Ἰούδας",
						},
					],
				},
				{ englishWords: "son" },
				{
					englishWords: "of James.",
					greekWords: [
						{
							text: "of James.",
							strongs: "G2385",
							OGNTsort: 65032,
							morph: "N-GSM-P",
							lemma: "Ἰάκωβος",
						},
					],
				},
			],
		},
		{
			verseNum: 14,
			verseWords: [
				{
					englishWords: "They",
					greekWords: [
						{
							text: "They",
							strongs: "G3778",
							OGNTsort: 65033,
							morph: "D-NPM",
							lemma: "οὗτος",
						},
					],
				},
				{
					englishWords: "all",
					greekWords: [
						{
							text: "all",
							strongs: "G3956",
							OGNTsort: 65034,
							morph: "A-NPM",
							lemma: "πᾶς",
						},
					],
				},
				{
					englishWords: "were",
					greekWords: [
						{
							text: "were",
							strongs: "G1510",
							OGNTsort: 65035,
							morph: "V-IAI-3P",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "devoted",
					greekWords: [
						{
							text: "devoted",
							strongs: "G4342",
							OGNTsort: 65036,
							morph: "V-PAP-NPM",
							lemma: "προσκαρτερέω",
						},
					],
				},
				{
					englishWords: "with one purpose",
					greekWords: [
						{
							text: "with one purpose",
							strongs: "G3661",
							OGNTsort: 65037,
							morph: "ADV",
							lemma: "ὁμοθυμαδόν",
						},
					],
				},
				{
					englishWords: "to prayer,",
					greekWords: [
						{
							text: "to prayer,",
							strongs: "G4335",
							OGNTsort: 65039,
							morph: "N-DSF",
							lemma: "προσευχή",
						},
					],
				},
				{
					englishWords: "together with",
					greekWords: [
						{
							text: "together with",
							strongs: "G4862",
							OGNTsort: 65040,
							morph: "PREP",
							lemma: "σύν",
						},
					],
				},
				{
					englishWords: "the women,",
					greekWords: [
						{
							text: "the women,",
							strongs: "G1135",
							OGNTsort: 65041,
							morph: "N-DPF",
							lemma: "γυνή",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 65042,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "Mary",
					greekWords: [
						{
							text: "Mary",
							strongs: "G3137",
							OGNTsort: 65043,
							morph: "N-DSF-P",
							lemma: "Μαρία",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 65044,
							morph: "T-DSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "mother",
					greekWords: [
						{
							text: "mother",
							strongs: "G3384",
							OGNTsort: 65045,
							morph: "N-DSF",
							lemma: "μήτηρ",
						},
					],
				},
				{
					englishWords: "of Jesus,",
					greekWords: [
						{
							text: "of Jesus,",
							strongs: "G2424",
							OGNTsort: 65047,
							morph: "N-GSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 65048,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "his",
					greekWords: [
						{
							text: "his",
							strongs: "G846",
							OGNTsort: 65051,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "brothers.",
					greekWords: [
						{
							text: "brothers.",
							strongs: "G80",
							OGNTsort: 65050,
							morph: "N-DPM",
							lemma: "ἀδελφός",
						},
					],
				},
			],
		},
		{
			verseNum: 15,
			verseWords: [
				{
					englishWords: "In",
					greekWords: [
						{
							text: "In",
							strongs: "G1722",
							OGNTsort: 65053,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "those",
					greekWords: [
						{
							text: "those",
							strongs: "G3588",
							OGNTsort: 65054,
							morph: "T-DPF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "days",
					greekWords: [
						{
							text: "days",
							strongs: "G2250",
							OGNTsort: 65055,
							morph: "N-DPF",
							lemma: "ἡμέρα",
						},
					],
				},
				{
					englishWords: "Peter",
					greekWords: [
						{
							text: "Peter",
							strongs: "G4074",
							OGNTsort: 65058,
							morph: "N-NSM-P",
							lemma: "Πέτρος",
						},
					],
				},
				{
					englishWords: "stood up",
					greekWords: [
						{
							text: "stood up",
							strongs: "G450",
							OGNTsort: 65057,
							morph: "V-2AAP-NSM",
							lemma: "ἀνίστημι",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 65059,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "the midst",
					greekWords: [
						{
							text: "the midst",
							strongs: "G3319",
							OGNTsort: 65060,
							morph: "A-DSN",
							lemma: "μέσος",
						},
					],
				},
				{
					englishWords: "of the",
					greekWords: [
						{
							text: "of the",
							strongs: "G3588",
							OGNTsort: 65061,
							morph: "T-GPM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "brothers,",
					greekWords: [
						{
							text: "brothers,",
							strongs: "G80",
							OGNTsort: 65062,
							morph: "N-GPM",
							lemma: "ἀδελφός",
						},
					],
				},
				{
					englishWords: "about",
					greekWords: [
						{
							text: "about",
							strongs: "G5616",
							OGNTsort: 65071,
							morph: "CONJ",
							lemma: "ὡσεί",
						},
					],
				},
				{
					englishWords: 120,
					phraseWords: [
						{
							text: "√",
							strongs: "G1501",
							OGNTsort: 65073,
							phraseWords: 120,
							morph: "A-NPM-NUI",
							lemma: "εἴκοσι",
						},
						{
							text: "√",
							strongs: "G1540",
							OGNTsort: 65072,
							phraseWords: 120,
							morph: "A-NPM-NUI",
							lemma: "ἑκατόν",
						},
					],
					subWords: [],
				},
				{
					englishWords: "names,",
					greekWords: [
						{
							text: "names,",
							strongs: "G3686",
							OGNTsort: 65067,
							morph: "N-GPN",
							lemma: "ὄνομα",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "said,",
					greekWords: [
						{
							text: "said,",
							strongs: "G2036",
							OGNTsort: 65063,
							morph: "V-2AAI-3S",
							lemma: "ἔπω, ἐρῶ, εἶπον",
						},
					],
				},
			],
		},
		{
			verseNum: 16,
			verseWords: [
				{
					englishWords: '"Brothers,',
					greekWords: [
						{
							text: '"Brothers,',
							strongs: "G80",
							OGNTsort: 65075,
							morph: "N-VPM",
							lemma: "ἀδελφός",
						},
					],
				},
				{
					englishWords: "it was necessary",
					greekWords: [
						{
							text: "it was necessary",
							strongs: "G1163",
							OGNTsort: 65076,
							morph: "V-IAI-3S",
							lemma: "δεῖ",
						},
					],
				},
				{ englishWords: "that" },
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 65078,
							morph: "T-ASF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "scripture",
					greekWords: [
						{
							text: "scripture",
							strongs: "G1124",
							OGNTsort: 65079,
							morph: "N-ASF",
							lemma: "γραφή",
						},
					],
				},
				{
					englishWords: "should be fulfilled,",
					greekWords: [
						{
							text: "should be fulfilled,",
							strongs: "G4137",
							OGNTsort: 65077,
							morph: "V-APN",
							lemma: "πληρόω",
						},
					],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G3739",
							OGNTsort: 65080,
							morph: "R-ASF",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 65082,
							morph: "T-NSN",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "Holy",
					greekWords: [
						{
							text: "Holy",
							strongs: "G40",
							OGNTsort: 65085,
							morph: "A-NSN",
							lemma: "ἅγιος",
						},
					],
				},
				{
					englishWords: "Spirit",
					greekWords: [
						{
							text: "Spirit",
							strongs: "G4151",
							OGNTsort: 65083,
							morph: "N-NSN",
							lemma: "πνεῦμα",
						},
					],
				},
				{
					englishWords: "spoke before",
					greekWords: [
						{
							text: "spoke before",
							strongs: "G4277",
							OGNTsort: 65081,
							morph: "V-2AAI-3S",
							lemma: "προέπω",
						},
					],
				},
				{
					englishWords: "by",
					greekWords: [
						{
							text: "by",
							strongs: "G1223",
							OGNTsort: 65086,
							morph: "PREP",
							lemma: "διά",
						},
					],
				},
				{
					englishWords: "the mouth",
					greekWords: [
						{
							text: "the mouth",
							strongs: "G4750",
							OGNTsort: 65087,
							morph: "N-GSN",
							lemma: "στόμα",
						},
					],
				},
				{
					englishWords: "of David",
					greekWords: [
						{
							text: "of David",
							strongs: "G1138",
							OGNTsort: 65088,
							morph: "N-GSM-P",
							lemma: "Δαυείδ, Δαυίδ, Δαβίδ",
						},
					],
				},
				{
					englishWords: "concerning",
					greekWords: [
						{
							text: "concerning",
							strongs: "G4012",
							OGNTsort: 65089,
							morph: "PREP",
							lemma: "περί",
						},
					],
				},
				{
					englishWords: "Judas,",
					greekWords: [
						{
							text: "Judas,",
							strongs: "G2455",
							OGNTsort: 65090,
							morph: "N-GSM-P",
							lemma: "Ἰούδας",
						},
					],
				},
				{
					englishWords: "who",
					greekWords: [
						{
							text: "who",
							strongs: "G3588",
							OGNTsort: 65091,
							morph: "T-GSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "guided",
					phraseWords: [
						{
							text: "√",
							strongs: "G1096",
							OGNTsort: 65092,
							phraseWords: "guided",
							morph: "V-2ADP-GSM",
							lemma: "γίνομαι",
						},
						{
							text: "√",
							strongs: "G3595",
							OGNTsort: 65093,
							phraseWords: "guided",
							morph: "N-GSM",
							lemma: "ὁδηγός",
						},
					],
					subWords: [],
				},
				{
					englishWords: "the ones who",
					greekWords: [
						{
							text: "the ones who",
							strongs: "G3588",
							OGNTsort: 65094,
							morph: "T-DPM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "arrested",
					greekWords: [
						{
							text: "arrested",
							strongs: "G4815",
							OGNTsort: 65095,
							morph: "V-2AAP-DPM",
							lemma: "συλλαμβάνω",
						},
					],
				},
				{
					englishWords: "Jesus.",
					greekWords: [
						{
							text: "Jesus.",
							strongs: "G2424",
							OGNTsort: 65096,
							morph: "N-ASM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
			],
		},
		{
			verseNum: 17,
			verseWords: [
				{
					englishWords: "For",
					greekWords: [
						{
							text: "For",
							strongs: "G3754",
							OGNTsort: 65097,
							morph: "CONJ",
							lemma: "ὅτι",
						},
					],
				},
				{
					englishWords: "he was",
					greekWords: [
						{
							text: "he was",
							strongs: "G1510",
							OGNTsort: 65099,
							morph: "V-IAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "one",
					greekWords: [
						{
							text: "one",
							strongs: "G2674",
							OGNTsort: 65098,
							morph: "V-RPP-NSM",
							lemma: "καταριθμέω",
						},
					],
				},
				{
					englishWords: "of",
					greekWords: [
						{
							text: "of",
							strongs: "G1722",
							OGNTsort: 65100,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "us",
					greekWords: [
						{
							text: "us",
							strongs: "G1473",
							OGNTsort: 65101,
							morph: "P-1DP",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 65102,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "received",
					greekWords: [
						{
							text: "received",
							strongs: "G2975",
							OGNTsort: 65103,
							morph: "V-2AAI-3S",
							lemma: "λαγχάνω",
						},
					],
				},
				{
					englishWords: "a share",
					greekWords: [
						{
							text: "a share",
							strongs: "G2819",
							OGNTsort: 65105,
							morph: "N-ASM",
							lemma: "κλῆρος",
						},
					],
				},
				{
					englishWords: "of this",
					greekWords: [
						{
							text: "of this",
							strongs: "G3778",
							OGNTsort: 65108,
							morph: "D-GSF",
							lemma: "οὗτος",
						},
					],
				},
				{
					englishWords: 'ministry."',
					greekWords: [
						{
							text: 'ministry."',
							strongs: "G1248",
							OGNTsort: 65107,
							morph: "N-GSF",
							lemma: "διακονία",
						},
					],
				},
			],
		},
		{
			verseNum: 18,
			verseWords: [
				{
					englishWords: "(Now",
					greekWords: [
						{
							text: "(Now",
							strongs: "G3767",
							OGNTsort: 65111,
							morph: "CONJ",
							lemma: "οὖν",
						},
					],
				},
				{
					englishWords: "this man",
					greekWords: [
						{
							text: "this man",
							strongs: "G3778",
							OGNTsort: 65109,
							morph: "D-NSM",
							lemma: "οὗτος",
						},
					],
				},
				{
					englishWords: "bought",
					greekWords: [
						{
							text: "bought",
							strongs: "G2932",
							OGNTsort: 65112,
							morph: "V-ADI-3S",
							lemma: "κτάομαι",
						},
					],
				},
				{
					englishWords: "a field",
					greekWords: [
						{
							text: "a field",
							strongs: "G5564",
							OGNTsort: 65113,
							morph: "N-ASN",
							lemma: "χωρίον",
						},
					],
				},
				{
					englishWords: "with",
					greekWords: [
						{
							text: "with",
							strongs: "G1537",
							OGNTsort: 65114,
							morph: "PREP",
							lemma: "ἐκ",
						},
					],
				},
				{
					englishWords: "the earnings",
					greekWords: [
						{
							text: "the earnings",
							strongs: "G3408",
							OGNTsort: 65115,
							morph: "N-GSM",
							lemma: "μισθός",
						},
					],
				},
				{ englishWords: "he received" },
				{
					englishWords: "for his",
					greekWords: [
						{
							text: "for his",
							strongs: "G3588",
							OGNTsort: 65116,
							morph: "T-GSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "wickedness,",
					greekWords: [
						{
							text: "wickedness,",
							strongs: "G93",
							OGNTsort: 65117,
							morph: "N-GSF",
							lemma: "ἀδικία",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 65118,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "there",
					greekWords: [
						{
							text: "there",
							strongs: "G3319",
							OGNTsort: 65122,
							morph: "A-NSM",
							lemma: "μέσος",
						},
					],
				},
				{
					englishWords: "he fell",
					greekWords: [
						{
							text: "he fell",
							strongs: "G1096",
							OGNTsort: 65120,
							morph: "V-2ADP-NSM",
							lemma: "γίνομαι",
						},
					],
				},
				{
					englishWords: "headfirst,",
					greekWords: [
						{
							text: "headfirst,",
							strongs: "G4248",
							OGNTsort: 65119,
							morph: "A-NSM",
							lemma: "πρηνής",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 65123,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{ englishWords: "his body" },
				{
					englishWords: "burst open,",
					greekWords: [
						{
							text: "burst open,",
							strongs: "G2997",
							OGNTsort: 65121,
							morph: "V-AAI-3S",
							lemma: "λάσχω",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "all",
					greekWords: [
						{
							text: "all",
							strongs: "G3956",
							OGNTsort: 65125,
							morph: "A-NPN",
							lemma: "πᾶς",
						},
					],
				},
				{
					englishWords: "his",
					greekWords: [
						{
							text: "his",
							strongs: "G846",
							OGNTsort: 65128,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "intestines",
					greekWords: [
						{
							text: "intestines",
							strongs: "G4698",
							OGNTsort: 65127,
							morph: "N-NPN",
							lemma: "σπλάγχνον",
						},
					],
				},
				{
					englishWords: "poured out.",
					greekWords: [
						{
							text: "poured out.",
							strongs: "G1632",
							OGNTsort: 65124,
							morph: "V-API-3S",
							lemma: "ἐκχέω",
						},
					],
				},
			],
		},
		{
			verseNum: 19,
			verseWords: [
				{
					englishWords: "All",
					greekWords: [
						{
							text: "All",
							strongs: "G3956",
							OGNTsort: 65132,
							morph: "A-DPM",
							lemma: "πᾶς",
						},
					],
				},
				{
					englishWords: "those",
					greekWords: [
						{
							text: "those",
							strongs: "G3588",
							OGNTsort: 65133,
							morph: "T-DPM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "living",
					greekWords: [
						{
							text: "living",
							strongs: "G2730",
							OGNTsort: 65134,
							morph: "V-PAP-DPM",
							lemma: "κατοικέω",
						},
					],
				},
				{
					englishWords: "in Jerusalem",
					greekWords: [
						{
							text: "in Jerusalem",
							strongs: "G2419",
							OGNTsort: 65135,
							morph: "N-ASF-L",
							lemma: "Ἱερουσαλήμ",
						},
					],
				},
				{
					englishWords: "heard",
					phraseWords: [
						{
							text: "√",
							strongs: "G1096",
							OGNTsort: 65131,
							phraseWords: "heard",
							morph: "V-2ADI-3S",
							lemma: "γίνομαι",
						},
						{
							text: "√",
							strongs: "G1110",
							OGNTsort: 65130,
							phraseWords: "heard",
							morph: "A-NSN",
							lemma: "γνωστός, γνώριμος",
						},
					],
					subWords: [],
				},
				{ englishWords: "about this," },
				{
					englishWords: "so",
					greekWords: [
						{
							text: "so",
							strongs: "G5620",
							OGNTsort: 65136,
							morph: "CONJ",
							lemma: "ὥστε",
						},
					],
				},
				{
					englishWords: "they called",
					greekWords: [
						{
							text: "they called",
							strongs: "G2564",
							OGNTsort: 65137,
							morph: "V-APN",
							lemma: "καλέω",
						},
					],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G1565",
							OGNTsort: 65140,
							morph: "D-ASN",
							lemma: "ἐκεῖνος",
						},
					],
				},
				{
					englishWords: "field",
					greekWords: [
						{
							text: "field",
							strongs: "G5564",
							OGNTsort: 65139,
							morph: "N-ASN",
							lemma: "χωρίον",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G3588",
							OGNTsort: 65141,
							morph: "T-DSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "their",
					greekWords: [
						{
							text: "their",
							strongs: "G846",
							OGNTsort: 65144,
							morph: "P-GPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "language",
					greekWords: [
						{
							text: "language",
							strongs: "G1258",
							OGNTsort: 65143,
							morph: "N-DSF",
							lemma: "διάλεκτος",
						},
					],
				},
				{
					englishWords: '"Akeldama,"',
					greekWords: [
						{
							text: '"Akeldama,"',
							strongs: "G184",
							OGNTsort: 65145,
							morph: "N-ASN-L",
							lemma: "Ἀκελδαμά",
						},
					],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G3778",
							OGNTsort: 65146,
							morph: "D-NSN",
							lemma: "οὗτος",
						},
					],
				},
				{
					englishWords: "is,",
					greekWords: [
						{
							text: "is,",
							strongs: "G1510",
							OGNTsort: 65147,
							morph: "V-PAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: '"Field',
					greekWords: [
						{
							text: '"Field',
							strongs: "G5564",
							OGNTsort: 65148,
							morph: "N-ASN",
							lemma: "χωρίον",
						},
					],
				},
				{
					englishWords: 'of Blood.")',
					greekWords: [
						{
							text: 'of Blood.")',
							strongs: "G129",
							OGNTsort: 65149,
							morph: "N-GSN",
							lemma: "αἷμα",
						},
					],
				},
			],
		},
		{
			verseNum: 20,
			verseWords: [
				{
					englishWords: '"For',
					greekWords: [
						{
							text: '"For',
							strongs: "G1063",
							OGNTsort: 65151,
							morph: "CONJ",
							lemma: "γάρ",
						},
					],
				},
				{
					englishWords: "it is written",
					greekWords: [
						{
							text: "it is written",
							strongs: "G1125",
							OGNTsort: 65150,
							morph: "V-RPI-3S",
							lemma: "γράφω",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 65152,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "the Book",
					greekWords: [
						{
							text: "the Book",
							strongs: "G976",
							OGNTsort: 65153,
							morph: "N-DSF",
							lemma: "βίβλος",
						},
					],
				},
				{
					englishWords: "of Psalms,",
					greekWords: [
						{
							text: "of Psalms,",
							strongs: "G5568",
							OGNTsort: 65154,
							morph: "N-GPM",
							lemma: "ψαλμός",
						},
					],
				},
				{
					englishWords: "'Let his field be made",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "his",
								strongs: "G846",
								OGNTsort: 65158,
								morph: "P-GSM",
								lemma: "αὐτός",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "field",
								strongs: "G1886",
								OGNTsort: 65157,
								morph: "N-NSF",
								lemma: "ἔπαυλις",
							},
						},
						{
							word: {
								text: "'Let his field be made",
								strongs: "G1096",
								OGNTsort: 65155,
								morph: "V-AOM-3S",
								lemma: "γίνομαι",
							},
						},
					],
				},
				{
					englishWords: "desolate,",
					greekWords: [
						{
							text: "desolate,",
							strongs: "G2048",
							OGNTsort: 65159,
							morph: "A-NSF",
							lemma: "ἔρημος",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 65160,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "do not let",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "not",
								strongs: "G3361",
								OGNTsort: 65161,
								morph: "PRT-N",
								lemma: "μή",
							},
						},
						{
							word: {
								text: "do not let",
								strongs: "G1510",
								OGNTsort: 65162,
								morph: "V-PAM-3S",
								lemma: "εἰμί",
							},
						},
					],
				},
				{ englishWords: "even one person" },
				{
					englishWords: "live",
					greekWords: [
						{
							text: "live",
							strongs: "G2730",
							OGNTsort: 65164,
							morph: "V-PAP-NSM",
							lemma: "κατοικέω",
						},
					],
				},
				{
					englishWords: "there';",
					greekWords: [
						{
							text: "there';",
							strongs: "G846",
							OGNTsort: 65166,
							morph: "P-DSF",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "'Let someone else take",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "someone else",
								strongs: "G2087",
								OGNTsort: 65172,
								morph: "A-NSM",
								lemma: "ἕτερος",
							},
						},
						{
							word: {
								text: "'Let someone else take",
								strongs: "G2983",
								OGNTsort: 65171,
								morph: "V-2AAM-3S",
								lemma: "λαμβάνω",
							},
						},
					],
				},
				{
					englishWords: "his",
					greekWords: [
						{
							text: "his",
							strongs: "G846",
							OGNTsort: 65170,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "position of leadership.'",
					greekWords: [
						{
							text: "position of leadership.'",
							strongs: "G1984",
							OGNTsort: 65169,
							morph: "N-ASF",
							lemma: "ἐπισκοπή",
						},
					],
				},
			],
		},
		{
			verseNum: 21,
			verseWords: [
				{
					englishWords: "It is necessary,",
					greekWords: [
						{
							text: "It is necessary,",
							strongs: "G1210",
							OGNTsort: 65173,
							morph: "V-PAI-3S",
							lemma: "δέω",
						},
					],
				},
				{
					englishWords: "therefore,",
					greekWords: [
						{
							text: "therefore,",
							strongs: "G3767",
							OGNTsort: 65174,
							morph: "CONJ",
							lemma: "οὖν",
						},
					],
				},
				{ englishWords: "that one" },
				{
					englishWords: "of the",
					greekWords: [
						{
							text: "of the",
							strongs: "G3588",
							OGNTsort: 65175,
							morph: "T-GPM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "men",
					greekWords: [
						{
							text: "men",
							strongs: "G435",
							OGNTsort: 65178,
							morph: "N-GPM",
							lemma: "ἀνήρ",
						},
					],
				},
				{
					englishWords: "who accompanied",
					greekWords: [
						{
							text: "who accompanied",
							strongs: "G4905",
							OGNTsort: 65176,
							morph: "V-2AAP-GPM",
							lemma: "συνέρχομαι",
						},
					],
				},
				{
					englishWords: "us",
					greekWords: [
						{
							text: "us",
							strongs: "G1473",
							OGNTsort: 65177,
							morph: "P-1DP",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "all",
					greekWords: [
						{
							text: "all",
							strongs: "G3956",
							OGNTsort: 65180,
							morph: "A-DSM",
							lemma: "πᾶς",
						},
					],
				},
				{
					englishWords: "the time",
					greekWords: [
						{
							text: "the time",
							strongs: "G5550",
							OGNTsort: 65181,
							morph: "N-DSM",
							lemma: "χρόνος",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 65188,
							morph: "T-NSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "Lord",
					greekWords: [
						{
							text: "Lord",
							strongs: "G2962",
							OGNTsort: 65189,
							morph: "N-NSM",
							lemma: "κύριος",
						},
					],
				},
				{
					englishWords: "Jesus",
					greekWords: [
						{
							text: "Jesus",
							strongs: "G2424",
							OGNTsort: 65190,
							morph: "N-NSM-P",
							lemma: "Ἰησοῦς",
						},
					],
				},
				{
					englishWords: "went in",
					greekWords: [
						{
							text: "went in",
							strongs: "G1525",
							OGNTsort: 65183,
							morph: "V-2AAI-3S",
							lemma: "εἰσέρχομαι",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 65184,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "out",
					greekWords: [
						{
							text: "out",
							strongs: "G1831",
							OGNTsort: 65185,
							morph: "V-2AAI-3S",
							lemma: "ἐξέρχομαι",
						},
					],
				},
				{
					englishWords: "among",
					greekWords: [
						{
							text: "among",
							strongs: "G1909",
							OGNTsort: 65186,
							morph: "PREP",
							lemma: "ἐπί",
						},
					],
				},
				{
					englishWords: "us,",
					greekWords: [
						{
							text: "us,",
							strongs: "G1473",
							OGNTsort: 65187,
							morph: "P-1AP",
							lemma: "ἐγώ",
						},
					],
				},
			],
		},
		{
			verseNum: 22,
			verseWords: [
				{
					englishWords: "beginning",
					greekWords: [
						{
							text: "beginning",
							strongs: "G757",
							OGNTsort: 65191,
							morph: "V-AMP-NSM",
							lemma: "ἄρχω",
						},
					],
				},
				{
					englishWords: "from",
					greekWords: [
						{
							text: "from",
							strongs: "G575",
							OGNTsort: 65192,
							morph: "PREP",
							lemma: "ἀπό",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 65193,
							morph: "T-GSN",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "baptism",
					greekWords: [
						{
							text: "baptism",
							strongs: "G908",
							OGNTsort: 65194,
							morph: "N-GSN",
							lemma: "βάπτισμα",
						},
					],
				},
				{
					englishWords: "of John",
					greekWords: [
						{
							text: "of John",
							strongs: "G2491",
							OGNTsort: 65195,
							morph: "N-GSM-P",
							lemma: "Ἰωάννης",
						},
					],
				},
				{
					englishWords: "to",
					greekWords: [
						{
							text: "to",
							strongs: "G2193",
							OGNTsort: 65196,
							morph: "PREP",
							lemma: "ἕως",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 65197,
							morph: "T-GSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "day",
					greekWords: [
						{
							text: "day",
							strongs: "G2250",
							OGNTsort: 65198,
							morph: "N-GSF",
							lemma: "ἡμέρα",
						},
					],
				},
				{
					englishWords: "that",
					greekWords: [
						{
							text: "that",
							strongs: "G3739",
							OGNTsort: 65199,
							morph: "R-GSF",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "he was taken up",
					greekWords: [
						{
							text: "he was taken up",
							strongs: "G353",
							OGNTsort: 65200,
							morph: "V-API-3S",
							lemma: "ἀναλαμβάνω",
						},
					],
				},
				{
					englishWords: "from",
					greekWords: [
						{
							text: "from",
							strongs: "G575",
							OGNTsort: 65201,
							morph: "PREP",
							lemma: "ἀπό",
						},
					],
				},
				{
					englishWords: "us,",
					greekWords: [
						{
							text: "us,",
							strongs: "G1473",
							OGNTsort: 65202,
							morph: "P-1GP",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "become",
					greekWords: [
						{
							text: "become",
							strongs: "G1096",
							OGNTsort: 65209,
							morph: "V-2ADN",
							lemma: "γίνομαι",
						},
					],
				},
				{
					englishWords: "a witness",
					greekWords: [
						{
							text: "a witness",
							strongs: "G3144",
							OGNTsort: 65203,
							morph: "N-ASM",
							lemma: "μάρτυς",
						},
					],
				},
				{
					englishWords: "with",
					greekWords: [
						{
							text: "with",
							strongs: "G4862",
							OGNTsort: 65207,
							morph: "PREP",
							lemma: "σύν",
						},
					],
				},
				{
					englishWords: "us",
					greekWords: [
						{
							text: "us",
							strongs: "G1473",
							OGNTsort: 65208,
							morph: "P-1DP",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: 'of his resurrection."',
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "his",
								strongs: "G846",
								OGNTsort: 65206,
								morph: "P-GSM",
								lemma: "αὐτός",
							},
						},
						{
							word: {
								text: 'of his resurrection."',
								strongs: "G386",
								OGNTsort: 65205,
								morph: "N-GSF",
								lemma: "ἀνάστασις",
							},
						},
					],
				},
			],
		},
		{
			verseNum: 23,
			verseWords: [
				{
					englishWords: "They put forward",
					greekWords: [
						{
							text: "They put forward",
							strongs: "G2476",
							OGNTsort: 65213,
							morph: "V-2AAI-3P",
							lemma: "ἵστημι",
						},
					],
				},
				{
					englishWords: "two men,",
					greekWords: [
						{
							text: "two men,",
							strongs: "G1417",
							OGNTsort: 65214,
							morph: "A-APM-NUI",
							lemma: "δύο",
						},
					],
				},
				{
					englishWords: "Joseph",
					greekWords: [
						{
							text: "Joseph",
							strongs: "G2501",
							OGNTsort: 65215,
							morph: "N-ASM-P",
							lemma: "Ἰωσήφ",
						},
					],
				},
				{
					englishWords: "called",
					greekWords: [
						{
							text: "called",
							strongs: "G2564",
							OGNTsort: 65217,
							morph: "V-PPP-ASM",
							lemma: "καλέω",
						},
					],
				},
				{
					englishWords: "Barsabbas,",
					greekWords: [
						{
							text: "Barsabbas,",
							strongs: "G923",
							OGNTsort: 65218,
							morph: "N-ASM-P",
							lemma: "Βαρσαβᾶς",
						},
					],
				},
				{
					englishWords: "who",
					greekWords: [
						{
							text: "who",
							strongs: "G3739",
							OGNTsort: 65219,
							morph: "R-NSM",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "was also called",
					subWords: [
						{ subIdx: "[2]", word: { text: "also" } },
						{
							word: {
								text: "was also called",
								strongs: "G1941",
								OGNTsort: 65220,
								morph: "V-API-3S",
								lemma: "ἐπικαλέω",
							},
						},
					],
				},
				{
					englishWords: "Justus,",
					greekWords: [
						{
							text: "Justus,",
							strongs: "G2459",
							OGNTsort: 65221,
							morph: "N-NSM-P",
							lemma: "Ἰοῦστος",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 65222,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "Matthias.",
					greekWords: [
						{
							text: "Matthias.",
							strongs: "G3159",
							OGNTsort: 65223,
							morph: "N-ASM-P",
							lemma: "Ματθίας, Μαθθίας",
						},
					],
				},
			],
		},
		{
			verseNum: 24,
			verseWords: [
				{
					englishWords: "They prayed",
					greekWords: [
						{
							text: "They prayed",
							strongs: "G4336",
							OGNTsort: 65225,
							morph: "V-ADP-NPM",
							lemma: "προσεύχομαι",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "said,",
					greekWords: [
						{
							text: "said,",
							strongs: "G2036",
							OGNTsort: 65226,
							morph: "V-2AAI-3P",
							lemma: "ἔπω, ἐρῶ, εἶπον",
						},
					],
				},
				{
					englishWords: '"You,',
					greekWords: [
						{
							text: '"You,',
							strongs: "G4771",
							OGNTsort: 65227,
							morph: "P-2NS",
							lemma: "σύ",
						},
					],
				},
				{
					englishWords: "Lord,",
					greekWords: [
						{
							text: "Lord,",
							strongs: "G2962",
							OGNTsort: 65228,
							morph: "N-VSM",
							lemma: "κύριος",
						},
					],
				},
				{
					englishWords: "know the hearts",
					greekWords: [
						{
							text: "know the hearts",
							strongs: "G2589",
							OGNTsort: 65229,
							morph: "N-VSM",
							lemma: "καρδιογνώστης",
						},
					],
				},
				{
					englishWords: "of all people,",
					greekWords: [
						{
							text: "of all people,",
							strongs: "G3956",
							OGNTsort: 65230,
							morph: "A-GPM",
							lemma: "πᾶς",
						},
					],
				},
				{
					englishWords: "so reveal",
					greekWords: [
						{
							text: "so reveal",
							strongs: "G322",
							OGNTsort: 65231,
							morph: "V-AAM-2S",
							lemma: "ἀναδείκνυμι",
						},
					],
				},
				{
					englishWords: "which",
					greekWords: [
						{
							text: "which",
							strongs: "G3739",
							OGNTsort: 65232,
							morph: "R-ASM",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "of",
					greekWords: [
						{
							text: "of",
							strongs: "G1537",
							OGNTsort: 65234,
							morph: "PREP",
							lemma: "ἐκ",
						},
					],
				},
				{
					englishWords: "these",
					greekWords: [
						{
							text: "these",
							strongs: "G3778",
							OGNTsort: 65235,
							morph: "D-GPM",
							lemma: "οὗτος",
						},
					],
				},
				{
					englishWords: "two",
					greekWords: [
						{
							text: "two",
							strongs: "G1417",
							OGNTsort: 65237,
							morph: "A-GPM-NUI",
							lemma: "δύο",
						},
					],
				},
				{ englishWords: "is" },
				{
					englishWords: "the one whom",
					greekWords: [
						{
							text: "the one whom",
							strongs: "G1520",
							OGNTsort: 65238,
							morph: "A-ASM",
							lemma: "εἷς",
						},
					],
				},
				{
					englishWords: "you have chosen",
					greekWords: [
						{
							text: "you have chosen",
							strongs: "G1586",
							OGNTsort: 65233,
							morph: "V-AMI-2S",
							lemma: "ἐκλέγω",
						},
					],
				},
			],
		},
		{
			verseNum: 25,
			verseWords: [
				{
					englishWords: "to take",
					greekWords: [
						{
							text: "to take",
							strongs: "G2983",
							OGNTsort: 65239,
							morph: "V-2AAN",
							lemma: "λαμβάνω",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 65240,
							morph: "T-ASM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "place",
					greekWords: [
						{
							text: "place",
							strongs: "G5117",
							OGNTsort: 65241,
							morph: "N-ASM",
							lemma: "τόπος",
						},
					],
				},
				{
					englishWords: "in this",
					greekWords: [
						{
							text: "in this",
							strongs: "G3778",
							OGNTsort: 65244,
							morph: "D-GSF",
							lemma: "οὗτος",
						},
					],
				},
				{
					englishWords: "ministry",
					greekWords: [
						{
							text: "ministry",
							strongs: "G1248",
							OGNTsort: 65243,
							morph: "N-GSF",
							lemma: "διακονία",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 65245,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "apostleship",
					greekWords: [
						{
							text: "apostleship",
							strongs: "G651",
							OGNTsort: 65246,
							morph: "N-GSF",
							lemma: "ἀποστολή",
						},
					],
				},
				{
					englishWords: "from",
					greekWords: [
						{
							text: "from",
							strongs: "G575",
							OGNTsort: 65247,
							morph: "PREP",
							lemma: "ἀπό",
						},
					],
				},
				{
					englishWords: "which",
					greekWords: [
						{
							text: "which",
							strongs: "G3739",
							OGNTsort: 65248,
							morph: "R-GSF",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "Judas",
					greekWords: [
						{
							text: "Judas",
							strongs: "G2455",
							OGNTsort: 65250,
							morph: "N-NSM-P",
							lemma: "Ἰούδας",
						},
					],
				},
				{
					englishWords: "turned away",
					greekWords: [
						{
							text: "turned away",
							strongs: "G3845",
							OGNTsort: 65249,
							morph: "V-2AAI-3S",
							lemma: "παραβαίνω",
						},
					],
				},
				{
					englishWords: "to go",
					greekWords: [
						{
							text: "to go",
							strongs: "G4198",
							OGNTsort: 65251,
							morph: "V-AON",
							lemma: "πορεύω",
						},
					],
				},
				{
					englishWords: "to",
					greekWords: [
						{
							text: "to",
							strongs: "G1519",
							OGNTsort: 65252,
							morph: "PREP",
							lemma: "εἰς",
						},
					],
				},
				{
					englishWords: "his own",
					greekWords: [
						{
							text: "his own",
							strongs: "G2398",
							OGNTsort: 65256,
							morph: "A-ASM",
							lemma: "ἴδιος",
						},
					],
				},
				{
					englishWords: 'place."',
					greekWords: [
						{
							text: 'place."',
							strongs: "G5117",
							OGNTsort: 65254,
							morph: "N-ASM",
							lemma: "τόπος",
						},
					],
				},
			],
		},
		{
			verseNum: 26,
			verseWords: [
				{
					englishWords: "They cast",
					greekWords: [
						{
							text: "They cast",
							strongs: "G1325",
							OGNTsort: 65258,
							morph: "V-AAI-3P",
							lemma: "δίδωμι",
						},
					],
				},
				{
					englishWords: "lots",
					greekWords: [
						{
							text: "lots",
							strongs: "G2819",
							OGNTsort: 65259,
							morph: "N-APM",
							lemma: "κλῆρος",
						},
					],
				},
				{
					englishWords: "for them,",
					greekWords: [
						{
							text: "for them,",
							strongs: "G846",
							OGNTsort: 65260,
							morph: "P-DPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 65261,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 65263,
							morph: "T-NSM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "lot",
					greekWords: [
						{
							text: "lot",
							strongs: "G2819",
							OGNTsort: 65264,
							morph: "N-NSM",
							lemma: "κλῆρος",
						},
					],
				},
				{
					englishWords: "fell",
					greekWords: [
						{
							text: "fell",
							strongs: "G4098",
							OGNTsort: 65262,
							morph: "V-2AAI-3S",
							lemma: "πίπτω",
						},
					],
				},
				{
					englishWords: "to",
					greekWords: [
						{
							text: "to",
							strongs: "G1909",
							OGNTsort: 65265,
							morph: "PREP",
							lemma: "ἐπί",
						},
					],
				},
				{
					englishWords: "Matthias,",
					greekWords: [
						{
							text: "Matthias,",
							strongs: "G3159",
							OGNTsort: 65266,
							morph: "N-ASM-P",
							lemma: "Ματθίας, Μαθθίας",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 65267,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "he was numbered",
					greekWords: [
						{
							text: "he was numbered",
							strongs: "G4785",
							OGNTsort: 65268,
							morph: "V-API-3S",
							lemma: "συγκαταψηφίζομαι",
						},
					],
				},
				{
					englishWords: "with",
					greekWords: [
						{
							text: "with",
							strongs: "G3326",
							OGNTsort: 65269,
							morph: "PREP",
							lemma: "μετά",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 65270,
							morph: "T-GPM",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "eleven",
					greekWords: [
						{
							text: "eleven",
							strongs: "G1733",
							OGNTsort: 65271,
							morph: "A-GPM-NUI",
							lemma: "ἕνδεκα",
						},
					],
				},
				{
					englishWords: "apostles.",
					greekWords: [
						{
							text: "apostles.",
							strongs: "G652",
							OGNTsort: 65272,
							morph: "N-GPM",
							lemma: "ἀπόστολος",
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 12,
			verseWords: [
				{
					englishWords: "They were all amazed",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "all",
								strongs: "G3956",
								OGNTsort: 65448,
								morph: "A-NPM",
								lemma: "πᾶς",
							},
						},
						{
							word: {
								text: "They were all amazed",
								strongs: "G1839",
								OGNTsort: 65446,
								morph: "V-IMI-3P",
								lemma: "ἐξίστημι",
							},
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 65449,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "perplexed;",
					greekWords: [
						{
							text: "perplexed;",
							strongs: "G1280",
							OGNTsort: 65450,
							morph: "V-IAI-3P",
							lemma: "διαπορέω",
						},
					],
				},
				{
					englishWords: "they said",
					greekWords: [
						{
							text: "they said",
							strongs: "G3004",
							OGNTsort: 65454,
							morph: "V-PAP-NPM",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: "to",
					greekWords: [
						{
							text: "to",
							strongs: "G4314",
							OGNTsort: 65452,
							morph: "PREP",
							lemma: "πρός",
						},
					],
				},
				{
					englishWords: "one another,",
					phraseWords: [
						{
							text: "√",
							strongs: "G243",
							OGNTsort: 65451,
							phraseWords: "one another,",
							morph: "A-NSM",
							lemma: "ἄλλος",
						},
						{
							text: "√",
							strongs: "G243",
							OGNTsort: 65453,
							phraseWords: "one another,",
							morph: "A-ASM",
							lemma: "ἄλλος",
						},
					],
					subWords: [],
				},
				{
					englishWords: '"What',
					greekWords: [
						{
							text: '"What',
							strongs: "G5101",
							OGNTsort: 65455,
							morph: "I-NSN",
							lemma: "τίς",
						},
					],
				},
				{
					englishWords: 'does this mean?"',
					phraseWords: [
						{
							text: "√",
							strongs: "G2309",
							OGNTsort: 65456,
							phraseWords: 'does [1] mean?"',
							morph: "V-PAI-3S",
							lemma: "θέλω",
						},
						{
							text: "√",
							strongs: "G1510",
							OGNTsort: 65458,
							phraseWords: 'does [1] mean?"',
							morph: "V-PAN",
							lemma: "εἰμί",
						},
					],
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "this",
								strongs: "G3778",
								OGNTsort: 65457,
								morph: "D-NSN",
								lemma: "οὗτος",
							},
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 54,
			verseWords: [
				{
					englishWords: "Then",
					greekWords: [
						{
							text: "Then",
							strongs: "G2532",
							OGNTsort: 7983,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{ englishWords: "Jesus" },
				{
					englishWords: "entered",
					greekWords: [
						{
							text: "entered",
							strongs: "G2064",
							OGNTsort: 7984,
							morph: "V-2AAP-NSM",
							lemma: "ἔρχομαι",
						},
					],
				},
				{
					englishWords: "his own",
					greekWords: [
						{
							text: "his own",
							strongs: "G846",
							OGNTsort: 7988,
							morph: "P-GSM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "region",
					greekWords: [
						{
							text: "region",
							strongs: "G3968",
							OGNTsort: 7987,
							morph: "N-ASF",
							lemma: "πατρίς",
						},
					],
				},
				{ englishWords: "and" },
				{
					englishWords: "taught",
					greekWords: [
						{
							text: "taught",
							strongs: "G1321",
							OGNTsort: 7989,
							morph: "V-IAI-3S",
							lemma: "διδάσκω",
						},
					],
				},
				{ englishWords: "the people" },
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 7991,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "their",
					greekWords: [
						{
							text: "their",
							strongs: "G846",
							OGNTsort: 7994,
							morph: "P-GPM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "synagogue.",
					greekWords: [
						{
							text: "synagogue.",
							strongs: "G4864",
							OGNTsort: 7993,
							morph: "N-DSF",
							lemma: "συναγωγή",
						},
					],
				},
				{
					englishWords: "The result was that",
					greekWords: [
						{
							text: "The result was that",
							strongs: "G5620",
							OGNTsort: 7995,
							morph: "CONJ",
							lemma: "ὥστε",
						},
					],
				},
				{
					englishWords: "they",
					greekWords: [
						{
							text: "they",
							strongs: "G846",
							OGNTsort: 7997,
							morph: "P-APM",
							lemma: "αὐτός",
						},
					],
				},
				{
					englishWords: "were astonished",
					greekWords: [
						{
							text: "were astonished",
							strongs: "G1605",
							OGNTsort: 7996,
							morph: "V-PPN",
							lemma: "ἐκπλήσσω",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 7998,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "said,",
					greekWords: [
						{
							text: "said,",
							strongs: "G3004",
							OGNTsort: 7999,
							morph: "V-PAN",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords:
						'"Where does this man get his wisdom and these miraculous powers from?',
					subWords: [
						{
							subIdx: "[3]",
							word: {
								text: "this man",
								strongs: "G3778",
								OGNTsort: 8001,
								morph: "D-DSM",
								lemma: "οὗτος",
							},
						},
						{
							subIdx: "[4]",
							word: { text: "does this man get" },
						},
						{ subIdx: "[5]", word: { text: "his" } },
						{
							subIdx: "[6]",
							word: {
								text: "wisdom",
								strongs: "G4678",
								OGNTsort: 8003,
								morph: "N-NSF",
								lemma: "σοφία",
							},
						},
						{
							subIdx: "[7]",
							word: {
								text: "and",
								strongs: "G2532",
								OGNTsort: 8005,
								morph: "CONJ",
								lemma: "καί",
							},
						},
						{
							subIdx: "[8]",
							word: {
								text: "these",
								strongs: "G3778",
								OGNTsort: 8004,
								morph: "D-NSF",
								lemma: "οὗτος",
							},
						},
						{
							subIdx: "[9]",
							word: {
								text: "miraculous powers",
								strongs: "G1411",
								OGNTsort: 8007,
								morph: "N-NPF",
								lemma: "δύναμις",
							},
						},
						{
							word: {
								text: '"Where does this man get his wisdom and these miraculous powers from?',
								strongs: "G4159",
								OGNTsort: 8000,
								morph: "ADV",
								lemma: "πόθεν",
							},
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 16,
			verseWords: [
				{
					englishWords: "But",
					greekWords: [
						{
							text: "But",
							strongs: "G1161",
							OGNTsort: 21796,
							morph: "CONJ",
							lemma: "δέ",
						},
					],
				},
				{
					englishWords: "when Herod heard this",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "Herod",
								strongs: "G2264",
								OGNTsort: 21798,
								morph: "N-NSM-P",
								lemma: "Ἡρώδης",
							},
						},
						{
							word: {
								text: "when Herod heard this",
								strongs: "G191",
								OGNTsort: 21795,
								morph: "V-AAP-NSM",
								lemma: "ἀκούω",
							},
						},
					],
				},
				{
					englishWords: "he said,",
					greekWords: [
						{
							text: "he said,",
							strongs: "G3004",
							OGNTsort: 21799,
							morph: "V-IAI-3S",
							lemma: "λέγω",
						},
					],
				},
				{
					englishWords: '"John,',
					greekWords: [
						{
							text: '"John,',
							strongs: "G2491",
							OGNTsort: 21803,
							morph: "N-ASM-P",
							lemma: "Ἰωάννης",
						},
					],
				},
				{
					englishWords: "whom",
					greekWords: [
						{
							text: "whom",
							strongs: "G3739",
							OGNTsort: 21800,
							morph: "R-ASM",
							lemma: "ὅς, ἥ",
						},
					],
				},
				{
					englishWords: "I",
					greekWords: [
						{
							text: "I",
							strongs: "G1473",
							OGNTsort: 21801,
							morph: "P-1NS",
							lemma: "ἐγώ",
						},
					],
				},
				{
					englishWords: "beheaded,",
					greekWords: [
						{
							text: "beheaded,",
							strongs: "G607",
							OGNTsort: 21802,
							morph: "V-AAI-1S",
							lemma: "ἀποκεφαλίζω",
						},
					],
				},
				{
					englishWords: 'has been raised."',
					greekWords: [
						{
							text: 'has been raised."',
							strongs: "G1453",
							OGNTsort: 21805,
							morph: "V-API-3S",
							lemma: "ἐγείρω",
						},
					],
				},
			],
		},
	],
	[
		{
			verseNum: 40,
			verseWords: [
				{
					englishWords: "For",
					greekWords: [
						{
							text: "For",
							strongs: "G1063",
							OGNTsort: 6764,
							morph: "CONJ",
							lemma: "γάρ",
						},
					],
				},
				{
					englishWords: "as",
					greekWords: [
						{
							text: "as",
							strongs: "G5618",
							OGNTsort: 6763,
							morph: "CONJ",
							lemma: "ὥσπερ",
						},
					],
				},
				{
					englishWords: "Jonah",
					greekWords: [
						{
							text: "Jonah",
							strongs: "G2495",
							OGNTsort: 6766,
							morph: "N-NSM-P",
							lemma: "Ἰωνᾶς",
						},
					],
				},
				{
					englishWords: "was",
					greekWords: [
						{
							text: "was",
							strongs: "G1510",
							OGNTsort: 6765,
							morph: "V-IAI-3S",
							lemma: "εἰμί",
						},
					],
				},
				{
					englishWords: "three",
					greekWords: [
						{
							text: "three",
							strongs: "G5140",
							OGNTsort: 6772,
							morph: "A-APF",
							lemma: "τρεῖς, τρία",
						},
					],
				},
				{
					englishWords: "days",
					greekWords: [
						{
							text: "days",
							strongs: "G2250",
							OGNTsort: 6773,
							morph: "N-APF",
							lemma: "ἡμέρα",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 6774,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "three",
					greekWords: [
						{
							text: "three",
							strongs: "G5140",
							OGNTsort: 6775,
							morph: "A-APF",
							lemma: "τρεῖς, τρία",
						},
					],
				},
				{
					englishWords: "nights",
					greekWords: [
						{
							text: "nights",
							strongs: "G3571",
							OGNTsort: 6776,
							morph: "N-APF",
							lemma: "νύξ",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 6767,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 6768,
							morph: "T-DSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "stomach",
					greekWords: [
						{
							text: "stomach",
							strongs: "G2836",
							OGNTsort: 6769,
							morph: "N-DSF",
							lemma: "κοιλία",
						},
					],
				},
				{
					englishWords: "of the",
					greekWords: [
						{
							text: "of the",
							strongs: "G3588",
							OGNTsort: 6770,
							morph: "T-GSN",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "big fish,",
					greekWords: [
						{
							text: "big fish,",
							strongs: "G2785",
							OGNTsort: 6771,
							morph: "N-GSN",
							lemma: "κῆτος",
						},
					],
				},
				{
					englishWords: "so",
					greekWords: [
						{
							text: "so",
							strongs: "G3779",
							OGNTsort: 6777,
							morph: "ADV",
							lemma: "οὕτω, οὕτως",
						},
					],
				},
				{
					englishWords: "will the Son  of Man be",
					subWords: [
						{
							subIdx: "[1]",
							word: {
								text: "the",
								strongs: "G3588",
								OGNTsort: 6779,
								morph: "T-NSM",
								lemma: "ὁ",
							},
						},
						{
							subIdx: "[2]",
							word: {
								text: "Son",
								strongs: "G5207",
								OGNTsort: 6780,
								morph: "N-NSM",
								lemma: "υἱός",
							},
						},
						{
							subIdx: "[3]",
							word: {
								text: "√",
								strongs: "G3588",
								OGNTsort: 6781,
								morph: "T-GSM",
								lemma: "ὁ",
							},
						},
						{
							subIdx: "[4]",
							word: {
								text: "of Man",
								strongs: "G444",
								OGNTsort: 6782,
								morph: "N-GSM",
								lemma: "ἄνθρωπος",
							},
						},
						{
							word: {
								text: "will the Son  of Man be",
								strongs: "G1510",
								OGNTsort: 6778,
								morph: "V-FDI-3S",
								lemma: "εἰμί",
							},
						},
					],
				},
				{
					englishWords: "three",
					greekWords: [
						{
							text: "three",
							strongs: "G5140",
							OGNTsort: 6788,
							morph: "A-APF",
							lemma: "τρεῖς, τρία",
						},
					],
				},
				{
					englishWords: "days",
					greekWords: [
						{
							text: "days",
							strongs: "G2250",
							OGNTsort: 6789,
							morph: "N-APF",
							lemma: "ἡμέρα",
						},
					],
				},
				{
					englishWords: "and",
					greekWords: [
						{
							text: "and",
							strongs: "G2532",
							OGNTsort: 6790,
							morph: "CONJ",
							lemma: "καί",
						},
					],
				},
				{
					englishWords: "three",
					greekWords: [
						{
							text: "three",
							strongs: "G5140",
							OGNTsort: 6791,
							morph: "A-APF",
							lemma: "τρεῖς, τρία",
						},
					],
				},
				{
					englishWords: "nights",
					greekWords: [
						{
							text: "nights",
							strongs: "G3571",
							OGNTsort: 6792,
							morph: "N-APF",
							lemma: "νύξ",
						},
					],
				},
				{
					englishWords: "in",
					greekWords: [
						{
							text: "in",
							strongs: "G1722",
							OGNTsort: 6783,
							morph: "PREP",
							lemma: "ἐν",
						},
					],
				},
				{
					englishWords: "the",
					greekWords: [
						{
							text: "the",
							strongs: "G3588",
							OGNTsort: 6784,
							morph: "T-DSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "heart",
					greekWords: [
						{
							text: "heart",
							strongs: "G2588",
							OGNTsort: 6785,
							morph: "N-DSF",
							lemma: "καρδία",
						},
					],
				},
				{
					englishWords: "of the",
					greekWords: [
						{
							text: "of the",
							strongs: "G3588",
							OGNTsort: 6786,
							morph: "T-GSF",
							lemma: "ὁ",
						},
					],
				},
				{
					englishWords: "earth.",
					greekWords: [
						{
							text: "earth.",
							strongs: "G1093",
							OGNTsort: 6787,
							morph: "N-GSF",
							lemma: "γῆ",
						},
					],
				},
			],
		},
	],
];
