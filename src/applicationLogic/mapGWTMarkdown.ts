import { GWTInformation } from '../types';
import { books as newTestamentBooks } from './newTestamentMetadata';


function mapGWTMarkdown (greekWordMarkDown : string) {
    let greekWordMarkDownArray : string[] = greekWordMarkDown.split(/\n/) as string[];

    let startingIndex;
    for(startingIndex = 0; greekWordMarkDownArray[startingIndex] === ""; startingIndex++);

    let gwtInformation : GWTInformation = {
      descriptions: [], 
      morphology: "", 
      gwtGreekWord: 
      greekWordMarkDownArray[startingIndex].substr(1), 
      unprocessed: ""
    };

    let gwtWords : GWTInformation[] = [];
    let foundDescription = false;
    let processedDescriptions = false;

    for(let i = startingIndex + 1; i < greekWordMarkDownArray.length; i++) 
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
        
        let foundVerseReferences : any[] | null = greekWordMarkDownArray[i].match(/[A-Za-z]+ \d+:\d+/g);
        let validVerseReferences : string[] = [];
        if(foundVerseReferences) {
          foundVerseReferences.forEach((foundVerseReference) => {
            if(newTestamentBooks[foundVerseReference.match(/[A-Za-z]+/)]) {
              validVerseReferences.push(foundVerseReference);
            }
          })
        }

        gwtInformation.verseReferences = validVerseReferences;
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
      else if(greekWordMarkDownArray[i].charAt(0) == "#")
      {
        gwtWords.push(gwtInformation);
        gwtInformation = {
          descriptions: [], 
          morphology: "", 
          gwtGreekWord: 
          greekWordMarkDownArray[startingIndex].substr(1), 
          unprocessed: ""
        };
        foundDescription = false;
        processedDescriptions = false;
        
      }
      else {
        if(foundDescription) {
          processedDescriptions = true;
          gwtInformation.unprocessed = gwtInformation.unprocessed + "\n" + greekWordMarkDownArray[i];
        }
      }
    }
    gwtWords.push(gwtInformation);
    return gwtWords;
  };


  export default mapGWTMarkdown;