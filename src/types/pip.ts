import { PipUUID } from "@bluedotrobots/common-ts/types/utils"
import { ClientPipConnectionStatus } from "@bluedotrobots/common-ts/types/pip"

declare global {
	interface PipData {
		pipUUID: PipUUID
		pipConnectionStatus: ClientPipConnectionStatus
	}
}

export {}
