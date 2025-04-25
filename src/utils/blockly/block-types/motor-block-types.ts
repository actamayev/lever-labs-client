/* eslint-disable @typescript-eslint/naming-convention */
"use client"

export enum MOTOR_BLOCK_TYPES {
    GO_FORWARD = "go_forward",
    GO_BACKWARD = "go_backward",
    STOP = "stop",
    TURN = "turn"
}

export enum MOTOR_FIELD_VALUES {
    DRIVING_PERCENTAGE = "percentage",
    TURN_DIRECTION = "turn_direction",
    TURN_DEGREES = "turn_degrees"
}

export const TURN_DIRECTIONS = {
	CLOCKWISE: "CLOCKWISE",
	COUNTERCLOCKWISE: "COUNTERCLOCKWISE"
} as const

export type TurnDirectionType = typeof TURN_DIRECTIONS[keyof typeof TURN_DIRECTIONS]

