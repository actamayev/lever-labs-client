import { observer } from "mobx-react"
import Login from "./auth/login/login"
import Register from "./auth/register/register"
import { useAuthContext } from "../contexts/auth-context"

interface Props {
	whereToNavigate: PageNames
	customStyles?: object
}

function ShowAuthToNullUser(props: Props) {
	const { whereToNavigate, customStyles } = props
	const authClass = useAuthContext()

	if (authClass.showLoginOrRegister === "Login") {
		return (
			<Register
				whereToNavigate={whereToNavigate}
				customStyles={customStyles}
			/>
		)
	}
	return (
		<Login
			whereToNavigate={whereToNavigate}
			customStyles={customStyles}
		/>
	)
}

export default observer(ShowAuthToNullUser)
