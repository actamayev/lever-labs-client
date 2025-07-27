"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { observer } from "mobx-react"
import { CareerQuestData } from "../../utils/career-quest/career-quest-data"
import careerQuestClass from "../../classes/career-quest-class"
import generateCppFromJson from "../../utils/cpp/generate-cpp-from-json"
import { CqChallengeData } from "@bluedotrobots/common-ts"
import CqChatInterface from "./chat/cq-chat-interface"
import RightContent from "./right-content"

// eslint-disable-next-line max-lines-per-function
function CareerLayout({ careerData }: { careerData: CareerQuestData }) {
	const [rightContent, setRightContent] = useState<RightContent>({
		type: "image",
		icon: careerData.initialImage
	})
	const [lockedChallenge, setLockedChallenge] = useState<CqChallengeData | null>(null)
	const [allowedIconSections, setAllowedIconSections] = useState<string[]>([])

	// Memoize visible sections to prevent unnecessary re-calculations
	const visibleSectionIds = useMemo(() =>
		careerQuestClass.getVisibleSections(careerData.careerId),
	// eslint-disable-next-line react-hooks/exhaustive-deps
	[careerData.careerId, careerQuestClass.getCompletedChallengesForProgress(careerData.careerId)]
	)

	const visibleSections = useMemo(() =>
		careerData.sections.filter(section => visibleSectionIds.includes(section.id)),
	[careerData.sections, visibleSectionIds]
	)

	// Get completion count to trigger unlock detection
	const completionCount = careerQuestClass.getCompletedChallengesForProgress(careerData.careerId)

	// Initialize allowed sections for first time (all text sections before first challenge)
	useEffect(() => {
		if (allowedIconSections.length === 0) {
			const textSectionsBeforeFirstChallenge = careerData.sections
				.slice(0, careerData.sections.findIndex(s => s.type === "challenge"))
				.filter(s => s.type === "text")
				.map(s => s.id)
			setAllowedIconSections(textSectionsBeforeFirstChallenge)
		}
	}, [careerData.sections, allowedIconSections.length])

	// Recalculate allowed sections after challenge completion
	const recalculateAllowedSections = useCallback((completedChallengeId: string) => {
		const sections = careerData.sections
		const challengeIndex = sections.findIndex(s =>
			s.type === "challenge" && s.challengeData.challengeId === completedChallengeId
		)

		if (challengeIndex === -1) return

		// Find next challenge index to limit scope
		const nextChallengeIndex = sections.findIndex((s, index) =>
			index > challengeIndex && s.type === "challenge"
		)

		// Get sections between completed challenge and next challenge (or end)
		const endIndex = nextChallengeIndex === -1 ? sections.length : nextChallengeIndex
		const newAllowedSections = sections
			.slice(challengeIndex + 1, endIndex)
			.filter(s => s.type === "text")
			.map(s => s.id)

		setAllowedIconSections(newAllowedSections)
	}, [careerData.sections])

	// Detect challenge completion and unlock
	useEffect(() => {
		if (lockedChallenge && careerQuestClass.isChallengeCompleted(lockedChallenge)) {
			setLockedChallenge(null)
			recalculateAllowedSections(lockedChallenge.challengeId)
		}
	}, [lockedChallenge, completionCount, recalculateAllowedSections])

	// Check if a section should show icon
	const shouldShowIcon = useCallback((sectionId: string, sectionType: string) => {
		// Never show icons when challenge is locked
		if (lockedChallenge) return false

		// Only show icons for text sections
		if (sectionType !== "text") return false

		// Check if this section is in allowed list
		return allowedIconSections.includes(sectionId)
	}, [lockedChallenge, allowedIconSections])

	// Enhanced intersection observer callback
	const updateRightContent = useCallback((section: typeof visibleSections[0], intersectionRatio: number) => {
		// If we have a locked challenge, don't change content unless it's the locked challenge leaving view
		if (lockedChallenge) {
			// Only unlock if user scrolls completely away from the locked challenge
			if (section.type === "challenge" &&
				section.challengeData.challengeId === lockedChallenge.challengeId &&
				intersectionRatio < 0.1) {
				// Don't unlock here if challenge is completed - let the completion effect handle it
				if (!careerQuestClass.isChallengeCompleted(lockedChallenge)) {
					setLockedChallenge(null)
				}
			}
			return // Don't update content while locked
		}

		// eslint-disable-next-line complexity
		setRightContent(prevContent => {
			let newContent: RightContent

			if (section.type === "text") {
				// Only show icon if allowed
				if (shouldShowIcon(section.id, section.type)) {
					newContent = { type: "image", icon: section.triggerImage }
				} else {
					return prevContent // Don't change content for disallowed sections
				}
			} else {
				newContent = { type: "challenge", challengeData: section.challengeData }

				// Lock the challenge if it comes fully into view (70% threshold)
				if (intersectionRatio >= 0.7) {
					setLockedChallenge(section.challengeData)
				}
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
	}, [lockedChallenge, shouldShowIcon])

	useEffect(() => {
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionId = entry.target.getAttribute("data-section-id")
						const section = visibleSections.find(s => s.id === sectionId)

						if (section) {
							updateRightContent(section, entry.intersectionRatio)
						}
					}
				})
			},
			{
				threshold: [0.1, 0.5, 0.7], // Multiple thresholds for different behaviors
				rootMargin: "-20% 0px -20% 0px"
			}
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
		const initializeCareer = async () => {
			// careerQuestClass.initializeCareer(careerData)
			await careerQuestClass.retrieveAllChallengeDataForCareer(careerData.careerId)
		}

		initializeCareer()
	}, [careerData])

	// Helper function to get current cpp code for a specific challenge
	const getCppCodeForChallenge = useCallback((challengeData: CqChallengeData) => {
		const currentBlocklyJson = careerQuestClass.getUpdatedBlocklyJson(challengeData) || challengeData.initialBlocklyJson
		return generateCppFromJson(currentBlocklyJson)
	}, [])

	return (
		<div className="flex h-full">
			<div
				className="overflow-y-auto scrollbar-hide"
				style={{
					scrollbarWidth: "none",
					msOverflowStyle: "none",
					width: "45%"
				}}
			>
				<div
					className="py-8 space-y-8"
					style={{
						paddingLeft: "65px",
						paddingRight: "55px"
					}}
				>
					{/* Only render visible sections */}
					{visibleSections.map((section) => (
						<div key={section.id} data-section-id={section.id} className="min-h-[50vh]">
							{section.type === "text" ? (
								<div className="prose prose-lg max-w-none text-3xl">
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

			<div
				className="sticky top-0 h-[calc(100vh-5rem)] bg-standardBackground border-l-2 border-swan"
				style={{
					width: "55%"
				}}
			>
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
						<RightContent rightContent={rightContent} />
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}

export default observer(CareerLayout)
