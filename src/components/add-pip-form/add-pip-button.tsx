"use client"

import { observer } from "mobx-react"
import isUndefined from "lodash-es/isUndefined"
import { Button } from "../shadcn/ui/button"
import { useSerialMessageManagerContext } from "../../classes/serial-message-manager"

function AddPipButton({ getFormValues }: { getFormValues: () => IncompletePipData }) {
	const serialMessageManagerClass = useSerialMessageManagerContext()

	// Show add button when all conditions are met
	const isReadyToAdd = () => {
		const formValues = getFormValues()
		return (
			serialMessageManagerClass.isReadyToDisconnect &&
			serialMessageManagerClass.hasBeenDisconnected &&
			formValues.pipUUID !== null &&
			!isUndefined(formValues.pipName) &&
			formValues.pipName.length >= 3
		)
	}

	return (
		<div className="flex justify-between mt-6 items-center">
			<Button
				type="submit"
				disabled={!isReadyToAdd()}
				className="p-5 text-2xl"
			>
				Add Pip to Account
			</Button>
		</div>
	)
}

export default observer(AddPipButton)
