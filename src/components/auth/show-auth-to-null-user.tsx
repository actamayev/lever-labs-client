"use client"

import { observer } from "mobx-react"
import Login from "./login/login-component"
import Register from "./register/register-component"
import authClass from "../../classes/auth-class"

function ShowAuthToNullUser() {
	if (authClass.showLoginOrRegister === "Register") {
		return <Register />
	}
	return <Login />
}

export default observer(ShowAuthToNullUser)
