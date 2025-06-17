"use client"

import isEqual from "lodash-es/isEqual"
import { LoginRequest } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import authClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import personalInfoClass from "../../classes/personal-info-class"
import confirmLoginFields from "../../utils/auth/confirm-login-fields"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default async function loginSubmit(
	loginInformation: LoginRequest,
	setError: (error: string) => void,
) : Promise<boolean> {
	try {
		setError("")
		const areCredentialsValid = confirmLoginFields(loginInformation, setError)
		if (areCredentialsValid === false) return false

		authClass.setAuthenticating(true)
		const response = await blueDotApiClientClass.authDataService.login(loginInformation)
		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			setError("Unable to log in. Please reload the page and try again")
			return false
		}
		authClass.setAccessToken(response.data.accessToken)
		personalInfoClass.setRetrievedPersonalData(response.data.personalInfo)
		pipClass.setPipData(response.data.userPipData)
		return true
	} catch (error: unknown) {
		setErrorAxiosResponse(error, setError)
		return false
	} finally {
		authClass.setAuthenticating(false)
	}
}
