"use client"

import * as Blockly from "blockly"
import { ReactNode } from "react"
import {
	InteractionType,
	ChallengeChatbotStreamStartEvent,
	ChallengeChatbotStreamChunkEvent,
	ChallengeChatbotStreamCompleteEvent,
	BinaryEvaluationResult,
	CqChallengeData,
	CareerUUID,
	BlocklyJson,
	ChallengeUUID,
	CareerChatbotStreamStartOrCompleteEvent,
	CareerChatbotChunkEvent
} from "@bluedotrobots/common-ts"
import type { Swiper as SwiperType } from "swiper"
import { action, makeAutoObservable, observable } from "mobx"
import blueDotApiClient from "../classes/blue-dot-api-client-class"
import normalizeSandboxJson from "../utils/sandbox/normalize-sandbox-json"
import saveCareerProgress from "../utils/career-quest/save-career-progress"
import { CAREER_DEFINITIONS } from "../utils/career-quest/career-quest-data"
import { getContentComponent } from "../utils/career-quest/career-quest-content"
import generateCppFromJson from "../utils/cpp/generate-cpp-from-json"
import isEqual from "lodash-es/isEqual"
import { stripBlockPositions } from "../utils/blockly/strip-blockly-positions"
import { careerData } from "../utils/constants/career-quest/career-data"
import { DEFAULT_TRANSITION_DURATION } from "../utils/constants/constants"

// Chat and streaming state interfaces
interface ChatData {
	messages: ChallengeChatMessage[]
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
	blocklyJson: BlocklyJson
	cppCode: string
}

// omit interactionType:
interface CareerChatData extends Omit<StreamingState, "interactionType"> {
	messages: CareerChatMessage[]
	isWaitingForResponse: boolean
}

interface CareerInstance {
	careerDefinition: CareerQuestData
	challenges: Map<string, ChallengeInstance>
	completedChallengeIds: Set<ChallengeUUID>
	currentChallengeUuidOrTextUuid: string
	hasRetrievedAllChallenges: boolean
	isRetrievingData: boolean
	savedCurrentPosition: string
	furthestSeenChallengeUuidOrTextUuid: string
	seenChallengeUUIDs: Set<ChallengeUUID>
	currentMainSlideIndex: number
	textChildIndices: Map<string, number> // textParentId -> currentTextChildIndex
	morphingTextIndices: Map<string, number> // morphingTextId -> currentVariantIndex
	morphingAnimationStates: Map<string, boolean> // morphingTextId -> isAnimating
	mainSlides: MainSlide[]
	swiperInstance: SwiperType | null
	textParentSwipers: Map<string, SwiperType | null>
	isTransitioning: boolean
	currentTransitionDuration: number
	rightContent: RightContent
	lastSlideChangeTime: number
	careerChatData: CareerChatData
	isCareerChatToggled: boolean
	previousRightContent: RightContent | null
}

class CareerQuestClass {
	// Main data structure: careerUUID -> CareerInstance
	public careers = observable.map<CareerUUID, CareerInstance>()
	public isDoneInitializing = false
	public readonly SLIDE_COOLDOWN = 200 // ms

	constructor() {
		makeAutoObservable(this)

		this.initializeAllCareers(CAREER_DEFINITIONS)
	}

	// ========================================
	// CAREER INITIALIZATION
	// ========================================

	private initializeAllCareers = action((careerDefinitions: Record<string, CareerQuestData>): void => {
		Object.values(careerDefinitions).forEach((careerDefinition): void => {
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
		challengeSections.forEach((section): void => {
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
				isCompleted: false,

				// Code
				blocklyJson: section.challengeData.initialBlocklyJson,
				cppCode: ""
			})
		})

		// Create main slides from sections
		const mainSlides: MainSlide[] = careerDefinition.sections.map((section): MainSlide => {
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

		// Initialize text child indices for each text parent section
		const textChildIndices = new Map<string, number>()

		// Initialize morphing text indices and animation states
		const morphingTextIndices = new Map<string, number>()
		const morphingAnimationStates = new Map<string, boolean>()
		careerDefinition.sections.forEach((section): void => {
			if (section.type === "textParent") {
				textChildIndices.set(section.id, 0)
				section.children.forEach((child): void => {
					if (child.type === "morphingText") {
						morphingTextIndices.set(child.id, 0)
						morphingAnimationStates.set(child.id, false)
					}
				})
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
			furthestSeenChallengeUuidOrTextUuid: "",
			seenChallengeUUIDs: new Set<ChallengeUUID>(),
			currentMainSlideIndex: 0,
			textChildIndices,
			morphingTextIndices,
			morphingAnimationStates,
			mainSlides,
			swiperInstance: null,
			isTransitioning: false,
			currentTransitionDuration: DEFAULT_TRANSITION_DURATION,
			lastSlideChangeTime: 0,
			rightContent: {
				type: "image",
				icon:
					(careerDefinition.sections[0].type === "textParent" &&
						careerDefinition.sections[0].children[0].type !== "morphingText" &&
						careerDefinition.sections[0].children[0].rightSideContent) ||
					"null"
			},
			textParentSwipers: new Map<string, SwiperType | null>(),
			careerChatData: {
				messages: [],
				isWaitingForResponse: false,
				isStreaming: false,
				currentStreamingMessageId: null,
				currentStreamId: null,
				currentInteractionType: null
			},
			isCareerChatToggled: false,
			previousRightContent: null
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

	public setSwiperInstance = action((careerUUID: CareerUUID, swiperInstance: SwiperType): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.swiperInstance = swiperInstance

		// Update navigation immediately when swiper is set
		this.updateSwiperNavigation(careerUUID)

		// Try to restore saved position and sync right content once swiper exists
		this.attemptRestoreAndSyncRightContent(careerUUID)
	})

	private updateSwiperNavigation = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career?.swiperInstance) return

		const canAdvance = this.canAdvanceToNextMain(careerUUID, career.currentMainSlideIndex)
		const canGoBack = career.currentMainSlideIndex > 0

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

		// When data becomes ready, try to restore and sync UI state
		if (hasRetrievedAllChallenges) {
			this.attemptRestoreAndSyncRightContent(careerUUID)
		}
	})

	// ========================================
	// NAVIGATION STATE MANAGEMENT
	// ========================================

	public getCurrentMainSlideIndex(careerUUID: CareerUUID): number {
		const career = this.getCareer(careerUUID)
		return career?.currentMainSlideIndex || 0
	}

	public getCurrentTextChildIndex(careerUUID: CareerUUID, textParentId?: string): number {
		const career = this.getCareer(careerUUID)
		if (!career) return 0

		// If textParentId is provided, return the index for that specific text parent
		if (textParentId) {
			return career.textChildIndices.get(textParentId) || 0
		}

		// If no textParentId provided, return the index for the current active text parent
		const currentSlide = this.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return 0

		return career.textChildIndices.get(currentSlide.id) || 0
	}

	private setCurrentMainSlideIndex = action((careerUUID: CareerUUID, index: number): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.currentMainSlideIndex = index
	})

	private setCurrentTextChildIndex = action((careerUUID: CareerUUID, textParentId: string, index: number): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.textChildIndices.set(textParentId, index)
	})

	public getNavigationIndices(careerUUID: CareerUUID): { mainSlideIndex: number; textChildIndex: number } {
		const career = this.getCareer(careerUUID)
		const mainSlideIndex = career?.currentMainSlideIndex || 0

		// Get text child index for the current main slide
		const currentSlide = this.getCurrentMainSlide(careerUUID)
		const textChildIndex = currentSlide.type === "textParent"
			? career?.textChildIndices.get(currentSlide.id) || 0
			: 0

		return { mainSlideIndex, textChildIndex }
	}

	public getMainSlides(careerUUID: CareerUUID): MainSlide[] {
		const career = this.getCareer(careerUUID)
		return career?.mainSlides || []
	}

	// ========================================
	// MORPHING TEXT MANAGEMENT
	// ========================================

	public getCurrentMorphingIndex(careerUUID: CareerUUID, morphingTextId: string): number {
		const career = this.getCareer(careerUUID)
		return career?.morphingTextIndices.get(morphingTextId) || 0
	}

	public setMorphingIndex = action((careerUUID: CareerUUID, morphingTextId: string, index: number): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.morphingTextIndices.set(morphingTextId, index)

		// Update right content when morphing index changes
		this.updateRightContentForCurrentState(careerUUID)
	})

	public canAdvanceMorphingText(careerUUID: CareerUUID, morphingTextId: string): boolean {
		const career = this.getCareer(careerUUID)
		if (!career) return false

		// Check if animation is in progress
		const isAnimating = career.morphingAnimationStates.get(morphingTextId) || false
		if (isAnimating) return false

		const morphingSection = this.findMorphingTextSection(careerUUID, morphingTextId)
		if (!morphingSection) return false

		const currentIndex = this.getCurrentMorphingIndex(careerUUID, morphingTextId)
		const maxIndex = morphingSection.morphingVariants.length - 1
		return currentIndex < maxIndex
	}

	public canGoBackMorphingText(careerUUID: CareerUUID, morphingTextId: string): boolean {
		const career = this.getCareer(careerUUID)
		if (!career) return false

		// Check if animation is in progress
		const isAnimating = career.morphingAnimationStates.get(morphingTextId) || false
		if (isAnimating) return false

		const currentIndex = this.getCurrentMorphingIndex(careerUUID, morphingTextId)
		return currentIndex > 0
	}

	public setMorphingAnimationState = action((careerUUID: CareerUUID, morphingTextId: string, isAnimating: boolean): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.morphingAnimationStates.set(morphingTextId, isAnimating)
	})

	public isAnyMorphingTextAnimating(careerUUID: CareerUUID): boolean {
		const career = this.getCareer(careerUUID)
		if (!career) return false

		// Check if any morphing text in the current slide is animating
		const currentSlide = this.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return false

		for (const child of currentSlide.data.children) {
			if (child.type === "morphingText") {
				const isAnimating = career.morphingAnimationStates.get(child.id) || false
				if (isAnimating) return true
			}
		}
		return false
	}

	public advanceMorphingText = action((careerUUID: CareerUUID, morphingTextId: string): void => {
		if (!this.canAdvanceMorphingText(careerUUID, morphingTextId)) return

		const currentIndex = this.getCurrentMorphingIndex(careerUUID, morphingTextId)
		const nextIndex = currentIndex + 1

		this.setMorphingIndex(careerUUID, morphingTextId, nextIndex)
	})

	public goBackMorphingText = action((careerUUID: CareerUUID, morphingTextId: string): void => {
		if (!this.canGoBackMorphingText(careerUUID, morphingTextId)) return

		const currentIndex = this.getCurrentMorphingIndex(careerUUID, morphingTextId)
		const prevIndex = currentIndex - 1

		this.setMorphingIndex(careerUUID, morphingTextId, prevIndex)
	})

	private findMorphingTextSection(careerUUID: CareerUUID, morphingTextId: string): MorphingTextSection | null {
		const career = this.getCareer(careerUUID)
		if (!career) return null

		for (const section of career.careerDefinition.sections) {
			if (section.type === "textParent") {
				for (const child of section.children) {
					// eslint-disable-next-line max-depth
					if (child.type === "morphingText" && child.id === morphingTextId) {
						return child
					}
				}
			}
		}
		return null
	}

	public restoreNavigationFromSavedPosition = action((careerUUID: CareerUUID): boolean => {
		const career = this.getCareer(careerUUID)
		if (!career) return false

		const savedPosition = this.getSavedPosition(careerUUID)
		if (!savedPosition) {
			// No saved position, start at beginning
			career.currentMainSlideIndex = 0
			// Reset all text parent indices to 0
			career.textChildIndices.forEach((_, textParentId): void => {
				career.textChildIndices.set(textParentId, 0)
			})
			return true
		}

		// Try to find the saved position
		const positionIndices = this.findPositionIndices(careerUUID, savedPosition)
		if (!positionIndices) {
			// Fallback to beginning if position not found
			career.currentMainSlideIndex = 0
			// Reset all text parent indices to 0
			career.textChildIndices.forEach((_, textParentId): void => {
				career.textChildIndices.set(textParentId, 0)
			})
			return true
		}

		// Set navigation indices from saved position
		career.currentMainSlideIndex = positionIndices.mainSlideIndex
		// Set the text child index for the specific text parent that contains this position
		const currentSlide = this.getMainSlides(careerUUID)[positionIndices.mainSlideIndex]
		if (currentSlide.type === "textParent") {
			career.textChildIndices.set(currentSlide.id, positionIndices.textChildIndex)
			// Sync the text parent swiper to the restored position
			this.syncTextParentSwiper(careerUUID, currentSlide.id, positionIndices.textChildIndex)
		}
		return true
	})

	// Attempt to restore saved position (if any), sync the Swiper to it, and update right content
	private attemptRestoreAndSyncRightContent = action((careerUUID: CareerUUID): void => {
		const isDataReady = this.hasRetrievedAllChallengesForCareer(careerUUID)
		const swiperInstance = this.getSwiperInstance(careerUUID)
		if (!isDataReady || !swiperInstance) return

		const restored = this.restoreNavigationFromSavedPosition(careerUUID)
		if (!restored) return

		const indices = this.getNavigationIndices(careerUUID)
		swiperInstance.slideTo(indices.mainSlideIndex, 0)

		this.updateRightContentForCurrentState(careerUUID)
	})

	// ========================================
	// NEW: SAVED POSITION MANAGEMENT
	// ========================================

	public setSavedPosition = action((careerUUID: CareerUUID, position: string): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.savedCurrentPosition = position
	})

	private getSavedPosition(careerUUID: CareerUUID): string | undefined {
		const career = this.getCareer(careerUUID)
		return career?.savedCurrentPosition
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

	// NEW: Set furthest seen position
	public setFurthestSeenPosition = action((careerUUID: CareerUUID, position: string): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.furthestSeenChallengeUuidOrTextUuid = position
	})

	// NEW: Get furthest seen position
	private getFurthestSeenPosition(careerUUID: CareerUUID): string {
		const career = this.getCareer(careerUUID)
		return career?.furthestSeenChallengeUuidOrTextUuid || ""
	}

	// NEW: Determine if a position is the furthest seen
	public isPositionFurthestSeen(careerUUID: CareerUUID, currentPosition: string): boolean {
		const career = this.getCareer(careerUUID)
		if (!career) return false

		const furthestSeen = this.getFurthestSeenPosition(careerUUID)
		if (!furthestSeen) return true // If no furthest seen, this is the first position

		// If the current position is the same as the furthest seen, it is the furthest seen
		if (currentPosition === furthestSeen) return true

		// Get position indices for comparison
		const currentIndices = this.findPositionIndices(careerUUID, currentPosition)
		const furthestIndices = this.findPositionIndices(careerUUID, furthestSeen)

		if (!currentIndices || !furthestIndices) return false

		// Compare main slide indices first
		if (currentIndices.mainSlideIndex > furthestIndices.mainSlideIndex) {
			return true
		}
		if (currentIndices.mainSlideIndex < furthestIndices.mainSlideIndex) {
			return false
		}

		// If same main slide, compare text child indices
		return currentIndices.textChildIndex >= furthestIndices.textChildIndex
	}

	// NEW: Update furthest seen position if current position is further
	public updateFurthestSeenIfNeeded = action((careerUUID: CareerUUID, currentPosition: string): void => {
		if (this.isPositionFurthestSeen(careerUUID, currentPosition)) {
			this.setFurthestSeenPosition(careerUUID, currentPosition)
		}
	})

	// NEW: Check if a text child requires button interaction
	private requiresButtonInteraction(careerUUID: CareerUUID, textChildId: string): boolean {
		const career = this.getCareer(careerUUID)
		if (!career) return false

		// Find the text child in the career definition
		for (const section of career.careerDefinition.sections) {
			if (section.type === "textParent") {
				for (const child of section.children) {
					// eslint-disable-next-line max-depth
					if (child.id === textChildId) {
						// Check if the content contains an AnimatedStateButton
						// We'll do this by checking if the text child ID matches known button IDs
						// eslint-disable-next-line max-depth
						if (child.type === "text") {
							// For now, we'll check if the text child ID matches known button IDs
							// In the future, this could be made more sophisticated by analyzing the JSX
							return this.hasAnimatedStateButton(child)
						}
						return false
					}
				}
			}
		}
		return false
	}

	// NEW: Check if a text child has an AnimatedStateButton
	private hasAnimatedStateButton(textChild: TextSection): boolean {
		// For now, we'll check known text child IDs that contain buttons
		// In the future, this could be made more sophisticated by analyzing the JSX structure
		const buttonTextChildIds = [
			"meet-pip-1-6", // The YES button in the meet-pip
			// Add more button text child IDs here as needed
		]

		return buttonTextChildIds.includes(textChild.id)
	}

	// NEW: Check if user can advance past a text child that requires button interaction
	public canAdvancePastTextChild(careerUUID: CareerUUID, textChildId: string): boolean {
		if (!this.requiresButtonInteraction(careerUUID, textChildId)) {
			return true // No button interaction required, allow advancement
		}

		// Check if the user has seen past this text child
		const furthestSeen = this.getFurthestSeenPosition(careerUUID)
		if (!furthestSeen) return false // No furthest seen, haven't progressed past this point

		// Get position indices for comparison
		const currentIndices = this.findPositionIndices(careerUUID, textChildId)
		const furthestIndices = this.findPositionIndices(careerUUID, furthestSeen)

		if (!currentIndices || !furthestIndices) return false

		// Check if furthest seen is after the current text child
		if (furthestIndices.mainSlideIndex > currentIndices.mainSlideIndex) {
			return true
		}
		if (furthestIndices.mainSlideIndex < currentIndices.mainSlideIndex) {
			return false
		}

		// If same main slide, check if furthest seen text child index is greater
		return furthestIndices.textChildIndex > currentIndices.textChildIndex
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

	private getCareerChat(careerUUID: CareerUUID): CareerChatData | undefined {
		const career = this.getCareer(careerUUID)
		return career?.careerChatData
	}

	// ========================================
	// MESSAGE MANAGEMENT
	// ========================================

	// Challenge messages
	public getChallengeMessages(cqInformation: CareerUUIDChallengeUUID): ChallengeChatMessage[] {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.messages || []
	}

	public addChallengeUserMessage = action((cqInformation: CareerUUIDChallengeUUID, content: string): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return

		// Hide hint button from all messages when a new message is added
		this.hideChallengeHintButtons(cqInformation)

		challenge.isWaitingForResponse = true

		const message: ChallengeChatMessage = {
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

		const message: ChallengeChatMessage = {
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

		const message: ChallengeChatMessage = {
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

		const message: ChallengeChatMessage = {
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

		challenge.messages.forEach((message): void => {
			if (message.shouldShowHintButton) {
				message.shouldShowHintButton = false
			}
		})
	})

	public clearChallengeMessages = action((cqInformation: CareerUUIDChallengeUUID): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.messages = []
		this.resetChallengeStreamingState(cqInformation)
	})

	// Career chat messages
	public getCareerChatMessages(careerUUID: CareerUUID): CareerChatMessage[] {
		const careerChat = this.getCareerChat(careerUUID)
		return careerChat?.messages || []
	}

	public addCareerUserMessage = action((careerUUID: CareerUUID, content: string): void => {
		const careerChat = this.getCareerChat(careerUUID)
		if (!careerChat) return
		careerChat.isWaitingForResponse = true

		const message: CareerChatMessage = {
			id: `user-${Date.now()}`,
			role: "user",
			content,
			timestamp: new Date()
		}

		careerChat.messages.push(message)
	})

	public getCareerDataForMessage = action((careerUUID: CareerUUID): CareerDataForMessage | null => {
		const career = this.getCareer(careerUUID)
		if (!career) return null
		const careerDefinition = careerData.find((singleCareerData): boolean => singleCareerData.careerUUID === careerUUID)
		if (!careerDefinition) return null
		const currentSlide = this.getMainSlides(careerUUID)[career.currentMainSlideIndex]
		if (currentSlide.type === "challenge") return null
		const currentTextChildIndex = career.textChildIndices.get(currentSlide.id) || 0
		const child = currentSlide.data.children[currentTextChildIndex]

		let whatUserSees: ReactNode
		if (child.type === "morphingText") {
			const morphingIndex = this.getCurrentMorphingIndex(careerUUID, child.id)
			const currentVariant = child.morphingVariants[morphingIndex]
			whatUserSees = `${child.staticText} ${currentVariant.text}`
		} else {
			const content = child.content
			if (typeof content === "function") {
				whatUserSees = content()
			} else if (typeof content === "string") {
				whatUserSees = getContentComponent(content)
			} else {
				whatUserSees = content
			}
		}
		return {
			careerName: careerDefinition.careerName,
			careerDescription: careerDefinition.careerDescription,
			whatUserSees
		}
	})

	public clearCareerChatMessages = action((careerUUID: CareerUUID): void => {
		const careerChat = this.getCareerChat(careerUUID)
		if (!careerChat) return
		careerChat.messages = []
		this.resetCareerStreamingState(careerUUID)
	})

	// ========================================
	// STREAMING MANAGEMENT
	// ========================================

	public startChallengeStreaming = action((startEvent: ChallengeChatbotStreamStartEvent): void => {
		// Note: You'll need to pass careerUUID in the event or determine it from challengeUUID
		const challenge = this.getChallenge({ ...startEvent })
		if (!challenge) return

		challenge.isWaitingForResponse = false

		const streamingMessage: ChallengeChatMessage = {
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

	public addChallengeStreamingChunk = action((chunkEvent: ChallengeChatbotStreamChunkEvent): void => {
		const challenge = this.getChallenge({ ...chunkEvent })
		if (!challenge) return

		if (!challenge.isStreaming || !challenge.currentStreamingMessageId) {
			console.warn("Received chunk but not streaming for challenge:", chunkEvent.challengeUUID)
			return
		}

		const streamingMessage = challenge.messages.find(
			(msg): boolean => msg.id === challenge.currentStreamingMessageId
		)

		if (streamingMessage) {
			streamingMessage.content += chunkEvent.content
		}
	})

	public completeChallengeStreaming = action((completeEvent: ChallengeChatbotStreamCompleteEvent): void => {
		const challenge = this.getChallenge({ ...completeEvent })
		if (
			!challenge ||
			!challenge.isStreaming ||
			!challenge.currentStreamingMessageId
		) return

		const streamingMessage = challenge.messages.find(
			(msg): boolean => msg.id === challenge.currentStreamingMessageId
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

	//Career Chat
	public startCareerStreaming = action((startEvent: CareerChatbotStreamStartOrCompleteEvent): void => {
		const careerChat = this.getCareerChat(startEvent.careerUUID)
		if (!careerChat) return

		careerChat.isWaitingForResponse = false

		const streamingMessage: CareerChatMessage = {
			id: `streaming-${Date.now()}`,
			role: "assistant",
			content: "",
			timestamp: new Date(),
			isStreaming: true
		}

		careerChat.messages.push(streamingMessage)
		careerChat.isStreaming = true
		careerChat.currentStreamingMessageId = streamingMessage.id
	})

	public addCareerStreamingChunk = action((chunkEvent: CareerChatbotChunkEvent): void => {
		const careerChat = this.getCareerChat(chunkEvent.careerUUID)
		if (!careerChat) return

		if (!careerChat.isStreaming || !careerChat.currentStreamingMessageId) {
			console.warn("Received chunk but not streaming for career:", chunkEvent.careerUUID)
			return
		}

		const streamingMessage = careerChat.messages.find(
			(msg): boolean => msg.id === careerChat.currentStreamingMessageId
		)

		if (streamingMessage) {
			streamingMessage.content += chunkEvent.content
		}
	})

	public completeCareerStreaming = action((completeEvent: CareerChatbotStreamStartOrCompleteEvent): void => {
		const careerChat = this.getCareerChat(completeEvent.careerUUID)
		if (
			!careerChat ||
			!careerChat.isStreaming ||
			!careerChat.currentStreamingMessageId
		) return

		const streamingMessage = careerChat.messages.find(
			(msg): boolean => msg.id === careerChat.currentStreamingMessageId
		)

		if (streamingMessage) {
			streamingMessage.isStreaming = false
		}

		careerChat.isStreaming = false
		careerChat.currentStreamingMessageId = null
		careerChat.currentInteractionType = null
		careerChat.currentStreamId = null
	})

	public resetCareerStreamingState = action((careerUUID: CareerUUID): void => {
		const careerChat = this.getCareerChat(careerUUID)
		if (!careerChat) return

		careerChat.isStreaming = false
		careerChat.currentStreamingMessageId = null
		careerChat.currentInteractionType = null
		careerChat.currentStreamId = null
	})

	public setCareerStreamId = action((careerUUID: CareerUUID, streamId: string | null): void => {
		const careerChat = this.getCareerChat(careerUUID)
		if (!careerChat) return
		careerChat.currentStreamId = streamId
	})

	public getCareerStreamId(careerUUID: CareerUUID): string | null {
		const careerChat = this.getCareerChat(careerUUID)
		return careerChat?.currentStreamId || null
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

	public isCareerStreaming(careerUUID: CareerUUID): boolean {
		const careerChat = this.getCareerChat(careerUUID)
		return careerChat?.isStreaming || false
	}

	public isCareerWaitingForResponse(careerUUID: CareerUUID): boolean {
		const careerChat = this.getCareerChat(careerUUID)
		return careerChat?.isWaitingForResponse || false
	}

	// ========================================
	// DATA MANAGEMENT
	// ========================================

	// UPDATE: Add position update when retrieved data indicates completion
	// UPDATE this existing method to trigger swiper updates:
	public setChallengeRetrievedData = action((
		cqInformation: CareerUUIDChallengeUUID,
		messages: ChallengeChatMessage[],
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
			challenge.blocklyJson = normalizeSandboxJson(sandboxJson)
			challenge.cppCode = generateCppFromJson(challenge.blocklyJson)
		} else {
			challenge.blocklyJson = normalizeSandboxJson(challenge.challengeData.initialBlocklyJson)
			challenge.cppCode = generateCppFromJson(challenge.blocklyJson)
		}

		if (isCompleted) {
			career.completedChallengeIds.add(cqInformation.challengeUUID)
			this.updateSwiperNavigation(cqInformation.careerUUID)
		}
	})

	// Blockly JSON management
	public getUpdatedBlocklyJson(cqInformation: CareerUUIDChallengeUUID): BlocklyJson {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return {}
		return challenge.blocklyJson
	}

	public updateBlocklyJson = action((cqInformation: CareerUUIDChallengeUUID, newBlocklyJson: BlocklyJson): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.blocklyJson = newBlocklyJson
		challenge.cppCode = generateCppFromJson(newBlocklyJson)
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
		return sections.filter((section): boolean => section.type === "challenge") as ChallengeSection[]
	}

	public getChallengeSectionByChallengeUUID(careerUUID: CareerUUID): ChallengeSection[] {
		const career = this.getCareer(careerUUID)
		if (!career) return []

		return career.careerDefinition.sections.filter((section): boolean => section.type === "challenge") as ChallengeSection[]
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
			// For text parent sections, check if we're at the last text child
			const currentTextChildIndex = this.getCurrentTextChildIndex(careerUUID)
			const isAtLastTextChild = currentTextChildIndex >= currentSlide.data.children.length - 1

			// Only allow advancing to next main section if we're at the last text child
			return isAtLastTextChild
		}
		// For challenge slides, must be completed
		return this.isCodeCorrect(currentSlide.data)
	})

	private handleMainSlideChange = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		const isDataReady = this.hasRetrievedAllChallengesForCareer(careerUUID)
		const swiper = this.getSwiperInstance(careerUUID)
		if (!career || !isDataReady || !swiper) return

		const newIndex = swiper.activeIndex
		const previousIndex = career.currentMainSlideIndex
		const isGoingBackward = newIndex < previousIndex

		// Update class state instead of component state
		this.setCurrentMainSlideIndex(careerUUID, newIndex)

		const currentSlide = this.getMainSlides(careerUUID)[newIndex]

		if (currentSlide.type === "challenge") {
			// Turn off chat toggle when navigating to a challenge section
			if (career.isCareerChatToggled) {
				career.isCareerChatToggled = false
				career.previousRightContent = null // Clear since we're going to a challenge
			}

			void this.markChallengeAsSeen(careerUUID, currentSlide.data.challengeUUID)
			const isFurthestSeen = this.isPositionFurthestSeen(careerUUID, currentSlide.data.challengeUUID)
			void saveCareerProgress(careerUUID, currentSlide.data.challengeUUID, isFurthestSeen)
			this.updateFurthestSeenIfNeeded(careerUUID, currentSlide.data.challengeUUID)

			// For challenge slides, reset all text parent indices to 0
			career.textChildIndices.forEach((_, textParentId): void => {
				career.textChildIndices.set(textParentId, 0)
			})

			// Update right content for challenge slide
			this.updateRightContentForCurrentState(careerUUID)
			return
		}

		// For text sections, determine textChildIndex
		let textChildIndex: number
		if (isGoingBackward) {
			textChildIndex = currentSlide.data.children.length - 1
		} else {
			textChildIndex = 0
		}

		this.setCurrentTextChildIndex(careerUUID, currentSlide.id, textChildIndex)

		const textChild = currentSlide.data.children[textChildIndex]
		const isFurthestSeen = this.isPositionFurthestSeen(careerUUID, textChild.id)
		void saveCareerProgress(careerUUID, textChild.id, isFurthestSeen)
		this.updateFurthestSeenIfNeeded(careerUUID, textChild.id)

		// Update right content for text slide
		this.updateRightContentForCurrentState(careerUUID)

		// Sync the text parent swiper to the correct position
		this.syncTextParentSwiper(careerUUID, currentSlide.id, textChildIndex)

		// Call enter trigger function for the new text child
		if (textChild.triggerFunctionEnter) {
			console.log("Calling enter trigger function for", textChild.id)
			textChild.triggerFunctionEnter().catch((error): void => {
				console.error("Error executing enter trigger function:", error)
			})
		}

		// Update swiper navigation when main slide changes
		this.updateSwiperNavigation(careerUUID)
	})

	private handleTextChildIndexChange = action((careerUUID: CareerUUID, newIndex: number, isGoingBackward?: boolean): void => {
		const career = this.getCareer(careerUUID)
		const swiper = this.getSwiperInstance(careerUUID)
		if (!career || !swiper) return

		// Save progress when text child changes
		const currentSlide = this.getMainSlides(careerUUID)[swiper.activeIndex]
		if (currentSlide.type !== "textParent") return

		this.setCurrentTextChildIndex(careerUUID, currentSlide.id, newIndex)

		const textChild = currentSlide.data.children[newIndex]

		// If going backward and the text child is morphing text, set it to the last variant
		if (isGoingBackward && textChild.type === "morphingText") {
			const lastVariantIndex = textChild.morphingVariants.length - 1
			this.setMorphingIndex(careerUUID, textChild.id, lastVariantIndex)
		}

		const isFurthestSeen = this.isPositionFurthestSeen(careerUUID, textChild.id)
		void saveCareerProgress(careerUUID, textChild.id, isFurthestSeen)
		this.updateFurthestSeenIfNeeded(careerUUID, textChild.id)

		// Update right content for text child change
		this.updateRightContentForCurrentState(careerUUID)

		// Update swiper navigation when text child changes
		this.updateSwiperNavigation(careerUUID)
	})

	public getIsTransitioning = (careerUUID: CareerUUID): boolean => {
		const career = this.getCareer(careerUUID)
		return career?.isTransitioning || false
	}

	private setIsTransitioning = action((careerUUID: CareerUUID, isTransitioning: boolean): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.isTransitioning = isTransitioning
	})

	public getRightContent = (careerUUID: CareerUUID): RightContent => {
		const career = this.getCareer(careerUUID)
		return career?.rightContent || { type: "image", icon: "bot-humpback" }
	}

	public setRightContent = action((careerUUID: CareerUUID, rightContent: RightContent): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return

		// If the type is "null", keep the current right content unchanged
		if (rightContent.type === "null") {
			return
		}

		// If we're setting a challenge, it always takes priority (even over chat)
		if (rightContent.type === "challenge") {
			career.rightContent = rightContent
			return
		}

		// If chat is toggled and we're trying to set non-challenge content,
		// update the previousRightContent instead (so it's there when chat is turned off)
		if (career.isCareerChatToggled) {
			career.previousRightContent = rightContent
			return
		}

		// Normal case - set the content
		career.rightContent = rightContent
	})

	// ========================================
	// TEXT PARENT SWIPER MANAGEMENT
	// ========================================

	public setTextParentSwiperInstance = action((
		careerUUID: CareerUUID,
		textParentId: string,
		swiperInstance: SwiperType
	): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.textParentSwipers.set(textParentId, swiperInstance)
	})

	public getTextParentSwiperInstance(
		careerUUID: CareerUUID,
		textParentId: string
	): SwiperType | null {
		const career = this.getCareer(careerUUID)
		return career?.textParentSwipers.get(textParentId) || null
	}

	public cleanupAllSwipers = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.swiperInstance = null
		career.textParentSwipers.clear()
	})

	private syncTextParentSwiper = action((careerUUID: CareerUUID, textParentId: string, targetIndex: number): void => {
		const textParentSwiper = this.getTextParentSwiperInstance(careerUUID, textParentId)
		if (!textParentSwiper) return

		// Only sync if not already at the correct position
		if (textParentSwiper.activeIndex !== targetIndex) {
			textParentSwiper.slideTo(targetIndex, 0) // Instant, no animation
		}

		// Call the slide change handler
		this.onTextSlideChange(careerUUID)
	})

	public onTextSlideChange = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return

		// Centralize right content update logic
		this.updateRightContentForCurrentState(careerUUID)
	})

	public getLastSlideChangeTime(careerUUID: CareerUUID): number {
		const career = this.getCareer(careerUUID)
		return career?.lastSlideChangeTime ?? 0
	}

	public handleGoToNextTextChild = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		const currentSlide = this.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return

		// Check if we can advance to the next text child
		if (!this.canAdvanceToNextTextChild(careerUUID)) return

		// Call exit trigger function before leaving current slide
		const currentTextChildIndex = this.getCurrentTextChildIndex(careerUUID)
		const currentTextChild = currentSlide.data.children[currentTextChildIndex]
		if (currentTextChild.triggerFunctionExit) {
			console.log("Calling exit trigger function for", currentTextChild.id)
			currentTextChild.triggerFunctionExit().catch((error): void => {
				console.error("Error executing exit trigger function:", error)
			})
		}

		// Normal navigation (existing code)
		const mainSlides = this.getMainSlides(careerUUID)
		const currentMainSlideIndex = this.getCurrentMainSlideIndex(careerUUID)
		const textParentSwiperInstance = this.getTextParentSwiperInstance(careerUUID, mainSlides[currentMainSlideIndex].id)
		if (!textParentSwiperInstance) return

		this.setLastSlideChangeTime(careerUUID, Date.now())
		this.setIsTransitioning(careerUUID, true)
		textParentSwiperInstance.slideNext()
		this.setIsTransitioning(careerUUID, false)
		const newIndex = textParentSwiperInstance.activeIndex
		this.onTextSlideChange(careerUUID)
		this.handleTextChildIndexChange(careerUUID, newIndex, false)

		// Call enter trigger function after arriving at new slide
		const newTextChild = currentSlide.data.children[newIndex]
		if (newTextChild.triggerFunctionEnter) {
			console.log("Calling enter trigger function for", newTextChild.id)
			newTextChild.triggerFunctionEnter().catch((error): void => {
				console.error("Error executing enter trigger function:", error)
			})
		}
	})

	public handleGoToPreviousTextChild = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		const currentSlide = this.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return

		const currentTextChildIndex = this.getCurrentTextChildIndex(careerUUID)
		const canGoPrev = currentTextChildIndex > 0
		const textParentSwiperInstance = this.getTextParentSwiperInstance(careerUUID, currentSlide.id)
		if (!canGoPrev || !textParentSwiperInstance) return

		// Call exit trigger function before leaving current slide
		const currentTextChild = currentSlide.data.children[currentTextChildIndex]
		if (currentTextChild.triggerFunctionExit) {
			console.log("Calling exit trigger function for", currentTextChild.id)
			currentTextChild.triggerFunctionExit().catch((error): void => {
				console.error("Error executing exit trigger function:", error)
			})
		}

		this.setLastSlideChangeTime(careerUUID, Date.now())
		this.setIsTransitioning(careerUUID, true)
		textParentSwiperInstance.slidePrev()
		this.setIsTransitioning(careerUUID, false)
		const newIndex = textParentSwiperInstance.activeIndex
		this.onTextSlideChange(careerUUID)
		this.handleTextChildIndexChange(careerUUID, newIndex, true)

		// Call enter trigger function after arriving at new slide
		const newTextChild = currentSlide.data.children[newIndex]
		if (newTextChild.triggerFunctionEnter) {
			console.log("Calling enter trigger function for", newTextChild.id)
			newTextChild.triggerFunctionEnter().catch((error): void => {
				console.error("Error executing enter trigger function:", error)
			})
		}
	})

	public handleGoToNextMainSection = action(async (careerUUID: CareerUUID): Promise<void> => {
		const career = this.getCareer(careerUUID)
		const swiperInstance = this.getSwiperInstance(careerUUID)
		if (!career || !swiperInstance) return

		const canAdvance = this.canAdvanceToNextMain(careerUUID, career.currentMainSlideIndex)
		if (!canAdvance) return

		// Call exit trigger function before leaving current slide if it's a text parent
		const currentSlide = this.getCurrentMainSlide(careerUUID)
		if (currentSlide.type === "textParent") {
			const currentTextChildIndex = this.getCurrentTextChildIndex(careerUUID, currentSlide.id)
			const currentTextChild = currentSlide.data.children[currentTextChildIndex]
			if (currentTextChild.triggerFunctionExit) {
				console.log("Calling exit trigger function for", currentTextChild.id)
				currentTextChild.triggerFunctionExit().catch((error): void => {
					console.error("Error executing exit trigger function:", error)
				})
			}
		}

		// IMPORTANT: Ensure navigation is allowed before attempting to navigate
		const canGoPrev = career.currentMainSlideIndex > 0
		swiperInstance.allowSlidePrev = canGoPrev
		swiperInstance.allowSlideNext = canAdvance

		// Check for transition on current section
		if (currentSlide.type === "textParent" && currentSlide.data.transition) {
			await this.handleMainSlideTransitionNavigation(
				careerUUID,
				career.currentMainSlideIndex + 1,
				currentSlide.data.transition
			)
			return
		}

		// Normal navigation
		this.setLastSlideChangeTime(careerUUID, Date.now())
		this.setIsTransitioning(careerUUID, true)
		swiperInstance.slideNext()
		this.setIsTransitioning(careerUUID, false)
		this.handleMainSlideChange(careerUUID)
	})

	public handleGoToPreviousMainSection = action(async (careerUUID: CareerUUID): Promise<void> => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		const swiperInstance = this.getSwiperInstance(careerUUID)
		const canGoPrev = career.currentMainSlideIndex > 0
		if (!swiperInstance || !canGoPrev) return

		// Call exit trigger function before leaving current slide if it's a text parent
		const currentSlide = this.getCurrentMainSlide(careerUUID)
		if (currentSlide.type === "textParent") {
			const currentTextChildIndex = this.getCurrentTextChildIndex(careerUUID, currentSlide.id)
			const currentTextChild = currentSlide.data.children[currentTextChildIndex]
			if (currentTextChild.triggerFunctionExit) {
				console.log("Calling exit trigger function for", currentTextChild.id)
				currentTextChild.triggerFunctionExit().catch((error): void => {
					console.error("Error executing exit trigger function:", error)
				})
			}
		}

		// IMPORTANT: Ensure navigation is allowed before attempting to navigate
		swiperInstance.allowSlidePrev = canGoPrev
		swiperInstance.allowSlideNext = this.canAdvanceToNextMain(careerUUID, career.currentMainSlideIndex)

		// Check if the target (previous) section has a transition
		const targetMainSlideIndex = career.currentMainSlideIndex - 1
		const targetSlide = this.getMainSlides(careerUUID)[targetMainSlideIndex]

		if (targetSlide.type === "textParent" && targetSlide.data.transition) {
			await this.handleMainSlideTransitionNavigation(
				careerUUID,
				targetMainSlideIndex,
				targetSlide.data.transition
			)
			return
		}

		// Normal navigation
		this.setLastSlideChangeTime(careerUUID, Date.now())
		this.setIsTransitioning(careerUUID, true)
		swiperInstance.slidePrev()
		this.setIsTransitioning(careerUUID, false)
		this.handleMainSlideChange(careerUUID)
	})

	public changeMainSlideToCqChat = action((careerUUID: CareerUUID, challengeUUID: ChallengeUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career || !career.swiperInstance) return
		const index = career.mainSlides.findIndex((slide): boolean => {
			if (slide.type === "textParent") return false
			return slide.data.challengeUUID === challengeUUID
		})
		if (index === -1 || index === career.currentMainSlideIndex) return

		// IMPORTANT: Enable navigation in both directions before attempting to navigate
		career.swiperInstance.allowSlideNext = true
		career.swiperInstance.allowSlidePrev = true

		this.setLastSlideChangeTime(careerUUID, Date.now())
		this.setIsTransitioning(careerUUID, true)
		career.swiperInstance.slideTo(index)
		this.setIsTransitioning(careerUUID, false)
		this.handleMainSlideChange(careerUUID)
	})

	private setLastSlideChangeTime = action((careerUUID: CareerUUID, timestamp: number): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.lastSlideChangeTime = timestamp
	})

	public getCurrentMainSlide(careerUUID: CareerUUID): MainSlide {
		const mainSlides = this.getMainSlides(careerUUID)
		const currentMainSlideIndex = this.getCurrentMainSlideIndex(careerUUID)
		return mainSlides[currentMainSlideIndex]
	}

	public getCppCode(cqInformation: CareerUUIDChallengeUUID): string {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.cppCode || ""
	}

	public setCppCode = action((cqInformation: CareerUUIDChallengeUUID, cppCode: string): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.cppCode = cppCode
	})

	public getToolboxConfig(cqInformation: CareerUUIDChallengeUUID): Blockly.utils.toolbox.ToolboxDefinition {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.challengeData.toolboxConfig as Blockly.utils.toolbox.ToolboxDefinition
	}

	public resetChallengeBlocklyJsonToInitial = action((cqInformation: CareerUUIDChallengeUUID): boolean => {
		const challenge = this.getChallenge(cqInformation)
		if (
			!challenge ||
			isEqual(
				stripBlockPositions(challenge.blocklyJson),
				stripBlockPositions(challenge.challengeData.initialBlocklyJson)
			)
		) return false

		challenge.blocklyJson = challenge.challengeData.initialBlocklyJson
		challenge.cppCode = generateCppFromJson(challenge.challengeData.initialBlocklyJson)
		return true
	})

	public toggleCareerChat = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return

		if (career.isCareerChatToggled) {
		// Turn off chat - restore previous content
			career.isCareerChatToggled = false
			if (career.previousRightContent) {
				career.rightContent = career.previousRightContent
				career.previousRightContent = null
			}
			return
		}
		// Turn on chat - store current content and switch to chat
		career.isCareerChatToggled = true
		career.previousRightContent = career.rightContent
		career.rightContent = { type: "chat" }
	})

	public isCareerChatToggled(careerUUID: CareerUUID): boolean {
		const career = this.getCareer(careerUUID)
		return career?.isCareerChatToggled || false
	}

	// ========================================
	// RIGHT CONTENT SELECTION LOGIC
	// ========================================

	// eslint-disable-next-line complexity
	private updateRightContentForCurrentState = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return

		const isDataReady = this.hasRetrievedAllChallengesForCareer(careerUUID)
		if (!isDataReady) {
			this.setRightContent(careerUUID,
				{
					type: "image",
					icon:
						(career.careerDefinition.sections[0].type === "textParent" &&
							career.careerDefinition.sections[0].children[0].type !== "morphingText" &&
							career.careerDefinition.sections[0].children[0].rightSideContent) ||
						"null"
				})
			return
		}

		const currentSlide = this.getMainSlides(careerUUID)[career.currentMainSlideIndex]

		if (currentSlide.type === "challenge") {
			this.setRightContent(careerUUID, { type: "challenge", challengeData: currentSlide.data })
			return
		}

		// If chat is toggled, avoid overriding UI with non-challenge content
		if (career.isCareerChatToggled) return

		// Determine if the next challenge has been seen
		const currentSectionIndex = career.careerDefinition.sections.findIndex((section): boolean => section.id === currentSlide.id)
		const nextChallenge = career.careerDefinition.sections
			.slice(currentSectionIndex + 1)
			.find((section): boolean => section.type === "challenge") as ChallengeSection | undefined

		if (nextChallenge && this.hasChallengeBeenSeen(careerUUID, nextChallenge.challengeData.challengeUUID)) {
			this.setRightContent(careerUUID, { type: "challenge", challengeData: nextChallenge.challengeData })
			return
		}

		// Otherwise use the current text child's right content
		const currentTextChildIndex = career.textChildIndices.get(currentSlide.id) || 0
		const textChild = currentSlide.data.children[currentTextChildIndex]
		if (textChild.type === "morphingText") {
			const morphingIndex = this.getCurrentMorphingIndex(careerUUID, textChild.id)
			const currentVariant = textChild.morphingVariants[morphingIndex]

			if (currentVariant) {
				this.setRightContent(careerUUID, currentVariant.rightContent)
			} else {
				this.setRightContent(careerUUID, {
					type: "image",
					icon:
						(career.careerDefinition.sections[0].type === "textParent" &&
							career.careerDefinition.sections[0].children[0].type !== "morphingText" &&
							career.careerDefinition.sections[0].children[0].rightSideContent) ||
						"null"
				})
			}
		} else {
			this.setRightContent(careerUUID, { type: "image", icon: textChild.rightSideContent })
		}
	})

	// Add this method to your CareerQuestClass
	public setCareerChatRetrievedData = action((careerUUID: CareerUUID, messages: CareerChatMessage[]): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return

		// Set the retrieved messages in the career chat data
		career.careerChatData.messages = messages

		// Reset any streaming states since these are retrieved messages
		career.careerChatData.isWaitingForResponse = false
		career.careerChatData.isStreaming = false
		career.careerChatData.currentStreamingMessageId = null
		career.careerChatData.currentStreamId = null
	})

	// NEW: Check if user can advance to next text child
	public canAdvanceToNextTextChild(careerUUID: CareerUUID): boolean {
		const career = this.getCareer(careerUUID)
		if (!career) return false

		const currentSlide = this.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return false

		const currentTextChildIndex = this.getCurrentTextChildIndex(careerUUID)
		const currentTextChild = currentSlide.data.children[currentTextChildIndex]

		// Check if we can advance past the current text child
		if (!this.canAdvancePastTextChild(careerUUID, currentTextChild.id)) {
			return false
		}

		// Check if there's a next text child
		return currentTextChildIndex < currentSlide.data.children.length - 1
	}

	// NEW: Handle button click to advance to next text child
	public handleButtonClickAdvance = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return

		const currentSlide = this.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return

		const currentTextChildIndex = this.getCurrentTextChildIndex(careerUUID)
		const currentTextChild = currentSlide.data.children[currentTextChildIndex]

		// Check if this text child requires button interaction
		if (!this.requiresButtonInteraction(careerUUID, currentTextChild.id)) {
			return
		}

		// Check if there's a next text child
		if (currentTextChildIndex >= currentSlide.data.children.length - 1) {
			return
		}

		// Advance to the next text child
		const nextTextChildIndex = currentTextChildIndex + 1
		const nextTextChild = currentSlide.data.children[nextTextChildIndex]

		// Update the furthest seen position to include the next text child
		this.setFurthestSeenPosition(careerUUID, nextTextChild.id)

		// Save progress with isFurthestSeen: true since we just advanced to a new position
		void saveCareerProgress(careerUUID, nextTextChild.id, true)

		// Navigate to the next text child
		const textParentSwiperInstance = this.getTextParentSwiperInstance(careerUUID, currentSlide.id)
		if (textParentSwiperInstance) {
			this.setLastSlideChangeTime(careerUUID, Date.now())
			this.setIsTransitioning(careerUUID, true)
			textParentSwiperInstance.slideTo(nextTextChildIndex, 300) // Smooth transition
			this.setIsTransitioning(careerUUID, false)
			this.onTextSlideChange(careerUUID)
			this.handleTextChildIndexChange(careerUUID, nextTextChildIndex, false)
		}
	})

	private handleMainSlideTransitionNavigation = action(async (
		careerUUID: CareerUUID,
		targetMainSlideIndex: number,
		transition: TextTransition
	): Promise<void> => {
		// 1. Set transitioning state (shows black overlay) and store duration
		this.setLastSlideChangeTime(careerUUID, Date.now())
		this.setCurrentTransitionDuration(careerUUID, transition.duration)
		this.setIsTransitioning(careerUUID, true)

		// 2. Wait for fade-out
		await this.sleep(transition.duration / 2)

		// 3. Perform instant slide change
		const swiperInstance = this.getSwiperInstance(careerUUID)
		if (swiperInstance) {
			swiperInstance.slideTo(targetMainSlideIndex, 0) // Instant
			this.handleMainSlideChange(careerUUID)
		}

		// 4. Brief pause, then fade-in
		await this.sleep(50)
		this.setIsTransitioning(careerUUID, false)
	})

	private setCurrentTransitionDuration = action((careerUUID: CareerUUID, duration: number): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.currentTransitionDuration = duration
	})

	public getCurrentTransitionDuration = (careerUUID: CareerUUID): number => {
		const career = this.getCareer(careerUUID)
		return career?.currentTransitionDuration || DEFAULT_TRANSITION_DURATION
	}

	private sleep(ms: number): Promise<void> {
		return new Promise((resolve): NodeJS.Timeout => setTimeout(resolve, ms))
	}

	public logout(): void {
		this.careers.clear()
		this.isDoneInitializing = false
	}
}

const careerQuestClass = new CareerQuestClass()
export default careerQuestClass
