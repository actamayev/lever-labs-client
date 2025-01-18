import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import PageHelmet from "../components/helmet/page-helmet"
import AddPipForm from "../components/add-pip-form/add-pip-form"
import ShowAuthToNullUser from "../components/auth/show-auth-to-null-user"

function AddPip() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return (
			<>
				<PageHelmet pageTitle="/add-pip" />
				<ShowAuthToNullUser whereToNavigate="/add-pip" />
			</>
		)
	}

	return (
		<>
			<PageHelmet pageTitle="/add-pip" />
			<AddPipForm />
		</>
	)
}

export default observer(AddPip)
