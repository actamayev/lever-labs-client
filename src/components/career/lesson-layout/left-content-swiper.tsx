/* eslint-disable max-len */
"use client"
import "swiper/css"
import { useEffect } from "react"
import { observer } from "mobx-react"
import { Swiper, SwiperSlide } from "swiper/react"
import TextParentCard from "./text-parent-card"
import ChallengeChatInterface from "../chat/challenge-chat-interface"
import careerQuestClass from "../../../classes/career-quest-class"
import useKeyboardNavigation from "../../../hooks/career-quest/use-keyboard-navigation"
import useMousewheelNavigation from "../../../hooks/career-quest/use-mouse-wheel-navigation"

function EmptyTextParentCard() {
	return (
		<div className="border-2 border-swan rounded-3xl bg-polar h-full overflow-hidden">
			<div className="h-full flex items-center justify-center">
				{/* Empty - just the styled container */}
			</div>
		</div>
	)
}

// eslint-disable-next-line max-lines-per-function
function LeftContentSwiper({ careerData }: { careerData: CareerQuestData }) {
	const isDataReady = careerQuestClass.hasRetrievedAllChallengesForCareer(careerData.careerUUID)
	const mainSlides = careerQuestClass.getMainSlides(careerData.careerUUID)

	useMousewheelNavigation(careerData.careerUUID)
	useKeyboardNavigation(careerData.careerUUID)

	useEffect(() => {
		return () => {
			careerQuestClass.cleanupAllSwipers(careerData.careerUUID)
		}
	}, [careerData.careerUUID])

	return (
		<Swiper
			key={isDataReady ? "ready" : "loading"}
			direction="vertical"
			slidesPerView={1}
			spaceBetween={0}
			keyboard={false}
			speed={400}
			allowSlideNext={false}
			allowSlidePrev={true}
			allowTouchMove={false}
			initialSlide={careerQuestClass.getCurrentMainSlideIndex(careerData.careerUUID)}
			onSwiper={(swiper) => {
				careerQuestClass.setSwiperInstance(careerData.careerUUID, swiper)
			}}
			className="h-full"
		>
			{!isDataReady ? (
				<SwiperSlide className="h-full">
					<div className="h-[calc(100vh-10rem)]">
						<EmptyTextParentCard />
					</div>
				</SwiperSlide>
			) : (
			// Show actual content when data is ready
				mainSlides.map((slide) => (
					<SwiperSlide key={slide.id} className="h-full">
						<div className="h-[calc(100vh-10rem)]">
							{slide.type === "challenge" ? (
								<ChallengeChatInterface challengeData={slide.data} />
							) : (
								<TextParentCard
									slide={slide}
									careerUUID={careerData.careerUUID}
								/>
							)}
						</div>
					</SwiperSlide>
				))
			)}
		</Swiper>
	)
}

export default observer(LeftContentSwiper)
