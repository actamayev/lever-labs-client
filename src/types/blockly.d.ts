import * as Blockly from "blockly"
import { CssConfig } from "blockly/core/toolbox/category"
import { MOTOR_BLOCK_TYPES } from "../utils/blockly/block-types/motor-block-types"
import { LED_BLOCK_TYPES } from "../utils/blockly/block-types/led-block-types"
import { LOGIC_BLOCK_TYPES } from "../utils/blockly/block-types/logic-block-types"
import { SENSORS_BLOCK_TYPES } from "../utils/blockly/block-types/sensor-block-types"

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

	interface BlocklyState {
		xml: string
		cppCode: string
	}

	interface PartialCategoryInfo {
		kind: "category",
		id: undefined,
		categorystyle: undefined,
		cssconfig: CssConfig | undefined,
		hidden: undefined
		expanded?: string | boolean
	}

	interface CustomCategoryInfo extends Omit<Blockly.utils.toolbox.CategoryInfo, "contents"> extends PartialCategoryInfo {
		name: BlocklyCategoryName
		colour: HexColor
		contents: Array<{
			kind: "block"
			type: BlockNames
		}>
	}

	interface ParentCategoryInfo extends Omit<Blockly.utils.toolbox.CategoryInfo, "contents"> extends PartialCategoryInfo {
		name: ParentCategoryName
		colour: HexColor
		contents: Array<CustomCategoryInfo>
	}

	type BlockNames =
	| MOTOR_BLOCK_TYPES
	| LED_BLOCK_TYPES
	| LOGIC_BLOCK_TYPES
	| SENSORS_BLOCK_TYPES

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
