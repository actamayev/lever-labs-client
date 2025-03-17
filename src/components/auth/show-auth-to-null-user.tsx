"use client"

import { observer } from "mobx-react"
import Login from "./login/login-component"
import Register from "./register/register-component"
import { useAuthContext } from "../../contexts/auth-context"

function ShowAuthToNullUser() {
	const authClass = useAuthContext()

	if (authClass.showLoginOrRegister === "Register") {
		return <Register />
	}
	return <Login />
}

export default observer(ShowAuthToNullUser)
