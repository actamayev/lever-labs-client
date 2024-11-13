import * as Blockly from "blockly"
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

	interface CustomCategoryInfo extends Omit<Blockly.utils.toolbox.CategoryInfo, "contents"> {
		kind: "category"
		name: string
		id: string | undefined
		categorystyle: string | undefined
		colour: number
		cssconfig: CssConfig | undefined
		hidden: string | undefined
		expanded?: string | boolean
		contents: Array<
			| { kind: "block"; type: BlockNames }
			| { kind: "category"; name: string; colour: string; contents: CustomCategoryInfo["contents"] }
		>
	}

	type BlockNames = SensorsBlockNames | PipBlockNames | MotorBlockNames | LogicBlockNames
}

export {}
