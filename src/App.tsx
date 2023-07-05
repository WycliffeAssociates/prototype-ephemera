import { useEffect } from "react";
import { useBookChapterParams } from "./hooks/useBookChapterParams";
import { SettingsProvider } from "./hooks/SettingsContext";
import { GreekWordsProvider } from "./hooks/GreekWordsContext";
import { View } from "./components/View";

function App() {
	const { navigateToMostRecentBookChapter } =
		useBookChapterParams();

	useEffect(() => {
		navigateToMostRecentBookChapter();
	}, []);

	return (
		<div className="App">
			<SettingsProvider>
				<GreekWordsProvider>
					<View />
				</GreekWordsProvider>
			</SettingsProvider>
		</div>
	);
}

export default App;
