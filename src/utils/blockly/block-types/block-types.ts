/* eslint-disable @typescript-eslint/naming-convention */
import { PipBlockNames } from "./pip-block-types"
import { LogicBlockNames } from "./logic-block-types"
import { MotorBlockNames } from "./motor-block-types"
import { SensorsBlockNames } from "./sensor-block-types"

// Derive the type from the const assertion
export type BlockNames = SensorsBlockNames | PipBlockNames | MotorBlockNames | LogicBlockNames

// Custom type for sensor types
export const SENSOR_TYPES = {
	IMU: {
		ACCEL_X: "ACCEL_X",
		ACCEL_Y: "ACCEL_Y",
		ACCEL_Z: "ACCEL_Z",
		GYRO_X: "GYRO_X",
		GYRO_Y: "GYRO_Y",
		GYRO_Z: "GYRO_Z",
		MAG_X: "MAG_X",
		MAG_Y: "MAG_Y",
		MAG_Z: "MAG_Z",
	},
	LEFTRIGHT: {
		LEFT: "LEFT",
		RIGHT: "RIGHT",
	},
	IR: {
		LEFT: "LEFT",
		MIDDLE: "MIDDLE",
		RIGHT: "RIGHT",
	},
	LED: {
		ON: "ON",
		OFF: "OFF"
	}
} as const

export type IMUSensorType = typeof SENSOR_TYPES.IMU[keyof typeof SENSOR_TYPES.IMU]
export type LeftRightSensorType = typeof SENSOR_TYPES.LEFTRIGHT[keyof typeof SENSOR_TYPES.LEFTRIGHT]
export type IRSensorType = typeof SENSOR_TYPES.IR[keyof typeof SENSOR_TYPES.IR]
export type LEDSensorType = typeof SENSOR_TYPES.LED[keyof typeof SENSOR_TYPES.LED]
