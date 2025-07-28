/* eslint-disable max-lines-per-function */
"use client"

import { action, makeAutoObservable, observable } from "mobx"
import {
	InteractionType,
	CqChatbotStreamStartEvent,
	CqChatbotStreamChunkEvent,
	CqChatbotStreamCompleteEvent,
	BinaryEvaluationResult,
	CqChallengeData,
	CareerId,
	BlocklyJson
} from "@bluedotrobots/common-ts"
import normalizeSandboxJson from "../utils/sandbox/normalize-sandbox-json"
import retrieveCareerQuestChallengeData from "../utils/career-quest/retrieve-career-quest-challenge-data"
import { CAREER_DEFINITIONS } from "../utils/career-quest/career-quest-data"

// Chat and streaming state interfaces
interface ChatData {
	messages: CareerQuestChatMessage[]
	isWaitingForResponse: boolean
	hasRetrievedMessages: boolean
	isRetrievingMessages: boolean
}

interface StreamingState {
	isStreaming: boolean
	currentStreamingMessageId: string | null
	currentStreamId: string | null
	currentInteractionType: InteractionType | null
}

interface CareerChatData extends ChatData, StreamingState {}

interface ChallengeInstance extends ChatData, StreamingState {
	challengeData: CqChallengeData
	isCompleted: boolean
	updatedBlocklyJson?: BlocklyJson
}

interface CareerProgress {
	completedChallengeIds: Set<string>
}

interface CareerInstance {
	careerDefinition: CareerQuestData
	// Dynamic data
	careerChat: CareerChatData
	challenges: Map<string, ChallengeInstance>
	progress: CareerProgress
}

class CareerQuestClass {
	// Main data structure: careerId -> CareerInstance
	public careers = observable.map<string, CareerInstance>()

	constructor() {
		makeAutoObservable(this)

		this.initializeAllCareers(CAREER_DEFINITIONS)
	}

	// ========================================
	// CAREER INITIALIZATION
	// ========================================

	private initializeAllCareers = action((careerDefinitions: Record<string, CareerQuestData>): void => {
		Object.values(careerDefinitions).forEach(careerDefinition => {
			this.initializeCareer(careerDefinition)
		})
	})

	private initializeCareer = action((careerDefinition: CareerQuestData): void => {
		if (this.careers.has(careerDefinition.careerId)) return

		// Extract challenge IDs from career definition
		const challengeSections = careerDefinition.sections.filter(
			(section): section is ChallengeSection => section.type === "challenge"
		)

		// Initialize challenge data
		const challenges = new Map<string, ChallengeInstance>()
		challengeSections.forEach(section => {
			challenges.set(section.challengeData.challengeId, {
				// Static challenge data
				challengeData: section.challengeData,  // ADD THIS

				// Chat data
				messages: [],
				isWaitingForResponse: false,
				hasRetrievedMessages: false,
				isRetrievingMessages: false,

				// Streaming state
				isStreaming: false,
				currentStreamingMessageId: null,
				currentStreamId: null,
				currentInteractionType: null,

				// Completion
				isCompleted: false
			})
		})

		// Initialize career instance
		const careerInstance: CareerInstance = {
			careerDefinition,
			careerChat: {
				// Chat data
				messages: [],
				isWaitingForResponse: false,
				hasRetrievedMessages: false,
				isRetrievingMessages: false,

				// Streaming state
				isStreaming: false,
				currentStreamingMessageId: null,
				currentStreamId: null,
				currentInteractionType: null
			},
			challenges,
			progress: {
				completedChallengeIds: new Set<string>()
			}
		}

		this.careers.set(careerDefinition.careerId, careerInstance)
	})

	// ========================================
	// HELPER METHODS
	// ========================================

	private getCareer(careerId: CareerId): CareerInstance | undefined {
		return this.careers.get(careerId)
	}

	private getChallenge(cqInformation: CareerIdChallengeId): ChallengeInstance | undefined {
		const career = this.getCareer(cqInformation.careerId)
		return career?.challenges.get(cqInformation.challengeId)
	}

	// ========================================
	// MESSAGE MANAGEMENT
	// ========================================

	// Challenge messages
	public getChallengeMessages(cqInformation: CareerIdChallengeId): CareerQuestChatMessage[] {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.messages || []
	}

	public addChallengeUserMessage = action((cqInformation: CareerIdChallengeId, content: string): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return

		// Hide hint button from all messages when a new message is added
		this.hideChallengeHintButtons(cqInformation)

		challenge.isWaitingForResponse = true

		const message: CareerQuestChatMessage = {
			id: `user-${Date.now()}`,
			role: "user",
			content,
			timestamp: new Date()
		}

		challenge.messages.push(message)
	})

	public addChallengeHintRequestMessage = action((cqInformation: CareerIdChallengeId): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return

		this.hideChallengeHintButtons(cqInformation)
		challenge.isWaitingForResponse = true

		const message: CareerQuestChatMessage = {
			id: `hint-request-${Date.now()}`,
			role: "user",
			content: "?",
			timestamp: new Date(),
			isHintRequest: true
		}

		challenge.messages.push(message)
	})

	public addChallengeCheckCodeRequestMessage = action((cqInformation: CareerIdChallengeId): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return

		this.hideChallengeHintButtons(cqInformation)
		challenge.isWaitingForResponse = true

		const message: CareerQuestChatMessage = {
			id: `check-code-request-${Date.now()}`,
			role: "user",
			content: "?",
			timestamp: new Date(),
			isCheckCodeRequest: true
		}

		challenge.messages.push(message)
	})

	public addChallengeEvaluationResultMessage = action((
		cqInformation: CareerIdChallengeId,
		evaluationResult: BinaryEvaluationResult
	): void => {
		const challenge = this.getChallenge(cqInformation)
		const career = this.getCareer(cqInformation.careerId)
		if (!challenge || !career) return

		challenge.isWaitingForResponse = false

		const message: CareerQuestChatMessage = {
			id: `evaluation-result-${Date.now()}`,
			role: "assistant",
			content: evaluationResult.feedback,
			timestamp: new Date(),
			evaluationResult,
			shouldShowHintButton: !evaluationResult.isCorrect
		}

		challenge.messages.push(message)

		// Mark challenge as completed if correct
		if (evaluationResult.isCorrect) {
			challenge.isCompleted = true
			career.progress.completedChallengeIds.add(cqInformation.challengeId)
		}
	})

	public hideChallengeHintButtons = action((cqInformation: CareerIdChallengeId): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return

		challenge.messages.forEach(message => {
			if (message.shouldShowHintButton) {
				message.shouldShowHintButton = false
			}
		})
	})

	public clearChallengeMessages = action((cqInformation: CareerIdChallengeId): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.messages = []
	})

	// ========================================
	// STREAMING MANAGEMENT
	// ========================================

	public startChallengeStreaming = action((startEvent: CqChatbotStreamStartEvent): void => {
		// Note: You'll need to pass careerId in the event or determine it from challengeId
		const challenge = this.getChallenge({ ...startEvent })
		if (!challenge) return

		challenge.isWaitingForResponse = false

		const streamingMessage: CareerQuestChatMessage = {
			id: `streaming-${Date.now()}`,
			role: "assistant",
			content: "",
			timestamp: new Date(),
			isStreaming: true,
			isHintResponse: startEvent.interactionType === "hint"
		}

		challenge.messages.push(streamingMessage)
		challenge.isStreaming = true
		challenge.currentStreamingMessageId = streamingMessage.id
		challenge.currentInteractionType = startEvent.interactionType
	})

	public addChallengeStreamingChunk = action((chunkEvent: CqChatbotStreamChunkEvent): void => {
		const challenge = this.getChallenge({ ...chunkEvent })
		if (!challenge) return

		if (!challenge.isStreaming || !challenge.currentStreamingMessageId) {
			console.warn("Received chunk but not streaming for challenge:", chunkEvent.challengeId)
			return
		}

		const streamingMessage = challenge.messages.find(
			msg => msg.id === challenge.currentStreamingMessageId
		)

		if (streamingMessage) {
			streamingMessage.content += chunkEvent.content
		}
	})

	public completeChallengeStreaming = action((completeEvent: CqChatbotStreamCompleteEvent): void => {
		const challenge = this.getChallenge({ ...completeEvent })
		if (!challenge) return

		if (!challenge.isStreaming || !challenge.currentStreamingMessageId) {
			return
		}

		const streamingMessage = challenge.messages.find(
			msg => msg.id === challenge.currentStreamingMessageId
		)

		if (streamingMessage) {
			streamingMessage.isStreaming = false
		}

		// Reset streaming state
		challenge.isStreaming = false
		challenge.currentStreamingMessageId = null
		challenge.currentInteractionType = null
		challenge.currentStreamId = null
	})

	public resetChallengeStreamingState = action((cqInformation: CareerIdChallengeId): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return

		challenge.isStreaming = false
		challenge.currentStreamingMessageId = null
		challenge.currentInteractionType = null
		challenge.currentStreamId = null
	})

	// Stream ID management
	public setChallengeStreamId = action((cqInformation: CareerIdChallengeId, streamId: string | null): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.currentStreamId = streamId
	})

	public getChallengeStreamId(cqInformation: CareerIdChallengeId): string | null {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.currentStreamId || null
	}

	// ========================================
	// STATE GETTERS
	// ========================================

	public isChallengeStreaming(cqChallengeData: CqChallengeData): boolean {
		const challenge = this.getChallenge({ ...cqChallengeData })
		return challenge?.isStreaming || false
	}

	public isChallengeWaitingForResponse(cqChallengeData: CqChallengeData): boolean {
		const challenge = this.getChallenge({ ...cqChallengeData })
		return challenge?.isWaitingForResponse || false
	}

	public isChallengeCompleted(cqChallengeData: CqChallengeData): boolean {
		const challenge = this.getChallenge({ ...cqChallengeData })
		return challenge?.isCompleted || false
	}

	// ========================================
	// DATA MANAGEMENT
	// ========================================

	// Update setChallengeRetrievedData to include sandboxJson:
	public setChallengeRetrievedData = action((
		cqInformation: CareerIdChallengeId,
		messages: CareerQuestChatMessage[],
		sandboxJson: BlocklyJson | null,  // ADD THIS
		isCompleted: boolean
	): void => {
		const challenge = this.getChallenge(cqInformation)
		const career = this.getCareer(cqInformation.careerId)
		if (!challenge || !career) return

		challenge.messages = messages
		challenge.hasRetrievedMessages = true
		challenge.isRetrievingMessages = false
		challenge.isCompleted = isCompleted

		// Update blockly JSON if provided
		if (sandboxJson) {
			challenge.updatedBlocklyJson = normalizeSandboxJson(sandboxJson)
		}

		if (isCompleted) {
			career.progress.completedChallengeIds.add(cqInformation.challengeId)
		}
	})

	public setIsRetrievingChallengeMessages = action((
		cqInformation: CareerIdChallengeId,
		isRetrieving: boolean
	): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.isRetrievingMessages = isRetrieving
	})

	public hasRetrievedChallengeMessages(cqInformation: CareerIdChallengeId): boolean {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.hasRetrievedMessages || false
	}

	public isRetrievingChallengeMessages(cqInformation: CareerIdChallengeId): boolean {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.isRetrievingMessages || false
	}
	// ========================================
	// CAREER-LEVEL CHAT MANAGEMENT
	// ========================================

	public getCareerMessages(careerId: CareerId): CareerQuestChatMessage[] {
		const career = this.getCareer(careerId)
		return career?.careerChat.messages || []
	}

	public addCareerUserMessage = action((careerId: CareerId, content: string): void => {
		const career = this.getCareer(careerId)
		if (!career) return

		career.careerChat.isWaitingForResponse = true

		const message: CareerQuestChatMessage = {
			id: `career-user-${Date.now()}`,
			role: "user",
			content,
			timestamp: new Date()
		}

		career.careerChat.messages.push(message)
	})

	public startCareerStreaming = action((careerId: CareerId, interactionType: InteractionType): void => {
		const career = this.getCareer(careerId)
		if (!career) return

		career.careerChat.isWaitingForResponse = false

		const streamingMessage: CareerQuestChatMessage = {
			id: `career-streaming-${Date.now()}`,
			role: "assistant",
			content: "",
			timestamp: new Date(),
			isStreaming: true
		}

		career.careerChat.messages.push(streamingMessage)
		career.careerChat.isStreaming = true
		career.careerChat.currentStreamingMessageId = streamingMessage.id
		career.careerChat.currentInteractionType = interactionType
	})

	public addCareerStreamingChunk = action((careerId: CareerId, content: string): void => {
		const career = this.getCareer(careerId)
		if (!career) return

		if (!career.careerChat.isStreaming || !career.careerChat.currentStreamingMessageId) {
			console.warn("Received chunk but not streaming for career:", careerId)
			return
		}

		const streamingMessage = career.careerChat.messages.find(
			msg => msg.id === career.careerChat.currentStreamingMessageId
		)

		if (streamingMessage) {
			streamingMessage.content += content
		}
	})

	public completeCareerStreaming = action((careerId: CareerId): void => {
		const career = this.getCareer(careerId)
		if (!career) return

		if (!career.careerChat.isStreaming || !career.careerChat.currentStreamingMessageId) {
			return
		}

		const streamingMessage = career.careerChat.messages.find(
			msg => msg.id === career.careerChat.currentStreamingMessageId
		)

		if (streamingMessage) {
			streamingMessage.isStreaming = false
		}

		// Reset streaming state
		career.careerChat.isStreaming = false
		career.careerChat.currentStreamingMessageId = null
		career.careerChat.currentInteractionType = null
		career.careerChat.currentStreamId = null
	})

	public isCareerStreaming(careerId: CareerId): boolean {
		const career = this.getCareer(careerId)
		return career?.careerChat.isStreaming || false
	}

	public isCareerWaitingForResponse(careerId: CareerId): boolean {
		const career = this.getCareer(careerId)
		return career?.careerChat.isWaitingForResponse || false
	}

	public setCareerStreamId = action((careerId: CareerId, streamId: string | null): void => {
		const career = this.getCareer(careerId)
		if (!career) return
		career.careerChat.currentStreamId = streamId
	})

	public getCareerStreamId(careerId: CareerId): string | null {
		const career = this.getCareer(careerId)
		return career?.careerChat.currentStreamId || null
	}

	public getChallengeData(cqInformation: CareerIdChallengeId): CqChallengeData | undefined {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.challengeData
	}

	// Blockly JSON management
	public getUpdatedBlocklyJson(cqInformation: CareerIdChallengeId): BlocklyJson | null {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.updatedBlocklyJson || challenge?.challengeData.initialBlocklyJson || null
	}

	public updateBlocklyJson = action((cqInformation: CareerIdChallengeId, newBlocklyJson: BlocklyJson): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.updatedBlocklyJson = newBlocklyJson
	})

	public getVisibleSections(careerId: CareerId): string[] {
		const career = this.getCareer(careerId)
		if (!career) return []

		const visibleSectionIds: string[] = []
		const sections = career.careerDefinition.sections

		// Track if we've encountered an incomplete challenge (blocking further progress)
		let hasBlockingChallenge = false

		for (const section of sections) {
			// If we've already hit a blocking challenge, stop adding sections
			if (hasBlockingChallenge) {
				break
			}

			if (section.type === "text") {
				// Text sections are always visible if we haven't hit a blocking challenge
				visibleSectionIds.push(section.id)
			} else {
				// Always show the challenge section itself (so user can see it and potentially complete it)
				visibleSectionIds.push(section.id)

				// Check if this challenge is completed
				const isCompleted = this.isChallengeCompleted(section.challengeData)

				// If this challenge is not completed, it becomes the blocking challenge
				if (!isCompleted) {
					hasBlockingChallenge = true
				}
			}
		}

		return visibleSectionIds
	}

	// Enhanced progress methods for header
	public getCompletedChallengesForProgress(careerId: CareerId): number {
		const career = this.getCareer(careerId)
		if (!career) return 0

		return career.progress.completedChallengeIds.size
	}

	public getTotalChallengesForProgress(careerId: CareerId): number {
		const career = this.getCareer(careerId)
		if (!career) return 0

		// Count only challenge sections
		return career.careerDefinition.sections.filter(section => section.type === "challenge").length
	}

	public retrieveAllChallengeDataForCareer = action(async (careerId: CareerId): Promise<void> => {
		const career = this.getCareer(careerId)
		if (!career) return

		// Get all challenge sections from this career
		const challengeSections = career.careerDefinition.sections.filter(
			(section): section is ChallengeSection => section.type === "challenge"
		)

		// Retrieve data for all challenges in parallel
		const retrievalPromises = challengeSections.map(section =>
			retrieveCareerQuestChallengeData(section.challengeData)
		)

		try {
			await Promise.all(retrievalPromises)
		} catch (error) {
			console.error("Failed to retrieve challenge data for career:", careerId, error)
		}
	})

	public logout(): void {
		this.careers.clear()
	}
}

const careerQuestClass = new CareerQuestClass()
export default careerQuestClass
