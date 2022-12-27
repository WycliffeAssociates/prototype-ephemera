import React, { useState, useContext } from "react";
import { SettingsOption, ULBSettingsOption } from '../types';


const SettingsContext = React.createContext({
    ULBSettings: [] as ULBSettingsOption[], 
    GWTSettings: [] as SettingsOption[],
});

export function useSettings() {
    return useContext(SettingsContext)
}

export function SettingsProvider({children} : any) {

    const [ULBLineHeightValue, setULBLineHeightValue] = useState<number>(200);
    const [ULBFontSizeValue, setULBFontSizeValue] = useState<number>(20);
    const [underlineTextValue, setUnderlineTextValue] = useState<boolean>(true);
    const [GWTLineHeightValue, setGWTLineHeightValue] = useState<number>(150);
    const [GWTFontSizeValue, setGWTFontSizeValue] = useState<number>(16);

    const underlineSetting : ULBSettingsOption = {
        name: "Underline Text",
        value: underlineTextValue,
        modifier: function (newValue: number | string | number | boolean | undefined) {
            setUnderlineTextValue(!underlineTextValue);
        },
        inputType:"switch",
        styleOverrideKey: "textDecoration",
        styleOverrideValue: underlineTextValue ? "underline" : "none",
        level: "word",
    }
    
    const ULBTextFontSetting : ULBSettingsOption = {
        name: "ULB Font Size",
        value: ULBFontSizeValue,
        modifier: function (newValue: number | string | number | boolean | undefined) {
            setULBFontSizeValue(newValue as number);
        },
        inputType:"increment",
        unit:"px",
        styleOverrideKey: "fontSize",
        level: "word",
    }
    
    const ULBLineHeightSetting : ULBSettingsOption = {
        name: "ULB Line Height",
        value: ULBLineHeightValue,
        modifier: function (newValue: number | string | number | boolean | undefined) {
            setULBLineHeightValue(newValue as number);
        },
        inputType:"increment",
        unit:"%",
        styleOverrideKey: "lineHeight",
        level: "verse",
    }
    
    const GWTTextFontSetting : SettingsOption = {
        name: "GWT Font Size",
        value: GWTFontSizeValue,
        modifier: function (newValue: number | string | number | boolean | undefined) {
            setGWTFontSizeValue(newValue as number);
        },
        inputType:"increment",
        unit:"px",
        styleOverrideKey: "fontSize",
    }
    
    const GWTLineHeightSetting : SettingsOption = {
        name: "GWT Line Height",
        value: GWTLineHeightValue,
        modifier: function (newValue: number | string | number | boolean | undefined) {
            setGWTLineHeightValue(newValue as number);
        },
        inputType:"increment",
        unit:"%",
        styleOverrideKey: "lineHeight",
    }

    return (
        <SettingsContext.Provider value={{
            ULBSettings: [
                underlineSetting, 
                ULBTextFontSetting, 
                ULBLineHeightSetting
            ] as ULBSettingsOption[], 
            GWTSettings: [
                GWTTextFontSetting, 
                GWTLineHeightSetting
            ] as SettingsOption[]
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

