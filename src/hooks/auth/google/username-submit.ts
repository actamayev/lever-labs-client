"use client"

import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import useTypedNavigate from "../../navigate/typed-navigate"
import { useAuthContext } from "../../../contexts/auth-context"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import { useApiClientContext } from "../../../contexts/blue-dot-api-client-context"
import setErrorAxiosResponse from "../../../utils/error-handling/set-error-axios-response"

export default function useUsernameSubmit (setError: (error: string) => void): (username: string) => Promise<void> {
	const authClass = useAuthContext()
	const blueDotApiClient = useApiClientContext()
	const navigate = useTypedNavigate()
	const personalInfoClass = usePersonalInfoContext()

	return useCallback(async (username: string): Promise<void> => {
		setError("")
		try {
			authClass.setAuthenticating(true)
			const response = await blueDotApiClient.authDataService.registerUsername(username)
			if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to register username. Please reload the page and try again")
				return
			}
			personalInfoClass.setUsername(username)
			// TODO 3/16/25: The user is navigated to /lab. I believe this is because as soon as the username is set,
			// the useRedirectUserWithUsername moves the user to /lab
			navigate("/lab/welcome")
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError)
		} finally {
			authClass.setAuthenticating(false)
		}
	}, [authClass, blueDotApiClient.authDataService, navigate, personalInfoClass, setError])
}
