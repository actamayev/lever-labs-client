import { useEffect } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useRedirectKnownUserToLab (): void {
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()
	const personalInfoClass = usePersonalInfoContext()

	useEffect(() => {
		if (!authClass.isLoggedIn) return
		if (!personalInfoClass.username) return navigate("/register-username")
		return navigate("/lab/element-1")
	}, [authClass.isAuthenticating, authClass.isLoggedIn, navigate, personalInfoClass.username])
}
