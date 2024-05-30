import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useSourceTextResourceParams() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [sourceTextResourceLanguage, setSoureTextResourceLanguage] =
		useState<string>("en");
	const [sourceTextResourceType, setSourceTextResourceType] =
		useState<string>("ulb");

	function setSourceTextResourceTypeParam(type: string) {
		const urlParams = new URLSearchParams(searchParams);
		urlParams.set("sourceTextResourceType", type);
		setSearchParams(urlParams);
	}

	function setSourceTextResourceLanguageParam(langauge: string) {
		const urlParams = new URLSearchParams(searchParams);
		urlParams.set("sourceTextResourceLanguage", langauge);
		setSearchParams(urlParams);
	}

	useEffect(() => {
		if (searchParams) {
			const languageValue = searchParams.get("sourceTextResourceLanguage");
			const typeValue = searchParams.get("sourceTextResourceType");

			if (languageValue) {
				setSoureTextResourceLanguage(languageValue);
			} else {
				setSoureTextResourceLanguage("en");
			}

			if (typeValue) {
				setSourceTextResourceType(typeValue);
			} else {
				setSourceTextResourceType("ulb");
			}
		}
	}, [
		searchParams,
		searchParams.get("sourceTextResourceType"),
		searchParams.get("sourceTextResourceLanguage"),
	]);

	return {
		setSourceTextResourceTypeParam,
		setSourceTextResourceLanguageParam,
		sourceTextResourceLanguage,
		sourceTextResourceType,
	};
}

export default useSourceTextResourceParams;
