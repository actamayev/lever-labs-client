import isNull from "lodash/isNull"
import useTypedNavigate from "../navigate/typed-navigate"
import { useEffect } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useRedirectUserWithUsername (): void  {
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()
	const navigate = useTypedNavigate()

	useEffect(() => {
		if (authClass.isLoggedIn === false) {
			return navigate("/")
		}
		if (isNull(personalInfoClass.username)) return
		navigate("/lab")
	}, [authClass.isLoggedIn, navigate, personalInfoClass, personalInfoClass.username])
}
