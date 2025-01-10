import { observer } from "mobx-react"
import { Outlet } from "react-router"
import { useAuthContext } from "../contexts/auth-context"
import PageHelmet from "../components/helmet/page-helmet"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"

// TODO: Create a base component with the authClass.isLoggedIn === false logic
function Lab() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return (
			<>
				<PageHelmet pageTitle="/lab" />
				<ShowAuthToNullUser whereToNavigate="/lab" />
			</>
		)
	}

	return (
		<>
			<PageHelmet pageTitle="/lab" />
			<div className="text-black dark:text-white text-3xl p-4">
				<Outlet />
			</div>
		</>
	)
}

export default observer(Lab)
