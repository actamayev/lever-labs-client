import _ from "lodash"
import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { isNonSuccessResponse } from "../../utils/type-checks"
import confirmLoginFields from "../../utils/auth/confirm-login-fields"
import useSetDataAfterLoginOrRegister from "./set-data-after-login-or-register"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default function useLoginSubmit (
	whereToNavigate: PageNames,
	loginInformation: LoginCredentials,
	setError: (error: string) => void,
	setLoading: (loading: boolean) => void
): (
	e: React.FormEvent<HTMLFormElement>,
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const setDataAfterLogin = useSetDataAfterLoginOrRegister()
	const navigate = useTypedNavigate()

	return useCallback(async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setError("")
		try {
			const areCredentialsValid = confirmLoginFields(loginInformation, setError)
			if (areCredentialsValid === false) return

			setLoading(true)
			const response = await blueDotApiClient.authDataService.login(loginInformation)
			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to login. Please reload page and try again.")
				return
			}
			setDataAfterLogin(response.data)
			navigate(whereToNavigate)
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError, "Unable to login")
		} finally {
			setLoading(false)
		}
	}, [blueDotApiClient.authDataService, loginInformation, navigate, setDataAfterLogin, setError, setLoading, whereToNavigate])
}
