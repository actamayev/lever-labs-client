import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { usePipContext } from "../../contexts/pip-context"
import { useAuthContext } from "../../contexts/auth-context"
import { useSocketContext } from "../../contexts/socket-context"
import { useAddPipContext } from "../../contexts/add-pip-context"
import { useLabReadingContext } from "../../contexts/lab-reading-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useLogout(): () => void {
	const authClass = useAuthContext()
	const blueDotApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()
	const pipClass = usePipContext()
	const addPipClass = useAddPipContext()
	const socketClass = useSocketContext()
	const labReadingClass = useLabReadingContext()
	const navigate = useTypedNavigate()

	return useCallback((): void => {
		personalInfoClass.logout()
		pipClass.logout()
		addPipClass?.store.logout()
		addPipClass?.form.reset()
		socketClass.logout()
		authClass.logout()
		blueDotApiClient.logout()
		labReadingClass.logout()
		navigate("/")
	}, [personalInfoClass, pipClass, addPipClass?.store, addPipClass?.form,
		socketClass, authClass, blueDotApiClient, labReadingClass, navigate])
}
