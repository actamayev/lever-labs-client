declare global {
	interface IncompletePipData {
		pipName: string
		pipUUID: PipUUID
	}

	interface PipData extends IncompletePipData {
		userPipUUIDId: number
		pipConnectionStatus: PipConnectionStatus
	}

	type PipConnectionStatus =
		"inactive" | // Pip is not connected to the internet/ is turned off.
		"online" | // Pip is connected to the internet, but not connected to any browser clients
		"updating firmware" | // ESP changed to this state when client approves firmware update
		"connected to other user" | // Connected to somone else
		"connected" // Connected to me
}

export {}
