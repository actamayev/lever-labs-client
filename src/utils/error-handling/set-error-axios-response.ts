"use client"

import { AxiosError } from "axios"
import { isErrorResponse, isMessageResponse, isValidationErrorResponse } from "../type-checks"

// eslint-disable-next-line complexity
export default function setErrorAxiosResponse(
	error: unknown,
	setError: (error: string) => void,
): void {
	console.error(error)
	if (error instanceof AxiosError) {
		if (isMessageResponse(error.response?.data)) {
			setError(`${error.response?.data.message}`)
		} else if (isValidationErrorResponse(error.response?.data)) {
			setError(`${error.response?.data.validationError}` )
		} else if (isErrorResponse(error.response?.data)) {
			setError(`${error.response?.data.error}` )
		} else if (error.response?.data) {
			setError("Please try again")
		} else setError("Please try again")
	} else if (error instanceof Error) {
		setError(`${error.message}`)
	}
}
