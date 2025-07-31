import type { Swiper as SwiperType } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { useCallback, useEffect, useRef, useState } from "react"

function useNestedKeyboardNavigation(enabled: boolean) {
	const [keyPressed, setKeyPressed] = useState<string | null>(null)
	const keyDownRef = useRef(false)

	useEffect(() => {
		if (!enabled) return

		const handleKeyDown = (e: KeyboardEvent) => {
			if (!keyDownRef.current && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
				console.log("handleKeyDown", e.key)
				e.preventDefault()
				e.stopPropagation() // Prevent bubbling to parent
				keyDownRef.current = true
				setKeyPressed(e.key)
			}
		}

		const handleKeyUp = (e: KeyboardEvent) => {
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				console.log("handleKeyUp", e.key)
				keyDownRef.current = false
				setKeyPressed(null)
			}
		}

		window.addEventListener("keydown", handleKeyDown, true) // Use capture phase
		window.addEventListener("keyup", handleKeyUp, true)

		return () => {
			window.removeEventListener("keydown", handleKeyDown, true)
			window.removeEventListener("keyup", handleKeyUp, true)
		}
	}, [enabled])

	return keyPressed
}

// Enhanced TextParentCard with nested Swiper
interface TextParentCardProps {
	textParentData: TextParentSection
	onComplete: () => void
	onSlideChange: (triggerImage: string) => void
	onTextSectionChange: (index: number, isLastSection: boolean) => void
}

export default function TextParentCard(props: TextParentCardProps) {
	const { textParentData, onComplete, onSlideChange, onTextSectionChange } = props
	const [nestedSwiperInstance, setNestedSwiperInstance] = useState<SwiperType | null>(null)
	const [currentTextIndex, setCurrentTextIndex] = useState(0)
	const [hasCompletedAllText, setHasCompletedAllText] = useState(false)
	const [isActive, setIsActive] = useState(true)
	const keyPressed = useNestedKeyboardNavigation(isActive)
	const lastKeyPressTime = useRef(0)
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const SLIDE_COOLDOWN = 300

	// Handle nested swiper slide change
	useEffect(() => {
		if (!keyPressed || !nestedSwiperInstance) return

		const now = Date.now()
		if (now - lastKeyPressTime.current < SLIDE_COOLDOWN) return

		if (keyPressed === "ArrowDown" && currentTextIndex < textParentData.children.length - 1) {
			lastKeyPressTime.current = now
			nestedSwiperInstance.slideNext()
			console.log("slideNext")
		} else if (keyPressed === "ArrowUp" && currentTextIndex > 0) {
			lastKeyPressTime.current = now
			nestedSwiperInstance.slidePrev()
		}
	}, [keyPressed, nestedSwiperInstance, currentTextIndex, textParentData.children.length])

	// Handle nested swiper slide change
	const handleNestedSlideChange = useCallback((swiper: SwiperType) => {
		console.log("handleNestedSlideChange", swiper)
		const newIndex = swiper.activeIndex
		setCurrentTextIndex(newIndex)

		const currentText = textParentData.children[newIndex]
		onSlideChange(currentText.triggerImage)

		const isLastSection = newIndex === textParentData.children.length - 1
		onTextSectionChange(newIndex, isLastSection)

		// Don't immediately complete - wait for user action
		if (isLastSection && !hasCompletedAllText) {
			setHasCompletedAllText(true)
			// Disable nested keyboard navigation when at last slide
			setIsActive(false)
			// Delay completion to prevent auto-advance
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
				keyboard={false} // Disable built-in keyboard
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
