"use client"

import isUndefined from "lodash-es/isUndefined"
import { action, makeAutoObservable, observable } from "mobx"
import {
	InteractionType,
	CqChatbotStreamStartEvent,
	CqChatbotStreamChunkEvent,
	CqChatbotStreamCompleteEvent,
	BlocklyJson,
	ChallengeData,
	BinaryEvaluationResult
} from "@bluedotrobots/common-ts"
import normalizeSandboxJson from "../utils/sandbox/normalize-sandbox-json"
import { CareerSection, ChallengeSection } from "../utils/career-quest/career-quest-data"

interface ExtendedChallengeData extends ChallengeData {
	messages: CareerQuestChatMessage[]
	isStreaming: boolean
	isWaitingForResponse: boolean
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
	public careerData = observable.map<string, {
		completedSectionIds: Set<string>
		unlockedSectionIds: Set<string>
	}>()
	private challengeToCareerMap = new Map<string, { careerId: string, sectionId: string }>()

	public registerChallengeSection = action((challengeId: string, careerId: string, sectionId: string): void => {
		this.challengeToCareerMap.set(challengeId, { careerId, sectionId })
	})

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
			isWaitingForResponse: false,
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
	public getMessages(challengeId: string): CareerQuestChatMessage[] {
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
		messages: CareerQuestChatMessage[],
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

		// Hide hint button from all messages when a new message is added
		this.hideHintButtonForAllMessages(challengeId)

		// Set waiting for response when sending user message
		challengeData.isWaitingForResponse = true

		const message: CareerQuestChatMessage = {
			id: `user-${Date.now()}`,
			role: "user",
			content,
			timestamp: new Date()
		}

		challengeData.messages.push(message)
	})

	public addHintRequestMessage = action((challengeId: string): void => {
		const challengeData = this.getChallengeData(challengeId)
		if (isUndefined(challengeData)) return

		// Hide hint button from all messages when a new message is added
		this.hideHintButtonForAllMessages(challengeId)

		// Set waiting for response when requesting hint
		challengeData.isWaitingForResponse = true

		const message: CareerQuestChatMessage = {
			id: `hint-request-${Date.now()}`,
			role: "user",
			content: "?",
			timestamp: new Date(),
			isHintRequest: true
		}

		challengeData.messages.push(message)
	})

	public addCheckCodeRequestMessage = action((challengeId: string): void => {
		const challengeData = this.getChallengeData(challengeId)
		if (isUndefined(challengeData)) return

		// Hide hint button from all messages when a new message is added
		this.hideHintButtonForAllMessages(challengeId)

		// Set waiting for response when checking code
		challengeData.isWaitingForResponse = true

		const message: CareerQuestChatMessage = {
			id: `check-code-request-${Date.now()}`,
			role: "user",
			content: "?",
			timestamp: new Date(),
			isCheckCodeRequest: true
		}

		challengeData.messages.push(message)
	})

	public addEvaluationResultMessage = action((challengeId: string, evaluationResult: BinaryEvaluationResult): void => {
		const challengeData = this.getChallengeData(challengeId)
		if (isUndefined(challengeData)) return

		// Set waiting for response to false when receiving evaluation result
		challengeData.isWaitingForResponse = false

		const message: CareerQuestChatMessage = {
			id: `evaluation-result-${Date.now()}`,
			role: "assistant",
			content: evaluationResult.feedback,
			timestamp: new Date(),
			evaluationResult,
			shouldShowHintButton: !evaluationResult.isCorrect // Show hint button for incorrect results
		}

		challengeData.messages.push(message)

		// If challenge is completed correctly, mark section as complete
		if (evaluationResult.isCorrect) {
			const careerSection = this.challengeToCareerMap.get(challengeId)
			if (careerSection) {
				this.markSectionComplete(careerSection.careerId, careerSection.sectionId)
			}
		}
	})

	// Hide hint button from all messages in a challenge
	public hideHintButtonForAllMessages = action((challengeId: string): void => {
		const challengeData = this.getChallengeData(challengeId)
		if (isUndefined(challengeData)) return

		challengeData.messages.forEach(message => {
			if (message.shouldShowHintButton) {
				message.shouldShowHintButton = false
			}
		})
	})

	// Start streaming for a challenge
	public startStreaming = action((startEvent: CqChatbotStreamStartEvent): void => {
		const challengeData = this.getChallengeData(startEvent.challengeId)
		if (isUndefined(challengeData)) return

		// Set waiting for response to false when streaming starts
		challengeData.isWaitingForResponse = false

		// Create streaming message placeholder
		const streamingMessage: CareerQuestChatMessage = {
			id: `streaming-${Date.now()}`,
			role: "assistant",
			content: "",
			timestamp: new Date(),
			isStreaming: true,
			isHintResponse: startEvent.interactionType === "hint"
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

	// Check if waiting for response for a challenge
	public isWaitingForResponse(challengeId: string): boolean {
		const challengeData = this.getChallengeData(challengeId)
		return challengeData?.isWaitingForResponse || false
	}

	// Set waiting for response state
	public setWaitingForResponse = action((challengeId: string, isWaiting: boolean): void => {
		const challengeData = this.getChallengeData(challengeId)
		if (isUndefined(challengeData)) return
		challengeData.isWaitingForResponse = isWaiting
	})

	// Stream ID management methods
	public setCurrentStreamId = action((challengeId: string, streamId: string | null): void => {
		this.currentStreamIds.set(challengeId, streamId)
	})

	public getCurrentStreamId(challengeId: string): string | null {
		return this.currentStreamIds.get(challengeId) || null
	}

	// Initialize career data
	public initializeCareer = action((careerId: string): void => {
		if (this.careerData.has(careerId)) return

		this.careerData.set(careerId, {
			completedSectionIds: new Set<string>(),
			unlockedSectionIds: new Set<string>() // Will be populated based on completed challenges
		})
	})

	// Check if a section is unlocked (can be viewed)
	public isSectionUnlocked(careerId: string, sectionId: string, careerSections: CareerSection[]): boolean {
		const careerInfo = this.careerData.get(careerId)
		if (!careerInfo) return false

		// Find the section index
		const sectionIndex = careerSections.findIndex(section => section.id === sectionId)
		if (sectionIndex === -1) return false

		// First section is always unlocked
		if (sectionIndex === 0) return true

		// Check all previous sections for any incomplete challenges
		for (let i = 0; i < sectionIndex; i++) {
			const section = careerSections[i]
			if (section.type === "challenge") {
				const isCompleted = this.isChallengeCompleted(section.challengeData.id)
				if (!isCompleted) {
					return false // Previous challenge not completed, section is locked
				}
			}
		}

		return true
	}

	// Check if a challenge is completed (has a correct evaluation result)
	public isChallengeCompleted(challengeId: string): boolean {
		const challengeData = this.getChallengeData(challengeId)
		if (!challengeData) return false

		// Check if there's a correct evaluation result in the messages
		return challengeData.messages.some(message =>
			message.evaluationResult?.isCorrect === true
		)
	}

	// Mark a section as completed
	public markSectionComplete = action((careerId: string, sectionId: string): void => {
		const careerInfo = this.careerData.get(careerId)
		if (!careerInfo) return

		careerInfo.completedSectionIds.add(sectionId)
	})

	// Get completed sections count for a career
	public getCompletedSectionsCount(careerSections: CareerSection[]): number {
		// Count completed challenges (since they gate progression)
		const challengeSections = careerSections.filter((section): section is ChallengeSection =>
			section.type === "challenge"
		)
		return challengeSections.filter(section =>
			this.isChallengeCompleted(section.challengeData.id)
		).length
	}

	// Get total challenge count for a career
	public getTotalChallengesCount(careerSections: CareerSection[]): number {
		return careerSections.filter((section): section is ChallengeSection =>
			section.type === "challenge"
		).length
	}

	public logout(): void {
		this.careerQuestChallengeData.clear()
		this.currentStreamIds.clear()
		this.careerData.clear()
		this.challengeToCareerMap.clear()
	}
}

const careerQuestClass = new CareerQuestClass()

export default careerQuestClass
