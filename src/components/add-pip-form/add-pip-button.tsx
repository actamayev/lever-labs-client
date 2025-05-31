"use client"

import isEmpty from "lodash-es/isEmpty"
import { observer } from "mobx-react"
import { WiFiConnectionStatus } from "@bluedotrobots/common-ts"
import { Button } from "../shadcn/ui/button"

interface Props {
	wiFiConnectionStatus: WiFiConnectionStatus | null
	wiFiNetworkName: string
}

function AddPipButton(props: Props) {
	const { wiFiConnectionStatus, wiFiNetworkName } = props

	// Don't show button until WiFi credentials have been successfully tested
	if (wiFiConnectionStatus !== WiFiConnectionStatus.WIFI_AND_WEBSOCKET_SUCCESS) return null

	// Show add button when WiFi is connected but pip hasn't been added to account yet
	return (
		<div className="flex justify-between mt-6 items-center">
			<Button
				type="submit"
				disabled={isEmpty(wiFiNetworkName)}
				className="p-5 text-2xl"
			>
				Add Pip to Account
			</Button>
		</div>
	)
}

export default observer(AddPipButton)
