import * as Blockly from "blockly"

/**
 * A utility class for filtering Blockly toolbox configurations based on search terms.
 */
export default class BlocklySearchFilter {
	/**
	 * Debug method to check if keywords are loaded correctly
	 */
	public static debugKeywords(): void {
		console.log("🔍 Debugging Blockly Block Keywords:")

		Object.keys(Blockly.Blocks).forEach(blockType => {
			const blockDefinition = Blockly.Blocks[blockType]
			if (blockDefinition && blockDefinition.keywords) {
				console.log(`${blockType}:`, blockDefinition.keywords)
			}
		})
	}

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
		item: { kind: string; type?: string },
		searchTerm: string
	): boolean {
		return (
			item.kind === "block" &&
			typeof item.type === "string" &&
			this.getBlockSearchableText(item.type).includes(searchTerm)
		)
	}

	/**
	 /**
	  * Filter blocks within a category
	  */
	private static filterCategory(
		category: { kind: string; contents?: Array<{ kind: string; type?: string }> },
		searchTerm: string
	): { kind: string; contents?: Array<{ kind: string; type?: string }> } | null {
		if (category.kind === "category" && Array.isArray(category.contents)) {
			const filteredBlocks = category.contents.filter((item) =>
				this.blockMatchesSearch(item, searchTerm)
			)

			return filteredBlocks.length > 0 ? {
				...category,
				contents: filteredBlocks
			} : null
		}
		return null
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
				// eslint-disable-next-line max-len
				.map((category) => this.filterCategory(category as { kind: string; contents?: Array<{ kind: string; type?: string }> }, searchLower))
				.filter((category): category is { kind: string; contents?: Array<{ kind: string; type?: string }> } => category !== null)

			return {
				...toolboxConfig,
				contents: filteredCategories
			}
		}

		return toolboxConfig
	}
}
