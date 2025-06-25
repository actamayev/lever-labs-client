"use client"

import * as Blockly from "blockly"

type ToolboxItem =
	| { kind: "block"; type: BlockNames }
	| { kind: "sep" }
	| { kind: "label"; text: string }

/**
 * Creates a flyout toolbox with specific blocks (no categories)
 */
export function createFlyoutToolbox<T extends BlockNames = BlockNames>(
	blocks: T[],
	options?: {
    addSeparators?: boolean
  }
): Blockly.utils.toolbox.ToolboxDefinition {
	const contents: ToolboxItem[] = []
	// Add blocks with optional separators
	blocks.forEach((blockType, index) => {
		if (index > 0 && options?.addSeparators) {
			contents.push({ kind: "sep" })
		}
		contents.push({ kind: "block", type: blockType })
	})

	return {
		kind: "flyoutToolbox",
		contents
	}
}
