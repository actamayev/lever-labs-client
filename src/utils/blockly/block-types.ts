/* eslint-disable @typescript-eslint/naming-convention */

export const PIP_BLOCK_TYPES = {
	ESP32_LED_CONTROL: "esp32_led_control",
	ESP32_DELAY: "esp32_delay",
	ESP32_LOOP: "esp32_loop"
} as const

export const PIP_FIELD_VALUES = {
	ESP32_LED_CONTROL: "led_state",
	ESP32_DELAY: "delay"
} as const

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

export const MOTOR_BLOCK_TYPES = {
	MOTOR_SET_SPEED: "motor_set_speed",
	MOTORS_STOP: "motors_stop",
	MOTORS_TANK_DRIVE: "motors_tank_drive"
} as const

export const MOTOR_FIELD_VALUES = {
	MOTOR_SET_SPEED: "motor",
	MOTORS_STOP: "motors_stop",
	MOTORS_LEFT_TANK_DRIVE: "left_motor_speed",
	MOTORS_RIGHT_TANK_DRIVE: "right_motor_speed",
} as const

// Derive the type from the const assertion
export type BlockNames = SensorsBlockNames | PipBlockNames | MotorBlockNames

export type SensorsBlockNames = typeof SENSORS_BLOCK_TYPES[keyof typeof SENSORS_BLOCK_TYPES]
export type PipBlockNames = typeof PIP_BLOCK_TYPES[keyof typeof PIP_BLOCK_TYPES]
export type MotorBlockNames = typeof MOTOR_BLOCK_TYPES[keyof typeof MOTOR_BLOCK_TYPES]

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

export type IMUSensorType = typeof SENSOR_TYPES.IMU[keyof typeof SENSOR_TYPES.IMU];
export type LeftRightSensorType = typeof SENSOR_TYPES.LEFTRIGHT[keyof typeof SENSOR_TYPES.LEFTRIGHT];
export type IRSensorType = typeof SENSOR_TYPES.IR[keyof typeof SENSOR_TYPES.IR];
export type LEDSensorType = typeof SENSOR_TYPES.LED[keyof typeof SENSOR_TYPES.LED];
