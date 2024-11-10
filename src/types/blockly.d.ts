import { BlockNames } from "../utils/blockly/block-types"

declare global {
	interface CustomBlockDefinition {
		type: BlockNames
		message0: string
		args0?: Array<{
			type: ArgTypes
			name: string
			value?: number | string
			min?: number
			max?: number
			check?: string
			options?: Array<[string, string]>
		}>
		output?: OutputType
		previousStatement?: boolean | null
		nextStatement?: boolean | null
		colour: number
		tooltip: string
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
		javascriptCode: string
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
