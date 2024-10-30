import _ from "lodash"
import { useEffect } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useRedirectKnownUser (): void  {
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()
	const personalInfoClass = usePersonalInfoContext()

	useEffect(() => {
		// if the user is logged in and has a username, go to ownership
		if (authClass.isLoggedIn === false || _.isNull(personalInfoClass.username)) return
		navigate("/the-lab")
	}, [authClass.isLoggedIn, navigate, personalInfoClass.username])
}
