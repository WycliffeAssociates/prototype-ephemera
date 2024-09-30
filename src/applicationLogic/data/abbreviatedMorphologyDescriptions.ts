// scenarios
/*
    P-2DS to you.
    N-DSM the Lord.
    V-PAI-2S you have
    P-1AS me
    V-2AMM-2S receive

    ) partOfSpeech - case/number/gender
    ) partOfSpeech - tense/voice/mood - person/gender/number
    ) partOFSpeech - tense/voice/mood - case/gender/number
    ) 
    ) Conj
    ) Prep
*/

const partOfSpeech = {
	V: "Verb",
	N: "Noun",
	Adv: "Adverb",
	Adj: "Adjective",
	Art: "Article",
	DPro: "Demonstrative Pronoun",
	IPro: "Interrogative / Indefinite Pronoun",
	PPro: "Personal / Possessive Pronoun",
	RecPro: "Reciprocal Pronoun",
	RelPro: "Relative Pronoun",
	RefPro: "Reflexive Pronoun",
	Prep: "Preposition",
	Conj: "Conjunction",
	I: "Interjection",
	Prtcl: "Particle",
	Heb: "Hebrew Word",
	Aram: "Aramaic Word",
};

const voice = {
	A: "Active",
	M: "Middle",
	P: "Passive",
	"M/P": "Middle or Passive",
};

const caseWords = {
	N: "Nominative",
	V: "Vocative",
	A: "Accusative",
	G: "Genitive",
	D: "Dative",
};

const numberWords = {
	S: "Singular",
	P: "Plural",
};

const Gender = {
	M: "Masculine",
	F: "Feminine",
	N: "Neuter",
};

const comparison = {
	C: "Comparative",
	S: "Superlative",
};

const person = {
	1: "1st Person",
	2: "2nd Person",
	3: "3rd Person",
};

const tense = {
	P: "Present",
	I: "Imperfect",
	F: "Future",
	A: "Aorist",
	R: "Perfect",
	L: "Pluperfect",
};

const mood = {
	I: "Indicative",
	M: "Imperative",
	S: "Subjunctive",
	O: "Optative",
	N: "Infinitive",
	P: "Participle",
};

export { partOfSpeech };
