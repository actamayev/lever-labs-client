import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import PageHelmet from "../components/helmet/page-helmet"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"

function TheLab() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return (
			<>
				<PageHelmet pageTitle="/the-lab" />
				<ShowAuthToNullUser whereToNavigate="/the-lab" />
			</>
		)
	}

	return (
		<>
			<PageHelmet pageTitle="/the-lab" />
			<div className="text-black dark:text-white text-3xl">
				The Lab
			</div>
		</>
	)
}

export default observer(TheLab)
