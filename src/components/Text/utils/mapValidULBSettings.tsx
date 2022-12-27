import { ULBSettingsOption } from "../../../types";

export function mapValidULBSettings(ULBSettings : ULBSettingsOption[]) {
    let overwriteStyle : any = {};
    ULBSettings.forEach((setting : any) => {
        if(setting.level === "word" && setting?.styleOverrideKey && setting.value !== undefined){
          let styleValue = setting?.styleOverrideValue ? setting?.styleOverrideValue : setting.value;
          let styleUnit = setting.unit ? setting.unit : "";
          
          overwriteStyle[setting.styleOverrideKey] = "" + styleValue + styleUnit;
        }
    });

    return overwriteStyle;
}