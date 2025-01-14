import { observer } from "mobx-react"
import { useLocation } from "react-router"
import { useAuthContext } from "../contexts/auth-context"
import SetLoginOrRegisterAuthHeaderButton, { LinkAuthHeaderButton } from "./auth/auth-header-links"

function NullUserNavLink() {
	const location = useLocation()
	const authClass = useAuthContext()

	if (location.pathname === "/") {
		return (
			<div className="space-x-2">
				<LinkAuthHeaderButton
					title="LOG IN"
					linkTo="/login"
				/>
				<LinkAuthHeaderButton
					title="SIGN UP"
					linkTo="/register"
				/>
			</div>
		)
	}
	if (location.pathname === "/login" || location.pathname === "/") {
		return (
			<LinkAuthHeaderButton
				title="SIGN UP"
				linkTo="/register"
			/>
		)
	} else if (location.pathname === "/register") {
		return (
			<LinkAuthHeaderButton
				title="LOG IN"
				linkTo="/login"
			/>
		)
	} else if (authClass.showLoginOrRegister === "Login") {
		return (
			<SetLoginOrRegisterAuthHeaderButton
				title="LOG IN"
				loginOrRegister="Register"
			/>
		)
	}
	return (
		<SetLoginOrRegisterAuthHeaderButton
			title="SIGN UP"
			loginOrRegister="Login"
		/>
	)
}

export default observer(NullUserNavLink)
