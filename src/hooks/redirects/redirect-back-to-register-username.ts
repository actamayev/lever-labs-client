import _ from "lodash"
import { useEffect } from "react"
import { useLocation } from "react-router"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

const PrivatePageNames = [
	"/garage",
	"/lab",
	"/sandbox",
	"/account"
]

// This hook exists to make sure that Google users who have not registered their username are unable to go to private pages
export default function useRedirectBackToRegisterUsername (): void  {
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()
	const location = useLocation()
	const navigate = useTypedNavigate()

	useEffect(() => {
		// If the user isn't logged in, no need to re-direct (return)
		if (authClass.isLoggedIn === false) return
		// If the user already has a username, no need to re-direct (return)
		if (!_.isNull(personalInfoClass.username) || _.isNull(personalInfoClass.email)) return
		// If the user isn't trying to access a private page, no need to re-direct (return)
		if (PrivatePageNames.includes(location.pathname) === false) return
		navigate("/register-username")
	}, [authClass.isLoggedIn, location.pathname, navigate, personalInfoClass, personalInfoClass.username, personalInfoClass.email])
}
