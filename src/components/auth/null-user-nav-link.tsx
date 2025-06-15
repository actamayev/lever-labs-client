"use client"

import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { isValidRoute } from "../../utils/type-checks"
import authClass from "../../classes/auth-context"
import SetLoginOrRegisterAuthHeaderButton, { LinkAuthHeaderButton } from "./auth-header-links"

// eslint-disable-next-line complexity
function NullUserNavLink() {
	const pathname = usePathname()

	if (
		pathname === "/" ||
		pathname === "/contact" ||
		pathname === "/mission" ||
		pathname === "/schools" ||
		pathname === "/community-guidelines" ||
		pathname === "/privacy" ||
		pathname === "/terms" ||
		!isValidRoute(pathname)
	) {
		return (
			<div className="space-x-1 sm:space-x-2 flex flex-row">
				<LinkAuthHeaderButton title="LOG IN" linkTo="/login" />
				<LinkAuthHeaderButton title="SIGN UP" linkTo="/register"/>
			</div>
		)
	} else if (pathname === "/register") {
		return (
			<LinkAuthHeaderButton title="LOG IN" linkTo="/login" />
		)
	} else if (pathname === "/login") {
		return (
			<LinkAuthHeaderButton title="SIGN UP" linkTo="/register"/>
		)
	} else if (authClass.showLoginOrRegister === "Login") {
		return (
			<SetLoginOrRegisterAuthHeaderButton title="SIGN UP" setShowLoginOrRegister="Register" />
		)
	}
	return (
		<SetLoginOrRegisterAuthHeaderButton title="LOG IN" setShowLoginOrRegister="Login" />
	)
}

export default observer(NullUserNavLink)
