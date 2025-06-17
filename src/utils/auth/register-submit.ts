"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { SiteThemes } from "@bluedotrobots/common-ts"
import authClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../type-checks"
import confirmRegisterFields from "./confirm-register-fields"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import setErrorAxiosResponse from "../error-handling/set-error-axios-response"
import personalInfoClass from "../../classes/personal-info-class"

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

		const siteThemeFromStorage = localStorage.getItem("defaultSiteTheme")
		let siteTheme: SiteThemes = "dark"
		if (siteThemeFromStorage === "light") siteTheme = "light"
		if (isNull(registerCredentials.age)) return false

		const registerRequest = {
			...registerCredentials,
			age: registerCredentials.age,
			siteTheme
		}

		const response = await blueDotApiClientClass.authDataService.register(registerRequest)

		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			setError("Unable to register. Please reload the page and try again")
			return false
		}
		authClass.setAccessToken(response.data.accessToken)
		personalInfoClass.setRegisteredValues(
			registerCredentials.username,
			registerCredentials.email,
			siteTheme,
		)
		return true
	} catch (error: unknown) {
		setErrorAxiosResponse(error, setError)
		return false
	} finally {
		authClass.setAuthenticating(false)
	}
}
