import { observer } from "mobx-react"
import PipUUIDs from "../components/lab/pip-uuids"
import { useAuthContext } from "../contexts/auth-context"
import PageHelmet from "../components/helmet/page-helmet"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"

function Garage() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return (
			<>
				<PageHelmet pageTitle="/garage" />
				<ShowAuthToNullUser whereToNavigate="/garage" />
			</>
		)
	}

	return (
		<>
			<PageHelmet pageTitle="/garage" />
			<div className="text-black dark:text-white text-3xl">
				Garage
			</div>
			<PipUUIDs />
		</>
	)
}

export default observer(Garage)
