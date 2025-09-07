"use client"

import { action, makeAutoObservable, observable } from "mobx"
import type { Swiper as SwiperType } from "swiper"
import {
	CareerUUID,
	ChallengeUUID,
	CqChallengeData,
} from "@bluedotrobots/common-ts"
import { DEFAULT_TRANSITION_DURATION } from "../utils/constants/constants"

// Navigation state interfaces
interface NavigationState {
	currentMainSlideIndex: number
	textChildIndices: Map<string, number> // textParentId -> currentTextChildIndex
	morphingTextIndices: Map<string, number> // morphingTextId -> currentVariantIndex
	morphingAnimationStates: Map<string, boolean> // morphingTextId -> isAnimating
	mainSlides: MainSlide[]
}

interface SwiperState {
	swiperInstance: SwiperType | null
	textParentSwipers: Map<string, SwiperType | null>
}

interface TransitionState {
	isTransitioning: boolean
	currentTransitionDuration: number
	lastSlideChangeTime: number
}

interface CareerNavigationInstance extends NavigationState, SwiperState, TransitionState {
	careerUUID: CareerUUID
}

export class NavigationManagerClass {
	// Navigation data: careerUUID -> NavigationInstance
	public careerNavigations = observable.map<CareerUUID, CareerNavigationInstance>()
	public readonly SLIDE_COOLDOWN = 200 // ms

	constructor() {
		makeAutoObservable(this)
	}

	// ========================================
	// INITIALIZATION
	// ========================================

	public initializeCareerNavigation = action((
		careerUUID: CareerUUID,
		mainSlides: MainSlide[],
		textChildIndices: Map<string, number>,
		morphingTextIndices: Map<string, number>,
		morphingAnimationStates: Map<string, boolean>
	): void => {
		if (this.careerNavigations.has(careerUUID)) return

		this.careerNavigations.set(careerUUID, {
			careerUUID,
			// Navigation state
			currentMainSlideIndex: 0,
			textChildIndices,
			morphingTextIndices,
			morphingAnimationStates,
			mainSlides,
			// Swiper state
			swiperInstance: null,
			textParentSwipers: new Map<string, SwiperType | null>(),
			// Transition state
			isTransitioning: false,
			currentTransitionDuration: DEFAULT_TRANSITION_DURATION,
			lastSlideChangeTime: 0
		})
	})

	private getNavigation(careerUUID: CareerUUID): CareerNavigationInstance | undefined {
		return this.careerNavigations.get(careerUUID)
	}

	// ========================================
	// NAVIGATION STATE MANAGEMENT
	// ========================================

	public getCurrentMainSlideIndex(careerUUID: CareerUUID): number {
		const navigation = this.getNavigation(careerUUID)
		return navigation?.currentMainSlideIndex || 0
	}

	public getCurrentTextChildIndex(careerUUID: CareerUUID, textParentId?: string): number {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return 0

		// If textParentId is provided, return the index for that specific text parent
		if (textParentId) {
			return navigation.textChildIndices.get(textParentId) || 0
		}

		// If no textParentId provided, return the index for the current active text parent
		const currentSlide = this.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return 0

		return navigation.textChildIndices.get(currentSlide.id) || 0
	}

	public setCurrentMainSlideIndex = action((careerUUID: CareerUUID, index: number): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return
		navigation.currentMainSlideIndex = index
	})

	public setCurrentTextChildIndex = action((careerUUID: CareerUUID, textParentId: string, index: number): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return
		navigation.textChildIndices.set(textParentId, index)
	})

	public resetAllTextChildIndices = action((careerUUID: CareerUUID): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return
		navigation.textChildIndices.forEach((_, textParentId): void => {
			navigation.textChildIndices.set(textParentId, 0)
		})
	})

	public getNavigationIndices(careerUUID: CareerUUID): { mainSlideIndex: number; textChildIndex: number } {
		const navigation = this.getNavigation(careerUUID)
		const mainSlideIndex = navigation?.currentMainSlideIndex || 0

		// Get text child index for the current main slide
		const currentSlide = this.getCurrentMainSlide(careerUUID)
		const textChildIndex = currentSlide.type === "textParent"
			? navigation?.textChildIndices.get(currentSlide.id) || 0
			: 0

		return { mainSlideIndex, textChildIndex }
	}

	public getMainSlides(careerUUID: CareerUUID): MainSlide[] {
		const navigation = this.getNavigation(careerUUID)
		return navigation?.mainSlides || []
	}

	public getCurrentMainSlide(careerUUID: CareerUUID): MainSlide {
		const mainSlides = this.getMainSlides(careerUUID)
		const currentMainSlideIndex = this.getCurrentMainSlideIndex(careerUUID)
		return mainSlides[currentMainSlideIndex]
	}

	// ========================================
	// MORPHING TEXT MANAGEMENT
	// ========================================

	public getCurrentMorphingIndex(careerUUID: CareerUUID, morphingTextId: string): number {
		const navigation = this.getNavigation(careerUUID)
		return navigation?.morphingTextIndices.get(morphingTextId) || 0
	}

	public setMorphingIndex = action((careerUUID: CareerUUID, morphingTextId: string, index: number): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return
		navigation.morphingTextIndices.set(morphingTextId, index)
	})

	public canAdvanceMorphingText(careerUUID: CareerUUID, morphingTextId: string, morphingSection: MorphingTextSection): boolean {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return false

		// Check if animation is in progress
		const isAnimating = navigation.morphingAnimationStates.get(morphingTextId) || false
		if (isAnimating) return false

		const currentIndex = this.getCurrentMorphingIndex(careerUUID, morphingTextId)
		const maxIndex = morphingSection.morphingVariants.length - 1
		return currentIndex < maxIndex
	}

	public canGoBackMorphingText(careerUUID: CareerUUID, morphingTextId: string): boolean {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return false

		// Check if animation is in progress
		const isAnimating = navigation.morphingAnimationStates.get(morphingTextId) || false
		if (isAnimating) return false

		const currentIndex = this.getCurrentMorphingIndex(careerUUID, morphingTextId)
		return currentIndex > 0
	}

	public setMorphingAnimationState = action((careerUUID: CareerUUID, morphingTextId: string, isAnimating: boolean): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return
		navigation.morphingAnimationStates.set(morphingTextId, isAnimating)
	})

	public isAnyMorphingTextAnimating(careerUUID: CareerUUID): boolean {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return false

		// Check if any morphing text in the current slide is animating
		const currentSlide = this.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return false

		for (const child of currentSlide.data.children) {
			if (child.type === "morphingText") {
				const isAnimating = navigation.morphingAnimationStates.get(child.id) || false
				if (isAnimating) return true
			}
		}
		return false
	}

	// ========================================
	// SWIPER MANAGEMENT
	// ========================================

	public setSwiperInstance = action((careerUUID: CareerUUID, swiperInstance: SwiperType): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return
		navigation.swiperInstance = swiperInstance
	})

	public getSwiperInstance(careerUUID: CareerUUID): SwiperType | null {
		const navigation = this.getNavigation(careerUUID)
		return navigation?.swiperInstance || null
	}

	public setTextParentSwiperInstance = action((
		careerUUID: CareerUUID,
		textParentId: string,
		swiperInstance: SwiperType
	): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return
		navigation.textParentSwipers.set(textParentId, swiperInstance)
	})

	public getTextParentSwiperInstance(
		careerUUID: CareerUUID,
		textParentId: string
	): SwiperType | null {
		const navigation = this.getNavigation(careerUUID)
		return navigation?.textParentSwipers.get(textParentId) || null
	}

	public cleanupAllSwipers = action((careerUUID: CareerUUID): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return
		navigation.swiperInstance = null
		navigation.textParentSwipers.clear()
	})

	private syncTextParentSwiper = action((careerUUID: CareerUUID, textParentId: string, targetIndex: number): void => {
		const textParentSwiper = this.getTextParentSwiperInstance(careerUUID, textParentId)
		if (!textParentSwiper) return

		// Only sync if not already at the correct position
		if (textParentSwiper.activeIndex !== targetIndex) {
			textParentSwiper.slideTo(targetIndex, 0) // Instant, no animation
		}
	})

	// ========================================
	// TRANSITION STATE MANAGEMENT
	// ========================================

	public getIsTransitioning(careerUUID: CareerUUID): boolean {
		const navigation = this.getNavigation(careerUUID)
		return navigation?.isTransitioning || false
	}

	public setIsTransitioning = action((careerUUID: CareerUUID, isTransitioning: boolean): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return
		navigation.isTransitioning = isTransitioning
	})

	public getLastSlideChangeTime(careerUUID: CareerUUID): number {
		const navigation = this.getNavigation(careerUUID)
		return navigation?.lastSlideChangeTime ?? 0
	}

	public setLastSlideChangeTime = action((careerUUID: CareerUUID, timestamp: number): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return
		navigation.lastSlideChangeTime = timestamp
	})

	public setCurrentTransitionDuration = action((careerUUID: CareerUUID, duration: number): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return
		navigation.currentTransitionDuration = duration
	})

	public getCurrentTransitionDuration = (careerUUID: CareerUUID): number => {
		const navigation = this.getNavigation(careerUUID)
		return navigation?.currentTransitionDuration || DEFAULT_TRANSITION_DURATION
	}

	// ========================================
	// NAVIGATION VALIDATION
	// ========================================

	public canAdvanceToNextMain = (
		careerUUID: CareerUUID,
		slideIndex: number,
		isCodeCorrectCallback: (challengeData: CqChallengeData) => boolean
	): boolean => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return false

		const mainSlides = navigation.mainSlides

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
		return isCodeCorrectCallback(currentSlide.data)
	}

	public canAdvanceToNextTextChild(careerUUID: CareerUUID): boolean {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return false

		const currentSlide = this.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return false

		const currentTextChildIndex = this.getCurrentTextChildIndex(careerUUID)

		// Check if there's a next text child
		return currentTextChildIndex < currentSlide.data.children.length - 1
	}

	// ========================================
	// POSITION MANAGEMENT
	// ========================================

	public findPositionIndices(careerUUID: CareerUUID, savedPosition: string): { mainSlideIndex: number; textChildIndex: number } | null {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation || !savedPosition) return null

		// Search through sections to find the position
		for (let mainIndex = 0; mainIndex < navigation.mainSlides.length; mainIndex++) {
			const slide = navigation.mainSlides[mainIndex]

			if (slide.type === "challenge") {
				// Check if this is a challenge UUID match
				if (slide.data.challengeUUID === savedPosition) {
					return { mainSlideIndex: mainIndex, textChildIndex: 0 }
				}
			} else {
				// Check if this is a text child ID match
				for (let childIndex = 0; childIndex < slide.data.children.length; childIndex++) {
					if (slide.data.children[childIndex].id === savedPosition) {
						return { mainSlideIndex: mainIndex, textChildIndex: childIndex }
					}
				}
			}
		}

		return null // Position not found
	}

	public restoreNavigationFromSavedPosition = action((careerUUID: CareerUUID, savedPosition?: string): boolean => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return false

		if (!savedPosition) {
			// No saved position, start at beginning
			navigation.currentMainSlideIndex = 0
			// Reset all text parent indices to 0
			navigation.textChildIndices.forEach((_, textParentId): void => {
				navigation.textChildIndices.set(textParentId, 0)
			})
			return true
		}

		// Try to find the saved position
		const positionIndices = this.findPositionIndices(careerUUID, savedPosition)
		if (!positionIndices) {
			// Fallback to beginning if position not found
			navigation.currentMainSlideIndex = 0
			// Reset all text parent indices to 0
			navigation.textChildIndices.forEach((_, textParentId): void => {
				navigation.textChildIndices.set(textParentId, 0)
			})
			return true
		}

		// Set navigation indices from saved position
		navigation.currentMainSlideIndex = positionIndices.mainSlideIndex
		// Set the text child index for the specific text parent that contains this position
		const currentSlide = this.getMainSlides(careerUUID)[positionIndices.mainSlideIndex]
		if (currentSlide.type === "textParent") {
			navigation.textChildIndices.set(currentSlide.id, positionIndices.textChildIndex)
			// Sync the text parent swiper to the restored position
			this.syncTextParentSwiper(careerUUID, currentSlide.id, positionIndices.textChildIndex)
		}
		return true
	})

	public navigateToPosition = action((careerUUID: CareerUUID, positionId: string): boolean => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return false

		// Find the position indices
		const positionIndices = this.findPositionIndices(careerUUID, positionId)
		if (!positionIndices) {
			console.warn("Cannot navigate to position: position not found", positionId)
			return false
		}

		// Update navigation indices
		navigation.currentMainSlideIndex = positionIndices.mainSlideIndex

		// For text parent sections, set the specific text child index
		const targetSlide = navigation.mainSlides[positionIndices.mainSlideIndex]
		if (targetSlide.type === "textParent") {
			navigation.textChildIndices.set(targetSlide.id, positionIndices.textChildIndex)
		}

		// Sync main swiper if it exists
		if (navigation.swiperInstance) {
			navigation.swiperInstance.slideTo(positionIndices.mainSlideIndex, 0) // Instant navigation
		}

		// Sync text parent swiper if needed
		if (targetSlide.type === "textParent") {
			this.syncTextParentSwiper(careerUUID, targetSlide.id, positionIndices.textChildIndex)
		}

		return true
	})

	// ========================================
	// NAVIGATION ACTIONS
	// ========================================

	public advanceMorphingText = action((
		careerUUID: CareerUUID,
		morphingTextId: string,
		morphingSection: MorphingTextSection,
		onRightContentUpdate?: () => void
	): void => {
		if (!this.canAdvanceMorphingText(careerUUID, morphingTextId, morphingSection)) return

		const currentIndex = this.getCurrentMorphingIndex(careerUUID, morphingTextId)
		const nextIndex = currentIndex + 1

		this.setMorphingIndex(careerUUID, morphingTextId, nextIndex)

		// Update right content when morphing index changes
		if (onRightContentUpdate) {
			onRightContentUpdate()
		}
	})

	public goBackMorphingText = action((careerUUID: CareerUUID, morphingTextId: string, onRightContentUpdate?: () => void): void => {
		if (!this.canGoBackMorphingText(careerUUID, morphingTextId)) return

		const currentIndex = this.getCurrentMorphingIndex(careerUUID, morphingTextId)
		const prevIndex = currentIndex - 1

		this.setMorphingIndex(careerUUID, morphingTextId, prevIndex)

		// Update right content when morphing index changes
		if (onRightContentUpdate) {
			onRightContentUpdate()
		}
	})

	// Student-only methods that don't trigger progress saving
	private executeMorphingTextAdvance = action((careerUUID: CareerUUID, morphingTextId: string, morphingSection: MorphingTextSection): void => {
		if (!this.canAdvanceMorphingText(careerUUID, morphingTextId, morphingSection)) return

		const currentIndex = this.getCurrentMorphingIndex(careerUUID, morphingTextId)
		const nextIndex = currentIndex + 1

		this.setMorphingIndex(careerUUID, morphingTextId, nextIndex)
	})

	private executeMorphingTextGoBack = action((careerUUID: CareerUUID, morphingTextId: string): void => {
		if (!this.canGoBackMorphingText(careerUUID, morphingTextId)) return

		const currentIndex = this.getCurrentMorphingIndex(careerUUID, morphingTextId)
		const prevIndex = currentIndex - 1

		this.setMorphingIndex(careerUUID, morphingTextId, prevIndex)
	})

	// eslint-disable-next-line complexity
	public executeNavigationCommand = action((
		careerUUID: CareerUUID,
		navigationCommand: string,
		targetSlideId: string,
		morphingSections: Map<string, MorphingTextSection>,
		onNextMain?: () => Promise<void>,
		onPrevMain?: () => Promise<void>,
		onNextText?: () => void,
		onPrevText?: () => void
	): boolean => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return false

		try {
			switch (navigationCommand) {
				case "next_main":
					if (onNextMain) void onNextMain()
					break
				case "prev_main":
					if (onPrevMain) void onPrevMain()
					break
				case "next_text":
					if (onNextText) onNextText()
					break
				case "prev_text":
					if (onPrevText) onPrevText()
					break
				default:
					// Handle morphing text commands
					if (navigationCommand.startsWith("advance_morph:")) {
						const morphingTextId = navigationCommand.substring("advance_morph:".length)
						const morphingSection = morphingSections.get(morphingTextId)
						if (morphingSection) {
							// Execute morphing text navigation without saving progress (students only)
							this.executeMorphingTextAdvance(careerUUID, morphingTextId, morphingSection)
						}
					} else if (navigationCommand.startsWith("back_morph:")) {
						const morphingTextId = navigationCommand.substring("back_morph:".length)
						// Execute morphing text navigation without saving progress (students only)
						this.executeMorphingTextGoBack(careerUUID, morphingTextId)
					} else {
						console.warn("Unknown navigation command:", navigationCommand)
						return false
					}
			}

			// For morphing text commands, don't verify position since targetSlideId is the morphingTextId
			if (!navigationCommand.includes("morph:")) {
				const currentPosition = this.getCurrentPositionId(careerUUID)
				if (currentPosition !== targetSlideId) {
					console.warn("Navigation command succeeded but position mismatch:", {
						expected: targetSlideId,
						actual: currentPosition,
						command: navigationCommand
					})
				}
			}

			return true
		} catch (error) {
			console.error("Navigation command execution failed:", {
				command: navigationCommand,
				targetSlideId,
				error
			})
			return false
		}
	})

	public getCurrentPositionId(careerUUID: CareerUUID): string {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return ""

		const currentSlide = this.getCurrentMainSlide(careerUUID)

		if (currentSlide.type === "challenge") {
			return currentSlide.data.challengeUUID
		}

		// For text parent sections, return the current text child ID
		const currentTextChildIndex = this.getCurrentTextChildIndex(careerUUID)
		const textChild = currentSlide.data.children[currentTextChildIndex]
		return textChild.id
	}

	public onTextSlideChange = action((_careerUUID: CareerUUID, onRightContentUpdate?: () => void): void => {
		// Centralize right content update logic
		if (onRightContentUpdate) {
			onRightContentUpdate()
		}
	})

	public handleGoToNextTextChild = action((
		careerUUID: CareerUUID,
		onTextChildIndexChange?: (careerUUID: CareerUUID, newIndex: number, isGoingBackward?: boolean) => void,
		onRightContentUpdate?: () => void
	): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return
		const currentSlide = this.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return

		// Check if we can advance to the next text child
		if (!this.canAdvanceToNextTextChild(careerUUID)) return

		// Call exit trigger function before leaving current slide
		const currentTextChildIndex = this.getCurrentTextChildIndex(careerUUID)
		const currentTextChild = currentSlide.data.children[currentTextChildIndex]
		if (currentTextChild.triggerFunctionExit) {
			currentTextChild.triggerFunctionExit().catch((error): void => {
				console.error("Error executing exit trigger function:", error)
			})
		}

		// Normal navigation
		const textParentSwiperInstance = this.getTextParentSwiperInstance(careerUUID, currentSlide.id)
		if (!textParentSwiperInstance) return

		this.setLastSlideChangeTime(careerUUID, Date.now())
		this.setIsTransitioning(careerUUID, true)
		textParentSwiperInstance.slideNext()
		this.setIsTransitioning(careerUUID, false)
		const newIndex = textParentSwiperInstance.activeIndex
		this.onTextSlideChange(careerUUID, onRightContentUpdate)

		if (onTextChildIndexChange) {
			onTextChildIndexChange(careerUUID, newIndex, false)
		}

		// Call enter trigger function after arriving at new slide
		const newTextChild = currentSlide.data.children[newIndex]
		if (newTextChild.triggerFunctionEnter) {
			newTextChild.triggerFunctionEnter().catch((error): void => {
				console.error("Error executing enter trigger function:", error)
			})
		}
	})

	public handleGoToPreviousTextChild = action((
		careerUUID: CareerUUID,
		onTextChildIndexChange?: (careerUUID: CareerUUID, newIndex: number, isGoingBackward?: boolean) => void,
		onRightContentUpdate?: () => void
	): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return
		const currentSlide = this.getCurrentMainSlide(careerUUID)
		if (currentSlide.type !== "textParent") return

		const currentTextChildIndex = this.getCurrentTextChildIndex(careerUUID)
		const canGoPrev = currentTextChildIndex > 0
		const textParentSwiperInstance = this.getTextParentSwiperInstance(careerUUID, currentSlide.id)
		if (!canGoPrev || !textParentSwiperInstance) return

		// Call exit trigger function before leaving current slide
		const currentTextChild = currentSlide.data.children[currentTextChildIndex]
		if (currentTextChild.triggerFunctionExit) {
			currentTextChild.triggerFunctionExit().catch((error): void => {
				console.error("Error executing exit trigger function:", error)
			})
		}

		this.setLastSlideChangeTime(careerUUID, Date.now())
		this.setIsTransitioning(careerUUID, true)
		textParentSwiperInstance.slidePrev()
		this.setIsTransitioning(careerUUID, false)
		const newIndex = textParentSwiperInstance.activeIndex
		this.onTextSlideChange(careerUUID, onRightContentUpdate)

		if (onTextChildIndexChange) {
			onTextChildIndexChange(careerUUID, newIndex, true)
		}

		// Call enter trigger function after arriving at new slide
		const newTextChild = currentSlide.data.children[newIndex]
		if (newTextChild.triggerFunctionEnter) {
			newTextChild.triggerFunctionEnter().catch((error): void => {
				console.error("Error executing enter trigger function:", error)
			})
		}
	})

	public updateSwiperNavigation = action((careerUUID: CareerUUID, canAdvanceToNextMainCallback: (slideIndex: number) => boolean): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation?.swiperInstance) return

		const canAdvance = canAdvanceToNextMainCallback(navigation.currentMainSlideIndex)
		const canGoBack = navigation.currentMainSlideIndex > 0

		navigation.swiperInstance.allowSlideNext = canAdvance
		navigation.swiperInstance.allowSlidePrev = canGoBack
	})

	private handleMainSlideTransitionNavigation = action(async (
		careerUUID: CareerUUID,
		targetMainSlideIndex: number,
		transition: TextTransition,
		onMainSlideChange?: () => void
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
			if (onMainSlideChange) {
				onMainSlideChange()
			}
		}

		// 4. Brief pause, then fade-in
		await this.sleep(50)
		this.setIsTransitioning(careerUUID, false)
	})

	private sleep(ms: number): Promise<void> {
		return new Promise((resolve): NodeJS.Timeout => setTimeout(resolve, ms))
	}

	public handleGoToNextMainSection = action(async (
		careerUUID: CareerUUID,
		canAdvanceToNextMainCallback: (slideIndex: number) => boolean,
		onMainSlideChange?: () => void
	): Promise<void> => {
		const navigation = this.getNavigation(careerUUID)
		const swiperInstance = this.getSwiperInstance(careerUUID)
		if (!navigation || !swiperInstance) return

		const canAdvance = canAdvanceToNextMainCallback(navigation.currentMainSlideIndex)
		if (!canAdvance) return

		// Call exit trigger function before leaving current slide if it's a text parent
		const currentSlide = this.getCurrentMainSlide(careerUUID)
		if (currentSlide.type === "textParent") {
			const currentTextChildIndex = this.getCurrentTextChildIndex(careerUUID, currentSlide.id)
			const currentTextChild = currentSlide.data.children[currentTextChildIndex]
			if (currentTextChild.triggerFunctionExit) {
				currentTextChild.triggerFunctionExit().catch((error): void => {
					console.error("Error executing exit trigger function:", error)
				})
			}
		}

		// IMPORTANT: Ensure navigation is allowed before attempting to navigate
		const canGoPrev = navigation.currentMainSlideIndex > 0
		swiperInstance.allowSlidePrev = canGoPrev
		swiperInstance.allowSlideNext = canAdvance

		// Check for transition on current section
		if (currentSlide.type === "textParent" && currentSlide.data.transition) {
			await this.handleMainSlideTransitionNavigation(
				careerUUID,
				navigation.currentMainSlideIndex + 1,
				currentSlide.data.transition,
				onMainSlideChange
			)
			return
		}

		// Normal navigation
		this.setLastSlideChangeTime(careerUUID, Date.now())
		this.setIsTransitioning(careerUUID, true)
		swiperInstance.slideNext()
		this.setIsTransitioning(careerUUID, false)
		if (onMainSlideChange) {
			onMainSlideChange()
		}
	})

	public handleGoToPreviousMainSection = action(async (
		careerUUID: CareerUUID,
		canAdvanceToNextMainCallback: (slideIndex: number) => boolean,
		onMainSlideChange?: () => void
	): Promise<void> => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return
		const swiperInstance = this.getSwiperInstance(careerUUID)
		const canGoPrev = navigation.currentMainSlideIndex > 0
		if (!swiperInstance || !canGoPrev) return

		// Call exit trigger function before leaving current slide if it's a text parent
		const currentSlide = this.getCurrentMainSlide(careerUUID)
		if (currentSlide.type === "textParent") {
			const currentTextChildIndex = this.getCurrentTextChildIndex(careerUUID, currentSlide.id)
			const currentTextChild = currentSlide.data.children[currentTextChildIndex]
			if (currentTextChild.triggerFunctionExit) {
				currentTextChild.triggerFunctionExit().catch((error): void => {
					console.error("Error executing exit trigger function:", error)
				})
			}
		}

		// IMPORTANT: Ensure navigation is allowed before attempting to navigate
		swiperInstance.allowSlidePrev = canGoPrev
		swiperInstance.allowSlideNext = canAdvanceToNextMainCallback(navigation.currentMainSlideIndex)

		// Check if the target (previous) section has a transition
		const targetMainSlideIndex = navigation.currentMainSlideIndex - 1
		const targetSlide = this.getMainSlides(careerUUID)[targetMainSlideIndex]

		if (targetSlide.type === "textParent" && targetSlide.data.transition) {
			await this.handleMainSlideTransitionNavigation(
				careerUUID,
				targetMainSlideIndex,
				targetSlide.data.transition,
				onMainSlideChange
			)
			return
		}

		// Normal navigation
		this.setLastSlideChangeTime(careerUUID, Date.now())
		this.setIsTransitioning(careerUUID, true)
		swiperInstance.slidePrev()
		this.setIsTransitioning(careerUUID, false)
		if (onMainSlideChange) {
			onMainSlideChange()
		}
	})

	public changeMainSlideToCqChat = action((careerUUID: CareerUUID, challengeUUID: ChallengeUUID, onMainSlideChange?: () => void): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation || !navigation.swiperInstance) return
		const index = navigation.mainSlides.findIndex((slide): boolean => {
			if (slide.type === "textParent") return false
			return slide.data.challengeUUID === challengeUUID
		})
		if (index === -1 || index === navigation.currentMainSlideIndex) return

		// IMPORTANT: Enable navigation in both directions before attempting to navigate
		navigation.swiperInstance.allowSlideNext = true
		navigation.swiperInstance.allowSlidePrev = true

		this.setLastSlideChangeTime(careerUUID, Date.now())
		this.setIsTransitioning(careerUUID, true)
		navigation.swiperInstance.slideTo(index)
		this.setIsTransitioning(careerUUID, false)
		if (onMainSlideChange) {
			onMainSlideChange()
		}
	})

	public handleTextChildIndexChange = action((careerUUID: CareerUUID, newIndex: number, isGoingBackward?: boolean): void => {
		const navigation = this.getNavigation(careerUUID)
		const swiper = this.getSwiperInstance(careerUUID)
		if (!navigation || !swiper) return

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
	})

	public handleMainSlideChange = action((careerUUID: CareerUUID): void => {
		const navigation = this.getNavigation(careerUUID)
		const swiper = this.getSwiperInstance(careerUUID)
		if (!navigation || !swiper) return

		const newIndex = swiper.activeIndex
		const previousIndex = navigation.currentMainSlideIndex
		const isGoingBackward = newIndex < previousIndex

		// Update class state instead of component state
		this.setCurrentMainSlideIndex(careerUUID, newIndex)

		const currentSlide = this.getMainSlides(careerUUID)[newIndex]

		if (currentSlide.type === "challenge") {
			// For challenge slides, reset all text parent indices to 0
			navigation.textChildIndices.forEach((_, textParentId): void => {
				navigation.textChildIndices.set(textParentId, 0)
			})
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

		// Sync the text parent swiper to the correct position
		this.syncTextParentSwiper(careerUUID, currentSlide.id, textChildIndex)

		// Call enter trigger function for the new text child
		if (textChild.triggerFunctionEnter) {
			textChild.triggerFunctionEnter().catch((error): void => {
				console.error("Error executing enter trigger function:", error)
			})
		}
	})

	public resetCareerNavigationToBeginning = action((careerUUID: CareerUUID): void => {
		const navigation = this.getNavigation(careerUUID)
		if (!navigation) return

		// Reset navigation indices
		navigation.currentMainSlideIndex = 0
		navigation.textChildIndices.forEach((_, textParentId): void => {
			navigation.textChildIndices.set(textParentId, 0)
		})

		// Reset morphing text indices
		navigation.morphingTextIndices.forEach((_, morphingTextId): void => {
			navigation.morphingTextIndices.set(morphingTextId, 0)
		})

		// Sync swipers if they exist
		if (navigation.swiperInstance) {
			navigation.swiperInstance.slideTo(0, 0)
		}

		// Sync text parent swiper for first slide if it's a text parent
		const firstMainSlide = navigation.mainSlides[0]
		if (firstMainSlide.type === "textParent") {
			this.syncTextParentSwiper(careerUUID, firstMainSlide.id, 0)
		}
	})

	// ========================================
	// CLEANUP
	// ========================================

	public logout(): void {
		this.careerNavigations.clear()
	}
}

const navigationManagerClass = new NavigationManagerClass()
export default navigationManagerClass
