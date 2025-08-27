import { useEffect } from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import { Swiper, SwiperSlide } from "swiper/react"
import type { CareerUUID } from "@bluedotrobots/common-ts"
import careerQuestClass from "../../../classes/career-quest-class"
import { NavigationMorphingText } from "../morphing-text/navigation-morphing-text"

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
	const currentTextChildIndex = careerQuestClass.getCurrentTextChildIndex(careerUUID)
	const isActive = currentMainSlideIndex === mainSlides.findIndex(s => s.id === slide.id)

	// Sync swiper position with parent's index whenever it changes
	useEffect(() => {
		if (
			!nestedSwiperInstance ||
			!isActive ||
			currentTextChildIndex === nestedSwiperInstance.activeIndex
		) return

		nestedSwiperInstance.slideTo(currentTextChildIndex)
		careerQuestClass.onTextSlideChange(careerUUID)
	}, [currentTextChildIndex, nestedSwiperInstance, isActive, textParentData.children, careerUUID])

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
				className="h-full"
				nested={true}
				initialSlide={currentTextChildIndex}  // Set initial slide
			>
				{toJS(textParentData.children).map((child) => (
					<SwiperSlide key={child.id} className="h-full">
						<div className="h-full flex items-center justify-center px-[75px]">
							<div className="prose prose-lg max-w-none text-4xl">
								{child.type === "morphingText" ? (
									<NavigationMorphingText
										staticText={child.staticText}
										morphingTexts={child.morphingVariants.map(variant => variant.text)}
										currentIndex={careerQuestClass.getCurrentMorphingIndex(careerUUID, child.id)}
										onAnimationStateChange={(isAnimating) =>
											careerQuestClass.setMorphingAnimationState(careerUUID, child.id, isAnimating)
										}
									/>
								) : (
									<div className="leading-relaxed text-questionText text-center cursor-text">
										{typeof child.content === "function" ? child.content(() => {
											careerQuestClass.handleButtonClickAdvance(careerUUID)
										}) : child.content}
									</div>
								)}
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}


export default observer(TextParentCard)
