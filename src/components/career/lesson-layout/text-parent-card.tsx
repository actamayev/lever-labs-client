/* eslint-disable no-nested-ternary */
import { observer } from "mobx-react"
import { toJS } from "mobx"
import { Swiper, SwiperSlide } from "swiper/react"
import type { CareerUUID } from "@bluedotrobots/common-ts"
import careerQuestClass from "../../../classes/career-quest-class"
import { NavigationMorphingText } from "../morphing-text/navigation-morphing-text"
import { getContentComponent } from "../../../utils/career-quest/career-quest-content"

interface TextParentCardProps {
	slide: TextParentMainSlide
	careerUUID: CareerUUID
}

// eslint-disable-next-line max-lines-per-function
function TextParentCard(props: TextParentCardProps) {
	const { slide, careerUUID } = props
	const textParentData = slide.data
	const currentMainSlideIndex = careerQuestClass.getCurrentMainSlideIndex(careerUUID)
	const mainSlides = careerQuestClass.getMainSlides(careerUUID)
	const isActive = currentMainSlideIndex === mainSlides.findIndex(s => s.id === slide.id)
	// Get the text child index specific to this slide
	const currentTextChildIndex = careerQuestClass.getCurrentTextChildIndex(careerUUID, slide.id)

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
					// If this slide is currently active, immediately sync to the correct index
					if (isActive) {
						swiper.slideTo(currentTextChildIndex, 0) // Instant slide with no animation
						careerQuestClass.onTextSlideChange(careerUUID)
					}
				}}
				className="h-full"
				nested={true}
				initialSlide={0}
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
										}) : typeof child.content === "string" ? getContentComponent(child.content, () => {
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
