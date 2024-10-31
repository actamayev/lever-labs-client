declare global {
	interface IncompletePipData {
		pipName: string
		pipUUID: PipUUID
	}

	interface PipData extends IncompletePipData {
		userPipUUIDId: number
	}
}

export {}
