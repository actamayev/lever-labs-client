"use client"

import { observer } from "mobx-react"
import RegisterComponent from "../../src/components/auth/register/register-component"
import useRedirectKnownUser from "../../src/hooks/redirects/use-redirect-known-user"

function RegisterWrapper() {
	useRedirectKnownUser()
	return <RegisterComponent />
}

export default observer(RegisterWrapper)
