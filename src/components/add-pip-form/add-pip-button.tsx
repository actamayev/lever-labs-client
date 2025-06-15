"use client"

import { observer } from "mobx-react"
import isUndefined from "lodash-es/isUndefined"
import { Button } from "../shadcn/ui/button"
import serialMessageManagerClass from "../../classes/serial-message-manager-class"

function AddPipButton({ getFormValues }: { getFormValues: () => IncompletePipData }) {

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
