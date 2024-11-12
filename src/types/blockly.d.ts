import { BlockNames } from "../utils/blockly/block-types"

declare global {
	interface CustomBlockDefinition {
		init(this: Blockly.Block): void;
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

	type ArgTypes = "field_number" | "field_dropdown" | "input_value" | "input_dummy" | "input_statement"

	type OutputType = "Number"

	interface CustomCategoryInfo extends Omit<Blockly.utils.toolbox.CategoryInfo, "contents"> {
		kind: "category"
		name: string;
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
}

export {}
