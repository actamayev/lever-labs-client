/* eslint-disable @typescript-eslint/naming-convention */
"use client"

export enum MOTOR_BLOCK_TYPES {
    GO_FORWARD = "go_forward",
    GO_BACKWARD = "go_backward",
    GO_FORWARD_TIME = "go_forward_time",
    GO_BACKWARD_TIME = "go_backward_time",
    GO_FORWARD_DISTANCE = "go_forward_distance",
    GO_BACKWARD_DISTANCE = "go_backward_distance",
    STOP = "stop",
    TURN = "turn"
}

export enum MOTOR_FIELD_VALUES {
    DRIVING_PERCENTAGE = "percentage",
    DRIVING_SECONDS = "seconds",
    DRIVING_DISTANCE = "distance",
    TURN_DIRECTION = "turn_direction",
    TURN_DEGREES = "turn_degrees"
}

export const TURN_DIRECTIONS = {
	CLOCKWISE: "CLOCKWISE",
	COUNTERCLOCKWISE: "COUNTERCLOCKWISE"
} as const

export type TurnDirectionType = typeof TURN_DIRECTIONS[keyof typeof TURN_DIRECTIONS]
