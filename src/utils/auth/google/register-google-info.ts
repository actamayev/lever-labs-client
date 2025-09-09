"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { NewGoogleInfoRequest } from "@bluedotrobots/common-ts/types/api"
import authClass from "../../../classes/auth-class"
import { isNonSuccessResponse } from "../../type-checks"
import personalInfoClass from "../../../classes/personal-info-class"
import blueDotApiClient from "../../../classes/blue-dot-api-client-class"
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
		const response = await blueDotApiClient.authDataService.registerGoogleInfo(cleanGoogleData)
		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			setError("Unable to register username. Please reload the page and try again")
			return false
		}
		if (typeof window === "undefined") return false

		const siteTheme = personalInfoClass.defaultSiteTheme
		personalInfoClass.setRegisteredValues(
			googleInfo.username,
			response.data.email,
			siteTheme,
		)
		authClass.setAuthState({
			isAuthenticated: true,
			hasCompletedSignup: true
		})
		void serialConnectionManagerClass.checkAndAutoConnectIfLoggedIn()
		return true
	} catch (error: unknown) {
		setErrorAxiosResponse(error, setError)
		return false
	} finally {
		authClass.setAuthenticating(false)
	}
}
