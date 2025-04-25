"use client"

import * as Blockly from "blockly"
import { motorsCategoryColour } from "../../constants"
import { MOTOR_BLOCK_TYPES, MOTOR_FIELD_VALUES, TURN_DIRECTIONS } from "../block-types/motor-block-types"

export const motorsBlocks: Record<MOTOR_BLOCK_TYPES, CustomBlock> = {
	[MOTOR_BLOCK_TYPES.GO_FORWARD]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Go forward at")

				// Use a number field with min and max constraints
				const percentField = new Blockly.FieldNumber(50, 0, 100, 1)
				this.appendDummyInput()
					.appendField(percentField, MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE)
					.appendField("% speed")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategoryColour)
				this.setTooltip("Move Pip forward at specified percentage (0-100%)")
			}
		},
		generator: (block: Blockly.Block): string => {
			const percentage = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE) || "0"
			// Convert percentage (0-100) to motor speed (-255 to 255)
			// We're using only positive values since we're going forward
			return `goForward(${percentage});\n`
		}
	},
	[MOTOR_BLOCK_TYPES.GO_BACKWARD]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Go backward at")

				// Use a number field with min and max constraints
				const percentField = new Blockly.FieldNumber(50, 0, 100, 1)
				this.appendDummyInput()
					.appendField(percentField, MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE)
					.appendField("% speed")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategoryColour)
				this.setTooltip("Move Pip backward at specified percentage (0-100%)")
			}
		},
		generator: (block: Blockly.Block): string => {
			const percentage = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE) || "0"
			// Convert percentage (0-100) to motor speed (-255 to 255)
			// We're using only positive values since we're going backward
			return `goBackward(${percentage});\n`
		}
	},
	[MOTOR_BLOCK_TYPES.TURN]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Turn")
					.appendField(
						new Blockly.FieldDropdown([
							["clockwise", TURN_DIRECTIONS.CLOCKWISE],
							["counterclockwise", TURN_DIRECTIONS.COUNTERCLOCKWISE]
						]),
						MOTOR_FIELD_VALUES.TURN_DIRECTION
					)

				this.appendDummyInput()
					.appendField("by")

				// Use a number field for angle with min and max constraints
				const angleField = new Blockly.FieldNumber(90, 0, 360, 1)
				this.appendDummyInput()
					.appendField(angleField, MOTOR_FIELD_VALUES.TURN_DEGREES)
					.appendField("degrees")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategoryColour)
				this.setTooltip("Turn the robot by specified angle")
			}
		},
		generator: (block: Blockly.Block): string => {
			const direction = block.getFieldValue(MOTOR_FIELD_VALUES.TURN_DIRECTION)
			const angle = block.getFieldValue(MOTOR_FIELD_VALUES.TURN_DEGREES) || "0"

			return `turn(${direction}, ${angle});\n`
		}
	},
	[MOTOR_BLOCK_TYPES.STOP]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Stop")
				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategoryColour)
				this.setTooltip("Stop all motors")
			}
		},
		generator: (_block: Blockly.Block): string => {
			return "stopMotors();\n"
		}
	}
}
