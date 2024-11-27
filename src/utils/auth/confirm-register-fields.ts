import _ from "lodash"
import isEmailValid from "./is-email-valid"

export default function confirmRegisterFields(
	credentials: RegisterFormValues,
	setError: (error: string) => void
): boolean {
	const contactType = isEmailValid(credentials.email)

	if (
		_.isEmpty(credentials.email) || _.isEmpty(credentials.password) ||
		_.isEmpty(credentials.passwordConfirmation) || _.isEmpty(credentials.username)
	) {
		setError("Please enter an email and password")
		return false
	} else if (_.isEqual(contactType, "Unknown")) {
		setError("Please enter a valid email")
		return false
	} else if (credentials.password.length < 6) {
		setError("Password must be at least 6 characters")
		return false
	} else if (!_.isEqual(credentials.password, credentials.passwordConfirmation)) {
		setError("Passwords do not match")
		return false
	} else {
		setError("")
		return true
	}
}
