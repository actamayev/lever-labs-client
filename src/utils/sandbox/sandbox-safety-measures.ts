"use client"

import isEmpty from "lodash-es/isEmpty"
import { BytecodeOpCode } from "@bluedotrobots/common-ts/types/bytecode-types"

export function checkForMotorCommands(bytecode: Float32Array): boolean {
	const motorOpcodes: BytecodeOpCode[] = [
		0x50, // MOTOR_FORWARD
		0x51, // MOTOR_BACKWARD
		0x52, // MOTOR_STOP
		0x53, // MOTOR_TURN
		0x54, // MOTOR_FORWARD_TIME
		0x55, // MOTOR_BACKWARD_TIME
		0x56, // MOTOR_FORWARD_DISTANCE
		0x57  // MOTOR_BACKWARD_DISTANCE
	]

	// Each instruction is 5 floats (opcode + 4 operands)
	for (let i = 0; i < bytecode.length; i += 5) {
		const opcode = Math.round(bytecode[i])
		if (motorOpcodes.includes(opcode)) {
			return true
		}
	}
	return false
}

// Helper function to check if first instruction is wait_for_button_press
export function checkForStartButton(bytecode: Float32Array): boolean {
	if (isEmpty(bytecode)) return false

	const firstOpcode = Math.round(bytecode[0])
	return firstOpcode === 0x03 // OP_WAIT_FOR_BUTTON
}
