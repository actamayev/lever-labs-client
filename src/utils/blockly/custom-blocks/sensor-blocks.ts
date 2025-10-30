"use client"

import * as Blockly from "blockly"
import toLower from "lodash-es/toLower"
import { Order } from "../order"
import { SENSORS_BLOCK_TYPES, SENSORS_FIELD_VALUES,
	SENSOR_TYPES, IMUSensorType, LeftRightSensorType, ColorSensorReadColorsType } from "@lever-labs/common-ts/types/blockly/sensor"
import { sensorsCategoryColour } from "../../constants/constants"
import { upperFirst } from "lodash-es"

export const sensorsBlocks: Record<SENSORS_BLOCK_TYPES, CustomBlock> = {
	[SENSORS_BLOCK_TYPES.IMU_READ]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Read IMU")
					.appendField(
						new Blockly.FieldDropdown(
							Object.entries(SENSOR_TYPES.IMU).map(([key, value]): [string, string] =>
								[upperFirst(key.toLowerCase()), value] as [string, string]
							)
						),
						SENSORS_FIELD_VALUES.IMU_READ
					)
				this.setOutput(true, "Number")
				this.setColour(sensorsCategoryColour)
				this.setTooltip("Read value from 9-axis IMU sensor")
			},
			keywords: [
				"motion", "orientation", "gyroscope", "accelerometer", "rotation",
				"tilt", "angle", "direction", "compass", "balance", "imu", "yaw", "pitch", "roll", "acceleration", "velocity", "position",
			]
		},
		generator: (block: Blockly.Block): [string, number] => {
			const value = block.getFieldValue(SENSORS_FIELD_VALUES.IMU_READ) as IMUSensorType
			return [`imu.${value}`, Order.FUNCTION_CALL]
		}
	},
	[SENSORS_BLOCK_TYPES.SIDE_TOF_READ]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Is object near")
					.appendField(
						new Blockly.FieldDropdown(
							Object.entries(SENSOR_TYPES.LEFTRIGHT).map(([key, value]): [string, string] =>
								[upperFirst(key.toLowerCase()), value] as [string, string]
							)
						),
						SENSORS_FIELD_VALUES.SIDE_TOF_READ
					)
					.appendField("side?")
				this.setOutput(true, "Boolean")
				this.setColour(sensorsCategoryColour)
				this.setTooltip("Returns true if an object is detected by the front-left or front-right sensor")
			},
			keywords: ["distance", "proximity", "detect", "obstacle", "wall", "barrier", "collision", "avoidance", "left", "right"]
		},
		generator: (block: Blockly.Block): [string, number] => {
			const sensor = block.getFieldValue(SENSORS_FIELD_VALUES.SIDE_TOF_READ) as LeftRightSensorType
			return [`is_object_near_side_${toLower(sensor)}()`, Order.FUNCTION_CALL]
		}
	},
	[SENSORS_BLOCK_TYPES.CENTER_TOF_READ]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Is object in front?")
				this.setOutput(true, "Boolean")
				this.setColour(sensorsCategoryColour)
				this.setTooltip("Returns true if an object is detected in front")
			},
			keywords: ["distance", "proximity", "detect", "obstacle", "wall", "barrier", "collision", "avoidance", "front", "ahead"]
		},
		generator: (_block: Blockly.Block): [string, number] => {
			return ["front_distance_sensor.is_object_in_front()", Order.FUNCTION_CALL]
		}
	},
	[SENSORS_BLOCK_TYPES.COLOR_SENSOR_READ]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Is object")
					.appendField(
						new Blockly.FieldDropdown(
							Object.entries(SENSOR_TYPES.COLOR_SENSOR_READ_COLORS).map(([key, value]): [string, string] =>
								[upperFirst(key.toLowerCase()), value] as [string, string]
							)
						),
						SENSORS_FIELD_VALUES.COLOR_SENSOR_READ
					)
					.appendField("?")
				this.setOutput(true, "Boolean")
				this.setColour(sensorsCategoryColour)
				this.setTooltip("Returns true if an object is detected by the color sensor")
			},
			keywords: ["color", "red", "green", "blue", "white", "black", "detect", "sensor", "vision"]
		},
		generator: (block: Blockly.Block): [string, number] => {
			const value = block.getFieldValue(SENSORS_FIELD_VALUES.COLOR_SENSOR_READ) as ColorSensorReadColorsType
			return [`is_object_${value.toLowerCase()}()`, Order.FUNCTION_CALL]
		}
	},
	[SENSORS_BLOCK_TYPES.GET_FRONT_TOF_DISTANCE]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Inches from object in front")
				this.setOutput(true, "Number")
				this.setColour(sensorsCategoryColour)
				this.setTooltip("Get inches from object in front")
			},
			keywords: [
				"distance", "proximity", "detect", "obstacle", "wall", "barrier", "collision", "avoidance", "front", "ahead"
			]
		},
		generator: (_block: Blockly.Block): [string, number] => {
			return ["front_distance_sensor.get_distance()", Order.FUNCTION_CALL]
		}
	}
}
