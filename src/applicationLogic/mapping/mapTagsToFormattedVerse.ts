import type {
	GreekWordAttributes,
	GreekWordNotes,
	NewFormattedGreekWord,
	NoteTag,
	PhraseWord,
	SubWord,
	ValidGreekWordNoteKeys,
	VerseTag,
	WordTag,
} from "../../types";

export enum VerseTagContentType {
	OSIS = "OSIS",
	XML = "XML",
}

function mapVerses(
	verses: VerseTag[],
	verseTagContentType: VerseTagContentType,
) {
	const verseOutput: any[] = [];

	if (verses === undefined) {
		return verseOutput;
	}

	// populates verseOutput with verse
	verses.forEach((verse: VerseTag) => {
		const flags = {
			consumedPhraseWord: false,
			consumedSubWord: false,
			consumedSubPhraseWord: false,
			processingSubsequentPhraseWord: false,
			skipFlagReset: false,
		};
		const buffers = {
			verseWords: [] as any[],
			subWords: [] as SubWord[],
			phraseWords: [] as PhraseWord[],
			subPhraseWords: [] as any[],
		};

		// populates the verseWordOutput with verse words
		verse.w.forEach((word: WordTag | string) => {
			mapVerseWord(word, flags, buffers, verseTagContentType);
		});

		// Ensures that phrase words at the end of a verse are processed
		if (flags.consumedPhraseWord) {
			const phraseWordsBackup = [...buffers.phraseWords];
			const tempWord = processConsumedPhraseWords(buffers.phraseWords);
			let injectedSubWords: any;

			if (flags.consumedSubWord) {
				// Checks if the phraseWords attribute needs to have sub words injected into it
				if (needsSubWords(phraseWordsBackup[0]?.phraseWords)) {
					injectedSubWords = processConsumedSubWords(
						phraseWordsBackup[0],
						buffers.subWords,
					);
					tempWord.englishWords = injectedSubWords.englishWords;
					tempWord.subWords = injectedSubWords.subWords;
				}
			}
			buffers.verseWords.push(tempWord);
		}

		const tempVerse = {
			verseNum: Number.parseInt(
				verse.ATTR.name.slice(verse.ATTR.name.indexOf(":") + 1),
			),
			verseWords: buffers.verseWords,
		};
		verseOutput.push(tempVerse);
	});
	return verseOutput;
}

function needsSubWords(word: string | undefined) {
	if (word === undefined || word === null) {
		return false;
	}
	if (word.match(/[\d+]/) != null) {
		return true;
	}
	return false;
}

type WordMapFlags = {
	consumedPhraseWord: boolean;
	processingSubsequentPhraseWord: boolean;
	consumedSubWord: boolean;
	consumedSubPhraseWord: boolean;
};

type WordMapBuffers = {
	verseWords: any[];
	phraseWords: PhraseWord[];
	subWords: SubWord[];
	subPhraseWords: any[];
};

function mapVerseWord(
	word: WordTag | string,
	flags: WordMapFlags,
	buffers: WordMapBuffers,
	verseTagContentType: VerseTagContentType,
) {
	// word is just a string, but we still need to check buffer.
	if (typeof word === "string") {
		mapWord(word, flags, buffers);
		return;
	}

	// Fails gracefully for cases where given data is not valid
	if (word._text === undefined) {
		return;
	}

	let currentGreekWord: NewFormattedGreekWord;
	let sub: any;
	if (verseTagContentType === VerseTagContentType.OSIS) {
		const currentGreekWordNotes: GreekWordNotes = mapNotes(word.note);
		const currentGreekWordAttributes: GreekWordAttributes = word.ATTR;
		sub = currentGreekWordNotes.sub;

		currentGreekWordNotes.sub = undefined;

		currentGreekWord = {
			...currentGreekWordNotes,
			...currentGreekWordAttributes,
			text: word._text,
		};
	} else {
		const currentGreekWordAttributes: any = word.ATTR;
		sub = currentGreekWordAttributes?.sub;

		currentGreekWord = {
			...currentGreekWordAttributes,
			text: word._text,
		};
	}

	if (currentGreekWord.phraseWords !== undefined) {
		mapConsecutivePhraseWords(currentGreekWord, flags, buffers);
		flags.consumedPhraseWord = true;
		buffers.phraseWords.push({
			...currentGreekWord,
			phraseWords: currentGreekWord.phraseWords,
		});
	} else if (sub !== undefined) {
		flags.consumedSubWord = true;
		const subWord: SubWord = {
			subIdx: sub as string,
			word: {
				...currentGreekWord,
			} as NewFormattedGreekWord,
		};
		buffers.subWords.push(subWord);
	} else if (currentGreekWord.subPhraseWords !== undefined) {
		flags.consumedSubPhraseWord = true;
		buffers.subPhraseWords.push(currentGreekWord);
	} else {
		// is a normal word
		mapWord(currentGreekWord, flags, buffers);
	}
}

function mapNotes(notes: NoteTag[] | undefined) {
	let result: any = {};
	let tempNotes = notes;
	if (tempNotes !== undefined) {
		if (!Array.isArray(tempNotes)) {
			tempNotes = [tempNotes];
		}

		tempNotes.forEach((e) => {
			const greekWordNoteKey: ValidGreekWordNoteKeys = e.ATTR.type;
			const greekWordNoteValue: string = e._text;
			result[greekWordNoteKey.slice(2)] = greekWordNoteValue;
		});
		result = result as GreekWordNotes;
	}
	return result;
}

function mapConsecutivePhraseWords(
	currentGreekWord: NewFormattedGreekWord,
	flags: WordMapFlags,
	buffers: WordMapBuffers,
) {
	if (flags.consumedPhraseWord === true) {
		if (
			currentGreekWord.phraseWords !==
			buffers.phraseWords[buffers.phraseWords.length - 1].phraseWords
		) {
			flags.processingSubsequentPhraseWord = true;
			// calls map words with processingSubsequentPhraseWord = true.
			// processingSubsequentPhraseWord allows us to process one phrase word
			// without affecting the next
			mapWord(currentGreekWord, flags, buffers);
		}
	}
}

function mapWord(
	word: NewFormattedGreekWord | string,
	flags: WordMapFlags,
	buffers: WordMapBuffers,
) {
	if (
		typeof word !== "string" &&
		word.text === "√" &&
		flags.consumedPhraseWord === false
	) {
		return;
	}

	if (flags.consumedPhraseWord) {
		// if buffer contains phrase words NOTE: current word is NOT processed
		mapPhraseWord(word, flags, buffers);
	} else if (flags.consumedSubWord) {
		// buffer contain subWords. NOTE: Current word is processed in this case

		// Process sub words interrupted by other types of words.
		if (typeof word !== "string") {
			if (!needsSubWords(word.text)) {
				flags.consumedSubWord = false;
				mapWord(word, flags, buffers);
				flags.consumedSubWord = true;
				flags.consumedPhraseWord = false;
				flags.consumedSubPhraseWord = false;
				return;
			}
		}

		mapSubWords(word, flags, buffers);
	} else {
		mapGenericWord(word, buffers, undefined);
	}

	flags.consumedPhraseWord = false;
	flags.consumedSubWord = false;
	flags.consumedSubPhraseWord = false;
}

type ProcessedSubWords = {
	englishWords: string;
	subWords: any[];
};

function mapPhraseWord(
	word: NewFormattedGreekWord | string,
	flags: WordMapFlags,
	buffers: WordMapBuffers,
) {
	let nonInjectedsubWords: ProcessedSubWords | undefined;
	let injectedSubWords: ProcessedSubWords | undefined = undefined;

	if (flags.consumedSubWord) {
		// Checks if the phraseWords attribute needs to have sub words injected into it
		if (needsSubWords(buffers.phraseWords[0].phraseWords)) {
			injectedSubWords = processConsumedSubWords(
				buffers.phraseWords[0],
				buffers.subWords,
			);
		}
		if (flags.processingSubsequentPhraseWord === false) {
			nonInjectedsubWords = processConsumedSubWords(word, buffers.subWords);
		}
	}

	const tempWord = processConsumedPhraseWords(buffers.phraseWords);

	// Injects the sub words into the pharse word if necessary
	if (injectedSubWords !== undefined) {
		tempWord.englishWords = injectedSubWords.englishWords;
		tempWord.subWords = injectedSubWords.subWords;
	}

	buffers.verseWords.push(tempWord);

	if (flags.processingSubsequentPhraseWord === true) {
		flags.consumedPhraseWord = false;
		flags.consumedSubWord = false;
		flags.consumedSubPhraseWord = false;
		flags.processingSubsequentPhraseWord = false;
		return;
	}

	// Processing the current word
	mapGenericWord(word, buffers, nonInjectedsubWords);
}

function mapGenericWord(
	word: NewFormattedGreekWord | string,
	buffers: WordMapBuffers,
	nonInjectedsubWords: ProcessedSubWords | undefined,
) {
	if (typeof word !== "string") {
		if (nonInjectedsubWords && word.text !== "√") {
			buffers.verseWords.push(nonInjectedsubWords);
		} else if (word.text !== "√") {
			const tempWord = {
				englishWords: word.text,
				greekWords: [word],
			};
			buffers.verseWords.push(tempWord);
		}
	} else {
		const tempWord = {
			englishWords: word,
		};
		buffers.verseWords.push(tempWord);
	}
}

function mapSubWords(
	word: NewFormattedGreekWord | string,
	flags: WordMapFlags,
	buffers: WordMapBuffers,
) {
	const leftOverPhraseWords = processConsumedPhraseWords(buffers.phraseWords);

	if (leftOverPhraseWords.phraseWords.length > 0) {
		buffers.verseWords.push(leftOverPhraseWords);
	}

	const tempWord = processConsumedSubWords(word, buffers.subWords);

	buffers.verseWords.push(tempWord);
}

function processConsumedPhraseWords(greekWordBuffer: PhraseWord[]) {
	const pharseWords = greekWordBuffer.filter((word) => word.text === "√");
	const tempWord = {
		englishWords: pharseWords[0]?.subPhraseWords
			? pharseWords[0]?.subPhraseWords
			: pharseWords[0]?.phraseWords,
		phraseWords: [...greekWordBuffer],
		subWords: [] as any[],
	};

	greekWordBuffer.splice(0, pharseWords.length);

	return tempWord;
}

function processConsumedSubWords(
	currentWord: NewFormattedGreekWord | string,
	subWordBuffer: SubWord[],
) {
	const returnWords: any[] = [...subWordBuffer];
	let currentEnglishWord = "";

	let source = "";
	if (typeof currentWord === "string") {
		source = currentWord;
	} else if (currentWord.text === "√" && currentWord.phraseWords) {
		source = currentWord.phraseWords;
	} else {
		source = currentWord.text;
	}

	processNestedSubWords(subWordBuffer);

	for (let i = 0; i < subWordBuffer.length; i++) {
		const currentSubWord = subWordBuffer[i].word;
		if (typeof currentSubWord !== "string") {
			if (currentSubWord.subPhraseWords) {
				const injectedString =
					currentSubWord.subPhraseWords === "√"
						? ""
						: currentSubWord.subPhraseWords;
				source = source.replace(
					subWordBuffer[i].subIdx as string,
					injectedString,
				);
			} else if (currentSubWord.phraseWords) {
				const injectedString =
					currentSubWord.text === "√" ? "" : currentSubWord.text;
				currentSubWord.phraseWords = currentSubWord.phraseWords.replace(
					subWordBuffer[i].subIdx as string,
					injectedString,
				);

				// TODO: see if I can bring this out of the for loop to decrease run time
				if (typeof currentWord !== "string" && currentWord.phraseWords) {
					currentWord.phraseWords = currentSubWord.phraseWords;
				}
			} else {
				const injectedString =
					currentSubWord.text === "√" ? "" : currentSubWord.text;
				source = source.replace(
					subWordBuffer[i].subIdx as string,
					injectedString,
				);
			}
		}
	}

	currentEnglishWord = source;
	if (typeof currentWord !== "string" && !currentWord.phraseWords) {
		currentWord.text = source;
		returnWords.push({ word: currentWord });
	}

	const tempWord = {
		englishWords: currentEnglishWord,
		subWords: returnWords,
	};

	subWordBuffer.splice(0, subWordBuffer.length);

	return tempWord;
}

function processNestedSubWords(subWordBuffer: SubWord[]) {
	subWordBuffer.forEach((subword, curIdx) => {
		if (typeof subword.word !== "string") {
			const nestedSubWords = subword.word.text.match(/[\d+]/g);

			if (nestedSubWords != null) {
				nestedSubWords.forEach((nestedSubWord) => {
					const subWordToInject = subWordBuffer.find(
						(subWord) => subWord.subIdx === `[${nestedSubWord}]`,
					);
					injectSubWord(subWordToInject, subword, nestedSubWord);
				});
			}
		}
	});
}

function injectSubWord(
	subWordToInject: SubWord | undefined,
	word: SubWord,
	subIndex: string,
) {
	let textToInject = "";

	if (
		typeof subWordToInject?.word !== "string" &&
		subWordToInject?.word.text !== undefined
	) {
		textToInject = subWordToInject?.word.text;
	} else {
		if (
			subWordToInject?.word !== undefined &&
			typeof subWordToInject.word === "string"
		) {
			textToInject = subWordToInject.word;
		}
	}

	if (typeof word.word !== "string") {
		word.word.text = word.word.text.replace(`[${subIndex}]`, textToInject);
	} else {
		word.word = word.word.replace(`[${subIndex}]`, textToInject);
	}
}

export default mapVerses;
