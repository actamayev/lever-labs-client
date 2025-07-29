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
import retrieveCareerQuestChallengeData from "../utils/career-quest/retrieve-career-quest-challenge-data"
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
	isLoadingCareer: boolean
}

class CareerQuestClass {
	// Main data structure: careerUUID -> CareerInstance
	public careers = observable.map<CareerUUID, CareerInstance>()

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
		if (this.careers.has(careerDefinition.careerUUID)) return

		// Extract challenge IDs from career definition
		const challengeSections = careerDefinition.sections.filter(
			(section): section is ChallengeSection => section.type === "challenge"
		)

		// Initialize challenge data
		const challenges = new Map<string, ChallengeInstance>()
		challengeSections.forEach(section => {
			challenges.set(section.challengeData.challengeUUID, {
				// Static challenge data
				challengeData: section.challengeData,  // ADD THIS

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
			isLoadingCareer: false  // ADD THIS
		}

		this.careers.set(careerDefinition.careerUUID, careerInstance)
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

	// Update setChallengeRetrievedData to include sandboxJson:
	public setChallengeRetrievedData = action((
		cqInformation: CareerUUIDChallengeUUID,
		messages: CareerQuestChatMessage[],
		sandboxJson: BlocklyJson | null,  // ADD THIS
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

			if (section.type === "text") {
				// Text sections are always visible if we haven't hit a blocking challenge
				visibleSectionIds.push(section.id)
			} else {
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

		// Count only challenge sections
		return career.careerDefinition.sections.filter(section => section.type === "challenge").length
	}
	// Add this method
	public isCareerLoading(careerUUID: CareerUUID): boolean {
		const career = this.getCareer(careerUUID)
		return career?.isLoadingCareer || false
	}

	// Add this method
	public setCareerLoadingState = action((careerUUID: CareerUUID, isLoading: boolean): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.isLoadingCareer = isLoading
	})

	public retrieveAllChallengeDataForCareer = action(async (careerUUID: CareerUUID): Promise<void> => {
		const career = this.getCareer(careerUUID)
		if (!career) return

		// SET LOADING STATE AT START
		this.setCareerLoadingState(careerUUID, true)

		const challengeSections = career.careerDefinition.sections.filter(
			(section): section is ChallengeSection => section.type === "challenge"
		)

		const retrievalPromises = challengeSections.map(section =>
			retrieveCareerQuestChallengeData(section.challengeData)
		)

		try {
			await Promise.all(retrievalPromises)
			// CLEAR LOADING STATE WHEN DONE
			this.setCareerLoadingState(careerUUID, false)
		} catch (error) {
			console.error("Failed to retrieve challenge data for career:", careerUUID, error)
			// CLEAR LOADING STATE ON ERROR TOO
			this.setCareerLoadingState(careerUUID, false)
		}
	})

	// eslint-disable-next-line complexity
	public getInitialTargetSection(careerUUID: CareerUUID): {
	sectionId: string | null,
	shouldAutoScroll: boolean,
	rightContent: RightContent | null
	} {
		const career = this.getCareer(careerUUID)
		if (!career) {
			return { sectionId: null, shouldAutoScroll: false, rightContent: null }
		}

		const sections = career.careerDefinition.sections
		const challengeSections = sections.filter(s => s.type === "challenge") as ChallengeSection[]

		// Check if all challenges are complete
		const allChallengesComplete = challengeSections.every(section =>
			this.isChallengeCompleted(section.challengeData)
		)

		// If all complete, start at top with no auto-scroll
		if (allChallengesComplete) {
			return {
				sectionId: null,
				shouldAutoScroll: false,
				rightContent: { type: "image", icon: career.careerDefinition.initialImage }
			}
		}

		// Find the latest completed challenge
		let latestCompletedChallengeIndex = -1
		for (let i = challengeSections.length - 1; i >= 0; i--) {
			if (this.isChallengeCompleted(challengeSections[i].challengeData)) {
			// Find this challenge's index in the full sections array
				latestCompletedChallengeIndex = sections.findIndex(
					s => s.type === "challenge" && s.challengeData.challengeUUID === challengeSections[i].challengeData.challengeUUID
				)
				break
			}
		}

		// If no challenges are complete, start at the top
		if (latestCompletedChallengeIndex === -1) {
			return {
				sectionId: null,
				shouldAutoScroll: false,
				rightContent: { type: "image", icon: career.careerDefinition.initialImage }
			}
		}

		// Find the next text section after the latest completed challenge
		for (let i = latestCompletedChallengeIndex + 1; i < sections.length; i++) {
			if (sections[i].type === "text") {
				const textSection = sections[i] as TextSection
				return {
					sectionId: textSection.id,
					shouldAutoScroll: true,
					rightContent: { type: "image", icon: textSection.triggerImage }
				}
			}
		}

		// If no text section found after latest completed challenge,
		// find the next incomplete challenge
		for (let i = latestCompletedChallengeIndex + 1; i < sections.length; i++) {
			if (sections[i].type === "challenge") {
				const challengeSection = sections[i] as ChallengeSection
				if (!this.isChallengeCompleted(challengeSection.challengeData)) {
					return {
						sectionId: challengeSection.challengeData.challengeUUID,
						shouldAutoScroll: true,
						rightContent: { type: "challenge", challengeData: challengeSection.challengeData }
					}
				}
			}
		}

		// Fallback to top if nothing found
		return {
			sectionId: null,
			shouldAutoScroll: false,
			rightContent: { type: "image", icon: career.careerDefinition.initialImage }
		}
	}

	/**
 * Check if all challenge data has been retrieved for a career
 */
	public hasRetrievedAllChallengeData(careerUUID: CareerUUID): boolean {
		const career = this.getCareer(careerUUID)
		if (!career) return false

		const challengeSections = career.careerDefinition.sections.filter(
			s => s.type === "challenge"
		) as ChallengeSection[]

		return challengeSections.every(section =>
			this.hasRetrievedChallengeData(section.challengeData)
		)
	}

	public logout(): void {
		this.careers.clear()
	}
}

const careerQuestClass = new CareerQuestClass()
export default careerQuestClass
