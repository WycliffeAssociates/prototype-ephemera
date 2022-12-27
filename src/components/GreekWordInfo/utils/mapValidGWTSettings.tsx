import { SettingsOption } from "../../../types";

export function mapValidGWTSettings(GWTSettings : SettingsOption[]) {

    let overwriteStyle : any = {};

    GWTSettings.forEach((setting : any) => {
      if(setting?.styleOverrideKey && setting.value !== undefined){
        let styleValue = setting?.styleOverrideValue ? setting?.styleOverrideValue : setting.value;
        let styleUnit = setting.unit ? setting.unit : "";
        overwriteStyle[setting.styleOverrideKey] = "" + styleValue + styleUnit;
      }
    });

    return overwriteStyle;
}