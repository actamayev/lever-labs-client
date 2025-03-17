"use client"

import { observer } from "mobx-react-lite"
import RegisterComponent from "../../src/components/auth/register/register-component"
import useRedirectKnownUser from "../../src/hooks/redirects/redirect-known-user"

function RegisterWrapper() {
	useRedirectKnownUser()
	return <RegisterComponent />
}

export default observer(RegisterWrapper)
