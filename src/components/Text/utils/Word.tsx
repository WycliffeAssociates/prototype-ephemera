import { AlignedText } from "../../../types";
import { EnglishWord } from "./EnglishWord";
import { GreekWord } from "./GreekWord";
import { useGreekWordsParams } from "../../../hooks/useGreekWordsParams";

interface WordProps {
	handleClick: (params: any) => any;
	verseNumber: number;
	versePhrase: AlignedText;
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
		newGreekWords: AlignedText
	) {
		let newParams = {
			alignedText: newGreekWords,
			show: true,
			verseNumber: verseNumber
		}
		setGreekWordsParams(newParams);
	}

	if(versePhrase.strongs) {
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
