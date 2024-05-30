import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { getMorphDescription } from "../../../../applicationLogic/mapping/mapAbbreviatedMorph";
import { useSettings } from "../../../../hooks/SettingsContext";
import useMorphologyParams from "../../../../hooks/useMorphologyParams";
import { mapValidGWTSettings } from "./mapValidGWTSettings";

interface morphologyProps {
	morphology?: string;
	abbreviatedMorphology?: string;
	showMore?: boolean;
}

function Morphology({
	morphology,
	abbreviatedMorphology,
	showMore,
}: morphologyProps) {
	const { GWTSettings } = useSettings();
	const overwriteStyle: any = mapValidGWTSettings(GWTSettings);
	const [morphologyLinks, setMorphologyLinks] = useState<string[]>([]);
	const { setMorphologyParams } = useMorphologyParams();

	useEffect(() => {
		if (abbreviatedMorphology)
			setMorphologyLinks([
				...getMorphDescription(abbreviatedMorphology).split(","),
			]);
		else setMorphologyLinks([]);
	}, [abbreviatedMorphology]);

	function capitalizeFirstLetter(str: string | undefined): string {
		if (str === undefined) {
			return "";
		}

		if (/^[a-zA-Z]/.test(str)) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}
		return str;
	}

	if (morphology !== undefined) {
		return (
			<>
				{showMore === true || showMore === undefined ? (
					<Grid item xs={12}>
						<p
							className="GreekWordInfoSubCategory"
							style={{ ...overwriteStyle }}
						>
							What type of word is this?
						</p>
					</Grid>
				) : (
					""
				)}

				<Grid item xs={12}>
					{showMore === true || showMore === undefined ? (
						<p
							className="GreekWordInfoSubCategoryValue"
							style={{ ...overwriteStyle }}
						>
							{morphology}
						</p>
					) : (
						""
					)}

					<div style={{ float: "left" }}>
						{morphologyLinks.map((link, idx) => {
							if (idx !== morphologyLinks.length - 1) {
								return (
									<>
										<span
											className="GreekWordInfoSubCategoryValue"
											style={{
												textDecoration: "underline",
												cursor: "pointer",
												color: "blue",
												width: "100%",
												...overwriteStyle,
											}}
											onClick={() =>
												setMorphologyParams(link.trim().toLowerCase())
											}
										>
											{capitalizeFirstLetter(link.trim())}
										</span>
										<span> | </span>
									</>
								);
							}
							return (
								<span
									key={`GreekWordInfoSubCategoryValue ${idx}`}
									className="GreekWordInfoSubCategoryValue"
									style={{
										textDecoration: "underline",
										cursor: "pointer",
										color: "blue",
										width: "100%",
										...overwriteStyle,
									}}
									onClick={() => setMorphologyParams(link.trim().toLowerCase())}
								>
									{capitalizeFirstLetter(link.trim())}
								</span>
							);
						})}
					</div>
				</Grid>
			</>
		);
	}
	return <></>;
}

export default Morphology;
