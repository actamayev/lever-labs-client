"use client"
import "swiper/css"
import { isEmpty } from "lodash-es"
import { observer } from "mobx-react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { motion, AnimatePresence } from "framer-motion"
import { CqChallengeData } from "@bluedotrobots/common-ts"
import { useEffect, useState, useMemo, useCallback } from "react"
import RightContent from "./right-content"
import TextParentCard from "./text-parent-card"
import CqChatInterface from "../chat/cq-chat-interface"
import careerQuestClass from "../../../classes/career-quest-class"
import generateCppFromJson from "../../../utils/cpp/generate-cpp-from-json"
import useKeyboardNavigation from "../../../hooks/career/use-keyboard-navigation"
import useMousewheelNavigation from "../../../hooks/career/use-mouse-wheel-navigation"

// eslint-disable-next-line max-lines-per-function
function CareerLayout({ careerData }: { careerData: CareerQuestData }) {
	const [rightContent, setRightContent] = useState<RightContent>({
		type: "image",
		icon: careerData.initialImage
	})
	const [mainSwiperInstance, setMainSwiperInstance] = useState<SwiperType | null>(null)
	const [completedTextParents, setCompletedTextParents] = useState<Set<string>>(new Set())
	const [currentMainSlideIndex, setCurrentMainSlideIndex] = useState(0)
	const [currentTextChildIndex, setCurrentTextChildIndex] = useState(0) // Track current text child
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [navigationCommand, setNavigationCommand] = useState<"next" | "prev" | null>(null) // Command for text parent

	// Create main slides directly from sections (no flattening)
	const mainSlides = useMemo((): MainSlide[] => {
		return careerData.sections.map(section => {
			if (section.type === "textParent") {
				return {
					type: "textParent",
					id: section.id,
					data: section
				}
			} else {
				return {
					type: "challenge",
					id: section.challengeData.challengeUUID,
					data: section.challengeData
				}
			}
		})
	}, [careerData.sections])

	// Check if user can advance to next main slide
	const canAdvanceToNextMain = useCallback((slideIndex: number): boolean => {
		if (slideIndex >= mainSlides.length - 1) return false

		const currentSlide = mainSlides[slideIndex]

		if (currentSlide.type === "textParent") {
			// For text parent slides, check if completed
			return completedTextParents.has(currentSlide.id)
		} else {
			// For challenge slides, must be completed
			return careerQuestClass.isChallengeCompleted(currentSlide.data)
		}
	}, [mainSlides, completedTextParents])
	// eslint-disable-next-line max-len
	useMousewheelNavigation(
		mainSwiperInstance,
		currentMainSlideIndex,
		currentTextChildIndex,
		mainSlides,
		canAdvanceToNextMain,
		isTransitioning,
		setIsTransitioning,
		setNavigationCommand,
		setCurrentTextChildIndex
	)

	useKeyboardNavigation(
		mainSwiperInstance,
		currentMainSlideIndex,
		currentTextChildIndex,
		mainSlides,
		canAdvanceToNextMain,
		isTransitioning,
		setIsTransitioning,
		setNavigationCommand,
		setCurrentTextChildIndex
	)

	// Update main swiper navigation permissions
	useEffect(() => {
		if (!mainSwiperInstance) return

		const canAdvance = canAdvanceToNextMain(currentMainSlideIndex)
		mainSwiperInstance.allowSlideNext = canAdvance

		// Always allow going back
		mainSwiperInstance.allowSlidePrev = currentMainSlideIndex > 0
	}, [mainSwiperInstance, currentMainSlideIndex, canAdvanceToNextMain])

	// Handle main slide change
	const handleMainSlideChange = useCallback((swiper: SwiperType) => {
		const newIndex = swiper.activeIndex
		setCurrentMainSlideIndex(newIndex)
		setCurrentTextChildIndex(0) // Reset text child index when changing main slides

		const currentSlide = mainSlides[newIndex]
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!currentSlide) return

		// Update right content based on slide type
		if (currentSlide.type === "challenge") {
			setRightContent({ type: "challenge", challengeData: currentSlide.data })
		} else {
			// For text parent, show the first text's trigger image initially
			setRightContent({ type: "image", icon: currentSlide.data.children[0].triggerImage })
		}
	}, [mainSlides])

	// Helper function to get current cpp code for a specific challenge
	const getCppCodeForChallenge = useCallback((challengeData: CqChallengeData) => {
		const currentBlocklyJson = careerQuestClass.getUpdatedBlocklyJson(challengeData) || challengeData.initialBlocklyJson
		return generateCppFromJson(currentBlocklyJson)
	}, [])

	// Set initial right content
	useEffect(() => {
		if (isEmpty(mainSlides)) return
		const firstSlide = mainSlides[0]
		if (firstSlide.type === "textParent") {
			const firstText = firstSlide.data.children[0]
			setRightContent({ type: "image", icon: firstText.triggerImage })
		} else {
			setRightContent({ type: "challenge", challengeData: firstSlide.data })
		}
	}, [mainSlides])

	// Update main navigation when completion states change
	const completedChallengesCount = careerQuestClass.getCompletedChallengesForProgress(careerData.careerUUID)
	useEffect(() => {
		if (mainSwiperInstance) {
			const canAdvance = canAdvanceToNextMain(currentMainSlideIndex)
			mainSwiperInstance.allowSlideNext = canAdvance
		}
	}, [mainSwiperInstance, currentMainSlideIndex, canAdvanceToNextMain, completedChallengesCount, completedTextParents])

	const handleTextParentComplete = useCallback((textParentId: string) => {
		// Add a small delay to ensure any keyboard events have finished
		setTimeout(() => {
			setCompletedTextParents(prev => {
				const newSet = new Set(prev)
				newSet.add(textParentId)
				return newSet
			})
		}, 100)
	}, [])

	// Handle text child index changes from TextParentCard
	const handleTextChildIndexChange = useCallback((newIndex: number) => {
		setCurrentTextChildIndex(newIndex)
	}, [])

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
									keyboard={false} // Disable built-in keyboard
									speed={400}
									allowSlideNext={true}
									allowSlidePrev={true}
									allowTouchMove={false} // Also disable touch/mouse
									onSwiper={setMainSwiperInstance}
									onSlideChange={handleMainSlideChange}
									className="h-full"
									style={{
										"--swiper-theme-color": "#000000",
									} as React.CSSProperties}
								>
									{mainSlides.map((slide) => (
										<SwiperSlide key={slide.id} className="h-full">
											<div className="h-[calc(100vh-10rem)]">
												{slide.type === "challenge" ? (
													<CqChatInterface
														cppCode={getCppCodeForChallenge(slide.data)}
														challengeData={slide.data}
													/>
												) : (
													<TextParentCard
														textParentData={slide.data}
														onComplete={() => handleTextParentComplete(slide.id)}
														onSlideChange={(triggerImage) => {
															setRightContent({ type: "image", icon: triggerImage })
														}}
														onTextSectionChange={handleTextChildIndexChange}
														isActive={currentMainSlideIndex === mainSlides.findIndex(s => s.id === slide.id)}
														navigationCommand={navigationCommand}
														initialTextIndex={currentTextChildIndex}
													/>
												)}
											</div>
										</SwiperSlide>
									))}
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
				<RightContent rightContent={rightContent} color={careerData.careerColor} />
			</div>
		</div>
	)
}

export default observer(CareerLayout)
