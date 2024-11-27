import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import PageHelmet from "../components/helmet/page-helmet"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"

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
				Lab
			</div>
		</>
	)
}

export default observer(Lab)
