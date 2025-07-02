import { ChatMessageRole } from "@bluedotrobots/common-ts"

declare global {
	interface ChatClassMessage {
		id: string
		role: ChatMessageRole
		content: string
		timestamp: Date
		isStreaming?: boolean
	}

	interface SingleMessageData {
		messageId: string
		role: ChatMessageRole
		content: string
	}
}

export {}
