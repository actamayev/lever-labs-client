import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import PageHelmet from "../components/helmet/page-helmet"
import BlocklyComponent from "../components/blockly-component"
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
			<BlocklyComponent />
			<h2>Generated Code:</h2>
		</>
	)
}

export default observer(TheLab)
