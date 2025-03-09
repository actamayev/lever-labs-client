import { useEffect } from "react"
import isNull from "lodash-es/isNull"
import { useLocation } from "react-router"
import { PrivatePageNames } from "../../utils/constants"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useRedirectKnownUser (): void {
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()
	const personalInfoClass = usePersonalInfoContext()
	const location = useLocation()

	useEffect(() => {
		const isPrivatePage = PrivatePageNames.some(privatePath =>
			location.pathname.startsWith(privatePath)
		)
		// if the user is logged in and has a username, go to Garage
		if (
			authClass.isLoggedIn === false ||
			isNull(personalInfoClass.username) ||
			authClass.isAuthenticating === true ||
			isPrivatePage
		) return

		navigate("/lab")
	}, [authClass.isAuthenticating, authClass.isLoggedIn, location.pathname, navigate, personalInfoClass.username])
}
