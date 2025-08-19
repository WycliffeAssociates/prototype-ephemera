import axios from "axios";

// utility function to insert a string into another string
function stringInsert(str, index, value, replace) {
	let res = "";

	if (replace === false) {
		res = str.substr(0, index) + value + str.substr(index);
	} else {
		res = str.substr(0, index) + value + str.substr(index + value.length);
	}

	return res;
}

// Adds padding zeros (to the second character's posision) until it's length is 5
function makeFourDigitStrongs(strongs) {
	const digits = strongs.slice(1);
	const fourDigitstrongs = `g${digits.padStart(4, 0)}`;
	return fourDigitstrongs;
}

// Takes the target strongs number and calculates its parent folder in the en_gwt repo
// This is greatly dependent on the current structure of the en_gwt
function getStrongsRange(strongs) {
	const thousandsDigit = strongs.charAt(1);
	const hundredsDigit = strongs.charAt(2);
	const tensDigit = strongs.charAt(3);
	const onesDigit = strongs.charAt(4);

	let strongsNumber = thousandsDigit + hundredsDigit + tensDigit + onesDigit;

	strongsNumber = Number.parseInt(strongsNumber);

	let startStrongsRangeNumber;
	let endStrongsRangeNumber;

	if (strongsNumber <= 10) {
		return "g0001-g0010";
	}
	if (Number.parseInt(onesDigit) === 0) {
		startStrongsRangeNumber = strongsNumber - 9;
		endStrongsRangeNumber = strongsNumber;
	} else {
		startStrongsRangeNumber = strongsNumber - (strongsNumber % 10) + 1;
		endStrongsRangeNumber = strongsNumber - (strongsNumber % 10) + 10;
	}

	const startStrongsRangeString = makeFourDigitStrongs(
		`g${startStrongsRangeNumber}`,
	);
	const endStrongsRangeString = makeFourDigitStrongs(
		`g${endStrongsRangeNumber}`,
	);

	const strongsRange = `${startStrongsRangeString}-`.concat(
		endStrongsRangeString,
	);

	return strongsRange.toLocaleLowerCase();
}

async function getGreekWord(strongs) {
	const fourDigitstrongs =
		await makeFourDigitStrongs(strongs).toLocaleLowerCase();
	const folder = await getStrongsRange(fourDigitstrongs);

	let greekWordInfo;
	try {
		greekWordInfo = await axios.get(
			`https://content.bibletranslationtools.org/anonymouswalker/vi_gwt/raw/branch/master/${folder}/${fourDigitstrongs}.md`,
		);
		return greekWordInfo;
	} catch (error) {
		console.error(error);
		return undefined;
	}
}

export default getGreekWord;
