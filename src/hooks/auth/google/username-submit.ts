"use client"

import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import useTypedNavigate from "../../navigate/typed-navigate"
import authClass from "../../../classes/auth-class"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import personalInfoClass from "../../../classes/personal-info-class"
import blueDotApiClientClass from "../../../classes/blue-dot-api-client-class"
import setErrorAxiosResponse from "../../../utils/error-handling/set-error-axios-response"
import { PageToNavigateAfterLogin } from "../../../utils/constants"

export default function useUsernameSubmit (setError: (error: string) => void): (username: string) => Promise<void> {
	const navigate = useTypedNavigate()

	return useCallback(async (username: string): Promise<void> => {
		setError("")
		try {
			authClass.setAuthenticating(true)
			const response = await blueDotApiClientClass.authDataService.registerUsername(username)
			if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to register username. Please reload the page and try again")
				return
			}
			personalInfoClass.setUsername(username)
			// TODO 3/16/25: The user is navigated to /lab. I believe this is because as soon as the username is set,
			// the useRedirectUserWithUsername moves the user to /lab
			navigate(PageToNavigateAfterLogin)
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError)
		} finally {
			authClass.setAuthenticating(false)
		}
	}, [authClass, blueDotApiClientClass.authDataService, navigate, personalInfoClass, setError])
}
