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
	CareerUUID,
	BlocklyJson,
	ChallengeUUID
} from "@bluedotrobots/common-ts"
import normalizeSandboxJson from "../utils/sandbox/normalize-sandbox-json"
import { CAREER_DEFINITIONS } from "../utils/career-quest/career-quest-data"

// Chat and streaming state interfaces
interface ChatData {
	messages: CareerQuestChatMessage[]
	isWaitingForResponse: boolean
}

interface StreamingState {
	isStreaming: boolean
	currentStreamingMessageId: string | null
	currentStreamId: string | null
	currentInteractionType: InteractionType | null
}

interface ChallengeInstance extends ChatData, StreamingState {
	challengeData: CqChallengeData
	isCompleted: boolean
	updatedBlocklyJson?: BlocklyJson
}

interface CareerProgress {
	completedChallengeIds: Set<ChallengeUUID>
}

interface CareerInstance {
	careerDefinition: CareerQuestData
	// Dynamic data
	challenges: Map<string, ChallengeInstance>
	progress: CareerProgress
	currentChallengeUuidOrTextUuid: string
	hasRetrievedAllChallenges: boolean
	isRetrievingData: boolean
}

class CareerQuestClass {
	// Main data structure: careerUUID -> CareerInstance
	public careers = observable.map<CareerUUID, CareerInstance>()
	public isDoneInitializing = false

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
		this.isDoneInitializing = true
	})

	private initializeCareer = action((careerDefinition: CareerQuestData): void => {
		if (this.careers.has(careerDefinition.careerUUID)) return

		// Extract challenge sections using helper
		const challengeSections = this.getAllChallengeSections(careerDefinition.sections)

		// Initialize challenge data
		const challenges = new Map<string, ChallengeInstance>()
		challengeSections.forEach(section => {
			challenges.set(section.challengeData.challengeUUID, {
				// Static challenge data
				challengeData: section.challengeData,

				// Chat data
				messages: [],
				isWaitingForResponse: false,

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
			challenges,
			progress: {
				completedChallengeIds: new Set<ChallengeUUID>()
			},
			currentChallengeUuidOrTextUuid: "",
			hasRetrievedAllChallenges: false,
			isRetrievingData: false
		}

		this.careers.set(careerDefinition.careerUUID, careerInstance)
	})

	public hasRetrievedAllChallengesForCareer(careerUUID: CareerUUID): boolean {
		const career = this.getCareer(careerUUID)
		return career?.hasRetrievedAllChallenges || false
	}

	public setHasRetrievedAllChallengesForCareer = action((careerUUID: CareerUUID, hasRetrievedAllChallenges: boolean): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.hasRetrievedAllChallenges = hasRetrievedAllChallenges
	})

	// ========================================
	// HELPER METHODS
	// ========================================

	private getCareer(careerUUID: CareerUUID): CareerInstance | undefined {
		return this.careers.get(careerUUID)
	}

	private getChallenge(cqInformation: CareerUUIDChallengeUUID): ChallengeInstance | undefined {
		const career = this.getCareer(cqInformation.careerUUID)
		return career?.challenges.get(cqInformation.challengeUUID)
	}

	// ========================================
	// MESSAGE MANAGEMENT
	// ========================================

	// Challenge messages
	public getChallengeMessages(cqInformation: CareerUUIDChallengeUUID): CareerQuestChatMessage[] {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.messages || []
	}

	public addChallengeUserMessage = action((cqInformation: CareerUUIDChallengeUUID, content: string): void => {
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

	public addChallengeHintRequestMessage = action((cqInformation: CareerUUIDChallengeUUID): void => {
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

	public addChallengeCheckCodeRequestMessage = action((cqInformation: CareerUUIDChallengeUUID): void => {
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

	// UPDATE: Add position update when evaluation result changes completion
	public addChallengeEvaluationResultMessage = action((
		cqInformation: CareerUUIDChallengeUUID,
		evaluationResult: BinaryEvaluationResult
	): void => {
		const challenge = this.getChallenge(cqInformation)
		const career = this.getCareer(cqInformation.careerUUID)
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
			career.progress.completedChallengeIds.add(cqInformation.challengeUUID)
		}
	})

	private hideChallengeHintButtons = action((cqInformation: CareerUUIDChallengeUUID): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return

		challenge.messages.forEach(message => {
			if (message.shouldShowHintButton) {
				message.shouldShowHintButton = false
			}
		})
	})

	public clearChallengeMessages = action((cqInformation: CareerUUIDChallengeUUID): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.messages = []
	})

	// ========================================
	// STREAMING MANAGEMENT
	// ========================================

	public startChallengeStreaming = action((startEvent: CqChatbotStreamStartEvent): void => {
		// Note: You'll need to pass careerUUUID in the event or determine it from challengeUUID
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
			console.warn("Received chunk but not streaming for challenge:", chunkEvent.challengeUUID)
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
		if (
			!challenge ||
			!challenge.isStreaming ||
			!challenge.currentStreamingMessageId
		) return

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

	public resetChallengeStreamingState = action((cqInformation: CareerUUIDChallengeUUID): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return

		challenge.isStreaming = false
		challenge.currentStreamingMessageId = null
		challenge.currentInteractionType = null
		challenge.currentStreamId = null
	})

	// Stream ID management
	public setChallengeStreamId = action((cqInformation: CareerUUIDChallengeUUID, streamId: string | null): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.currentStreamId = streamId
	})

	public getChallengeStreamId(cqInformation: CareerUUIDChallengeUUID): string | null {
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

	// UPDATE: Add position update when retrieved data indicates completion
	public setChallengeRetrievedData = action((
		cqInformation: CareerUUIDChallengeUUID,
		messages: CareerQuestChatMessage[],
		sandboxJson: BlocklyJson | null,
		isCompleted: boolean
	): void => {
		const challenge = this.getChallenge(cqInformation)
		const career = this.getCareer(cqInformation.careerUUID)
		if (!challenge || !career) return

		challenge.messages = messages
		challenge.isCompleted = isCompleted

		// Update blockly JSON if provided
		if (sandboxJson) {
			challenge.updatedBlocklyJson = normalizeSandboxJson(sandboxJson)
		}

		if (isCompleted) {
			career.progress.completedChallengeIds.add(cqInformation.challengeUUID)
		}
	})

	// Blockly JSON management
	public getUpdatedBlocklyJson(cqInformation: CareerUUIDChallengeUUID): BlocklyJson | null {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.updatedBlocklyJson || challenge?.challengeData.initialBlocklyJson || null
	}

	public updateBlocklyJson = action((cqInformation: CareerUUIDChallengeUUID, newBlocklyJson: BlocklyJson): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.updatedBlocklyJson = newBlocklyJson
	})

	public getCompletedChallengesForProgress(careerUUID: CareerUUID): number {
		const career = this.getCareer(careerUUID)
		if (!career) return 0

		return career.progress.completedChallengeIds.size
	}

	public getTotalChallengesForProgress(careerUUID: CareerUUID): number {
		const career = this.getCareer(careerUUID)
		if (!career) return 0

		// Use helper to count challenge sections
		return this.getAllChallengeSections(career.careerDefinition.sections).length
	}

	/**
	 * Get all challenge sections
	 */
	public getAllChallengeSections(sections: CareerSection[]): ChallengeSection[] {
		return sections.filter(section => section.type === "challenge") as ChallengeSection[]
	}

	public getChallengeSectionByChallengeUUID(careerUUID: CareerUUID): ChallengeSection[] {
		const career = this.getCareer(careerUUID)
		if (!career) return []

		return career.careerDefinition.sections.filter(section => section.type === "challenge") as ChallengeSection[]
	}

	public setIsRetrievingCareerData = action((careerUUID: CareerUUID, isRetrieving: boolean): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.isRetrievingData = isRetrieving
	})

	public isRetrievingCareerData(careerUUID: CareerUUID): boolean {
		const career = this.getCareer(careerUUID)
		return career?.isRetrievingData || false
	}

	public logout(): void {
		this.careers.clear()
		this.isDoneInitializing = false
	}
}

const careerQuestClass = new CareerQuestClass()
export default careerQuestClass
