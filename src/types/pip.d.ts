declare global {
	interface IncompletePipData extends AddPipData {
		wifiNetworkName?: string
		wifiPassword?: string
	}

	interface AddPipData {
		pipUUID: PipUUID
		shouldAutoConnect: boolean
		pipName?: string
	}

	type WifiPipDataKeys = "wifiNetworkName" | "wifiPassword"

	interface PipData {
		pipName: string
		pipUUID: PipUUID
		userPipUUIDId: number
		pipConnectionStatus: PipConnectionStatus
	}

	interface AddingNewPipRequirements {
		doesPipUUIDExist: boolean
		hasPipNamePreviouslyBeenAdded: boolean
		isPipOnline: boolean
		userAlreadyAddedUUID: boolean
	}

	type PipConnectionStatus =
		ESPConnectionStatus |
		// "inactive" | // Pip is not connected to the internet/ is turned off.
		"online" | // Pip is connected to the internet, but not connected to any browser clients
		// "updating firmware" | // ESP changed to this state when client approves firmware update
		"connected to other user" // Connected to somone else
		// "connected" // Connected to me

	type ESPConnectionStatus =
		"inactive" | // Not connected to internet/is turned off.
		"updating firmware" | // ESP changed to this state when client approves firmware update
		"connected" // Connected to the internet/is active

	type HasPipConnectedStatuses = "connected" | "connecting" | "failed"
}

export {}
