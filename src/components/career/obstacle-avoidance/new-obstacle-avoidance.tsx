"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Navigation, Eye, Radar, Lightbulb, Cog, ArrowRight, ScanLine, Puzzle, Trophy } from "lucide-react"
import ChallengeSection from "../challenge-section"
import { OBSTACLE_AVOIDANCE_CAREER } from "../../../utils/career-quest/career-quest-data"
import { ChallengeData } from "@bluedotrobots/common-ts"

// eslint-disable-next-line @typescript-eslint/naming-convention
const ICON_MAP = {
	Bot, Navigation, Eye, Radar, Lightbulb, Cog, ArrowRight, ScanLine, Puzzle, Trophy
}

type RightContent = { type: "image", icon: string } | { type: "challenge", challengeData: ChallengeData }

export default function ObstacleAvoidance() {
	const [rightContent, setRightContent] = useState<RightContent>({
		type: "image",
		icon: OBSTACLE_AVOIDANCE_CAREER.initialImage
	})

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionId = entry.target.getAttribute("data-section-id")
						const section = OBSTACLE_AVOIDANCE_CAREER.sections.find(s => s.id === sectionId)

						if (section) {
							if (section.type === "text") {
								setRightContent({ type: "image", icon: section.triggerImage })
							} else if (section.type === "challenge") {
								setRightContent({ type: "challenge", challengeData: section.challengeData })
							}
						}
					}
				})
			},
			{ threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
		)

		// Small delay to ensure DOM is ready
		setTimeout(() => {
			document.querySelectorAll("[data-section-id]").forEach((el) => {
				observer.observe(el)
			})
		}, 100)

		return () => observer.disconnect()
	}, [])

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
				<ChallengeSection challengeData={rightContent.challengeData} />
			</div>
		)
	}

	return (
		<div className="flex h-full">
			{/* Left Side - Scrollable Content */}
			<div className="w-1/2 overflow-y-auto">
				<div className="p-8 space-y-8">
					{OBSTACLE_AVOIDANCE_CAREER.sections.map((section) => (
						<div key={section.id} data-section-id={section.id} className="min-h-[50vh]">
							{section.type === "text" ? (
								<div className="prose prose-lg max-w-none">
									<p className="leading-relaxed text-questionText">{section.content}</p>
								</div>
							) : (
								<div className="h-screen flex items-center justify-center">
									<div className="w-full max-w-md bg-standardBackground rounded-lg border-2 border-swan p-4">
										<p className="text-center text-questionText">Challenge: {section.challengeData.title}</p>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Right Side - Sticky Content */}
			<div className="w-1/2 sticky top-0 h-[calc(100vh-5rem)] bg-standardBackground border-l-2 border-swan">
				<AnimatePresence mode="wait">
					<motion.div
						key={`${rightContent.type}-${rightContent.type === "image" ? rightContent.icon : rightContent.challengeData.id}`}
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
