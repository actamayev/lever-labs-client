"use client"

import * as Blockly from "blockly"
import { motorsCategoryColour } from "../../constants/constants"
import { MOTOR_BLOCK_TYPES, MOTOR_FIELD_VALUES, TURN_DIRECTIONS } from "@bluedotrobots/common-ts/types/blockly/motor"
import { upperFirst } from "lodash-es"

export const motorsBlocks: Record<MOTOR_BLOCK_TYPES, CustomBlock> = {
	[MOTOR_BLOCK_TYPES.GO_FORWARD]: {
		definition: {
			init: function(this: Blockly.Block): void {
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
				this.setTooltip("Move Pip  forward at specified percentage (0-100%)")
			},
			keywords: ["motor", "move", "advance", "drive", "straight", "ahead", "fast", "slow", "speed", "velocity"]
		},
		generator: (block: Blockly.Block): string => {
			const percentage = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE) || "0"
			return `goForward(${percentage});\n`
		}
	},
	[MOTOR_BLOCK_TYPES.GO_BACKWARD]: {
		definition: {
			init: function(this: Blockly.Block): void {
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
				this.setTooltip("Move Pip  backward at specified percentage (0-100%)")
			},
			keywords: ["motor", "reverse", "back", "retreat", "return", "undo", "rewind", "speed", "velocity"]
		},
		generator: (block: Blockly.Block): string => {
			const percentage = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE) || "0"
			return `goBackward(${percentage});\n`
		}
	},
	[MOTOR_BLOCK_TYPES.GO_FORWARD_TIME]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Go forward for")

				// Add time input
				const secondsField = new Blockly.FieldNumber(2, 0.1, 60, 0.1)
				this.appendDummyInput()
					.appendField(secondsField, MOTOR_FIELD_VALUES.DRIVING_SECONDS)
					.appendField("seconds at")

				// Add speed input
				const percentField = new Blockly.FieldNumber(50, 0, 100, 1)
				this.appendDummyInput()
					.appendField(percentField, MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE)
					.appendField("% speed")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategoryColour)
				this.setTooltip("Move Pip  forward for specified time and speed")
			},
			keywords: ["motor", "move", "advance", "drive", "duration", "timer", "temporary", "timed", "seconds", "time"]
		},
		generator: (block: Blockly.Block): string => {
			const seconds = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_SECONDS) || "0"
			const percentage = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE) || "0"
			return `goForwardTime(${seconds}, ${percentage});\n`
		}
	},
	[MOTOR_BLOCK_TYPES.GO_BACKWARD_TIME]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Go backward for")

				// Add time input
				const secondsField = new Blockly.FieldNumber(2, 0.1, 60, 0.1)
				this.appendDummyInput()
					.appendField(secondsField, MOTOR_FIELD_VALUES.DRIVING_SECONDS)
					.appendField("seconds at")

				// Add speed input
				const percentField = new Blockly.FieldNumber(50, 0, 100, 1)
				this.appendDummyInput()
					.appendField(percentField, MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE)
					.appendField("% speed")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategoryColour)
				this.setTooltip("Move Pip  backward for specified time and speed")
			},
			keywords: ["motor", "reverse", "back", "retreat", "duration", "timer", "temporary", "timed", "seconds", "time"]
		},
		generator: (block: Blockly.Block): string => {
			const seconds = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_SECONDS) || "0"
			const percentage = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE) || "0"
			return `goBackwardTime(${seconds}, ${percentage});\n`
		}
	},
	[MOTOR_BLOCK_TYPES.GO_FORWARD_DISTANCE]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Go forward")

				// Add distance input
				const distanceField = new Blockly.FieldNumber(10, 1, 500, 1)
				this.appendDummyInput()
					.appendField(distanceField, MOTOR_FIELD_VALUES.DRIVING_DISTANCE)
					.appendField("inches at")

				// Add speed input
				const percentField = new Blockly.FieldNumber(50, 0, 100, 1)
				this.appendDummyInput()
					.appendField(percentField, MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE)
					.appendField("% speed")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategoryColour)
				this.setTooltip("Move Pip  forward for specified distance at given speed")
			},
			keywords: ["motor", "move", "advance", "drive", "distance", "in", "inches", "length", "travel"]
		},
		generator: (block: Blockly.Block): string => {
			const distance = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_DISTANCE) || "0"
			const percentage = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE) || "0"
			return `goForwardDistance(${distance}, ${percentage});\n`
		}
	},
	[MOTOR_BLOCK_TYPES.GO_BACKWARD_DISTANCE]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Go backward")

				// Add distance input
				const distanceField = new Blockly.FieldNumber(10, 1, 500, 1)
				this.appendDummyInput()
					.appendField(distanceField, MOTOR_FIELD_VALUES.DRIVING_DISTANCE)
					.appendField("inches at")

				// Add speed input
				const percentField = new Blockly.FieldNumber(50, 0, 100, 1)
				this.appendDummyInput()
					.appendField(percentField, MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE)
					.appendField("% speed")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategoryColour)
				this.setTooltip("Move Pip  backward for specified distance at given speed")
			},
			keywords: ["motor", "reverse", "back", "retreat", "distance", "in", "inches", "length", "travel"]
		},
		generator: (block: Blockly.Block): string => {
			const distance = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_DISTANCE) || "0"
			const percentage = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE) || "0"
			return `goBackwardDistance(${distance}, ${percentage});\n`
		}
	},
	[MOTOR_BLOCK_TYPES.TURN]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Turn")
					.appendField(
						new Blockly.FieldDropdown([
							[upperFirst(TURN_DIRECTIONS.CLOCKWISE.toLowerCase()), TURN_DIRECTIONS.CLOCKWISE],
							[upperFirst(TURN_DIRECTIONS.COUNTERCLOCKWISE.toLowerCase()), TURN_DIRECTIONS.COUNTERCLOCKWISE]
						].map(([key, value]): [string, string] =>
							[upperFirst(key.toLowerCase()), value]
						)),
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
				this.setTooltip("Turn Pip by specified angle")
			},
			keywords: ["motor", "turn", "rotate", "spin", "angle", "degrees", "direction", "clockwise", "counterclockwise"]
		},
		generator: (block: Blockly.Block): string => {
			const direction = block.getFieldValue(MOTOR_FIELD_VALUES.TURN_DIRECTION)
			const angle = block.getFieldValue(MOTOR_FIELD_VALUES.TURN_DEGREES) || "0"

			return `turn(${direction}, ${angle});\n`
		}
	},
	[MOTOR_BLOCK_TYPES.STOP]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Stop")
				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategoryColour)
				this.setTooltip("Stop all motors")
			},
			keywords: ["motor", "halt", "brake", "pause", "cease", "end", "quit", "freeze", "standstill"]
		},
		generator: (_block: Blockly.Block): string => {
			return "stopMotors();\n"
		}
	}
}
