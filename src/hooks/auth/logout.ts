import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { usePipContext } from "../../contexts/pip-context"
import { useAuthContext } from "../../contexts/auth-context"
import { useSocketContext } from "../../contexts/socket-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useLogout(): () => void {
	const authClass = useAuthContext()
	const blueDotApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()
	const pipClass = usePipContext()
	const socketClass = useSocketContext()
	const navigate = useTypedNavigate()

	return useCallback((): void => {
		personalInfoClass.logout()
		pipClass.logout()
		socketClass.logout()
		authClass.logout()
		blueDotApiClient.logout()
		navigate("/")
	}, [personalInfoClass, pipClass, socketClass, authClass, blueDotApiClient, navigate])
}
