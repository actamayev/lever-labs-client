"use client"

import { action, makeAutoObservable, observable } from "mobx"
import { InteractionType, ChatbotStreamStartEvent,
	ChatbotStreamChunkEvent, ChatbotStreamCompleteEvent} from "@bluedotrobots/common-ts"

export interface ChatState {
	messages: ChatClassMessage[]
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
	public getMessages(challengeId: string): ChatClassMessage[] {
		return this.getChatState(challengeId).messages
	}

	// Add a user message
	public addUserMessage = action((challengeId: string, content: string): void => {
		const chatState = this.getChatState(challengeId)

		const message: ChatClassMessage = {
			id: `user-${Date.now()}`,
			role: "user",
			content,
			timestamp: new Date()
		}

		chatState.messages.push(message)
	})

	// Start streaming for a challenge
	public startStreaming = action((startEvent: ChatbotStreamStartEvent): void => {
		const chatState = this.getChatState(startEvent.challengeId)

		// Create streaming message placeholder
		const streamingMessage: ChatClassMessage = {
			id: `streaming-${Date.now()}`,
			role: "assistant",
			content: "",
			timestamp: new Date(),
			isStreaming: true
		}

		chatState.messages.push(streamingMessage)
		chatState.isStreaming = true
		chatState.currentStreamingMessageId = streamingMessage.id
		chatState.currentInteractionType = startEvent.interactionType
	})

	// Add chunk to streaming message
	public addStreamingChunk = action((chunkEvent: ChatbotStreamChunkEvent): void => {
		const chatState = this.getChatState(chunkEvent.challengeId)

		if (!chatState.isStreaming || !chatState.currentStreamingMessageId) {
			console.warn("Received chunk but not streaming for challenge:", chunkEvent.challengeId)
			return
		}

		const streamingMessage = chatState.messages.find(
			msg => msg.id === chatState.currentStreamingMessageId
		)

		if (streamingMessage) {
			streamingMessage.content += chunkEvent.content
		}
	})

	// Complete streaming
	public completeStreaming = action((completeEvent: ChatbotStreamCompleteEvent): void => {
		const chatState = this.getChatState(completeEvent.challengeId)

		if (!chatState.isStreaming || !chatState.currentStreamingMessageId) {
			return
		}

		const streamingMessage = chatState.messages.find(
			msg => msg.id === chatState.currentStreamingMessageId
		)

		if (streamingMessage) {
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

	// Check if currently streaming for a challenge
	public isStreaming(challengeId: string): boolean {
		return this.getChatState(challengeId).isStreaming
	}

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
