/* eslint-disable max-depth */
/* eslint-disable @typescript-eslint/naming-convention */
import { isEmpty } from "lodash-es"
import { useCallback, useEffect, useRef } from "react"
import type { CareerUUID } from "@bluedotrobots/common-ts"
import careerQuestClass from "../../classes/career-quest-class"

// eslint-disable-next-line max-lines-per-function
export default function useMousewheelNavigation(careerUUID: CareerUUID): void {
	const currentMainSlideIndex = careerQuestClass.getCurrentMainSlideIndex(careerUUID)
	const currentTextChildIndex = careerQuestClass.getCurrentTextChildIndex(careerUUID)
	const gestureActive = useRef(false)
	const gestureTimeout = useRef<NodeJS.Timeout | null>(null)
	const hasNavigatedInGesture = useRef(false)
	const mainSlides = careerQuestClass.getMainSlides(careerUUID)
	const canAdvanceToNextMain = careerQuestClass.canAdvanceToNextMain(careerUUID, currentMainSlideIndex)
	const swiperInstance = careerQuestClass.getSwiperInstance(careerUUID)
	const textParentSwiperInstance = careerQuestClass.getTextParentSwiperInstance(careerUUID, mainSlides[currentMainSlideIndex].id)
	const GESTURE_END_DELAY = 40
	const MIN_DELTA_THRESHOLD = 5
	const isTransitioning = careerQuestClass.getIsTransitioning(careerUUID)

	// Helper function to check if the mouse is over a chat component
	const isMouseOverChatComponent = (event: WheelEvent): boolean => {
		const target = event.target as Element
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!target) return false

		// Check if the target or any of its parents is a chat component
		let element: Element | null = target
		while (element) {
			// Check for chat-related classes or data attributes
			if (
				element.classList.contains("chat-parent-component") ||
				element.classList.contains("chat-messages-framework") ||
				element.classList.contains("challenge-chat-interface") ||
				element.classList.contains("career-chat-interface") ||
				element.closest("[data-chat-component=\"true\"]") ||
				element.closest(".overflow-y-auto") // Chat messages container
			) {
				return true
			}
			element = element.parentElement
		}
		return false
	}

	// Helper function to check if we should allow normal scrolling in chat
	const shouldAllowChatScrolling = useCallback((): boolean => {
		// Get the current slide to check if it's a challenge
		const currentSlide = careerQuestClass.getCurrentMainSlide(careerUUID)
		if (
			currentSlide.type !== "challenge" &&
			!careerQuestClass.isCareerChatToggled(careerUUID)
		) return false

		if (currentSlide.type === "challenge") {
			const challengeMessages = careerQuestClass.getChallengeMessages(currentSlide.data)
			// Only allow normal scrolling if there are messages (length > 0)
			return !isEmpty(challengeMessages)
		}
		const careerMessages = careerQuestClass.getCareerChatMessages(careerUUID)
		return !isEmpty(careerMessages)
	}, [careerUUID])

	// eslint-disable-next-line max-lines-per-function
	useEffect(() => {
		if (!swiperInstance || isTransitioning) return

		// eslint-disable-next-line complexity, max-lines-per-function
		const handleWheel = (e: WheelEvent): void => {
			// Check if mouse is over chat component - if so, check message length
			if (isMouseOverChatComponent(e)) {
				// Only allow normal scrolling if there are messages
				if (shouldAllowChatScrolling()) {
					return // Don't prevent default, allow normal scrolling
				}
				// If no messages, continue with swiper navigation
			}

			e.preventDefault()

			// Ignore very small scroll movements (noise)
			if (Math.abs(e.deltaY) < MIN_DELTA_THRESHOLD) return

			// Respect cooldown and transitioning state
			const now = Date.now()
			if (now - careerQuestClass.getLastSlideChangeTime(careerUUID) < careerQuestClass.SLIDE_COOLDOWN) return

			// If this is the start of a new gesture
			if (!gestureActive.current) {
				gestureActive.current = true
				hasNavigatedInGesture.current = false
			}

			// Only navigate if we haven't already navigated in this gesture
			if (!hasNavigatedInGesture.current) {
				const currentSlide = careerQuestClass.getCurrentMainSlide(careerUUID)
				if (e.deltaY > 0) {
					// Scroll down - same logic as ArrowDown
					if (currentSlide.type === "challenge") {
						// Challenge slide - try to move to next main slide
						careerQuestClass.handleGoToNextMainSection(careerUUID)
						hasNavigatedInGesture.current = true
					} else {
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
								hasNavigatedInGesture.current = true
								return
							}
							// If we can't advance in morphing text, allow normal text navigation
							const totalTextChildren = currentSlide.data.children.length
							const isAtLastTextChild = currentTextChildIndex === totalTextChildren - 1
							const hasOnlyOneChild = totalTextChildren === 1

							if (hasOnlyOneChild || isAtLastTextChild) {
								// Move to next main slide if possible
								careerQuestClass.handleGoToNextMainSection(careerUUID)
								hasNavigatedInGesture.current = true
							} else {
								// Move to next text child
								careerQuestClass.handleGoToNextTextChild(careerUUID)
								hasNavigatedInGesture.current = true
							}
							return
						}

						const totalTextChildren = currentSlide.data.children.length
						const isAtLastTextChild = currentTextChildIndex === totalTextChildren - 1
						const hasOnlyOneChild = totalTextChildren === 1

						if (hasOnlyOneChild || isAtLastTextChild) {
							// Move to next main slide if possible
							careerQuestClass.handleGoToNextMainSection(careerUUID)
							hasNavigatedInGesture.current = true
						} else {
							// Move to next text child
							careerQuestClass.handleGoToNextTextChild(careerUUID)
							hasNavigatedInGesture.current = true
						}
					}
				} else if (e.deltaY < 0) {
					// Scroll up - same logic as ArrowUp
					if (currentSlide.type === "challenge") {
						// Challenge slide - always go to previous main slide
						careerQuestClass.handleGoToPreviousMainSection(careerUUID)
						hasNavigatedInGesture.current = true
					} else {
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
								hasNavigatedInGesture.current = true
								return
							}
							// If we can't go back in morphing text and we're not at first text child,
							// allow navigation to previous text child
							const isAtFirstTextChild = currentTextChildIndex === 0
							if (!isAtFirstTextChild) {
								careerQuestClass.handleGoToPreviousTextChild(careerUUID)
								hasNavigatedInGesture.current = true
								return
							}
							// If we're at first text child, allow navigation to previous main section
							careerQuestClass.handleGoToPreviousMainSection(careerUUID)
							hasNavigatedInGesture.current = true
							return
						}

						const isAtFirstTextChild = currentTextChildIndex === 0
						if (!isAtFirstTextChild) {
							// Move to previous text child
							careerQuestClass.handleGoToPreviousTextChild(careerUUID)
							hasNavigatedInGesture.current = true
						} else {
							careerQuestClass.handleGoToPreviousMainSection(careerUUID)
							hasNavigatedInGesture.current = true
						}
					}
				}
			}

			// Clear any existing timeout and set a new one
			if (gestureTimeout.current) {
				clearTimeout(gestureTimeout.current)
			}

			// Set timeout to detect end of gesture
			gestureTimeout.current = setTimeout(() => {
				gestureActive.current = false
				hasNavigatedInGesture.current = false
			}, GESTURE_END_DELAY)
		}

		window.addEventListener("wheel", handleWheel, { passive: false })

		return (): void => {
			window.removeEventListener("wheel", handleWheel)
			if (gestureTimeout.current) {
				clearTimeout(gestureTimeout.current)
			}
		}
	// eslint-disable-next-line max-len
	}, [currentMainSlideIndex, currentTextChildIndex, mainSlides, canAdvanceToNextMain, isTransitioning, careerUUID, shouldAllowChatScrolling, swiperInstance, textParentSwiperInstance])
}
