import axios from "axios";
import type { AlignedText } from "src/types";
import { fullMorphToFileName } from "../applicationLogic/mapping/mapFullMorph";

interface missingReport {
	word: string;
	abbreviated: string;
	full: string;
	strongs: string;
	ogntSort: string;
}

async function reportMissingMorphology(data: missingReport) {
	try {
		const config = {
			method: "post",
			maxBodyLength: Number.POSITIVE_INFINITY,
			url: "https://wagwtfeedbackhandler.azurewebsites.net/api/MissingHandler",
			headers: {
				Accept: "*/*",
				"User-Agent": "GWT",
				"x-functions-key":
					"LFRaycifocGWKg-97QV13FFYNxMpXop847cwTlxdgXb2AzFuQXNxbg==",
				"Content-Type": "text/plain",
			},
			data: data,
		};

		const res = await axios.request(config);
		console.log(`report status = ${JSON.stringify(res.status)}`);
	} catch (error) {
		console.log(error);
	}
}

export async function fetchMorphologyWord(
	alignedText?: AlignedText,
	morphologyWord?: string,
) {
	let returnVal = undefined;

	if (morphologyWord !== undefined) {
		try {
			let fileName: string = morphologyWord;

			if (fullMorphToFileName[fileName] !== undefined) {
				fileName = fullMorphToFileName[fileName];
			}

			const response = await axios.get(
				`https://content.bibletranslationtools.org/WycliffeAssociates/en_gwt/raw/branch/master/02_morphology_files/${fileName}.md`,
			);

			returnVal = response.data;
		} catch (error) {
			if (alignedText?.greekAlignmentData) {
				const greekWord = alignedText.greekAlignmentData[
					alignedText.greekAlignmentData.length - 1
				] as any;

				const requestBody = {
					word: alignedText.text,
					abbreviated: greekWord.morph,
					full: morphologyWord,
					strongs: greekWord.strongs,
					ogntSort: (greekWord.OGNTsort
						? greekWord.OGNTsort
						: greekWord.OGNTSort
					).toString(),
				};

				reportMissingMorphology(requestBody);
			}
		}
	}
	return returnVal;
}
