import { useEffect } from "react";
import { View } from "./components/View";
import { SettingsProvider } from "./hooks/SettingsContext";
import { useBookChapterParams } from "./hooks/useBookChapterParams";

function App() {
	const { navigateToMostRecentBookChapter, book, chapter } =
		useBookChapterParams();

	useEffect(() => {
		if (!book || !chapter) navigateToMostRecentBookChapter();
	}, [book, chapter, navigateToMostRecentBookChapter]);

	return (
		<div className="App">
			<SettingsProvider>
				<View />
			</SettingsProvider>
		</div>
	);
}

export default App;
