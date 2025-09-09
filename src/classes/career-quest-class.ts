"use client"

import type * as Blockly from "blockly/core"
import { ReactNode } from "react"
import {
	CareerUUID,
	ChallengeUUID,
} from "@bluedotrobots/common-ts/types/utils"
import type { Swiper as SwiperType } from "swiper"
import { action, makeAutoObservable, observable } from "mobx"
import normalizeSandboxJson from "../utils/sandbox/normalize-sandbox-json"
import saveCareerProgress from "../utils/career-quest/save-career-progress"
// Dynamic import - career definitions will be loaded on-demand
import { getContentComponent } from "../utils/career-quest/career-quest-content"
import isEqual from "lodash-es/isEqual"
import { stripBlockPositions } from "../utils/blockly/strip-blockly-positions"
import { careerData } from "../utils/constants/career-quest/career-data"
import teacherClass from "./teacher-class"
import chatManagerClass from "./chat-manager-class"
import navigationManagerClass from "./navigation-manager-class"
import { CqChallengeData } from "@bluedotrobots/common-ts/types/career-quest"
import { BinaryEvaluationResult } from "@bluedotrobots/common-ts/types/chat"
import { BlocklyJson } from "@bluedotrobots/common-ts/types/sandbox"
import blueDotApiClient from "./blue-dot-api-client-class"

interface CareerInstance {
	careerDefinition: CareerQuestData
	completedChallengeIds: Set<ChallengeUUID>
	currentChallengeUuidOrTextUuid: string
	hasRetrievedAllChallenges: boolean
	isRetrievingData: boolean
	savedCurrentPosition: string
	furthestSeenChallengeUuidOrTextUuid: string
	seenChallengeUUIDs: Set<ChallengeUUID>
	rightContent: RightContent
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

		// Career definitions will be loaded on-demand when needed
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

		// Initialize challenge chats in ChatManager
		challengeSections.forEach((section): void => {
			chatManagerClass.initializeChallengeChat(
				careerDefinition.careerUUID,
				section.challengeData.challengeUUID,
				section.challengeData,
				section.challengeData.initialBlocklyJson,
				"",
				false
			)
		})

		// Initialize career chat
		chatManagerClass.initializeCareerChat(careerDefinition.careerUUID)

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
			completedChallengeIds: new Set<ChallengeUUID>(),
			currentChallengeUuidOrTextUuid: "",
			hasRetrievedAllChallenges: false,
			isRetrievingData: false,
			savedCurrentPosition: "",
			furthestSeenChallengeUuidOrTextUuid: "",
			seenChallengeUUIDs: new Set<ChallengeUUID>(),
			rightContent: {
				type: "icon",
				iconKey: "bot-humpback"
			},
			isCareerChatToggled: false,
			previousRightContent: null
		}

		this.careers.set(careerDefinition.careerUUID, careerInstance)

		// Initialize navigation in NavigationManager after career instance is created
		navigationManagerClass.initializeCareerNavigation(
			careerDefinition.careerUUID,
			mainSlides,
			textChildIndices,
			morphingTextIndices,
			morphingAnimationStates
		)
	})

	public reinitialize = action(async (): Promise<void> => {
		// Clear existing data
		this.careers.clear()
		this.isDoneInitializing = false

		// Re-initialize with fresh data
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const { CAREER_DEFINITIONS } = await import("../utils/career-quest/career-quest-data")
		this.initializeAllCareers(CAREER_DEFINITIONS)
	})

	public setSwiperInstance = action((careerUUID: CareerUUID, swiperInstance: SwiperType): void => {
		navigationManagerClass.setSwiperInstance(careerUUID, swiperInstance)

		// Update navigation immediately when swiper is set
		this.updateSwiperNavigation(careerUUID)

		// Try to restore saved position and sync right content once swiper exists
		this.attemptRestoreAndSyncRightContent(careerUUID)
	})

	private updateSwiperNavigation = action((careerUUID: CareerUUID): void => {
		navigationManagerClass.updateSwiperNavigation(careerUUID, (slideIndex: number): boolean =>
			this.canAdvanceToNextMain(careerUUID, slideIndex)
		)
	})

	public hasRetrievedAllChallengesForCareer(careerUUID: CareerUUID): boolean {
		const career = this.getCareer(careerUUID)
		return career?.hasRetrievedAllChallenges || false
	}

	public setHasRetrievedAllChallengesForCareer = action((careerUUID: CareerUUID, hasRetrievedAllChallenges: boolean): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		career.hasRetrievedAllChallenges = hasRetrievedAllChallenges

		// When data becomes ready, immediately restore navigation indices
		if (hasRetrievedAllChallenges) {
			// Restore navigation indices immediately (regardless of swiper instance)
			this.restoreNavigationFromSavedPosition(careerUUID)
			// Try to sync swiper and right content if swiper instance exists
			this.attemptRestoreAndSyncRightContent(careerUUID)
		}
	})

	// ========================================
	// MORPHING TEXT MANAGEMENT
	// ========================================

	public setMorphingIndex = action((careerUUID: CareerUUID, morphingTextId: string, index: number): void => {
		navigationManagerClass.setMorphingIndex(careerUUID, morphingTextId, index)

		// Update right content when morphing index changes
		this.updateRightContentForCurrentState(careerUUID)
	})

	public canAdvanceMorphingText(careerUUID: CareerUUID, morphingTextId: string): boolean {
		const morphingSection = this.findMorphingTextSection(careerUUID, morphingTextId)
		if (!morphingSection) return false

		return navigationManagerClass.canAdvanceMorphingText(careerUUID, morphingTextId, morphingSection)
	}

	public advanceMorphingText = action((careerUUID: CareerUUID, morphingTextId: string): void => {
		const morphingSection = this.findMorphingTextSection(careerUUID, morphingTextId)
		if (!morphingSection) return

		navigationManagerClass.advanceMorphingText(
			careerUUID,
			morphingTextId,
			morphingSection,
			(): void => this.updateRightContentForCurrentState(careerUUID)
		)

		// Save progress with morphing command for teacher hub synchronization
		if (teacherClass.isFocusingStudents) {
			const currentSlide = navigationManagerClass.getCurrentMainSlide(careerUUID)
			if (currentSlide.type === "textParent") {
				void saveCareerProgress(careerUUID, morphingTextId, false, `advance_morph:${morphingTextId}`)
			}
		}
	})

	public goBackMorphingText = action((careerUUID: CareerUUID, morphingTextId: string): void => {
		navigationManagerClass.goBackMorphingText(
			careerUUID,
			morphingTextId,
			(): void => this.updateRightContentForCurrentState(careerUUID)
		)

		// Save progress with morphing command for teacher hub synchronization
		if (teacherClass.isFocusingStudents) {
			const currentSlide = navigationManagerClass.getCurrentMainSlide(careerUUID)
			if (currentSlide.type === "textParent") {
				void saveCareerProgress(careerUUID, morphingTextId, false, `back_morph:${morphingTextId}`)
			}
		}
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
		const savedPosition = this.getSavedPosition(careerUUID)
		return navigationManagerClass.restoreNavigationFromSavedPosition(careerUUID, savedPosition)
	})

	// Sync swiper to current navigation indices and update right content
	private attemptRestoreAndSyncRightContent = action((careerUUID: CareerUUID): void => {
		const isDataReady = this.hasRetrievedAllChallengesForCareer(careerUUID)
		const swiperInstance = navigationManagerClass.getSwiperInstance(careerUUID)
		if (!isDataReady || !swiperInstance) return

		const indices = navigationManagerClass.getNavigationIndices(careerUUID)
		swiperInstance.slideTo(indices.mainSlideIndex, 0)

		this.updateRightContentForCurrentState(careerUUID)
		// Call triggerFunctionEnter for the current position since we just synced to it
		const currentSlide = navigationManagerClass.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return
		const currentTextChildIndex = navigationManagerClass.getCurrentTextChildIndex(careerUUID, currentSlide.id)
		const textChild = currentSlide.data.children[currentTextChildIndex]
		if (textChild.triggerFunctionEnter) {
			textChild.triggerFunctionEnter()
		}
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
		const currentIndices = navigationManagerClass.findPositionIndices(careerUUID, currentPosition)
		const furthestIndices = navigationManagerClass.findPositionIndices(careerUUID, furthestSeen)

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
		const currentIndices = navigationManagerClass.findPositionIndices(careerUUID, textChildId)
		const furthestIndices = navigationManagerClass.findPositionIndices(careerUUID, furthestSeen)

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

	// ========================================
	// HELPER METHODS
	// ========================================

	public getCareer(careerUUID: CareerUUID): CareerInstance | undefined {
		return this.careers.get(careerUUID)
	}

	public addChallengeEvaluationResultMessage = action((
		cqInformation: CareerUUIDChallengeUUID,
		evaluationResult: BinaryEvaluationResult
	): void => {
		const career = this.getCareer(cqInformation.careerUUID)
		if (!career) return

		// Handle challenge completion callback
		const onChallengeCompleted = (careerUUID: CareerUUID, challengeUUID: ChallengeUUID): void => {
			career.completedChallengeIds.add(challengeUUID)
			this.updateSwiperNavigation(careerUUID)
		}

		chatManagerClass.addChallengeEvaluationResultMessage(cqInformation, evaluationResult, onChallengeCompleted)
	})

	public getCareerDataForMessage = action((careerUUID: CareerUUID): CareerDataForMessage | null => {
		const career = this.getCareer(careerUUID)
		if (!career) return null
		const careerDefinition = careerData.find((singleCareerData): boolean => singleCareerData.careerUUID === careerUUID)
		if (!careerDefinition) return null
		const currentSlide = navigationManagerClass.getMainSlides(careerUUID)[navigationManagerClass.getCurrentMainSlideIndex(careerUUID)]
		if (currentSlide.type === "challenge") return null
		const currentTextChildIndex = navigationManagerClass.getCurrentTextChildIndex(careerUUID, currentSlide.id)
		const child = currentSlide.data.children[currentTextChildIndex]

		let whatUserSees: ReactNode
		if (child.type === "morphingText") {
			const morphingIndex = navigationManagerClass.getCurrentMorphingIndex(careerUUID, child.id)
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

	// ========================================
	// DATA MANAGEMENT
	// ========================================

	// UPDATE: Add position update when retrieved data indicates completion
	// UPDATE this existing method to trigger swiper updates:
	public setChallengeRetrievedData = action(async (
		cqInformation: CareerUUIDChallengeUUID,
		messages: ChallengeChatMessage[],
		sandboxJson: BlocklyJson | null,
		isCompleted: boolean
	): Promise<void> => {
		const career = this.getCareer(cqInformation.careerUUID)
		if (!career) return

		// Handle challenge completion callback
		const onChallengeCompleted = (careerUUID: CareerUUID, challengeUUID: ChallengeUUID): void => {
			career.completedChallengeIds.add(challengeUUID)
			this.updateSwiperNavigation(careerUUID)
		}

		const { default: getCppGenerator } = await import("../utils/cpp/cpp-generator")

		// Normalize and generate CPP code
		let normalizedJson: BlocklyJson
		let cppCode: string
		if (sandboxJson) {
			normalizedJson = normalizeSandboxJson(sandboxJson)
			cppCode = await getCppGenerator().generateCppFromJson(normalizedJson)
		} else {
			// Get initial data from chat manager
			normalizedJson = chatManagerClass.getUpdatedBlocklyJson(cqInformation)
			cppCode = await getCppGenerator().generateCppFromJson(normalizedJson)
		}

		chatManagerClass.setChallengeRetrievedData(
			cqInformation,
			messages,
			normalizedJson,
			isCompleted,
			onChallengeCompleted
		)

		// Update the blockly JSON and CPP code
		chatManagerClass.updateBlocklyJson(cqInformation, normalizedJson, cppCode)
	})

	public updateBlocklyJson = action(async (cqInformation: CareerUUIDChallengeUUID, newBlocklyJson: BlocklyJson): Promise<void> => {
		const { default: getCppGenerator } = await import("../utils/cpp/cpp-generator")
		const cppCode = await getCppGenerator().generateCppFromJson(newBlocklyJson)
		chatManagerClass.updateBlocklyJson(cqInformation, newBlocklyJson, cppCode)
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
		return navigationManagerClass.canAdvanceToNextMain(careerUUID, slideIndex, (challengeData: CqChallengeData): boolean =>
			chatManagerClass.isCodeCorrect(challengeData)
		)
	})

	private handleMainSlideChange = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		const isDataReady = this.hasRetrievedAllChallengesForCareer(careerUUID)
		const swiper = navigationManagerClass.getSwiperInstance(careerUUID)
		if (!career || !isDataReady || !swiper) return

		const newIndex = swiper.activeIndex
		const previousIndex = navigationManagerClass.getCurrentMainSlideIndex(careerUUID)
		const isGoingBackward = newIndex < previousIndex

		// Update class state instead of component state
		navigationManagerClass.setCurrentMainSlideIndex(careerUUID, newIndex)

		const currentSlide = navigationManagerClass.getMainSlides(careerUUID)[newIndex]

		if (currentSlide.type === "challenge") {
			// Turn off chat toggle when navigating to a challenge section
			if (career.isCareerChatToggled) {
				career.isCareerChatToggled = false
				career.previousRightContent = null // Clear since we're going to a challenge
			}

			void this.markChallengeAsSeen(careerUUID, currentSlide.data.challengeUUID)
			const isFurthestSeen = this.isPositionFurthestSeen(careerUUID, currentSlide.data.challengeUUID)
			const navigationCommand = isGoingBackward ? "prev_main" : "next_main"
			void saveCareerProgress(careerUUID, currentSlide.data.challengeUUID, isFurthestSeen, navigationCommand)
			this.updateFurthestSeenIfNeeded(careerUUID, currentSlide.data.challengeUUID)

			// For challenge slides, reset all text parent indices to 0
			navigationManagerClass.resetAllTextChildIndices(careerUUID)

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

		navigationManagerClass.setCurrentTextChildIndex(careerUUID, currentSlide.id, textChildIndex)

		const textChild = currentSlide.data.children[textChildIndex]
		const isFurthestSeen = this.isPositionFurthestSeen(careerUUID, textChild.id)
		const navigationCommand = isGoingBackward ? "prev_main" : "next_main"
		void saveCareerProgress(careerUUID, textChild.id, isFurthestSeen, navigationCommand)
		this.updateFurthestSeenIfNeeded(careerUUID, textChild.id)

		// Update right content for text slide
		this.updateRightContentForCurrentState(careerUUID)

		// Sync the text parent swiper to the correct position
		this.syncTextParentSwiper(careerUUID, currentSlide.id, textChildIndex)

		// Call enter trigger function for the new text child
		if (textChild.triggerFunctionEnter) {
			textChild.triggerFunctionEnter().catch((error): void => {
				console.error("Error executing enter trigger function:", error)
			})
		}

		// Update swiper navigation when main slide changes
		this.updateSwiperNavigation(careerUUID)
	})

	private handleTextChildIndexChange = action((careerUUID: CareerUUID, newIndex: number, isGoingBackward?: boolean): void => {
		const career = this.getCareer(careerUUID)
		const swiper = navigationManagerClass.getSwiperInstance(careerUUID)
		if (!career || !swiper) return

		// Save progress when text child changes
		const currentSlide = navigationManagerClass.getMainSlides(careerUUID)[swiper.activeIndex]
		if (currentSlide.type !== "textParent") return

		navigationManagerClass.setCurrentTextChildIndex(careerUUID, currentSlide.id, newIndex)

		const textChild = currentSlide.data.children[newIndex]

		// If going backward and the text child is morphing text, set it to the last variant
		if (isGoingBackward && textChild.type === "morphingText") {
			const lastVariantIndex = textChild.morphingVariants.length - 1
			this.setMorphingIndex(careerUUID, textChild.id, lastVariantIndex)
		}

		const isFurthestSeen = this.isPositionFurthestSeen(careerUUID, textChild.id)
		const navigationCommand = isGoingBackward ? "prev_text" : "next_text"
		void saveCareerProgress(careerUUID, textChild.id, isFurthestSeen, navigationCommand)
		this.updateFurthestSeenIfNeeded(careerUUID, textChild.id)

		// Update right content for text child change
		this.updateRightContentForCurrentState(careerUUID)

		// Update swiper navigation when text child changes
		this.updateSwiperNavigation(careerUUID)
	})

	public getRightContent = (careerUUID: CareerUUID): RightContent => {
		const career = this.getCareer(careerUUID)
		return career?.rightContent || { type: "icon", iconKey: "bot-humpback" }
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

	private syncTextParentSwiper = action((careerUUID: CareerUUID, textParentId: string, targetIndex: number): void => {
		const textParentSwiper = navigationManagerClass.getTextParentSwiperInstance(careerUUID, textParentId)
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
		return navigationManagerClass.getLastSlideChangeTime(careerUUID)
	}

	public handleGoToNextTextChild = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		const currentSlide = navigationManagerClass.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return

		// Check if we can advance to the next text child
		if (!this.canAdvanceToNextTextChild(careerUUID)) return

		// Call exit trigger function before leaving current slide
		const currentTextChildIndex = navigationManagerClass.getCurrentTextChildIndex(careerUUID)
		const currentTextChild = currentSlide.data.children[currentTextChildIndex]
		if (currentTextChild.triggerFunctionExit) {
			currentTextChild.triggerFunctionExit().catch((error): void => {
				console.error("Error executing exit trigger function:", error)
			})
		}

		// Normal navigation (existing code)
		const mainSlides = navigationManagerClass.getMainSlides(careerUUID)
		const currentMainSlideIndex = navigationManagerClass.getCurrentMainSlideIndex(careerUUID)
		const textParentSwiperInstance = navigationManagerClass.getTextParentSwiperInstance(
			careerUUID, mainSlides[currentMainSlideIndex].id
		)
		if (!textParentSwiperInstance) return

		navigationManagerClass.setLastSlideChangeTime(careerUUID, Date.now())
		navigationManagerClass.setIsTransitioning(careerUUID, true)
		textParentSwiperInstance.slideNext()
		navigationManagerClass.setIsTransitioning(careerUUID, false)
		const newIndex = textParentSwiperInstance.activeIndex
		this.onTextSlideChange(careerUUID)
		this.handleTextChildIndexChange(careerUUID, newIndex, false)

		// Call enter trigger function after arriving at new slide
		const newTextChild = currentSlide.data.children[newIndex]
		if (newTextChild.triggerFunctionEnter) {
			newTextChild.triggerFunctionEnter().catch((error): void => {
				console.error("Error executing enter trigger function:", error)
			})
		}
	})

	public handleGoToPreviousTextChild = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		const currentSlide = navigationManagerClass.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return

		const currentTextChildIndex = navigationManagerClass.getCurrentTextChildIndex(careerUUID)
		const canGoPrev = currentTextChildIndex > 0
		const textParentSwiperInstance = navigationManagerClass.getTextParentSwiperInstance(careerUUID, currentSlide.id)
		if (!canGoPrev || !textParentSwiperInstance) return

		// Call exit trigger function before leaving current slide
		const currentTextChild = currentSlide.data.children[currentTextChildIndex]
		if (currentTextChild.triggerFunctionExit) {
			currentTextChild.triggerFunctionExit().catch((error): void => {
				console.error("Error executing exit trigger function:", error)
			})
		}

		navigationManagerClass.setLastSlideChangeTime(careerUUID, Date.now())
		navigationManagerClass.setIsTransitioning(careerUUID, true)
		textParentSwiperInstance.slidePrev()
		navigationManagerClass.setIsTransitioning(careerUUID, false)
		const newIndex = textParentSwiperInstance.activeIndex
		this.onTextSlideChange(careerUUID)
		this.handleTextChildIndexChange(careerUUID, newIndex, true)

		// Call enter trigger function after arriving at new slide
		const newTextChild = currentSlide.data.children[newIndex]
		if (newTextChild.triggerFunctionEnter) {
			newTextChild.triggerFunctionEnter().catch((error): void => {
				console.error("Error executing enter trigger function:", error)
			})
		}
	})

	public handleGoToNextMainSection = action(async (careerUUID: CareerUUID): Promise<void> => {
		const career = this.getCareer(careerUUID)
		const swiperInstance = navigationManagerClass.getSwiperInstance(careerUUID)
		if (!career || !swiperInstance) return

		const canAdvance = this.canAdvanceToNextMain(careerUUID, navigationManagerClass.getCurrentMainSlideIndex(careerUUID))
		if (!canAdvance) return

		// Call exit trigger function before leaving current slide if it's a text parent
		const currentSlide = navigationManagerClass.getCurrentMainSlide(careerUUID)
		if (currentSlide.type === "textParent") {
			const currentTextChildIndex = navigationManagerClass.getCurrentTextChildIndex(careerUUID, currentSlide.id)
			const currentTextChild = currentSlide.data.children[currentTextChildIndex]
			if (currentTextChild.triggerFunctionExit) {
				currentTextChild.triggerFunctionExit().catch((error): void => {
					console.error("Error executing exit trigger function:", error)
				})
			}
		}

		// IMPORTANT: Ensure navigation is allowed before attempting to navigate
		const canGoPrev = navigationManagerClass.getCurrentMainSlideIndex(careerUUID) > 0
		swiperInstance.allowSlidePrev = canGoPrev
		swiperInstance.allowSlideNext = canAdvance

		// Check for transition on current section
		if (currentSlide.type === "textParent" && currentSlide.data.transition) {
			await this.handleMainSlideTransitionNavigation(
				careerUUID,
				navigationManagerClass.getCurrentMainSlideIndex(careerUUID) + 1,
				currentSlide.data.transition
			)
			return
		}

		// Normal navigation
		navigationManagerClass.setLastSlideChangeTime(careerUUID, Date.now())
		navigationManagerClass.setIsTransitioning(careerUUID, true)
		swiperInstance.slideNext()
		navigationManagerClass.setIsTransitioning(careerUUID, false)
		this.handleMainSlideChange(careerUUID)
	})

	public handleGoToPreviousMainSection = action(async (careerUUID: CareerUUID): Promise<void> => {
		const career = this.getCareer(careerUUID)
		if (!career) return
		const swiperInstance = navigationManagerClass.getSwiperInstance(careerUUID)
		const canGoPrev = navigationManagerClass.getCurrentMainSlideIndex(careerUUID) > 0
		if (!swiperInstance || !canGoPrev) return

		// Call exit trigger function before leaving current slide if it's a text parent
		const currentSlide = navigationManagerClass.getCurrentMainSlide(careerUUID)
		if (currentSlide.type === "textParent") {
			const currentTextChildIndex = navigationManagerClass.getCurrentTextChildIndex(careerUUID, currentSlide.id)
			const currentTextChild = currentSlide.data.children[currentTextChildIndex]
			if (currentTextChild.triggerFunctionExit) {
				currentTextChild.triggerFunctionExit().catch((error): void => {
					console.error("Error executing exit trigger function:", error)
				})
			}
		}

		// IMPORTANT: Ensure navigation is allowed before attempting to navigate
		swiperInstance.allowSlidePrev = canGoPrev
		swiperInstance.allowSlideNext = this.canAdvanceToNextMain(careerUUID, navigationManagerClass.getCurrentMainSlideIndex(careerUUID))

		// Check if the target (previous) section has a transition
		const targetMainSlideIndex = navigationManagerClass.getCurrentMainSlideIndex(careerUUID) - 1
		const targetSlide = navigationManagerClass.getMainSlides(careerUUID)[targetMainSlideIndex]

		if (targetSlide.type === "textParent" && targetSlide.data.transition) {
			await this.handleMainSlideTransitionNavigation(
				careerUUID,
				targetMainSlideIndex,
				targetSlide.data.transition
			)
			return
		}

		// Normal navigation
		navigationManagerClass.setLastSlideChangeTime(careerUUID, Date.now())
		navigationManagerClass.setIsTransitioning(careerUUID, true)
		swiperInstance.slidePrev()
		navigationManagerClass.setIsTransitioning(careerUUID, false)
		this.handleMainSlideChange(careerUUID)
	})

	public changeMainSlideToCqChat = action((careerUUID: CareerUUID, challengeUUID: ChallengeUUID): void => {
		const career = this.getCareer(careerUUID)
		const swiperInstance = navigationManagerClass.getSwiperInstance(careerUUID)
		if (!career || !swiperInstance) return
		const index = navigationManagerClass.getMainSlides(careerUUID).findIndex((slide): boolean => {
			if (slide.type === "textParent") return false
			return slide.data.challengeUUID === challengeUUID
		})
		if (index === -1 || index === navigationManagerClass.getCurrentMainSlideIndex(careerUUID)) return

		// IMPORTANT: Enable navigation in both directions before attempting to navigate
		swiperInstance.allowSlideNext = true
		swiperInstance.allowSlidePrev = true

		navigationManagerClass.setLastSlideChangeTime(careerUUID, Date.now())
		navigationManagerClass.setIsTransitioning(careerUUID, true)
		swiperInstance.slideTo(index)
		navigationManagerClass.setIsTransitioning(careerUUID, false)
		this.handleMainSlideChange(careerUUID)
	})

	public getToolboxConfig(cqInformation: CareerUUIDChallengeUUID): Blockly.utils.toolbox.ToolboxDefinition {
		const career = this.getCareer(cqInformation.careerUUID)
		if (!career) return {} as Blockly.utils.toolbox.ToolboxDefinition

		// Find the challenge data from the career definition
		const challengeSection = this.getAllChallengeSections(career.careerDefinition.sections)
			.find((section): boolean => section.challengeData.challengeUUID === cqInformation.challengeUUID)

		return (challengeSection?.challengeData.toolboxConfig || {}) as Blockly.utils.toolbox.ToolboxDefinition
	}

	public resetChallengeBlocklyJsonToInitial = action(async (cqInformation: CareerUUIDChallengeUUID): Promise<boolean> => {
		// Get current and initial blockly JSON
		const currentBlocklyJson = chatManagerClass.getUpdatedBlocklyJson(cqInformation)
		const career = this.getCareer(cqInformation.careerUUID)
		if (!career) return false

		// Find the initial JSON from the career definition
		const challengeSection = this.getAllChallengeSections(career.careerDefinition.sections)
			.find((section): boolean => section.challengeData.challengeUUID === cqInformation.challengeUUID)
		if (!challengeSection) return false

		const initialBlocklyJson = challengeSection.challengeData.initialBlocklyJson

		// Check if already at initial state
		if (isEqual(stripBlockPositions(currentBlocklyJson), stripBlockPositions(initialBlocklyJson))) {
			return false
		}
		const { default: getCppGenerator } = await import("../utils/cpp/cpp-generator")

		// Reset to initial state
		const cppCode = await getCppGenerator().generateCppFromJson(initialBlocklyJson)
		chatManagerClass.updateBlocklyJson(cqInformation, initialBlocklyJson, cppCode)
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


	private updateRightContentForCurrentState = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return

		const isDataReady = this.hasRetrievedAllChallengesForCareer(careerUUID)
		if (!isDataReady) {
			this.setRightContent(careerUUID,
				{
					type: "icon",
					iconKey: "bot-humpback"
				})
			return
		}

		const currentSlide = navigationManagerClass.getMainSlides(careerUUID)[navigationManagerClass.getCurrentMainSlideIndex(careerUUID)]

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
		const currentTextChildIndex = navigationManagerClass.getCurrentTextChildIndex(careerUUID, currentSlide.id)
		const textChild = currentSlide.data.children[currentTextChildIndex]
		if (textChild.type === "morphingText") {
			const morphingIndex = navigationManagerClass.getCurrentMorphingIndex(careerUUID, textChild.id)
			const currentVariant = textChild.morphingVariants[morphingIndex]

			if (currentVariant) {
				this.setRightContent(careerUUID, currentVariant.rightContent)
			} else {
				this.setRightContent(careerUUID, {
					type: "icon",
					iconKey: "bot-humpback"
				})
			}
		} else {
			const resolvedContent = this.resolveRightSideContent(textChild.rightSideContent)
			this.setRightContent(careerUUID, resolvedContent)
		}
	})

	// NEW: Check if user can advance to next text child
	public canAdvanceToNextTextChild(careerUUID: CareerUUID): boolean {
		const career = this.getCareer(careerUUID)
		if (!career) return false

		const currentSlide = navigationManagerClass.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return false

		const currentTextChildIndex = navigationManagerClass.getCurrentTextChildIndex(careerUUID, currentSlide.id)
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

		const currentSlide = navigationManagerClass.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return

		const currentTextChildIndex = navigationManagerClass.getCurrentTextChildIndex(careerUUID)
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
		const textParentSwiperInstance = navigationManagerClass.getTextParentSwiperInstance(careerUUID, currentSlide.id)
		if (textParentSwiperInstance) {
			navigationManagerClass.setLastSlideChangeTime(careerUUID, Date.now())
			navigationManagerClass.setIsTransitioning(careerUUID, true)
			textParentSwiperInstance.slideTo(nextTextChildIndex, 300) // Smooth transition
			navigationManagerClass.setIsTransitioning(careerUUID, false)
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
		navigationManagerClass.setLastSlideChangeTime(careerUUID, Date.now())
		navigationManagerClass.setCurrentTransitionDuration(careerUUID, transition.duration)
		navigationManagerClass.setIsTransitioning(careerUUID, true)

		// 2. Wait for fade-out
		await this.sleep(transition.duration / 2)

		// 3. Perform instant slide change
		const swiperInstance = navigationManagerClass.getSwiperInstance(careerUUID)
		if (swiperInstance) {
			swiperInstance.slideTo(targetMainSlideIndex, 0) // Instant
			this.handleMainSlideChange(careerUUID)
		}

		// 4. Brief pause, then fade-in
		await this.sleep(50)
		navigationManagerClass.setIsTransitioning(careerUUID, false)
	})


	private sleep(ms: number): Promise<void> {
		return new Promise((resolve): NodeJS.Timeout => setTimeout(resolve, ms))
	}

	private resolveRightSideContent(rightSideContent: string | RightContent): RightContent {
		// If it's already a RightContent object, return as-is
		if (typeof rightSideContent === "object") {
			return rightSideContent
		}

		// If it's a string, treat it as an icon (backward compatibility)
		return { type: "icon", iconKey: rightSideContent }
	}


	public executeNavigationCommand = action((careerUUID: CareerUUID, navigationCommand: string, targetSlideId: string): boolean => {
		// Check if career quest data is ready
		if (!this.hasRetrievedAllChallengesForCareer(careerUUID)) {
			console.warn("Cannot execute navigation command: career data not yet loaded")
			return false
		}

		// Create morphing sections map for NavigationManager
		const career = this.getCareer(careerUUID)
		if (!career) return false

		const morphingSections = new Map<string, MorphingTextSection>()
		career.careerDefinition.sections.forEach((section): void => {
			if (section.type === "textParent") {
				section.children.forEach((child): void => {
					if (child.type === "morphingText") {
						morphingSections.set(child.id, child)
					}
				})
			}
		})

		return navigationManagerClass.executeNavigationCommand(
			careerUUID,
			navigationCommand,
			targetSlideId,
			morphingSections,
			(): Promise<void> => this.handleGoToNextMainSection(careerUUID),
			(): Promise<void> => this.handleGoToPreviousMainSection(careerUUID),
			(): void => this.handleGoToNextTextChild(careerUUID),
			(): void => this.handleGoToPreviousTextChild(careerUUID)
		)
	})

	public navigateToPosition = action((careerUUID: CareerUUID, positionId: string): boolean => {
		// Check if career quest data is ready
		if (!this.hasRetrievedAllChallengesForCareer(careerUUID)) {
			console.warn("Cannot navigate to position: career data not yet loaded")
			return false
		}

		const success = navigationManagerClass.navigateToPosition(careerUUID, positionId)
		if (success) {
			// Update saved position in CareerInstance
			const career = this.getCareer(careerUUID)
			if (career) {
				career.savedCurrentPosition = positionId
			}

			// Update right content for current state
			this.updateRightContentForCurrentState(careerUUID)

			// Update swiper navigation constraints
			this.updateSwiperNavigation(careerUUID)
		}

		return success
	})

	public resetCareerToBeginning = action((careerUUID: CareerUUID): void => {
		const career = this.getCareer(careerUUID)
		if (!career) return

		// Reset navigation state in NavigationManager
		navigationManagerClass.resetCareerNavigationToBeginning(careerUUID)

		// Clear challenge completion state
		career.completedChallengeIds.clear()
		// Note: Challenge state reset will be handled by ChatManager if needed

		// Reset seen challenges and furthest position
		career.seenChallengeUUIDs.clear()
		career.furthestSeenChallengeUuidOrTextUuid = ""

		// Get the first text child ID for saving progress
		const firstMainSlide = navigationManagerClass.getMainSlides(careerUUID)[0]
		let initialPositionId: string

		if (firstMainSlide.type === "challenge") {
			initialPositionId = firstMainSlide.data.challengeUUID
		} else {
			const firstTextChild = firstMainSlide.data.children[0]
			initialPositionId = firstTextChild.id
		}

		// Set and save the beginning position
		career.savedCurrentPosition = initialPositionId
		career.furthestSeenChallengeUuidOrTextUuid = initialPositionId

		// Update right content for current state
		this.updateRightContentForCurrentState(careerUUID)

		// Update swiper navigation
		this.updateSwiperNavigation(careerUUID)

		// Save progress to beginning position
		void saveCareerProgress(careerUUID, initialPositionId, true)
	})

	public logout(): void {
		this.careers.clear()
		this.isDoneInitializing = false
	}
}

const careerQuestClass = new CareerQuestClass()

export default careerQuestClass
