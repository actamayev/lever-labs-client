"use client"

import * as Blockly from "blockly"
import { logicCategoryColour } from "../../../constants/constants"
import { START_BLOCK_TYPES } from "@bluedotrobots/common-ts/types/blockly/logic"

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
			keywords: ["begin", "initialize", "trigger", "launch", "wait", "user", "input", "press", "click"]
		},
		generator: (_block: Blockly.Block): string => {
			return "wait_for_button_press();\n"
		}
	}
}
