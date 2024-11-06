import _ from "lodash"

export default function confirmLoginFields(credentials: LoginCredentials, setError: (error: string) => void): boolean {
	if (_.isEmpty(credentials.contact) && _.isEmpty(credentials.password)) {
		setError("Please enter an Email/Username and password")
		return false
	} else if (_.isEmpty(credentials.password)) {
		setError("Please enter a password")
		return false
	} else if (_.isEmpty(credentials.contact)) {
		setError("Please enter an Email or Username")
		return false
	} else if (credentials.contact.length < 3) {
		setError("Email/Username must be at least 3 characters")
		return false
	} else if (credentials.password.length < 6) {
		setError("Password must be at least 6 characters")
		return false
	} else {
		setError("")
		return true
	}
}
