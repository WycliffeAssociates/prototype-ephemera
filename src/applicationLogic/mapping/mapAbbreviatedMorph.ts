import { data } from "../data/OpenGNT_morphology_English_data";

function getMorphDescription(abbreviatedMorphology: string) {
	const indexedData: Record<string, string> = data;
	return indexedData[abbreviatedMorphology];
}

export { getMorphDescription };
