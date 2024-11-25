import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import PageHelmet from "../components/helmet/page-helmet"
import MySidebar from "../components/my-sidebar/my-sidebar"
// import BlocklyComponent from "../components/blockly-component"
import ShowAuthToNullUser from "../components/show-auth-to-null-user"

function SandboxNew() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return (
			<>
				<PageHelmet pageTitle="/sandbox-new" />
				<ShowAuthToNullUser whereToNavigate="/sandbox-new" />
			</>
		)
	}

	return (
		<>
			<PageHelmet pageTitle="/sandbox-new" />
			<MySidebar >
				test
			</MySidebar>
		</>
	)
}

export default observer(SandboxNew)
