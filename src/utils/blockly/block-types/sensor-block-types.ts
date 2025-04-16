"use client"

/* eslint-disable @typescript-eslint/naming-convention */

export const SENSORS_BLOCK_TYPES = {
	IMU_READ: "imu_read",
	TOF_READ: "tof_read",
	IR_READ: "ir_read",
	COLOR_SENSOR_READ: "color_sensor_read"
} as const

export const SENSORS_FIELD_VALUES = {
	IMU_READ: "imu_value",
	TOF_READ: "tof_sensor",
	IR_READ: "ir_sensor",
	COLOR_SENSOR_READ: "color_sensor"
} as const

export type SensorsBlockNames = typeof SENSORS_BLOCK_TYPES[keyof typeof SENSORS_BLOCK_TYPES]

// Custom type for sensor types
export const SENSOR_TYPES = {
	IMU: {
		Yaw: "getYaw()",
		Pitch: "getPitch()",
		Roll: "getRoll()",
		"X Acceleration": "getXAccel()",
		"Y Acceleration": "getYAccel()",
		"Z Acceleration": "getZAccel()",
		"Acceleration Magnitude": "getAccelMagnitude()",
		"X Rotation Rate": "getXRotationRate()",
		"Y Rotation Rate": "getYRotationRate()",
		"Magnetic Field X": "getMagneticFieldX()",
		"Magnetic Field Y": "getMagneticFieldY()",
		"Magnetic Field Z": "getMagneticFieldZ()",
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
	LED_COLORS: {
		WHITE: "WHITE",
		RED: "RED",
		GREEN: "GREEN",
		BLUE: "BLUE",
		OFF: "OFF"
	}
} as const

export type IMUSensorType = typeof SENSOR_TYPES.IMU[keyof typeof SENSOR_TYPES.IMU]
export type LeftRightSensorType = typeof SENSOR_TYPES.LEFTRIGHT[keyof typeof SENSOR_TYPES.LEFTRIGHT]
export type IRSensorType = typeof SENSOR_TYPES.IR[keyof typeof SENSOR_TYPES.IR]
export type LEDSensorType = typeof SENSOR_TYPES.LED_COLORS[keyof typeof SENSOR_TYPES.LED_COLORS]
