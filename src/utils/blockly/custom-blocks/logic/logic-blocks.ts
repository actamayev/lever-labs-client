"use client"

import { mathBlocks } from "./math-blocks"
import { loopBlocks } from "./loop-blocks"
import { startBlocks } from "./start-blocks"
import { variableBlocks } from "./variable-blocks"
import { conditionalBlocks } from "./conditional-blocks"
import { LOGIC_BLOCK_TYPES } from "@bluedotrobots/common-ts/types/blockly/logic"

export const logicBlocks: Record<LOGIC_BLOCK_TYPES, CustomBlock> = {
	...startBlocks,
	...variableBlocks,
	...conditionalBlocks,
	...mathBlocks,
	...loopBlocks
}
