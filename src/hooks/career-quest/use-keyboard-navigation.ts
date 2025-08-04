/* eslint-disable max-depth */
import { useEffect, useRef, useState } from "react"
import type { Swiper as SwiperType } from "swiper"
import careerQuestClass from "../../classes/career-quest-class"
import type { CareerUUID } from "@bluedotrobots/common-ts"

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


// eslint-disable-next-line max-params
export default function useKeyboardNavigation(
	mainSwiperInstance: SwiperType | null,
	careerUUID: CareerUUID,
	isTransitioning: boolean,
	setIsTransitioning: (isTransitioning: boolean) => void,
	setNavigationCommand: (command: "next" | "prev" | null) => void,
): void {
	const currentMainSlideIndex = careerQuestClass.getCurrentMainSlideIndex(careerUUID)
	const currentTextChildIndex = careerQuestClass.getCurrentTextChildIndex(careerUUID)
	const mainSlides = careerQuestClass.getMainSlides(careerUUID)
	const keyPressed = useEffectKeyboardNavigation()
	const lastKeyPressTime = useRef(0)
	const canAdvanceToNextMain = careerQuestClass.canAdvanceToNextMain(careerUUID, currentMainSlideIndex)
	const SLIDE_COOLDOWN = 200

	// eslint-disable-next-line complexity
	useEffect(() => {
		if (!keyPressed || !mainSwiperInstance || isTransitioning) return

		const now = Date.now()
		if (now - lastKeyPressTime.current < SLIDE_COOLDOWN) return

		const currentSlide = mainSlides[currentMainSlideIndex]

		if (keyPressed === "ArrowDown") {
			if (currentSlide.type === "textParent") {
				const totalTextChildren = currentSlide.data.children.length
				const isAtLastTextChild = currentTextChildIndex === totalTextChildren - 1
				const hasOnlyOneChild = totalTextChildren === 1

				if (hasOnlyOneChild || isAtLastTextChild) {
					// Move to next main slide if possible
					if (currentMainSlideIndex < mainSlides.length - 1 && canAdvanceToNextMain) {
						lastKeyPressTime.current = now
						setIsTransitioning(true)
						mainSwiperInstance.slideNext()
						setTimeout(() => setIsTransitioning(false), SLIDE_COOLDOWN)
					}
				} else {
					// Move to next text child
					lastKeyPressTime.current = now
					setNavigationCommand("next")
					setTimeout(() => setNavigationCommand(null), 100)
				}
			} else {
				// Challenge slide - try to move to next main slide
				if (currentMainSlideIndex < mainSlides.length - 1 && canAdvanceToNextMain) {
					lastKeyPressTime.current = now
					setIsTransitioning(true)
					mainSwiperInstance.slideNext()
					setTimeout(() => setIsTransitioning(false), SLIDE_COOLDOWN)
				}
			}
		} else if (keyPressed === "ArrowUp") {
			if (currentSlide.type === "textParent") {
				const isAtFirstTextChild = currentTextChildIndex === 0

				if (isAtFirstTextChild) {
					// Move to previous main slide if possible
					if (currentMainSlideIndex > 0) {
						lastKeyPressTime.current = now
						setIsTransitioning(true)
						mainSwiperInstance.slidePrev()

						// Set the text child index to the last child of the previous text parent
						const prevSlide = mainSlides[currentMainSlideIndex - 1]
						if (prevSlide.type === "textParent") {
							careerQuestClass.setCurrentTextChildIndex(careerUUID, prevSlide.data.children.length - 1)
						}

						setTimeout(() => setIsTransitioning(false), SLIDE_COOLDOWN)
					}
				} else {
					// Move to previous text child
					lastKeyPressTime.current = now
					setNavigationCommand("prev")
					setTimeout(() => setNavigationCommand(null), 100)
				}
			} else {
				// Challenge slide - always go to previous main slide
				if (currentMainSlideIndex > 0) {
					lastKeyPressTime.current = now
					setIsTransitioning(true)
					mainSwiperInstance.slidePrev()

					// Set the text child index to the last child of the previous text parent
					const prevSlide = mainSlides[currentMainSlideIndex - 1]
					if (prevSlide.type === "textParent") {
						careerQuestClass.setCurrentTextChildIndex(careerUUID, prevSlide.data.children.length - 1)
					}

					setTimeout(() => setIsTransitioning(false), SLIDE_COOLDOWN)
				}
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keyPressed, mainSwiperInstance, currentMainSlideIndex, currentTextChildIndex, mainSlides, canAdvanceToNextMain, isTransitioning])
}
