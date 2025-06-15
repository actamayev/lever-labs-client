"use client"

import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { CredentialResponse } from "@react-oauth/google"
import useTypedNavigate from "../../navigate/typed-navigate"
import { isErrorResponses } from "../../../utils/type-checks"
import useSetDataAfterLoginOrRegister from "../set-data-after-login-or-register"
import blueDotApiClientClass from "../../../classes/blue-dot-api-client-class"
import useRetrieveDataAfterLogin from "../retrieve-data-after-login"
import { usePathname } from "next/navigation"
import { PageToNavigateAfterLogin } from "../../../utils/constants"
import { SiteThemes } from "@bluedotrobots/common-ts"

export default function useGoogleAuthCallback(): (successResponse: CredentialResponse) => Promise<void> {
	const navigate = useTypedNavigate()
	const setDataAfterLogin = useSetDataAfterLoginOrRegister()
	const retrieveDataAfterLogin = useRetrieveDataAfterLogin()
	const pathname = usePathname()

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
			setDataAfterLogin(googleCallbackResponse.data)
			if (googleCallbackResponse.data.isNewUser === true) {
				return navigate("/register-username")
			}
			void retrieveDataAfterLogin()
			if (pathname === "/login") navigate(PageToNavigateAfterLogin)
		} catch (error) {
			console.error(error)
		}
	}, [blueDotApiClientClass.authDataService, navigate, pathname, retrieveDataAfterLogin, setDataAfterLogin])
}
