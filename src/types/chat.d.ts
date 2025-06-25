import { ChatMessageRole } from "@bluedotrobots/common-ts"

declare global {
	interface ChatClassMessage {
		id: string
		role: ChatMessageRole
		content: string
		timestamp: Date
		isStreaming?: boolean
	}
}

export {}
