/* eslint-disable max-lines-per-function */
"use client"

import type { Swiper as SwiperType } from "swiper"
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
import blueDotApiClient from "../classes/blue-dot-api-client-class"
import saveCareerProgress from "../utils/career-quest/save-career-progress"

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

interface CareerInstance {
	careerDefinition: CareerQuestData
	challenges: Map<string, ChallengeInstance>
	completedChallengeIds: Set<ChallengeUUID>
	currentChallengeUuidOrTextUuid: string
	hasRetrievedAllChallenges: boolean
	isRetrievingData: boolean
	savedCurrentPosition: string
	seenChallengeUUIDs: Set<ChallengeUUID>
	currentMainSlideIndex: number
	currentTextChildIndex: number
	mainSlides: MainSlide[]
	swiperInstance: SwiperType | null  // ADD THIS LINE
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

		// Create main slides from sections
		const mainSlides: MainSlide[] = careerDefinition.sections.map(section => {
			if (section.type === "textParent") {
				return {
					type: "textParent",
					id: section.id,
					data: section
				}
			} else {
				return {
					type: "challenge",
					id: section.challengeData.challengeUUID,
					data: section.challengeData
				}
			}
		})

		// Initialize career instance
		const careerInstance: CareerInstance = {
			careerDefinition,
			challenges,
			completedChallengeIds: new Set<ChallengeUUID>(),
			currentChallengeUuidOrTextUuid: "",
			hasRetrievedAllChallenges: false,
			isRetrievingData: false,
			savedCurrentPosition: "",
			seenChallengeUUIDs: new Set<ChallengeUUID>(),
			currentMainSlideIndex: 0,
			currentTextChildIndex: 0,
			mainSlides,
			swiperInstance: null
		}

		this.careers.set(careerDefinition.careerUUID, careerInstance)
	})

	public reinitialize = action((): void => {
		// Clear existing data
		this.careers.clear()
		this.isDoneInitializing = false

		// Re-initialize with fresh data
		this.initializeAllCareers(CAREER_DEFINITIONS)
	})

	// ADD THESE METHODS to CareerQuestClass:

	public setSwiperInstance = action((careerUUID: CareerUUID, swiperInstance: SwiperType): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.swiperInstance = swiperInstance

		// Update navigation immediately when swiper is set
		this.updateSwiperNavigation(careerUUID)
	})

	public removeSwiperInstance = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.swiperInstance = null
	})

	private updateSwiperNavigation = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career?.swiperInstance) return

		const canAdvance = this.canAdvanceToNextMain(careerUUID, career.currentMainSlideIndex)
		const canGoBack = career.currentMainSlideIndex > 0
		console.log("canAdvance", canAdvance)
		console.log("canGoBack", canGoBack)

		career.swiperInstance.allowSlideNext = canAdvance
		career.swiperInstance.allowSlidePrev = canGoBack
	})

	public getSwiperInstance(careerUUID: CareerUUID): SwiperType | null {
		const career = this.getCareer(careerUUID)
		return career?.swiperInstance || null
	}

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
	// NAVIGATION STATE MANAGEMENT
	// ========================================

	public getCurrentMainSlideIndex(careerUUID: CareerUUID): number {
		const career = this.getCareer(careerUUID)
		return career?.currentMainSlideIndex || 0
	}

	public getCurrentTextChildIndex(careerUUID: CareerUUID): number {
		const career = this.getCareer(careerUUID)
		return career?.currentTextChildIndex || 0
	}

	public setCurrentMainSlideIndex = action((careerUUID: CareerUUID, index: number): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.currentMainSlideIndex = index
	})

	public setCurrentTextChildIndex = action((careerUUID: CareerUUID, index: number): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.currentTextChildIndex = index
	})

	public getNavigationIndices(careerUUID: CareerUUID): { mainSlideIndex: number; textChildIndex: number } {
		const career = this.getCareer(careerUUID)
		return {
			mainSlideIndex: career?.currentMainSlideIndex || 0,
			textChildIndex: career?.currentTextChildIndex || 0
		}
	}

	public getMainSlides(careerUUID: CareerUUID): MainSlide[] {
		const career = this.getCareer(careerUUID)
		return career?.mainSlides || []
	}

	public restoreNavigationFromSavedPosition = action((careerUUID: CareerUUID): boolean => {
		const career = this.getCareer(careerUUID)
		if (!career) return false

		const savedData = this.getSavedPosition(careerUUID)
		if (!savedData.position) {
			// No saved position, start at beginning
			career.currentMainSlideIndex = 0
			career.currentTextChildIndex = 0
			return true
		}

		// Try to find the saved position
		const positionIndices = this.findPositionIndices(careerUUID, savedData.position)
		if (!positionIndices) {
			// Fallback to beginning if position not found
			career.currentMainSlideIndex = 0
			career.currentTextChildIndex = 0
			return true
		}

		// Set navigation indices from saved position
		career.currentMainSlideIndex = positionIndices.mainSlideIndex
		career.currentTextChildIndex = positionIndices.textChildIndex
		return true
	})

	// ========================================
	// NEW: SAVED POSITION MANAGEMENT
	// ========================================

	public setSavedPosition = action((careerUUID: CareerUUID, position: string): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.savedCurrentPosition = position
	})

	// REPLACE getSavedPosition method (remove isLocked from return):
	public getSavedPosition(careerUUID: CareerUUID): { position: string } {
		const career = this.getCareer(careerUUID)
		return {
			position: career?.savedCurrentPosition || ""
		}
	}

	// ADD new method to set seen challenges:
	public setSeenChallenges = action((careerUUID: CareerUUID, seenChallengeUUIDs: ChallengeUUID[]): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return

		career.seenChallengeUUIDs = new Set(seenChallengeUUIDs)
	})

	// ADD new method to mark challenge as seen:
	public markChallengeAsSeen = action(async (careerUUID: CareerUUID, challengeUUID: ChallengeUUID): Promise<void> => {
		const career = this.getCareer(careerUUID)
		if (!career) return

		// Only proceed if not already seen
		if (career.seenChallengeUUIDs.has(challengeUUID)) return

		// Optimistically update local state
		career.seenChallengeUUIDs.add(challengeUUID)

		// Call API (fire and forget - no error handling for now)
		try {
			await blueDotApiClient.careerQuestDataService.markChallengeAsSeen(challengeUUID)
		} catch (error) {
			console.error("Failed to mark challenge as seen:", error)
			// Could add retry logic here later
		}
	})

	public hasChallengeBeenSeen(careerUUID: CareerUUID, challengeUUID: ChallengeUUID): boolean {
		const career = this.getCareer(careerUUID)
		return career?.seenChallengeUUIDs.has(challengeUUID) || false
	}

	private findPositionIndices(careerUUID: CareerUUID, savedPosition: string): { mainSlideIndex: number; textChildIndex: number } | null {
		const career = this.getCareer(careerUUID)
		if (!career || !savedPosition) return null

		// Search through sections to find the position
		for (let mainIndex = 0; mainIndex < career.careerDefinition.sections.length; mainIndex++) {
			const section = career.careerDefinition.sections[mainIndex]

			if (section.type === "challenge") {
				// Check if this is a challenge UUID match
				if (section.challengeData.challengeUUID === savedPosition) {
					return { mainSlideIndex: mainIndex, textChildIndex: 0 }
				}
			} else {
				// Check if this is a text child ID match
				for (let childIndex = 0; childIndex < section.children.length; childIndex++) {
					// eslint-disable-next-line max-depth
					if (section.children[childIndex].id === savedPosition) {
						return { mainSlideIndex: mainIndex, textChildIndex: childIndex }
					}
				}
			}
		}

		return null // Position not found
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
	// UPDATE this existing method in career-quest-class.ts:
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
		if (!evaluationResult.isCorrect) return
		challenge.isCompleted = true
		career.completedChallengeIds.add(cqInformation.challengeUUID)

		// ADD THIS LINE - Update swiper navigation immediately
		this.updateSwiperNavigation(cqInformation.careerUUID)
	})

	public isCodeCorrect(cqInformation: CareerUUIDChallengeUUID): boolean {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return false
		return challenge.isCompleted
	}

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
		// Note: You'll need to pass careerUUID in the event or determine it from challengeUUID
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

	// ========================================
	// DATA MANAGEMENT
	// ========================================

	// UPDATE: Add position update when retrieved data indicates completion
	// UPDATE this existing method to trigger swiper updates:
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
			career.completedChallengeIds.add(cqInformation.challengeUUID)
			// ADD THIS LINE:
			this.updateSwiperNavigation(cqInformation.careerUUID)
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

		return career.completedChallengeIds.size
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
	private getAllChallengeSections(sections: CareerSection[]): ChallengeSection[] {
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

	public canAdvanceToNextMain = action((careerUUID: CareerUUID, slideIndex: number): boolean => {
		const career = this.getCareer(careerUUID)
		if (!career) return false

		const mainSlides = career.mainSlides

		if (slideIndex >= mainSlides.length - 1) return false

		const currentSlide = mainSlides[slideIndex]

		if (currentSlide.type === "textParent") {
			return true
		}
		// For challenge slides, must be completed
		return this.isCodeCorrect(currentSlide.data)
	})

	public handleMainSlideChange = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		const isDataReady = this.hasRetrievedAllChallengesForCareer(careerUUID)
		const swiper = this.getSwiperInstance(careerUUID)
		if (!career || !isDataReady || !swiper) return

		const newIndex = swiper.activeIndex
		const previousIndex = career.currentMainSlideIndex
		const isGoingBackward = newIndex < previousIndex

		// Update class state instead of component state
		careerQuestClass.setCurrentMainSlideIndex(careerUUID, newIndex)

		const currentSlide = this.getMainSlides(careerUUID)[newIndex]

		if (currentSlide.type === "challenge") {
			void careerQuestClass.markChallengeAsSeen(careerUUID, currentSlide.data.challengeUUID)
			void saveCareerProgress(careerUUID, currentSlide.data.challengeUUID)

			careerQuestClass.setCurrentTextChildIndex(careerUUID, 0)
			return
		}

		// For text sections, determine textChildIndex
		let textChildIndex: number
		if (isGoingBackward) {
			textChildIndex = currentSlide.data.children.length - 1
		} else {
			textChildIndex = 0
		}
		careerQuestClass.setCurrentTextChildIndex(careerUUID, textChildIndex)

		// Save progress when transitioning to text sections
		if (currentSlide.type === "textParent") {
			const textChild = currentSlide.data.children[textChildIndex]
			void saveCareerProgress(careerUUID, textChild.id)
		}
	})

	public handleTextChildIndexChange = action((careerUUID: CareerUUID, newIndex: number): void => {
		const career = this.getCareer(careerUUID)
		const swiper = this.getSwiperInstance(careerUUID)
		if (!career || !swiper) return

		careerQuestClass.setCurrentTextChildIndex(careerUUID, newIndex)

		// Save progress when text child changes
		const currentSlide = this.getMainSlides(careerUUID)[swiper.activeIndex]
		if (currentSlide.type !== "textParent") return

		const textChild = currentSlide.data.children[newIndex]
		void saveCareerProgress(careerUUID, textChild.id)
	})

	public logout(): void {
		this.careers.clear()
		this.isDoneInitializing = false
	}
}

const careerQuestClass = new CareerQuestClass()
export default careerQuestClass
