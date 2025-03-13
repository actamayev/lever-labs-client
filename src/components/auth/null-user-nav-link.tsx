import { observer } from "mobx-react"
import { useLocation } from "react-router"
import { useAuthContext } from "../../contexts/auth-context"
import SetLoginOrRegisterAuthHeaderButton, { LinkAuthHeaderButton } from "./auth-header-links"
import { isValidRoute } from "../../utils/type-checks"

function NullUserNavLink() {
	const location = useLocation()
	const authClass = useAuthContext()

	if (
		location.pathname === "/" ||
		location.pathname === "/contact" ||
		location.pathname === "/mission" ||
		location.pathname === "/schools" ||
		!isValidRoute(location.pathname)
	) {
		return (
			<div className="space-x-1 sm:space-x-2 flex flex-row">
				<LinkAuthHeaderButton title="LOG IN" linkTo="/login" />
				<LinkAuthHeaderButton title="SIGN UP" linkTo="/register"/>
			</div>
		)
	} else if (location.pathname === "/register") {
		return (
			<LinkAuthHeaderButton title="LOG IN" linkTo="/login" />
		)
	} else if (location.pathname === "/login") {
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
