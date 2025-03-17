"use client"

import * as Blockly from "blockly"
import { Order } from "../order"
import { motorsCategory } from "../toolbox-config"
import { cppGenerator } from "../../cpp/cpp-generator"
import { SENSOR_TYPES, LeftRightSensorType } from "../block-types/sensor-block-types"
import { MotorBlockNames, MOTOR_BLOCK_TYPES, MOTOR_FIELD_VALUES } from "../block-types/motor-block-types"

export const motorsBlocks: Record<MotorBlockNames, CustomBlock> = {
	[MOTOR_BLOCK_TYPES.MOTOR_SET_SPEED]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Set")
					.appendField(
						new Blockly.FieldDropdown(
							Object.entries(SENSOR_TYPES.LEFTRIGHT).map(([key, value]) =>
                                [key.toLowerCase(), value] as [string, string]
							)
						),
						MOTOR_FIELD_VALUES.MOTOR_SET_SPEED
					)
					.appendField("motor to speed")

				this.appendValueInput("SPEED")
					.setCheck("Number")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategory.colour)
				this.setTooltip("Set motor speed (-255 to 255)")
			}
		},
		generator: (block: Blockly.Block): string => {
			const motor = block.getFieldValue(MOTOR_FIELD_VALUES.MOTOR_SET_SPEED) as LeftRightSensorType
			const speed = cppGenerator.valueToCode(block, "SPEED", Order.ATOMIC) || "0"
			return `setMotorSpeed(MOTOR_${motor}, ${speed});\n`
		}
	},
	[MOTOR_BLOCK_TYPES.MOTORS_STOP]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Stop both motors")
				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategory.colour)
				this.setTooltip("Stop both motors")
			}
		},
		generator: (_block: Blockly.Block): string => {
			return "stopMotors();\n"
		}
	},
	[MOTOR_BLOCK_TYPES.MOTORS_TANK_DRIVE]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Drive left motor")

				this.appendValueInput(MOTOR_FIELD_VALUES.MOTORS_LEFT_TANK_DRIVE)
					.setCheck("Number")

				this.appendDummyInput()
					.appendField("and right motor")

				this.appendValueInput(MOTOR_FIELD_VALUES.MOTORS_RIGHT_TANK_DRIVE)
					.setCheck("Number")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(motorsCategory.colour)
				this.setTooltip("Set motor speeds independently")
			}
		},
		generator: (block: Blockly.Block): string => {
			const leftSpeed = cppGenerator.valueToCode(block, MOTOR_FIELD_VALUES.MOTORS_LEFT_TANK_DRIVE, Order.ATOMIC) || "0"
			const rightSpeed = cppGenerator.valueToCode(block, MOTOR_FIELD_VALUES.MOTORS_RIGHT_TANK_DRIVE, Order.ATOMIC) || "0"
			return `tankDrive(${leftSpeed}, ${rightSpeed});\n`
		}
	}
}
