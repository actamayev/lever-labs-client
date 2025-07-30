"use client"

import { observer } from "mobx-react"
import { motion, AnimatePresence } from "framer-motion"
import { ChallengeUUID, CqChallengeData } from "@bluedotrobots/common-ts"
import { useEffect, useState, useMemo, useCallback, useRef } from "react"
import RightContent from "./right-content"
import CqChatInterface from "../chat/cq-chat-interface"
import careerQuestClass from "../../../classes/career-quest-class"
import generateCppFromJson from "../../../utils/cpp/generate-cpp-from-json"

// eslint-disable-next-line max-lines-per-function
function CareerLayout({ careerData }: { careerData: CareerQuestData }) {
	const [rightContent, setRightContent] = useState<RightContent>({
		type: "image",
		icon: careerData.initialImage
	})
	const [lockedChallenge, setLockedChallenge] = useState<CqChallengeData | null>(null)
	const [allowedIconSections, setAllowedIconSections] = useState<string[]>([])
	// const [isInitialPositioningComplete, setIsInitialPositioningComplete] = useState(false)
	const leftScrollRef = useRef<HTMLDivElement>(null)
	// Add after existing useState declarations
	const [activeTextParent, setActiveTextParent] = useState<string | null>(null)
	const [completedTextParents, setCompletedTextParents] = useState<Set<string>>(new Set())
	const textParentScrollRefs = useRef<Map<string, HTMLDivElement>>(new Map())

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

	// Get completion count to trigger unlock detection
	const completionCount = careerQuestClass.getCompletedChallengesForProgress(careerData.careerUUID)

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

		// Get text section IDs from TextParent sections between completed challenge and next challenge (or end)
		const endIndex = nextChallengeIndex === -1 ? sections.length : nextChallengeIndex
		const newAllowedSectionIds: string[] = []

		for (let i = challengeIndex + 1; i < endIndex; i++) {
			const section = sections[i]
			if (section.type === "textParent") {
				newAllowedSectionIds.push(...section.children.map(child => child.id))
			}
		}

		setAllowedIconSections(newAllowedSectionIds)
	}, [careerData.sections])

	// Detect challenge completion and unlock
	useEffect(() => {
		if (lockedChallenge && careerQuestClass.isChallengeCompleted(lockedChallenge)) {
			setLockedChallenge(null)
			recalculateAllowedSections(lockedChallenge.challengeUUID)
		}
	}, [lockedChallenge, completionCount, recalculateAllowedSections])

	// Check if a section should show icon
	const shouldShowIcon = useCallback((sectionId: string) => {
		// Never show icons when challenge is locked
		if (lockedChallenge) return false

		// Check if this is a text section ID and if it's allowed
		const isTextSection = careerQuestClass.isTextSectionId(careerData.careerUUID, sectionId)
		if (!isTextSection) return false

		// Check if this section is in allowed list
		return allowedIconSections.includes(sectionId)
	}, [lockedChallenge, allowedIconSections, careerData.careerUUID])

	// Enhanced intersection observer callback
	const updateRightContent = useCallback((sectionId: string, intersectionRatio: number) => {
		// Don't update content during initial positioning
		// if (!isInitialPositioningComplete) return

		// If we have a locked challenge, don't change content unless it's the locked challenge leaving view
		if (lockedChallenge) {
			// Only unlock if user scrolls completely away from the locked challenge
			if (
				sectionId === lockedChallenge.challengeUUID &&
				intersectionRatio < 0.1
			) {
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

			// Check if this is a text section ID
			const textSection = careerQuestClass.getTextSectionById(careerData.careerUUID, sectionId)
			if (textSection) {
				// This is a text section
				if (shouldShowIcon(sectionId)) {
					newContent = { type: "image", icon: textSection.triggerImage }
				} else {
					return prevContent // Don't change content for disallowed sections
				}
			} else {
				// This must be a challenge UUID
				const challengeData = careerQuestClass.getChallengeData({
					careerUUID: careerData.careerUUID,
					challengeUUID: sectionId as ChallengeUUID
				})

				if (!challengeData) return prevContent

				newContent = { type: "challenge", challengeData }

				// Lock the challenge if it comes fully into view (70% threshold)
				if (intersectionRatio >= 0.7) {
					setLockedChallenge(challengeData)
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
	}, [lockedChallenge, shouldShowIcon, careerData.careerUUID])

	// Helper function to get current cpp code for a specific challenge
	const getCppCodeForChallenge = useCallback((challengeData: CqChallengeData) => {
		const currentBlocklyJson = careerQuestClass.getUpdatedBlocklyJson(challengeData) || challengeData.initialBlocklyJson
		return generateCppFromJson(currentBlocklyJson)
	}, [])

	// Add after existing useCallback declarations
	const handleTextParentScrollComplete = useCallback((textParentId: string) => {
		setCompletedTextParents(prev => new Set([...prev, textParentId]))
		setActiveTextParent(null)
	}, [])

	const handleTextParentScroll = useCallback((textParentId: string, scrollElement: HTMLDivElement) => {
		const { scrollTop, scrollHeight, clientHeight } = scrollElement
		const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10 // 10px tolerance

		console.log("📜 Text parent scroll:", {
			textParentId,
			scrollTop,
			scrollHeight,
			clientHeight,
			isAtBottom,
			completed: completedTextParents.has(textParentId)
		})

		if (isAtBottom && !completedTextParents.has(textParentId)) {
			console.log("✅ Completing text parent:", textParentId)
			handleTextParentScrollComplete(textParentId)
		}
	}, [completedTextParents, handleTextParentScrollComplete])

	const setTextParentRef = useCallback((textParentId: string, element: HTMLDivElement | null) => {
		if (element) {
			textParentScrollRefs.current.set(textParentId, element)
		} else {
			textParentScrollRefs.current.delete(textParentId)
		}
	}, [])

	useEffect(() => {
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionId = entry.target.getAttribute("data-section-id")
						if (sectionId && visibleSectionIds.includes(sectionId)) {
							updateRightContent(sectionId, entry.intersectionRatio)
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

	// Add after existing intersection observer useEffect
	useEffect(() => {
		const handleOuterScroll = (e: Event) => {
			// Only block if the scroll is NOT happening within an active text parent
			const target = e.target as HTMLElement
			const isScrollingWithinTextParent = target.closest("[data-text-parent]")

			console.log("🚫 Outer scroll attempt:", {
				activeTextParent,
				completedTextParents: Array.from(completedTextParents),
				target: target.tagName,
				isScrollingWithinTextParent: !!isScrollingWithinTextParent
			})

			// Only block outer scroll if we're in an active text parent AND the scroll is not within that text parent
			if (activeTextParent && !completedTextParents.has(activeTextParent) && !isScrollingWithinTextParent) {
				console.log("❌ Blocking outer scroll for:", activeTextParent)
				e.preventDefault()
				e.stopPropagation()
			}
		}

		const scrollContainer = leftScrollRef.current
		if (scrollContainer) {
			scrollContainer.addEventListener("scroll", handleOuterScroll, { passive: false })
			scrollContainer.addEventListener("wheel", handleOuterScroll, { passive: false })
			scrollContainer.addEventListener("touchmove", handleOuterScroll, { passive: false })
		}

		return () => {
			if (scrollContainer) {
				scrollContainer.removeEventListener("scroll", handleOuterScroll)
				scrollContainer.removeEventListener("wheel", handleOuterScroll)
				scrollContainer.removeEventListener("touchmove", handleOuterScroll)
			}
		}
	}, [activeTextParent, completedTextParents])

	// Add after scroll blocking useEffect
	useEffect(() => {
		const textParentObservers = new Map<string, IntersectionObserver>()

		visibleSections.forEach(section => {
			if (section.type === "textParent") {
				// eslint-disable-next-line @typescript-eslint/no-shadow
				const observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								const childId = entry.target.getAttribute("data-child-id")
								if (childId) {
									updateRightContent(childId, entry.intersectionRatio)
								}
							}
						})
					},
					{
						threshold: [0.1, 0.5, 0.7],
						rootMargin: "-20% 0px -20% 0px",
						root: textParentScrollRefs.current.get(section.id) || null
					}
				)

				// Observe children within this text parent
				setTimeout(() => {
					document.querySelectorAll(`[data-text-parent="${section.id}"] [data-child-id]`).forEach((el) => {
						observer.observe(el)
					})
				}, 100)

				textParentObservers.set(section.id, observer)
			}
		})

		return () => {
			// eslint-disable-next-line @typescript-eslint/no-shadow
			textParentObservers.forEach(observer => observer.disconnect())
		}
	}, [visibleSections, updateRightContent])

	// Content is ready, render with persistent layout
	return (
		<div className="flex h-full">
			{/* Left Panel - Always Present */}
			<div
				ref={leftScrollRef}
				className="overflow-y-auto scrollbar-hide"
				style={{
					scrollbarWidth: "none",
					msOverflowStyle: "none",
					width: "45%"
				}}
			>
				<AnimatePresence mode="wait">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
					>
						<div className="py-8 space-y-8 px-[100px]">
							{visibleSections.map((section) => (
								<div key={section.id} className="min-h-[50vh]">
									{section.type === "challenge" ? (
										<div data-section-id={section.challengeData.challengeUUID} className="h-[calc(100vh-10rem)]">
											<CqChatInterface
												cppCode={getCppCodeForChallenge(section.challengeData)}
												challengeData={section.challengeData}
											/>
										</div>
									) : (
										<div className="border-2 border-swan rounded-3xl bg-polar h-[calc(100vh-10rem)] flex flex-col">
											<div
												ref={(el) => setTextParentRef(section.id, el)}
												className="flex-1 overflow-y-auto scrollbar-hide"
												data-text-parent={section.id}
												onScroll={(e) => {
													const target = e.target as HTMLDivElement
													console.log("🎯 Setting active text parent:", section.id)
													setActiveTextParent(section.id)
													handleTextParentScroll(section.id, target)
													// Prevent this scroll event from bubbling up to outer container
													e.stopPropagation()
												}}
												style={{
													padding: "75px"
												}}
											>
												<div className="space-y-6">
													{section.children.map((childSection) => (
														<div
															key={childSection.id}
															data-child-id={childSection.id}
															className="prose prose-lg max-w-none text-4xl min-h-[50vh]"
														>
															<p className="leading-relaxed text-questionText text-center">
																{childSection.content}
															</p>
														</div>
													))}
												</div>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</motion.div>
				</AnimatePresence>
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
