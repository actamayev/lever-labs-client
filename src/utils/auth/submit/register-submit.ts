"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { RegisterRequest } from "@actamayev/lever-labs-common-ts/types/api"
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
): Promise<boolean> {
	try {
		setError("")
		const areCredentialsValid = confirmRegisterFields(registerCredentials, setError)
		if (areCredentialsValid === false) return false

		authClass.setAuthenticating(true)
		if (typeof window === "undefined") return false

		const siteTheme = personalInfoClass.defaultSiteTheme
		if (isNull(registerCredentials.age)) return false

		const registerRequest: RegisterRequest = {
			...registerCredentials,
			age: registerCredentials.age,
			siteTheme
		}

		const response = await leverLabsApiClient.authDataService.register(registerRequest)

		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			setError("Unable to register. Please reload the page and try again")
			return false
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
		return true
	} catch (error: unknown) {
		setErrorAxiosResponse(error, setError)
		return false
	} finally {
		authClass.setAuthenticating(false)
	}
}
