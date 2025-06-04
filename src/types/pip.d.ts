import { AddPipData } from "@bluedotrobots/common-ts"

declare global {
	interface IncompletePipData extends AddPipData {
		wiFiNetworkName: string
		wiFiPassword: string
	}
}

export {}
