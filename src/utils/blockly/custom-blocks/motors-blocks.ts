import * as Blockly from "blockly"
import { BLOCK_TYPES, LeftRightSensorType, SENSOR_TYPES } from "../block-types"
import { javascriptGenerator, Order } from "blockly/javascript"

//TODO: This shouldn't be a regular string
export const motorsBlocks: Record<string, CustomBlock> = {
	[BLOCK_TYPES.MOTOR_SET_SPEED]: {
		definition: {
			type: BLOCK_TYPES.MOTOR_SET_SPEED,
			message0: "Set %1 motor to speed %2",
			args0: [
				{
					type: "field_dropdown",
					name: "MOTOR",
					options: Object.entries(SENSOR_TYPES.LEFTRIGHT).map(([key, value]) =>
                        [key.toLowerCase(), value] as [string, string]
					)
				},
				{
					type: "input_value",
					name: "SPEED",
					check: "Number"
				}
			],
			previousStatement: null,
			nextStatement: null,
			colour: 230,
			tooltip: "Set motor speed (-255 to 255)"
		},
		generator: (block: Blockly.Block): string => {
			const motor = block.getFieldValue("MOTOR") as LeftRightSensorType
			const speed = javascriptGenerator.valueToCode(block, "SPEED", Order.ATOMIC) || "0"
			return `Motors.setSpeed("${motor}", ${speed});\n`
		}
	},
	[BLOCK_TYPES.MOTORS_STOP]: {
		definition: {
			type: BLOCK_TYPES.MOTORS_STOP,
			message0: "Stop both motors",
			previousStatement: null,
			nextStatement: null,
			colour: 230,
			tooltip: "Stop both motors"
		},
		generator: (_block: Blockly.Block): string => {
			return "Motors.stop();\n"
		}
	},
	[BLOCK_TYPES.MOTORS_TANK_DRIVE]: {
		definition: {
			type: BLOCK_TYPES.MOTORS_TANK_DRIVE,
			message0: "Drive left motor %1 and right motor %2",
			args0: [
				{
					type: "input_value",
					name: "LEFT_SPEED",
					check: "Number"
				},
				{
					type: "input_value",
					name: "RIGHT_SPEED",
					check: "Number"
				}
			],
			previousStatement: null,
			nextStatement: null,
			colour: 230,
			tooltip: "Set motor speeds independently"
		},
		generator: (block: Blockly.Block): string => {
			const leftSpeed = javascriptGenerator.valueToCode(block, "LEFT_SPEED", Order.ATOMIC) || "0"
			const rightSpeed = javascriptGenerator.valueToCode(block, "RIGHT_SPEED", Order.ATOMIC) || "0"
			return `Motors.tankDrive(${leftSpeed}, ${rightSpeed});\n`
		}
	}
}
