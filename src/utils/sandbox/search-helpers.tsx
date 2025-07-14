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
	 * Filter blocks within a category (supports nested subcategories)
	 */
	private static filterCategory(
		category: ToolboxCategory,
		searchTerm: string
	): ToolboxCategory | null {
		if (category.kind !== "category" || !Array.isArray(category.contents)) {
			return null
		}

		const filteredContents: Array<ToolboxItem> = []

		for (const item of category.contents) {
			if (this.blockMatchesSearch(item, searchTerm)) {
				// Direct block match
				filteredContents.push(item)
			} else if (this.isCategory(item)) {
				// Recursively filter subcategory
				const filteredSubcategory = this.filterCategory(item, searchTerm)
				if (filteredSubcategory) {
					filteredContents.push(filteredSubcategory)
				}
			}
		}

		return filteredContents.length > 0 ? {
			...category,
			contents: filteredContents
		} : null
	}

	/**
	 * Filter toolbox configuration based on search term
	 */
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
			const filteredCategories = (toolboxConfig as { contents: Array<unknown> }).contents
				.map((category) => this.filterCategory(category as ToolboxCategory, searchLower))
				.filter((category): category is ToolboxCategory => category !== null)

			return {
				...toolboxConfig,
				contents: filteredCategories
			}
		}

		return toolboxConfig
	}
}
