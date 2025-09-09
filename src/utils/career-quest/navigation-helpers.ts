import { CareerUUID } from "@bluedotrobots/common-ts/types/utils"
import getCareerQuestClass from "../../classes/career-quest-class"
import getNavigationManagerClass from "../../classes/navigation-manager-class"

interface NavigationContext {
	careerUUID: CareerUUID
	currentMainSlideIndex: number
	currentTextChildIndex: number
}

/**
 * Handles navigation when moving forward (ArrowDown/scroll down)
 */
export function handleForwardNavigation(context: NavigationContext): void {
	const { careerUUID, currentTextChildIndex } = context
	const currentSlide = getNavigationManagerClass().getCurrentMainSlide(careerUUID)

	if (currentSlide.type === "challenge") {
		// Challenge slide - try to move to next main slide
		getCareerQuestClass().handleGoToNextMainSection(careerUUID)
		return
	}

	// Block all navigation if any morphing text is animating
	if (getNavigationManagerClass().isAnyMorphingTextAnimating(careerUUID)) {
		return
	}

	// Check if current child is morphing text
	const currentChild = currentSlide.data.children[currentTextChildIndex]
	if (currentChild.type === "morphingText") {
		// Try to advance morphing variant first
		const canAdvance = getCareerQuestClass().canAdvanceMorphingText(careerUUID, currentChild.id)
		if (canAdvance) {
			getCareerQuestClass().advanceMorphingText(careerUUID, currentChild.id)
			return
		}
		// If we can't advance in morphing text, allow normal text navigation
		const totalTextChildren = currentSlide.data.children.length
		const isAtLastTextChild = currentTextChildIndex === totalTextChildren - 1
		const hasOnlyOneChild = totalTextChildren === 1

		if (hasOnlyOneChild || isAtLastTextChild) {
			// Move to next main slide if possible
			getCareerQuestClass().handleGoToNextMainSection(careerUUID)
		} else {
			// Move to next text child
			getCareerQuestClass().handleGoToNextTextChild(careerUUID)
		}
		return
	}

	const totalTextChildren = currentSlide.data.children.length
	const isAtLastTextChild = currentTextChildIndex === totalTextChildren - 1
	const hasOnlyOneChild = totalTextChildren === 1

	if (hasOnlyOneChild || isAtLastTextChild) {
		// Move to next main slide if possible
		getCareerQuestClass().handleGoToNextMainSection(careerUUID)
	} else {
		// Move to next text child
		getCareerQuestClass().handleGoToNextTextChild(careerUUID)
	}
}

/**
 * Handles navigation when moving backward (ArrowUp/scroll up)
 */
export function handleBackwardNavigation(context: NavigationContext): void {
	const { careerUUID, currentTextChildIndex } = context
	const currentSlide = getNavigationManagerClass().getCurrentMainSlide(careerUUID)

	if (currentSlide.type === "challenge") {
		// Challenge slide - always go to previous main slide
		getCareerQuestClass().handleGoToPreviousMainSection(careerUUID)
		return
	}

	// Block all navigation if any morphing text is animating
	if (getNavigationManagerClass().isAnyMorphingTextAnimating(careerUUID)) {
		return
	}

	// Check if current child is morphing text
	const currentChild = currentSlide.data.children[currentTextChildIndex]
	if (currentChild.type === "morphingText") {
		// Try to move to previous morphing variant
		const canGoBack = getNavigationManagerClass().canGoBackMorphingText(careerUUID, currentChild.id)
		if (canGoBack) {
			getCareerQuestClass().goBackMorphingText(careerUUID, currentChild.id)
			return
		}
		// If we can't go back in morphing text and we're not at first text child,
		// allow navigation to previous text child
		const isAtFirstTextChild = currentTextChildIndex === 0
		if (!isAtFirstTextChild) {
			getCareerQuestClass().handleGoToPreviousTextChild(careerUUID)
			return
		}
		// If we're at first text child, allow navigation to previous main section
		getCareerQuestClass().handleGoToPreviousMainSection(careerUUID)
		return
	}

	const isAtFirstTextChild = currentTextChildIndex === 0
	if (!isAtFirstTextChild) {
		// Move to previous text child
		getCareerQuestClass().handleGoToPreviousTextChild(careerUUID)
	} else {
		getCareerQuestClass().handleGoToPreviousMainSection(careerUUID)
	}
}

/**
 * Checks if navigation should be blocked due to cooldown or transitioning state
 */
export function shouldBlockNavigation(careerUUID: CareerUUID): boolean {
	const now = Date.now()
	return now - getCareerQuestClass().getLastSlideChangeTime(careerUUID) < getCareerQuestClass().SLIDE_COOLDOWN
}
