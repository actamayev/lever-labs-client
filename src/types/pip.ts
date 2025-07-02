import { AddPipData } from "@bluedotrobots/common-ts"

declare global {
	interface IncompletePipData extends AddPipData {
		selectedWiFiNetworkName?: string
		selectedWiFiPassword?: string
		manualWiFiNetworkName?: string
		manualWiFiPassword?: string
	}
}

export {}
