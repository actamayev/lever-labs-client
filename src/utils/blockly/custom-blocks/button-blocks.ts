"use client"

import * as Blockly from "blockly"
import { buttonsCategoryColour } from "../../constants/constants"
import { BUTTON_BLOCK_TYPES } from "@lever-labs/common-ts/types/blockly/button-block-types"
import { Order } from "../order"

export const buttonBlocks: Record<BUTTON_BLOCK_TYPES, CustomBlock> = {
	[BUTTON_BLOCK_TYPES.RIGHT_BUTTON_PRESS]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Is right button pressed?")
				this.setOutput(true, "Boolean")
				this.setColour(buttonsCategoryColour)
				this.setTooltip("Returns true if the right button is pressed")
			},
			keywords: ["button", "press", "click", "touch", "tap", "right", "left", "up", "down"]
		},
		generator: (_block: Blockly.Block): [string, number] => {
			return ["right_button.is_pressed()", Order.FUNCTION_CALL]
		}
	},
}
