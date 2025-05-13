"use client"

import * as Blockly from "blockly"
import { ITheme } from "blockly/core/theme"

const commonStyles: ITheme = {
	base: Blockly.Themes.Classic,
	startHats: true,
	fontStyle: {
		family: "Lexend",
		weight: "normal",
		size: 10,
	},
	name: "",
}

// Define dark and light themes
export const darkTheme = Blockly.Theme.defineTheme("dark", {
	"componentStyles": {
		"workspaceBackgroundColour": "#1f2937", // dark gray background
		"toolboxBackgroundColour": "#141F23",
		"toolboxForegroundColour": "#ffffff",
		"flyoutBackgroundColour": "#374151",
		"flyoutForegroundColour": "#ffffff",
		"flyoutOpacity": 0.9,
		"scrollbarColour": "#4b5563",
		"insertionMarkerColour": "#60a5fa",
		"insertionMarkerOpacity": 0.3,
		"scrollbarOpacity": 0.4,
		"cursorColour": "#ffffff",
	},
	...commonStyles
})

export const lightTheme = Blockly.Theme.defineTheme("light", {
	"componentStyles": {
		"workspaceBackgroundColour": "#ffffff",
		"toolboxBackgroundColour": "#f3f4f6",
		"toolboxForegroundColour": "#1f2937",
		"flyoutBackgroundColour": "#ffffff",
		"flyoutForegroundColour": "#1f2937",
		"flyoutOpacity": 0.9,
		"scrollbarColour": "#9ca3af",
		"insertionMarkerColour": "#3b82f6",
		"insertionMarkerOpacity": 0.3,
		"scrollbarOpacity": 0.4,
		"cursorColour": "#1f2937",
	},
	...commonStyles
})

const getWorkspaceConfig = (isDarkMode: boolean): Blockly.BlocklyOptions => ({
	grid: {
		spacing: 20,
		length: 3,
		colour: isDarkMode ? "#374151" : "#ccc", // Darker grid for dark mode
		snap: true,
	},
	zoom: {
		controls: true,
		wheel: true,
		startScale: 1.0,
		maxScale: 3,
		minScale: 0.3,
		scaleSpeed: 1.2,
	},
	trashcan: true,
	sounds: false,
	theme: isDarkMode ? darkTheme : lightTheme,
	maxTrashcanContents: 0,
})

export default getWorkspaceConfig
