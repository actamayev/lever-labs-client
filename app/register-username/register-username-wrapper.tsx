"use client"

import { observer } from "mobx-react-lite"
import RegisterUsernamePage from "../../src/page-components/register-username-page"
import useRedirectUserWithUsername from "../../src/hooks/redirects/redirect-user-with-username"

function RegisterUsernameWrapper() {
	useRedirectUserWithUsername()
	return <RegisterUsernamePage />
}

export default observer(RegisterUsernameWrapper)
