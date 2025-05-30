"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { WiFiConnectionStatus } from "@bluedotrobots/common-ts"
import { Button } from "../shadcn/ui/button"
import { useAddPipContext } from "../../contexts/add-pip-context"
import useValidatePipData from "../../hooks/pip/validate-pip-data"
import useExitAfterAddPip from "../../hooks/pip/exit-after-add-pip"

function AddPipButton() {
	const addPipClass = useAddPipContext()
	const validatePipData = useValidatePipData()
	const exitAfterAddPip = useExitAfterAddPip()

	if (
		isNull(addPipClass) ||
		!addPipClass.store.mirroredFormValues.pipName
	) return null

	// If the pip name isn't valid, don't show the button
	if (!addPipClass.store.isPipNameValid) return null

	// Don't show button until WiFi credentials have been successfully tested
	if (addPipClass.store.wifiConnectionStatus !== WiFiConnectionStatus.WIFI_AND_WEBSOCKET_SUCCESS) return null

	// If pip has been successfully added to account, show close button
	if (addPipClass.store.addingNewPipRequirements.isPipOnline) {
		return (
			<div className="flex justify-between mt-2 items-center">
				<Button
					type="button"
					onClick={exitAfterAddPip}
					className="p-5 text-2xl"
				>
					Done! Close & Go to Garage
				</Button>
			</div>
		)
	}

	// Show add button when WiFi is connected but pip hasn't been added to account yet
	return (
		<div className="flex justify-between mt-6 items-center">
			<Button
				type="submit"
				disabled={!validatePipData}
				className="p-5 text-2xl"
			>
				Add Pip to Account
			</Button>
		</div>
	)
}

export default observer(AddPipButton)
