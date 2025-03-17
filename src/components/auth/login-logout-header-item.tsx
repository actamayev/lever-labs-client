"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import useUsername from "../../hooks/memos/username"
import NullUserNavLink from "./null-user-nav-link"

function LoginLogoutHeaderItem() {
	const pathname = usePathname()
	const username = useUsername()

	if (
		!isNull(username) ||
		pathname === "/register-username"
	) return null
	return <NullUserNavLink />
}

export default observer(LoginLogoutHeaderItem)
