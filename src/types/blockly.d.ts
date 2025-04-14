import * as Blockly from "blockly"
import { CssConfig } from "blockly/core/toolbox/category"
import { PipBlockNames } from "../utils/blockly/block-types/pip-block-types"
import { LogicBlockNames } from "../utils/blockly/block-types/logic-block-types"
import { MotorBlockNames } from "../utils/blockly/block-types/motor-block-types"
import { SensorsBlockNames } from "../utils/blockly/block-types/sensor-block-types"
import { VariableBlockNames } from "../utils/blockly/block-types/variable-block-types"

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

	interface CustomCategoryInfo extends Omit<Blockly.utils.toolbox.CategoryInfo, "contents"> {
		kind: "category"
		name: BlocklyCategoryName
		id: string | undefined
		categorystyle: string | undefined
		colour: BlocklyCategoryColours
		cssconfig: CssConfig | undefined
		hidden: string | undefined
		expanded?: string | boolean
		contents: Array<{
			kind: "block"
			type: BlockNames
		}>
	}

	type BlockNames = SensorsBlockNames | PipBlockNames | MotorBlockNames | LogicBlockNames | VariableBlockNames
}

export {}
