import { observer } from "mobx-react"
import { useLocation } from "react-router-dom"
import NullUserNavLink from "../null-user-nav-link"
import { useAuthContext } from "../../contexts/auth-context"
import HeaderDropdown from "./profile-dropdown/header-dropdown"

function LoginLogoutHeaderItem() {
	const authClass = useAuthContext()
	const location = useLocation()

	if (authClass.isLoggedIn === false) {
		if (location.pathname === "/register" || location.pathname === "/login") {
			return null
		}
		return <NullUserNavLink />
	}

	return <HeaderDropdown />
}

export default observer(LoginLogoutHeaderItem)
