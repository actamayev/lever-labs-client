import * as Blockly from "blockly"
import { pipCategory } from "../toolbox-config"
import { cppGenerator } from "../../cpp/cpp-generator"
import { PIP_BLOCK_TYPES, LEDSensorType, SENSOR_TYPES, PipBlockNames, PIP_FIELD_VALUES } from "../block-types"

export const pipBlocks: Record<PipBlockNames, CustomBlock> = {
	[PIP_BLOCK_TYPES.ESP32_LED_CONTROL]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Turn LED")
					.appendField(
						new Blockly.FieldDropdown(
							Object.entries(SENSOR_TYPES.LED).map(([key, value]) =>
								[key.toLowerCase(), value]
							)
						),
						PIP_FIELD_VALUES.ESP32_LED_CONTROL
					)
				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(pipCategory.colour)
				this.setTooltip("Change LED Status")
			}
		},
		generator: (block: Blockly.Block): string => {
			const state = block.getFieldValue(PIP_FIELD_VALUES.ESP32_LED_CONTROL) as LEDSensorType
			return `digitalWrite(LED_PIN, ${state});\n`
		}
	},
	[PIP_BLOCK_TYPES.ESP32_DELAY]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Delay")
					.appendField(
						new Blockly.FieldNumber(1000, 0), // value: 1000, min: 0
						PIP_FIELD_VALUES.ESP32_DELAY
					)
					.appendField("milliseconds")
				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(pipCategory.colour)
				this.setTooltip("Delay for a certain number of milliseconds")
			}
		},
		generator: (block: Blockly.Block): string => {
			const delay = block.getFieldValue(PIP_FIELD_VALUES.ESP32_DELAY)
			return `delay(${delay});\n`  // Changed to standard Arduino delay
		}
	},
	[PIP_BLOCK_TYPES.ESP32_LOOP]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Repeat forever")
				this.appendStatementInput("LOOP_BODY")
					.setCheck(null)
				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(pipCategory.colour)
				this.setTooltip("This is a forever loop")
			}
		},
		generator: (block: Blockly.Block): string => {
			// Get the code inside the loop
			const loopBody = (cppGenerator).statementToCode(block, "LOOP_BODY") || ""

			// Create a proper while(true) loop in C++
			return `while(true) {\n${loopBody}}\n`
		}
	}
}
