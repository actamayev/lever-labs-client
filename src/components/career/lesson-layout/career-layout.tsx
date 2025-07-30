"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel, Keyboard } from "swiper/modules"
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

// Types for flattened slide structure
interface TextSlide {
	type: "text"
	id: string
	content: string
	triggerImage: string
	textParentId: string // To track which text parent this belongs to
	isLastInTextParent: boolean // To know when text parent is completed
}

interface ChallengeSlide {
	type: "challenge"
	id: ChallengeUUID
	challengeData: CqChallengeData
}

type FlattenedSlide = TextSlide | ChallengeSlide

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
	const flattenedSlides = useMemo((): FlattenedSlide[] => {
		const slides: FlattenedSlide[] = []

		careerData.sections.forEach(section => {
			if (section.type === "textParent") {
				section.children.forEach((child, index) => {
					slides.push({
						type: "text",
						id: child.id,
						content: child.content,
						triggerImage: child.triggerImage,
						textParentId: section.id,
						isLastInTextParent: index === section.children.length - 1
					})
				})
			} else {
				// Challenge section
				slides.push({
					type: "challenge",
					id: section.challengeData.challengeUUID,
					challengeData: section.challengeData
				})
			}
		})

		return slides
	}, [careerData.sections])

	// Get visible slides based on progression rules
	const visibleSlides = useMemo(() => {
		const visible: FlattenedSlide[] = []
		let hasBlockingElement = false

		for (const slide of flattenedSlides) {
			if (hasBlockingElement) break

			visible.push(slide)

			if (slide.type === "text") {
				// Check if this text parent is completed
				if (slide.isLastInTextParent && !completedTextParents.has(slide.textParentId)) {
					hasBlockingElement = true
				}
			} else {
				// Challenge slide
				const isCompleted = careerQuestClass.isChallengeCompleted(slide.challengeData)
				if (!isCompleted) {
					hasBlockingElement = true
				}
			}
		}

		return visible
	}, [flattenedSlides, completedTextParents])

	// Check if user can advance to next slide
	const canAdvanceToNext = useCallback((slideIndex: number): boolean => {
		if (slideIndex >= visibleSlides.length - 1) return false

		const currentSlide = visibleSlides[slideIndex]
		if (!currentSlide) return false

		if (currentSlide.type === "text") {
			// For text slides, check if this completes a text parent
			if (currentSlide.isLastInTextParent) {
				return completedTextParents.has(currentSlide.textParentId)
			}
			// For non-last text slides, can always advance within text parent
			return true
		} else {
			// For challenge slides, must be completed
			return careerQuestClass.isChallengeCompleted(currentSlide.challengeData)
		}
	}, [visibleSlides, completedTextParents])

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

		const currentSlide = visibleSlides[newIndex]
		if (!currentSlide) return

		// Update right content
		if (currentSlide.type === "text") {
			setRightContent({ type: "image", icon: currentSlide.triggerImage })

			// If this is the last slide in a text parent and user has viewed it,
			// mark the text parent as completed
			if (currentSlide.isLastInTextParent) {
				setCompletedTextParents(prev => {
					const newSet = new Set(prev)
					newSet.add(currentSlide.textParentId)
					return newSet
				})
			}
		} else {
			setRightContent({ type: "challenge", challengeData: currentSlide.challengeData })
		}
	}, [visibleSlides])

	// Helper function to get current cpp code for a specific challenge
	const getCppCodeForChallenge = useCallback((challengeData: CqChallengeData) => {
		const currentBlocklyJson = careerQuestClass.getUpdatedBlocklyJson(challengeData) || challengeData.initialBlocklyJson
		return generateCppFromJson(currentBlocklyJson)
	}, [])

	// Set initial right content
	useEffect(() => {
		if (visibleSlides.length > 0) {
			const firstSlide = visibleSlides[0]
			if (firstSlide.type === "text") {
				setRightContent({ type: "image", icon: firstSlide.triggerImage })
			} else {
				setRightContent({ type: "challenge", challengeData: firstSlide.challengeData })
			}
		}
	}, [visibleSlides])

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
									spaceBetween={0}
									mousewheel={{
										enabled: true,
										forceToAxis: true,
										releaseOnEdges: true,
										sensitivity: 1,
										thresholdDelta: 50
									}}
									keyboard={{
										enabled: true,
										onlyInViewport: true
									}}
									allowSlideNext={false} // Controlled programmatically
									allowSlidePrev={true}
									modules={[Mousewheel, Keyboard]}
									onSwiper={setSwiperInstance}
									onSlideChange={handleSlideChange}
									className="h-full"
								>
									{visibleSlides.map((slide, index) => (
										<SwiperSlide key={slide.id} className="h-full">
											<div className="h-[calc(100vh-10rem)]">
												{slide.type === "challenge" ? (
													<CqChatInterface
														cppCode={getCppCodeForChallenge(slide.challengeData)}
														challengeData={slide.challengeData}
													/>
												) : (
													<div className="border-2 border-swan rounded-3xl bg-polar h-full flex flex-col">
														<div className="flex-1 flex items-center justify-center px-[75px]">
															<div className="prose prose-lg max-w-none text-4xl">
																<p className="leading-relaxed text-questionText text-center cursor-text">
																	{slide.content}
																</p>
															</div>
														</div>
													</div>
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
