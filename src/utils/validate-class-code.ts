"use client"

import { ClassCode } from "@actamayev/lever-labs-common-ts/types/utils"
import { ACCEPTABLE_CLASS_CODE_CHARACTERS } from "@actamayev/lever-labs-common-ts/types/utils/constants"

export function isValidClassCode(input: string): input is ClassCode {
	// Check if the input is exactly 5 characters long
	if (input.length !== 5) {
		return false
	}

	// Check if all characters are in the allowed set
	return input.split("").every((char): boolean => ACCEPTABLE_CLASS_CODE_CHARACTERS.includes(char))
}
