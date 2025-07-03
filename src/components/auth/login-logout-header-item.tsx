"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import NullUserNavLink from "./null-user-nav-link"
import personalInfoClass from "../../classes/personal-info-class"

function LoginLogoutHeaderItem() {
	const pathname = usePathname()

	if (
		!isNull(personalInfoClass.username) ||
		pathname === "/register-google"
	) return null
	return <NullUserNavLink />
}

export default observer(LoginLogoutHeaderItem)
