"use client"

import * as Blockly from "blockly"

interface ToolboxItem {
	kind: "block";
	type: BlockNames
}

/**
 * Creates a flyout toolbox with specific blocks (no categories)
 */
export function createFlyoutToolbox<T extends BlockNames = BlockNames>(
	blocks: T[],
): Blockly.utils.toolbox.ToolboxDefinition {
	const contents: ToolboxItem[] = []
	// Add blocks with optional separators
	blocks.forEach((blockType) => {
		contents.push({ kind: "block", type: blockType })
	})

	return {
		kind: "flyoutToolbox",
		contents
	}
}
