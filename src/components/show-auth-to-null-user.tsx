import { observer } from "mobx-react"
import Login from "./auth/login/login"
import Register from "./auth/register/register"
import { useAuthContext } from "../contexts/auth-context"

interface Props {
	whereToNavigate: PageNames
}

function ShowAuthToNullUser(props: Props) {
	const { whereToNavigate } = props
	const authClass = useAuthContext()

	if (authClass.showLoginOrRegister === "Login") {
		return <Login whereToNavigate={whereToNavigate} />
	}
	return <Register />
}

export default observer(ShowAuthToNullUser)
