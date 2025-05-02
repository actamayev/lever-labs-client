"use client"

import * as Blockly from "blockly"
import toLower from "lodash-es/toLower"
import { Order } from "../order"
import {
	SENSORS_BLOCK_TYPES,
	SENSORS_FIELD_VALUES,
	SENSOR_TYPES,
	IMUSensorType,
	LeftRightSensorType,
	IRSensorType
} from "../block-types/sensor-block-types"
import { sensorsCategoryColour } from "../../constants"

export const sensorsBlocks: Record<SENSORS_BLOCK_TYPES, CustomBlock> = {
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
	[SENSORS_BLOCK_TYPES.SIDE_TOF_READ]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Is object near side")
					.appendField(
						new Blockly.FieldDropdown(
							Object.entries(SENSOR_TYPES.LEFTRIGHT).map(([key, value]) =>
								[key.toLowerCase(), value] as [string, string]
							)
						),
						SENSORS_FIELD_VALUES.SIDE_TOF_READ
					)
				this.setOutput(true, "Boolean")
				this.setColour(sensorsCategoryColour)
				this.setTooltip("Returns true if an object is detected by the front-left or front-right sensor")
			}
		},
		generator: (block: Blockly.Block): [string, number] => {
			const sensor = block.getFieldValue(SENSORS_FIELD_VALUES.SIDE_TOF_READ) as LeftRightSensorType
			return [`is_object_near_side_${toLower(sensor)}()`, Order.FUNCTION_CALL]
		}
	},
	[SENSORS_BLOCK_TYPES.CENTER_TOF_READ]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Is object in front")
				this.setOutput(true, "Boolean")
				this.setColour(sensorsCategoryColour)
				this.setTooltip("Returns true if an object is detected in front")
			}
		},
		generator: (_block: Blockly.Block): [string, number] => {
			return ["is_object_in_front()", Order.FUNCTION_CALL]
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
