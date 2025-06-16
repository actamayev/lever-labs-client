"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { SiteThemes } from "@bluedotrobots/common-ts"
import authClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import confirmRegisterFields from "./confirm-register-fields"
import setErrorAxiosResponse from "../error-handling/set-error-axios-response"

export default async function useRegisterSubmit (
	registerCredentials: RegisterFormValues,
	setError: (error: string) => void,
): Promise<void> {
	try {
		setError("")
		const areCredentialsValid = confirmRegisterFields(registerCredentials, setError)
		if (areCredentialsValid === false) return

		authClass.setAuthenticating(true)
		if (typeof window === "undefined") return

		const siteThemeFromStorage = localStorage.getItem("defaultSiteTheme")
		let siteTheme: SiteThemes = "dark"
		if (siteThemeFromStorage === "light") siteTheme = "light"
		if (isNull(registerCredentials.age)) return

		const registerRequest = {
			...registerCredentials,
			age: registerCredentials.age,
			siteTheme
		}

		const response = await blueDotApiClientClass.authDataService.register(registerRequest)

		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			setError("Unable to register. Please reload the page and try again")
			return
		}
		authClass.setAccessToken(response.data.accessToken, true)
	} catch (error: unknown) {
		setErrorAxiosResponse(error, setError)
	} finally {
		authClass.setAuthenticating(false)
	}
}
