type NoteTag = {
  ATTR: any,
  _text: any,
}

type WordTag = {
  ATTR: any,
  note?: NoteTag[],
  _text: string,
}

// NOTE: the attribute w represents the w tag used by OSIS
type VerseTag = {
  ATTR: any,
  note?: [],
  w: WordTag[]
}

type GreekWordNotes = {
  OGNTSort : string,
  strongs : string,
  text? : string,
  sub? : string,
  phraseWords? : string,
}

type ValidGreekWordNoteKeys = "OGNTsort" | "text" | "sub" | "phraseWords" | "strongs";

type ValidGreekWordAttributeKeys = "lemma" | "morph";

type GreekWordAttributes = {
  [key in ValidGreekWordAttributeKeys] : string;
}

type GreekWord = {
  notes : GreekWordNotes;
  attributes : GreekWordAttributes;
  text : string;
}

type GreekPhraseWord = {
    greekWords: string,
    englishWords: string,
    morphology: string,
    descriptions: string[],
};

type FormattedGreekWord = {
  lemma : string,
  morph : string,
  OGNTSort : string,
  text : string,
  strongs : string
  sub? : string,
  phraseWords? : string,
  morphology?: string,
  descriptions?: Description[],
  gwtGreekWord?: string,
}

type Description = {
  mainDescription: string,
  subDescriptions?: string[]
}

type FormattedWord = {
  englishWords : string,
  isPhrase? : boolean,
  containsSubWords? : boolean,
  greekWords? : FormattedGreekWord[]
}

type FormattedVerse = {
  verseWords : FormattedWord[];
}


export type {
    GreekWord, 
    GreekWordNotes, 
    GreekWordAttributes,
    GreekPhraseWord,
    ValidGreekWordAttributeKeys, 
    ValidGreekWordNoteKeys,
    NoteTag,
    WordTag,
    VerseTag,
    FormattedGreekWord,
    FormattedWord,
    FormattedVerse,
    Description
};