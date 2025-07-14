/* eslint-disable max-len */
import * as Blockly from "blockly"
import { BlocklyCategoryName, BlockNames, ParentCategoryName, ToolboxItem, } from "@bluedotrobots/common-ts"

declare global {
	interface CustomBlockDefinition {
		init(this: Blockly.Block): void
		keywords?: string[]
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
		cssconfig: Blockly.ToolboxCategory.CssConfig | undefined
		hidden: undefined
		expanded?: string | boolean
	}

	interface CustomCategoryInfo extends Omit<Blockly.utils.toolbox.CategoryInfo, "contents" | "kind" | "id" | "categorystyle" | "cssconfig" | "hidden" | "expanded">, PartialCategoryInfo {
		name: BlocklyCategoryName
		colour: HexColor
		contents: ToolboxItem[]
	}

	interface ParentCategoryInfo extends Omit<Blockly.utils.toolbox.CategoryInfo, "contents" | "kind" | "id" | "categorystyle" | "cssconfig" | "hidden" | "expanded">, PartialCategoryInfo {
		name: ParentCategoryName
		colour: HexColor
		contents: CustomCategoryInfo[]
	}
}

export {}
