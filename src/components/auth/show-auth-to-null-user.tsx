"use client"

import { observer } from "mobx-react"
import Login from "./login/login-component"
import Register from "./register/register-component"
import { useAuthContext } from "../../contexts/auth-context"

interface Props {
	whereToNavigate: PageNames
}

function ShowAuthToNullUser(props: Props) {
	const { whereToNavigate } = props
	const authClass = useAuthContext()

	if (authClass.showLoginOrRegister === "Register") {
		return <Register />
	}
	return <Login whereToNavigate={whereToNavigate} />
}

export default observer(ShowAuthToNullUser)
