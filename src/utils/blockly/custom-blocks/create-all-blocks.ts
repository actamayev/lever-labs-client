"use client"

import { pipBlocks } from "./pip-blocks"
import { logicBlocks } from "./logic-blocks"
import { motorsBlocks } from "./motors-blocks"
import { sensorsBlocks } from "./sensor-blocks"
import { variableBlocks } from "./variable-blocks"  // Import variable blocks

export default function createAllBlocks (): CustomBlocks {
	const customBlocks: CustomBlocks = {
		kinds: {
			...motorsBlocks,
			...sensorsBlocks,
			...pipBlocks,
			...logicBlocks,
			...variableBlocks  // Add variable blocks
		}
	}

	return customBlocks
}
