import { AddPipData } from "@bluedotrobots/common-ts"

declare global {
	interface IncompletePipData extends AddPipData {
		wifiNetworkName?: string
		wifiPassword?: string
	}

	type WifiPipDataKeys = "wifiNetworkName" | "wifiPassword"

	interface AddingNewPipRequirements {
		doesPipUUIDExist: boolean
		hasPipNamePreviouslyBeenAdded: boolean
		isPipOnline: boolean
		userAlreadyAddedUUID: boolean
		checkedConnectedToWifi: boolean
	}

	// type WiFiConnectionStatus = ""
}

export {}
