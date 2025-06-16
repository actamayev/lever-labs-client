"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../../classes/auth-class"
import { isNonSuccessResponse } from "../../type-checks"
import personalInfoClass from "../../../classes/personal-info-class"
import blueDotApiClientClass from "../../../classes/blue-dot-api-client-class"
import setErrorAxiosResponse from "../../error-handling/set-error-axios-response"

export default async function useUsernameSubmit(
	username: string,
	setError: (error: string) => void
) : Promise<void> {
	setError("")
	try {
		authClass.setAuthenticating(true)
		const response = await blueDotApiClientClass.authDataService.registerUsername(username)
		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			setError("Unable to register username. Please reload the page and try again")
			return
		}
		personalInfoClass.setUsername(username)
	} catch (error: unknown) {
		setErrorAxiosResponse(error, setError)
	} finally {
		authClass.setAuthenticating(false)
	}
}
