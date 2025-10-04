"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { RegisterRequest, RegisterSuccess } from "@lever-labs/common-ts/types/api"
import authClass from "../../../classes/auth-class"
import { isNonSuccessResponse } from "../../type-checks"
import confirmRegisterFields from "../confirm-register-fields"
import personalInfoClass from "../../../classes/personal-info-class"
import leverLabsApiClient from "../../../classes/lever-labs-api-client-class"
import setErrorAxiosResponse from "../../error-handling/set-error-axios-response"
import serialConnectionManagerClass from "../../../classes/serial-connection-manager-class"

export default async function registerSubmit(
	registerCredentials: RegisterFormValues,
	setError: (error: string) => void,
): Promise<RegisterSuccess | null> {
	try {
		setError("")
		const areCredentialsValid = confirmRegisterFields(registerCredentials, setError)
		if (areCredentialsValid === false) return null

		authClass.setAuthenticating(true)
		if (typeof window === "undefined") return null

		const siteTheme = personalInfoClass.defaultSiteTheme
		if (isNull(registerCredentials.age)) return null

		const registerRequest: RegisterRequest = {
			...registerCredentials,
			age: registerCredentials.age,
			siteTheme
		}

		const response = await leverLabsApiClient.authDataService.register(registerRequest)

		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			setError("Unable to register. Please reload the page and try again")
			return null
		}
		authClass.setAuthState({
			isAuthenticated: true,
			hasCompletedSignup: true
		})
		personalInfoClass.setRegisteredValues(
			registerCredentials.username,
			registerCredentials.email,
			siteTheme,
		)
		void serialConnectionManagerClass.checkAndAutoConnectIfLoggedIn()
		return response.data
	} catch (error: unknown) {
		setErrorAxiosResponse(error, setError)
		return null
	} finally {
		authClass.setAuthenticating(false)
	}
}
