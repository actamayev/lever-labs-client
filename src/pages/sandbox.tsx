import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import PageHelmet from "../components/helmet/page-helmet"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"
import BlocklyComponent from "../components/blockly-component"

function Sandbox() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return (
			<>
				<PageHelmet pageTitle="/sandbox" />
				<ShowAuthToNullUser whereToNavigate="/sandbox" />
			</>
		)
	}

	return (
		<>
			<PageHelmet pageTitle="/sandbox" />
			<BlocklyComponent />
		</>
	)
}

export default observer(Sandbox)
