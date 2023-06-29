import ReactMarkdown from "react-markdown";
import { useSettings } from "../../../../hooks/SettingsContext";
import { mapValidGWTSettings } from "../../GreekWordInfo/utils/mapValidGWTSettings";

interface unprocessedMarkdownProps {
	markdown: string;
}

function UnprocessedMarkdown({
	markdown,
}: unprocessedMarkdownProps) {
	const { GWTSettings } = useSettings();
	let overwriteStyle: any =
		mapValidGWTSettings(GWTSettings);

	if (markdown !== undefined) {
		return (
			<div
				style={{
					paddingTop: "15px",
					paddingBottom: "15px",
					maxHeight: "90vh",
				}}
			>
				<ReactMarkdown
					children={markdown}
					components={{
						h1: ({ node, ...props }) => <></>,
						h2: ({ node, ...props }) => (
							<h3 style={{ ...overwriteStyle }}>
								{props.children}
							</h3>
						),
						h3: ({ node, ...props }) => (
							<h4 style={{ ...overwriteStyle }}>
								{props.children}
							</h4>
						),
						ul: ({ node, ...props }) => (
							<ul
								className="GreekWordInfo__bulletPoint"
								style={{ ...overwriteStyle }}
							>
								{props.children}
							</ul>
						),
						li: ({ node, ...props }) => (
							<li>
								<p
									className="GreekWordInfoSubCategoryValue"
									style={{ ...overwriteStyle }}
								>
									{props.children}{" "}
								</p>
							</li>
						),
						p: ({ node, ...props }) => (
							<p
								className="GreekWordInfoSubCategoryValue"
								style={{
									...overwriteStyle,
									paddingBottom: "5px",
								}}
							>
								{props.children}
							</p>
						),
						em: ({ node, ...props }) => (
							<p
								className="GreekWordInfoSubCategoryValue"
								style={{ ...overwriteStyle }}
							>
								{props.children}
							</p>
						),
					}}
				/>
			</div>
		);
	} else {
		return <></>;
	}
}

export default UnprocessedMarkdown;
