// text-parent-card.tsx
import type { Swiper as SwiperType } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { useCallback, useEffect, useState } from "react"

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
		initialTextIndex = 0  // This is the source of truth from parent
	} = props

	const [nestedSwiperInstance, setNestedSwiperInstance] = useState<SwiperType | null>(null)
	const [hasCompletedAllText, setHasCompletedAllText] = useState(false)

	// Sync swiper position with parent's index whenever it changes
	useEffect(() => {
		if (nestedSwiperInstance && isActive) {
			// Only slide if the index is actually different
			if (nestedSwiperInstance.activeIndex !== initialTextIndex) {
				nestedSwiperInstance.slideTo(initialTextIndex, 0)

				// Update the image for the target slide
				const targetText = textParentData.children[initialTextIndex]
				if (targetText) {
					onSlideChange(targetText.triggerImage)
				}
			}
		}
	}, [initialTextIndex, nestedSwiperInstance, isActive, textParentData.children, onSlideChange])

	// Reset completion state when becoming active
	useEffect(() => {
		if (isActive) {
			setHasCompletedAllText(false)
		}
	}, [isActive])

	// Handle navigation commands from parent
	useEffect(() => {
		if (!navigationCommand || !nestedSwiperInstance || !isActive) return

		if (navigationCommand === "next") {
			const canGoNext = initialTextIndex < textParentData.children.length - 1
			if (canGoNext) {
				nestedSwiperInstance.slideNext()
			}
		} else if (navigationCommand === "prev") {
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
		if (currentText) {
			onSlideChange(currentText.triggerImage)
		}

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
