"use client"

import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import { usePathname } from "next/navigation"
import { LoginRequest } from "@bluedotrobots/common-ts"
import useTypedNavigate from "../navigate/typed-navigate"
import authClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import confirmLoginFields from "../../utils/auth/confirm-login-fields"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"
import { PageToNavigateAfterLogin } from "../../utils/constants"
import retrieveDataAfterLogin from "../../utils/auth/retrieve-data-after-login"

export default function useLoginSubmit (setError: (error: string) => void): (loginInformation: LoginRequest) => Promise<void> {
	const navigate = useTypedNavigate()
	const pathname = usePathname()

	return useCallback(async (loginInformation: LoginRequest): Promise<void> => {
		setError("")
		try {
			const areCredentialsValid = confirmLoginFields(loginInformation, setError)
			if (areCredentialsValid === false) return

			authClass.setAuthenticating(true)
			const response = await blueDotApiClientClass.authDataService.login(loginInformation)
			if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to log in. Please reload the page and try again")
				return
			}
			authClass.setAccessToken(response.data.accessToken)
			retrieveDataAfterLogin()
			if (pathname === "/login") navigate(PageToNavigateAfterLogin)
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError)
		} finally {
			authClass.setAuthenticating(false)
		}
	}, [navigate, pathname, setError])
}
