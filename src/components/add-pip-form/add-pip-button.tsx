"use client"

import { observer } from "mobx-react"
import { Button } from "../shadcn/ui/button"
import { useSerialMessageManagerContext } from "../../contexts/serial-message-manager"

function AddPipButton() {
	const serialMessageManagerClass = useSerialMessageManagerContext()

	// Show add button when all conditions are met
	return (
		<div className="flex justify-between mt-6 items-center">
			<Button
				type="submit"
				disabled={(
					!serialMessageManagerClass.isReadyToDisconnect ||
					!serialMessageManagerClass.hasBeenDisconnected
				)}
				className="p-5 text-2xl"
			>
				Add Pip to Account
			</Button>
		</div>
	)
}

export default observer(AddPipButton)
