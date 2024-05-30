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
	if (strongs.length < 5 && strongs.length >= 2) {
		for (let i = strongs.length; i < 5; i++) {
			strongs = stringInsert(strongs, 1, "0", false);
		}
	}

	return strongs;
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
		`g ${startStrongsRangeNumber}`,
	);
	const endStrongsRangeString = makeFourDigitStrongs(
		`g ${endStrongsRangeNumber}`,
	);

	const strongsRange = `${startStrongsRangeString} -`.concat(
		endStrongsRangeString,
	);

	return strongsRange.toLocaleLowerCase();
}

async function getGreekWord(strongs) {
	strongs = await makeFourDigitStrongs(strongs).toLocaleLowerCase();
	const folder = await getStrongsRange(strongs);

	let greekWordInfo;

	try {
		greekWordInfo = await axios.get(
			`https://content.bibletranslationtools.org/WycliffeAssociates/en_gwt/raw/branch/master/${folder}/${strongs}.md`,
		);
		return greekWordInfo;
	} catch (error) {
		console.error(error);
		return undefined;
	}
}

export default getGreekWord;
