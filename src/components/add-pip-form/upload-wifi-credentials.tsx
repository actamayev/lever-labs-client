"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { Button } from "../shadcn/ui/button"
import { MessageBuilder } from "@bluedotrobots/common-ts"
import { useAddPipContext } from "../../contexts/add-pip-context"
import { useSerialManagerContext } from "../../contexts/serial-manager-context"

function UploadWiFiCredentials() {
	const addPipClass = useAddPipContext()
	const serialManager = useSerialManagerContext()

	const uploadCredentials = async () => {
		if (isNull(addPipClass)) return

		const { wifiNetworkName, wifiPassword } = addPipClass.store.mirroredFormValues

		if (!wifiNetworkName || !wifiPassword) return

		addPipClass.store.setIsTestingWiFiConnection(true)

		const message = MessageBuilder.createWiFiCredentialsMessage(wifiNetworkName, wifiPassword)
		const success = await serialManager.sendBinaryMessage(message)

		if (!success) {
			addPipClass.store.setIsTestingWiFiConnection(false)
			// Handle error
		}
	}

	if (
		isNull(addPipClass) ||
        addPipClass.store.addingNewPipRequirements.doesPipUUIDExist === false ||
        !addPipClass.store.isPipNameValid ||
        !addPipClass.store.mirroredFormValues.wifiNetworkName ||
        !addPipClass.store.mirroredFormValues.wifiPassword
	) return null

	return (
		<div className="mt-6">
			<div className="flex flex-col">
				<div className="font-bold mb-2">Step 3: Upload WiFi Credentials</div>
				<Button
					type="button"
					className="mt-6 text-2xl h-12"
					onClick={uploadCredentials}
					disabled={addPipClass.store.isTestingWiFiConnection || !serialManager.connected}
				>
					{addPipClass.store.isTestingWiFiConnection ? "Testing Connection..." : "Upload WiFi Credentials"}
				</Button>
			</div>
		</div>
	)
}

export default observer(UploadWiFiCredentials)
