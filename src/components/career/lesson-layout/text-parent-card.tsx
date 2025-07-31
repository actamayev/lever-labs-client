// text-parent-card.tsx
import type { Swiper as SwiperType } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { useCallback, useEffect, useRef, useState } from "react"

function useMousewheelNavigation(
	isActive: boolean,
	currentIndex: number,
	maxIndex: number,
	onNavigate: (direction: "next" | "prev") => void
) {
	const lastWheelTime = useRef(0)
	const gestureBlocked = useRef(false)
	const gestureTimeout = useRef<NodeJS.Timeout | null>(null)

	const wheelCooldown = 200 // Time to wait after gesture ends before allowing new gesture
	const gestureEndDelay = 30 // Time to wait for gesture to "complete"

	useEffect(() => {
		if (!isActive) return

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault()

			const now = Date.now()

			// If gesture is blocked, ignore all wheel events
			if (gestureBlocked.current) {
				// Reset the gesture end timer since we're still getting events
				if (gestureTimeout.current) {
					clearTimeout(gestureTimeout.current)
				}

				// Set new timer to unblock after events stop
				gestureTimeout.current = setTimeout(() => {
					gestureBlocked.current = false
					lastWheelTime.current = now
				}, gestureEndDelay)

				return
			}

			// Check cooldown from last completed gesture
			if (now - lastWheelTime.current < wheelCooldown) return

			const direction = e.deltaY > 0 ? "down" : "up"

			// Check boundaries
			if (direction === "down" && currentIndex >= maxIndex) return
			if (direction === "up" && currentIndex <= 0) return

			// Block further gestures immediately
			gestureBlocked.current = true

			// Trigger navigation
			onNavigate(direction === "down" ? "next" : "prev")

			// Set timer to unblock after gesture ends
			gestureTimeout.current = setTimeout(() => {
				gestureBlocked.current = false
				lastWheelTime.current = Date.now()
			}, gestureEndDelay)
		}

		window.addEventListener("wheel", handleWheel, { passive: false })

		return () => {
			window.removeEventListener("wheel", handleWheel)
			if (gestureTimeout.current) {
				clearTimeout(gestureTimeout.current)
			}
		}
	}, [isActive, currentIndex, maxIndex, onNavigate, wheelCooldown, gestureEndDelay])

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
		handleMousewheelNavigate
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
