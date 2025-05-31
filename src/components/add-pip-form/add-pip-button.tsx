"use client"

import isEmpty from "lodash-es/isEmpty"
import { observer } from "mobx-react"
import { WiFiConnectionStatus } from "@bluedotrobots/common-ts"
import { Button } from "../shadcn/ui/button"
import { useSerialManagerContext } from "../../contexts/serial-manager-context"

interface Props {
	wiFiConnectionStatus: WiFiConnectionStatus | null
	wiFiNetworkName: string
}

function AddPipButton(props: Props) {
	const { wiFiConnectionStatus, wiFiNetworkName } = props
	const serialManager = useSerialManagerContext()

	if (!serialManager.isReadyToAddPip()) return null

	// Show add button when all conditions are met
	return (
		<div className="flex justify-between mt-6 items-center">
			<Button
				type="submit"
				disabled={isEmpty(wiFiNetworkName) || wiFiConnectionStatus !== WiFiConnectionStatus.WIFI_AND_WEBSOCKET_SUCCESS}
				className="p-5 text-2xl"
			>
				Add Pip to Account
			</Button>
		</div>
	)
}

export default observer(AddPipButton)
