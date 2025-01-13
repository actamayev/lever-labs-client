import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import PageHelmet from "../components/helmet/page-helmet"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"

function Settings() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return (
			<>
				<PageHelmet pageTitle="/settings" />
				<ShowAuthToNullUser whereToNavigate="/settings" />
			</>
		)
	}

	return (
		<>
			<PageHelmet pageTitle="/settings" />
			<div className="text-black dark:text-white text-3xl p-4">
				Settings
			</div>
		</>
	)
}

export default observer(Settings)
