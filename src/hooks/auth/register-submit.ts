import _ from "lodash"
import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { isNonSuccessResponse } from "../../utils/type-checks"
import confirmRegisterFields from "../../utils/auth/confirm-register-fields"
import useSetDataAfterLoginOrRegister from "./set-data-after-login-or-register"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default function useRegisterSubmit (
	setError: (error: string) => void,
	setLoading: (loading: boolean) => void
): (registerCredentials: RegisterFormValues) => Promise<void> {

	const blueDotApiClient = useApiClientContext()
	const navigate = useTypedNavigate()
	const setDataAfterRegister = useSetDataAfterLoginOrRegister()

	return useCallback(async (registerCredentials: RegisterFormValues): Promise<void> => {
		setError("")
		try {
			const areCredentialsValid = confirmRegisterFields(registerCredentials, setError)
			if (areCredentialsValid === false) return

			setLoading(true)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { passwordConfirmation, ...restOfCredentials } = registerCredentials

			const siteThemeFromStorage = localStorage.getItem("defaultSiteTheme")
			let siteTheme: SiteThemes = "dark"
			if (siteThemeFromStorage === "light") siteTheme = "light"

			const response = await blueDotApiClient.authDataService.register({ ...restOfCredentials, siteTheme })

			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to register. Please reload the page and try again")
				return
			}
			setDataAfterRegister(response.data)
			navigate("/lab/welcome")
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError)
		} finally {
			setLoading(false)
		}
	}, [blueDotApiClient.authDataService, navigate, setDataAfterRegister, setError, setLoading])
}
