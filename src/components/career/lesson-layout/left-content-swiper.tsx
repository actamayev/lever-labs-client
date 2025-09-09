
"use client"
import "swiper/css"
import { useEffect } from "react"
import { observer } from "mobx-react"
import { Swiper, SwiperSlide } from "swiper/react"
import TextParentCard from "./text-parent-card"
import ChallengeChatInterface from "../chat/challenge-chat-interface"
import getCareerQuestClass from "../../../classes/career-quest-class"
import useKeyboardNavigation from "../../../hooks/career-quest/use-keyboard-navigation"
import useMousewheelNavigation from "../../../hooks/career-quest/use-mouse-wheel-navigation"
import getNavigationManagerClass from "../../../classes/navigation-manager-class"

function EmptyTextParentCard(): React.ReactNode {
	return (
		<div className="border-2 border-swan rounded-3xl bg-polar h-full overflow-hidden">
			<div className="h-full flex items-center justify-center">
				{/* Empty - just the styled container */}
			</div>
		</div>
	)
}


function LeftContentSwiper({ careerData }: { careerData: CareerQuestData }): React.ReactNode {
	const isDataReady = getCareerQuestClass().hasRetrievedAllChallengesForCareer(careerData.careerUUID)
	const mainSlides = getNavigationManagerClass().getMainSlides(careerData.careerUUID)

	useMousewheelNavigation(careerData.careerUUID)
	useKeyboardNavigation(careerData.careerUUID)

	useEffect((): () => void => {
		return (): void => {
			getNavigationManagerClass().cleanupAllSwipers(careerData.careerUUID)
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
			initialSlide={getNavigationManagerClass().getCurrentMainSlideIndex(careerData.careerUUID)}
			onSwiper={(swiper): void => {
				getCareerQuestClass().setSwiperInstance(careerData.careerUUID, swiper)
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
				mainSlides.map((slide): React.ReactNode => (
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
