// Define the Sensors category

import { baseCategory } from "./base-category"
import { sensorsCategoryColour } from "../../constants"

// First define the sub-categories
const imuSensorsCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "IMU",
	colour: sensorsCategoryColour,
	contents: [
		{ kind: "block", type: "imu_read" }
	]
}

const distanceSensorsCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "Distance Sensors",
	colour: sensorsCategoryColour,
	contents: [
		{ kind: "block", type: "tof_read" }
	]
}

const irSensorsCategory: CustomCategoryInfo = {
	...baseCategory,
	name: "IR Sensors",
	colour: sensorsCategoryColour,
	contents: [
		{ kind: "block", type: "ir_read" }
	]
}

// Then include them in the parent category
export const sensorsCategory: ParentCategoryInfo = {
	...baseCategory,
	name: "Sensors",
	colour: sensorsCategoryColour,
	contents: [
		imuSensorsCategory,
		distanceSensorsCategory,
		irSensorsCategory
	]
}
