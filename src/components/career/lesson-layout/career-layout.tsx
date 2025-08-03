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
import saveCareerProgress from "../../../utils/career-quest/save-career-progress"

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
	const [isInitializing, setIsInitializing] = useState(true)

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

	// Then modify the above useEffect to set this flag:
	useEffect(() => {
		if (!isDataReady || !mainSwiperInstance || isEmpty(mainSlides)) return

		setIsInitializing(true) // Prevent other useEffects from interfering

		const savedData = careerQuestClass.getSavedPosition(careerData.careerUUID)

		if (!savedData.position) {
			// No saved position, start at beginning
			setCurrentMainSlideIndex(0)
			setCurrentTextChildIndex(0)
			mainSwiperInstance.slideTo(0, 0)
			setIsInitializing(false)
			return
		}

		// Try to find the saved position
		const positionIndices = careerQuestClass.findPositionIndices(careerData.careerUUID, savedData.position)

		if (!positionIndices) {
			// Fallback to beginning if position not found
			setCurrentMainSlideIndex(0)
			setCurrentTextChildIndex(0)
			mainSwiperInstance.slideTo(0, 0)
			setIsInitializing(false)
			return
		}

		// *** Apply the saved position ***
		setCurrentMainSlideIndex(positionIndices.mainSlideIndex)
		setCurrentTextChildIndex(positionIndices.textChildIndex)
		mainSwiperInstance.slideTo(positionIndices.mainSlideIndex, 0)

		// Handle right content based on lock state
		const currentSlide = mainSlides[positionIndices.mainSlideIndex]

		if (currentSlide.type === "challenge") {
			setRightContent({ type: "challenge", challengeData: currentSlide.data })
		} else {
			if (savedData.isLocked) {
				const associatedChallenge = getAssociatedChallenge(currentSlide.id)
				if (associatedChallenge) {
					setLockedChallengeData(associatedChallenge)
					setRightContent({ type: "challenge", challengeData: associatedChallenge })
				}
			} else {
				const textChild = currentSlide.data.children[positionIndices.textChildIndex]
				setRightContent({ type: "image", icon: textChild.triggerImage })
			}
		}

		setIsInitializing(false) // Allow other useEffects to work normally
	}, [isDataReady, mainSwiperInstance, mainSlides, careerData.careerUUID, getAssociatedChallenge])

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
		// Don't save during initialization
		if (isInitializing) return

		const newIndex = swiper.activeIndex
		const previousIndex = currentMainSlideIndex
		const isGoingBackward = newIndex < previousIndex

		setCurrentMainSlideIndex(newIndex)

		const currentSlide = mainSlides[newIndex]

		// Only save and set text index for CHALLENGE slides
		if (currentSlide.type === "challenge") {
			// Save challenge UUID
			void saveCareerProgress(careerData.careerUUID, currentSlide.data.challengeUUID, true)
			setCurrentTextChildIndex(0) // Reset for challenges
		} else {
			// For text parent slides, just set the text child index but DON'T save
			// The saving will be handled by handleTextChildIndexChange
			let textChildIndex: number

			if (isGoingBackward) {
				// Going backward: land on last text child
				textChildIndex = currentSlide.data.children.length - 1
			} else {
				// Going forward: land on first text child
				textChildIndex = 0
			}

			setCurrentTextChildIndex(textChildIndex)
		}

		if (currentSlide.type !== "challenge") return
		// Mark this challenge as reached
		setReachedChallenges(prev => {
			const newSet = new Set(prev)
			newSet.add(currentSlide.data.challengeUUID)
			return newSet
		})

		// Lock this challenge (right content will be handled by useEffect)
		setLockedChallengeData(currentSlide.data)
	}, [isInitializing, currentMainSlideIndex, mainSlides, careerData.careerUUID])

	// Handle right content updates based on current slide and lock state
	useEffect(() => {
		if (isInitializing) return // Don't override during initialization

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
			return
		}

		// Text parent slide
		if (!hasTextSectionGraduated(currentSlide.id)) {
			// Section hasn't graduated - show images normally
			// FIX: Use currentTextChildIndex instead of 0
			const textChild = currentSlide.data.children[currentTextChildIndex]
			setRightContent({ type: "image", icon: textChild.triggerImage })
			return
		}

		// Section has graduated - show locked challenge
		if (lockedChallengeData) {
			setRightContent({ type: "challenge", challengeData: lockedChallengeData })
			return
		}

		// Fallback: lock the associated challenge
		const associatedChallenge = getAssociatedChallenge(currentSlide.id)
		if (associatedChallenge) {
			setLockedChallengeData(associatedChallenge)
			setRightContent({ type: "challenge", challengeData: associatedChallenge })
		}
	}, [isInitializing, isDataReady, currentMainSlideIndex, currentTextChildIndex, mainSlides, hasTextSectionGraduated, lockedChallengeData, getAssociatedChallenge, careerData.initialImage])

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

		// Don't save during initialization
		if (isInitializing) return

		// Save progress when text child changes
		const currentSlide = mainSlides[currentMainSlideIndex]
		if (currentSlide.type !== "textParent") return

		const textChild = currentSlide.data.children[newIndex]

		// Calculate isLocked based on whether the text section has graduated
		const hasGraduated = hasTextSectionGraduated(currentSlide.id)
		const isLocked = hasGraduated && lockedChallengeData !== null

		console.log("saving text child ID", textChild.id, "isLocked:", isLocked)
		void saveCareerProgress(careerData.careerUUID, textChild.id, isLocked)
	}, [isInitializing, currentMainSlideIndex, mainSlides, careerData.careerUUID, hasTextSectionGraduated, lockedChallengeData])


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
									onSwiper={setMainSwiperInstance}
									onSlideChange={isDataReady && !isInitializing ? handleMainSlideChange : undefined} // Only attach when not initializing
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
