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
