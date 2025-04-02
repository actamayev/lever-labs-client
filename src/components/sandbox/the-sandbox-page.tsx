"use client"

import { observer } from "mobx-react"
import useRetrieveAllSandboxProjectsUseEffect from "../../hooks/sandbox/retrieve-all-sandbox-projects-use-effect"

function TheSandboxPage() {
	useRetrieveAllSandboxProjectsUseEffect()

	return (
		<div className="h-screen overflow-y-auto relative">
			Sandbox
		</div>
	)
}

export default observer(TheSandboxPage)
