/* eslint-disable max-depth */
import { useEffect, useRef, useState } from "react"
import type { CareerUUID } from "@bluedotrobots/common-ts"
import careerQuestClass from "../../classes/career-quest-class"

function useEffectKeyboardNavigation(): string | null {
	const [keyPressed, setKeyPressed] = useState<string | null>(null)
	const keyDownRef = useRef(false)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent): void => {
			// Only process if key wasn't already down
			if (!keyDownRef.current && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
				e.preventDefault()
				keyDownRef.current = true
				setKeyPressed(e.key)
			}
		}

		const handleKeyUp = (e: KeyboardEvent): void => {
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				keyDownRef.current = false
				setKeyPressed(null)
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return (): void => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
		}
	}, [])

	return keyPressed
}

export default function useKeyboardNavigation(careerUUID: CareerUUID): void {
	const currentMainSlideIndex = careerQuestClass.getCurrentMainSlideIndex(careerUUID)
	const currentTextChildIndex = careerQuestClass.getCurrentTextChildIndex(careerUUID)
	const keyPressed = useEffectKeyboardNavigation()
	const swiperInstance = careerQuestClass.getSwiperInstance(careerUUID)
	const isTransitioning = careerQuestClass.getIsTransitioning(careerUUID)

	// eslint-disable-next-line complexity
	useEffect(() => {
		console.error("keyPressed", keyPressed)
		console.error("swiperInstance", swiperInstance)
		console.error("isTransitioning", isTransitioning)
		if (!keyPressed || !swiperInstance || isTransitioning) return

		const now = Date.now()
		if (now - careerQuestClass.getLastSlideChangeTime(careerUUID) < careerQuestClass.SLIDE_COOLDOWN) return
		console.error("now", now)

		const currentSlide = careerQuestClass.getCurrentMainSlide(careerUUID)

		if (keyPressed === "ArrowDown") {
			if (currentSlide.type === "challenge") {
				// Challenge slide - try to move to next main slide
				careerQuestClass.handleGoToNextMainSection(careerUUID)
			} else {
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
		} else if (keyPressed === "ArrowUp") {
			console.error("currentSlide", currentSlide)
			if (currentSlide.type === "challenge") {
				// Challenge slide - always go to previous main slide
				careerQuestClass.handleGoToPreviousMainSection(careerUUID)
			} else {
				const isAtFirstTextChild = currentTextChildIndex === 0
				console.error("isAtFirstTextChild", isAtFirstTextChild)

				if (!isAtFirstTextChild) {
					// Move to previous text child
					careerQuestClass.handleGoToPreviousTextChild(careerUUID)
				} else {
					careerQuestClass.handleGoToPreviousMainSection(careerUUID)
				}
			}
		}
	}, [keyPressed, swiperInstance, currentMainSlideIndex, currentTextChildIndex, isTransitioning, careerUUID])
}
