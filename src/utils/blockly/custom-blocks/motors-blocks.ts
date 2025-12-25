"use client"

import * as Blockly from "blockly"
import { upperFirst, toUpper } from "lodash-es"
import { MOTOR_BLOCK_TYPES, MOTOR_FIELD_VALUES, TURN_DIRECTIONS, MOTOR_DIRECTIONS } from "@actamayev/lever-labs-common-ts/types/blockly/motor"
import { motorsCategoryColour } from "../../constants/constants"

export const motorsBlocks: Record<MOTOR_BLOCK_TYPES, CustomBlock> = {
	[MOTOR_BLOCK_TYPES.DRIVE]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Drive")
					.appendField(
						new Blockly.FieldDropdown([
							[upperFirst(MOTOR_DIRECTIONS.FORWARD.toLowerCase()), MOTOR_DIRECTIONS.FORWARD],
							[upperFirst(MOTOR_DIRECTIONS.BACKWARD.toLowerCase()), MOTOR_DIRECTIONS.BACKWARD]
						].map(([key, value]): [string, string] =>
							[upperFirst(key.toLowerCase()), value]
						)),
						MOTOR_FIELD_VALUES.DIRECTION
					)
					.appendField("at")

				// Use a number field with min and max constraints
				const percentField = new Blockly.FieldNumber(20, 0, 100, 1)
				this.appendDummyInput()
					.appendField(percentField, MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE)
					.appendField("% speed")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategoryColour)
				this.setTooltip("Move Pip forward at a specified speed (0-100%)")
				this.setInputsInline(true)
			},
			keywords: ["motor", "move", "advance", "drive", "straight", "ahead",
				"fast", "slow", "speed", "velocity", "forward", "backward", "reverse", "return", "undo", "rewind"]
		},
		generator: (block: Blockly.Block): string => {
			const direction = block.getFieldValue(MOTOR_FIELD_VALUES.DIRECTION) || MOTOR_DIRECTIONS.FORWARD
			const percentage = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE) || "0"
			return `motors.drive(${toUpper(direction)}, ${percentage});\n`
		}
	},
	[MOTOR_BLOCK_TYPES.DRIVE_TIME]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Drive")
					.appendField(
						new Blockly.FieldDropdown([
							[upperFirst(MOTOR_DIRECTIONS.FORWARD.toLowerCase()), MOTOR_DIRECTIONS.FORWARD],
							[upperFirst(MOTOR_DIRECTIONS.BACKWARD.toLowerCase()), MOTOR_DIRECTIONS.BACKWARD]
						].map(([key, value]): [string, string] =>
							[upperFirst(key.toLowerCase()), value]
						)),
						MOTOR_FIELD_VALUES.DIRECTION
					)
					.appendField("for")

				// Create the seconds label field first so we can reference it
				const secondsLabelField = new Blockly.FieldLabelSerializable("seconds")

				// Add time input
				const secondsField = new Blockly.FieldNumber(2, 0.1, 10, 0.1)
				this.appendDummyInput()
					.appendField(secondsField, MOTOR_FIELD_VALUES.DRIVING_SECONDS)
					.appendField(secondsLabelField, "SECONDS_LABEL")
					.appendField("at")

				// Add speed input
				const percentField = new Blockly.FieldNumber(20, 0, 100, 1)
				this.appendDummyInput()
					.appendField(percentField, MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE)
					.appendField("% speed")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategoryColour)
				this.setTooltip("Move Pip forward for a specified duration at a given speed")
				this.setInputsInline(true)

				// Function to update the seconds label
				const updateSecondsLabel = (newValue: number | string): number | string => {
					const label = newValue === 1 ? "second" : "seconds"
					secondsLabelField.setValue(label)
					return newValue // Return the value unchanged
				}

				// Set validator on the number field
				secondsField.setValidator(updateSecondsLabel)

				// Set initial label
				updateSecondsLabel(2)
			},
			keywords: ["motor", "move", "advance", "drive", "duration", "timer", "temporary",
				"timed", "seconds", "time", "forward", "backward", "reverse", "return", "undo", "rewind"]
		},
		generator: (block: Blockly.Block): string => {
			const direction = block.getFieldValue(MOTOR_FIELD_VALUES.DIRECTION) || MOTOR_DIRECTIONS.FORWARD
			const seconds = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_SECONDS) || "0"
			const percentage = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE) || "0"
			return `motors.drive_time(${toUpper(direction)}, ${seconds}, ${percentage});\n`
		}
	},
	[MOTOR_BLOCK_TYPES.DRIVE_DISTANCE]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Drive")
					.appendField(
						new Blockly.FieldDropdown([
							[upperFirst(MOTOR_DIRECTIONS.FORWARD.toLowerCase()), MOTOR_DIRECTIONS.FORWARD],
							[upperFirst(MOTOR_DIRECTIONS.BACKWARD.toLowerCase()), MOTOR_DIRECTIONS.BACKWARD]
						].map(([key, value]): [string, string] =>
							[upperFirst(key.toLowerCase()), value]
						)),
						MOTOR_FIELD_VALUES.DIRECTION
					)

				// Create the inches label field first so we can reference it
				const inchesLabelField = new Blockly.FieldLabelSerializable("inches")

				// Add distance input
				const distanceField = new Blockly.FieldNumber(10, 1, 240, 0.05)
				this.appendDummyInput()
					.appendField(distanceField, MOTOR_FIELD_VALUES.DRIVING_DISTANCE)
					.appendField(inchesLabelField, "INCHES_LABEL")
					.appendField("at")

				// Add speed input
				const percentField = new Blockly.FieldNumber(20, 0, 100, 1)
				this.appendDummyInput()
					.appendField(percentField, MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE)
					.appendField("% speed")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategoryColour)
				this.setTooltip("Move Pip forward for a specified distance at a given speed")
				this.setInputsInline(true)

				// Function to update the inches label
				const updateInchesLabel = (newValue: number | string): number | string => {
					const label = newValue === 1 ? "inch" : "inches"
					inchesLabelField.setValue(label)
					return newValue // Return the value unchanged
				}

				// Set validator on the number field
				distanceField.setValidator(updateInchesLabel)

				// Set initial label
				updateInchesLabel(10)
			},
			keywords: ["motor", "move", "advance", "drive", "distance", "in", "inches",
				"length", "travel", "forward", "backward", "reverse", "return", "undo", "rewind"]
		},
		generator: (block: Blockly.Block): string => {
			const direction = block.getFieldValue(MOTOR_FIELD_VALUES.DIRECTION) || MOTOR_DIRECTIONS.FORWARD
			const distance = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_DISTANCE) || "0"
			const percentage = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE) || "0"
			return `motors.drive_distance(${toUpper(direction)}, ${distance}, ${percentage});\n`
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

				// Create the degrees label field first so we can reference it
				const degreesLabelField = new Blockly.FieldLabelSerializable("degrees")

				// Use a number field for angle with min and max constraints
				const angleField = new Blockly.FieldNumber(90, 1, 1080, 1)
				this.appendDummyInput()
					.appendField(angleField, MOTOR_FIELD_VALUES.TURN_DEGREES)
					.appendField(degreesLabelField, "DEGREES_LABEL")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategoryColour)
				this.setTooltip("Turn Pip by specified angle")
				this.setInputsInline(true)

				// Function to update the degrees label
				const updateDegreesLabel = (newValue: number | string): number | string => {
					const label = newValue === 1 ? "degree" : "degrees"
					degreesLabelField.setValue(label)
					return newValue // Return the value unchanged
				}

				// Set validator on the number field
				angleField.setValidator(updateDegreesLabel)

				// Set initial label
				updateDegreesLabel(90)
			},
			keywords: ["motor", "turn", "rotate", "spin", "angle", "degrees", "direction", "clockwise", "counterclockwise"]
		},
		generator: (block: Blockly.Block): string => {
			const direction = block.getFieldValue(MOTOR_FIELD_VALUES.TURN_DIRECTION)
			const angle = block.getFieldValue(MOTOR_FIELD_VALUES.TURN_DEGREES) || "0"

			return `motors.turn(${direction}, ${angle});\n`
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
				this.setInputsInline(true)
			},
			keywords: ["motor", "halt", "brake", "pause", "cease", "end", "quit", "freeze", "standstill"]
		},
		generator: (_block: Blockly.Block): string => {
			return "motors.stop();\n"
		}
	},
	[MOTOR_BLOCK_TYPES.SPIN]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Spin")
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
					.appendField("at")

				// Use a number field for speed with min and max constraints
				const speedField = new Blockly.FieldNumber(20, 0, 100, 1)
				this.appendDummyInput()
					.appendField(speedField, MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE)
					.appendField("% speed")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategoryColour)
				this.setTooltip("Spin Pip at a specified speed")
				this.setInputsInline(true)
			},
			keywords: ["motor", "turn", "rotate", "spin", "angle", "degrees", "direction", "clockwise", "counterclockwise"]
		},
		generator: (block: Blockly.Block): string => {
			const direction = block.getFieldValue(MOTOR_FIELD_VALUES.TURN_DIRECTION)
			const speed = block.getFieldValue(MOTOR_FIELD_VALUES.DRIVING_PERCENTAGE) || "0"

			return `motors.spin(${direction}, ${speed});\n`
		}
	}
}
