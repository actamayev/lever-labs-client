import * as Blockly from "blockly"
// Helper function to extract searchable text from a block
function getBlockSearchableText(blockType: string): string {
	// Get the block definition to extract display text
	const blockDefinition = Blockly.Blocks[blockType]
	if (!blockDefinition) return blockType

	let searchText = blockType + " "

	try {
		// Create a headless workspace for text extraction
		const tempWorkspace = new Blockly.Workspace()
		const tempBlock = tempWorkspace.newBlock(blockType)

		// Extract text from all inputs and fields
		for (let i = 0; i < tempBlock.inputList.length; i++) {
			const input = tempBlock.inputList[i]
			for (let j = 0; j < input.fieldRow.length; j++) {
				const field = input.fieldRow[j]
				if (field instanceof Blockly.FieldLabel) {
					searchText += field.getText() + " "
				}
			}
		}

		// Add tooltip if available
		const tooltip = tempBlock.tooltip
		if (typeof tooltip === "string") {
			searchText += tooltip + " "
		}

		// Add keywords if defined
		const keywords = (tempBlock as unknown as { keywords?: string[] }).keywords
		if (Array.isArray(keywords)) {
			searchText += keywords.join(" ") + " "
		}

		tempBlock.dispose()
		tempWorkspace.dispose()

	} catch (error) {
		// Fallback: just use block type if we can't create the block
		console.warn(`Could not extract text from block ${blockType}:`, error)
	}

	return searchText.toLowerCase()
}

// Type definitions for better type safety
interface CategoryToolboxItem {
	kind: string
	type?: string
	contents?: CategoryToolboxItem[]
	name?: string
	colour?: string
	[key: string]: unknown
}

interface CategoryToolbox {
	kind: "categoryToolbox"
	contents: CategoryToolboxItem[]
	[key: string]: unknown
}

// Function to filter toolbox based on search term
export default function filterToolboxConfig(
	toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition,
	searchTerm: string
): Blockly.utils.toolbox.ToolboxDefinition {
	if (!searchTerm.trim()) {
		return toolboxConfig
	}

	// If toolboxConfig is a string, return as-is (can't filter)
	if (typeof toolboxConfig === "string") {
		return toolboxConfig
	}

	const searchLower = searchTerm.toLowerCase()

	// Type guard to check if it's a category toolbox
	const isCategoryToolbox = (config: unknown): config is CategoryToolbox => {
		return typeof config === "object" &&
			config !== null &&
			"kind" in config &&
			(config as CategoryToolbox).kind === "categoryToolbox" &&
			"contents" in config &&
			Array.isArray((config as CategoryToolbox).contents)
	}

	if (isCategoryToolbox(toolboxConfig)) {
		const filteredCategories = toolboxConfig.contents
			.map((category: CategoryToolboxItem) => {
				if (category.kind === "category" && Array.isArray(category.contents)) {
					const filteredBlocks = category.contents.filter((item: CategoryToolboxItem) => {
						if (item.kind === "block" && item.type) {
							const searchableText = getBlockSearchableText(item.type)
							return searchableText.includes(searchLower)
						}
						return false
					})

					// Only return category if it has matching blocks
					if (filteredBlocks.length > 0) {
						return {
							...category,
							contents: filteredBlocks
						} as CategoryToolboxItem
					}
				}
				return null
			})
			.filter((category): category is CategoryToolboxItem => category !== null)

		return {
			...toolboxConfig,
			contents: filteredCategories
		} as CategoryToolbox
	}

	return toolboxConfig
}
