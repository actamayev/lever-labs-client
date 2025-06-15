"use client"

import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import { usePathname } from "next/navigation"
import useTypedNavigate from "../navigate/typed-navigate"
import authClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import useRetrieveDataAfterLogin from "./retrieve-data-after-login"
import confirmLoginFields from "../../utils/auth/confirm-login-fields"
import useSetDataAfterLoginOrRegister from "./set-data-after-login-or-register"
import { useApiClientContext } from "../../classes/blue-dot-api-client-context"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"
import { PageToNavigateAfterLogin } from "../../utils/constants"
import { LoginRequest } from "@bluedotrobots/common-ts"

export default function useLoginSubmit (setError: (error: string) => void): (loginInformation: LoginRequest) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const setDataAfterLogin = useSetDataAfterLoginOrRegister()
	const navigate = useTypedNavigate()
	const retrieveDataAfterLogin = useRetrieveDataAfterLogin()
	const pathname = usePathname()

	return useCallback(async (loginInformation: LoginRequest): Promise<void> => {
		setError("")
		try {
			const areCredentialsValid = confirmLoginFields(loginInformation, setError)
			if (areCredentialsValid === false) return

			authClass.setAuthenticating(true)
			const response = await blueDotApiClient.authDataService.login(loginInformation)
			if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to log in. Please reload the page and try again")
				return
			}
			setDataAfterLogin(response.data)
			void retrieveDataAfterLogin()
			if (pathname === "/login") navigate(PageToNavigateAfterLogin)
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError)
		} finally {
			authClass.setAuthenticating(false)
		}
	}, [blueDotApiClient.authDataService, navigate, pathname, retrieveDataAfterLogin, setDataAfterLogin, setError])
}
