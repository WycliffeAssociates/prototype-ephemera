import type { SettingsOption } from "../../../../types";

export function mapValidGWTSettings(GWTSettings: SettingsOption[]) {
	const overwriteStyle: any = {};

	GWTSettings.forEach((setting: any) => {
		if (setting?.styleOverrideKey && setting.value !== undefined) {
			const styleValue = setting?.styleOverrideValue
				? setting?.styleOverrideValue
				: setting.value;
			const styleUnit = setting.unit ? setting.unit : "";
			overwriteStyle[setting.styleOverrideKey] = `${styleValue}${styleUnit}`;
		}
	});

	return overwriteStyle;
}
