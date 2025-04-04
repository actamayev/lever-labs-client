"use client"

import { observer } from "mobx-react"
import { Label } from "../shadcn/ui/label"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

function EmailSection() {
	const personalInfoClass = usePersonalInfoContext()

	return (
		<>
			<Label htmlFor="email" className="text-sm font-medium text-eel">
				Email
			</Label>
			<div id="email" className="text-lg font-medium">
				{personalInfoClass.email || "No email set"}
			</div>
		</>
	)
}

export default observer(EmailSection)
