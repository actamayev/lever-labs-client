"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel, Keyboard } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import { observer } from "mobx-react"
import { motion, AnimatePresence } from "framer-motion"
import { ChallengeUUID, CqChallengeData } from "@bluedotrobots/common-ts"
import { useEffect, useState, useMemo, useCallback, useRef } from "react"
import RightContent from "./right-content"
import { cn } from "../../../lib/shadcn/utils"
import CqChatInterface from "../chat/cq-chat-interface"
import careerQuestClass from "../../../classes/career-quest-class"
import generateCppFromJson from "../../../utils/cpp/generate-cpp-from-json"

// Add this component before CareerLayout
interface TextParentSliderProps {
	section: TextParentSection
	onSlideChange: (childId: string) => void
	// onComplete: (textParentId: string) => void
}

const TextParentSlider: React.FC<TextParentSliderProps> = ({ section, onSlideChange }) => {
	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
	const [isAtLastSlide, setIsAtLastSlide] = useState(false)
	const [allowScrollPassthrough, setAllowScrollPassthrough] = useState(false)

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
			// onComplete(section.id)
			// Allow scroll passthrough after a brief delay
			setTimeout(() => {
				setAllowScrollPassthrough(true)
			}, 300)
		}
	}

	const handleWheel = useCallback((e: WheelEvent) => {
		if (!swiperInstance) return

		// If we're at the last slide and scrolling down, allow passthrough
		if (isAtLastSlide && allowScrollPassthrough && e.deltaY > 0) {
			return // Don't prevent default, let outer scroll handle it
		}

		// If we're at the first slide and scrolling up, allow passthrough
		if (swiperInstance.activeIndex === 0 && e.deltaY < 0) {
			return
		}

		// Otherwise, let Swiper handle the wheel event
		e.stopPropagation()
	}, [swiperInstance, isAtLastSlide, allowScrollPassthrough])

	useEffect(() => {
		if (swiperInstance?.el) {
			const swiperEl = swiperInstance.el
			swiperEl.addEventListener("wheel", handleWheel, { passive: true })

			return () => {
				swiperEl.removeEventListener("wheel", handleWheel)
			}
		}
	}, [swiperInstance, isAtLastSlide, allowScrollPassthrough, handleWheel])

	return (
		<div className={cn(
			"border-2 border-swan rounded-3xl bg-polar",
			"h-[calc(100vh-10rem)] flex flex-col"
		)}>
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
	const leftScrollRef = useRef<HTMLDivElement>(null)

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

	useEffect(() => {
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionId = entry.target.getAttribute("data-section-id")
						if (sectionId && visibleSectionIds.includes(sectionId)) {
							updateRightContent(sectionId)
						}
					}
				})
			},
			{
				threshold: [0.1, 0.5, 0.7],
				rootMargin: "-20% 0px -20% 0px"
			}
		)

		const timeoutId = setTimeout(() => {
			document.querySelectorAll("[data-section-id]").forEach((el) => {
				const sectionId = el.getAttribute("data-section-id")
				// Only observe challenge sections for outer scroll - text parent children are handled separately
				// eslint-disable-next-line max-len
				if (sectionId && visibleSectionIds.includes(sectionId) && !careerQuestClass.isTextSectionId(careerData.careerUUID, sectionId)) {
					intersectionObserver.observe(el)
				}
			})
		}, 100)

		return () => {
			clearTimeout(timeoutId)
			intersectionObserver.disconnect()
		}
	}, [visibleSectionIds, updateRightContent, careerData.careerUUID])

	// Content is ready, render with persistent layout
	return (
		<div className="flex h-full">
			{/* Left Panel - Always Present */}
			<div className="relative" style={{ width: "45%" }}>
				<div className="px-[100px] py-8 h-full pointer-events-none">
					<div
						ref={leftScrollRef}
						className="overflow-y-auto scrollbar-hide h-full pointer-events-auto"
						style={{
							scrollbarWidth: "none",
							msOverflowStyle: "none"
						}}
					>
						<AnimatePresence mode="wait">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, ease: "easeOut" }}
							>
								<div className="space-y-8">
									{visibleSections.map((section) => (
										<div key={section.id} className="min-h-[50vh]">
											{section.type === "challenge" ? (
												<div
													data-section-id={section.challengeData.challengeUUID}
													className="h-[calc(100vh-10rem)]"
												>
													<CqChatInterface
														cppCode={getCppCodeForChallenge(section.challengeData)}
														challengeData={section.challengeData}
													/>
												</div>
											) : (
												<TextParentSlider
													section={section}
													onSlideChange={(childId) => updateRightContent(childId)}
												/>
											)}
										</div>
									))}
								</div>
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
