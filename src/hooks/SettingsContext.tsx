import React, { useState, useContext } from "react";
import { SettingsOption } from '../types';


const SettingsContext = React.createContext({
    ULBSettings: {} as any, 
    GWTSettings: {} as any
});

export function useSettings() {
    return useContext(SettingsContext)
}

export function SettingsProvider({children} : any) {

    const [ULBLineHeightValue, setULBLineHeightValue] = useState<number>(100);
    const [ULBFontSizeValue, setULBFontSizeValue] = useState<number>(20);
    const [underlineTextValue, setUnderlineTextValue] = useState<boolean>(true);
    const [GWTLineHeightValue, setGWTLineHeightValue] = useState<number>(100);
    const [GWTFontSizeValue, setGWTFontSizeValue] = useState<number>(20);

    const underlineSetting : SettingsOption = {
        name: "Underline Text",
        value: underlineTextValue,
        modifier: function (newValue: number | string | number | boolean | undefined) {
            setUnderlineTextValue(!underlineTextValue);
        },
        type:"switch",
    }
    
    const ULBTextFontSetting : SettingsOption = {
        name: "ULB Font Size",
        value: ULBFontSizeValue,
        modifier: function (newValue: number | string | number | boolean | undefined) {
            setULBFontSizeValue(newValue as number);
        },
        type:"increment",
        unit:"px",
    }
    
    const ULBLineHeightSetting : SettingsOption = {
        name: "ULB Line Height",
        value: ULBLineHeightValue,
        modifier: function (newValue: number | string | number | boolean | undefined) {
            setULBLineHeightValue(newValue as number);
        },
        type:"increment",
        unit:"%",
    }
    
    const GWTTextFontSetting : SettingsOption = {
        name: "GWT Font Size",
        value: GWTFontSizeValue,
        modifier: function (newValue: number | string | number | boolean | undefined) {
            setGWTFontSizeValue(newValue as number);
        },
        type:"increment",
        unit:"px",
    }
    
    const GWTLineHeightSetting : SettingsOption = {
        name: "GWT Line Height",
        value: GWTLineHeightValue,
        modifier: function (newValue: number | string | number | boolean | undefined) {
            setGWTLineHeightValue(newValue as number);
        },
        type:"increment",
        unit:"%",
    }

    return (
        <SettingsContext.Provider value={{
            ULBSettings: [
                underlineSetting, 
                ULBTextFontSetting, 
                ULBLineHeightSetting
            ], 
            GWTSettings: [
                GWTTextFontSetting, 
                GWTLineHeightSetting
            ]
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

