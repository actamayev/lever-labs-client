"use client"

import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import { usePathname } from "next/navigation"
import isUndefined from "lodash-es/isUndefined"
import { SiteThemes } from "@bluedotrobots/common-ts"
import { CredentialResponse } from "@react-oauth/google"
import pipClass from "../../../classes/pip-class"
import authClass from "../../../classes/auth-class"
import useTypedNavigate from "../../navigate/typed-navigate"
import { isErrorResponses } from "../../../utils/type-checks"
import { PageToNavigateAfterLogin } from "../../../utils/constants"
import personalInfoClass from "../../../classes/personal-info-class"
import blueDotApiClientClass from "../../../classes/blue-dot-api-client-class"

export default function useGoogleAuthCallback(): (successResponse: CredentialResponse) => Promise<void> {
	const navigate = useTypedNavigate()
	const pathname = usePathname()

	// eslint-disable-next-line complexity
	return useCallback(async (successResponse: CredentialResponse) => {
		try {
			if (
				isUndefined(successResponse.credential) ||
				isUndefined(successResponse.clientId) ||
				typeof window === "undefined"
			) return

			const siteThemeFromStorage = localStorage.getItem("defaultSiteTheme")
			let siteTheme: SiteThemes = "dark"
			if (siteThemeFromStorage === "light") siteTheme = "light"

			const googleCallbackResponse = await blueDotApiClientClass.authDataService.googleLoginCallback(
				successResponse.credential, siteTheme
			)
			if (!isEqual(googleCallbackResponse.status, 200) || isErrorResponses(googleCallbackResponse.data)) {
				throw Error("Unable to log in")
			}
			authClass.setAccessToken(googleCallbackResponse.data.accessToken)
			if (googleCallbackResponse.data.isNewUser === true) {
				return navigate("/register-username")
			}
			personalInfoClass.setRetrievedPersonalData(googleCallbackResponse.data.personalInfo)
			pipClass.setPipData(googleCallbackResponse.data.userPipData)
			if (
				pathname === "/login" ||
				pathname === "/register"
			) navigate(PageToNavigateAfterLogin)
		} catch (error) {
			console.error(error)
		}
	}, [navigate, pathname])
}
