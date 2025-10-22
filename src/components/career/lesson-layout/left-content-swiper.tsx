
"use client"
import "swiper/css"
import { useEffect } from "react"
import { observer } from "mobx-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { AnimatePresence, motion } from "framer-motion"
import TextParentCard from "./text-parent-card"
import ChallengeChatInterface from "../chat/challenge-chat-interface"
import careerQuestClass from "../../../classes/career-quest-class"
import useKeyboardNavigation from "../../../hooks/career-quest/use-keyboard-navigation"
import useMousewheelNavigation from "../../../hooks/career-quest/use-mouse-wheel-navigation"
import navigationManagerClass from "../../../classes/navigation-manager-class"
import { getLeftContentComponent } from "../../../utils/career-quest/career-quest-left-content/all-career-quest-left-content"

function EmptyTextParentCard(): React.ReactNode {
	return (
		<div className="border-2 border-swan rounded-3xl bg-polar h-full overflow-hidden">
			<div className="h-full flex items-center justify-center">
				{/* Empty - just the styled container */}
			</div>
		</div>
	)
}

function ChallengeTextCard({ challengeUUID }: { challengeUUID: string }): React.ReactNode {
	return (
		<div className="border-2 border-swan rounded-3xl bg-polar h-full overflow-hidden">
			<div className="h-full flex items-center justify-center px-[25px]">
				<div className="max-w-none text-4xl leading-relaxed">
					<div className="text-question-text text-center cursor-text leading-relaxed">
						{getLeftContentComponent(challengeUUID)}
					</div>
				</div>
			</div>
		</div>
	)
}

function LeftContentSwiper({ careerData }: { careerData: CareerQuestData }): React.ReactNode {
	const isDataReady = careerQuestClass.hasRetrievedAllChallengesForCareer(careerData.careerUUID)
	const mainSlides = navigationManagerClass.getMainSlides(careerData.careerUUID)

	useMousewheelNavigation(careerData.careerUUID)
	useKeyboardNavigation(careerData.careerUUID)

	useEffect((): () => void => {
		return (): void => {
			navigationManagerClass.cleanupAllSwipers(careerData.careerUUID)
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
			initialSlide={navigationManagerClass.getCurrentMainSlideIndex(careerData.careerUUID)}
			onSwiper={(swiper): void => {
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
				mainSlides.map((slide): React.ReactNode => {
					let content: React.ReactNode

					if (slide.type === "challenge") {
						// For challenge sections, show text by default, chat when toggled
						const isChatToggled = careerQuestClass.isChallengeChatToggled(careerData.careerUUID)
						content = (
							<AnimatePresence mode="wait">
								{isChatToggled ? (
									<motion.div
										key={`challenge-chat-${slide.data.challengeUUID}`}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
										className="h-full w-full"
									>
										<ChallengeChatInterface challengeData={slide.data} />
									</motion.div>
								) : (
									<motion.div
										key={`challenge-text-${slide.data.challengeUUID}`}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
										className="h-full w-full"
									>
										<ChallengeTextCard challengeUUID={slide.data.challengeUUID} />
									</motion.div>
								)}
							</AnimatePresence>
						)
					} else {
						content = (
							<TextParentCard
								slide={slide}
								careerUUID={careerData.careerUUID}
							/>
						)
					}

					return (
						<SwiperSlide key={slide.id} className="h-full">
							<div className="h-[calc(100vh-10rem)]">
								{content}
							</div>
						</SwiperSlide>
					)
				})
			)}
		</Swiper>
	)
}

export default observer(LeftContentSwiper)
