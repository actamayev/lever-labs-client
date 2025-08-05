/* eslint-disable max-len */
"use client"
import "swiper/css"
import { useEffect } from "react"
import { isEmpty } from "lodash-es"
import { observer } from "mobx-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { motion, AnimatePresence } from "framer-motion"
import RightContent from "./right-content"
import { cn } from "../../../lib/shadcn/utils"
import TextParentCard from "./text-parent-card"
import CqChatInterface from "../chat/cq-chat-interface"
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
function CareerLayout({ careerData }: { careerData: CareerQuestData }) {
	const currentMainSlideIndex = careerQuestClass.getCurrentMainSlideIndex(careerData.careerUUID)
	const currentTextChildIndex = careerQuestClass.getCurrentTextChildIndex(careerData.careerUUID)
	const isDataReady = careerQuestClass.hasRetrievedAllChallengesForCareer(careerData.careerUUID)
	const mainSlides = careerQuestClass.getMainSlides(careerData.careerUUID)

	useEffect(() => {
		if (!isDataReady || isEmpty(mainSlides)) return

		const restored = careerQuestClass.restoreNavigationFromSavedPosition(careerData.careerUUID)
		if (!restored) return

		const swiperInstance = careerQuestClass.getSwiperInstance(careerData.careerUUID)
		if (!swiperInstance) return

		const indices = careerQuestClass.getNavigationIndices(careerData.careerUUID)
		swiperInstance.slideTo(indices.mainSlideIndex, 0)

		// Handle right content based on current slide
		const currentSlide = mainSlides[indices.mainSlideIndex]

		if (currentSlide.type === "challenge") {
			careerQuestClass.setRightContent(careerData.careerUUID, { type: "challenge", challengeData: currentSlide.data })
			return
		}

		const currentSectionIndex = careerData.sections.findIndex(section => section.id === currentSlide.id)
		const nextChallenge = careerData.sections.slice(currentSectionIndex + 1).find(section => section.type === "challenge") as ChallengeSection | undefined

		if (nextChallenge && careerQuestClass.hasChallengeBeenSeen(careerData.careerUUID, nextChallenge.challengeData.challengeUUID)) {
			careerQuestClass.setRightContent(careerData.careerUUID, { type: "challenge", challengeData: nextChallenge.challengeData })
		} else {
			const textChild = currentSlide.data.children[indices.textChildIndex]
			careerQuestClass.setRightContent(careerData.careerUUID, { type: "image", icon: textChild.triggerImage })
		}
	}, [isDataReady, careerData.careerUUID, mainSlides, careerData.sections])

	useMousewheelNavigation(careerData.careerUUID)
	useKeyboardNavigation(careerData.careerUUID)

	// Handle right content updates based on current slide and lock state
	useEffect(() => {
		if (!isDataReady) {
			careerQuestClass.setRightContent(careerData.careerUUID, { type: "image", icon: careerData.initialImage })
			return
		}

		const currentSlide = careerQuestClass.getCurrentMainSlide(careerData.careerUUID)

		if (currentSlide.type === "challenge") {
			careerQuestClass.setRightContent(careerData.careerUUID, { type: "challenge", challengeData: currentSlide.data })
			return
		}

		const currentSectionIndex = careerData.sections.findIndex(section => section.id === currentSlide.id)
		const nextChallenge = careerData.sections.slice(currentSectionIndex + 1).find(section => section.type === "challenge") as ChallengeSection | undefined

		if (nextChallenge && careerQuestClass.hasChallengeBeenSeen(careerData.careerUUID, nextChallenge.challengeData.challengeUUID)) {
			careerQuestClass.setRightContent(careerData.careerUUID, { type: "challenge", challengeData: nextChallenge.challengeData })
			return
		}
		// Show the text image
		const textChild = currentSlide.data.children[currentTextChildIndex]
		careerQuestClass.setRightContent(careerData.careerUUID, { type: "image", icon: textChild.triggerImage })
	}, [isDataReady, currentMainSlideIndex, currentTextChildIndex, careerData.careerUUID, careerData.initialImage, careerData.sections])

	useEffect(() => {
		return () => {
			careerQuestClass.cleanupAllSwipers(careerData.careerUUID)
		}
	}, [careerData.careerUUID])

	return (
		<div className="flex h-full">
			{/* Left Panel - Main Swiper */}
			<div className="relative" style={{ width: "45%" }}>
				<div className="px-[100px] py-8 h-full pointer-events-none">
					<div className="h-full pointer-events-auto">
						<AnimatePresence mode="wait">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, ease: "easeOut" }}
								className="h-full"
							>
								<Swiper
									direction="vertical"
									slidesPerView={1}
									spaceBetween={0}
									keyboard={false}
									speed={400}
									allowSlideNext={isDataReady}
									allowSlidePrev={isDataReady}
									allowTouchMove={false}
									onSwiper={(swiper) => {
										careerQuestClass.setSwiperInstance(careerData.careerUUID, swiper)
									}}
									onSlideChange={(_swiper) => careerQuestClass.handleMainSlideChange(careerData.careerUUID)} // Remove isInitializing check
									className="h-full"
									style={{
										"--swiper-theme-color": "#000000",
									} as React.CSSProperties}
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
														<CqChatInterface challengeData={slide.data} />
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
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>

			{/* Right Panel - Unchanged */}
			<div
				className="sticky top-0 h-[calc(100vh-10rem)]"
				style={{ width: "55%" }}
			>
				<div
					className={cn(
						"flex items-center justify-center h-full",
						"border-2 border-swan rounded-3xl bg-polar my-8"
					)}
					style={{ marginRight: "100px" }}
				>
					<RightContent careerData={careerData} />
				</div>
			</div>
		</div>
	)
}

export default observer(CareerLayout)
