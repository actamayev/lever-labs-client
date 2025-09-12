import { PipUUID } from "@bluedotrobots/common-ts/types/utils"
import { PipConnectionStatus } from "@bluedotrobots/common-ts/types/pip"

declare global {
	interface PipData {
		pipUUID: PipUUID
		pipConnectionStatus: PipConnectionStatus
	}
}

export {}
