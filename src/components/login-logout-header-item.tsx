import _ from "lodash"
import { observer } from "mobx-react"
import { useLocation } from "react-router-dom"
import useUsername from "../hooks/memos/username"
import NullUserNavLink from "./null-user-nav-link"

function LoginLogoutHeaderItem() {
	const location = useLocation()
	const username = useUsername()

	if (
		!_.isNull(username) ||
		location.pathname === "/register" ||
		location.pathname === "/login" ||
		location.pathname === "/register-username"
	) return null
	return <NullUserNavLink />
}

export default observer(LoginLogoutHeaderItem)
