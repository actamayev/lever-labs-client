import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import PageHelmet from "../components/helmet/page-helmet"
import BlocklyComponent from "../components/blockly-component"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"

function TheSandbox() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return (
			<>
				<PageHelmet pageTitle="/the-sandbox" />
				<ShowAuthToNullUser whereToNavigate="/the-sandbox" />
			</>
		)
	}

	return (
		<>
			<PageHelmet pageTitle="/the-sandbox" />
			<div className="text-black dark:text-white text-3xl">
				The Sandbox
			</div>
			<BlocklyComponent />
		</>
	)
}

export default observer(TheSandbox)
