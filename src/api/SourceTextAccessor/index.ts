import type { AlignedVerse } from "../../types";
import { Door43UsfmAccessor } from "./Door43UsfmAccessor";
import { OsisEnUlbAccessor } from "./OsisEnUlbAccessor";
import { WacsXmlAccessor } from "./WacsXmlAccessor";
import { AlignmentExplorationUsfmAccessor } from "./AlignmentExplorationUsfmAccessor";


export type SourceTextResource = {
	resourceBaseURL: string;
	resourceType: string;
	resourceLanguage: string;
};

export interface SourceTextAccessor {
	setSourceTextResource(resourceType: string, resourceLanguage: string): void;
	getSourceText(
		bookName: string,
		chapter: number | string,
	): Promise<AlignedVerse[]>;
}

export interface SourceTextFetcher {
	sourceTextResource: SourceTextResource;

	fetchSourceText(bookName: string): Promise<string | undefined>;
	parseSourceText(sourceText: string, chapter: number): AlignedVerse[];
}

export class SourceTextAccessorFactory {
	private osisAccessor = new OsisEnUlbAccessor("ulb", "en");
	private door43Accessor = new Door43UsfmAccessor("", "");
	private wacsAccessor = new WacsXmlAccessor("ulb", "en");
	private alignedExplorationUsfmAccessor = new AlignmentExplorationUsfmAccessor("ulb", "en")

	getSourceTextAccessor(
		resourceType: string,
		resourceLanguage: string,
	): SourceTextAccessor {
		// if (resourceType.toLocaleLowerCase() === "ulb") {
		// 	return this.wacsAccessor;
		// }

		// this.door43Accessor.setSourceTextResource(resourceType, resourceLanguage);
		// return this.door43Accessor;
		return this.alignedExplorationUsfmAccessor;
	}
}
