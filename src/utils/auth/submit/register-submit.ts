"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { RegisterRequest } from "@bluedotrobots/common-ts/types/api"
import getAuthClass from "../../../classes/auth-class"
import { isNonSuccessResponse } from "../../type-checks"
import confirmRegisterFields from "../confirm-register-fields"
import getPersonalInfoClass from "../../../classes/personal-info-class"
import getBlueDotApiClientClass from "../../../classes/blue-dot-api-client-class"
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

		getAuthClass().setAuthenticating(true)
		if (typeof window === "undefined") return false

		const siteTheme = getPersonalInfoClass().defaultSiteTheme
		if (isNull(registerCredentials.age)) return false

		const registerRequest: RegisterRequest = {
			...registerCredentials,
			age: registerCredentials.age,
			siteTheme
		}

		const response = await getBlueDotApiClientClass().authDataService.register(registerRequest)

		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			setError("Unable to register. Please reload the page and try again")
			return false
		}
		getAuthClass().setAuthState({
			isAuthenticated: true,
			hasCompletedSignup: true
		})
		getPersonalInfoClass().setRegisteredValues(
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
		getAuthClass().setAuthenticating(false)
	}
}
