import {
	NewFormattedWord,
	FormattedGreekWord,
} from "../../../types";
import { EnglishWord } from "./EnglishWord";
import { GreekWord } from "./GreekWord";
import { SubWordContainer } from "./SubWordContainer";
import { PhraseWordContainer } from "./PhraseWordContainer";
import { useGreekWordsParams } from "../../../hooks/useGreekWordsParams";

interface WordProps {
	handleClick: (params: any) => any;
	verseNumber: number;
	versePhrase: NewFormattedWord;
}

function Word({
	verseNumber,
	versePhrase,
	handleClick,
}: WordProps) {

	const {
		setGreekWordsParams, 
	} = useGreekWordsParams();

	function handlePhraseClick(
		newGreekWords: FormattedGreekWord[]
	) {
		let newParams = {
			greekWords: newGreekWords,
			show: true,
			verseNumber: verseNumber
		}
		setGreekWordsParams(newParams);
	}

	if (versePhrase.phraseWords !== undefined) {
		return (
			<PhraseWordContainer
				handleClick={handleClick}
				onPhraseClick={handlePhraseClick}
				versePhrase={versePhrase}
			/>
		);
	} else if (versePhrase.subWords !== undefined) {
		return (
			<SubWordContainer
				handleClick={handleClick}
				onPhraseClick={handlePhraseClick}
				versePhrase={versePhrase}
			/>
		);
	} else if (versePhrase.greekWords) {
		return (
			<GreekWord
				handleClick={handleClick}
				onPhraseClick={handlePhraseClick}
				versePhrase={versePhrase}
			/>
		);
	} else {
		return <EnglishWord versePhrase={versePhrase} />;
	}
}

export default Word;
