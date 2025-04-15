"use client"

import { LogicBlockNames } from "../../block-types/logic-block-types"
import { conditionalBlocks } from "./conditional-blocks"
import { variableBlocks } from "./variable-blocks"
import { mathBlocks } from "./math-blocks"
import { loopBlocks } from "./loop-blocks"

export const logicBlocks: Record<LogicBlockNames, CustomBlock> = {
	...variableBlocks,
	...conditionalBlocks,
	...mathBlocks,
	...loopBlocks
}
