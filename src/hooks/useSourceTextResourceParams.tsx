import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


export function useSourceTextResourceParams() {
	const [searchParams, setSearchParams] = useSearchParams();
    const [sourceTextResourceLanguage, setSoureTextResourceLanguage] =
        useState<string>("en");
    const [sourceTextResourceType, setSourceTextResourceType] =
        useState<string>("ulb");

    function setSourceTextResourceTypeParam(type: string) {
        let urlParams = new URLSearchParams(searchParams);
		urlParams.set("sourceTextResourceType", type);
		setSearchParams(urlParams);
    }

    function setSourceTextResourceLanguageParam(langauge: string) {
        let urlParams = new URLSearchParams(searchParams);
		urlParams.set("sourceTextResourceLanguage", langauge);
		setSearchParams(urlParams);
    }

    useEffect(() => {
        if(searchParams) {
            let languageValue = searchParams.get("sourceTextResourceLanguage");
            let typeValue = searchParams.get("sourceTextResourceType");

            if(languageValue) {
                setSoureTextResourceLanguage(languageValue)
            } else {
                setSoureTextResourceLanguage("en");
            }

            if(typeValue) {
                setSourceTextResourceType(typeValue)
            } else {
                setSourceTextResourceType("ulb");
            }
        }
    }, [searchParams.get("sourceTextResourceType"), searchParams.get("sourceTextResourceLanguage")])

    return {
        setSourceTextResourceTypeParam,
        setSourceTextResourceLanguageParam,
        sourceTextResourceLanguage,
        sourceTextResourceType,
    }
}

export default useSourceTextResourceParams;