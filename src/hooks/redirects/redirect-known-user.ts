import isNull from "lodash-es/isNull"
import useTypedNavigate from "../navigate/typed-navigate"
import { useEffect } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useRedirectKnownUser (): void {
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()
	const personalInfoClass = usePersonalInfoContext()

	useEffect(() => {
		// if the user is logged in and has a username, go to Garage
		if (authClass.isLoggedIn === false || isNull(personalInfoClass.username)) return
		navigate("/lab")
	}, [authClass.isLoggedIn, navigate, personalInfoClass.username])
}
