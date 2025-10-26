"use client"

import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { isValidRoute } from "../../utils/type-checks"
import authClass from "../../classes/auth-class"
import SetLoginOrRegisterAuthHeaderButton, { LinkAuthHeaderButton } from "./auth-header-links"

// eslint-disable-next-line complexity
function NullUserNavLink(): React.ReactNode {
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
				<LinkAuthHeaderButton title="Login" linkTo="/login" />
				<LinkAuthHeaderButton title="Buy now" linkTo="/" className="border border-swan rounded-full"/>
			</div>
		)
	} else if (pathname === "/register") {
		return (
			<LinkAuthHeaderButton title="Login" linkTo="/login" />
		)
	} else if (pathname === "/login") {
		return (
			<LinkAuthHeaderButton title="Register" linkTo="/register"/>
		)
	} else if (authClass.showLoginOrRegister === "Login") {
		return (
			<SetLoginOrRegisterAuthHeaderButton title="Register" setShowLoginOrRegister="Register" />
		)
	}
	return (
		<SetLoginOrRegisterAuthHeaderButton title="Login" setShowLoginOrRegister="Login" />
	)
}

export default observer(NullUserNavLink)
