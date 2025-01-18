import { observer } from "mobx-react"
import { Outlet, useLocation } from "react-router"
import { useAuthContext } from "../contexts/auth-context"
import PageHelmet from "../components/helmet/page-helmet"
import ShowAuthToNullUser from "../components/auth/show-auth-to-null-user"

function Lab() {
	const authClass = useAuthContext()
	const location = useLocation()

	if (authClass.isLoggedIn === false) {
		return (
			<>
				<PageHelmet pageTitle={location.pathname as LabPages} />
				<ShowAuthToNullUser whereToNavigate={location.pathname as LabPages} />
			</>
		)
	}

	return (
		<>
			<PageHelmet pageTitle={location.pathname as LabPages} />
			<div className="text-black dark:text-white text-3xl p-4">
				<Outlet />
			</div>
		</>
	)
}

export default observer(Lab)
