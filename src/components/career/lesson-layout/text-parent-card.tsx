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


function TextParentCard(props: TextParentCardProps): React.ReactNode {
	const { slide, careerUUID } = props
	const textParentData = slide.data
	const currentMainSlideIndex = careerQuestClass.getCurrentMainSlideIndex(careerUUID)
	const mainSlides = careerQuestClass.getMainSlides(careerUUID)
	const isActive = currentMainSlideIndex === mainSlides.findIndex((s): boolean => s.id === slide.id)
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
				onSwiper={(swiper): void => {
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
				{toJS(textParentData.children).map((child): React.ReactNode => (
					<SwiperSlide key={child.id} className="h-full">
						<div className="h-full flex items-center justify-center px-[25px]">
							<div className="max-w-none text-4xl leading-relaxed">
								{child.type === "morphingText" ? (
									<NavigationMorphingText
										staticText={child.staticText}
										morphingTexts={child.morphingVariants.map((variant): string => variant.text)}
										currentIndex={careerQuestClass.getCurrentMorphingIndex(careerUUID, child.id)}
										onAnimationStateChange={(isAnimating): void =>
											careerQuestClass.setMorphingAnimationState(careerUUID, child.id, isAnimating)
										}
									/>
								) : (
									<div className="text-questionText text-center cursor-text leading-relaxed">
										{typeof child.content === "function" ? child.content((): void => {
											careerQuestClass.handleButtonClickAdvance(careerUUID)
										}) : typeof child.content === "string" ? getContentComponent(child.content, (): void => {
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
