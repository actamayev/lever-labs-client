"use client"

import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import confirmRegisterFields from "../../utils/auth/confirm-register-fields"
import useSetDataAfterLoginOrRegister from "./set-data-after-login-or-register"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default function useRegisterSubmit (
	setError: (error: string) => void,
): (registerCredentials: RegisterFormValues) => Promise<void> {
	const authClass = useAuthContext()
	const blueDotApiClient = useApiClientContext()
	const navigate = useTypedNavigate()
	const setDataAfterRegister = useSetDataAfterLoginOrRegister()

	return useCallback(async (registerCredentials: RegisterFormValues): Promise<void> => {
		setError("")
		try {
			const areCredentialsValid = confirmRegisterFields(registerCredentials, setError)
			if (areCredentialsValid === false) return

			authClass.setAuthenticating(true)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { passwordConfirmation, ...restOfCredentials } = registerCredentials
			if (typeof window === "undefined") return

			const siteThemeFromStorage = localStorage.getItem("defaultSiteTheme")
			let siteTheme: SiteThemes = "dark"
			if (siteThemeFromStorage === "light") siteTheme = "light"

			const response = await blueDotApiClient.authDataService.register({ ...restOfCredentials, siteTheme })

			if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to register. Please reload the page and try again")
				return
			}
			setDataAfterRegister(response.data)
			navigate("/lab/welcome")
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError)
		} finally {
			authClass.setAuthenticating(false)
		}
	}, [authClass, blueDotApiClient.authDataService, navigate, setDataAfterRegister, setError])
}
