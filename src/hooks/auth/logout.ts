import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { usePipContext } from "../../contexts/pip-context"

export default function useLogout(): () => void {
	const authClass = useAuthContext()
	const notificationsClass = useNotificationsContext()
	const personalInfoClass = usePersonalInfoContext()
	const pipClass = usePipContext()
	const navigate = useTypedNavigate()

	return useCallback((): void => {
		personalInfoClass.logout()
		notificationsClass.logout()
		authClass.logout()
		pipClass.logout()
		navigate("/")
	}, [personalInfoClass, notificationsClass, authClass, pipClass, navigate])
}
