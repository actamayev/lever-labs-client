import { ClassCode } from "@bluedotrobots/common-ts"

export function isValidClassCode(input: string): input is ClassCode {
	// Check if the input is exactly 5 characters long
	if (input.length !== 5) {
		return false
	}

	// Define the allowed characters (same as in generateClassroomCode)
	const allowedCharacters = /^[A-Za-z0-9]{5}$/

	// Test if the input matches the pattern
	return allowedCharacters.test(input)
}
