"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Navigation, Eye, Radar, Lightbulb, Cog, ArrowRight, ScanLine, Puzzle, Trophy } from "lucide-react"
import { observer } from "mobx-react"
import { CareerQuestData } from "../../utils/career-quest/career-quest-data"
import ChallengeSection from "./challenge-section"
import CqChatInterface from "./chat/cq-chat-interface"
import careerQuestClass from "../../classes/career-quest-class"
import generateCppFromJson from "../../utils/cpp/generate-cpp-from-json"
import { CqChallengeData } from "@bluedotrobots/common-ts"

// eslint-disable-next-line @typescript-eslint/naming-convention
const ICON_MAP = {
	Bot, Navigation, Eye, Radar, Lightbulb, Cog, ArrowRight, ScanLine, Puzzle, Trophy
}

type RightContent = { type: "image", icon: string } | { type: "challenge", challengeData: CqChallengeData }

interface CareerLayoutProps {
	careerData: CareerQuestData
}

// eslint-disable-next-line max-lines-per-function
function CareerLayout({ careerData }: CareerLayoutProps) {
	const [rightContent, setRightContent] = useState<RightContent>({
		type: "image",
		icon: careerData.initialImage
	})

	// Memoize visible sections to prevent unnecessary re-calculations
	const visibleSectionIds = useMemo(() =>
		careerQuestClass.getVisibleSections(careerData.careerId),
	[careerData.careerId, careerQuestClass.getCompletedChallengesCount(careerData.careerId)]
	)

	const visibleSections = useMemo(() =>
		careerData.sections.filter(section => visibleSectionIds.includes(section.id)),
	[careerData.sections, visibleSectionIds]
	)

	useEffect(() => {
		careerQuestClass.initializeCareer(careerData)
		// Pre-fetch all challenge data to prevent flickering
		void careerQuestClass.retrieveAllChallengeDataForCareer(careerData.careerId)
	}, [careerData])

	// Callback to prevent unnecessary state updates
	const updateRightContent = useCallback((section: typeof visibleSections[0]) => {
		setRightContent(prevContent => {
			let newContent: RightContent

			if (section.type === "text") {
				newContent = { type: "image", icon: section.triggerImage }
			} else {
				newContent = { type: "challenge", challengeData: section.challengeData }
			}

			// Only update if content actually changed
			if (prevContent.type !== newContent.type) {
				return newContent
			}

			if (newContent.type === "image" && prevContent.type === "image") {
				return prevContent.icon !== newContent.icon ? newContent : prevContent
			}

			if (newContent.type === "challenge" && prevContent.type === "challenge") {
				return prevContent.challengeData.challengeId !== newContent.challengeData.challengeId ? newContent : prevContent
			}

			return newContent
		})
	}, [])

	useEffect(() => {
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionId = entry.target.getAttribute("data-section-id")
						const section = visibleSections.find(s => s.id === sectionId)

						if (section) {
							updateRightContent(section)
						}
					}
				})
			},
			{ threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
		)

		// Small delay to ensure DOM is ready
		const timeoutId = setTimeout(() => {
			// Only observe visible sections
			document.querySelectorAll("[data-section-id]").forEach((el) => {
				const sectionId = el.getAttribute("data-section-id")
				if (sectionId && visibleSectionIds.includes(sectionId)) {
					intersectionObserver.observe(el)
				}
			})
		}, 100)

		return () => {
			clearTimeout(timeoutId)
			intersectionObserver.disconnect()
		}
	}, [visibleSectionIds, updateRightContent, visibleSections])

	useEffect(() => {
		careerQuestClass.initializeCareer(careerData)
	}, [careerData])

	const RightContent = () => {
		if (rightContent.type === "image") {
			const IconComponent = ICON_MAP[rightContent.icon as keyof typeof ICON_MAP]
			return (
				<div className="flex items-center justify-center h-full">
					<IconComponent size={120} className="text-macaw" />
				</div>
			)
		}

		return (
			<div className="h-full flex flex-col">
				<ChallengeSection
					challengeData={rightContent.challengeData}
				/>
			</div>
		)
	}

	// Helper function to get current cpp code for a specific challenge
	const getCppCodeForChallenge = useCallback((challengeData: CqChallengeData) => {
		const currentBlocklyJson = careerQuestClass.getUpdatedBlocklyJson(challengeData) || challengeData.initialBlocklyJson
		return generateCppFromJson(currentBlocklyJson)
	}, [])

	return (
		<div className="flex h-full">
			<div
				className="w-1/2 overflow-y-auto scrollbar-hide"
				style={{
					scrollbarWidth: "none",
					msOverflowStyle: "none"
				}}
			>
				<div className="p-8 space-y-8">
					{/* Only render visible sections */}
					{visibleSections.map((section) => (
						<div key={section.id} data-section-id={section.id} className="min-h-[50vh]">
							{section.type === "text" ? (
								<div className="prose prose-lg max-w-none">
									<p className="leading-relaxed text-questionText">{section.content}</p>
								</div>
							) : (
								<div className="h-[calc(100vh-10rem)]">
									<CqChatInterface
										cppCode={getCppCodeForChallenge(section.challengeData)}
										challengeData={section.challengeData}
									/>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			<div className="w-1/2 sticky top-0 h-[calc(100vh-5rem)] bg-standardBackground border-l-2 border-swan">
				<AnimatePresence mode="wait">
					<motion.div
						key={`${rightContent.type}-${rightContent.type === "image" ?
							rightContent.icon :
							rightContent.challengeData.challengeId}
						`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="h-full"
					>
						<RightContent />
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}

export default observer(CareerLayout)
