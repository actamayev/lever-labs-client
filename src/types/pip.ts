import { PipUUID } from "@lever-labs/common-ts/types/utils"
import { ClientPipConnectionStatus } from "@lever-labs/common-ts/types/pip"

declare global {
	interface PipData {
		pipUUID: PipUUID
		pipConnectionStatus: ClientPipConnectionStatus
	}
}

export {}
