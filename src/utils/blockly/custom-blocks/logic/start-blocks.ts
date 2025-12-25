"use client"

import type * as Blockly from "blockly/core"
import { logicCategoryColour } from "../../../constants/constants"
import { START_BLOCK_TYPES } from "@actamayev/lever-labs-common-ts/types/blockly/logic"

export const startBlocks: Record<START_BLOCK_TYPES, CustomBlock> = {
	[START_BLOCK_TYPES.BUTTON_PRESS_START]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Start program when button is pressed")
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("Program will wait until the button is pressed before starting")
			},
			keywords: ["begin", "initialize", "trigger", "launch", "wait", "user", "input", "press", "click", "button", "left"]
		},
		generator: (_block: Blockly.Block): string => {
			return "left_button.wait_for_press();\n"
		}
	}
}
