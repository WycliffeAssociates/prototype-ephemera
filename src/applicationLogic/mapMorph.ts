import {data} from "./OpenGNT_morphology_English_data";

function getMorphDescription(abbreviatedMorphology : string) {
    let indexedData = data as any;
    return indexedData[abbreviatedMorphology];
}

export {getMorphDescription};

