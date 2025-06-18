"use client"

import isEqual from "lodash-es/isEqual"
import { SiteThemes } from "@bluedotrobots/common-ts"
import authClass from "../../../classes/auth-class"
import { isNonSuccessResponse } from "../../type-checks"
import personalInfoClass from "../../../classes/personal-info-class"
import blueDotApiClientClass from "../../../classes/blue-dot-api-client-class"
import setErrorAxiosResponse from "../../error-handling/set-error-axios-response"
import serialConnectionManagerClass from "../../../classes/serial-connection-manager-class"

export default async function registerUsername(
	username: string,
	setError: (error: string) => void
) : Promise<boolean> {
	setError("")
	try {
		authClass.setAuthenticating(true)
		const response = await blueDotApiClientClass.authDataService.registerUsername(username)
		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			setError("Unable to register username. Please reload the page and try again")
			return false
		}
		if (typeof window === "undefined") return false

		const siteThemeFromStorage = localStorage.getItem("defaultSiteTheme")
		let siteTheme: SiteThemes = "dark"
		if (siteThemeFromStorage === "light") siteTheme = "light"
		personalInfoClass.setRegisteredValues(
			username,
			response.data.email,
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
