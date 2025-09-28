"use client"

import * as Blockly from "blockly"
import { ledCategoryColour } from "../../constants/constants"
import { LED_BLOCK_TYPES, LED_FIELD_VALUES } from "@lever-labs/common-ts/types/blockly/led"
import { LEDSensorType, SENSOR_TYPES } from "@lever-labs/common-ts/types/blockly/sensor"
import { upperFirst } from "lodash-es"

export const ledBlocks: Record<LED_BLOCK_TYPES, CustomBlock> = {
	[LED_BLOCK_TYPES.CONTROL_ALL_LEDS]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Turn all LEDs")
					.appendField(
						new Blockly.FieldDropdown(
							Object.entries(SENSOR_TYPES.LED_COLORS).map(([key, value]): [string, string] =>
								[upperFirst(key.toLowerCase()), value]
							)
						),
						LED_FIELD_VALUES.LED_COLOR
					)
				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(ledCategoryColour)
				this.setTooltip("Change LED Status")
			},
			keywords: ["light", "color", "bright", "dim", "illuminate", "glow", "flash", "blink", "RGB", "bulb"]
		},
		generator: (block: Blockly.Block): string => {
			const state = block.getFieldValue(LED_FIELD_VALUES.LED_COLOR) as LEDSensorType
			if (state === "OFF") return "rgbLed.turn_led_off();\n"
			else return `rgbLed.set_led_${state.toLowerCase()}();\n`
		}
	}
}
