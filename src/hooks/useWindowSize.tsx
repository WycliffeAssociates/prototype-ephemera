import { useEffect, useState } from "react";

function useWindowSize(listeners: any[]) {
	const [windowSize, setWindowSize] = useState({
		innerWidth: window.innerWidth,
		innerHeight: window.innerHeight,
	});

	useEffect(() => {
		function handleWindowResize() {
			setWindowSize({
				innerWidth: window.innerWidth,
				innerHeight: window.innerHeight,
			});
		}

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, [...listeners]);

	return windowSize;
}

export default useWindowSize;
