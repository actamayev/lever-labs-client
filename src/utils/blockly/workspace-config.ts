import * as Blockly from "blockly"

// Define dark and light themes
export const darkTheme = Blockly.Theme.defineTheme("dark", {
	"base": Blockly.Themes.Classic,
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
	name: ""
})

export const lightTheme = Blockly.Theme.defineTheme("light", {
	"base": Blockly.Themes.Classic,
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
	name: ""
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
	// renderer: "thrasos",
})

export default getWorkspaceConfig
