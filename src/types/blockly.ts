/* eslint-disable max-len */
import * as Blockly from "blockly"
import { BlockNames } from "@bluedotrobots/common-ts"
import { CssConfig } from "blockly/core/toolbox/category"

declare global {
	interface CustomBlockDefinition {
		init(this: Blockly.Block): void
	}

	interface CustomBlock {
		definition: CustomBlockDefinition
		generator: (block: Blockly.Block) => string | [string, number]
	}

	interface CustomBlocks {
		kinds: Record<BlockNames, CustomBlock>
	}

	interface PartialCategoryInfo {
		kind: "category"
		id: undefined
		categorystyle: undefined
		cssconfig: CssConfig | undefined
		hidden: undefined
		expanded?: string | boolean
	}

	interface CustomContents {
		kind: "block"
		type: BlockNames
	}

	interface CustomCategoryInfo extends Omit<Blockly.utils.toolbox.CategoryInfo, "contents" | "kind" | "id" | "categorystyle" | "cssconfig" | "hidden" | "expanded">, PartialCategoryInfo {
		name: BlocklyCategoryName
		colour: HexColor
		contents: CustomContents[]
	}

	interface ParentCategoryInfo extends Omit<Blockly.utils.toolbox.CategoryInfo, "contents" | "kind" | "id" | "categorystyle" | "cssconfig" | "hidden" | "expanded">, PartialCategoryInfo {
		name: ParentCategoryName
		colour: HexColor
		contents: CustomCategoryInfo[]
	}

	type BlocklyCategoryName =
	| "Screen"
	| "Motors"
	| "LED"
	| "Speaker"
	| "Buttons"
	| SensorCategoryName
	| LogicCategoryName

	type ParentCategoryName =
	| "Sensors"
	| "Logic"

	type SensorCategoryName =
	| "IR Sensors"
	| "Distance Sensors"
	| "Motion Sensor"
	| "Color Sensor"

	type LogicCategoryName =
	| "Variables"
	| "Conditionals"
	| "Math"
	| "Loops"
	| "Start"
}

export {}
