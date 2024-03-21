import axios from "axios";
import { FormattedGreekWord } from "src/types";
import { fullMorphToFileName } from "../applicationLogic/mapping/mapFullMorph";

interface missingReport {
	word: string;
	abbreviated: string;
	full: string;
	strongs: string;
	ogntSort: string;
}

async function reportMissingMorphology(
	data: missingReport
) {
	try {
		let config = {
			method: "post",
			maxBodyLength: Infinity,
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

		let res = await axios.request(config);

		console.log(
			"report status = " + JSON.stringify(res.status)
		);
	} catch (error) {
		console.log(error);
	}
}


export async function fetchMorphologyWord(greekWords?: FormattedGreekWord[], morphologyWord?: string,) {
    let returnVal = undefined;

    if (morphologyWord !== undefined) {
        try {
            let fileName: string = morphologyWord;

            if (fullMorphToFileName[fileName] !== undefined) {
                fileName = fullMorphToFileName[fileName];
            }

            var morphology = await fetch(`en_gwt/02_morphology_files/${fileName}.md`)
            if (!morphology.ok) {
                throw new Error('Failed to fetch morphology file');
            }

            const contentType = morphology.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
              throw new Error('Received HTML instead of Markdown')
            }

            returnVal = morphology.text();
        } catch (error) {
            if (greekWords) {
                let greekWord = greekWords[
                    greekWords?.length - 1
                ] as any;
                let requestBody = {
                    word: greekWords[greekWords?.length - 1].text,
                    abbreviated:
                        greekWords[greekWords?.length - 1].morph,
                    full: morphologyWord,
                    strongs:
                        greekWords[greekWords?.length - 1].strongs,
                    ogntSort:
                        (greekWord.OGNTsort
                            ? greekWord.OGNTsort
                            : greekWord.OGNTSort) + "",
                };

                reportMissingMorphology(requestBody);
            }
        }
    }
    return returnVal;
}

