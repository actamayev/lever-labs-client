"use client"

import * as Blockly from "blockly"
import { ledCategoryColour } from "../../constants/constants"
import { LEDSensorType, SENSOR_TYPES } from "../block-types/sensor-block-types"
import { LED_BLOCK_TYPES } from "../block-types/led-block-types"

export const ledBlocks: Record<LED_BLOCK_TYPES, CustomBlock> = {
	[LED_BLOCK_TYPES.ESP32_LED_CONTROL]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Turn LED")
					.appendField(
						new Blockly.FieldDropdown(
							Object.entries(SENSOR_TYPES.LED_COLORS).map(([key, value]) =>
								[key.toLowerCase(), value]
							)
						),
						LED_BLOCK_TYPES.ESP32_LED_CONTROL
					)
				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(ledCategoryColour)
				this.setTooltip("Change LED Status")
			}
		},
		generator: (block: Blockly.Block): string => {
			const state = block.getFieldValue(LED_BLOCK_TYPES.ESP32_LED_CONTROL) as LEDSensorType
			if (state === "OFF") return "rgbLed.turn_led_off();\n"
			else return `rgbLed.set_led_${state.toLowerCase()}();\n`
		}
	}
}
