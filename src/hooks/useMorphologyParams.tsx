import { useState, useEffect } from "react";
import { useSearchParams  } from "react-router-dom";


export function useMorphologyParams() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [morphologyWord, setMorphologyWord] = useState<string>()

    function setMorphologyParams(morphologyWord: string) {

        let urlParams = new URLSearchParams(searchParams);
        urlParams.set("morphologyWord", morphologyWord);
        setSearchParams(urlParams);
    }


    function removeMorphologyParams() {

        let urlParams = new URLSearchParams(searchParams);
        urlParams.delete("morphologyWord");
        setSearchParams(urlParams);
    }


    function getMorphologyParams() {
        return {morphologyWord: morphologyWord};
    }


    useEffect(() => {
      if(searchParams !== undefined) {

        if(searchParams.get("morphologyWord")) {
            setMorphologyWord(searchParams.get("morphologyWord") as string);
        } else {
            setMorphologyWord(undefined);
        }

      }
    }, [searchParams]);


    return {"setMorphologyParams": setMorphologyParams, "getMorphologyParams": getMorphologyParams, "removeMorphologyParams": removeMorphologyParams};
}


export default useMorphologyParams;