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
		setError("Let's get your account set up! Fill in all fields to get started")
		return false
	} else if (_.isEqual(contactType, "Unknown")) {
		setError("Oops! Double-check your email format")
		return false
	} else if (credentials.password.length < 6) {
		setError("For better security, please use at least 6 characters for your password")
		return false
	} else if (!_.isEqual(credentials.password, credentials.passwordConfirmation)) {
		setError("The passwords don't quite match - please try again")
		return false
	} else {
		setError("")
		return true
	}
}
