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

// Add this component before CareerLayout
interface TextParentSliderProps {
	section: TextParentSection
	onSlideChange: (childId: string) => void
	onComplete: (textParentId: string) => void
	onAllowMainNavigation: () => void
}

const TextParentSlider: React.FC<TextParentSliderProps> = ({
	section,
	onSlideChange,
	onComplete,
	onAllowMainNavigation
}) => {
	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
	const [isAtLastSlide, setIsAtLastSlide] = useState(false)
	const [allowMainNavigation, setAllowMainNavigation] = useState(false)

	const handleSlideChange = (swiper: SwiperType) => {
		const currentIdx = swiper.activeIndex
		const currentChild = section.children[currentIdx]

		if (currentChild) {
			onSlideChange(currentChild.id)
		}

		// Check if we've reached the last slide
		const isLast = currentIdx === section.children.length - 1
		setIsAtLastSlide(isLast)

		if (isLast) {
			onComplete(section.id)
			// Allow main navigation after completing text parent
			setTimeout(() => {
				setAllowMainNavigation(true)
				onAllowMainNavigation()
			}, 300)
		}
	}

	const handleWheel = useCallback((e: WheelEvent) => {
		if (!swiperInstance) return

		const isAtFirst = swiperInstance.activeIndex === 0
		const isScrollingUp = e.deltaY < 0
		const isScrollingDown = e.deltaY > 0

		// Allow main navigation if at first slide and scrolling up
		if (isAtFirst && isScrollingUp) {
			return // Don't stop propagation, let main swiper handle
		}

		// Allow main navigation if at last slide, completed, and scrolling down
		if (isAtLastSlide && allowMainNavigation && isScrollingDown) {
			return // Don't stop propagation, let main swiper handle
		}

		// For all other cases, stop propagation to prevent main swiper from moving
		// But don't prevent default - let this swiper handle the wheel event
		e.stopPropagation()
	}, [swiperInstance, isAtLastSlide, allowMainNavigation])

	useEffect(() => {
		if (swiperInstance?.el) {
			const swiperEl = swiperInstance.el
			swiperEl.addEventListener("wheel", handleWheel, { capture: true })

			return () => {
				swiperEl.removeEventListener("wheel", handleWheel)
			}
		}
	}, [swiperInstance, isAtLastSlide, allowMainNavigation, handleWheel])

	return (
		<div className="border-2 border-swan rounded-3xl bg-polar h-full flex flex-col">
			<Swiper
				direction="vertical"
				slidesPerView={1}
				spaceBetween={0}
				mousewheel={{
					enabled: true,
					forceToAxis: true,
					releaseOnEdges: true // We handle this manually
				}}
				keyboard={{
					enabled: true,
					onlyInViewport: true
				}}
				nested={true}
				modules={[Mousewheel, Keyboard]}
				onSwiper={setSwiperInstance}
				onSlideChange={handleSlideChange}
				className="flex-1"
				style={{
					paddingLeft: "75px",
					paddingRight: "75px"
				}}
			>
				{section.children.map((childSection) => (
					<SwiperSlide
						key={childSection.id}
						data-child-id={childSection.id}
					>
						<div className="prose prose-lg max-w-none text-4xl h-full flex items-center justify-center">
							<p className="leading-relaxed text-questionText text-center cursor-text">
								{childSection.content}
							</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

// eslint-disable-next-line max-lines-per-function
function CareerLayout({ careerData }: { careerData: CareerQuestData }) {
	const [rightContent, setRightContent] = useState<RightContent>({
		type: "image",
		icon: careerData.initialImage
	})
	const [allowedIconSections, setAllowedIconSections] = useState<string[]>([])
	const [mainSwiperInstance, setMainSwiperInstance] = useState<SwiperType | null>(null)

	// Memoize visible sections to prevent unnecessary re-calculations
	const visibleSectionIds = useMemo(() =>
		careerQuestClass.getVisibleSections(careerData.careerUUID),
	// eslint-disable-next-line react-hooks/exhaustive-deps
	[careerData.careerUUID, careerQuestClass.getCompletedChallengesForProgress(careerData.careerUUID)]
	)

	const visibleSections = useMemo(() => {
		const sections: CareerSection[] = []

		careerData.sections.forEach(section => {
			if (section.type === "textParent") {
				// Include TextParent if ANY of its children are visible
				const hasVisibleChild = section.children.some(child =>
					visibleSectionIds.includes(child.id)
				)
				if (hasVisibleChild) {
					sections.push(section)
				}
			} else {
				// Challenge section - include if its UUID is visible
				if (visibleSectionIds.includes(section.challengeData.challengeUUID)) {
					sections.push(section)
				}
			}
		})

		return sections
	}, [careerData.sections, visibleSectionIds])

	// Initialize allowed sections for first time (all text sections before first challenge)
	useEffect(() => {
		if (allowedIconSections.length !== 0) return

		const sections = careerData.sections
		const firstChallengeIndex = sections.findIndex(s => s.type === "challenge")

		// Get all text section IDs from TextParent sections before first challenge
		const textSectionIds: string[] = []
		for (let i = 0; i < firstChallengeIndex && i < sections.length; i++) {
			const section = sections[i]
			if (section.type === "textParent") {
				textSectionIds.push(...section.children.map(child => child.id))
			}
		}

		setAllowedIconSections(textSectionIds)
	}, [careerData.sections, allowedIconSections.length])

	// Enhanced intersection observer callback
	const updateRightContent = useCallback((sectionId: string) => {
		setRightContent(prevContent => {
			let newContent: RightContent

			// Check if this is a text section ID
			const textSection = careerQuestClass.getTextSectionById(careerData.careerUUID, sectionId)
			if (textSection) {
				// This is a text section
				newContent = { type: "image", icon: textSection.triggerImage }
			} else {
				// This must be a challenge UUID
				const challengeData = careerQuestClass.getChallengeData({
					careerUUID: careerData.careerUUID,
					challengeUUID: sectionId as ChallengeUUID
				})

				if (!challengeData) return prevContent

				newContent = { type: "challenge", challengeData }
			}

			// Only update if content actually changed
			if (prevContent.type !== newContent.type) {
				return newContent
			}

			if (newContent.type === "image" && prevContent.type === "image") {
				return prevContent.icon !== newContent.icon ? newContent : prevContent
			}

			if (newContent.type === "challenge" && prevContent.type === "challenge") {
				return prevContent.challengeData.challengeUUID !== newContent.challengeData.challengeUUID ? newContent : prevContent
			}

			return newContent
		})
	}, [careerData.careerUUID])

	// Helper function to get current cpp code for a specific challenge
	const getCppCodeForChallenge = useCallback((challengeData: CqChallengeData) => {
		const currentBlocklyJson = careerQuestClass.getUpdatedBlocklyJson(challengeData) || challengeData.initialBlocklyJson
		return generateCppFromJson(currentBlocklyJson)
	}, [])

	return (
		<div className="flex h-full">
			{/* Left Panel - Always Present */}
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
										releaseOnEdges: true
									}}
									keyboard={{
										enabled: true,
										onlyInViewport: true
									}}
									allowSlideNext={false}
									allowSlidePrev={true}
									modules={[Mousewheel, Keyboard]}
									onSwiper={setMainSwiperInstance}
									onSlideChange={(swiper) => {
										const currentSection = visibleSections[swiper.activeIndex]
										if (currentSection?.type === "challenge") {
											updateRightContent(currentSection.challengeData.challengeUUID)
										} else if (currentSection?.type === "textParent") {
											// Right content will be updated by nested slider
										}
									}}
									className="h-full"
								>
									{visibleSections.map((section) => (
										<SwiperSlide key={section.id} className="h-full">
											<div className="h-[calc(100vh-10rem)]">
												{section.type === "challenge" ? (
													<CqChatInterface
														cppCode={getCppCodeForChallenge(section.challengeData)}
														challengeData={section.challengeData}
													/>
												) : (
													<TextParentSlider
														section={section}
														onSlideChange={(childId) => updateRightContent(childId)}
														onComplete={(textParentId) => {
															console.log("Completed text parent:", textParentId)
														}}
														onAllowMainNavigation={() => {
															// Enable main swiper navigation when text parent is completed
															if (mainSwiperInstance) {
																mainSwiperInstance.allowSlideNext = true
															}
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
