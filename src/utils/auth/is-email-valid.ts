import validator from "validator"

export default function isEmailValid(input: string): EmailOrUnknown {
	if (validator.isEmail(input) === true) return "Email"

	return "Unknown"
}
