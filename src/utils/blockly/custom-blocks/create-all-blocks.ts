"use client"

import { ledBlocks } from "./led-blocks"
import { logicBlocks } from "./logic/logic-blocks"
import { motorsBlocks } from "./motors-blocks"
import { sensorsBlocks } from "./sensor-blocks"

export default function createAllBlocks (): CustomBlocks {
	return {
		kinds: {
			...logicBlocks,
			...sensorsBlocks,
			...motorsBlocks,
			...motorsBlocks,
			...ledBlocks,
		}
	}
}
