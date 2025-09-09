"use client"

import getCppGenerator from "../cpp/cpp-generator"
import createAllBlocks from "./custom-blocks/create-all-blocks"

export default async function initializeBlocks(): Promise<void> {
	if (getCppGenerator().areBlocksInitialized) return

	// Dynamically import Blockly and ensure generator is initialized
	const Blockly = await import("blockly")
	const generator = await getCppGenerator().ensureInitialized()

	const blocks = createAllBlocks().kinds

	Object.entries(blocks).forEach(([blockName, blockData]): void => {
		Blockly.Blocks[blockName] = {
			init: function(): void {
				if (typeof blockData.definition.init === "function") {
					blockData.definition.init.call(this)
				} else {
					this.jsonInit(blockData.definition)
				}
			},
			// Preserve keywords for search functionality
			keywords: blockData.definition.keywords
		}

		// Set the generator function on the actual Blockly generator
		generator.forBlock[blockName] = blockData.generator.bind(generator)
	})
	getCppGenerator().areBlocksInitialized = true
}
