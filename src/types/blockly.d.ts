import * as Blockly from "blockly"
import { CssConfig } from "blockly/core/toolbox/category"
import { PipBlockNames } from "../utils/blockly/block-types/pip-block-types"
import { LogicBlockNames } from "../utils/blockly/block-types/logic-block-types"
import { MotorBlockNames } from "../utils/blockly/block-types/motor-block-types"
import { SensorsBlockNames } from "../utils/blockly/block-types/sensor-block-types"

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
		colour: string
	}

	interface CustomCategoryInfo extends Omit<Blockly.utils.toolbox.CategoryInfo, "contents"> extends PartialCategoryInfo {
		name: BlocklyCategoryName
		contents: Array<{
			kind: "block"
			type: BlockNames
		}>
	}

	interface ParentCategoryInfo extends Omit<Blockly.utils.toolbox.CategoryInfo, "contents"> extends PartialCategoryInfo {
		name: ParentCategoryName
		contents: Array<CustomCategoryInfo>
	}

	type BlockNames =
	| LogicBlockNames
	| SensorsBlockNames
	| PipBlockNames
	| MotorBlockNames

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
	| "IMU"

	type LogicCategoryName =
	| "Variables"
	| "Conditionals"
	| "Math"
	| "Loops"
}

export {}
