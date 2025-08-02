/* eslint-disable max-len */
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
import { cn } from "../../../lib/shadcn/utils"
import TextParentCard from "./text-parent-card"
import CqChatInterface from "../chat/cq-chat-interface"
import careerQuestClass from "../../../classes/career-quest-class"
import generateCppFromJson from "../../../utils/cpp/generate-cpp-from-json"
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
	const [mainSwiperInstance, setMainSwiperInstance] = useState<SwiperType | null>(null)
	const [completedTextParents, setCompletedTextParents] = useState<Set<string>>(new Set())
	const [currentMainSlideIndex, setCurrentMainSlideIndex] = useState(0)
	const [currentTextChildIndex, setCurrentTextChildIndex] = useState(0)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [navigationCommand, setNavigationCommand] = useState<"next" | "prev" | null>(null) // Command for text parent
	// Add these new state variables
	const [reachedChallenges, setReachedChallenges] = useState<Set<string>>(new Set())
	const [lockedChallengeData, setLockedChallengeData] = useState<CqChallengeData | null>(null)
	const isDataReady = careerQuestClass.hasRetrievedAllChallengesForCareer(careerData.careerUUID)

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

	useEffect(() => {
		if (!isDataReady) return

		setCurrentMainSlideIndex(0)
		setCurrentTextChildIndex(0)

		// Update swiper position if it exists
		if (mainSwiperInstance && !isEmpty(mainSlides)) {
			mainSwiperInstance.slideTo(0, 0)
		}
	}, [isDataReady, mainSwiperInstance, mainSlides, careerData.careerUUID])

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

	// Helper to find which challenge is associated with a text parent
	const getAssociatedChallenge = useCallback((textParentId: string): CqChallengeData | null => {
		const textParentIndex = careerData.sections.findIndex(section =>
			section.type === "textParent" && section.id === textParentId
		)

		if (textParentIndex === -1) return null

		// Look for the next challenge section after this text parent
		for (let i = textParentIndex + 1; i < careerData.sections.length; i++) {
			const section = careerData.sections[i]
			if (section.type === "challenge") {
				return section.challengeData
			}
		}

		return null
	}, [careerData.sections])

	// Check if a text section has "graduated" (can no longer show images)
	const hasTextSectionGraduated = useCallback((textParentId: string): boolean => {
		const associatedChallenge = getAssociatedChallenge(textParentId)
		if (!associatedChallenge) return false

		const isReached = reachedChallenges.has(associatedChallenge.challengeUUID)
		const isCompleted = careerQuestClass.isChallengeCompleted(associatedChallenge)

		return isReached || isCompleted
	}, [getAssociatedChallenge, reachedChallenges])

	// Add this useEffect to initialize reached challenges for already completed ones
	useEffect(() => {
		const completedChallenges = new Set<string>()

		// Mark all completed challenges as reached
		careerData.sections.forEach(section => {
			if (section.type === "challenge") {
				if (careerQuestClass.isChallengeCompleted(section.challengeData)) {
					completedChallenges.add(section.challengeData.challengeUUID)
				}
			}
		})

		setReachedChallenges(completedChallenges)

		// Set initial locked challenge if any sections have graduated
		if (completedChallenges.size === 0) return
		const firstSlide = mainSlides[0]
		if (firstSlide.type === "textParent") {
			const associatedChallenge = getAssociatedChallenge(firstSlide.id)
			if (associatedChallenge && completedChallenges.has(associatedChallenge.challengeUUID)) {
				setLockedChallengeData(associatedChallenge)
			}
		}
	}, [careerData.sections, mainSlides, getAssociatedChallenge])

	const handleMainSlideChange = useCallback((swiper: SwiperType) => {
		const newIndex = swiper.activeIndex
		setCurrentMainSlideIndex(newIndex)
		setCurrentTextChildIndex(0)

		const currentSlide = mainSlides[newIndex]

		if (currentSlide.type !== "challenge") return
		// Mark this challenge as reached
		setReachedChallenges(prev => {
			const newSet = new Set(prev)
			newSet.add(currentSlide.data.challengeUUID)
			return newSet
		})

		// Lock this challenge (right content will be handled by useEffect)
		setLockedChallengeData(currentSlide.data)
	}, [mainSlides])

	// Handle right content updates based on current slide and lock state
	useEffect(() => {
		if (!isDataReady) {
			// Show initial image while loading
			setRightContent({ type: "image", icon: careerData.initialImage })
			return
		}
		if (isEmpty(mainSlides)) return

		const currentSlide = mainSlides[currentMainSlideIndex]

		if (currentSlide.type === "challenge") {
			// Always show the current challenge when on a challenge slide
			setRightContent({ type: "challenge", challengeData: currentSlide.data })
		} else {
			// Text parent slide
			if (hasTextSectionGraduated(currentSlide.id)) {
				// Section has graduated - show locked challenge
				if (lockedChallengeData) {
					setRightContent({ type: "challenge", challengeData: lockedChallengeData })
				} else {
					// Fallback: lock the associated challenge
					const associatedChallenge = getAssociatedChallenge(currentSlide.id)
					// eslint-disable-next-line max-depth
					if (associatedChallenge) {
						setLockedChallengeData(associatedChallenge)
						setRightContent({ type: "challenge", challengeData: associatedChallenge })
					}
				}
			} else {
				// Section hasn't graduated - show images normally
				setRightContent({ type: "image", icon: currentSlide.data.children[0].triggerImage })
			}
		}
	// eslint-disable-next-line max-len
	}, [currentMainSlideIndex, mainSlides, hasTextSectionGraduated, lockedChallengeData, getAssociatedChallenge, isDataReady, careerData.initialImage])

	// Helper function to get current cpp code for a specific challenge
	const getCppCodeForChallenge = useCallback((challengeData: CqChallengeData) => {
		const currentBlocklyJson = careerQuestClass.getUpdatedBlocklyJson(challengeData) || challengeData.initialBlocklyJson
		return generateCppFromJson(currentBlocklyJson)
	}, [])

	// Update main navigation when completion states change
	const completedChallengesCount = careerQuestClass.getCompletedChallengesForProgress(careerData.careerUUID)
	useEffect(() => {
		if (!mainSwiperInstance) return
		const canAdvance = canAdvanceToNextMain(currentMainSlideIndex)
		mainSwiperInstance.allowSlideNext = canAdvance
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
									keyboard={false}
									speed={400}
									allowSlideNext={isDataReady} // UPDATE: Only allow navigation when ready
									allowSlidePrev={isDataReady} // UPDATE: Only allow navigation when ready
									allowTouchMove={false}
									onSwiper={setMainSwiperInstance}
									onSlideChange={isDataReady ? handleMainSlideChange : undefined}
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
															cppCode={getCppCodeForChallenge(slide.data)}
															challengeData={slide.data}
														/>
													) : (
														<TextParentCard
															textParentData={slide.data}
															onComplete={() => handleTextParentComplete(slide.id)}
															onSlideChange={(triggerImage) => {
																const currentSlide = mainSlides[currentMainSlideIndex]
																if (currentSlide.type === "textParent" && !hasTextSectionGraduated(currentSlide.id)) {
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
