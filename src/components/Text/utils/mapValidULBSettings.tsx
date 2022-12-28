import { ULBSettingsOption } from "../../../types";


export function mapValidULBSettings(ULBSettings : ULBSettingsOption[]) : {verseStyles: any, wordStyles: any}{
    let overwriteStyle : any = {verseStyles: {}, wordStyles: {}};
    ULBSettings.forEach((setting : any) => {

      let styleValue : any = {};
      let styleUnit : string = "";
      if(setting?.styleOverrideKey && setting?.value) {
        styleValue = setting?.styleOverrideValue ? setting?.styleOverrideValue : setting.value;
        styleUnit = setting.unit ? setting.unit : "";
      }

      if(setting.level === "word"){
        overwriteStyle.wordStyles[setting.styleOverrideKey] = "" + styleValue + styleUnit;
      } else if(setting.level === "verse") {
        overwriteStyle.verseStyles[setting.styleOverrideKey] = "" + styleValue + styleUnit;
      }
    });

    return overwriteStyle;
}