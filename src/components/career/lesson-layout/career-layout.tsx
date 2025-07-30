"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel, Keyboard, FreeMode } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import { observer } from "mobx-react"
import { motion, AnimatePresence } from "framer-motion"
import { ChallengeUUID, CqChallengeData } from "@bluedotrobots/common-ts"
import { useEffect, useState, useMemo, useCallback } from "react"
import RightContent from "./right-content"
import CqChatInterface from "../chat/cq-chat-interface"
import careerQuestClass from "../../../classes/career-quest-class"
import generateCppFromJson from "../../../utils/cpp/generate-cpp-from-json"

// Enhanced TextParentCard with nested Swiper
interface TextParentCardProps {
	textParentData: TextParentSection
	onComplete: () => void
	onSlideChange: (triggerImage: string) => void
	onTextSectionChange: (index: number, isLastSection: boolean) => void
}

const TextParentCard: React.FC<TextParentCardProps> = ({
	textParentData,
	onComplete,
	onSlideChange,
	onTextSectionChange
}) => {
	const [nestedSwiperInstance, setNestedSwiperInstance] = useState<SwiperType | null>(null)
	const [currentTextIndex, setCurrentTextIndex] = useState(0)
	const [hasCompletedAllText, setHasCompletedAllText] = useState(false)

	// Handle nested swiper slide change
	const handleNestedSlideChange = useCallback((swiper: SwiperType) => {
		const newIndex = swiper.activeIndex
		setCurrentTextIndex(newIndex)

		const currentText = textParentData.children[newIndex]
		onSlideChange(currentText.triggerImage)

		// Check if this is the last text section
		const isLastSection = newIndex === textParentData.children.length - 1
		onTextSectionChange(newIndex, isLastSection)

		// Mark as completed when reaching the last section
		if (isLastSection && !hasCompletedAllText) {
			setHasCompletedAllText(true)
			onComplete()
		}
	}, [textParentData.children, onSlideChange, onTextSectionChange, onComplete, hasCompletedAllText])

	// Update nested swiper navigation permissions
	useEffect(() => {
		if (!nestedSwiperInstance) return

		// Always allow going back within text sections
		nestedSwiperInstance.allowSlidePrev = currentTextIndex > 0

		// Allow going forward within text sections
		nestedSwiperInstance.allowSlideNext = currentTextIndex < textParentData.children.length - 1
	}, [nestedSwiperInstance, currentTextIndex, textParentData.children.length])

	return (
		<div className="border-2 border-swan rounded-3xl bg-polar h-full overflow-hidden">
			<Swiper
				direction="vertical"
				slidesPerView={1}
				spaceBetween={0}
				mousewheel={{
					enabled: true,
					forceToAxis: true,
					releaseOnEdges: true,
					sensitivity: 2,
					thresholdDelta: 5,
					thresholdTime: 300
				}}
				freeMode={{
					enabled: true,
					sticky: true,
					minimumVelocity: 0.1,
					momentum: true,
					momentumRatio: 0.6,
					momentumBounce: true,
					momentumBounceRatio: 0.3,
					momentumVelocityRatio: 0.8
				}}
				resistance={true}
				resistanceRatio={0.85}
				keyboard={{
					enabled: true,
					onlyInViewport: true
				}}
				speed={400}
				allowSlideNext={true}
				allowSlidePrev={true}
				modules={[Mousewheel, Keyboard, FreeMode]}
				onSwiper={setNestedSwiperInstance}
				onSlideChange={handleNestedSlideChange}
				className="h-full"
				nested={true} // Important: Enable nested mode
				style={{
					"--swiper-theme-color": "#000000",
				} as React.CSSProperties}
			>
				{textParentData.children.map((child) => (
					<SwiperSlide key={child.id} className="h-full">
						<div className="h-full flex items-center justify-center px-[75px]">
							<div className="prose prose-lg max-w-none text-4xl">
								<p className="leading-relaxed text-questionText text-center cursor-text">
									{child.content}
								</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

// Main slide types - no longer flattened
interface TextParentMainSlide {
	type: "textParent"
	id: string
	data: TextParentSection
}

interface ChallengeMainSlide {
	type: "challenge"
	id: ChallengeUUID
	data: CqChallengeData
}

type MainSlide = TextParentMainSlide | ChallengeMainSlide

// eslint-disable-next-line max-lines-per-function
function CareerLayout({ careerData }: { careerData: CareerQuestData }) {
	const [rightContent, setRightContent] = useState<RightContent>({
		type: "image",
		icon: careerData.initialImage
	})
	const [mainSwiperInstance, setMainSwiperInstance] = useState<SwiperType | null>(null)
	const [completedTextParents, setCompletedTextParents] = useState<Set<string>>(new Set())
	const [currentMainSlideIndex, setCurrentMainSlideIndex] = useState(0)

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

	// Handle text parent completion
	const handleTextParentComplete = useCallback((textParentId: string) => {
		setCompletedTextParents(prev => {
			const newSet = new Set(prev)
			newSet.add(textParentId)
			return newSet
		})
	}, [])

	// Helper function to get current cpp code for a specific challenge
	const getCppCodeForChallenge = useCallback((challengeData: CqChallengeData) => {
		const currentBlocklyJson = careerQuestClass.getUpdatedBlocklyJson(challengeData) || challengeData.initialBlocklyJson
		return generateCppFromJson(currentBlocklyJson)
	}, [])

	// Set initial right content
	useEffect(() => {
		if (mainSlides.length > 0) {
			const firstSlide = mainSlides[0]
			if (firstSlide.type === "textParent") {
				const firstText = firstSlide.data.children[0]
				setRightContent({ type: "image", icon: firstText.triggerImage })
			} else {
				setRightContent({ type: "challenge", challengeData: firstSlide.data })
			}
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
									mousewheel={{
										enabled: true,
										forceToAxis: true,
										releaseOnEdges: true,
										sensitivity: 2,
										thresholdDelta: 5,
										thresholdTime: 300
									}}
									freeMode={{
										enabled: true,
										sticky: true,
										minimumVelocity: 0.1,
										momentum: true,
										momentumRatio: 0.6,
										momentumBounce: true,
										momentumBounceRatio: 0.3,
										momentumVelocityRatio: 0.8
									}}
									resistance={true}
									resistanceRatio={0.85}
									keyboard={{
										enabled: true,
										onlyInViewport: true
									}}
									speed={400}
									allowSlideNext={false} // Controlled programmatically
									allowSlidePrev={true}
									modules={[Mousewheel, Keyboard, FreeMode]}
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
														onTextSectionChange={() => {}}
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
