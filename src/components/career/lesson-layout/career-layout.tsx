"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel, Keyboard, FreeMode } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import { observer } from "mobx-react"
import { motion, AnimatePresence } from "framer-motion"
import { ChallengeUUID, CqChallengeData } from "@bluedotrobots/common-ts"
import { useEffect, useState, useMemo, useCallback, useRef } from "react"
import RightContent from "./right-content"
import CqChatInterface from "../chat/cq-chat-interface"
import careerQuestClass from "../../../classes/career-quest-class"
import generateCppFromJson from "../../../utils/cpp/generate-cpp-from-json"

// Types for flattened slide structure
interface TextParentSlide {
	type: "textParent"
	id: string
	textParentData: TextParentSection
	isCompleted: boolean
}

interface ChallengeSlide {
	type: "challenge"
	id: ChallengeUUID
	challengeData: CqChallengeData
}

type MainSlide = TextParentSlide | ChallengeSlide

interface TextParentCardProps {
	textParentData: TextParentSection
	onComplete: () => void
	onSlideChange: (triggerImage: string) => void
}

const TextParentCard: React.FC<TextParentCardProps> = ({
	textParentData,
	onComplete,
	onSlideChange
}) => {
	const scrollRef = useRef<HTMLDivElement>(null)
	const [currentChildIndex, setCurrentChildIndex] = useState(0)

	const handleScroll = () => {
		if (!scrollRef.current) return

		const { scrollTop, clientHeight } = scrollRef.current
		const childHeight = clientHeight
		const newIndex = Math.round(scrollTop / childHeight)

		if (newIndex !== currentChildIndex && newIndex < textParentData.children.length) {
			setCurrentChildIndex(newIndex)
			onSlideChange(textParentData.children[newIndex].triggerImage)

			// Complete when reaching last child
			if (newIndex === textParentData.children.length - 1) {
				onComplete()
			}
		}
	}

	return (
		<div className="border-2 border-swan rounded-3xl bg-polar h-full overflow-hidden">
			<div
				ref={scrollRef}
				className="h-full overflow-y-auto snap-y snap-mandatory"
				onScroll={handleScroll}
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
			>
				{textParentData.children.map((child) => (
					<div key={child.id} className="h-full snap-start flex items-center justify-center px-[75px]">
						<div className="prose prose-lg max-w-none text-4xl">
							<p className="leading-relaxed text-questionText text-center cursor-text">
								{child.content}
							</p>
						</div>
					</div>
				))}
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
	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
	const [completedTextParents, setCompletedTextParents] = useState<Set<string>>(new Set())
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

	// Flatten all sections into a single array of slides
	const mainSlides = useMemo((): MainSlide[] => {
		const slides: MainSlide[] = []

		careerData.sections.forEach(section => {
			if (section.type === "textParent") {
				slides.push({
					type: "textParent",
					id: section.id,
					textParentData: section,
					isCompleted: completedTextParents.has(section.id)
				})
			} else {
				slides.push({
					type: "challenge",
					id: section.challengeData.challengeUUID,
					challengeData: section.challengeData
				})
			}
		})

		return slides
	}, [careerData.sections, completedTextParents])

	// Check if user can advance to next slide
	const canAdvanceToNext = useCallback((slideIndex: number): boolean => {
		if (slideIndex >= mainSlides.length - 1) return false

		const currentSlide = mainSlides[slideIndex]
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!currentSlide) return false

		if (currentSlide.type === "textParent") {
			// For text slides, check if this completes a text parent
			if (currentSlide.isCompleted) {
				return completedTextParents.has(currentSlide.id)
			}
			// For non-last text slides, can always advance within text parent
			return true
		} else {
			// For challenge slides, must be completed
			return careerQuestClass.isChallengeCompleted(currentSlide.challengeData)
		}
	}, [mainSlides, completedTextParents])

	// Update swiper navigation permissions
	useEffect(() => {
		if (!swiperInstance) return

		const canAdvance = canAdvanceToNext(currentSlideIndex)
		swiperInstance.allowSlideNext = canAdvance

		// Always allow going back
		swiperInstance.allowSlidePrev = currentSlideIndex > 0
	}, [swiperInstance, currentSlideIndex, canAdvanceToNext])

	// Handle slide change
	const handleSlideChange = useCallback((swiper: SwiperType) => {
		const newIndex = swiper.activeIndex
		setCurrentSlideIndex(newIndex)

		const currentSlide = mainSlides[newIndex]
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!currentSlide) return

		// Update right content
		if (currentSlide.type !== "textParent") {
			setRightContent({ type: "challenge", challengeData: currentSlide.challengeData })
			return
		}
		setRightContent({ type: "image", icon: currentSlide.textParentData.children[0].triggerImage })

		// If this is the last slide in a text parent and user has viewed it,
		// mark the text parent as completed
		if (currentSlide.isCompleted) {
			setCompletedTextParents(prev => {
				const newSet = new Set(prev)
				newSet.add(currentSlide.id)
				return newSet
			})
		}
	}, [mainSlides])

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
				setRightContent({ type: "image", icon: firstSlide.textParentData.children[0].triggerImage })
			} else {
				setRightContent({ type: "challenge", challengeData: firstSlide.challengeData })
			}
		}
	}, [mainSlides])

	// Update navigation permissions when completion states change
	const completedChallengesCount = careerQuestClass.getCompletedChallengesForProgress(careerData.careerUUID)
	useEffect(() => {
		if (swiperInstance) {
			const canAdvance = canAdvanceToNext(currentSlideIndex)
			swiperInstance.allowSlideNext = canAdvance
		}
	}, [swiperInstance, currentSlideIndex, canAdvanceToNext, completedChallengesCount])

	return (
		<div className="flex h-full">
			{/* Left Panel - Single Swiper for All Content */}
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
									spaceBetween={0} // Add space between slides for peeking
									mousewheel={{
										enabled: true,
										forceToAxis: true,
										releaseOnEdges: true,
										sensitivity: 2,
										thresholdDelta: 5, // Very low threshold for immediate response
										thresholdTime: 300
									}}
									freeMode={{
										enabled: true,
										sticky: true, // Snaps to slides after scrolling
										minimumVelocity: 0.1, // Low minimum velocity for gentle scrolling
										momentum: true,
										momentumRatio: 0.6, // Controls momentum decay
										momentumBounce: true,
										momentumBounceRatio: 0.3, // Spring back effect
										momentumVelocityRatio: 0.8
									}}
									resistance={true}
									resistanceRatio={0.85} // Elastic resistance at boundaries
									keyboard={{
										enabled: true,
										onlyInViewport: true
									}}
									speed={400} // Transition speed
									allowSlideNext={false} // Still controlled programmatically
									allowSlidePrev={true}
									modules={[Mousewheel, Keyboard, FreeMode]}
									onSwiper={setSwiperInstance}
									onSlideChange={handleSlideChange}
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
														cppCode={getCppCodeForChallenge(slide.challengeData)}
														challengeData={slide.challengeData}
													/>
												) : (
													<TextParentCard
														textParentData={slide.textParentData}
														onComplete={() => {
															setCompletedTextParents(prev => new Set(prev).add(slide.id))
														}}
														onSlideChange={(triggerImage) => {
															setRightContent({ type: "image", icon: triggerImage })
														}}
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
