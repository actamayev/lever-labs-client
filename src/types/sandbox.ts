import { SandboxProject } from "@lever-labs/common-ts/types/sandbox"

declare global {
	interface SandboxProjectWithStreaming extends SandboxProject {
		isStreaming: boolean
		isWaitingForResponse: boolean
		currentStreamingMessageId: string | null
		cppCode: string
	}
}

export {}
