/* eslint-disable @typescript-eslint/naming-convention */

export const SENSORS_BLOCK_TYPES = {
	IMU_READ: "imu_read",
	TOF_READ: "tof_read",
	IR_READ: "ir_read"
} as const

export const SENSORS_FIELD_VALUES = {
	IMU_READ: "imu_value",
	TOF_READ: "tof_sensor",
	IR_READ: "ir_sensor"
} as const

export type SensorsBlockNames = typeof SENSORS_BLOCK_TYPES[keyof typeof SENSORS_BLOCK_TYPES]

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
		ON: "HIGH",
		OFF: "LOW"
	}
} as const

export type IMUSensorType = typeof SENSOR_TYPES.IMU[keyof typeof SENSOR_TYPES.IMU]
export type LeftRightSensorType = typeof SENSOR_TYPES.LEFTRIGHT[keyof typeof SENSOR_TYPES.LEFTRIGHT]
export type IRSensorType = typeof SENSOR_TYPES.IR[keyof typeof SENSOR_TYPES.IR]
export type LEDSensorType = typeof SENSOR_TYPES.LED[keyof typeof SENSOR_TYPES.LED]
