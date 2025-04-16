"use client"

import { conditionalBlocks } from "./conditional-blocks"
import { variableBlocks } from "./variable-blocks"
import { mathBlocks } from "./math-blocks"
import { loopBlocks } from "./loop-blocks"
import { LOGIC_BLOCK_TYPES } from "../../block-types/logic-block-types"

export const logicBlocks: Record<LOGIC_BLOCK_TYPES, CustomBlock> = {
	...variableBlocks,
	...conditionalBlocks,
	...mathBlocks,
	...loopBlocks
}
