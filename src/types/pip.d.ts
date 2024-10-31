declare global {
	interface IncompletePipData {
		pipName: string
		pipUUID: PipUUID
	}

	interface PipData extends IncompletePipData {
		userPipUUIDId: number
		pipConnectionStatus: PipConnectionStatus
	}

	type PipConnectionStatus = "not connected" | "connected"
}

export {}
