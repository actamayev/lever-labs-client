import { SandboxProject } from "@bluedotrobots/common-ts"

declare global {
	interface SandboxProjectWithStreaming extends SandboxProject {
		isStreaming: boolean
		isWaitingForResponse: boolean
		currentStreamingMessageId: string | null
		cppCode: string
	}
}

export {}
