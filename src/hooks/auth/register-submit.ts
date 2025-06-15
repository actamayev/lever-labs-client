"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { SiteThemes } from "@bluedotrobots/common-ts"
import useTypedNavigate from "../navigate/typed-navigate"
import authClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { PageToNavigateAfterLogin } from "../../utils/constants"
import confirmRegisterFields from "../../utils/auth/confirm-register-fields"
import useSetDataAfterLoginOrRegister from "./set-data-after-login-or-register"
import { useApiClientContext } from "../../classes/blue-dot-api-client-context"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default function useRegisterSubmit (
	setError: (error: string) => void,
): (registerCredentials: RegisterFormValues) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const navigate = useTypedNavigate()
	const setDataAfterRegister = useSetDataAfterLoginOrRegister()

	return useCallback(async (registerCredentials: RegisterFormValues): Promise<void> => {
		setError("")
		try {
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

			const response = await blueDotApiClient.authDataService.register(registerRequest)

			if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to register. Please reload the page and try again")
				return
			}
			setDataAfterRegister(response.data)
			navigate(PageToNavigateAfterLogin)
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError)
		} finally {
			authClass.setAuthenticating(false)
		}
	}, [blueDotApiClient.authDataService, navigate, setDataAfterRegister, setError])
}
