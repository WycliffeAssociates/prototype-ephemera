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
    const [GWTLineHeightValue, setGWTLineHeightValue] = useState<number>(150);
    const [GWTFontSizeValue, setGWTFontSizeValue] = useState<number>(16);

    
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
        defaultValue: 20,
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
        defaultValue: 200,
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
        defaultValue: 16,
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
        defaultValue: 150,
    }

    return (
        <SettingsContext.Provider value={{
            ULBSettings: [
                ULBTextFontSetting, 
                ULBLineHeightSetting
            ] as ULBSettingsOption[], 
            GWTSettings: [
                GWTTextFontSetting, 
                GWTLineHeightSetting
            ] as SettingsOption[],
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

