import React, { useState, useContext } from "react";
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
				| number
				| boolean
				| undefined
		) {
			setLeftPanelFontSizeValue(parseInt(newValue + ""));
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
				| number
				| boolean
				| undefined
		) {
			setLeftPanelLineHeightValue(parseInt(newValue + ""));
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
				| number
				| boolean
				| undefined
		) {
			setInformationPanelFontSizeValue(parseInt(newValue + ""));
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
					| number
					| boolean
					| undefined
			) {
				setInformationPanelLineHeightValue(
					parseInt(newValue + "")
				);
			},
			inputType: "increment",
			unit: "%",
			styleOverrideKey: "lineHeight",
			defaultValue: DEFAULT_INFORMATIONPANEL_LINE_HEIGHT,
		};

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
