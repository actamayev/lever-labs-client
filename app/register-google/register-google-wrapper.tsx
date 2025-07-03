"use client"

import { observer } from "mobx-react"
import RegisterGoogleInfoComponent from "../../src/components/auth/register-google-info/register-google-info-component"
import useRedirectUserWithUsername from "../../src/hooks/redirects/redirect-user-with-username"

function RegisterGoogleWrapper() {
	useRedirectUserWithUsername()
	return <RegisterGoogleInfoComponent />
}

export default observer(RegisterGoogleWrapper)
