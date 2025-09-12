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
		"toolboxBackgroundColour": "#202f36",
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
		"toolboxBackgroundColour": "#f7f7f7",
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
	viewOnly: boolean,
	startScale: number = 1,
	disableZoomAndScroll = false
): Blockly.BlocklyOptions => {
	// Configure movement and scrolling behavior
	let moveConfig: Blockly.BlocklyOptions["move"] = undefined

	if (disableZoomAndScroll) {
		// Keep scrollbars true so Blockly creates the internal scrollbar objects
		// which are required by workspace.scrollCenter() and other metrics-based APIs.
		moveConfig = {
			scrollbars: {
				horizontal: true,
				vertical: true,
			},
			drag: false,   // user can't drag the canvas
			wheel: false,  // wheel zoom/scroll disabled
		}
	}

	return {
		grid: {
			spacing: 20,
			length: 3,
			colour: isDarkMode ? "#374151" : "#ccc",
			snap: true,
		},
		zoom: {
			controls: viewOnly ? false : !disableZoomAndScroll,
			wheel: viewOnly ? false : !disableZoomAndScroll,
			startScale,
			maxScale: 3,
			minScale: 0.3,
			scaleSpeed: 1.2,
		},
		trashcan: viewOnly ? false : true,
		sounds: false,
		theme: isDarkMode ? darkTheme : lightTheme,
		maxTrashcanContents: 0,
		readOnly: viewOnly, // This makes blocks non-draggable and non-editable
		move: moveConfig,
	}
}

export default getWorkspaceConfig
