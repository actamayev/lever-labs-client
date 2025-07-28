"use client"

import { observer } from "mobx-react"
import { motion, AnimatePresence } from "framer-motion"
import { CqChallengeData } from "@bluedotrobots/common-ts"
import { useEffect, useState, useMemo, useCallback, useRef } from "react"
import RightContent from "./right-content"
import CqChatInterface from "./chat/cq-chat-interface"
import careerQuestClass from "../../classes/career-quest-class"
import generateCppFromJson from "../../utils/cpp/generate-cpp-from-json"

// eslint-disable-next-line max-lines-per-function
function CareerLayout({ careerData }: { careerData: CareerQuestData }) {
	const [rightContent, setRightContent] = useState<RightContent>({
		type: "image",
		icon: careerData.initialImage
	})
	const [lockedChallenge, setLockedChallenge] = useState<CqChallengeData | null>(null)
	const [allowedIconSections, setAllowedIconSections] = useState<string[]>([])
	const [isInitialPositioningComplete, setIsInitialPositioningComplete] = useState(false)
	const [hasRetrievedAllData, setHasRetrievedAllData] = useState(false)
	const leftScrollRef = useRef<HTMLDivElement>(null)

	// Memoize visible sections to prevent unnecessary re-calculations
	const visibleSectionIds = useMemo(() =>
		careerQuestClass.getVisibleSections(careerData.careerUUID),
	// eslint-disable-next-line react-hooks/exhaustive-deps
	[careerData.careerUUID, careerQuestClass.getCompletedChallengesForProgress(careerData.careerUUID)]
	)

	const visibleSections = useMemo(() =>
		careerData.sections.filter(section => visibleSectionIds.includes(section.id)),
	[careerData.sections, visibleSectionIds]
	)

	// Get completion count to trigger unlock detection
	const completionCount = careerQuestClass.getCompletedChallengesForProgress(careerData.careerUUID)

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
			s.type === "challenge" && s.challengeData.challengeUUID === completedChallengeId
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
			recalculateAllowedSections(lockedChallenge.challengeUUID)
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
		// Don't update content during initial positioning
		if (!isInitialPositioningComplete) return

		// If we have a locked challenge, don't change content unless it's the locked challenge leaving view
		if (lockedChallenge) {
			// Only unlock if user scrolls completely away from the locked challenge
			if (section.type === "challenge" &&
        section.challengeData.challengeUUID === lockedChallenge.challengeUUID &&
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
				return prevContent.challengeData.challengeUUID !== newContent.challengeData.challengeUUID ? newContent : prevContent
			}

			return newContent
		})
	}, [lockedChallenge, shouldShowIcon, isInitialPositioningComplete])

	// Auto-scroll to target section
	const scrollToSection = useCallback((sectionId: string) => {
		const targetElement = document.querySelector(`[data-section-id="${sectionId}"]`)
		const scrollContainer = leftScrollRef.current

		if (targetElement && scrollContainer) {
			const containerRect = scrollContainer.getBoundingClientRect()
			const targetRect = targetElement.getBoundingClientRect()
			const scrollTop = scrollContainer.scrollTop

			// Calculate the position to scroll to (center the target in view)
			const targetPosition = scrollTop + targetRect.top - containerRect.top - (containerRect.height / 2) + (targetRect.height / 2)

			scrollContainer.scrollTo({
				top: Math.max(0, targetPosition),
				behavior: "instant"
			})
		}
	}, [])

	// Handle initial positioning after data is loaded
	useEffect(() => {
		if (!hasRetrievedAllData || isInitialPositioningComplete) return

		// Small delay to ensure DOM is fully rendered
		const positioningTimeout = setTimeout(() => {
			const targetInfo = careerQuestClass.getInitialTargetSection(careerData.careerUUID)

			console.log("Initial positioning:", targetInfo)

			// Set the right content
			if (targetInfo.rightContent) {
				setRightContent(targetInfo.rightContent)
			}

			// Handle auto-scrolling
			if (targetInfo.shouldAutoScroll && targetInfo.sectionId) {
				scrollToSection(targetInfo.sectionId)

				// If scrolling to a challenge, set it as locked
				const targetSection = careerData.sections.find(s => s.id === targetInfo.sectionId)
				if (targetSection?.type === "challenge") {
					setLockedChallenge(targetSection.challengeData)
				}
			}

			// Mark initial positioning as complete
			setIsInitialPositioningComplete(true)
		}, 300) // Allow time for DOM rendering

		return () => clearTimeout(positioningTimeout)
	}, [hasRetrievedAllData, isInitialPositioningComplete, careerData.careerUUID, scrollToSection, careerData.sections])

	// Setup intersection observer (only after initial positioning is complete)
	useEffect(() => {
		if (!isInitialPositioningComplete) return

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
	}, [isInitialPositioningComplete, visibleSectionIds, updateRightContent, visibleSections])

	// Initialize career and retrieve data
	useEffect(() => {
		const initializeCareer = async () => {
			await careerQuestClass.retrieveAllChallengeDataForCareer(careerData.careerUUID)

			// Check if all data has been retrieved
			const hasAllData = careerQuestClass.hasRetrievedAllChallengeData(careerData.careerUUID)
			setHasRetrievedAllData(hasAllData)
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
				ref={leftScrollRef}
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
							rightContent.challengeData.challengeUUID}
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
