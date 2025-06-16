"use client"

import * as Blockly from "blockly"
import { cppGenerator } from "../cpp/cpp-generator"
import createAllBlocks from "./custom-blocks/create-all-blocks"

export default function initializeBlocks(): void {
	const blocks = createAllBlocks().kinds

	Object.entries(blocks).forEach(([blockName, blockData]) => {
		Blockly.Blocks[blockName] = {
			init: function(): void {
				if (typeof blockData.definition.init === "function") {
					blockData.definition.init.call(this)
				} else {
					this.jsonInit(blockData.definition)
				}
			}
		}

		// Set the generator function
		cppGenerator.forBlock[blockName] = blockData.generator.bind(cppGenerator)
	})
}
