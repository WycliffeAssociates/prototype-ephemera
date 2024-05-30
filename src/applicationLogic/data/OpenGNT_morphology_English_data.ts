let data = {
	"N-NSF": "Noun, Nominative, Singular, Feminine",
	"N-GSF": "Noun, Genitive, Singular, Feminine",
	"N-GSM-P": "Noun, Genitive, Singular, Masculine, Person",
	"N-GSM-T": "Noun, Genitive, Singular, Masculine, Title",
	"N-GSM": "Noun, Genitive, Singular, Masculine",
	"N-NSM-P":
		"Noun, Nominative, Singular, Masculine, Person",
	"V-AAI-3S":
		"Verb, Aorist, Active, Indicative, third, Singular",
	"T-ASM":
		"definite article, Accusative, Singular, Masculine",
	"N-ASM-P":
		"Noun, Accusative, Singular, Masculine, Person",
	CONJ: "CONJunction or conjunctive particle",
	"T-APM":
		"definite article, Accusative, Plural, Masculine",
	"N-APM": "Noun, Accusative, Plural, Masculine",
	"P-GSM":
		"Personal pronoun, Genitive, Singular, Masculine",
	PREP: "PREPosition",
	"T-GSF": "definite article, Genitive, Singular, Feminine",
	"N-GSF-P": "Noun, Genitive, Singular, Feminine, Person",
	"N-ASM": "Noun, Accusative, Singular, Masculine",
	"T-GSM":
		"definite article, Genitive, Singular, Masculine",
	"N-GSF-L": "Noun, Genitive, Singular, Feminine, Location",
	"T-ASF":
		"definite article, Accusative, Singular, Feminine",
	"N-ASF": "Noun, Accusative, Singular, Feminine",
	"R-GSF": "Relative pronoun, Genitive, Singular, Feminine",
	"V-API-3S":
		"Verb, Aorist, Passive, Indicative, third, Singular",
	"T-NSM":
		"definite article, Nominative, Singular, Masculine",
	"V-PPP-NSM":
		"Verb, Present, Passive, Participle, Nominative, Singular, Masculine",
	"N-NSM-T": "Noun, Nominative, Singular, Masculine, Title",
	"A-NPF": "Adjective, Nominative, Plural, Feminine",
	"T-NPF": "definite article, Nominative, Plural, Feminine",
	"N-NPF": "Noun, Nominative, Plural, Feminine",
	"T-NSF":
		"definite article, Nominative, Singular, Feminine",
	ADV: "ADVerb or adverb and particle combined",
	"V-IAI-3S":
		"Verb, Imperfect, Active, Indicative, third, Singular",
	"V-APP-GSF":
		"Verb, Aorist, Passive, Participle, Genitive, Singular, Feminine",
	"T-DSM": "definite article, Dative, Singular, Masculine",
	"N-DSM-P": "Noun, Dative, Singular, Masculine, Person",
	"V-2AAN": "Verb, second Aorist, Active, iNfinitive",
	"P-APM":
		"Personal pronoun, Accusative, Plural, Masculine",
	"N-DSF": "Noun, Dative, Singular, Feminine",
	"V-PAP-NSF":
		"Verb, Present, Active, Participle, Nominative, Singular, Feminine",
	"N-GSN": "Noun, Genitive, Singular, Neuter",
	"A-GSN": "Adjective, Genitive, Singular, Neuter",
	"N-NSM": "Noun, Nominative, Singular, Masculine",
	"P-GSF": "Personal pronoun, Genitive, Singular, Feminine",
	"A-NSM": "Adjective, Nominative, Singular, Masculine",
	"V-PAP-NSM":
		"Verb, Present, Active, Participle, Nominative, Singular, Masculine",
	"PRT-N": "PaRTicle, Negative",
	"P-ASF":
		"Personal pronoun, Accusative, Singular, Feminine",
	"V-AAN": "Verb, Aorist, Active, iNfinitive",
	"V-AOI-3S":
		"Verb, Aorist, passive depOnent, Indicative, third, Singular",
	"D-APN":
		"Demonstrative pronoun, Accusative, Plural, Neuter",
	"V-AOP-GSM":
		"Verb, Aorist, passive depOnent, Participle, Genitive, Singular, Masculine",
	INJ: "INterJection",
	"N-ASN": "Noun, Accusative, Singular, Neuter",
	"V-2API-3S":
		"Verb, second Aorist, Passive, Indicative, third, Singular",
	"P-DSM": "Personal pronoun, Dative, Singular, Masculine",
	"N-VSM-P": "Noun, Vocative, Singular, Masculine, Person",
	"V-AOS-2S":
		"Verb, Aorist, passive depOnent, Subjunctive, second, Singular",
	"N-ASF-P": "Noun, Accusative, Singular, Feminine, Person",
	"P-2GS": "Personal pronoun, second, Genitive, Singular",
	"T-NSN": "definite article, Nominative, Singular, Neuter",
	"P-DSF": "Personal pronoun, Dative, Singular, Feminine",
	"V-APP-NSN":
		"Verb, Aorist, Passive, Participle, Nominative, Singular, Neuter",
	"V-PAI-3S":
		"Verb, Present, Active, Indicative, third, Singular",
	"V-FDI-3S":
		"Verb, Future, middle Deponent, Indicative, third, Singular",
	"V-FAI-2S":
		"Verb, Future, Active, Indicative, second, Singular",
	"T-ASN": "definite article, Accusative, Singular, Neuter",
	"P-NSM":
		"Personal pronoun, Nominative, Singular, Masculine",
	"V-FAI-3S":
		"Verb, Future, Active, Indicative, third, Singular",
	"T-GPF": "definite article, Genitive, Plural, Feminine",
	"N-GPF": "Noun, Genitive, Plural, Feminine",
	"P-GPM": "Personal pronoun, Genitive, Plural, Masculine",
	"D-NSN":
		"Demonstrative pronoun, Nominative, Singular, Neuter",
	"A-NSN": "Adjective, Nominative, Singular, Neuter",
	"V-2RAI-3S":
		"Verb, second peRfect, Active, Indicative, third, Singular",
	"V-APS-3S":
		"Verb, Aorist, Passive, Subjunctive, third, Singular",
	"V-PAP-GSM":
		"Verb, Present, Active, Participle, Genitive, Singular, Masculine",
	"V-FAI-3P":
		"Verb, Future, Active, Indicative, third, Plural",
	"N-ASM-T": "Noun, Accusative, Singular, Masculine, Title",
	"R-NSN": "Relative pronoun, Nominative, Singular, Neuter",
	"V-PPP-NSN":
		"Verb, Present, Passive, Participle, Nominative, Singular, Neuter",
	"P-1GP": "Personal pronoun, first, Genitive, Plural",
	"V-APP-NSM":
		"Verb, Aorist, Passive, Participle, Nominative, Singular, Masculine",
	"V-2AAI-3S":
		"Verb, second Aorist, Active, Indicative, third, Singular",
	"R-GSM":
		"Relative pronoun, Genitive, Singular, Masculine",
	"V-APP-GSM":
		"Verb, Aorist, Passive, Participle, Genitive, Singular, Masculine",
	"N-DSF-L": "Noun, Dative, Singular, Feminine, Location",
	"N-DPF": "Noun, Dative, Plural, Feminine",
	"N-NPM": "Noun, Nominative, Plural, Masculine",
	"V-2ADI-3P":
		"Verb, second Aorist, middle Deponent, Indicative, third, Plural",
	"N-APN-L": "Noun, Accusative, Plural, Neuter, Location",
	"V-PAP-NPM":
		"Verb, Present, Active, Participle, Nominative, Plural, Masculine",
	"ADV-I": "ADVerb, Interrogative",
	"T-GPM": "definite article, Genitive, Plural, Masculine",
	"A-GPM-PG":
		"Adjective, Genitive, Plural, Masculine, Person Gentilic",
	"V-2AAI-1P":
		"Verb, second Aorist, Active, Indicative, first, Plural",
	"T-DSF": "definite article, Dative, Singular, Feminine",
	"V-AAP-NSM":
		"Verb, Aorist, Active, Participle, Nominative, Singular, Masculine",
	"A-NSF": "Adjective, Nominative, Singular, Feminine",
	"N-NSF-L":
		"Noun, Nominative, Singular, Feminine, Location",
	"V-2AAP-NSM":
		"Verb, second Aorist, Active, Participle, Nominative, Singular, Masculine",
	"A-APM": "Adjective, Accusative, Plural, Masculine",
	"V-INI-3S":
		"Verb, Imperfect, middle or passive depoNent, Indicative, third, Singular",
	"V-PPI-3S":
		"Verb, Present, Passive, Indicative, third, Singular",
	"T-NPM":
		"definite article, Nominative, Plural, Masculine",
	"V-2AAI-3P":
		"Verb, second Aorist, Active, Indicative, third, Plural",
	"V-RPI-3S":
		"Verb, peRfect, Passive, Indicative, third, Singular",
	"P-2NS": "Personal pronoun, second, Nominative, Singular",
	"N-VSF-L": "Noun, Vocative, Singular, Feminine, Location",
	"N-VSF": "Noun, Vocative, Singular, Feminine",
	"N-GSM-L":
		"Noun, Genitive, Singular, Masculine, Location",
	"V-PAI-2S":
		"Verb, Present, Active, Indicative, second, Singular",
	"T-DPM": "definite article, Dative, Plural, Masculine",
	"N-DPM": "Noun, Dative, Plural, Masculine",
	"V-PNP-NSM":
		"Verb, Present, middle or passive depoNent, Participle, Nominative, Singular, Masculine",
	"R-NSM":
		"Relative pronoun, Nominative, Singular, Masculine",
	"P-1GS": "Personal pronoun, first, Genitive, Singular",
	"N-ASM-L":
		"Noun, Accusative, Singular, Masculine, Location",
	"V-PEP-GSM":
		"Verb, Present, Either middle or passive, Participle, Genitive, Singular, Masculine",
	"N-ASF-L":
		"Noun, Accusative, Singular, Feminine, Location",
	"V-AOP-NPM":
		"Verb, Aorist, passive depOnent, Participle, Nominative, Plural, Masculine",
	"V-AAM-2P":
		"Verb, Aorist, Active, iMperative, second, Plural",
	"T-GSN": "definite article, Genitive, Singular, Neuter",
	"V-2AAS-2P":
		"Verb, second Aorist, Active, Subjunctive, second, Plural",
	"P-1DS": "Personal pronoun, first, Dative, Singular",
	"P-1NS-K":
		"Personal pronoun, first, Nominative, Singular, Kai",
	"V-AAS-1S":
		"Verb, Aorist, Active, Subjunctive, first, Singular",
	"V-AAP-NPM":
		"Verb, Aorist, Active, Participle, Nominative, Plural, Masculine",
	"V-AOI-3P":
		"Verb, Aorist, passive depOnent, Indicative, third, Plural",
	"R-ASM":
		"Relative pronoun, Accusative, Singular, Masculine",
	"N-NSN": "Noun, Nominative, Singular, Neuter",
	"V-2AAP-NPM":
		"Verb, second Aorist, Active, Participle, Nominative, Plural, Masculine",
	"V-2AOI-3P":
		"Verb, second Aorist, passive depOnent, Indicative, third, Plural",
	"A-ASF": "Adjective, Accusative, Singular, Feminine",
	"V-AAI-3P":
		"Verb, Aorist, Active, Indicative, third, Plural",
	"N-APN": "Noun, Accusative, Plural, Neuter",
	"V-APP-NPM":
		"Verb, Aorist, Passive, Participle, Nominative, Plural, Masculine",
	"A-GSF": "Adjective, Genitive, Singular, Feminine",
	"V-AAP-GPM":
		"Verb, Aorist, Active, Participle, Genitive, Plural, Masculine",
	"V-PEI-3S":
		"Verb, Present, Either middle or passive, Indicative, third, Singular",
	"V-2AAM-2S":
		"Verb, second Aorist, Active, iMperative, second, Singular",
	"V-PAM-2S":
		"Verb, Present, Active, iMperative, second, Singular",
	PRT: "PaRTicle, disjunctive particle",
	"V-2AAS-1S":
		"Verb, second Aorist, Active, Subjunctive, first, Singular",
	"P-2DS": "Personal pronoun, second, Dative, Singular",
	"V-PAN": "Verb, Present, Active, iNfinitive",
	"P-ASN": "Personal pronoun, Accusative, Singular, Neuter",
	"V-AAI-1S":
		"Verb, Aorist, Active, Indicative, first, Singular",
	"N-GPM": "Noun, Genitive, Plural, Masculine",
	"A-DPN": "Adjective, Dative, Plural, Neuter",
	"T-DPN": "definite article, Dative, Plural, Neuter",
	"N-DPN": "Noun, Dative, Plural, Neuter",
	"A-GSM": "Adjective, Genitive, Singular, Masculine",
	"N-NSF-P": "Noun, Nominative, Singular, Feminine, Person",
	"T-APN": "definite article, Accusative, Plural, Neuter",
	"V-APN": "Verb, Aorist, Passive, iNfinitive",
	"V-PAI-3P":
		"Verb, Present, Active, Indicative, third, Plural",
	"V-AAP-GSM":
		"Verb, Aorist, Active, Participle, Genitive, Singular, Masculine",
	"V-PNM-2S":
		"Verb, Present, middle or passive depoNent, iMperative, second, Singular",
	"V-RAI-3P":
		"Verb, peRfect, Active, Indicative, third, Plural",
	"V-PPP-ASF":
		"Verb, Present, Passive, Participle, Accusative, Singular, Feminine",
	"N-NSM-LG":
		"Noun, Nominative, Singular, Masculine, Location Gentilic",
	"V-FPI-3S":
		"Verb, Future, Passive, Indicative, third, Singular",
	"T-DPF": "definite article, Dative, Plural, Feminine",
	"D-DPF":
		"Demonstrative pronoun, Dative, Plural, Feminine",
	"V-PNI-3S":
		"Verb, Present, middle or passive depoNent, Indicative, third, Singular",
	"A-DSF": "Adjective, Dative, Singular, Feminine",
	"V-PAM-2P":
		"Verb, Present, Active, iMperative, second, Plural",
	"V-RAI-3S":
		"Verb, peRfect, Active, Indicative, third, Singular",
	"D-NSM":
		"Demonstrative pronoun, Nominative, Singular, Masculine",
	"A-APF": "Adjective, Accusative, Plural, Feminine",
	"T-APF": "definite article, Accusative, Plural, Feminine",
	"N-APF": "Noun, Accusative, Plural, Feminine",
	"P-ASM":
		"Personal pronoun, Accusative, Singular, Masculine",
	"N-NPN-L": "Noun, Nominative, Plural, Neuter, Location",
	"V-IPI-3P":
		"Verb, Imperfect, Passive, Indicative, third, Plural",
	"N-DSM-L": "Noun, Dative, Singular, Masculine, Location",
	"N-DSM": "Noun, Dative, Singular, Masculine",
	"V-PMP-NPM":
		"Verb, Present, Middle, Participle, Nominative, Plural, Masculine",
	"N-GPM-T": "Noun, Genitive, Plural, Masculine, Title",
	"V-PNP-APM":
		"Verb, Present, middle or passive depoNent, Participle, Accusative, Plural, Masculine",
	"P-DPM": "Personal pronoun, Dative, Plural, Masculine",
	"N-VPN": "Noun, Vocative, Plural, Neuter",
	"I-NSM":
		"Interrogative pronoun, Nominative, Singular, Masculine",
	"P-2DP": "Personal pronoun, second, Dative, Plural",
	"V-PAP-GSF":
		"Verb, Present, Active, Participle, Genitive, Singular, Feminine",
	"A-ASM": "Adjective, Accusative, Singular, Masculine",
	"V-AAS-2P":
		"Verb, Aorist, Active, Subjunctive, second, Plural",
	"F-2DPM":
		"reFlexive pronoun, second, Dative, Plural, Masculine",
	"V-PAI-1P":
		"Verb, Present, Active, Indicative, first, Plural",
	"V-PAI-1S":
		"Verb, Present, Active, Indicative, first, Singular",
	"D-GPM":
		"Demonstrative pronoun, Genitive, Plural, Masculine",
	"T-GPN": "definite article, Genitive, Plural, Neuter",
	"N-GPN": "Noun, Genitive, Plural, Neuter",
	"V-PAP-NSN":
		"Verb, Present, Active, Participle, Nominative, Singular, Neuter",
	"P-1NS": "Personal pronoun, first, Nominative, Singular",
	"P-2AP": "Personal pronoun, second, Accusative, Plural",
	"N-DSN": "Noun, Dative, Singular, Neuter",
	"A-NSM-C":
		"Adjective, Nominative, Singular, Masculine, Comparative",
	"A-DSN": "Adjective, Dative, Singular, Neuter",
	"V-PNI-2S":
		"Verb, Present, middle or passive depoNent, Indicative, second, Singular",
	"P-1AS": "Personal pronoun, first, Accusative, Singular",
	"V-AOP-NSM":
		"Verb, Aorist, passive depOnent, Participle, Nominative, Singular, Masculine",
	"P-1DP": "Personal pronoun, first, Dative, Plural",
	"V-API-3P":
		"Verb, Aorist, Passive, Indicative, third, Plural",
	"V-PAP-ASN":
		"Verb, Present, Active, Participle, Accusative, Singular, Neuter",
	"V-PNP-ASN":
		"Verb, Present, middle or passive depoNent, Participle, Accusative, Singular, Neuter",
	"R-DSM": "Relative pronoun, Dative, Singular, Masculine",
	"A-APF-NUI":
		"Adjective, Accusative, Plural, Feminine, NUmerical Indiclinable (A)",
	"A-ASN-C":
		"Adjective, Accusative, Singular, Neuter, Comparative",
	"D-NPM":
		"Demonstrative pronoun, Nominative, Plural, Masculine",
	"V-2ADS-3P":
		"Verb, second Aorist, middle Deponent, Subjunctive, third, Plural",
	"A-DSM": "Adjective, Dative, Singular, Masculine",
	"V-PNP-DSN":
		"Verb, Present, middle or passive depoNent, Participle, Dative, Singular, Neuter",
	"F-2ASM":
		"reFlexive pronoun, second, Accusative, Singular, Masculine",
	"V-FNI-3S":
		"Verb, Future, middle or passive depoNent, Indicative, third, Singular",
	"P-2AS": "Personal pronoun, second, Accusative, Singular",
	"V-AAS-2S":
		"Verb, Aorist, Active, Subjunctive, second, Singular",
	"A-ASN": "Adjective, Accusative, Singular, Neuter",
	"P-GPF": "Personal pronoun, Genitive, Plural, Feminine",
	"A-APN": "Adjective, Accusative, Plural, Neuter",
	"V-FAI-1S":
		"Verb, Future, Active, Indicative, first, Singular",
	"N-VSM-T": "Noun, Vocative, Singular, Masculine, Title",
	"V-IAI-3P":
		"Verb, Imperfect, Active, Indicative, third, Plural",
	"N-GSM-PG":
		"Noun, Genitive, Singular, Masculine, Person Gentilic",
	"V-PNP-DPM":
		"Verb, Present, middle or passive depoNent, Participle, Dative, Plural, Masculine",
	"V-ADI-3S":
		"Verb, Aorist, middle Deponent, Indicative, third, Singular",
	"A-APM-NUI":
		"Adjective, Accusative, Plural, Masculine, NUmerical Indiclinable (A)",
	"V-PPP-ASM":
		"Verb, Present, Passive, Participle, Accusative, Singular, Masculine",
	"V-PAP-APM":
		"Verb, Present, Active, Participle, Accusative, Plural, Masculine",
	"T-DSN": "definite article, Dative, Singular, Neuter",
	"A-DPF": "Adjective, Dative, Plural, Feminine",
	"V-PPP-APM":
		"Verb, Present, Passive, Participle, Accusative, Plural, Masculine",
	"A-NPM": "Adjective, Nominative, Plural, Masculine",
	"N-GPN-L": "Noun, Genitive, Plural, Neuter, Location",
	"P-NPM":
		"Personal pronoun, Nominative, Plural, Masculine",
	"V-FPI-3P":
		"Verb, Future, Passive, Indicative, third, Plural",
	"V-FDI-3P":
		"Verb, Future, middle Deponent, Indicative, third, Plural",
	"V-RPP-NPM":
		"Verb, peRfect, Passive, Participle, Nominative, Plural, Masculine",
	"V-PAI-2P":
		"Verb, Present, Active, Indicative, second, Plural",
	"V-AAS-3P":
		"Verb, Aorist, Active, Subjunctive, third, Plural",
	"V-2AAS-3P":
		"Verb, second Aorist, Active, Subjunctive, third, Plural",
	"P-2GP": "Personal pronoun, second, Genitive, Plural",
	"V-PNP-NPM":
		"Verb, Present, middle or passive depoNent, Participle, Nominative, Plural, Masculine",
	"V-PNM-2P":
		"Verb, Present, middle or passive depoNent, iMperative, second, Plural",
	"P-2NP": "Personal pronoun, second, Nominative, Plural",
	"I-DSN":
		"Interrogative pronoun, Dative, Singular, Neuter",
	"V-PPN": "Verb, Present, Passive, iNfinitive",
	"V-2APN": "Verb, second Aorist, Passive, iNfinitive",
	"V-PNP-NSF":
		"Verb, Present, middle or passive depoNent, Participle, Nominative, Singular, Feminine",
	"CONJ-N": "CONJunction, Negative",
	"A-DPM": "Adjective, Dative, Plural, Masculine",
	"V-AAM-3S":
		"Verb, Aorist, Active, iMperative, third, Singular",
	"V-2AAI-1S":
		"Verb, second Aorist, Active, Indicative, first, Singular",
	HEB: "HEBrew transliterated word (indeclinable)",
	"V-2AAS-3S":
		"Verb, second Aorist, Active, Subjunctive, third, Singular",
	"A-NPN": "Adjective, Nominative, Plural, Neuter",
	"V-2ADS-3S":
		"Verb, second Aorist, middle Deponent, Subjunctive, third, Singular",
	"V-AAS-3S":
		"Verb, Aorist, Active, Subjunctive, third, Singular",
	"D-GPF":
		"Demonstrative pronoun, Genitive, Plural, Feminine",
	"A-GPF": "Adjective, Genitive, Plural, Feminine",
	"V-AAI-2P":
		"Verb, Aorist, Active, Indicative, second, Plural",
	"V-PMP-NSM":
		"Verb, Present, Middle, Participle, Nominative, Singular, Masculine",
	ARAM: "ARAMaic transliterated word (indeclinable)",
	"A-VSM": "Adjective, Vocative, Singular, Masculine",
	"N-ASF-T": "Noun, Accusative, Singular, Feminine, Title",
	"V-PAS-2S":
		"Verb, Present, Active, Subjunctive, second, Singular",
	"ADV-K": "ADVerb, Kai",
	"V-APS-2S":
		"Verb, Aorist, Passive, Subjunctive, second, Singular",
	"X-ASN":
		"indefinite pronoun, Accusative, Singular, Neuter",
	"V-2APM-2S":
		"Verb, second Aorist, Passive, iMperative, second, Singular",
	"R-GSN": "Relative pronoun, Genitive, Singular, Neuter",
	"V-FPI-2S":
		"Verb, Future, Passive, Indicative, second, Singular",
	"V-2AAS-2S":
		"Verb, second Aorist, Active, Subjunctive, second, Singular",
	"V-2AMS-3S":
		"Verb, second Aorist, Middle, Subjunctive, third, Singular",
	"V-AAM-2S":
		"Verb, Aorist, Active, iMperative, second, Singular",
	"V-2AAM-3S":
		"Verb, second Aorist, Active, iMperative, third, Singular",
	"V-RPP-ASF":
		"Verb, peRfect, Passive, Participle, Accusative, Singular, Feminine",
	"V-PAM-3S":
		"Verb, Present, Active, iMperative, third, Singular",
	"D-GPN":
		"Demonstrative pronoun, Genitive, Plural, Neuter",
	"V-PAP-DSM":
		"Verb, Present, Active, Participle, Dative, Singular, Masculine",
	"A-APN-NUI":
		"Adjective, Accusative, Plural, Neuter, NUmerical Indiclinable (A)",
	"V-PAP-ASM":
		"Verb, Present, Active, Participle, Accusative, Singular, Masculine",
	"V-AMN": "Verb, Aorist, Middle, iNfinitive",
	"V-2APS-2S":
		"Verb, second Aorist, Passive, Subjunctive, second, Singular",
	"V-PAP-GPM":
		"Verb, Present, Active, Participle, Genitive, Plural, Masculine",
	"V-2ADS-2P":
		"Verb, second Aorist, middle Deponent, Subjunctive, second, Plural",
	"I-ASM":
		"Interrogative pronoun, Accusative, Singular, Masculine",
	"V-ADS-2P":
		"Verb, Aorist, middle Deponent, Subjunctive, second, Plural",
	"I-ASN":
		"Interrogative pronoun, Accusative, Singular, Neuter",
	"V-FDI-2P":
		"Verb, Future, middle Deponent, Indicative, second, Plural",
	"V-APS-3P":
		"Verb, Aorist, Passive, Subjunctive, third, Plural",
	"V-PAS-3S":
		"Verb, Present, Active, Subjunctive, third, Singular",
	"V-PNS-2P":
		"Verb, Present, middle or passive depoNent, Subjunctive, second, Plural",
	"V-RAP-NPM":
		"Verb, peRfect, Active, Participle, Nominative, Plural, Masculine",
	"V-PNN":
		"Verb, Present, middle or passive depoNent, iNfinitive",
	"V-2APS-3P":
		"Verb, second Aorist, Passive, Subjunctive, third, Plural",
	"V-PNS-2S":
		"Verb, Present, middle or passive depoNent, Subjunctive, second, Singular",
	"V-ADM-2S":
		"Verb, Aorist, middle Deponent, iMperative, second, Singular",
	"V-APS-2P":
		"Verb, Aorist, Passive, Subjunctive, second, Plural",
	"R-GPN": "Relative pronoun, Genitive, Plural, Neuter",
	"N-VSM": "Noun, Vocative, Singular, Masculine",
	"T-VSM":
		"definite article, Vocative, Singular, Masculine",
	"V-APM-3S":
		"Verb, Aorist, Passive, iMperative, third, Singular",
	"V-AOM-3S":
		"Verb, Aorist, passive depOnent, iMperative, third, Singular",
	"P-1NP": "Personal pronoun, first, Nominative, Plural",
	"V-AAI-1P":
		"Verb, Aorist, Active, Indicative, first, Plural",
	"P-1AP": "Personal pronoun, first, Accusative, Plural",
	"V-PAS-2P":
		"Verb, Present, Active, Subjunctive, second, Plural",
	"V-AMM-2S":
		"Verb, Aorist, Middle, iMperative, second, Singular",
	"Q-NSN":
		"correlative or interrogative pronoun, Nominative, Singular, Neuter",
	"V-PNI-2P":
		"Verb, Present, middle or passive depoNent, Indicative, second, Plural",
	"D-ASN":
		"Demonstrative pronoun, Accusative, Singular, Neuter",
	"V-AMS-2P":
		"Verb, Aorist, Middle, Subjunctive, second, Plural",
	"A-NSN-C":
		"Adjective, Nominative, Singular, Neuter, Comparative",
	"P-APN": "Personal pronoun, Accusative, Plural, Neuter",
	"P-GPN": "Personal pronoun, Genitive, Plural, Neuter",
	"V-2AAM-2P":
		"Verb, second Aorist, Active, iMperative, second, Plural",
	"V-2AMI-3S":
		"Verb, second Aorist, Middle, Indicative, third, Singular",
	"A-VPM": "Adjective, Vocative, Plural, Masculine",
	"V-AAS-1P":
		"Verb, Aorist, Active, Subjunctive, first, Plural",
	"V-2AAS-1P":
		"Verb, second Aorist, Active, Subjunctive, first, Plural",
	"V-2AMS-1P":
		"Verb, second Aorist, Middle, Subjunctive, first, Plural",
	"T-NPN": "definite article, Nominative, Plural, Neuter",
	"N-NPN": "Noun, Nominative, Plural, Neuter",
	"A-GPN": "Adjective, Genitive, Plural, Neuter",
	"D-NPN":
		"Demonstrative pronoun, Nominative, Plural, Neuter",
	"F-3GSF":
		"reFlexive pronoun, third, Genitive, Singular, Feminine",
	"R-DSN": "Relative pronoun, Dative, Singular, Neuter",
	"V-FPI-2P":
		"Verb, Future, Passive, Indicative, second, Plural",
	"S-2SDSM":
		"poSsessive pronoun, second, Singular, Dative, Singular, Masculine",
	"V-2APP-NPM":
		"Verb, second Aorist, Passive, Participle, Nominative, Plural, Masculine",
	"V-FAI-2P":
		"Verb, Future, Active, Indicative, second, Plural",
	"V-2FPI-3S":
		"Verb, second Future, Passive, Indicative, third, Singular",
	"V-RAI-2P":
		"Verb, peRfect, Active, Indicative, second, Plural",
	"Q-DSN":
		"correlative or interrogative pronoun, Dative, Singular, Neuter",
	"V-PAP-DPM":
		"Verb, Present, Active, Participle, Dative, Plural, Masculine",
	"K-APN":
		"correlative pronoun, Accusative, Plural, Neuter",
	"V-PAS-3P":
		"Verb, Present, Active, Subjunctive, third, Plural",
	"V-RPP-NSF":
		"Verb, peRfect, Passive, Participle, Nominative, Singular, Feminine",
	"R-NPM":
		"Relative pronoun, Nominative, Plural, Masculine",
	"V-PNI-3P":
		"Verb, Present, middle or passive depoNent, Indicative, third, Plural",
	"D-DSF":
		"Demonstrative pronoun, Dative, Singular, Feminine",
	"S-2SDSN":
		"poSsessive pronoun, second, Singular, Dative, Singular, Neuter",
	"T-VPM": "definite article, Vocative, Plural, Masculine",
	"V-PNP-VPM":
		"Verb, Present, middle or passive depoNent, Participle, Vocative, Plural, Masculine",
	"D-APM":
		"Demonstrative pronoun, Accusative, Plural, Masculine",
	"V-LPI-3S":
		"Verb, pLuperfect, Passive, Indicative, third, Singular",
	"V-2ADI-3S":
		"Verb, second Aorist, middle Deponent, Indicative, third, Singular",
	"V-2AAP-GSM":
		"Verb, second Aorist, Active, Participle, Genitive, Singular, Masculine",
	"V-APM-2S":
		"Verb, Aorist, Passive, iMperative, second, Singular",
	"R-ASN": "Relative pronoun, Accusative, Singular, Neuter",
	"F-1ASM":
		"reFlexive pronoun, first, Accusative, Singular, Masculine",
	"D-DSM":
		"Demonstrative pronoun, Dative, Singular, Masculine",
	"V-AOM-2S":
		"Verb, Aorist, passive depOnent, iMperative, second, Singular",
	"D-ASF":
		"Demonstrative pronoun, Accusative, Singular, Feminine",
	"V-AAI-2S":
		"Verb, Aorist, Active, Indicative, second, Singular",
	"V-PAP-ASF":
		"Verb, Present, Active, Participle, Accusative, Singular, Feminine",
	"V-2ADP-GSF":
		"Verb, second Aorist, middle Deponent, Participle, Genitive, Singular, Feminine",
	"F-3GPM":
		"reFlexive pronoun, third, Genitive, Plural, Masculine",
	"V-2AAP-DSM":
		"Verb, second Aorist, Active, Participle, Dative, Singular, Masculine",
	"V-PMI-1P":
		"Verb, Present, Middle, Indicative, first, Plural",
	"N-GPM-LG":
		"Noun, Genitive, Plural, Masculine, Location Gentilic",
	"A-NPM-NUI":
		"Adjective, Nominative, Plural, Masculine, NUmerical Indiclinable (A)",
	"X-ASM":
		"indefinite pronoun, Accusative, Singular, Masculine",
	"D-GSF":
		"Demonstrative pronoun, Genitive, Singular, Feminine",
	"I-NSN":
		"Interrogative pronoun, Nominative, Singular, Neuter",
	"V-2AAI-2S":
		"Verb, second Aorist, Active, Indicative, second, Singular",
	"A-GPM": "Adjective, Genitive, Plural, Masculine",
	"V-PPP-NSF":
		"Verb, Present, Passive, Participle, Nominative, Singular, Feminine",
	"V-PNP-GPM":
		"Verb, Present, middle or passive depoNent, Participle, Genitive, Plural, Masculine",
	"V-RPP-ASM":
		"Verb, peRfect, Passive, Participle, Accusative, Singular, Masculine",
	"N-VSN": "Noun, Vocative, Singular, Neuter",
	"V-PPI-3P":
		"Verb, Present, Passive, Indicative, third, Plural",
	"X-NPM":
		"indefinite pronoun, Nominative, Plural, Masculine",
	"F-3DPM":
		"reFlexive pronoun, third, Dative, Plural, Masculine",
	"V-RAS-2P":
		"Verb, peRfect, Active, Subjunctive, second, Plural",
	"V-2AAP-ASM":
		"Verb, second Aorist, Active, Participle, Accusative, Singular, Masculine",
	"V-PNP-ASM":
		"Verb, Present, middle or passive depoNent, Participle, Accusative, Singular, Masculine",
	"V-PNP-GSM":
		"Verb, Present, middle or passive depoNent, Participle, Genitive, Singular, Masculine",
	"V-INI-3P":
		"Verb, Imperfect, middle or passive depoNent, Indicative, third, Plural",
	"N-NPM-T": "Noun, Nominative, Plural, Masculine, Title",
	"K-ASN":
		"correlative pronoun, Accusative, Singular, Neuter",
	"P-GSN": "Personal pronoun, Genitive, Singular, Neuter",
	"V-2AAP-NSF":
		"Verb, second Aorist, Active, Participle, Nominative, Singular, Feminine",
	"F-3DSF":
		"reFlexive pronoun, third, Dative, Singular, Feminine",
	"V-AMS-1S":
		"Verb, Aorist, Middle, Subjunctive, first, Singular",
	"V-FPI-1S":
		"Verb, Future, Passive, Indicative, first, Singular",
	"V-2APP-NSM":
		"Verb, second Aorist, Passive, Participle, Nominative, Singular, Masculine",
	"D-NSF":
		"Demonstrative pronoun, Nominative, Singular, Feminine",
	"V-PNI-1S":
		"Verb, Present, middle or passive depoNent, Indicative, first, Singular",
	"V-APP-GSN":
		"Verb, Aorist, Passive, Participle, Genitive, Singular, Neuter",
	"V-PAP-NPN":
		"Verb, Present, Active, Participle, Nominative, Plural, Neuter",
	"V-AOM-2P":
		"Verb, Aorist, passive depOnent, iMperative, second, Plural",
	"V-ADP-NSM":
		"Verb, Aorist, middle Deponent, Participle, Nominative, Singular, Masculine",
	"A-GPM-NUI":
		"Adjective, Genitive, Plural, Masculine, NUmerical Indiclinable (A)",
	"V-2RAP-APN":
		"Verb, second peRfect, Active, Participle, Accusative, Plural, Neuter",
	"V-2AAI-2P":
		"Verb, second Aorist, Active, Indicative, second, Plural",
	"R-ASF":
		"Relative pronoun, Accusative, Singular, Feminine",
	"V-ADM-2P":
		"Verb, Aorist, middle Deponent, iMperative, second, Plural",
	"V-2APM-3S":
		"Verb, second Aorist, Passive, iMperative, third, Singular",
	"V-ADS-3S":
		"Verb, Aorist, middle Deponent, Subjunctive, third, Singular",
	"V-PPP-NPM":
		"Verb, Present, Passive, Participle, Nominative, Plural, Masculine",
	"V-RPP-NSN":
		"Verb, peRfect, Passive, Participle, Nominative, Singular, Neuter",
	"N-DSF-T": "Noun, Dative, Singular, Feminine, Title",
	"A-NPN-NUI":
		"Adjective, Nominative, Plural, Neuter, NUmerical Indiclinable (A)",
	"V-RPP-NPF":
		"Verb, peRfect, Passive, Participle, Nominative, Plural, Feminine",
	"V-FDI-1S":
		"Verb, Future, middle Deponent, Indicative, first, Singular",
	"V-AAP-ASM":
		"Verb, Aorist, Active, Participle, Accusative, Singular, Masculine",
	"A-DPM-NUI":
		"Adjective, Dative, Plural, Masculine, NUmerical Indiclinable (A)",
	"R-APN": "Relative pronoun, Accusative, Plural, Neuter",
	"V-ADN": "Verb, Aorist, middle Deponent, iNfinitive",
	"A-ASM-C":
		"Adjective, Accusative, Singular, Masculine, Comparative",
	"V-PNP-DPN":
		"Verb, Present, middle or passive depoNent, Participle, Dative, Plural, Neuter",
	"R-NPN": "Relative pronoun, Nominative, Plural, Neuter",
	"V-ADI-2P":
		"Verb, Aorist, middle Deponent, Indicative, second, Plural",
	"V-AMI-2P":
		"Verb, Aorist, Middle, Indicative, second, Plural",
	"R-DPF": "Relative pronoun, Dative, Plural, Feminine",
	"A-NPF-S":
		"Adjective, Nominative, Plural, Feminine, Superlative",
	"V-2ADP-NPF":
		"Verb, second Aorist, middle Deponent, Participle, Nominative, Plural, Feminine",
	"V-FDI-2S":
		"Verb, Future, middle Deponent, Indicative, second, Singular",
	"N-DPN-L": "Noun, Dative, Plural, Neuter, Location",
	"V-PMI-1S":
		"Verb, Present, Middle, Indicative, first, Singular",
	"X-NSM":
		"indefinite pronoun, Nominative, Singular, Masculine",
	"V-PNS-3S":
		"Verb, Present, middle or passive depoNent, Subjunctive, third, Singular",
	"V-PAP-VPM":
		"Verb, Present, Active, Participle, Vocative, Plural, Masculine",
	"V-RPP-VPM":
		"Verb, peRfect, Passive, Participle, Vocative, Plural, Masculine",
	"V-ADI-3P":
		"Verb, Aorist, middle Deponent, Indicative, third, Plural",
	"V-LAI-2P":
		"Verb, pLuperfect, Active, Indicative, second, Plural",
	"V-PPP-ASN":
		"Verb, Present, Passive, Participle, Accusative, Singular, Neuter",
	"V-IMI-3P":
		"Verb, Imperfect, Middle, Indicative, third, Plural",
	"N-DSM-T": "Noun, Dative, Singular, Masculine, Title",
	"V-RAP-NSM":
		"Verb, peRfect, Active, Participle, Nominative, Singular, Masculine",
	"V-APP-NSF":
		"Verb, Aorist, Passive, Participle, Nominative, Singular, Feminine",
	"F-3ASM":
		"reFlexive pronoun, third, Accusative, Singular, Masculine",
	"I-DSM":
		"Interrogative pronoun, Dative, Singular, Masculine",
	"N-NPM-LG":
		"Noun, Nominative, Plural, Masculine, Location Gentilic",
	"V-FMI-3P":
		"Verb, Future, Middle, Indicative, third, Plural",
	"V-2AAP-NSN":
		"Verb, second Aorist, Active, Participle, Nominative, Singular, Neuter",
	"F-3GSN":
		"reFlexive pronoun, third, Genitive, Singular, Neuter",
	"A-APN-C":
		"Adjective, Accusative, Plural, Neuter, Comparative",
	"V-2AAP-NPN":
		"Verb, second Aorist, Active, Participle, Nominative, Plural, Neuter",
	"D-GSM":
		"Demonstrative pronoun, Genitive, Singular, Masculine",
	"A-NPN-C":
		"Adjective, Nominative, Plural, Neuter, Comparative",
	"V-LAI-3P":
		"Verb, pLuperfect, Active, Indicative, third, Plural",
	"I-NSF":
		"Interrogative pronoun, Nominative, Singular, Feminine",
	"I-NPM":
		"Interrogative pronoun, Nominative, Plural, Masculine",
	"V-LAI-3S":
		"Verb, pLuperfect, Active, Indicative, third, Singular",
	"D-DPM":
		"Demonstrative pronoun, Dative, Plural, Masculine",
	"V-2RPP-ASN":
		"Verb, second peRfect, Passive, Participle, Accusative, Singular, Neuter",
	"F-3DSM":
		"reFlexive pronoun, third, Dative, Singular, Masculine",
	"V-AAP-DSM":
		"Verb, Aorist, Active, Participle, Dative, Singular, Masculine",
	"V-RPP-APN":
		"Verb, peRfect, Passive, Participle, Accusative, Plural, Neuter",
	"V-RPP-DSM":
		"Verb, peRfect, Passive, Participle, Dative, Singular, Masculine",
	"D-ASM":
		"Demonstrative pronoun, Accusative, Singular, Masculine",
	"V-APP-DSF":
		"Verb, Aorist, Passive, Participle, Dative, Singular, Feminine",
	"V-2AAP-DSF":
		"Verb, second Aorist, Active, Participle, Dative, Singular, Feminine",
	"D-APF":
		"Demonstrative pronoun, Accusative, Plural, Feminine",
	"V-2ADP-DPN":
		"Verb, second Aorist, middle Deponent, Participle, Dative, Plural, Neuter",
	"V-AMS-3S":
		"Verb, Aorist, Middle, Subjunctive, third, Singular",
	"V-AMP-NSM":
		"Verb, Aorist, Middle, Participle, Nominative, Singular, Masculine",
	"V-2AAP-GPM":
		"Verb, second Aorist, Active, Participle, Genitive, Plural, Masculine",
	"V-AMS-3P":
		"Verb, Aorist, Middle, Subjunctive, third, Plural",
	"K-NPM":
		"correlative pronoun, Nominative, Plural, Masculine",
	"V-PMI-3P":
		"Verb, Present, Middle, Indicative, third, Plural",
	"N-VPM": "Noun, Vocative, Plural, Masculine",
	"V-PNP-NSN":
		"Verb, Present, middle or passive depoNent, Participle, Nominative, Singular, Neuter",
	"V-RAI-2S":
		"Verb, peRfect, Active, Indicative, second, Singular",
	"V-FNI-3P":
		"Verb, Future, middle or passive depoNent, Indicative, third, Plural",
	"V-PNP-NPN":
		"Verb, Present, middle or passive depoNent, Participle, Nominative, Plural, Neuter",
	"A-NSF-LG":
		"Adjective, Nominative, Singular, Feminine, Location Gentilic",
	"V-2API-1S":
		"Verb, second Aorist, Passive, Indicative, first, Singular",
	"V-PAP-GPN":
		"Verb, Present, Active, Participle, Genitive, Plural, Neuter",
	"Q-APM":
		"correlative or interrogative pronoun, Accusative, Plural, Masculine",
	"Q-APF":
		"correlative or interrogative pronoun, Accusative, Plural, Feminine",
	"V-AMI-3S":
		"Verb, Aorist, Middle, Indicative, third, Singular",
	"V-2AMP-NSM":
		"Verb, second Aorist, Middle, Participle, Nominative, Singular, Masculine",
	"V-ADM-3S":
		"Verb, Aorist, middle Deponent, iMperative, third, Singular",
	"V-RAP-GPM":
		"Verb, peRfect, Active, Participle, Genitive, Plural, Masculine",
	"V-ADS-3P":
		"Verb, Aorist, middle Deponent, Subjunctive, third, Plural",
	"V-APM-2P":
		"Verb, Aorist, Passive, iMperative, second, Plural",
	"A-VSF": "Adjective, Vocative, Singular, Feminine",
	"V-RPP-VSF":
		"Verb, peRfect, Passive, Participle, Vocative, Singular, Feminine",
	"PRT-I": "PaRTicle, Interrogative",
	"V-AOI-1P":
		"Verb, Aorist, passive depOnent, Indicative, first, Plural",
	"D-DSN":
		"Demonstrative pronoun, Dative, Singular, Neuter",
	"V-PPP-GPM":
		"Verb, Present, Passive, Participle, Genitive, Plural, Masculine",
	"I-GPM":
		"Interrogative pronoun, Genitive, Plural, Masculine",
	"V-2APS-2P":
		"Verb, second Aorist, Passive, Subjunctive, second, Plural",
	"X-DSM":
		"indefinite pronoun, Dative, Singular, Masculine",
	"P-DSN": "Personal pronoun, Dative, Singular, Neuter",
	"A-DPN-NUI":
		"Adjective, Dative, Plural, Neuter, NUmerical Indiclinable (A)",
	"V-RPP-DPN":
		"Verb, peRfect, Passive, Participle, Dative, Plural, Neuter",
	"V-RPP-NPN":
		"Verb, peRfect, Passive, Participle, Nominative, Plural, Neuter",
	"S-1SASN":
		"poSsessive pronoun, first, Singular, Accusative, Singular, Neuter",
	"A-GPN-NUI":
		"Adjective, Genitive, Plural, Neuter, NUmerical Indiclinable (A)",
	"V-AMP-GSM":
		"Verb, Aorist, Middle, Participle, Genitive, Singular, Masculine",
	"V-2ADP-APN":
		"Verb, second Aorist, middle Deponent, Participle, Accusative, Plural, Neuter",
	"D-GSN":
		"Demonstrative pronoun, Genitive, Singular, Neuter",
	"R-DPM": "Relative pronoun, Dative, Plural, Masculine",
	"F-3APM":
		"reFlexive pronoun, third, Accusative, Plural, Masculine",
	"P-DPN": "Personal pronoun, Dative, Plural, Neuter",
	"I-APF":
		"Interrogative pronoun, Accusative, Plural, Feminine",
	"V-PAP-APN":
		"Verb, Present, Active, Participle, Accusative, Plural, Neuter",
	"V-RAP-APM":
		"Verb, peRfect, Active, Participle, Accusative, Plural, Masculine",
	"V-AAP-DPM":
		"Verb, Aorist, Active, Participle, Dative, Plural, Masculine",
	"S-2SASN":
		"poSsessive pronoun, second, Singular, Accusative, Singular, Neuter",
	"S-1SDPN":
		"poSsessive pronoun, first, Singular, Dative, Plural, Neuter",
	"V-PMI-2P":
		"Verb, Present, Middle, Indicative, second, Plural",
	"V-PNI-1P":
		"Verb, Present, middle or passive depoNent, Indicative, first, Plural",
	"S-1SNSN":
		"poSsessive pronoun, first, Singular, Nominative, Singular, Neuter",
	"V-2ADN":
		"Verb, second Aorist, middle Deponent, iNfinitive",
	"N-GPF-L": "Noun, Genitive, Plural, Feminine, Location",
	"A-NSM-S":
		"Adjective, Nominative, Singular, Masculine, Superlative",
	"V-RPP-NSM":
		"Verb, peRfect, Passive, Participle, Nominative, Singular, Masculine",
	"V-AMI-2S":
		"Verb, Aorist, Middle, Indicative, second, Singular",
	"I-DSF":
		"Interrogative pronoun, Dative, Singular, Feminine",
	"V-RAI-1P":
		"Verb, peRfect, Active, Indicative, first, Plural",
	"V-AOI-2P":
		"Verb, Aorist, passive depOnent, Indicative, second, Plural",
	"A-APM-C":
		"Adjective, Accusative, Plural, Masculine, Comparative",
	"V-2FPI-3P":
		"Verb, second Future, Passive, Indicative, third, Plural",
	"V-PAS-1P":
		"Verb, Present, Active, Subjunctive, first, Plural",
	"V-2AOI-3S":
		"Verb, second Aorist, passive depOnent, Indicative, third, Singular",
	"V-PAP-DSN":
		"Verb, Present, Active, Participle, Dative, Singular, Neuter",
	"V-RPP-APM":
		"Verb, peRfect, Passive, Participle, Accusative, Plural, Masculine",
	"V-RPP-DPM":
		"Verb, peRfect, Passive, Participle, Dative, Plural, Masculine",
	"V-RAI-1S":
		"Verb, peRfect, Active, Indicative, first, Singular",
	"K-APM":
		"correlative pronoun, Accusative, Plural, Masculine",
	"R-APM":
		"Relative pronoun, Accusative, Plural, Masculine",
	"V-RMP-ASM":
		"Verb, peRfect, Middle, Participle, Accusative, Singular, Masculine",
	"I-GSM":
		"Interrogative pronoun, Genitive, Singular, Masculine",
	"V-PPI-2P":
		"Verb, Present, Passive, Indicative, second, Plural",
	"V-APP-ASN":
		"Verb, Aorist, Passive, Participle, Accusative, Singular, Neuter",
	"N-APM-T": "Noun, Accusative, Plural, Masculine, Title",
	"V-RPP-GPM":
		"Verb, peRfect, Passive, Participle, Genitive, Plural, Masculine",
	"V-AON": "Verb, Aorist, passive depOnent, iNfinitive",
	"HEB-T": "HEBrew, Title",
	"N-VPM-T": "Noun, Vocative, Plural, Masculine, Title",
	"N-GSF-T": "Noun, Genitive, Singular, Feminine, Title",
	"V-PNP-DSM":
		"Verb, Present, middle or passive depoNent, Participle, Dative, Singular, Masculine",
	"V-PEI-3P":
		"Verb, Present, Either middle or passive, Indicative, third, Plural",
	"V-PEI-2P":
		"Verb, Present, Either middle or passive, Indicative, second, Plural",
	"V-IMI-1P":
		"Verb, Imperfect, Middle, Indicative, first, Plural",
	"T-VSF": "definite article, Vocative, Singular, Feminine",
	"V-PAP-VSF":
		"Verb, Present, Active, Participle, Vocative, Singular, Feminine",
	"S-2SGSF":
		"poSsessive pronoun, second, Singular, Genitive, Singular, Feminine",
	"V-PPM-2P":
		"Verb, Present, Passive, iMperative, second, Plural",
	"C-APM":
		"reCiprocal pronoun, Accusative, Plural, Masculine",
	"V-2RAP-ASN":
		"Verb, second peRfect, Active, Participle, Accusative, Singular, Neuter",
	"V-PAM-3P":
		"Verb, Present, Active, iMperative, third, Plural",
	"V-PAP-DPF":
		"Verb, Present, Active, Participle, Dative, Plural, Feminine",
	"K-NSF":
		"correlative pronoun, Nominative, Singular, Feminine",
	"D-NPF":
		"Demonstrative pronoun, Nominative, Plural, Feminine",
	"A-NPF-NUI":
		"Adjective, Nominative, Plural, Feminine, NUmerical Indiclinable (A)",
	"V-PAP-NPF":
		"Verb, Present, Active, Participle, Nominative, Plural, Feminine",
	"V-2LAI-3S":
		"Verb, second pLuperfect, Active, Indicative, third, Singular",
	"R-DSF": "Relative pronoun, Dative, Singular, Feminine",
	"V-PAP-DPN":
		"Verb, Present, Active, Participle, Dative, Plural, Neuter",
	"A-DPF-NUI":
		"Adjective, Dative, Plural, Feminine, NUmerical Indiclinable (A)",
	"R-NPF": "Relative pronoun, Nominative, Plural, Feminine",
	"V-2AAP-NPF":
		"Verb, second Aorist, Active, Participle, Nominative, Plural, Feminine",
	"F-3GPF":
		"reFlexive pronoun, third, Genitive, Plural, Feminine",
	"F-2DPF":
		"reFlexive pronoun, second, Dative, Plural, Feminine",
	"V-PNP-GPF":
		"Verb, Present, middle or passive depoNent, Participle, Genitive, Plural, Feminine",
	"V-IAI-2S":
		"Verb, Imperfect, Active, Indicative, second, Singular",
	"V-2RAP-NSM":
		"Verb, second peRfect, Active, Participle, Nominative, Singular, Masculine",
	"V-2LAI-2S":
		"Verb, second pLuperfect, Active, Indicative, second, Singular",
	"V-AMI-1S":
		"Verb, Aorist, Middle, Indicative, first, Singular",
	"C-GPM":
		"reCiprocal pronoun, Genitive, Plural, Masculine",
	"V-IMI-1S":
		"Verb, Imperfect, Middle, Indicative, first, Singular",
	"V-FOI-3P":
		"Verb, Future, passive depOnent, Indicative, third, Plural",
	"V-RPP-ASN":
		"Verb, peRfect, Passive, Participle, Accusative, Singular, Neuter",
	"V-FOI-3S":
		"Verb, Future, passive depOnent, Indicative, third, Singular",
	"V-PPP-GSM":
		"Verb, Present, Passive, Participle, Genitive, Singular, Masculine",
	"V-AMI-3P":
		"Verb, Aorist, Middle, Indicative, third, Plural",
	"V-2ADP-GSM":
		"Verb, second Aorist, middle Deponent, Participle, Genitive, Singular, Masculine",
	"F-2GPM":
		"reFlexive pronoun, second, Genitive, Plural, Masculine",
	"V-PAS-1S":
		"Verb, Present, Active, Subjunctive, first, Singular",
	"N-ASN-L": "Noun, Accusative, Singular, Neuter, Location",
	"V-ADS-1S":
		"Verb, Aorist, middle Deponent, Subjunctive, first, Singular",
	"V-PEM-2P":
		"Verb, Present, Either middle or passive, iMperative, second, Plural",
	"A-GPF-NUI":
		"Adjective, Genitive, Plural, Feminine, NUmerical Indiclinable (A)",
	"V-INI-1S":
		"Verb, Imperfect, middle or passive depoNent, Indicative, first, Singular",
	"V-IMI-2S":
		"Verb, Imperfect, Middle, Indicative, second, Singular",
	"N-GSM-LG":
		"Noun, Genitive, Singular, Masculine, Location Gentilic",
	"V-RAP-GSM":
		"Verb, peRfect, Active, Participle, Genitive, Singular, Masculine",
	"V-RPP-GSM":
		"Verb, peRfect, Passive, Participle, Genitive, Singular, Masculine",
	"Q-APN":
		"correlative or interrogative pronoun, Accusative, Plural, Neuter",
	"N-ASM-LG":
		"Noun, Accusative, Singular, Masculine, Location Gentilic",
	"V-PAP-VSM":
		"Verb, Present, Active, Participle, Vocative, Singular, Masculine",
	"V-FAI-1P":
		"Verb, Future, Active, Indicative, first, Plural",
	"V-FAP-NSM":
		"Verb, Future, Active, Participle, Nominative, Singular, Masculine",
	"A-NUI": "Indeclinable NUmeral (Adjective)",
	"V-RMP-GPM":
		"Verb, peRfect, Middle, Participle, Genitive, Plural, Masculine",
	"N-NSF-LG":
		"Noun, Nominative, Singular, Feminine, Location Gentilic",
	"V-PNP-NPF":
		"Verb, Present, middle or passive depoNent, Participle, Nominative, Plural, Feminine",
	"R-NSF":
		"Relative pronoun, Nominative, Singular, Feminine",
	"V-API-1P":
		"Verb, Aorist, Passive, Indicative, first, Plural",
	"V-PPI-1S":
		"Verb, Present, Passive, Indicative, first, Singular",
	"A-NSF-C":
		"Adjective, Nominative, Singular, Feminine, Comparative",
	"V-PAP-DSF":
		"Verb, Present, Active, Participle, Dative, Singular, Feminine",
	"V-AOP-NPF":
		"Verb, Aorist, passive depOnent, Participle, Nominative, Plural, Feminine",
	"P-DPF": "Personal pronoun, Dative, Plural, Feminine",
	"V-PMP-GPM":
		"Verb, Present, Middle, Participle, Genitive, Plural, Masculine",
	"A-DPM-PG":
		"Adjective, Dative, Plural, Masculine, Person Gentilic",
	"V-ADI-1S":
		"Verb, Aorist, middle Deponent, Indicative, first, Singular",
	"N-NPM-L":
		"Noun, Nominative, Plural, Masculine, Location",
	"V-RMP-NSM":
		"Verb, peRfect, Middle, Participle, Nominative, Singular, Masculine",
	"V-AAP-NSN":
		"Verb, Aorist, Active, Participle, Nominative, Singular, Neuter",
	"V-2LAI-3P":
		"Verb, second pLuperfect, Active, Indicative, third, Plural",
	"V-PMP-APF":
		"Verb, Present, Middle, Participle, Accusative, Plural, Feminine",
	"V-PMN": "Verb, Present, Middle, iNfinitive",
	"S-2SNPM":
		"poSsessive pronoun, second, Singular, Nominative, Plural, Masculine",
	"K-ASM":
		"correlative pronoun, Accusative, Singular, Masculine",
	"N-APM-P": "Noun, Accusative, Plural, Masculine, Person",
	"F-3ASF":
		"reFlexive pronoun, third, Accusative, Singular, Feminine",
	"V-PPP-NPN":
		"Verb, Present, Passive, Participle, Nominative, Plural, Neuter",
	"V-2RPP-ASM":
		"Verb, second peRfect, Passive, Participle, Accusative, Singular, Masculine",
	"V-PPS-3S":
		"Verb, Present, Passive, Subjunctive, third, Singular",
	"V-PMS-3S":
		"Verb, Present, Middle, Subjunctive, third, Singular",
	"V-2APS-3S":
		"Verb, second Aorist, Passive, Subjunctive, third, Singular",
	"V-RPM-2S":
		"Verb, peRfect, Passive, iMperative, second, Singular",
	"V-RPN": "Verb, peRfect, Passive, iNfinitive",
	"T-VSN": "definite article, Vocative, Singular, Neuter",
	"A-VSN": "Adjective, Vocative, Singular, Neuter",
	"V-2RAP-NSN":
		"Verb, second peRfect, Active, Participle, Nominative, Singular, Neuter",
	"V-RAP-ASM":
		"Verb, peRfect, Active, Participle, Accusative, Singular, Masculine",
	"S-2SAPM":
		"poSsessive pronoun, second, Singular, Accusative, Plural, Masculine",
	"V-AAP-NSF":
		"Verb, Aorist, Active, Participle, Nominative, Singular, Feminine",
	"V-2AAP-ASF":
		"Verb, second Aorist, Active, Participle, Accusative, Singular, Feminine",
	"V-IMI-3S":
		"Verb, Imperfect, Middle, Indicative, third, Singular",
	"V-AAP-ASF":
		"Verb, Aorist, Active, Participle, Accusative, Singular, Feminine",
	"V-AOP-NSF":
		"Verb, Aorist, passive depOnent, Participle, Nominative, Singular, Feminine",
	"V-RAP-NSF":
		"Verb, peRfect, Active, Participle, Nominative, Singular, Feminine",
	"V-2ADP-GSN":
		"Verb, second Aorist, middle Deponent, Participle, Genitive, Singular, Neuter",
	"V-RMP-APM":
		"Verb, peRfect, Middle, Participle, Accusative, Plural, Masculine",
	"V-2AAP-GSF":
		"Verb, second Aorist, Active, Participle, Genitive, Singular, Feminine",
	"V-ADP-GSF":
		"Verb, Aorist, middle Deponent, Participle, Genitive, Singular, Feminine",
	"V-2ADP-NSM":
		"Verb, second Aorist, middle Deponent, Participle, Nominative, Singular, Masculine",
	"V-AMM-2P":
		"Verb, Aorist, Middle, iMperative, second, Plural",
	"X-APM":
		"indefinite pronoun, Accusative, Plural, Masculine",
	"A-NPM-PG":
		"Adjective, Nominative, Plural, Masculine, Person Gentilic",
	"ADV-N": "ADVerb, Negative",
	"V-2API-3P":
		"Verb, second Aorist, Passive, Indicative, third, Plural",
	"Q-GPF":
		"correlative or interrogative pronoun, Genitive, Plural, Feminine",
	"V-AOS-3S":
		"Verb, Aorist, passive depOnent, Subjunctive, third, Singular",
	"S-1SAPM":
		"poSsessive pronoun, first, Singular, Accusative, Plural, Masculine",
	"V-2RAP-ASF":
		"Verb, second peRfect, Active, Participle, Accusative, Singular, Feminine",
	"V-AMP-NPM":
		"Verb, Aorist, Middle, Participle, Nominative, Plural, Masculine",
	"V-IEI-3S":
		"Verb, Imperfect, Either middle or passive, Indicative, third, Singular",
	"Q-NSM":
		"correlative or interrogative pronoun, Nominative, Singular, Masculine",
	"V-FMI-3S":
		"Verb, Future, Middle, Indicative, third, Singular",
	"V-INI-2P":
		"Verb, Imperfect, middle or passive depoNent, Indicative, second, Plural",
	"V-IAI-1P":
		"Verb, Imperfect, Active, Indicative, first, Plural",
	"C-DPM": "reCiprocal pronoun, Dative, Plural, Masculine",
	"P-NSF":
		"Personal pronoun, Nominative, Singular, Feminine",
	"V-AAO-3S":
		"Verb, Aorist, Active, Optative, third, Singular",
	"V-IPI-3S":
		"Verb, Imperfect, Passive, Indicative, third, Singular",
	"V-ADI-2S":
		"Verb, Aorist, middle Deponent, Indicative, second, Singular",
	"X-GSM":
		"indefinite pronoun, Genitive, Singular, Masculine",
	"N-VSM-L":
		"Noun, Vocative, Singular, Masculine, Location",
	"V-PAP-GSN":
		"Verb, Present, Active, Participle, Genitive, Singular, Neuter",
	"I-NPF":
		"Interrogative pronoun, Nominative, Plural, Feminine",
	"F-2APM":
		"reFlexive pronoun, second, Accusative, Plural, Masculine",
	"V-2FPI-2P":
		"Verb, second Future, Passive, Indicative, second, Plural",
	"V-PNP-APN":
		"Verb, Present, middle or passive depoNent, Participle, Accusative, Plural, Neuter",
	"V-ANI-3P":
		"Verb, Aorist, middle or passive depoNent, Indicative, third, Plural",
	"N-NSN-L": "Noun, Nominative, Singular, Neuter, Location",
	"V-AOS-3P":
		"Verb, Aorist, passive depOnent, Subjunctive, third, Plural",
	"V-PMP-ASM":
		"Verb, Present, Middle, Participle, Accusative, Singular, Masculine",
	"V-RAP-DPM":
		"Verb, peRfect, Active, Participle, Dative, Plural, Masculine",
	"F-3APF":
		"reFlexive pronoun, third, Accusative, Plural, Feminine",
	"V-AAP-NPF":
		"Verb, Aorist, Active, Participle, Nominative, Plural, Feminine",
	"P-APF": "Personal pronoun, Accusative, Plural, Feminine",
	"N-DSF-P": "Noun, Dative, Singular, Feminine, Person",
	"N-DSF-LG":
		"Noun, Dative, Singular, Feminine, Location Gentilic",
	"V-2ADP-DPM":
		"Verb, second Aorist, middle Deponent, Participle, Dative, Plural, Masculine",
	"V-ADP-DPM":
		"Verb, Aorist, middle Deponent, Participle, Dative, Plural, Masculine",
	"V-RPP-GPN":
		"Verb, peRfect, Passive, Participle, Genitive, Plural, Neuter",
	"V-2ADP-NPM":
		"Verb, second Aorist, middle Deponent, Participle, Nominative, Plural, Masculine",
	"P-1DS-K":
		"Personal pronoun, first, Dative, Singular, Kai",
	"V-RAP-DSM":
		"Verb, peRfect, Active, Participle, Dative, Singular, Masculine",
	"R-GPM": "Relative pronoun, Genitive, Plural, Masculine",
	"V-API-2S":
		"Verb, Aorist, Passive, Indicative, second, Singular",
	"V-2FOI-3P":
		"Verb, second Future, passive depOnent, Indicative, third, Plural",
	"V-PAO-3S":
		"Verb, Present, Active, Optative, third, Singular",
	"N-VSF-P": "Noun, Vocative, Singular, Feminine, Person",
	"V-PPP-DSF":
		"Verb, Present, Passive, Participle, Dative, Singular, Feminine",
	"V-2ADO-3S":
		"Verb, second Aorist, middle Deponent, Optative, third, Singular",
	"V-2AMI-3P":
		"Verb, second Aorist, Middle, Indicative, third, Plural",
	"V-APP-APM":
		"Verb, Aorist, Passive, Participle, Accusative, Plural, Masculine",
	"R-DPN": "Relative pronoun, Dative, Plural, Neuter",
	"V-PEN":
		"Verb, Present, Either middle or passive, iNfinitive",
	"F-3GSM":
		"reFlexive pronoun, third, Genitive, Singular, Masculine",
	"V-RPP-DSF":
		"Verb, peRfect, Passive, Participle, Dative, Singular, Feminine",
	"V-APP-GPN":
		"Verb, Aorist, Passive, Participle, Genitive, Plural, Neuter",
	"V-PPP-DPN":
		"Verb, Present, Passive, Participle, Dative, Plural, Neuter",
	"V-IAI-2P":
		"Verb, Imperfect, Active, Indicative, second, Plural",
	"V-2LAI-2P":
		"Verb, second pLuperfect, Active, Indicative, second, Plural",
	"A-GSF-L":
		"Adjective, Genitive, Singular, Feminine, Location",
	"V-APP-GPF":
		"Verb, Aorist, Passive, Participle, Genitive, Plural, Feminine",
	"A-GSF-LG":
		"Adjective, Genitive, Singular, Feminine, Location Gentilic",
	"V-RAP-APN":
		"Verb, peRfect, Active, Participle, Accusative, Plural, Neuter",
	"V-2AAP-APM":
		"Verb, second Aorist, Active, Participle, Accusative, Plural, Masculine",
	"V-2AMN": "Verb, second Aorist, Middle, iNfinitive",
	"V-2RAP-NPM":
		"Verb, second peRfect, Active, Participle, Nominative, Plural, Masculine",
	"I-GSF":
		"Interrogative pronoun, Genitive, Singular, Feminine",
	"V-RPI-3P":
		"Verb, peRfect, Passive, Indicative, third, Plural",
	"V-2RAI-1S":
		"Verb, second peRfect, Active, Indicative, first, Singular",
	"V-AAO-3P":
		"Verb, Aorist, Active, Optative, third, Plural",
	"V-2AOM-2P":
		"Verb, second Aorist, passive depOnent, iMperative, second, Plural",
	"S-2SAPN":
		"poSsessive pronoun, second, Singular, Accusative, Plural, Neuter",
	"V-2FDI-2S":
		"Verb, second Future, middle Deponent, Indicative, second, Singular",
	"V-PPM-2S":
		"Verb, Present, Passive, iMperative, second, Singular",
	"V-PMI-3S":
		"Verb, Present, Middle, Indicative, third, Singular",
	"X-NPF":
		"indefinite pronoun, Nominative, Plural, Feminine",
	"V-2APP-NSN":
		"Verb, second Aorist, Passive, Participle, Nominative, Singular, Neuter",
	"V-2APP-NPF":
		"Verb, second Aorist, Passive, Participle, Nominative, Plural, Feminine",
	"V-PNS-3P":
		"Verb, Present, middle or passive depoNent, Subjunctive, third, Plural",
	"X-GPM":
		"indefinite pronoun, Genitive, Plural, Masculine",
	"V-API-1S":
		"Verb, Aorist, Passive, Indicative, first, Singular",
	"V-2AMM-2P":
		"Verb, second Aorist, Middle, iMperative, second, Plural",
	"V-PPP-APN":
		"Verb, Present, Passive, Participle, Accusative, Plural, Neuter",
	"V-APP-ASM":
		"Verb, Aorist, Passive, Participle, Accusative, Singular, Masculine",
	"V-IAI-1S":
		"Verb, Imperfect, Active, Indicative, first, Singular",
	"N-NSM-PG":
		"Noun, Nominative, Singular, Masculine, Person Gentilic",
	"V-2RAN": "Verb, second peRfect, Active, iNfinitive",
	"X-ASF":
		"indefinite pronoun, Accusative, Singular, Feminine",
	"X-NSF":
		"indefinite pronoun, Nominative, Singular, Feminine",
	"V-PPI-2S":
		"Verb, Present, Passive, Indicative, second, Singular",
	"K-GPM":
		"correlative pronoun, Genitive, Plural, Masculine",
	"P-NSN": "Personal pronoun, Nominative, Singular, Neuter",
	"V-2AAP-GSN":
		"Verb, second Aorist, Active, Participle, Genitive, Singular, Neuter",
	"N-DPM-LG":
		"Noun, Dative, Plural, Masculine, Location Gentilic",
	"N-DPM-T": "Noun, Dative, Plural, Masculine, Title",
	"V-2AMP-GSM":
		"Verb, second Aorist, Middle, Participle, Genitive, Singular, Masculine",
	"A-GPN-C":
		"Adjective, Genitive, Plural, Neuter, Comparative",
	"V-AOS-2P":
		"Verb, Aorist, passive depOnent, Subjunctive, second, Plural",
	"V-PMM-2P":
		"Verb, Present, Middle, iMperative, second, Plural",
	"V-2FAI-1S":
		"Verb, second Future, Active, Indicative, first, Singular",
	"A-APF-C":
		"Adjective, Accusative, Plural, Feminine, Comparative",
	"V-PMM-2S":
		"Verb, Present, Middle, iMperative, second, Singular",
	"V-2ADI-1S":
		"Verb, second Aorist, middle Deponent, Indicative, first, Singular",
	"N-APM-LG":
		"Noun, Accusative, Plural, Masculine, Location Gentilic",
	"V-2RAI-3P":
		"Verb, second peRfect, Active, Indicative, third, Plural",
	"V-FMI-2P":
		"Verb, Future, Middle, Indicative, second, Plural",
	"V-RPI-2S":
		"Verb, peRfect, Passive, Indicative, second, Singular",
	"V-RAN": "Verb, peRfect, Active, iNfinitive",
	"V-PMP-DSF":
		"Verb, Present, Middle, Participle, Dative, Singular, Feminine",
	"V-FMI-2S":
		"Verb, Future, Middle, Indicative, second, Singular",
	"Q-NPM":
		"correlative or interrogative pronoun, Nominative, Plural, Masculine",
	"V-APS-1P":
		"Verb, Aorist, Passive, Subjunctive, first, Plural",
	"V-APS-1S":
		"Verb, Aorist, Passive, Subjunctive, first, Singular",
	"S-1SNPN":
		"poSsessive pronoun, first, Singular, Nominative, Plural, Neuter",
	"S-2SNPN":
		"poSsessive pronoun, second, Singular, Nominative, Plural, Neuter",
	"V-2AON":
		"Verb, second Aorist, passive depOnent, iNfinitive",
	"Q-ASN":
		"correlative or interrogative pronoun, Accusative, Singular, Neuter",
	"A-NPM-C":
		"Adjective, Nominative, Plural, Masculine, Comparative",
	"V-2ADI-2P":
		"Verb, second Aorist, middle Deponent, Indicative, second, Plural",
	"V-PMI-2S":
		"Verb, Present, Middle, Indicative, second, Singular",
	"D-DPN": "Demonstrative pronoun, Dative, Plural, Neuter",
	"V-AAM-3P":
		"Verb, Aorist, Active, iMperative, third, Plural",
	"V-APP-APN":
		"Verb, Aorist, Passive, Participle, Accusative, Plural, Neuter",
	"X-DSF": "indefinite pronoun, Dative, Singular, Feminine",
	"V-2RAP-APM":
		"Verb, second peRfect, Active, Participle, Accusative, Plural, Masculine",
	"V-2ADP-ASM":
		"Verb, second Aorist, middle Deponent, Participle, Accusative, Singular, Masculine",
	"V-2ADI-2S":
		"Verb, second Aorist, middle Deponent, Indicative, second, Singular",
	"V-PNP-ASF":
		"Verb, Present, middle or passive depoNent, Participle, Accusative, Singular, Feminine",
	"V-AAP-APM":
		"Verb, Aorist, Active, Participle, Accusative, Plural, Masculine",
	"R-GPF": "Relative pronoun, Genitive, Plural, Feminine",
	"V-PMP-GSM":
		"Verb, Present, Middle, Participle, Genitive, Singular, Masculine",
	"V-PNM-3P":
		"Verb, Present, middle or passive depoNent, iMperative, third, Plural",
	"V-PMP-GPN":
		"Verb, Present, Middle, Participle, Genitive, Plural, Neuter",
	"S-1SASF":
		"poSsessive pronoun, first, Singular, Accusative, Singular, Feminine",
	"V-PNM-3S":
		"Verb, Present, middle or passive depoNent, iMperative, third, Singular",
	"V-AMS-2S":
		"Verb, Aorist, Middle, Subjunctive, second, Singular",
	"X-GSN": "indefinite pronoun, Genitive, Singular, Neuter",
	"S-2SNSN":
		"poSsessive pronoun, second, Singular, Nominative, Singular, Neuter",
	"V-PMP-APM":
		"Verb, Present, Middle, Participle, Accusative, Plural, Masculine",
	"V-FDP-ASN":
		"Verb, Future, middle Deponent, Participle, Accusative, Singular, Neuter",
	"V-2ADP-APM":
		"Verb, second Aorist, middle Deponent, Participle, Accusative, Plural, Masculine",
	"V-2ADP-ASF":
		"Verb, second Aorist, middle Deponent, Participle, Accusative, Singular, Feminine",
	"N-VPF": "Noun, Vocative, Plural, Feminine",
	"F-2APF":
		"reFlexive pronoun, second, Accusative, Plural, Feminine",
	"V-PEP-NPM":
		"Verb, Present, Either middle or passive, Participle, Nominative, Plural, Masculine",
	"V-APP-GPM":
		"Verb, Aorist, Passive, Participle, Genitive, Plural, Masculine",
	"V-2ADP-ASN":
		"Verb, second Aorist, middle Deponent, Participle, Accusative, Singular, Neuter",
	"V-RNP-NSM":
		"Verb, peRfect, middle or passive depoNent, Participle, Nominative, Singular, Masculine",
	"V-2RAP-NPF":
		"Verb, second peRfect, Active, Participle, Nominative, Plural, Feminine",
	"V-2ADP-GPF":
		"Verb, second Aorist, middle Deponent, Participle, Genitive, Plural, Feminine",
	"V-PAP-GPF":
		"Verb, Present, Active, Participle, Genitive, Plural, Feminine",
	"V-RAP-GPN":
		"Verb, peRfect, Active, Participle, Genitive, Plural, Neuter",
	"I-APN":
		"Interrogative pronoun, Accusative, Plural, Neuter",
	"V-ADI-1P":
		"Verb, Aorist, middle Deponent, Indicative, first, Plural",
	"N-APM-PG":
		"Noun, Accusative, Plural, Masculine, Person Gentilic",
	"F-2GSM":
		"reFlexive pronoun, second, Genitive, Singular, Masculine",
	"V-2LAI-1S":
		"Verb, second pLuperfect, Active, Indicative, first, Singular",
	"V-RNI-1S":
		"Verb, peRfect, middle or passive depoNent, Indicative, first, Singular",
	"X-NSN":
		"indefinite pronoun, Nominative, Singular, Neuter",
	"V-2RAP-ASM":
		"Verb, second peRfect, Active, Participle, Accusative, Singular, Masculine",
	"V-2RAI-2S":
		"Verb, second peRfect, Active, Indicative, second, Singular",
	"A-ASF-PG":
		"Adjective, Accusative, Singular, Feminine, Person Gentilic",
	"N-GSN-L": "Noun, Genitive, Singular, Neuter, Location",
	"V-IDI-3P":
		"Verb, Imperfect, middle Deponent, Indicative, third, Plural",
	"A-GSM-PG":
		"Adjective, Genitive, Singular, Masculine, Person Gentilic",
	"S-1SNSF":
		"poSsessive pronoun, first, Singular, Nominative, Singular, Feminine",
	"A-NSM-PG":
		"Adjective, Nominative, Singular, Masculine, Person Gentilic",
	"N-GSF-LG":
		"Noun, Genitive, Singular, Feminine, Location Gentilic",
	"V-PNP-GSN":
		"Verb, Present, middle or passive depoNent, Participle, Genitive, Singular, Neuter",
	"V-PNS-1S":
		"Verb, Present, middle or passive depoNent, Subjunctive, first, Singular",
	"V-2RAI-2P":
		"Verb, second peRfect, Active, Indicative, second, Plural",
	"S-2SASF":
		"poSsessive pronoun, second, Singular, Accusative, Singular, Feminine",
	"V-2RAI-1P":
		"Verb, second peRfect, Active, Indicative, first, Plural",
	"F-1GSM":
		"reFlexive pronoun, first, Genitive, Singular, Masculine",
	"A-ASF-C":
		"Adjective, Accusative, Singular, Feminine, Comparative",
	"P-NPN": "Personal pronoun, Nominative, Plural, Neuter",
	"V-AAP-APN":
		"Verb, Aorist, Active, Participle, Accusative, Plural, Neuter",
	"V-API-2P":
		"Verb, Aorist, Passive, Indicative, second, Plural",
	"V-PMP-ASF":
		"Verb, Present, Middle, Participle, Accusative, Singular, Feminine",
	"V-PNS-1P":
		"Verb, Present, middle or passive depoNent, Subjunctive, first, Plural",
	"V-FDI-1P":
		"Verb, Future, middle Deponent, Indicative, first, Plural",
	"S-1SNSM":
		"poSsessive pronoun, first, Singular, Nominative, Singular, Masculine",
	"N-GPM-L": "Noun, Genitive, Plural, Masculine, Location",
	"V-RPI-2P":
		"Verb, peRfect, Passive, Indicative, second, Plural",
	"A-APM-PG":
		"Adjective, Accusative, Plural, Masculine, Person Gentilic",
	"S-1SDSM":
		"poSsessive pronoun, first, Singular, Dative, Singular, Masculine",
	"V-RPI-1P":
		"Verb, peRfect, Passive, Indicative, first, Plural",
	"S-1SASM":
		"poSsessive pronoun, first, Singular, Accusative, Singular, Masculine",
	"V-LMI-3P":
		"Verb, pLuperfect, Middle, Indicative, third, Plural",
	"I-NPN":
		"Interrogative pronoun, Nominative, Plural, Neuter",
	"S-1SAPN":
		"poSsessive pronoun, first, Singular, Accusative, Plural, Neuter",
	"S-1SGPN":
		"poSsessive pronoun, first, Singular, Genitive, Plural, Neuter",
	"V-2AMS-3P":
		"Verb, second Aorist, Middle, Subjunctive, third, Plural",
	"V-RMI-3S":
		"Verb, peRfect, Middle, Indicative, third, Singular",
	"V-ADP-NPM":
		"Verb, Aorist, middle Deponent, Participle, Nominative, Plural, Masculine",
	"A-NPM-LG":
		"Adjective, Nominative, Plural, Masculine, Location Gentilic",
	"I-APM":
		"Interrogative pronoun, Accusative, Plural, Masculine",
	"S-1SNPM":
		"poSsessive pronoun, first, Singular, Nominative, Plural, Masculine",
	"V-PPM-3S":
		"Verb, Present, Passive, iMperative, third, Singular",
	"V-AOS-1S":
		"Verb, Aorist, passive depOnent, Subjunctive, first, Singular",
	"S-1SAPF":
		"poSsessive pronoun, first, Singular, Accusative, Plural, Feminine",
	"V-2AOI-2P":
		"Verb, second Aorist, passive depOnent, Indicative, second, Plural",
	"S-1SDSF":
		"poSsessive pronoun, first, Singular, Dative, Singular, Feminine",
	"S-1SGSN":
		"poSsessive pronoun, first, Singular, Genitive, Singular, Neuter",
	"V-2FOI-3S":
		"Verb, second Future, passive depOnent, Indicative, third, Singular",
	"P-1AS-K":
		"Personal pronoun, first, Accusative, Singular, Kai",
	"F-2DSM":
		"reFlexive pronoun, second, Dative, Singular, Masculine",
	"V-RPI-1S":
		"Verb, peRfect, Passive, Indicative, first, Singular",
	"S-2SNSM":
		"poSsessive pronoun, second, Singular, Nominative, Singular, Masculine",
	"I-ASF":
		"Interrogative pronoun, Accusative, Singular, Feminine",
	"V-2APP-NSF":
		"Verb, second Aorist, Passive, Participle, Nominative, Singular, Feminine",
	"V-RPP-GPF":
		"Verb, peRfect, Passive, Participle, Genitive, Plural, Feminine",
	"V-FAN": "Verb, Future, Active, iNfinitive",
	"V-ANP-NSM":
		"Verb, Aorist, middle or passive depoNent, Participle, Nominative, Singular, Masculine",
	"N-VPM-LG":
		"Noun, Vocative, Plural, Masculine, Location Gentilic",
	"V-PPP-GSN":
		"Verb, Present, Passive, Participle, Genitive, Singular, Neuter",
	"V-2AAP-DPM":
		"Verb, second Aorist, Active, Participle, Dative, Plural, Masculine",
	"V-PPP-GSF":
		"Verb, Present, Passive, Participle, Genitive, Singular, Feminine",
	"V-PEP-NPF":
		"Verb, Present, Either middle or passive, Participle, Nominative, Plural, Feminine",
	"S-1PDPF":
		"poSsessive pronoun, first, Plural, Dative, Plural, Feminine",
	"A-VPM-PG":
		"Adjective, Vocative, Plural, Masculine, Person Gentilic",
	"N-VPM-PG":
		"Noun, Vocative, Plural, Masculine, Person Gentilic",
	"A-DPM-C":
		"Adjective, Dative, Plural, Masculine, Comparative",
	"V-RAP-DSN":
		"Verb, peRfect, Active, Participle, Dative, Singular, Neuter",
	"V-PPI-1P":
		"Verb, Present, Passive, Indicative, first, Plural",
	"V-2AMP-NPM":
		"Verb, second Aorist, Middle, Participle, Nominative, Plural, Masculine",
	"V-AMS-1P":
		"Verb, Aorist, Middle, Subjunctive, first, Plural",
	"V-2RAP-DSN":
		"Verb, second peRfect, Active, Participle, Dative, Singular, Neuter",
	"V-AOP-GPM":
		"Verb, Aorist, passive depOnent, Participle, Genitive, Plural, Masculine",
	"V-PPP-GPN":
		"Verb, Present, Passive, Participle, Genitive, Plural, Neuter",
	"V-RAP-GSF":
		"Verb, peRfect, Active, Participle, Genitive, Singular, Feminine",
	"S-2SDSF":
		"poSsessive pronoun, second, Singular, Dative, Singular, Feminine",
	"V-2AMI-2S":
		"Verb, second Aorist, Middle, Indicative, second, Singular",
	"V-2AMI-2P":
		"Verb, second Aorist, Middle, Indicative, second, Plural",
	"V-PPP-DSM":
		"Verb, Present, Passive, Participle, Dative, Singular, Masculine",
	"A-DSF-L":
		"Adjective, Dative, Singular, Feminine, Location",
	"N-DSN-L": "Noun, Dative, Singular, Neuter, Location",
	"V-PEP-ASM":
		"Verb, Present, Either middle or passive, Participle, Accusative, Singular, Masculine",
	"V-PMP-DSM":
		"Verb, Present, Middle, Participle, Dative, Singular, Masculine",
	"V-PNP-APF":
		"Verb, Present, middle or passive depoNent, Participle, Accusative, Plural, Feminine",
	"V-RNI-3S":
		"Verb, peRfect, middle or passive depoNent, Indicative, third, Singular",
	"V-RAP-NSN":
		"Verb, peRfect, Active, Participle, Nominative, Singular, Neuter",
	"V-PNO-1S":
		"Verb, Present, middle or passive depoNent, Optative, first, Singular",
	"V-INI-2S":
		"Verb, Imperfect, middle or passive depoNent, Indicative, second, Singular",
	"X-APF":
		"indefinite pronoun, Accusative, Plural, Feminine",
	"V-PMP-NPF":
		"Verb, Present, Middle, Participle, Nominative, Plural, Feminine",
	"A-DSM-PG":
		"Adjective, Dative, Singular, Masculine, Person Gentilic",
	"V-FDN": "Verb, Future, middle Deponent, iNfinitive",
	"V-2AMM-2S":
		"Verb, second Aorist, Middle, iMperative, second, Singular",
	"A-DPM-LG":
		"Adjective, Dative, Plural, Masculine, Location Gentilic",
	"A-ASM-PG":
		"Adjective, Accusative, Singular, Masculine, Person Gentilic",
	"V-PPP-APF":
		"Verb, Present, Passive, Participle, Accusative, Plural, Feminine",
	"V-RNP-DPF":
		"Verb, peRfect, middle or passive depoNent, Participle, Dative, Plural, Feminine",
	"V-RAP-ASF":
		"Verb, peRfect, Active, Participle, Accusative, Singular, Feminine",
	"V-AMP-APM":
		"Verb, Aorist, Middle, Participle, Accusative, Plural, Masculine",
	"V-AMI-1P":
		"Verb, Aorist, Middle, Indicative, first, Plural",
	"V-AMP-DPM":
		"Verb, Aorist, Middle, Participle, Dative, Plural, Masculine",
	"V-RMM-2P":
		"Verb, peRfect, Middle, iMperative, second, Plural",
	"V-ADS-1P":
		"Verb, Aorist, middle Deponent, Subjunctive, first, Plural",
	"A-GSF-PG":
		"Adjective, Genitive, Singular, Feminine, Person Gentilic",
	"A-ASF-LG":
		"Adjective, Accusative, Singular, Feminine, Location Gentilic",
	"N-APM-L":
		"Noun, Accusative, Plural, Masculine, Location",
	"A-GSF-S":
		"Adjective, Genitive, Singular, Feminine, Superlative",
	"V-2AAP-DPF":
		"Verb, second Aorist, Active, Participle, Dative, Plural, Feminine",
	"V-2RPP-APF":
		"Verb, second peRfect, Passive, Participle, Accusative, Plural, Feminine",
	"A-APM-LG":
		"Adjective, Accusative, Plural, Masculine, Location Gentilic",
	"V-2AAM-3P":
		"Verb, second Aorist, Active, iMperative, third, Plural",
	"N-GPF-LG":
		"Noun, Genitive, Plural, Feminine, Location Gentilic",
	"N-DPF-L": "Noun, Dative, Plural, Feminine, Location",
	"X-APN": "indefinite pronoun, Accusative, Plural, Neuter",
	"V-2AAO-3P":
		"Verb, second Aorist, Active, Optative, third, Plural",
	"V-2AMI-1S":
		"Verb, second Aorist, Middle, Indicative, first, Singular",
	"V-2AAP-APF":
		"Verb, second Aorist, Active, Participle, Accusative, Plural, Feminine",
	"V-AOP-NSN":
		"Verb, Aorist, passive depOnent, Participle, Nominative, Singular, Neuter",
	"N-NSF-T": "Noun, Nominative, Singular, Feminine, Title",
	"I-GSN":
		"Interrogative pronoun, Genitive, Singular, Neuter",
	"V-FAP-APN":
		"Verb, Future, Active, Participle, Accusative, Plural, Neuter",
	"F-1DSM":
		"reFlexive pronoun, first, Dative, Singular, Masculine",
	"V-INI-1P":
		"Verb, Imperfect, middle or passive depoNent, Indicative, first, Plural",
	"N-DSM-LG":
		"Noun, Dative, Singular, Masculine, Location Gentilic",
	"V-2ADP-GPM":
		"Verb, second Aorist, middle Deponent, Participle, Genitive, Plural, Masculine",
	"Q-NPF":
		"correlative or interrogative pronoun, Nominative, Plural, Feminine",
	"N-NSM-L":
		"Noun, Nominative, Singular, Masculine, Location",
	"A-ASM-LG":
		"Adjective, Accusative, Singular, Masculine, Location Gentilic",
	"A-NSM-LG":
		"Adjective, Nominative, Singular, Masculine, Location Gentilic",
	"V-RMI-1S":
		"Verb, peRfect, Middle, Indicative, first, Singular",
	"V-RPP-VSM":
		"Verb, peRfect, Passive, Participle, Vocative, Singular, Masculine",
	"V-PNP-GSF":
		"Verb, Present, middle or passive depoNent, Participle, Genitive, Singular, Feminine",
	"V-2AAP-ASN":
		"Verb, second Aorist, Active, Participle, Accusative, Singular, Neuter",
	"F-1APM":
		"reFlexive pronoun, first, Accusative, Plural, Masculine",
	"V-PNP-GPN":
		"Verb, Present, middle or passive depoNent, Participle, Genitive, Plural, Neuter",
	"A-NPF-C":
		"Adjective, Nominative, Plural, Feminine, Comparative",
	"V-2PAN": "Verb, second Present, Active, iNfinitive",
	"V-PAO-3P":
		"Verb, Present, Active, Optative, third, Plural",
	"A-DSF-PG":
		"Adjective, Dative, Singular, Feminine, Person Gentilic",
	"V-FMI-1S":
		"Verb, Future, Middle, Indicative, first, Singular",
	"ADV-C": "ADVerb, Contracted form",
	"V-RMI-2S":
		"Verb, peRfect, Middle, Indicative, second, Singular",
	"X-GPF": "indefinite pronoun, Genitive, Plural, Feminine",
	"V-2AAO-3S":
		"Verb, second Aorist, Active, Optative, third, Singular",
	"V-PNO-3S":
		"Verb, Present, middle or passive depoNent, Optative, third, Singular",
	"S-1PGSF":
		"poSsessive pronoun, first, Plural, Genitive, Singular, Feminine",
	"V-AAP-ASN":
		"Verb, Aorist, Active, Participle, Accusative, Singular, Neuter",
	"V-ADO-1S":
		"Verb, Aorist, middle Deponent, Optative, first, Singular",
	"V-LDI-3S":
		"Verb, pLuperfect, middle Deponent, Indicative, third, Singular",
	"A-DSN-LG":
		"Adjective, Dative, Singular, Neuter, Location Gentilic",
	"V-2API-1P":
		"Verb, second Aorist, Passive, Indicative, first, Plural",
	"V-AOP-DSM":
		"Verb, Aorist, passive depOnent, Participle, Dative, Singular, Masculine",
	"A-ASN-LG":
		"Adjective, Accusative, Singular, Neuter, Location Gentilic",
	"V-PNO-3P":
		"Verb, Present, middle or passive depoNent, Optative, third, Plural",
	"V-IPI-1P":
		"Verb, Imperfect, Passive, Indicative, first, Plural",
	"V-2FMI-3S":
		"Verb, second Future, Middle, Indicative, third, Singular",
	"X-GPN": "indefinite pronoun, Genitive, Plural, Neuter",
	"V-PMP-ASN":
		"Verb, Present, Middle, Participle, Accusative, Singular, Neuter",
	"V-PPP-DPM":
		"Verb, Present, Passive, Participle, Dative, Plural, Masculine",
	"N-APF-L": "Noun, Accusative, Plural, Feminine, Location",
	"A-GPF-L":
		"Adjective, Genitive, Plural, Feminine, Location",
	"A-GPM-LG":
		"Adjective, Genitive, Plural, Masculine, Location Gentilic",
	"V-PNP-VSM":
		"Verb, Present, middle or passive depoNent, Participle, Vocative, Singular, Masculine",
	"S-1SDSN":
		"poSsessive pronoun, first, Singular, Dative, Singular, Neuter",
	"V-2RPP-NSM":
		"Verb, second peRfect, Passive, Participle, Nominative, Singular, Masculine",
	"V-2RAP-GPN":
		"Verb, second peRfect, Active, Participle, Genitive, Plural, Neuter",
	"V-FPI-1P":
		"Verb, Future, Passive, Indicative, first, Plural",
	"V-APP-DSM":
		"Verb, Aorist, Passive, Participle, Dative, Singular, Masculine",
	"F-1DPM":
		"reFlexive pronoun, first, Dative, Plural, Masculine",
	"V-RAP-NPN":
		"Verb, peRfect, Active, Participle, Nominative, Plural, Neuter",
	"N-NPM-PG":
		"Noun, Nominative, Plural, Masculine, Person Gentilic",
	"K-NSN":
		"correlative pronoun, Nominative, Singular, Neuter",
	"A-DSM-C":
		"Adjective, Dative, Singular, Masculine, Comparative",
	"V-2AOI-1P":
		"Verb, second Aorist, passive depOnent, Indicative, first, Plural",
	"S-1SGSF":
		"poSsessive pronoun, first, Singular, Genitive, Singular, Feminine",
	"V-APM-3P":
		"Verb, Aorist, Passive, iMperative, third, Plural",
	"V-2FPI-2S":
		"Verb, second Future, Passive, Indicative, second, Singular",
	"V-2API-2S":
		"Verb, second Aorist, Passive, Indicative, second, Singular",
	"V-2AMS-1S":
		"Verb, second Aorist, Middle, Subjunctive, first, Singular",
	"V-APP-ASF":
		"Verb, Aorist, Passive, Participle, Accusative, Singular, Feminine",
	"K-NPN":
		"correlative pronoun, Nominative, Plural, Neuter",
	"S-1PASF":
		"poSsessive pronoun, first, Plural, Accusative, Singular, Feminine",
	"A-VPN": "Adjective, Vocative, Plural, Neuter",
	"T-VPN": "definite article, Vocative, Plural, Neuter",
	"V-IPI-1S":
		"Verb, Imperfect, Passive, Indicative, first, Singular",
	"V-PAP-APF":
		"Verb, Present, Active, Participle, Accusative, Plural, Feminine",
	"V-RPP-GSN":
		"Verb, peRfect, Passive, Participle, Genitive, Singular, Neuter",
	"V-PMP-DPM":
		"Verb, Present, Middle, Participle, Dative, Plural, Masculine",
	"V-PEP-DPM":
		"Verb, Present, Either middle or passive, Participle, Dative, Plural, Masculine",
	"V-RAS-1P":
		"Verb, peRfect, Active, Subjunctive, first, Plural",
	"V-AOI-1S":
		"Verb, Aorist, passive depOnent, Indicative, first, Singular",
	"V-2ADM-3S":
		"Verb, second Aorist, middle Deponent, iMperative, third, Singular",
	"V-ADP-ASM":
		"Verb, Aorist, middle Deponent, Participle, Accusative, Singular, Masculine",
	"V-PMS-1S":
		"Verb, Present, Middle, Subjunctive, first, Singular",
	"V-2ADS-1S":
		"Verb, second Aorist, middle Deponent, Subjunctive, first, Singular",
	"V-RMI-2P":
		"Verb, peRfect, Middle, Indicative, second, Plural",
	"V-AMM-3S":
		"Verb, Aorist, Middle, iMperative, third, Singular",
	"V-PMM-3S":
		"Verb, Present, Middle, iMperative, third, Singular",
	"V-IPI-2P":
		"Verb, Imperfect, Passive, Indicative, second, Plural",
	"V-PPP-DSN":
		"Verb, Present, Passive, Participle, Dative, Singular, Neuter",
	"V-RAS-1S":
		"Verb, peRfect, Active, Subjunctive, first, Singular",
	"A-ASN-S":
		"Adjective, Accusative, Singular, Neuter, Superlative",
	"V-PPS-3P":
		"Verb, Present, Passive, Subjunctive, third, Plural",
	"V-PPM-3P":
		"Verb, Present, Passive, iMperative, third, Plural",
	"K-NSM":
		"correlative pronoun, Nominative, Singular, Masculine",
	"V-2FPI-1P":
		"Verb, second Future, Passive, Indicative, first, Plural",
	"V-PPS-2P":
		"Verb, Present, Passive, Subjunctive, second, Plural",
	"V-PMP-GSF":
		"Verb, Present, Middle, Participle, Genitive, Singular, Feminine",
	"V-ANI-3S":
		"Verb, Aorist, middle or passive depoNent, Indicative, third, Singular",
	"K-NPF":
		"correlative pronoun, Nominative, Plural, Feminine",
	"A-GPM-C":
		"Adjective, Genitive, Plural, Masculine, Comparative",
	"A-DSF-C":
		"Adjective, Dative, Singular, Feminine, Comparative",
	"V-2RPP-GSF":
		"Verb, second peRfect, Passive, Participle, Genitive, Singular, Feminine",
	"F-1GPM":
		"reFlexive pronoun, first, Genitive, Plural, Masculine",
	"V-RPP-DSN":
		"Verb, peRfect, Passive, Participle, Dative, Singular, Neuter",
	"V-2AMI-1P":
		"Verb, second Aorist, Middle, Indicative, first, Plural",
	"V-2APM-2P":
		"Verb, second Aorist, Passive, iMperative, second, Plural",
	"V-2ADS-1P":
		"Verb, second Aorist, middle Deponent, Subjunctive, first, Plural",
	"Q-ASF":
		"correlative or interrogative pronoun, Accusative, Singular, Feminine",
	"V-RMP-NPM":
		"Verb, peRfect, Middle, Participle, Nominative, Plural, Masculine",
	"V-RNP-ASF":
		"Verb, peRfect, middle or passive depoNent, Participle, Accusative, Singular, Feminine",
	"X-DPM": "indefinite pronoun, Dative, Plural, Masculine",
	"V-IMI-2P":
		"Verb, Imperfect, Middle, Indicative, second, Plural",
	"V-2APP-ASM":
		"Verb, second Aorist, Passive, Participle, Accusative, Singular, Masculine",
	"V-PPS-1S":
		"Verb, Present, Passive, Subjunctive, first, Singular",
	"V-2APS-1P":
		"Verb, second Aorist, Passive, Subjunctive, first, Plural",
	"V-PMP-NSF":
		"Verb, Present, Middle, Participle, Nominative, Singular, Feminine",
	"C-DPN": "reCiprocal pronoun, Dative, Plural, Neuter",
	"X-DSN": "indefinite pronoun, Dative, Singular, Neuter",
	"I-DPN": "Interrogative pronoun, Dative, Plural, Neuter",
	"V-2AOI-1S":
		"Verb, second Aorist, passive depOnent, Indicative, first, Singular",
	"V-RAM-2P":
		"Verb, peRfect, Active, iMperative, second, Plural",
	"T-VPF": "definite article, Vocative, Plural, Feminine",
	"N-DPM-L": "Noun, Dative, Plural, Masculine, Location",
	"V-2FOI-1S":
		"Verb, second Future, passive depOnent, Indicative, first, Singular",
	"V-RPP-GSF":
		"Verb, peRfect, Passive, Participle, Genitive, Singular, Feminine",
	"V-2AOS-2P":
		"Verb, second Aorist, passive depOnent, Subjunctive, second, Plural",
	"N-GPM-PG":
		"Noun, Genitive, Plural, Masculine, Person Gentilic",
	"V-PMP-NSN":
		"Verb, Present, Middle, Participle, Nominative, Singular, Neuter",
	"V-2API-2P":
		"Verb, second Aorist, Passive, Indicative, second, Plural",
	"V-ADS-2S":
		"Verb, Aorist, middle Deponent, Subjunctive, second, Singular",
	"V-POP-NPM":
		"Verb, Present, passive depOnent, Participle, Nominative, Plural, Masculine",
	"V-APO-3S":
		"Verb, Aorist, Passive, Optative, third, Singular",
	"V-2FAI-3S":
		"Verb, second Future, Active, Indicative, third, Singular",
	"R-APF": "Relative pronoun, Accusative, Plural, Feminine",
	"I-GPN":
		"Interrogative pronoun, Genitive, Plural, Neuter",
	"V-PMS-2S":
		"Verb, Present, Middle, Subjunctive, second, Singular",
	"V-PNP-DPF":
		"Verb, Present, middle or passive depoNent, Participle, Dative, Plural, Feminine",
	"V-RAS-2S":
		"Verb, peRfect, Active, Subjunctive, second, Singular",
	"V-RDI-3S":
		"Verb, peRfect, middle Deponent, Indicative, third, Singular",
	"V-2RAP-NSF":
		"Verb, second peRfect, Active, Participle, Nominative, Singular, Feminine",
	"V-2ADM-2S":
		"Verb, second Aorist, middle Deponent, iMperative, second, Singular",
	"V-RNP-NPM":
		"Verb, peRfect, middle or passive depoNent, Participle, Nominative, Plural, Masculine",
	"V-PMP-APN":
		"Verb, Present, Middle, Participle, Accusative, Plural, Neuter",
	"S-1PDPM":
		"poSsessive pronoun, first, Plural, Dative, Plural, Masculine",
	"V-AOO-3S":
		"Verb, Aorist, passive depOnent, Optative, third, Singular",
	"V-RPP-APF":
		"Verb, peRfect, Passive, Participle, Accusative, Plural, Feminine",
	"V-AOS-1P":
		"Verb, Aorist, passive depOnent, Subjunctive, first, Plural",
	"S-1PNPM":
		"poSsessive pronoun, first, Plural, Nominative, Plural, Masculine",
	"V-2ADO-1S":
		"Verb, second Aorist, middle Deponent, Optative, first, Singular",
	"K-DSN": "correlative pronoun, Dative, Singular, Neuter",
	"V-APP-DPN":
		"Verb, Aorist, Passive, Participle, Dative, Plural, Neuter",
	"A-GSF-C":
		"Adjective, Genitive, Singular, Feminine, Comparative",
	"V-FPP-GPN":
		"Verb, Future, Passive, Participle, Genitive, Plural, Neuter",
	"I-DPM":
		"Interrogative pronoun, Dative, Plural, Masculine",
	"V-AOP-GPN":
		"Verb, Aorist, passive depOnent, Participle, Genitive, Plural, Neuter",
	"V-PPS-1P":
		"Verb, Present, Passive, Subjunctive, first, Plural",
	"V-ADP-APM":
		"Verb, Aorist, middle Deponent, Participle, Accusative, Plural, Masculine",
	"V-AOP-APM":
		"Verb, Aorist, passive depOnent, Participle, Accusative, Plural, Masculine",
	"A-GSM-C":
		"Adjective, Genitive, Singular, Masculine, Comparative",
	"A-DPF-C":
		"Adjective, Dative, Plural, Feminine, Comparative",
	"N-NPN-T": "Noun, Nominative, Plural, Neuter, Title",
	"V-2ADP-GPN":
		"Verb, second Aorist, middle Deponent, Participle, Genitive, Plural, Neuter",
	"V-PPP-NPF":
		"Verb, Present, Passive, Participle, Nominative, Plural, Feminine",
	"V-PEP-GPN":
		"Verb, Present, Either middle or passive, Participle, Genitive, Plural, Neuter",
	"A-ASF-L":
		"Adjective, Accusative, Singular, Feminine, Location",
	"V-APP-NPN":
		"Verb, Aorist, Passive, Participle, Nominative, Plural, Neuter",
	"V-ADP-NSF":
		"Verb, Aorist, middle Deponent, Participle, Nominative, Singular, Feminine",
	"V-FOI-1S":
		"Verb, Future, passive depOnent, Indicative, first, Singular",
	"V-FAP-NPM":
		"Verb, Future, Active, Participle, Nominative, Plural, Masculine",
	"V-PMP-GPF":
		"Verb, Present, Middle, Participle, Genitive, Plural, Feminine",
	"A-VPF": "Adjective, Vocative, Plural, Feminine",
	"V-PEP-NSF":
		"Verb, Present, Either middle or passive, Participle, Nominative, Singular, Feminine",
	"V-ADM-3P":
		"Verb, Aorist, middle Deponent, iMperative, third, Plural",
	"V-PMP-GSN":
		"Verb, Present, Middle, Participle, Genitive, Singular, Neuter",
	"V-AMP-GPM":
		"Verb, Aorist, Middle, Participle, Genitive, Plural, Masculine",
	"V-2APP-DSN":
		"Verb, second Aorist, Passive, Participle, Dative, Singular, Neuter",
	"A-DSN-C":
		"Adjective, Dative, Singular, Neuter, Comparative",
	"V-PAO-2P":
		"Verb, Present, Active, Optative, second, Plural",
	"V-2APP-GPM":
		"Verb, second Aorist, Passive, Participle, Genitive, Plural, Masculine",
	"V-RNN":
		"Verb, peRfect, middle or passive depoNent, iNfinitive",
	"V-RNP-APM":
		"Verb, peRfect, middle or passive depoNent, Participle, Accusative, Plural, Masculine",
	"V-PNP-DSF":
		"Verb, Present, middle or passive depoNent, Participle, Dative, Singular, Feminine",
	"V-PMM-3P":
		"Verb, Present, Middle, iMperative, third, Plural",
	"A-VPM-C":
		"Adjective, Vocative, Plural, Masculine, Comparative",
	"V-RMP-GSF":
		"Verb, peRfect, Middle, Participle, Genitive, Singular, Feminine",
	"A-NPN-S":
		"Adjective, Nominative, Plural, Neuter, Superlative",
	"V-ANP-NSN":
		"Verb, Aorist, middle or passive depoNent, Participle, Nominative, Singular, Neuter",
	"V-PDP-NPM":
		"Verb, Present, middle Deponent, Participle, Nominative, Plural, Masculine",
	"V-AMP-NSF":
		"Verb, Aorist, Middle, Participle, Nominative, Singular, Feminine",
	"X-NPN": "indefinite pronoun, Nominative, Plural, Neuter",
	"S-1PNSF":
		"poSsessive pronoun, first, Plural, Nominative, Singular, Feminine",
	"S-1PGPF":
		"poSsessive pronoun, first, Plural, Genitive, Plural, Feminine",
	"V-RNI-1P":
		"Verb, peRfect, middle or passive depoNent, Indicative, first, Plural",
	"V-PMS-1P":
		"Verb, Present, Middle, Subjunctive, first, Plural",
	"F-2APN":
		"reFlexive pronoun, second, Accusative, Plural, Neuter",
	"F-3GPN":
		"reFlexive pronoun, third, Genitive, Plural, Neuter",
	"A-DSF-S":
		"Adjective, Dative, Singular, Feminine, Superlative",
	"N-NSN-T": "Noun, Nominative, Singular, Neuter, Title",
	"N-NSN-LI":
		"Noun, Nominative, Singular, Neuter, Letter Indeclinable (N)",
	"V-2PAI-2S":
		"Verb, second Present, Active, Indicative, second, Singular",
	"V-2AMS-2S":
		"Verb, second Aorist, Middle, Subjunctive, second, Singular",
	"A-DSF-LG":
		"Adjective, Dative, Singular, Feminine, Location Gentilic",
	"V-REP-NSF":
		"Verb, peRfect, Either middle or passive, Participle, Nominative, Singular, Feminine",
	"V-REP-VSF":
		"Verb, peRfect, Either middle or passive, Participle, Vocative, Singular, Feminine",
	"V-RMP-DPM":
		"Verb, peRfect, Middle, Participle, Dative, Plural, Masculine",
};

export { data };
