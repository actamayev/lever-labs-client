"use client"

import { action, makeAutoObservable, observable } from "mobx"
import { InteractionType, ChatMessageRole} from "@bluedotrobots/common-ts"

export interface ChatMessage {
	id: string
	role: ChatMessageRole
	content: string
	timestamp: Date
	isStreaming?: boolean
}

export interface ChatState {
	messages: ChatMessage[]
	isStreaming: boolean
	currentStreamingMessageId: string | null
	currentInteractionType: InteractionType | null
}

class ChatsClass {
	// Map of challengeId -> ChatState
	public chats = observable.map<string, ChatState>()
	public currentStreamId: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	// Initialize chat for a challenge if it doesn't exist
	private ensureChatExists(challengeId: string): void {
		if (this.chats.has(challengeId)) return
		this.chats.set(challengeId, {
			messages: [],
			isStreaming: false,
			currentStreamingMessageId: null,
			currentInteractionType: null
		})
	}

	// Get chat state for a challenge
	public getChatState(challengeId: string): ChatState {
		this.ensureChatExists(challengeId)
		return (this.chats.get(challengeId) as ChatState)
	}

	// Get messages for a challenge
	public getMessages(challengeId: string): ChatMessage[] {
		return this.getChatState(challengeId).messages
	}

	// Get conversation history (excluding streaming messages)
	public getConversationHistory(challengeId: string): Array<{role: ChatMessageRole, content: string}> {
		const messages = this.getMessages(challengeId)
		return messages
			.filter(msg => !msg.isStreaming)
			.map(msg => ({
				role: msg.role,
				content: msg.content
			}))
	}

	// Add a user message
	public addUserMessage = action((challengeId: string, content: string): void => {
		const chatState = this.getChatState(challengeId)

		const message: ChatMessage = {
			id: `user-${Date.now()}`,
			role: "user",
			content,
			timestamp: new Date()
		}

		chatState.messages.push(message)
	})

	// Start streaming for a challenge
	public startStreaming = action((challengeId: string, interactionType: InteractionType): void => {
		const chatState = this.getChatState(challengeId)

		// Create streaming message placeholder
		const streamingMessage: ChatMessage = {
			id: `streaming-${Date.now()}`,
			role: "assistant",
			content: "",
			timestamp: new Date(),
			isStreaming: true
		}

		chatState.messages.push(streamingMessage)
		chatState.isStreaming = true
		chatState.currentStreamingMessageId = streamingMessage.id
		chatState.currentInteractionType = interactionType
	})

	// Add chunk to streaming message
	public addStreamingChunk = action((challengeId: string, chunk: string): void => {
		const chatState = this.getChatState(challengeId)

		if (!chatState.isStreaming || !chatState.currentStreamingMessageId) {
			console.warn("Received chunk but not streaming for challenge:", challengeId)
			return
		}

		const streamingMessage = chatState.messages.find(
			msg => msg.id === chatState.currentStreamingMessageId
		)

		if (streamingMessage) {
			streamingMessage.content += chunk
		}
	})

	// Complete streaming
	public completeStreaming = action((challengeId: string, finalContent?: string): void => {
		const chatState = this.getChatState(challengeId)

		if (!chatState.isStreaming || !chatState.currentStreamingMessageId) {
			return
		}

		const streamingMessage = chatState.messages.find(
			msg => msg.id === chatState.currentStreamingMessageId
		)

		if (streamingMessage) {
			// Use final content if provided, otherwise keep accumulated content
			if (finalContent) {
				streamingMessage.content = finalContent
			}

			// Mark as no longer streaming
			streamingMessage.isStreaming = false
		}

		// Reset streaming state
		chatState.isStreaming = false
		chatState.currentStreamingMessageId = null
		chatState.currentInteractionType = null
		this.setCurrentStreamId(null)
	})

	// Reset chat state for a challenge
	public resetChatState = action((challengeId: string): void => {
		const chatState = this.getChatState(challengeId)
		chatState.isStreaming = false
		chatState.currentStreamingMessageId = null
		chatState.currentInteractionType = null
		this.setCurrentStreamId(null)
	})

	// Clear all messages for a challenge
	public clearChat = action((challengeId: string): void => {
		const chatState = this.getChatState(challengeId)
		chatState.messages = []
		chatState.isStreaming = false
		chatState.currentStreamingMessageId = null
		chatState.currentInteractionType = null
		this.setCurrentStreamId(null)
	})

	// Check if currently streaming for a challenge
	public isStreaming(challengeId: string): boolean {
		return this.getChatState(challengeId).isStreaming
	}

	// Get current interaction type for a challenge
	public getCurrentInteractionType(challengeId: string): InteractionType | null {
		return this.getChatState(challengeId).currentInteractionType
	}

	// Add error message
	public addErrorMessage = action((challengeId: string, error: string): void => {
		const chatState = this.getChatState(challengeId)
		const message: ChatMessage = {
			id: `error-${Date.now()}`,
			role: "assistant",
			content: error,
			timestamp: new Date()
		}

		chatState.messages.push(message)

		// Reset streaming state if there was an error
		chatState.isStreaming = false
		chatState.currentStreamingMessageId = null
		chatState.currentInteractionType = null
		this.setCurrentStreamId(null)
	})

	public setCurrentStreamId = action((newCurrentStreamId: string | null): void => {
		this.currentStreamId = newCurrentStreamId
	})

	public logout(): void {
		this.chats.clear()
		this.setCurrentStreamId(null)
	}
}

const chatsClass = new ChatsClass()

export default chatsClass
