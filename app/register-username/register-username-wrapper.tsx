"use client"

import { observer } from "mobx-react"
import RegisterUsernameComponent from "../../src/components/auth/register-username/register-username-component"
import useRedirectUserWithUsername from "../../src/hooks/redirects/redirect-user-with-username"

function RegisterUsernameWrapper() {
	useRedirectUserWithUsername()
	return <RegisterUsernameComponent />
}

export default observer(RegisterUsernameWrapper)
