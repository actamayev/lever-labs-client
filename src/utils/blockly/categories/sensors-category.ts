"use client"

// Define the Sensors category

import { baseCategory } from "./base-category"
import { sensorsCategoryColour } from "../../constants/constants"
import { SENSORS_BLOCK_TYPES } from "@bluedotrobots/common-ts"

// First define the sub-categories
const imuSensorsCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Motion Sensor",
	colour: sensorsCategoryColour,
	contents: [
		{ kind: "block", type: SENSORS_BLOCK_TYPES.IMU_READ }
	]
}

const distanceSensorsCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Distance Sensors",
	colour: sensorsCategoryColour,
	contents: [
		{ kind: "block", type: SENSORS_BLOCK_TYPES.SIDE_TOF_READ},
		{ kind: "block", type: SENSORS_BLOCK_TYPES.CENTER_TOF_READ}
	]
}

// const irSensorsCategory: CustomCategoryInfo = {
// 	...baseCategory,
// 	name: "IR Sensors",
// 	colour: sensorsCategoryColour,
// 	contents: [
// 		{ kind: "block", type: SENSORS_BLOCK_TYPES.IR_READ }
// 	]
// }

// const colorSensorCategory: CustomCategoryInfo = {
// 	...baseCategory,
// 	name: "Color Sensor",
// 	colour: sensorsCategoryColour,
// 	contents: [
// 		{ kind: "block", type: SENSORS_BLOCK_TYPES.COLOR_SENSOR_READ }
// 	]
// }

// Then include them in the parent category
export const sensorsCategory: ParentCategoryInfo = {
	...baseCategory,
	name: "Sensors",
	colour: sensorsCategoryColour,
	contents: [
		imuSensorsCategory,
		distanceSensorsCategory,
		// irSensorsCategory,
		// colorSensorCategory
	]
}
