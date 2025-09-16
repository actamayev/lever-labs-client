
/* eslint-disable @typescript-eslint/naming-convention */
import { isEmpty } from "lodash-es"
import { useCallback, useEffect, useRef } from "react"
import { CareerUUID } from "@bluedotrobots/common-ts/types/utils"
import careerQuestClass from "../../classes/career-quest-class"
import { handleForwardNavigation, handleBackwardNavigation, shouldBlockNavigation } from "../../utils/career-quest/navigation-helpers"
import studentClass from "../../classes/student-class"
import chatManagerClass from "../../classes/chat-manager-class"
import navigationManagerClass from "../../classes/navigation-manager-class"

// eslint-disable-next-line max-lines-per-function
export default function useMousewheelNavigation(careerUUID: CareerUUID): void {
	const currentMainSlideIndex = navigationManagerClass.getCurrentMainSlideIndex(careerUUID)
	const currentTextChildIndex = navigationManagerClass.getCurrentTextChildIndex(careerUUID)
	const gestureActive = useRef(false)
	const gestureTimeout = useRef<NodeJS.Timeout | null>(null)
	const hasNavigatedInGesture = useRef(false)
	const mainSlides = navigationManagerClass.getMainSlides(careerUUID)
	const canAdvanceToNextMain = careerQuestClass.canAdvanceToNextMain(careerUUID, currentMainSlideIndex)
	const swiperInstance = navigationManagerClass.getSwiperInstance(careerUUID)
	const textParentSwiperInstance = navigationManagerClass.getTextParentSwiperInstance(careerUUID, mainSlides[currentMainSlideIndex].id)
	const GESTURE_END_DELAY = 40
	const MIN_DELTA_THRESHOLD = 5
	const isTransitioning = navigationManagerClass.getIsTransitioning(careerUUID)
	const isInFocusMode = studentClass.isInFocusMode

	// Helper function to check if the mouse is over a chat component
	const isMouseOverChatComponent = (event: WheelEvent): boolean => {
		const target = event.target as Element

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

	// Helper function to check if the mouse is over the dino leaderboard scrollable area
	const isMouseOverDinoLeaderboard = (event: WheelEvent): boolean => {
		const target = event.target as Element

		if (!target) return false

		// Check if the target or any of its parents is specifically the scrollable table area
		let element: Element | null = target
		while (element) {
			// Only check for the scrollable table container itself, not the entire component
			if (
				// Check for the specific scrollable table container
				(element.classList.contains("max-h-96") &&
				 element.classList.contains("overflow-y-auto") &&
				 element.querySelector("table")) ||
				// Check for table elements within the scrollable container
				(element.tagName === "TABLE" && element.closest(".max-h-96.overflow-y-auto")) ||
				// Check for tbody, thead, tr, td elements within the scrollable dino table
				(["TBODY", "THEAD", "TR", "TD", "TH"].includes(element.tagName) && element.closest(".max-h-96.overflow-y-auto"))
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
		const currentSlide = navigationManagerClass.getCurrentMainSlide(careerUUID)
		if (
			currentSlide.type !== "challenge" &&
			!careerQuestClass.isCareerChatToggled(careerUUID)
		) return false

		if (currentSlide.type === "challenge") {
			const challengeMessages = chatManagerClass.getChallengeMessages(currentSlide.data)
			// Only allow normal scrolling if there are messages (length > 0)
			return !isEmpty(challengeMessages)
		}
		const careerMessages = chatManagerClass.getCareerChatMessages(careerUUID)
		return !isEmpty(careerMessages)
	}, [careerUUID])

	useEffect((): () => void => {
		if (!swiperInstance || isTransitioning) return (): void => {}

		// eslint-disable-next-line complexity
		const handleWheel = (e: WheelEvent): void => {
			// Check if mouse is over dino leaderboard - if so, allow normal scrolling
			if (isMouseOverDinoLeaderboard(e)) {
				return // Don't prevent default, allow normal scrolling
			}

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
			if (shouldBlockNavigation(careerUUID) || isInFocusMode) return

			// If this is the start of a new gesture
			if (!gestureActive.current) {
				gestureActive.current = true
				hasNavigatedInGesture.current = false
			}

			// Only navigate if we haven't already navigated in this gesture
			if (!hasNavigatedInGesture.current) {
				const navigationContext = {
					careerUUID,
					currentMainSlideIndex,
					currentTextChildIndex
				}

				if (e.deltaY > 0) {
					// Scroll down - same logic as ArrowDown
					handleForwardNavigation(navigationContext)
					hasNavigatedInGesture.current = true
				} else if (e.deltaY < 0) {
					// Scroll up - same logic as ArrowUp
					handleBackwardNavigation(navigationContext)
					hasNavigatedInGesture.current = true
				}
			}

			// Clear any existing timeout and set a new one
			if (gestureTimeout.current) {
				clearTimeout(gestureTimeout.current)
			}

			// Set timeout to detect end of gesture
			gestureTimeout.current = setTimeout((): void => {
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
	}, [currentMainSlideIndex, currentTextChildIndex, mainSlides, canAdvanceToNextMain, isTransitioning, careerUUID, shouldAllowChatScrolling, swiperInstance, textParentSwiperInstance, isInFocusMode])
}
