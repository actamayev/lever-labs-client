"use client"

/* eslint-disable @typescript-eslint/naming-convention */

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

export type MotorBlockNames = typeof MOTOR_BLOCK_TYPES[keyof typeof MOTOR_BLOCK_TYPES]
