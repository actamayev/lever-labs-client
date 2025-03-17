"use client"

import { observer } from "mobx-react-lite"
import LoginComponent from "../../src/components/auth/login/login-component"
import useRedirectKnownUser from "../../src/hooks/redirects/redirect-known-user"

function LoginWrapper() {
	useRedirectKnownUser()
	return <LoginComponent />
}

export default observer(LoginWrapper)
