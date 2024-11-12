import * as Blockly from "blockly"
import { sensorsCategory } from "../toolbox-config"
import {
	SENSORS_BLOCK_TYPES,
	IMUSensorType,
	LeftRightSensorType,
	IRSensorType,
	SENSOR_TYPES,
	SensorsBlockNames
} from "../block-types"
import { Order } from "../order"

export const sensorsBlocks: Record<SensorsBlockNames, CustomBlock> = {
	[SENSORS_BLOCK_TYPES.IMU_READ]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Read IMU")
					.appendField(
						new Blockly.FieldDropdown(
							Object.entries(SENSOR_TYPES.IMU).map(([key, value]) =>
                                [key.toLowerCase(), value] as [string, string]
							)
						),
						"IMU_VALUE"
					)
				this.setOutput(true, "Number")
				this.setColour(sensorsCategory.colour)
				this.setTooltip("Read value from 9-axis IMU sensor")
			}
		},
		generator: (block: Blockly.Block): [string, number] => {
			const value = block.getFieldValue("IMU_VALUE") as IMUSensorType
			return [`readIMU(IMU_${value})`, Order.FUNCTION_CALL]
		}
	},

	[SENSORS_BLOCK_TYPES.TOF_READ]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Read distance from")
					.appendField(
						new Blockly.FieldDropdown(
							Object.entries(SENSOR_TYPES.LEFTRIGHT).map(([key, value]) =>
                                [key.toLowerCase(), value] as [string, string]
							)
						),
						"SENSOR"
					)
					.appendField("ToF sensor")
				this.setOutput(true, "Number")
				this.setColour(sensorsCategory.colour)
				this.setTooltip("Read distance in mm from Time of Flight sensor")
			}
		},
		generator: (block: Blockly.Block): [string, number] => {
			const sensor = block.getFieldValue("SENSOR") as LeftRightSensorType
			return [`readToF(TOF_${sensor})`, Order.FUNCTION_CALL]
		}
	},

	[SENSORS_BLOCK_TYPES.IR_READ]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Read IR sensor")
					.appendField(
						new Blockly.FieldDropdown(
							Object.entries(SENSOR_TYPES.IR).map(([key, value]) =>
                                [key.toLowerCase(), value] as [string, string]
							)
						),
						"SENSOR"
					)
				this.setOutput(true, "Number")
				this.setColour(sensorsCategory.colour)
				this.setTooltip("Read value from infrared sensor")
			}
		},
		generator: (block: Blockly.Block): [string, number] => {
			const sensor = block.getFieldValue("SENSOR") as IRSensorType
			return [`readIR(IR_${sensor})`, Order.FUNCTION_CALL]
		}
	}
}
