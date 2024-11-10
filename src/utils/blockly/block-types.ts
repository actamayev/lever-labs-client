/* eslint-disable @typescript-eslint/naming-convention */

export const BLOCK_TYPES = {
	// LED Control
	ESP32_LED_CONTROL: "esp32_led_control",

	// Basic Controls
	ESP32_DELAY: "esp32_delay",
	ESP32_LOOP: "esp32_loop",

	// Sensors
	IMU_READ: "imu_read",
	TOF_READ: "tof_read",
	IR_READ: "ir_read",

	// Motors
	ESP32_MOTOR_CONTROL: "esp32_motor_control",
	MOTOR_SET_SPEED: "motor_set_speed",
	MOTORS_STOP: "motors_stop",
	MOTORS_TANK_DRIVE: "motors_tank_drive"
} as const

// Derive the type from the const assertion
export type BlockNames = typeof BLOCK_TYPES[keyof typeof BLOCK_TYPES];

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
