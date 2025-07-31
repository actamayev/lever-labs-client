"use client"
import "swiper/css"
import { observer } from "mobx-react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useMemo, useCallback, useRef } from "react"
import { ChallengeUUID, CqChallengeData } from "@bluedotrobots/common-ts"
import RightContent from "./right-content"
import TextParentCard from "./text-parent-card"
import CqChatInterface from "../chat/cq-chat-interface"
import careerQuestClass from "../../../classes/career-quest-class"
import generateCppFromJson from "../../../utils/cpp/generate-cpp-from-json"

function useKeyboardNavigation() {
	const [keyPressed, setKeyPressed] = useState<string | null>(null)
	const keyDownRef = useRef(false)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Only process if key wasn't already down
			if (!keyDownRef.current && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
				e.preventDefault()
				keyDownRef.current = true
				setKeyPressed(e.key)
			}
		}

		const handleKeyUp = (e: KeyboardEvent) => {
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				keyDownRef.current = false
				setKeyPressed(null)
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("keyup", handleKeyUp)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("keyup", handleKeyUp)
		}
	}, [])

	return keyPressed
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
	const [isTransitioning, setIsTransitioning] = useState(false)
	const keyPressed = useKeyboardNavigation()
	const lastKeyPressTime = useRef(0)

	const SLIDE_COOLDOWN = 400

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
		console.log("handleMainSlideChange", newIndex)

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

	useEffect(() => {
		if (!keyPressed || !mainSwiperInstance || isTransitioning) return

		const now = Date.now()
		if (now - lastKeyPressTime.current < SLIDE_COOLDOWN) return

		if (keyPressed === "ArrowDown") {
			// Check if we can go to next slide
			if (currentMainSlideIndex < mainSlides.length - 1 && canAdvanceToNextMain(currentMainSlideIndex)) {
				lastKeyPressTime.current = now
				setIsTransitioning(true)
				mainSwiperInstance.slideNext()
				setTimeout(() => setIsTransitioning(false), SLIDE_COOLDOWN)
			}
		} else if (keyPressed === "ArrowUp") {
			// Always allow going back
			if (currentMainSlideIndex > 0) {
				lastKeyPressTime.current = now
				setIsTransitioning(true)
				mainSwiperInstance.slidePrev()
				setTimeout(() => setIsTransitioning(false), SLIDE_COOLDOWN)
			}
		}
	}, [keyPressed, mainSwiperInstance, currentMainSlideIndex, mainSlides, canAdvanceToNextMain, isTransitioning])

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
														onTextSectionChange={() => {}}
														isActive={currentMainSlideIndex === mainSlides.findIndex(s => s.id === slide.id)}
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
