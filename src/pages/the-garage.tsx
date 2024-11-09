import { observer } from "mobx-react"
import PipUUIDs from "../components/the-lab/pip-uuids"
import { useAuthContext } from "../contexts/auth-context"
import PageHelmet from "../components/helmet/page-helmet"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"
import useRetrievePipInfoUseEffect from "../hooks/pip/retrieve-pip-info"

function TheGarage() {
	useRetrievePipInfoUseEffect()
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return (
			<>
				<PageHelmet pageTitle="/the-garage" />
				<ShowAuthToNullUser whereToNavigate="/the-garage" />
			</>
		)
	}

	return (
		<>
			<PageHelmet pageTitle="/the-garage" />
			<div className="text-black dark:text-white text-3xl">
				The Garage
			</div>
			<PipUUIDs />
		</>
	)
}

export default observer(TheGarage)
