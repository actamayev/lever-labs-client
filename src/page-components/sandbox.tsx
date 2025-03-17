"use client"

import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import ShowAuthToNullUser from "../components/auth/show-auth-to-null-user"
import SandboxBlocklyComponent from "../components/sandbox/sandbox-blockly-component"

function Sandbox() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return <ShowAuthToNullUser />
	}

	return (
		<div className="text-questionText text-3xl pt-16">
			<SandboxBlocklyComponent />
		</div>
	)
}

export default observer(Sandbox)
