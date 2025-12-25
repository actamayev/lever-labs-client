"use client"

import * as Blockly from "blockly"
import { ledCategoryColour } from "../../constants/constants"
import { upperFirst } from "lodash-es"
import { LEDSensorType, SENSOR_TYPES } from "@actamayev/lever-labs-common-ts/types/blockly/sensor"
import { LED_BLOCK_TYPES, LED_FIELD_VALUES } from "@actamayev/lever-labs-common-ts/types/blockly/led"

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
			keywords: ["red", "green", "blue", "purple", "yellow", "white", "off",
				"light", "color", "bright", "dim", "illuminate", "glow", "flash", "blink", "RGB", "bulb"]
		},
		generator: (block: Blockly.Block): string => {
			const state = block.getFieldValue(LED_FIELD_VALUES.LED_COLOR) as LEDSensorType
			return `all_leds.set_color(${state});\n`
		}
	}
}
