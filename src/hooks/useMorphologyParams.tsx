import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useMorphologyParams() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [morphologyWord, setMorphologyWord] =
		useState<string>();

	function setMorphologyParams(morphologyWord: string) {
		let urlParams = new URLSearchParams(searchParams);
		urlParams.set("morphologyWord", morphologyWord);
		setSearchParams(urlParams);
	}

	function removeMorphologyParams() {
		let urlParams = new URLSearchParams(searchParams);
		urlParams.delete("morphologyWord");
		setSearchParams(urlParams);
		setMorphologyWord(undefined);
	}

	function getMorphologyParams() {
		return { morphologyWord: morphologyWord };
	}

	useEffect(() => {
		if (searchParams !== undefined) {
			let morphologyWordParamValue = searchParams.get("morphologyWord");
			if (morphologyWordParamValue) {
				setMorphologyWord(
					morphologyWordParamValue
				);
			} else {
				setMorphologyWord(undefined);
			}
		}
	}, [searchParams.get("morphologyWord")]);

	return {
		setMorphologyParams: setMorphologyParams,
		getMorphologyParams: getMorphologyParams,
		removeMorphologyParams: removeMorphologyParams,
	};
}

export default useMorphologyParams;
