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
	hasRetrievedData: boolean
	isRetrievingData: boolean
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
	// ADD THIS:
	initialPosition: {
		mainSlideIndex: number
		textChildIndex: number
	}
	hasRetrievedAllChallenges: boolean
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
				hasRetrievedData: false,
				isRetrievingData: false,

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
			initialPosition: {
				mainSlideIndex: 0,
				textChildIndex: 0
			},
			hasRetrievedAllChallenges: false
		}

		this.careers.set(careerDefinition.careerUUID, careerInstance)
	})

	public hasRetrievedAllChallengesForCareer(careerUUID: CareerUUID): boolean {
		const career = this.getCareer(careerUUID)
		if (!career) return false

		const challengeSections = this.getAllChallengeSections(career.careerDefinition.sections)
		return challengeSections.every(section => {
			const challengeInfo = { careerUUID, challengeUUID: section.challengeData.challengeUUID }
			return this.hasRetrievedChallengeData(challengeInfo)
		})
	}

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
			// ADD THIS:
			this.updateCachedInitialPosition(cqInformation.careerUUID)
		}
	})

	public hideChallengeHintButtons = action((cqInformation: CareerUUIDChallengeUUID): void => {
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
		challenge.hasRetrievedData = true
		challenge.isRetrievingData = false
		challenge.isCompleted = isCompleted

		// Update blockly JSON if provided
		if (sandboxJson) {
			challenge.updatedBlocklyJson = normalizeSandboxJson(sandboxJson)
		}

		if (isCompleted) {
			career.progress.completedChallengeIds.add(cqInformation.challengeUUID)
		}

		// UPDATE THIS: Only update position after all challenges are retrieved
		const allRetrieved = this.hasRetrievedAllChallengesForCareer(cqInformation.careerUUID)
		if (allRetrieved && !career.hasRetrievedAllChallenges) {
			career.hasRetrievedAllChallenges = true
			this.updateCachedInitialPosition(cqInformation.careerUUID)
		}
	})

	public setIsRetrievingChallengeData = action((
		cqInformation: CareerUUIDChallengeUUID,
		isRetrieving: boolean
	): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.isRetrievingData = isRetrieving
	})

	public hasRetrievedChallengeData(cqInformation: CareerUUIDChallengeUUID): boolean {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.hasRetrievedData || false
	}

	public isRetrievingChallengeData(cqInformation: CareerUUIDChallengeUUID): boolean {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.isRetrievingData || false
	}

	public getChallengeData(cqInformation: CareerUUIDChallengeUUID): CqChallengeData | undefined {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.challengeData
	}

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

	public getVisibleSections(careerUUID: CareerUUID): string[] {
		const career = this.getCareer(careerUUID)
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

			if (section.type === "textParent") {
				// Add all children text section IDs (individual text sections)
				section.children.forEach(child => {
					visibleSectionIds.push(child.id)
				})
			} else {
				// Challenge section
				// Always show the challenge section itself (so user can see it and potentially complete it)
				visibleSectionIds.push(section.challengeData.challengeUUID)

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

	// ADD: Compute initial position based on completion status
	private computeInitialPosition = action((careerUUID: CareerUUID): { mainSlideIndex: number, textChildIndex: number } => {
		const career = this.getCareer(careerUUID)
		if (!career) return { mainSlideIndex: 0, textChildIndex: 0 }

		const sections = career.careerDefinition.sections

		// Find the index of the furthest completed challenge
		let furthestCompletedIndex = -1
		for (let i = sections.length - 1; i >= 0; i--) {
			if (sections[i].type === "challenge" && this.isChallengeCompleted((sections[i] as ChallengeSection).challengeData)) {
				furthestCompletedIndex = i
				break
			}
		}

		// If none completed, start at beginning
		if (furthestCompletedIndex === -1) {
			return { mainSlideIndex: 0, textChildIndex: 0 }
		}

		// If all challenges completed, start at beginning
		const challengeCount = sections.filter(s => s.type === "challenge").length
		const completedChallengeCount = sections
			.filter(s => s.type === "challenge")
			.filter(s => this.isChallengeCompleted((s as ChallengeSection).challengeData))
			.length

		if (completedChallengeCount === challengeCount) {
			return { mainSlideIndex: 0, textChildIndex: 0 }
		}

		// Look for text parent after furthest completed challenge
		for (let i = furthestCompletedIndex + 1; i < sections.length; i++) {
			if (sections[i].type === "textParent") {
				return { mainSlideIndex: i, textChildIndex: 0 }
			}
		}

		// No text parent found after furthest completed, start at beginning
		return { mainSlideIndex: 0, textChildIndex: 0 }
	})

	// ADD: Update cached initial position
	private updateCachedInitialPosition = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return

		career.initialPosition = this.computeInitialPosition(careerUUID)
	})

	// ADD: Public getter for initial position
	public getInitialPosition(careerUUID: CareerUUID): { mainSlideIndex: number, textChildIndex: number } {
		const career = this.getCareer(careerUUID)
		return career?.initialPosition || { mainSlideIndex: 0, textChildIndex: 0 }
	}

	public logout(): void {
		this.careers.clear()
		this.isDoneInitializing = false
	}
}

const careerQuestClass = new CareerQuestClass()
export default careerQuestClass
