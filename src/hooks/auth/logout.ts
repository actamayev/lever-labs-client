import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { useNotificationsContext } from "../../contexts/notifications-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useLogout(): () => void {
	const authClass = useAuthContext()
	const notificationsClass = useNotificationsContext()
	const personalInfoClass = usePersonalInfoContext()
	const navigate = useTypedNavigate()

	return useCallback((): void => {
		personalInfoClass.logout()
		notificationsClass.logout()
		authClass.logout()
		navigate("/")
	}, [personalInfoClass, notificationsClass, authClass, navigate])
}
