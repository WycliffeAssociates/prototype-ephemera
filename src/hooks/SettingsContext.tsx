import React, { useState, useContext, useEffect } from "react";
import {
	SettingsOption,
	ULBSettingsOption,
} from "../types";
import { 
	DEFAULT_INFORMATIONPANEL_FONT_SIZE, 
	DEFAULT_INFORMATIONPANEL_LINE_HEIGHT,
	DEFAULT_ULB_FONT_SIZE,
	DEFAULT_ULB_LINE_HEIGHT
} from "../constants";

const SettingsContext = React.createContext({
	ULBSettings: [] as ULBSettingsOption[],
	GWTSettings: [] as SettingsOption[],
});

export function useSettings() {
	return useContext(SettingsContext);
}

export function SettingsProvider({ children }: any) {
	const [
		leftPanelLineHeightValue,
		setLeftPanelLineHeightValue,
	] = useState(DEFAULT_ULB_LINE_HEIGHT);
	const [
		leftPanelFontSizeValue,
		setLeftPanelFontSizeValue,
	] = useState(DEFAULT_ULB_FONT_SIZE);
	const [
		informationPanelLineHeightValue,
		setInformationPanelLineHeightValue,
	] = useState(DEFAULT_INFORMATIONPANEL_LINE_HEIGHT);
	const [
		informationPanelFontSizeValue,
		setInformationPanelFontSizeValue,
	] = useState(DEFAULT_INFORMATIONPANEL_FONT_SIZE);

	const leftPanelTextFontSetting: ULBSettingsOption = {
		name: "Font Size",
		value: leftPanelFontSizeValue,
		modifier: function (
			newValue:
				| number
				| string
				| boolean
				| undefined
		) {
			setLeftPanelFontSizeValue(parseInt(newValue + ""));
			if(newValue) {
				writeSettingsToLocalStorage("ULB", "Font Size", newValue)
			}
		},
		inputType: "increment",
		unit: "px",
		styleOverrideKey: "fontSize",
		level: "all",
		defaultValue: DEFAULT_ULB_FONT_SIZE,
	};

	const leftPanelLineHeightSetting: ULBSettingsOption = {
		name: "Line Height",
		value: leftPanelLineHeightValue,
		modifier: function (
			newValue:
				| number
				| string
				| boolean
				| undefined
		) {
			setLeftPanelLineHeightValue(parseInt(newValue + ""));
			if(newValue) {
				writeSettingsToLocalStorage("ULB", "Line Height", newValue)
			}
		},
		inputType: "increment",
		unit: "%",
		styleOverrideKey: "lineHeight",
		level: "verse",
		defaultValue: DEFAULT_ULB_LINE_HEIGHT,
	};

	const informationPanelTextFontSetting: SettingsOption = {
		name: "Font Size",
		value: informationPanelFontSizeValue,
		modifier: function (
			newValue:
				| number
				| string
				| boolean
				| undefined
		) {
			setInformationPanelFontSizeValue(parseInt(newValue + ""));
			if(newValue) {
				writeSettingsToLocalStorage("GWT", "Font Size", newValue)
			}
		},
		inputType: "increment",
		unit: "px",
		styleOverrideKey: "fontSize",
		defaultValue: DEFAULT_INFORMATIONPANEL_FONT_SIZE,
	};

	const informationPanelLineHeightSetting: SettingsOption =
		{
			name: "Line Height",
			value: informationPanelLineHeightValue,
			modifier: function (
				newValue:
					| number
					| string
					| boolean
					| undefined
			) {
				setInformationPanelLineHeightValue(
					parseInt(newValue + "")
				);
				if(newValue) {
					writeSettingsToLocalStorage("GWT", "Line Height", newValue)
				}
			},
			inputType: "increment",
			unit: "%",
			styleOverrideKey: "lineHeight",
			defaultValue: DEFAULT_INFORMATIONPANEL_LINE_HEIGHT,
		};

	// TODO: write a function that takes in the settings options and value to write to local storage
	type StoredSettings = {
		[key: string]: {
		  [key: string]: number | string | boolean;
		};
	  };

	
	function writeSettingsToLocalStorage(settingScope:string, settingName:string, settingValue:string | number | boolean) {
		let storedSettings = localStorage.getItem("settings");

		if (storedSettings) {
			let previousSettings = JSON.parse(storedSettings);

			previousSettings[settingScope][settingName] = settingValue;

			localStorage.setItem(
				"settings",
				JSON.stringify(previousSettings)
			);

		} else {
			let newSettings : StoredSettings = {"ULB":{}, "GWT":{}};

			newSettings[settingScope][settingName] = settingValue;
			

			localStorage.setItem(
				"settings",
				JSON.stringify(newSettings)
			);
		}
	}

	function initializeStoredSettings() {
		let initialSettings = {
			"ULB" : {
				"Font Size": leftPanelFontSizeValue,
				"Line Height": leftPanelLineHeightValue
			},
			"GWT" : {
				"Font Size": informationPanelFontSizeValue,
				"Line Height": informationPanelLineHeightValue
			}
		}

		localStorage.setItem(
			"settings",
			JSON.stringify(initialSettings)
		);
	}


	useEffect(() => {

		let storedSettings = localStorage.getItem("settings");
		if(!storedSettings){
			initializeStoredSettings();
		} else {
			let previousSettings = JSON.parse(storedSettings);

			// TODO: refactor this when I get more feedback from Aby and Dian
			setInformationPanelFontSizeValue(previousSettings["GWT"]["Font Size"]);
			setInformationPanelLineHeightValue(previousSettings["GWT"]["Line Height"]);
			setLeftPanelFontSizeValue(previousSettings["ULB"]["Font Size"]);
			setLeftPanelLineHeightValue(previousSettings["ULB"]["Line Height"]);
		}
	}, [])


	return (
		<SettingsContext.Provider
			value={{
				ULBSettings: [
					leftPanelTextFontSetting,
					leftPanelLineHeightSetting,
				],
				GWTSettings: [
					informationPanelTextFontSetting,
					informationPanelLineHeightSetting,
				],
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
}
