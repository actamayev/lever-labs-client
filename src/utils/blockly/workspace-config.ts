"use client"

import * as Blockly from "blockly"

type ITheme = Parameters<typeof Blockly.Theme.defineTheme>[1]

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

const getWorkspaceConfig = (
	isDarkMode: boolean,
	viewOnly: boolean
): Blockly.BlocklyOptions => ({
	grid: {
		spacing: 20,
		length: 3,
		colour: isDarkMode ? "#374151" : "#ccc",
		snap: true,
	},
	zoom: {
		controls: viewOnly ? false : true,
		wheel: viewOnly ? false : true,
		startScale: 1.0,
		maxScale: 3,
		minScale: 0.3,
		scaleSpeed: 1.2,
	},
	trashcan: viewOnly ? false : true,
	sounds: false,
	theme: isDarkMode ? darkTheme : lightTheme,
	maxTrashcanContents: 0,
	readOnly: viewOnly, // This makes blocks non-draggable and non-editable
	// For view-only, allow scrolling for centering but disable user interaction
	move: viewOnly ? {
		scrollbars: {
			horizontal: true,  // Allow horizontal scrolling for centering
			vertical: true     // Allow vertical scrolling for centering
		},
		drag: false,          // Disable dragging the workspace
		wheel: false          // Disable mouse wheel scrolling by user
	} : undefined,
})

export default getWorkspaceConfig
