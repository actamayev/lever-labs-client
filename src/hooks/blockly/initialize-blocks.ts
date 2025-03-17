"use client"

import * as Blockly from "blockly"
import { useCallback } from "react"
import { cppGenerator } from "../../utils/cpp/cpp-generator"
import createAllBlocks from "../../utils/blockly/custom-blocks/create-all-blocks"

export default function useInitializeBlocks(): () => void {
	return useCallback(() => {
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
	}, [])
}
