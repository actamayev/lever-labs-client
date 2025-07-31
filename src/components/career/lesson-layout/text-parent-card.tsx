// text-parent-card.tsx
import type { Swiper as SwiperType } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { useCallback, useEffect, useState, useRef } from "react"

// Simplified hook without the unused parameter
function useNestedKeyboardNavigation(enabled: boolean) {
	const [keyPressed, setKeyPressed] = useState<string | null>(null)
	const keyDownRef = useRef(false)

	useEffect(() => {
		if (!enabled) return

		const handleKeyDown = (e: KeyboardEvent) => {
			if (!keyDownRef.current && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
				keyDownRef.current = true
				setKeyPressed(e.key)
			}
		}

		const handleKeyUp = (e: KeyboardEvent) => {
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				keyDownRef.current = false
				setKeyPressed(null)
			}
		}

		window.addEventListener("keydown", handleKeyDown, true)
		window.addEventListener("keyup", handleKeyUp, true)

		return () => {
			window.removeEventListener("keydown", handleKeyDown, true)
			window.removeEventListener("keyup", handleKeyUp, true)
		}
	}, [enabled])

	return keyPressed
}

// Enhanced TextParentCard with reset functionality
interface TextParentCardProps {
    textParentData: TextParentSection
    onComplete: () => void
    onSlideChange: (triggerImage: string) => void
    onTextSectionChange: (index: number, isLastSection: boolean) => void
    isActive?: boolean  // Add this prop to know when this card is active
}

export default function TextParentCard(props: TextParentCardProps) {
	const { textParentData, onComplete, onSlideChange, onTextSectionChange, isActive = false } = props
	const [nestedSwiperInstance, setNestedSwiperInstance] = useState<SwiperType | null>(null)
	const [currentTextIndex, setCurrentTextIndex] = useState(0)
	const [hasCompletedAllText, setHasCompletedAllText] = useState(false)
	const keyPressed = useNestedKeyboardNavigation(true)
	const lastKeyPressTime = useRef(0)
	const wasActiveRef = useRef(isActive) // Track previous active state
	const SLIDE_COOLDOWN = 300

	// Reset state only when transitioning from inactive to active
	useEffect(() => {
		if (isActive && !wasActiveRef.current && nestedSwiperInstance) {
			// We just became active (was inactive before)
			nestedSwiperInstance.slideTo(0, 0)
			setCurrentTextIndex(0)
			setHasCompletedAllText(false)

			// Update the image for the first slide
			const firstText = textParentData.children[0]
			onSlideChange(firstText.triggerImage)
		}
		wasActiveRef.current = isActive
	}, [isActive, nestedSwiperInstance, onSlideChange, textParentData.children])

	// Handle keyboard navigation
	useEffect(() => {
		if (!keyPressed || !nestedSwiperInstance) return

		const now = Date.now()
		if (now - lastKeyPressTime.current < SLIDE_COOLDOWN) return

		const isAtFirstSlide = currentTextIndex === 0
		const isAtLastSlide = currentTextIndex === textParentData.children.length - 1

		if (keyPressed === "ArrowDown") {
			if (!isAtLastSlide) {
				lastKeyPressTime.current = now
				nestedSwiperInstance.slideNext()
			}
			// If at last slide, let the event bubble to parent naturally
		} else if (keyPressed === "ArrowUp") {
			if (!isAtFirstSlide) {
				lastKeyPressTime.current = now
				nestedSwiperInstance.slidePrev()
			}
			// If at first slide, let the event bubble to parent naturally
		}
	}, [keyPressed, nestedSwiperInstance, currentTextIndex, textParentData.children.length])

	// Handle nested swiper slide change
	const handleNestedSlideChange = useCallback((swiper: SwiperType) => {
		const newIndex = swiper.activeIndex
		setCurrentTextIndex(newIndex)

		const currentText = textParentData.children[newIndex]
		onSlideChange(currentText.triggerImage)

		const isLastSection = newIndex === textParentData.children.length - 1
		onTextSectionChange(newIndex, isLastSection)

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
				keyboard={false}
				speed={400}
				allowSlideNext={true}
				allowSlidePrev={true}
				allowTouchMove={false}
				onSwiper={setNestedSwiperInstance}
				onSlideChange={handleNestedSlideChange}
				className="h-full"
				nested={true}
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
