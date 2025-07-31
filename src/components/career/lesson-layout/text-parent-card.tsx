// text-parent-card.tsx
import type { Swiper as SwiperType } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { useCallback, useEffect, useRef, useState } from "react"

function useMousewheelNavigation(
	isActive: boolean,
	currentIndex: number,
	maxIndex: number,
	onNavigate: (direction: "next" | "prev") => void,
	swiperInstance: SwiperType | null
) {
	const gestureBlocked = useRef(false)
	const gestureTimeout = useRef<NodeJS.Timeout | null>(null)
	const accumulatedDelta = useRef(0)
	const baseTranslate = useRef(0)

	const gestureEndDelay = 20
	const commitThreshold = 0.1 // 30% of slide height to commit
	const sensitivity = 1 // Adjust scroll sensitivity

	useEffect(() => {
		if (!isActive || !swiperInstance) return

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault()

			// Start new gesture
			if (!gestureBlocked.current) {
				gestureBlocked.current = true
				accumulatedDelta.current = 0
				baseTranslate.current = swiperInstance.getTranslate()
			}

			// Accumulate scroll delta
			accumulatedDelta.current += e.deltaY * sensitivity

			// Calculate new translate position
			const slideHeight = swiperInstance.height
			const maxTranslate = baseTranslate.current - (slideHeight * (maxIndex - currentIndex))
			const minTranslate = baseTranslate.current + (slideHeight * currentIndex)

			const newTranslate = Math.max(maxTranslate, Math.min(minTranslate,
				baseTranslate.current - accumulatedDelta.current))

			// Apply the translate
			swiperInstance.setTranslate(newTranslate)

			// Reset gesture end timer
			if (gestureTimeout.current) {
				clearTimeout(gestureTimeout.current)
			}

			// Set timer to end gesture
			gestureTimeout.current = setTimeout(() => {
				const innerSlideHeight = swiperInstance.height
				const deltaSlides = accumulatedDelta.current / innerSlideHeight

				// Check if we should commit to slide change
				if (Math.abs(deltaSlides) >= commitThreshold) {
					if (deltaSlides > 0 && currentIndex < maxIndex) {
						// Scroll down - go to next
						onNavigate("next")
					} else if (deltaSlides < 0 && currentIndex > 0) {
						// Scroll up - go to prev
						onNavigate("prev")
					} else {
						// Hit boundary - snap back
						swiperInstance.slideTo(currentIndex, 300)
					}
				} else {
					// Didn't cross threshold - snap back
					swiperInstance.slideTo(currentIndex, 300)
				}

				// Reset gesture state
				gestureBlocked.current = false
				accumulatedDelta.current = 0
			}, gestureEndDelay)
		}

		window.addEventListener("wheel", handleWheel, { passive: false })

		return () => {
			window.removeEventListener("wheel", handleWheel)
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
