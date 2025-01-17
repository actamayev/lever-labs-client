import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { CredentialResponse } from "@react-oauth/google"
import useTypedNavigate from "../../navigate/typed-navigate"
import { isErrorResponses } from "../../../utils/type-checks"
import useSetDataAfterLoginOrRegister from "../set-data-after-login-or-register"
import { useApiClientContext } from "../../../contexts/blue-dot-api-client-context"

export default function useGoogleAuthCallback(
	whereToNavigate?: PageNames
): (successResponse: CredentialResponse) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const navigate = useTypedNavigate()
	const setDataAfterLogin = useSetDataAfterLoginOrRegister()

	return useCallback(async (successResponse: CredentialResponse) => {
		try {
			if (isUndefined(successResponse.credential) || isUndefined(successResponse.clientId)) return

			const siteThemeFromStorage = localStorage.getItem("defaultSiteTheme")
			let siteTheme: SiteThemes = "dark"
			if (siteThemeFromStorage === "light") siteTheme = "light"

			const googleCallbackResponse = await blueDotApiClient.authDataService.googleLoginCallback(
				successResponse.credential, siteTheme
			)
			if (!isEqual(googleCallbackResponse.status, 200) || isErrorResponses(googleCallbackResponse.data)) {
				throw Error("Unable to log in")
			}
			setDataAfterLogin(googleCallbackResponse.data)
			if (googleCallbackResponse.data.isNewUser === true) {
				return navigate("/register-username")
			}
			if (whereToNavigate) navigate(whereToNavigate)
		} catch (error) {
			console.error(error)
		}
	}, [blueDotApiClient.authDataService, navigate, setDataAfterLogin, whereToNavigate])
}
