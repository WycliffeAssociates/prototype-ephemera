import { useGreekWordsParams } from "../../../hooks/useGreekWordsParams";
import type { AlignedText } from "../../../types";
import AlignmentExplorationWord from "./AlignmentExplorationWord";

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
				versePhrase={versePhrase} 
				onPhraseClick={handlePhraseClick}
			/>
		);
	}
	return <AlignmentExplorationWord 
				versePhrase={versePhrase} 
				onPhraseClick={() => {}}
			/>;
}

export default Word;