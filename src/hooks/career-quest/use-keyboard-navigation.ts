/* eslint-disable max-depth */
import { useEffect, useRef, useState } from "react"
import type { CareerUUID } from "@bluedotrobots/common-ts"
import careerQuestClass from "../../classes/career-quest-class"
import { handleForwardNavigation, handleBackwardNavigation, shouldBlockNavigation } from "../../utils/career-quest/navigation-helpers"

function useEffectKeyboardNavigation(): string | null {
	const [keyPressed, setKeyPressed] = useState<string | null>(null)
	const keyDownRef = useRef(false)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent): void => {
			// Only process if key wasn't already down
			if (!keyDownRef.current && (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowLeft")) {
				e.preventDefault()
				keyDownRef.current = true
				setKeyPressed(e.key)
			}
		}

		const handleKeyUp = (e: KeyboardEvent): void => {
			if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowLeft") {
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

	useEffect(() => {
		if (!keyPressed || !swiperInstance || isTransitioning) return

		if (shouldBlockNavigation(careerUUID)) return

		const navigationContext = {
			careerUUID,
			currentMainSlideIndex,
			currentTextChildIndex
		}

		if (keyPressed === "ArrowDown") {
			handleForwardNavigation(navigationContext)
		} else if (keyPressed === "ArrowUp") {
			handleBackwardNavigation(navigationContext)
		}
	}, [keyPressed, swiperInstance, currentMainSlideIndex, currentTextChildIndex, isTransitioning, careerUUID])
}
