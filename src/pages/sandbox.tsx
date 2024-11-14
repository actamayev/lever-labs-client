import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import PageHelmet from "../components/helmet/page-helmet"
import BlocklyComponent from "../components/blockly-component"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"

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
			<div className="text-black dark:text-white text-3xl">
				Sandbox
			</div>
			<BlocklyComponent />
		</>
	)
}

export default observer(Sandbox)
