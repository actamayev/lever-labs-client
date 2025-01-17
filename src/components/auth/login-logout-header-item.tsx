import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { useLocation } from "react-router"
import useUsername from "../../hooks/memos/username"
import NullUserNavLink from "./null-user-nav-link"

function LoginLogoutHeaderItem() {
	const location = useLocation()
	const username = useUsername()

	if (
		!isNull(username) ||
		location.pathname === "/register-username"
	) return null
	return <NullUserNavLink />
}

export default observer(LoginLogoutHeaderItem)
