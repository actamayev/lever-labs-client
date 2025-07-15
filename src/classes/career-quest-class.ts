"use client"

import isUndefined from "lodash-es/isUndefined"
import { action, makeAutoObservable, observable } from "mobx"
import {
	InteractionType,
	CqChatbotStreamStartEvent,
	CqChatbotStreamChunkEvent,
	CqChatbotStreamCompleteEvent,
	ChatMessageRole,
	BlocklyJson,
	ChallengeData
} from "@bluedotrobots/common-ts"
import normalizeSandboxJson from "../utils/sandbox/normalize-sandbox-json"

interface ChatMessage {
	id: string
	role: ChatMessageRole
	content: string
	timestamp: Date
	isStreaming?: boolean
}

interface ExtendedChallengeData extends ChallengeData {
	messages: ChatMessage[]
	isStreaming: boolean
	currentStreamingMessageId: string | null
	currentInteractionType: InteractionType | null
	isRetrievingMessages: boolean
	hasRetrievedMessages: boolean
	updatedBlocklyJson?: BlocklyJson
}

class CareerQuestClass {
	// Map of challengeId -> ExtendedChallengeData
	public careerQuestChallengeData = observable.map<string, ExtendedChallengeData>()
	// Map of challengeId -> streamId for tracking concurrent streams
	public currentStreamIds: Map<string, string | null> = new Map()

	constructor() {
		makeAutoObservable(this)
	}

	// Initialize challenge with static data
	public initializeChallenge = action((staticChallengeData: ChallengeData): void => {
		if (this.careerQuestChallengeData.has(staticChallengeData.id)) return

		const extendedData: ExtendedChallengeData = {
			...staticChallengeData,
			messages: [],
			isStreaming: false,
			currentStreamingMessageId: null,
			currentInteractionType: null,
			isRetrievingMessages: false,
			hasRetrievedMessages: false,
			updatedBlocklyJson: staticChallengeData.initialBlocklyJson
		}

		this.careerQuestChallengeData.set(staticChallengeData.id, extendedData)
	})

	// Get challenge data for a challenge
	private getChallengeData(challengeId: string): ExtendedChallengeData | undefined {
		return this.careerQuestChallengeData.get(challengeId)
	}

	// Get messages for a challenge
	public getMessages(challengeId: string): ChatMessage[] {
		const challengeData = this.getChallengeData(challengeId)
		return challengeData?.messages || []
	}

	// Clear messages for a challenge
	public clearMessages = action((challengeId: string): void => {
		const challengeData = this.getChallengeData(challengeId)
		if (isUndefined(challengeData)) return
		challengeData.messages = []
	})

	// Get updated blockly JSON for a challenge
	public getUpdatedBlocklyJson(challengeId: string): BlocklyJson | null {
		const challengeData = this.getChallengeData(challengeId)
		return challengeData?.updatedBlocklyJson || null
	}

	// Update blockly JSON for a challenge
	public updateBlocklyJson = action((challengeId: string, newBlocklyJson: BlocklyJson): void => {
		const challengeData = this.getChallengeData(challengeId)
		if (isUndefined(challengeData)) return
		challengeData.updatedBlocklyJson = newBlocklyJson
	})

	// Check if messages have been retrieved for a challenge
	public hasRetrievedMessages(challengeId: string): boolean {
		const challengeData = this.getChallengeData(challengeId)
		return challengeData?.hasRetrievedMessages || false
	}

	// Check if currently retrieving messages for a challenge
	public isRetrievingMessages(challengeId: string): boolean {
		const challengeData = this.getChallengeData(challengeId)
		return challengeData?.isRetrievingMessages || false
	}

	// Set retrieving messages state
	public setIsRetrievingMessages = action((challengeId: string, isRetrieving: boolean): void => {
		const challengeData = this.getChallengeData(challengeId)
		if (isUndefined(challengeData)) return
		challengeData.isRetrievingMessages = isRetrieving
	})

	// Set retrieved data from backend (both messages and sandbox JSON)
	public setRetrievedData = action((
		challengeId: string,
		messages: ChatMessage[],
		sandboxJson: BlocklyJson | null
	): void => {
		const challengeData = this.getChallengeData(challengeId)
		if (isUndefined(challengeData)) return
		challengeData.messages = messages
		challengeData.hasRetrievedMessages = true
		challengeData.isRetrievingMessages = false

		// Update blockly JSON if we got data from backend
		if (sandboxJson) {
			const normalizedSandboxJson = normalizeSandboxJson(sandboxJson)
			challengeData.updatedBlocklyJson = normalizedSandboxJson
		}
	})

	// Add a user message
	public addUserMessage = action((challengeId: string, content: string): void => {
		const challengeData = this.getChallengeData(challengeId)
		if (isUndefined(challengeData)) return

		const message: ChatMessage = {
			id: `user-${Date.now()}`,
			role: "user",
			content,
			timestamp: new Date()
		}

		challengeData.messages.push(message)
	})

	// Start streaming for a challenge
	public startStreaming = action((startEvent: CqChatbotStreamStartEvent): void => {
		const challengeData = this.getChallengeData(startEvent.challengeId)
		if (isUndefined(challengeData)) return

		// Create streaming message placeholder
		const streamingMessage: ChatMessage = {
			id: `streaming-${Date.now()}`,
			role: "assistant",
			content: "",
			timestamp: new Date(),
			isStreaming: true
		}

		challengeData.messages.push(streamingMessage)
		challengeData.isStreaming = true
		challengeData.currentStreamingMessageId = streamingMessage.id
		challengeData.currentInteractionType = startEvent.interactionType
	})

	// Add chunk to streaming message
	public addStreamingChunk = action((chunkEvent: CqChatbotStreamChunkEvent): void => {
		const challengeData = this.getChallengeData(chunkEvent.challengeId)
		if (isUndefined(challengeData)) return

		if (!challengeData.isStreaming || !challengeData.currentStreamingMessageId) {
			console.warn("Received chunk but not streaming for challenge:", chunkEvent.challengeId)
			return
		}

		const streamingMessage = challengeData.messages.find(
			msg => msg.id === challengeData.currentStreamingMessageId
		)

		if (streamingMessage) {
			streamingMessage.content += chunkEvent.content
		}
	})

	// Complete streaming
	public completeStreaming = action((completeEvent: CqChatbotStreamCompleteEvent): void => {
		const challengeData = this.getChallengeData(completeEvent.challengeId)
		if (isUndefined(challengeData)) return

		if (!challengeData.isStreaming || !challengeData.currentStreamingMessageId) {
			return
		}

		const streamingMessage = challengeData.messages.find(
			msg => msg.id === challengeData.currentStreamingMessageId
		)

		if (streamingMessage) {
			streamingMessage.isStreaming = false
		}

		// Reset streaming state
		challengeData.isStreaming = false
		challengeData.currentStreamingMessageId = null
		challengeData.currentInteractionType = null
		this.setCurrentStreamId(completeEvent.challengeId, null)
	})

	// Reset chat state for a challenge
	public resetChatStreamingState = action((challengeId: string): void => {
		const challengeData = this.getChallengeData(challengeId)
		if (isUndefined(challengeData)) return

		challengeData.isStreaming = false
		challengeData.currentStreamingMessageId = null
		challengeData.currentInteractionType = null
		this.setCurrentStreamId(challengeId, null)
	})

	// Check if currently streaming for a challenge
	public isStreaming(challengeId: string): boolean {
		const challengeData = this.getChallengeData(challengeId)
		return challengeData?.isStreaming || false
	}

	// Stream ID management methods
	public setCurrentStreamId = action((challengeId: string, streamId: string | null): void => {
		this.currentStreamIds.set(challengeId, streamId)
	})

	public getCurrentStreamId(challengeId: string): string | null {
		return this.currentStreamIds.get(challengeId) || null
	}

	public logout(): void {
		this.careerQuestChallengeData.clear()
		this.currentStreamIds.clear()
	}
}

const careerQuestClass = new CareerQuestClass()

export default careerQuestClass
