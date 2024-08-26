type NoteTag = {
	ATTR: any;
	_text: any;
};

type WordTag = {
	ATTR: any;
	note?: NoteTag[];
	_text: string;
};

type VerseTag = {
	ATTR: any;
	note?: [];
	w: WordTag[];
};

type GreekWordNotes = {
	OGNTSort: string;
	strongs: string;
	text?: string;
	sub?: string;
	phraseWords?: string;
	subPhraseWords?: string;
};

type ValidGreekWordNoteKeys =
	| "OGNTsort"
	| "text"
	| "sub"
	| "phraseWords"
	| "strongs"
	| "subPhraseWords";

type ValidGreekWordAttributeKeys = "lemma" | "morph";

type GreekWordAttributes = {
	[key in ValidGreekWordAttributeKeys]: string;
};

type FormattedGreekWord = {
	lemma: string;
	morph: string;
	OGNTSort: string;
	text: string;
	strongs: string;
	sub?: string;
	phraseWords?: string;
	subPhraseWords?: string;
	morphology?: string;
	descriptions?: Description[];
	gwtGreekWord?: string;
	adviceForTranslators?: string;
	verseReferences?: string[];
	unprocessedData?: string;
};

type Description = {
	mainDescription: string;
	subDescriptions?: string[];
};

type NewFormattedGreekWord = {
	lemma: string;
	morph: string;
	OGNTSort: string;
	text: string;
	strongs: string;
	morphology?: string;
	descriptions?: Description[];
	gwtGreekWord?: string;
	subPhraseWords?: string;
	phraseWords?: string;
};

type PhraseWord = NewFormattedGreekWord & {
	phraseWords: string;
};

type SubWord = {
	subIdx?: string;
	word: NewFormattedGreekWord | string;
	subPhraseWords?: PhraseWord[];
};

type GWTInformation = {
	gwtGreekWord: string;
	descriptions: Description[];
	morphology: string;
	verseReferences?: string[];
	adviceForTranslators?: string;
	unprocessed?: string;
};

type SettingsOption = {
	name: string;
	value: string | number | boolean | undefined;
	modifier: (newValue: string | number | boolean | undefined) => any;
	inputType: "switch" | "increment" | "button";
	unit?: string;
	styleOverrideKey?: string;
	styleOverrideValue?: string;
	defaultValue?: string | number | boolean;
};

type ULBSettingsOption = SettingsOption & {
	level: "verse" | "word" | "all";
};

type GreekAlignmentData = {
	strong: string;
	morph?: string;
	lemma?: string
};

type AlignedText = {
	text: string;
	greekAlignmentData?: GreekAlignmentData[];
};

type AlignedVerse = {
	verseNum: number;
	alignedVerseText: AlignedText[];
};

export type {
	GreekAlignmentData,
	AlignedVerse,
	AlignedText,
	GWTInformation,
	GreekWordNotes,
	GreekWordAttributes,
	ValidGreekWordAttributeKeys,
	ValidGreekWordNoteKeys,
	NoteTag,
	WordTag,
	VerseTag,
	FormattedGreekWord,
	Description,
	NewFormattedGreekWord,
	SubWord,
	PhraseWord,
	SettingsOption,
	ULBSettingsOption,
};
