import { AxiosError } from "axios"
import { isErrorResponse, isMessageResponse, isValidationErrorResponse } from "../type-checks"

export default function setErrorAxiosResponse(
	error: unknown,
	setError: (error: string) => void,
	preErrorMessage = ""
): void {
	console.error(error)
	if (error instanceof AxiosError) {
		if (isMessageResponse(error.response?.data)) {
			setError(`${preErrorMessage}: ${error.response.data.message}`)
		} else if (isValidationErrorResponse(error.response?.data)) {
			setError(`${preErrorMessage}: ${error.response.data.validationError}` )
		} else if (isErrorResponse(error.response?.data)) {
			setError(`${preErrorMessage}: ${error.response.data.error}` )
		} else if (error.response?.data) {
			setError(`${preErrorMessage}, please try again`)
		} else setError(`${preErrorMessage}, please try again`)
	} else if (error instanceof Error) {
		setError(`${preErrorMessage}: ${error.message}`)
	}
}
