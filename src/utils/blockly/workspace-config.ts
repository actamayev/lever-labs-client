import * as Blockly from "blockly"

const workspaceConfig: Blockly.BlocklyOptions = {
	grid: {
		spacing: 20,
		length: 3,
		colour: "#ccc",
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
}

export default workspaceConfig
