import _ from "lodash"
import { useCallback } from "react"
import useTypedNavigate from "../../navigate/typed-navigate"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import { useApiClientContext } from "../../../contexts/blue-dot-api-client-context"
import setErrorAxiosResponse from "../../../utils/error-handling/set-error-axios-response"

export default function useUsernameSubmit (
	username: string,
	setError: (error: string) => void,
	setLoading: (loading: boolean) => void
): (
	e: React.FormEvent<HTMLFormElement>
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const navigate = useTypedNavigate()
	const personalInfoClass = usePersonalInfoContext()

	return useCallback(async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setError("")
		try {
			setLoading(true)
			const response = await blueDotApiClient.authDataService.registerUsername(username)
			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to register username. Please reload page and try again.")
				return
			}
			personalInfoClass.setUsername(username)
			navigate("/the-lab")
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError, "Unable to register username")
		} finally {
			setLoading(false)
		}
	}, [blueDotApiClient.authDataService, navigate, personalInfoClass, setError, setLoading, username])
}
