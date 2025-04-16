"use client"

import * as Blockly from "blockly"
import { Order } from "../order"
import {
	SensorsBlockNames,
	SENSORS_BLOCK_TYPES,
	SENSORS_FIELD_VALUES,
	SENSOR_TYPES,
	IMUSensorType,
	LeftRightSensorType,
	IRSensorType
} from "../block-types/sensor-block-types"
import { sensorsCategoryColour } from "../../constants"

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
						SENSORS_FIELD_VALUES.IMU_READ
					)
				this.setOutput(true, "Number")
				this.setColour(sensorsCategoryColour)
				this.setTooltip("Read value from 9-axis IMU sensor")
			}
		},
		generator: (block: Blockly.Block): [string, number] => {
			const value = block.getFieldValue(SENSORS_FIELD_VALUES.IMU_READ) as IMUSensorType
			return [`Sensors::getInstance().${value}`, Order.FUNCTION_CALL]
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
						SENSORS_FIELD_VALUES.TOF_READ
					)
					.appendField("ToF sensor")
				this.setOutput(true, "Number")
				this.setColour(sensorsCategoryColour)
				this.setTooltip("Read distance in mm from Time of Flight sensor")
			}
		},
		generator: (block: Blockly.Block): [string, number] => {
			const sensor = block.getFieldValue(SENSORS_FIELD_VALUES.TOF_READ) as LeftRightSensorType
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
						SENSORS_FIELD_VALUES.IR_READ
					)
				this.setOutput(true, "Number")
				this.setColour(sensorsCategoryColour)
				this.setTooltip("Read value from infrared sensor")
			}
		},
		generator: (block: Blockly.Block): [string, number] => {
			const sensor = block.getFieldValue(SENSORS_FIELD_VALUES.IR_READ) as IRSensorType
			return [`readIR(IR_${sensor})`, Order.FUNCTION_CALL]
		}
	},
	[SENSORS_BLOCK_TYPES.COLOR_SENSOR_READ]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Read Color Sensor")
				this.setOutput(true, "String")
				this.setColour(sensorsCategoryColour)
				this.setTooltip("Read value from color sensor")
			}
		},
		generator: (block: Blockly.Block): [string, number] => {
			const value = block.getFieldValue(SENSORS_FIELD_VALUES.IMU_READ) as IMUSensorType
			return [`Sensors::getInstance().${value}`, Order.FUNCTION_CALL]
		}
	},
}
