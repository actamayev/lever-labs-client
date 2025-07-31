// text-parent-card.tsx
import type { Swiper as SwiperType } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { useCallback, useEffect, useState, useRef } from "react"

// Enhanced TextParentCard with external navigation control
interface TextParentCardProps {
    textParentData: TextParentSection
    onComplete: () => void
    onSlideChange: (triggerImage: string) => void
    onTextSectionChange: (index: number) => void  // Simplified to just pass the index
    isActive?: boolean
    navigationCommand?: "next" | "prev" | null  // Commands from parent
    initialTextIndex?: number  // Initial index when becoming active
}

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
	const [currentTextIndex, setCurrentTextIndex] = useState(initialTextIndex)
	const [hasCompletedAllText, setHasCompletedAllText] = useState(false)
	const wasActiveRef = useRef(isActive) // Track previous active state

	// Reset state when transitioning from inactive to active, or when initialTextIndex changes
	useEffect(() => {
		if (isActive && (!wasActiveRef.current || currentTextIndex !== initialTextIndex) && nestedSwiperInstance) {
			// We just became active or the initial index changed
			nestedSwiperInstance.slideTo(initialTextIndex, 0)
			setCurrentTextIndex(initialTextIndex)
			setHasCompletedAllText(false)

			// Update the image for the target slide
			const targetText = textParentData.children[initialTextIndex]
			if (targetText) {
				onSlideChange(targetText.triggerImage)
			}
		}
		wasActiveRef.current = isActive
	}, [isActive, initialTextIndex, nestedSwiperInstance, onSlideChange, textParentData.children])

	// Handle navigation commands from parent
	useEffect(() => {
		if (!navigationCommand || !nestedSwiperInstance || !isActive) return

		if (navigationCommand === "next") {
			const canGoNext = currentTextIndex < textParentData.children.length - 1
			if (canGoNext) {
				nestedSwiperInstance.slideNext()
			}
		} else if (navigationCommand === "prev") {
			const canGoPrev = currentTextIndex > 0
			if (canGoPrev) {
				nestedSwiperInstance.slidePrev()
			}
		}
	}, [navigationCommand, nestedSwiperInstance, isActive, currentTextIndex, textParentData.children.length])

	// Handle nested swiper slide change
	const handleNestedSlideChange = useCallback((swiper: SwiperType) => {
		const newIndex = swiper.activeIndex
		setCurrentTextIndex(newIndex)

		const currentText = textParentData.children[newIndex]
		if (currentText) {
			onSlideChange(currentText.triggerImage)
		}

		// Notify parent of the index change
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
				keyboard={false}  // Completely disabled - parent handles all navigation
				speed={400}
				allowSlideNext={true}
				allowSlidePrev={true}
				allowTouchMove={false}  // Also disable touch/mouse
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
