import * as Blockly from "blockly"
import { javascriptGenerator, Order } from "blockly/javascript"
import { BLOCK_TYPES, IMUSensorType, IRSensorType, SENSOR_TYPES, ToFSensorType } from "./block-types"

// eslint-disable-next-line max-lines-per-function
export const createBlocks = (): CustomBlocks => {
	const customBlocks: CustomBlocks = {
		kinds: {
			[BLOCK_TYPES.ESP32_LED_CONTROL]: {
				definition: {
					type: BLOCK_TYPES.ESP32_LED_CONTROL,
					message0: "Turn LED %1",
					args0: [
						{
							type: "field_dropdown",
							name: "STATE",
							options: Object.entries(SENSOR_TYPES.LED).map(([key, value]) =>
								[key.toLowerCase(), value] as [string, string]
							)
						},
					],
					previousStatement: null,
					nextStatement: null,
					colour: 230,
					tooltip: "Change LED Status"
				},
				generator: (block: Blockly.Block): string => {
					const state = block.getFieldValue("STATE")
					// eslint-disable-next-line @typescript-eslint/naming-convention
					const LED_PIN = 2
					return `Digital.write(${LED_PIN}, ${state});\n`  // Return string directly for statement blocks
				},
			},
			[BLOCK_TYPES.ESP32_DELAY]: {
				definition: {
					type: BLOCK_TYPES.ESP32_DELAY,
					message0: "Delay %1 milliseconds",
					args0: [
						{
							type: "field_number",
							name: "DELAY",
							value: 1000,
							min: 0,
						},
					],
					previousStatement: null,
					nextStatement: null,
					colour: 230,
					tooltip: "Delay for a certain number of milliseconds"
				},
				generator: (block: Blockly.Block): string => {
					const delay = block.getFieldValue("DELAY")
					return `Timer.delay(${delay});\n`  // Return string directly for statement blocks
				},
			},
			[BLOCK_TYPES.ESP32_MOTOR_CONTROL]: {
				definition: {
					type: BLOCK_TYPES.ESP32_MOTOR_CONTROL,
					message0: "Set motor pin %1 to speed %2",
					args0: [
						{
							type: "field_number",
							name: "PIN",
							value: 0,
							min: 0,
							max: 39,
						},
						{
							type: "field_number",
							name: "SPEED",
							value: 0,
							min: -255,
							max: 255,
						},
					],
					previousStatement: null,
					nextStatement: null,
					colour: 230,
					tooltip: "Set motor to a specific speed"
				},
				generator: (block: Blockly.Block): string => {
					const pin = block.getFieldValue("PIN")
					const speed = block.getFieldValue("SPEED")
					return `PWM.write(${pin}, ${speed});\n`
				},
			},
			[BLOCK_TYPES.ESP32_LOOP]: {
				definition: {
					type: BLOCK_TYPES.ESP32_LOOP,
					message0: "Repeat forever %1 %2",
					args0: [
						{
							type: "input_dummy",
							name: "DUMMY",
						},
						{
							type: "input_statement",
							name: "LOOP_BODY",
						},
					],
					previousStatement: null,
					nextStatement: null,
					colour: 230,
					tooltip: "This is a forever loop"
				},
				generator: (block: Blockly.Block): [string, number] => {
					const loopBody = javascriptGenerator.statementToCode(block, "LOOP_BODY")
					return [`Timer.repeat(() => {\n${loopBody}}, 1);\n`, Order.NONE]
				},
			},
			// IMU Sensor Blocks
			[BLOCK_TYPES.IMU_READ]: {
				definition: {
					type: BLOCK_TYPES.IMU_READ,
					message0: "Read IMU %1",
					args0: [
						{
							type: "field_dropdown",
							name: "IMU_VALUE",
							options: Object.entries(SENSOR_TYPES.IMU).map(([key, value]) =>
								[key.toLowerCase(), value] as [string, string]
							)
						}
					],
					output: "Number",
					colour: 180,
					tooltip: "Read value from 9-axis IMU sensor"
				},
				generator: (block: Blockly.Block): [string, number] => {
					const value = block.getFieldValue("IMU_VALUE") as IMUSensorType
					return [`IMU.read("${value}")`, Order.FUNCTION_CALL]
				}
			},

			// Time of Flight Sensor Blocks
			[BLOCK_TYPES.TOF_READ]: {
				definition: {
					type: BLOCK_TYPES.TOF_READ,
					message0: "Read distance from ToF sensor %1",
					args0: [
						{
							type: "field_dropdown",
							name: "SENSOR",
							options: Object.entries(SENSOR_TYPES.TOF).map(([key, value]) =>
								[key.toLowerCase(), value] as [string, string]
							)
						}
					],
					output: "Number",
					colour: 180,
					tooltip: "Read distance in mm from Time of Flight sensor"
				},
				generator: (block: Blockly.Block): [string, number] => {
					const sensor = block.getFieldValue("SENSOR") as ToFSensorType
					return [`ToF.read("${sensor}")`, Order.FUNCTION_CALL]
				}
			},

			// Infrared Sensor Blocks
			[BLOCK_TYPES.IR_READ]: {
				definition: {
					type: BLOCK_TYPES.IR_READ,
					message0: "Read IR sensor %1",
					args0: [
						{
							type: "field_dropdown",
							name: "SENSOR",
							options: Object.entries(SENSOR_TYPES.IR).map(([key, value]) =>
								[key.toLowerCase(), value] as [string, string]
							)
						}
					],
					output: "Number",
					colour: 180,
					tooltip: "Read value from infrared sensor"
				},
				generator: (block: Blockly.Block): [string, number] => {
					const sensor = block.getFieldValue("SENSOR") as IRSensorType
					return [`IR.read("${sensor}")`, Order.FUNCTION_CALL]
				}
			},

			// Motor Control Blocks
			[BLOCK_TYPES.MOTOR_SET_SPEED]: {
				definition: {
					type: BLOCK_TYPES.MOTOR_SET_SPEED,
					message0: "Set %1 motor to speed %2",
					args0: [
						{
							type: "field_dropdown",
							name: "MOTOR",
							options: [
								["left", "LEFT"],
								["right", "RIGHT"]
							]
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
					const motor = block.getFieldValue("MOTOR")
					const speed = javascriptGenerator.valueToCode(block, "SPEED", Order.ATOMIC) || "0"
					return `Motors.setSpeed("${motor}", ${speed});\n`
				}
			},

			// Convenience Motor Blocks
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
	}

	return customBlocks
}
