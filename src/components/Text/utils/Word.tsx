import { useGreekWordsParams } from "../../../hooks/useGreekWordsParams";
import type { AlignedText } from "../../../types";
import AlignmentExplorationWord from "./AlignmentExplorationWord";
import { EnglishWord } from "./EnglishWord";
import { GreekWord } from "./GreekWord";

interface WordProps {
	handleClick: (params: any) => any;
	verseNumber: number;
	versePhrase: AlignedText;
}

function Word({ verseNumber, versePhrase, handleClick }: WordProps) {
	const { setGreekWordsParams } = useGreekWordsParams();

	function handlePhraseClick(newGreekWords: AlignedText) {
		const newParams = {
			alignedText: newGreekWords,
			show: true,
			verseNumber: verseNumber,
		};
		setGreekWordsParams(newParams);
	}

	if (versePhrase.greekAlignmentData) {
		return (
			<AlignmentExplorationWord 
				english={`${versePhrase.text}`} 
				greek={"<GREEK_HERE>"} 
				lemma={`<LEMMA_HERE>`} 
				strong={`${versePhrase.greekAlignmentData[0].strong}`}
			/>
		);
	}
	return <AlignmentExplorationWord 
				english={`${versePhrase.text}`} 
				greek={undefined} 
				lemma={undefined} 
				strong={undefined}
			/>;
}

export default Word;
