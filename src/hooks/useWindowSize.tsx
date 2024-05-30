import { useState, useEffect } from "react";

function useWindowSize(listeners: any[]) {
	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}

	const [windowSize, setWindowSize] = useState(
		getWindowSize()
	);

	useEffect(() => {
		function handleWindowResize() {
			setWindowSize(getWindowSize());
		}

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener(
				"resize",
				handleWindowResize
			);
		};
	}, [...listeners]);

	return windowSize;
}

export default useWindowSize;
