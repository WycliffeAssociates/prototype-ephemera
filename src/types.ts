type Note = {
    ATTR: any,
    _: any,
}
  
type w = {
    ATTR: any,
    note: Note[],
    _: string,
}
  
type verse = {
    ATTR: any,
    note: [],
    w: w[]
}

type ValidGreekWordNoteKeys = "OGNTsort" | "text" | "sub" | "phraseWords" | "strongs";

type GreekWordNotes = {
    [key in ValidGreekWordNoteKeys] : string;
}

type ValidGreekWordAttributeKeys = "lemma" | "morph";

type GreekWordAttributes = {
    [key in ValidGreekWordAttributeKeys] : string;
}

type GreekWord = {
    notes : GreekWordNotes;
    attributes : GreekWordAttributes;
    text : string;
}


export type {
                GreekWord, 
                GreekWordNotes, 
                GreekWordAttributes, 
                ValidGreekWordAttributeKeys, 
                ValidGreekWordNoteKeys,
                Note,
                w,
                verse,
            };