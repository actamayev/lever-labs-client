import * as Blockly from "blockly"

// eslint-disable-next-line @typescript-eslint/naming-convention
const toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition = {
	kind: "categoryToolbox",
	contents: [
		{
			kind: "category",
			name: "Logic",
			colour: "#5C81A6",
			contents: [
				{
					kind: "block",
					type: "controls_if",
				},
				{
					kind: "block",
					type: "logic_compare",
				},
			],
		},
		{
			kind: "category",
			name: "Loops",
			colour: "#5CA65C",
			contents: [
				{
					kind: "block",
					type: "controls_repeat_ext",
				},
				{
					kind: "block",
					type: "controls_whileUntil",
				},
			],
		},
		{
			kind: "category",
			name: "Custom",
			colour: "#5CA699",
			contents: [
				{
					kind: "block",
					type: "custom_block",
				}
			]
		}
	]
}

export default toolboxConfig
