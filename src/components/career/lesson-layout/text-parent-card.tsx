/* eslint-disable @typescript-eslint/naming-convention */
// text-parent-card.tsx
import type { Swiper as SwiperType } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { useCallback, useEffect, useRef, useState } from "react"

// eslint-disable-next-line max-params
function useMousewheelNavigation(
	isActive: boolean,
	currentIndex: number,
	maxIndex: number,
	onNavigate: (direction: "next" | "prev") => void,
	swiperInstance: SwiperType | null
) {
	const gestureActive = useRef(false)
	const gestureTimeout = useRef<NodeJS.Timeout | null>(null)
	const hasNavigatedInGesture = useRef(false)

	const GESTURE_END_DELAY = 40 // Time to wait after last wheel event to consider gesture ended
	const MIN_DELTA_THRESHOLD = 5 // Minimum scroll amount to consider significant

	useEffect(() => {
		if (!isActive || !swiperInstance) return

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault()

			// Ignore very small scroll movements (noise)
			if (Math.abs(e.deltaY) < MIN_DELTA_THRESHOLD) {
				return
			}

			// If this is the start of a new gesture
			if (!gestureActive.current) {
				gestureActive.current = true
				hasNavigatedInGesture.current = false
			}

			// Only navigate if we haven't already navigated in this gesture
			if (!hasNavigatedInGesture.current) {
				if (e.deltaY > 0 && currentIndex < maxIndex) {
					// Scroll down - next slide
					onNavigate("next")
					hasNavigatedInGesture.current = true
				} else if (e.deltaY < 0 && currentIndex > 0) {
					// Scroll up - previous slide
					onNavigate("prev")
					hasNavigatedInGesture.current = true
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

		// Add event listener to the swiper element specifically
		const element = swiperInstance.el
		element.addEventListener("wheel", handleWheel, { passive: false })

		return () => {
			element.removeEventListener("wheel", handleWheel)
			if (gestureTimeout.current) {
				clearTimeout(gestureTimeout.current)
			}
		}
	}, [currentIndex, isActive, maxIndex, onNavigate, swiperInstance])
}

// Enhanced TextParentCard with external navigation control
interface TextParentCardProps {
    textParentData: TextParentSection
    onComplete: () => void
    onSlideChange: (triggerImage: string) => void
    onTextSectionChange: (index: number) => void
    isActive?: boolean
    navigationCommand?: "next" | "prev" | null
    initialTextIndex?: number  // This is now the current index from parent
}

// eslint-disable-next-line max-lines-per-function
export default function TextParentCard(props: TextParentCardProps) {
	const {
		textParentData,
		onComplete,
		onSlideChange,
		onTextSectionChange,
		isActive = false,
		navigationCommand,
		initialTextIndex = 0
	} = props

	const [nestedSwiperInstance, setNestedSwiperInstance] = useState<SwiperType | null>(null)
	const [hasCompletedAllText, setHasCompletedAllText] = useState(false)

	// Add mousewheel navigation
	const handleMousewheelNavigate = useCallback((direction: "next" | "prev") => {
		if (!nestedSwiperInstance) return

		if (direction === "next") {
			nestedSwiperInstance.slideNext()
		} else {
			nestedSwiperInstance.slidePrev()
		}
	}, [nestedSwiperInstance])

	useMousewheelNavigation(
		isActive,
		initialTextIndex,
		textParentData.children.length - 1,
		handleMousewheelNavigate,
		nestedSwiperInstance
	)

	// Sync swiper position with parent's index whenever it changes
	useEffect(() => {
		if (!nestedSwiperInstance || !isActive) return
		// Only slide if the index is actually different
		if (nestedSwiperInstance.activeIndex !== initialTextIndex) {
			nestedSwiperInstance.slideTo(initialTextIndex, 0)

			// Update the image for the target slide
			const targetText = textParentData.children[initialTextIndex]
			onSlideChange(targetText.triggerImage)
		}
	}, [initialTextIndex, nestedSwiperInstance, isActive, textParentData.children, onSlideChange])

	// Reset completion state when becoming active
	useEffect(() => {
		if (!isActive) return
		setHasCompletedAllText(false)
	}, [isActive])

	// Handle navigation commands from parent
	useEffect(() => {
		if (!navigationCommand || !nestedSwiperInstance || !isActive) return

		if (navigationCommand === "next") {
			const canGoNext = initialTextIndex < textParentData.children.length - 1
			if (canGoNext) {
				nestedSwiperInstance.slideNext()
			}
		} else {
			const canGoPrev = initialTextIndex > 0
			if (canGoPrev) {
				nestedSwiperInstance.slidePrev()
			}
		}
		// DONT CHANGE THESE DEPENDENCIES
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigationCommand, nestedSwiperInstance, isActive])

	// Handle nested swiper slide change
	const handleNestedSlideChange = useCallback((swiper: SwiperType) => {
		const newIndex = swiper.activeIndex

		const currentText = textParentData.children[newIndex]
		onSlideChange(currentText.triggerImage)

		// Notify parent of the index change - parent is source of truth
		onTextSectionChange(newIndex)

		const isLastSection = newIndex === textParentData.children.length - 1

		// Mark as completed but don't disable navigation
		if (isLastSection && !hasCompletedAllText) {
			setHasCompletedAllText(true)
			setTimeout(() => {
				onComplete()
			}, 100)
		}
	}, [textParentData.children, onSlideChange, onTextSectionChange, onComplete, hasCompletedAllText])

	return (
		<div className="border-2 border-swan rounded-3xl bg-polar h-full overflow-hidden">
			<Swiper
				direction="vertical"
				slidesPerView={1}
				spaceBetween={0}
				keyboard={false}  // Parent handles all navigation
				speed={400}
				allowSlideNext={true}
				allowSlidePrev={true}
				allowTouchMove={false}
				onSwiper={setNestedSwiperInstance}
				onSlideChange={handleNestedSlideChange}
				className="h-full"
				nested={true}
				initialSlide={initialTextIndex}  // Set initial slide
				style={{
					"--swiper-theme-color": "#000000",
				} as React.CSSProperties}
			>
				{textParentData.children.map((child) => (
					<SwiperSlide key={child.id} className="h-full">
						<div className="h-full flex items-center justify-center px-[75px]">
							<div className="prose prose-lg max-w-none text-4xl">
								<p className="leading-relaxed text-questionText text-center cursor-text">
									{child.content}
								</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
