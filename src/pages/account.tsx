import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import PageHelmet from "../components/helmet/page-helmet"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"

function Account() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return (
			<>
				<PageHelmet pageTitle="/account" />
				<ShowAuthToNullUser whereToNavigate="/account" />
			</>
		)
	}

	return (
		<>
			<PageHelmet pageTitle="/account" />
			<div className="text-black dark:text-white text-3xl">
				My Account
			</div>
		</>
	)
}

export default observer(Account)
