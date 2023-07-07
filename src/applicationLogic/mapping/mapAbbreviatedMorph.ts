import { data } from "../data/OpenGNT_morphology_English_data";

function getMorphDescription(
	abbreviatedMorphology: string
) {
	let indexedData : Record<string, unknown> = data;
	return indexedData[abbreviatedMorphology];
}

export { getMorphDescription };
