/* eslint-disable max-len */
"use client"
import "swiper/css"
import { isEmpty } from "lodash-es"
import { observer } from "mobx-react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useCallback } from "react"
import RightContent from "./right-content"
import { cn } from "../../../lib/shadcn/utils"
import TextParentCard from "./text-parent-card"
import CqChatInterface from "../chat/cq-chat-interface"
import careerQuestClass from "../../../classes/career-quest-class"
import saveCareerProgress from "../../../utils/career-quest/save-career-progress"
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
	const [rightContent, setRightContent] = useState<RightContent>({
		type: "image",
		icon: careerData.initialImage
	})
	const currentMainSlideIndex = careerQuestClass.getCurrentMainSlideIndex(careerData.careerUUID)
	const currentTextChildIndex = careerQuestClass.getCurrentTextChildIndex(careerData.careerUUID)
	//TODO 8/4/25: Move these states to the class:
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [navigationCommand, setNavigationCommand] = useState<"next" | "prev" | null>(null) // Command for text parent
	const isDataReady = careerQuestClass.hasRetrievedAllChallengesForCareer(careerData.careerUUID)

	// Get main slides from career instance
	const mainSlides = careerQuestClass.getMainSlides(careerData.careerUUID)

	// Then modify the above useEffect to set this flag:
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
			setRightContent({ type: "challenge", challengeData: currentSlide.data })
			return
		}

		const currentSectionIndex = careerData.sections.findIndex(section => section.id === currentSlide.id)
		const nextChallenge = careerData.sections.slice(currentSectionIndex + 1).find(section => section.type === "challenge") as ChallengeSection | undefined

		if (nextChallenge && careerQuestClass.hasChallengeBeenSeen(careerData.careerUUID, nextChallenge.challengeData.challengeUUID)) {
			setRightContent({ type: "challenge", challengeData: nextChallenge.challengeData })
		} else {
			const textChild = currentSlide.data.children[indices.textChildIndex]
			setRightContent({ type: "image", icon: textChild.triggerImage })
		}
	}, [isDataReady, careerData.careerUUID, mainSlides, careerData.sections])

	useMousewheelNavigation(
		careerData.careerUUID,
		isTransitioning,
		setIsTransitioning,
		setNavigationCommand
	)

	useKeyboardNavigation(
		careerData.careerUUID,
		isTransitioning,
		setIsTransitioning,
		setNavigationCommand
	)

	const handleMainSlideChange = useCallback((swiper: SwiperType) => {
		const newIndex = swiper.activeIndex
		const previousIndex = currentMainSlideIndex
		const isGoingBackward = newIndex < previousIndex

		// Update class state instead of component state
		careerQuestClass.setCurrentMainSlideIndex(careerData.careerUUID, newIndex)

		const currentSlide = mainSlides[newIndex]

		if (currentSlide.type === "challenge") {
			void careerQuestClass.markChallengeAsSeen(careerData.careerUUID, currentSlide.data.challengeUUID)
			void saveCareerProgress(careerData.careerUUID, currentSlide.data.challengeUUID)

			careerQuestClass.setCurrentTextChildIndex(careerData.careerUUID, 0)
			return
		}

		// For text sections, determine textChildIndex
		let textChildIndex: number
		if (isGoingBackward) {
			textChildIndex = currentSlide.data.children.length - 1
		} else {
			textChildIndex = 0
		}
		careerQuestClass.setCurrentTextChildIndex(careerData.careerUUID, textChildIndex)

		// Save progress when transitioning to text sections
		if (currentSlide.type === "textParent") {
			const textChild = currentSlide.data.children[textChildIndex]
			void saveCareerProgress(careerData.careerUUID, textChild.id)
		}
	}, [careerData.careerUUID, currentMainSlideIndex, mainSlides])

	// Handle right content updates based on current slide and lock state
	useEffect(() => {
		if (!isDataReady) {
			setRightContent({ type: "image", icon: careerData.initialImage })
			return
		}
		if (isEmpty(mainSlides)) return

		const currentSlide = mainSlides[currentMainSlideIndex]

		if (currentSlide.type === "challenge") {
			setRightContent({ type: "challenge", challengeData: currentSlide.data })
			return
		}

		const currentSectionIndex = careerData.sections.findIndex(section => section.id === currentSlide.id)
		const nextChallenge = careerData.sections.slice(currentSectionIndex + 1).find(section => section.type === "challenge") as ChallengeSection | undefined

		if (nextChallenge && careerQuestClass.hasChallengeBeenSeen(careerData.careerUUID, nextChallenge.challengeData.challengeUUID)) {
			setRightContent({ type: "challenge", challengeData: nextChallenge.challengeData })
			return
		}
		// Show the text image
		const textChild = currentSlide.data.children[currentTextChildIndex]
		setRightContent({ type: "image", icon: textChild.triggerImage })
	}, [isDataReady, currentMainSlideIndex, currentTextChildIndex, careerData.careerUUID, careerData.initialImage, mainSlides, careerData.sections])

	const handleTextChildIndexChange = useCallback((newIndex: number) => {
		careerQuestClass.setCurrentTextChildIndex(careerData.careerUUID, newIndex)

		// Save progress when text child changes
		const currentSlide = mainSlides[currentMainSlideIndex]
		if (currentSlide.type !== "textParent") return

		const textChild = currentSlide.data.children[newIndex]
		void saveCareerProgress(careerData.careerUUID, textChild.id)
	}, [careerData.careerUUID, currentMainSlideIndex, mainSlides])

	const handleGoToNextSection = useCallback(() => {
		const swiperInstance = careerQuestClass.getSwiperInstance(careerData.careerUUID)
		if (!swiperInstance) return

		const canAdvance = careerQuestClass.canAdvanceToNextMain(careerData.careerUUID, currentMainSlideIndex)
		if (!canAdvance) return

		setIsTransitioning(true)
		swiperInstance.slideNext()
		setTimeout(() => setIsTransitioning(false), 400)
	}, [currentMainSlideIndex, careerData.careerUUID])

	useEffect(() => {
		return () => {
			careerQuestClass.removeSwiperInstance(careerData.careerUUID)
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
									onSlideChange={isDataReady ? handleMainSlideChange : undefined} // Remove isInitializing check
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
														<CqChatInterface
															challengeData={slide.data}
															onGoToNextSection={handleGoToNextSection}
														/>
													) : (
														<TextParentCard
															textParentData={slide.data}
															onSlideChange={(triggerImage) => {
																const currentSlide = mainSlides[currentMainSlideIndex]
																if (currentSlide.type === "textParent") {
																	setRightContent({ type: "image", icon: triggerImage })
																}
															}}
															onTextSectionChange={handleTextChildIndexChange}
															isActive={currentMainSlideIndex === mainSlides.findIndex(s => s.id === slide.id)}
															navigationCommand={navigationCommand}
															initialTextIndex={currentTextChildIndex}
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
					<RightContent rightContent={rightContent} color={careerData.careerColor} isDataReady={isDataReady} />
				</div>
			</div>
		</div>
	)
}

export default observer(CareerLayout)
