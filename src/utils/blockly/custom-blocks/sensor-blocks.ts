import * as Blockly from "blockly"
import { Order } from "blockly/javascript"
import { BLOCK_TYPES, IMUSensorType, LeftRightSensorType, IRSensorType, SENSOR_TYPES } from "../block-types"

export const sensorsBlocks: Record<string, CustomBlock> = {
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
	[BLOCK_TYPES.TOF_READ]: {
		definition: {
			type: BLOCK_TYPES.TOF_READ,
			message0: "Read distance from ToF sensor %1",
			args0: [
				{
					type: "field_dropdown",
					name: "SENSOR",
					options: Object.entries(SENSOR_TYPES.LEFTRIGHT).map(([key, value]) =>
                        [key.toLowerCase(), value] as [string, string]
					)
				}
			],
			output: "Number",
			colour: 180,
			tooltip: "Read distance in mm from Time of Flight sensor"
		},
		generator: (block: Blockly.Block): [string, number] => {
			const sensor = block.getFieldValue("SENSOR") as LeftRightSensorType
			return [`ToF.read("${sensor}")`, Order.FUNCTION_CALL]
		}
	},
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
	}
}
