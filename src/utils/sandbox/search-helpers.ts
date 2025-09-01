import * as Blockly from "blockly"

// Define types for toolbox items
type ToolboxBlock = { kind: "block"; type: string }
type ToolboxCategory = { kind: "category"; contents?: Array<ToolboxItem>; [key: string]: unknown }
type ToolboxItem = ToolboxBlock | ToolboxCategory

/**
 * A utility class for filtering Blockly toolbox configurations based on search terms.
 */
export default class BlocklySearchFilter {
	/**
	 * Get searchable text from a block type
	 */
	private static getBlockSearchableText(blockType: string): string {
		const blockDefinition = Blockly.Blocks[blockType]
		if (!blockDefinition) return blockType

		let searchText = blockType + " "

		try {
			const tempWorkspace = new Blockly.Workspace()
			const tempBlock = tempWorkspace.newBlock(blockType)

			// Extract text from field labels
			for (const input of tempBlock.inputList) {
				for (const field of input.fieldRow) {
					// eslint-disable-next-line max-depth
					if (field instanceof Blockly.FieldLabel) {
						searchText += field.getText() + " "
					}
				}
			}

			// Add tooltip
			if (typeof tempBlock.tooltip === "string") {
				searchText += tempBlock.tooltip + " "
			}

			// Add keywords from the block definition
			if (blockDefinition.keywords && Array.isArray(blockDefinition.keywords)) {
				searchText += blockDefinition.keywords.join(" ") + " "
			}

			tempBlock.dispose()
			tempWorkspace.dispose()
		} catch (error) {
			console.warn(`Could not extract text from block ${blockType}:`, error)
		}

		return searchText.toLowerCase()
	}

	/**
	 * Check if a block matches the search term
	 */
	private static blockMatchesSearch(
		item: ToolboxItem,
		searchTerm: string
	): boolean {
		return (
			item.kind === "block" &&
			typeof item.type === "string" &&
			this.getBlockSearchableText(item.type).includes(searchTerm)
		)
	}

	/**
	 * Check if an item is a category (subcategory)
	 */
	private static isCategory(item: ToolboxItem): item is ToolboxCategory {
		return item.kind === "category" && Array.isArray(item.contents)
	}

	/**
	 * Recursively collect all blocks from a category and its subcategories
	 */
	private static collectAllBlocks(category: ToolboxCategory): Array<ToolboxBlock> {
		const blocks: Array<ToolboxBlock> = []

		if (!Array.isArray(category.contents)) {
			return blocks
		}

		for (const item of category.contents) {
			if (item.kind === "block") {
				blocks.push(item)
			} else if (this.isCategory(item)) {
				// Recursively collect blocks from subcategories
				blocks.push(...this.collectAllBlocks(item))
			}
		}

		return blocks
	}

	/**
	 * Filter toolbox configuration based on search term
	 */
	// eslint-disable-next-line complexity
	public static filterToolboxConfig(
		toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition,
		searchTerm: string
	): Blockly.utils.toolbox.ToolboxDefinition {
		if (!searchTerm.trim() || typeof toolboxConfig === "string") {
			return toolboxConfig
		}

		const searchLower = searchTerm.toLowerCase()

		// Check if it's a category toolbox
		if (
			typeof toolboxConfig === "object" &&

			toolboxConfig !== null &&
			"kind" in toolboxConfig &&
			toolboxConfig.kind === "categoryToolbox" &&
			"contents" in toolboxConfig &&
			Array.isArray((toolboxConfig as { contents?: Array<unknown> }).contents)
		) {
			// Collect all blocks from all categories
			const allBlocks: Array<ToolboxBlock> = []

			for (const category of (toolboxConfig as { contents: Array<unknown> }).contents) {
				if (this.isCategory(category as ToolboxCategory)) {
					allBlocks.push(...this.collectAllBlocks(category as ToolboxCategory))
				}
			}

			// Filter blocks that match the search term
			const matchingBlocks = allBlocks.filter((block) =>
				this.blockMatchesSearch(block, searchLower)
			)

			// Return a flyout toolbox with all matching blocks (no categories)
			// The parent component will handle the toolbox type change via React key
			return {
				kind: "flyoutToolbox",
				contents: matchingBlocks
			}
		}

		return toolboxConfig
	}
}
