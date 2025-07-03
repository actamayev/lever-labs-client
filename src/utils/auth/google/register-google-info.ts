"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { NewGoogleInfoRequest, SiteThemes } from "@bluedotrobots/common-ts"
import authClass from "../../../classes/auth-class"
import { isNonSuccessResponse } from "../../type-checks"
import personalInfoClass from "../../../classes/personal-info-class"
import blueDotApiClientClass from "../../../classes/blue-dot-api-client-class"
import setErrorAxiosResponse from "../../error-handling/set-error-axios-response"
import serialConnectionManagerClass from "../../../classes/serial-connection-manager-class"

export default async function registerGoogleInfo(
	googleInfo: NewGoogleInfoFormValues,
	setError: (error: string) => void
) : Promise<boolean> {
	setError("")
	try {
		authClass.setAuthenticating(true)
		if (isNull(googleInfo.age)) return false
		const cleanGoogleData: NewGoogleInfoRequest = {
			age: googleInfo.age,
			username: googleInfo.username
		}
		const response = await blueDotApiClientClass.authDataService.registerGoogleInfo(cleanGoogleData)
		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			setError("Unable to register username. Please reload the page and try again")
			return false
		}
		if (typeof window === "undefined") return false

		const siteThemeFromStorage = localStorage.getItem("defaultSiteTheme")
		let siteTheme: SiteThemes = "dark"
		if (siteThemeFromStorage === "light") siteTheme = "light"
		personalInfoClass.setRegisteredValues(
			googleInfo.username,
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
