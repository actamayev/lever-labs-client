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
	const mainSlides = careerQuestClass.getMainSlides(careerUUID)
	const keyPressed = useEffectKeyboardNavigation()
	// const lastKeyPressTime = useRef(0)
	const canAdvanceToNextMain = careerQuestClass.canAdvanceToNextMain(careerUUID, currentMainSlideIndex)
	const swiperInstance = careerQuestClass.getSwiperInstance(careerUUID)
	const isTransitioning = careerQuestClass.getIsTransitioning(careerUUID)
	const textParentSwiperInstance = careerQuestClass.getTextParentSwiperInstance(careerUUID, mainSlides[currentMainSlideIndex].id)

	// eslint-disable-next-line complexity
	useEffect(() => {
		if (!keyPressed || !swiperInstance || isTransitioning) return

		const now = Date.now()
		if (now - careerQuestClass.getLastSlideChangeTime(careerUUID) < careerQuestClass.SLIDE_COOLDOWN) return

		const currentSlide = mainSlides[currentMainSlideIndex]

		if (keyPressed === "ArrowDown") {
			if (currentSlide.type === "challenge") {
				// Challenge slide - try to move to next main slide
				if (currentMainSlideIndex < mainSlides.length - 1 && canAdvanceToNextMain) {
					careerQuestClass.setLastSlideChangeTime(careerUUID, now)
					careerQuestClass.handleGoToNextSection(careerUUID)
				}
			} else {
				const totalTextChildren = currentSlide.data.children.length
				const isAtLastTextChild = currentTextChildIndex === totalTextChildren - 1
				const hasOnlyOneChild = totalTextChildren === 1

				if (hasOnlyOneChild || isAtLastTextChild) {
					// Move to next main slide if possible
					if (currentMainSlideIndex < mainSlides.length - 1 && canAdvanceToNextMain) {
						careerQuestClass.setLastSlideChangeTime(careerUUID, now)
						careerQuestClass.handleGoToNextSection(careerUUID)
					}
				} else {
					// Move to next text child
					careerQuestClass.setLastSlideChangeTime(careerUUID, now)
					const canGoNext = currentTextChildIndex < currentSlide.data.children.length - 1
					if (canGoNext && textParentSwiperInstance) {
						textParentSwiperInstance.slideNext()
					}
				}
			}
		} else if (keyPressed === "ArrowUp") {
			if (currentSlide.type === "textParent") {
				const isAtFirstTextChild = currentTextChildIndex === 0

				if (!isAtFirstTextChild) {
					// Move to previous text child
					careerQuestClass.setLastSlideChangeTime(careerUUID, now)
					const canGoPrev = currentTextChildIndex > 0
					if (canGoPrev && textParentSwiperInstance) {
						textParentSwiperInstance.slidePrev()
					}
				} else {
					// Move to previous main slide if possible
					if (currentMainSlideIndex > 0) {
						careerQuestClass.setLastSlideChangeTime(careerUUID, now)
						careerQuestClass.setIsTransitioning(careerUUID, true)
						swiperInstance.slidePrev()

						// Set the text child index to the last child of the previous text parent
						const prevSlide = mainSlides[currentMainSlideIndex - 1]
						if (prevSlide.type === "textParent") {
							careerQuestClass.setCurrentTextChildIndex(careerUUID, prevSlide.data.children.length - 1)
						}

						careerQuestClass.setIsTransitioning(careerUUID, false)
					}
				}
			} else {
				// Challenge slide - always go to previous main slide
				if (currentMainSlideIndex <= 0) return
				careerQuestClass.setLastSlideChangeTime(careerUUID, now)
				careerQuestClass.setIsTransitioning(careerUUID, true)
				swiperInstance.slidePrev()

				// Set the text child index to the last child of the previous text parent
				const prevSlide = mainSlides[currentMainSlideIndex - 1]
				if (prevSlide.type === "textParent") {
					careerQuestClass.setCurrentTextChildIndex(careerUUID, prevSlide.data.children.length - 1)
				}

				careerQuestClass.setIsTransitioning(careerUUID, false)
			}
		}
	// eslint-disable-next-line max-len
	}, [keyPressed, swiperInstance, currentMainSlideIndex, currentTextChildIndex, mainSlides, canAdvanceToNextMain, isTransitioning, careerUUID, textParentSwiperInstance])
}
