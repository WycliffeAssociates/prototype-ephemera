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


let partOfSpeech = {
    V : "Verb",
    N : "Noun",
    Adv : "Adverb",
    Adj : "Adjective",
    Art : "Article",
    DPro : "Demonstrative Pronoun",
    IPro : "Interrogative / Indefinite Pronoun",
    PPro : "Personal / Possessive Pronoun",
    RecPro : "Reciprocal Pronoun",
    RelPro : "Relative Pronoun",
    RefPro : "Reflexive Pronoun",
    Prep : "Preposition",
    Conj : "Conjunction",
    I : "Interjection",
    Prtcl : "Particle",
    Heb : "Hebrew Word",
    Aram : "Aramaic Word",
}

let voice = {
    A : "Active",
    M : "Middle",
    P : "Passive",
    "M/P" : "Middle or Passive"
}

let caseWords = {
    N : "Nominative",
    V : "Vocative",
    A : "Accusative",
    G : "Genitive",
    D : "Dative",
}

let numberWords = {
    S : "Singular",
    P : "Plural"
}

let Gender = {
    M : "Masculine",
    F : "Feminine",
    N : "Neuter",
}

let comparison = {
    C : "Comparative",
    S : "Superlative",
}

let person = {
    1 : "1st Person",
    2 : "2nd Person",
    3 : "3rd Person",
}


let tense = {
    P : "Present",
    I : "Imperfect",
    F : "Future",
    A : "Aorist",
    R : "Perfect",
    L : "Pluperfect",
}


let mood = {
    I : "Indicative",
    M : "Imperative",
    S : "Subjunctive",
    O : "Optative",
    N : "Infinitive",
    P : "Participle",
}

export {partOfSpeech};