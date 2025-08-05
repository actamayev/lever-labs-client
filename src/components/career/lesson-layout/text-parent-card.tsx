import { observer } from "mobx-react"
import { useCallback, useEffect } from "react"
import type { Swiper as SwiperType } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import type { CareerUUID } from "@bluedotrobots/common-ts"
import careerQuestClass from "../../../classes/career-quest-class"

interface TextParentCardProps {
	slide: TextParentMainSlide
	careerUUID: CareerUUID
}

// eslint-disable-next-line max-lines-per-function
function TextParentCard(props: TextParentCardProps) {
	const { slide, careerUUID } = props
	// Move nested swiper into the class
	const nestedSwiperInstance = careerQuestClass.getTextParentSwiperInstance(careerUUID, slide.id)
	const textParentData = slide.data
	const currentMainSlideIndex = careerQuestClass.getCurrentMainSlideIndex(careerUUID)
	const mainSlides = careerQuestClass.getMainSlides(careerUUID)
	const currentSlide = mainSlides[currentMainSlideIndex]
	const currentTextChildIndex = careerQuestClass.getCurrentTextChildIndex(careerUUID)
	const isActive = currentMainSlideIndex === mainSlides.findIndex(s => s.id === slide.id)

	const onSlideChange = useCallback((triggerImage: string) => {
		if (currentSlide.type === "textParent") {
			careerQuestClass.setRightContent(careerUUID, { type: "image", icon: triggerImage })
		}
	}, [currentSlide, careerUUID])

	// Sync swiper position with parent's index whenever it changes
	useEffect(() => {
		if (
			!nestedSwiperInstance ||
			!isActive ||
			currentTextChildIndex === nestedSwiperInstance.activeIndex
		) return

		nestedSwiperInstance.slideTo(currentTextChildIndex, 0)
		const targetText = textParentData.children[currentTextChildIndex]
		onSlideChange(targetText.triggerImage)
	}, [currentTextChildIndex, nestedSwiperInstance, isActive, textParentData.children, onSlideChange])

	// Handle nested swiper slide change
	const handleNestedSlideChange = useCallback((swiper: SwiperType) => {
		const newIndex = swiper.activeIndex

		const currentText = textParentData.children[newIndex]
		onSlideChange(currentText.triggerImage)

		// Notify parent of the index change - parent is source of truth
		careerQuestClass.handleTextChildIndexChange(careerUUID, newIndex)
	}, [textParentData.children, onSlideChange, careerUUID])

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
				onSwiper={(swiper) => {
					careerQuestClass.setTextParentSwiperInstance(careerUUID, slide.id, swiper)
				}}
				onSlideChange={handleNestedSlideChange}
				className="h-full"
				nested={true}
				initialSlide={currentTextChildIndex}  // Set initial slide
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


export default observer(TextParentCard)
