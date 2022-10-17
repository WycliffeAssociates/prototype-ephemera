import { FormattedGreekWord, Description as DescriptionType } from '../types';

type GWTInformation = {
  gwtGreekWord: string,
  descriptions: DescriptionType[],
  morphology: string,
  verseReferences?: string,
  adviceForTranslators?: string,
  unprocessed?: string,
}

// TODO: add logic to deal with words like "a slave" that have multiple greek words and are not phrase or sub words
function mapGWTMarkdown (greekWordMarkDown : string) {
    let greekWordMarkDownArray : string[] = greekWordMarkDown.split(/\n/) as string[];
    let gwtInformation : GWTInformation = {
      descriptions: [], 
      morphology: "", 
      gwtGreekWord: 
      greekWordMarkDownArray[0].substr(1), 
      unprocessed: ""
    };

    let foundDescription = false;
    let processedDescriptions = false;

    for(let i = 1; i < greekWordMarkDownArray.length; i++) 
    {
      if(greekWordMarkDownArray[i] == "\n" || greekWordMarkDownArray[i] === "") {
        continue;
      }

      if(greekWordMarkDownArray[i].charAt(0) == "*" && greekWordMarkDownArray[i].charAt(1) == "*") {
        processedDescriptions = true;
        gwtInformation.adviceForTranslators = greekWordMarkDownArray[i];
      }
      else if(greekWordMarkDownArray[i].search("See:") !== -1)
      {
        processedDescriptions = true;
        gwtInformation.verseReferences = greekWordMarkDownArray[i];
      }
      else if(greekWordMarkDownArray[i].charAt(0) == "*" && !processedDescriptions) {
        greekWordMarkDownArray[i] = greekWordMarkDownArray[i].replace("*", "");
        foundDescription = true;
        gwtInformation.descriptions.push({mainDescription: greekWordMarkDownArray[i] as string, subDescriptions: []})
      }
      else if(greekWordMarkDownArray[i].search("    *") !== -1 && !processedDescriptions) {
        greekWordMarkDownArray[i] = greekWordMarkDownArray[i].replace("*", "");
        gwtInformation.descriptions[gwtInformation.descriptions.length - 1].subDescriptions?.push(greekWordMarkDownArray[i])
      }
      else if(!foundDescription) {
        gwtInformation.morphology = gwtInformation.morphology + "\n" + greekWordMarkDownArray[i];
      }
      else {
        if(foundDescription) {
          processedDescriptions = true;
          gwtInformation.unprocessed = gwtInformation.unprocessed + "\n" + greekWordMarkDownArray[i];
        }
      }
    }

    return gwtInformation;
  };


  export default mapGWTMarkdown;