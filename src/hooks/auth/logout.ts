import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { usePipContext } from "../../contexts/pip-context"
import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useLogout(): () => void {
	const authClass = useAuthContext()
	const blueDotApiClient = useApiClientContext()
	const notificationsClass = useNotificationsContext()
	const personalInfoClass = usePersonalInfoContext()
	const pipClass = usePipContext()
	const navigate = useTypedNavigate()

	return useCallback((): void => {
		personalInfoClass.logout()
		notificationsClass.logout()
		pipClass.logout()
		authClass.logout()
		blueDotApiClient.logout()
		navigate("/")
	}, [personalInfoClass, notificationsClass, pipClass, authClass, blueDotApiClient, navigate])
}
