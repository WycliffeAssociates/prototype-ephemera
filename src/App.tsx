import { useEffect } from "react";
import { useBookChapterParams } from "./hooks/useBookChapterParams";
import { SettingsProvider } from "./hooks/SettingsContext";
import { GreekWordsProvider } from "./hooks/GreekWordsContext";
import { View } from "./components/View";

function App() {
	const { setValidBookChapterParams } =
		useBookChapterParams();

	function navigateToMostRecentBookChapter() {
		let lastBookChapter:
			| { book: string; chapter: string }
			| undefined;
		lastBookChapter = JSON.parse(
			localStorage.getItem("lastBookChapter") as string
		);

		if (lastBookChapter) {
			setValidBookChapterParams(
				lastBookChapter.book,
				lastBookChapter.chapter
			);
		} else {
			// defaults to Matthew 1, since it is the first book in NT
			setValidBookChapterParams("Matthew", "1");
		}
	}

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
