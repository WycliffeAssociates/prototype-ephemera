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

    const [leftPanelLineHeightValue, setLeftPanelLineHeightValue] = useState<number>(200);
    const [leftPanelFontSizeValue, setLeftPanelFontSizeValue] = useState<number>(20);
    const [informationPanelLineHeightValue, setInformationPanelLineHeightValue] = useState<number>(150);
    const [informationPanelFontSizeValue, setInformationPanelFontSizeValue] = useState<number>(20);

    
    const leftPanelTextFontSetting : ULBSettingsOption = {
        name: "Font Size",
        value: leftPanelFontSizeValue,
        modifier: function (newValue: number | string | number | boolean | undefined) {
            setLeftPanelFontSizeValue(newValue as number);
        },
        inputType:"increment",
        unit:"px",
        styleOverrideKey: "fontSize",
        level: "all",
        defaultValue: 20,
    }
    
    const leftPanelLineHeightSetting : ULBSettingsOption = {
        name: "Line Height",
        value: leftPanelLineHeightValue,
        modifier: function (newValue: number | string | number | boolean | undefined) {
            setLeftPanelLineHeightValue(newValue as number);
        },
        inputType:"increment",
        unit:"%",
        styleOverrideKey: "lineHeight",
        level: "verse",
        defaultValue: 200,
    }
    
    const informationPanelTextFontSetting : SettingsOption = {
        name: "Font Size",
        value: informationPanelFontSizeValue,
        modifier: function (newValue: number | string | number | boolean | undefined) {
            setInformationPanelFontSizeValue(newValue as number);
        },
        inputType:"increment",
        unit:"px",
        styleOverrideKey: "fontSize",
        defaultValue: 20,
    }
    
    const informationPanelLineHeightSetting : SettingsOption = {
        name: "Line Height",
        value: informationPanelLineHeightValue,
        modifier: function (newValue: number | string | number | boolean | undefined) {
            setInformationPanelLineHeightValue(newValue as number);
        },
        inputType:"increment",
        unit:"%",
        styleOverrideKey: "lineHeight",
        defaultValue: 150,
    }

    return (
        <SettingsContext.Provider value={{
            ULBSettings: [
                leftPanelTextFontSetting, 
                leftPanelLineHeightSetting
            ] as ULBSettingsOption[], 
            GWTSettings: [
                informationPanelTextFontSetting, 
                informationPanelLineHeightSetting
            ] as SettingsOption[],
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

