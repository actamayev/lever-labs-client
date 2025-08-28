import type { CareerUUID } from "@bluedotrobots/common-ts"
import careerQuestClass from "../../classes/career-quest-class"

export interface NavigationContext {
	careerUUID: CareerUUID
	currentMainSlideIndex: number
	currentTextChildIndex: number
}

/**
 * Handles navigation when moving forward (ArrowDown/scroll down)
 */
export function handleForwardNavigation(context: NavigationContext): void {
	const { careerUUID, currentTextChildIndex } = context
	const currentSlide = careerQuestClass.getCurrentMainSlide(careerUUID)

	if (currentSlide.type === "challenge") {
		// Challenge slide - try to move to next main slide
		careerQuestClass.handleGoToNextMainSection(careerUUID)
		return
	}

	// Block all navigation if any morphing text is animating
	if (careerQuestClass.isAnyMorphingTextAnimating(careerUUID)) {
		return
	}

	// Check if current child is morphing text
	const currentChild = currentSlide.data.children[currentTextChildIndex]
	if (currentChild.type === "morphingText") {
		// Try to advance morphing variant first
		const canAdvance = careerQuestClass.canAdvanceMorphingText(careerUUID, currentChild.id)
		if (canAdvance) {
			careerQuestClass.advanceMorphingText(careerUUID, currentChild.id)
			return
		}
		// If we can't advance in morphing text, allow normal text navigation
		const totalTextChildren = currentSlide.data.children.length
		const isAtLastTextChild = currentTextChildIndex === totalTextChildren - 1
		const hasOnlyOneChild = totalTextChildren === 1

		if (hasOnlyOneChild || isAtLastTextChild) {
			// Move to next main slide if possible
			careerQuestClass.handleGoToNextMainSection(careerUUID)
		} else {
			// Move to next text child
			careerQuestClass.handleGoToNextTextChild(careerUUID)
		}
		return
	}

	const totalTextChildren = currentSlide.data.children.length
	const isAtLastTextChild = currentTextChildIndex === totalTextChildren - 1
	const hasOnlyOneChild = totalTextChildren === 1

	if (hasOnlyOneChild || isAtLastTextChild) {
		// Move to next main slide if possible
		careerQuestClass.handleGoToNextMainSection(careerUUID)
	} else {
		// Move to next text child
		careerQuestClass.handleGoToNextTextChild(careerUUID)
	}
}

/**
 * Handles navigation when moving backward (ArrowUp/scroll up)
 */
export function handleBackwardNavigation(context: NavigationContext): void {
	const { careerUUID, currentTextChildIndex } = context
	const currentSlide = careerQuestClass.getCurrentMainSlide(careerUUID)

	if (currentSlide.type === "challenge") {
		// Challenge slide - always go to previous main slide
		careerQuestClass.handleGoToPreviousMainSection(careerUUID)
		return
	}

	// Block all navigation if any morphing text is animating
	if (careerQuestClass.isAnyMorphingTextAnimating(careerUUID)) {
		return
	}

	// Check if current child is morphing text
	const currentChild = currentSlide.data.children[currentTextChildIndex]
	if (currentChild.type === "morphingText") {
		// Try to move to previous morphing variant
		const canGoBack = careerQuestClass.canGoBackMorphingText(careerUUID, currentChild.id)
		if (canGoBack) {
			careerQuestClass.goBackMorphingText(careerUUID, currentChild.id)
			return
		}
		// If we can't go back in morphing text and we're not at first text child,
		// allow navigation to previous text child
		const isAtFirstTextChild = currentTextChildIndex === 0
		if (!isAtFirstTextChild) {
			careerQuestClass.handleGoToPreviousTextChild(careerUUID)
			return
		}
		// If we're at first text child, allow navigation to previous main section
		careerQuestClass.handleGoToPreviousMainSection(careerUUID)
		return
	}

	const isAtFirstTextChild = currentTextChildIndex === 0
	if (!isAtFirstTextChild) {
		// Move to previous text child
		careerQuestClass.handleGoToPreviousTextChild(careerUUID)
	} else {
		careerQuestClass.handleGoToPreviousMainSection(careerUUID)
	}
}

/**
 * Checks if navigation should be blocked due to cooldown or transitioning state
 */
export function shouldBlockNavigation(careerUUID: CareerUUID): boolean {
	const now = Date.now()
	return now - careerQuestClass.getLastSlideChangeTime(careerUUID) < careerQuestClass.SLIDE_COOLDOWN
}
