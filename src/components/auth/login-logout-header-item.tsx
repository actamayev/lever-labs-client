"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import NullUserNavLink from "./null-user-nav-link"
import getPersonalInfoClass from "../../classes/personal-info-class"

function LoginLogoutHeaderItem(): React.ReactNode {
	const pathname = usePathname()

	if (
		!isNull(getPersonalInfoClass().username) ||
		pathname === "/register-google"
	) return null
	return <NullUserNavLink />
}

export default observer(LoginLogoutHeaderItem)
