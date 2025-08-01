/* eslint-disable max-depth */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useRef } from "react"
import type { Swiper as SwiperType } from "swiper"

// eslint-disable-next-line max-len, max-params, max-lines-per-function
export default function useMousewheelNavigation(
	mainSwiperInstance: SwiperType | null,
	currentMainSlideIndex: number,
	currentTextChildIndex: number,
	mainSlides: MainSlide[],
	canAdvanceToNextMain: (slideIndex: number) => boolean,
	isTransitioning: boolean,
	setIsTransitioning: (isTransitioning: boolean) => void,
	setNavigationCommand: (command: "next" | "prev" | null) => void,
	setCurrentTextChildIndex: (index: number) => void
): void {
	const gestureActive = useRef(false)
	const gestureTimeout = useRef<NodeJS.Timeout | null>(null)
	const hasNavigatedInGesture = useRef(false)
	const lastWheelTime = useRef(0)

	const GESTURE_END_DELAY = 40
	const MIN_DELTA_THRESHOLD = 5
	const WHEEL_COOLDOWN = 200 // Same as keyboard cooldown

	// eslint-disable-next-line max-lines-per-function
	useEffect(() => {
		// eslint-disable-next-line complexity
		const handleWheel = (e: WheelEvent): void => {
			e.preventDefault()

			// Ignore very small scroll movements (noise)
			if (Math.abs(e.deltaY) < MIN_DELTA_THRESHOLD) {
				return
			}

			// Respect cooldown and transitioning state
			const now = Date.now()
			if (now - lastWheelTime.current < WHEEL_COOLDOWN || isTransitioning || !mainSwiperInstance) {
				return
			}

			// If this is the start of a new gesture
			if (!gestureActive.current) {
				gestureActive.current = true
				hasNavigatedInGesture.current = false
			}

			// Only navigate if we haven't already navigated in this gesture
			if (!hasNavigatedInGesture.current) {
				const currentSlide = mainSlides[currentMainSlideIndex]

				if (e.deltaY > 0) {
					// Scroll down - same logic as ArrowDown
					if (currentSlide.type === "textParent") {
						const totalTextChildren = currentSlide.data.children.length
						const isAtLastTextChild = currentTextChildIndex === totalTextChildren - 1
						const hasOnlyOneChild = totalTextChildren === 1

						if (hasOnlyOneChild || isAtLastTextChild) {
							// Move to next main slide if possible
							if (currentMainSlideIndex < mainSlides.length - 1 && canAdvanceToNextMain(currentMainSlideIndex)) {
								lastWheelTime.current = now
								setIsTransitioning(true)
								mainSwiperInstance.slideNext()
								setTimeout(() => setIsTransitioning(false), WHEEL_COOLDOWN)
								hasNavigatedInGesture.current = true
							}
						} else {
							// Move to next text child
							lastWheelTime.current = now
							setNavigationCommand("next")
							setTimeout(() => setNavigationCommand(null), 100)
							hasNavigatedInGesture.current = true
						}
					} else {
						// Challenge slide - try to move to next main slide
						if (currentMainSlideIndex < mainSlides.length - 1 && canAdvanceToNextMain(currentMainSlideIndex)) {
							lastWheelTime.current = now
							setIsTransitioning(true)
							mainSwiperInstance.slideNext()
							setTimeout(() => setIsTransitioning(false), WHEEL_COOLDOWN)
							hasNavigatedInGesture.current = true
						}
					}
				} else if (e.deltaY < 0) {
					// Scroll up - same logic as ArrowUp
					if (currentSlide.type === "textParent") {
						const isAtFirstTextChild = currentTextChildIndex === 0

						if (isAtFirstTextChild) {
							// Move to previous main slide if possible
							if (currentMainSlideIndex > 0) {
								lastWheelTime.current = now
								setIsTransitioning(true)
								mainSwiperInstance.slidePrev()

								// Set the text child index to the last child of the previous text parent
								const prevSlide = mainSlides[currentMainSlideIndex - 1]
								if (prevSlide.type === "textParent") {
									setCurrentTextChildIndex(prevSlide.data.children.length - 1)
								}

								setTimeout(() => setIsTransitioning(false), WHEEL_COOLDOWN)
								hasNavigatedInGesture.current = true
							}
						} else {
							// Move to previous text child
							lastWheelTime.current = now
							setNavigationCommand("prev")
							setTimeout(() => setNavigationCommand(null), 100)
							hasNavigatedInGesture.current = true
						}
					} else {
						// Challenge slide - always go to previous main slide
						if (currentMainSlideIndex > 0) {
							lastWheelTime.current = now
							setIsTransitioning(true)
							mainSwiperInstance.slidePrev()

							// Set the text child index to the last child of the previous text parent
							const prevSlide = mainSlides[currentMainSlideIndex - 1]
							if (prevSlide.type === "textParent") {
								setCurrentTextChildIndex(prevSlide.data.children.length - 1)
							}

							setTimeout(() => setIsTransitioning(false), WHEEL_COOLDOWN)
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
	}, [mainSwiperInstance, currentMainSlideIndex, currentTextChildIndex, mainSlides, canAdvanceToNextMain, isTransitioning, setIsTransitioning, setNavigationCommand, setCurrentTextChildIndex])
}
