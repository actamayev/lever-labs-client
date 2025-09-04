/* eslint-disable max-depth */
import { observer } from "mobx-react"
import { AnimatePresence, MotionProps, motion } from "framer-motion"
import { ReactNode } from "react"
import Image from "next/image"
import ChallengeSection from "./challenge-section"
import careerQuestClass from "../../../classes/career-quest-class"
import CareerChatInterface from "../chat/career-chat-interface"
import { getTriggerComponent } from "../../../utils/career-quest/trigger-components"
import { getContentComponent } from "../../../utils/career-quest/career-quest-content"

// eslint-disable-next-line complexity
function getUpcomingImages(careerData: CareerQuestData, lookAhead: number = 2): string[] {
	const career = careerQuestClass.careers.get(careerData.careerUUID)
	if (!career) return []

	const upcomingImages: string[] = []
	const currentMainSlideIndex = career.currentMainSlideIndex
	const sections = career.careerDefinition.sections

	// Look ahead through the next few sections
	for (let i = currentMainSlideIndex + 1; i < Math.min(sections.length, currentMainSlideIndex + 1 + lookAhead); i++) {
		const section = sections[i]

		if (section.type === "textParent") {
			// Check all children in this text parent section
			for (const child of section.children) {
				if (child.type === "text") {
					const rightContent = typeof child.rightSideContent === "string"
						? { type: "icon" as const, iconKey: child.rightSideContent }
						: child.rightSideContent
					if (rightContent.type === "image") {
						upcomingImages.push(rightContent.src)
					}
				} else if (child.type === "morphingText") {
					// Check all variants in morphing text

					for (const variant of child.morphingVariants) {

						if (variant.rightContent.type === "image") {
							upcomingImages.push(variant.rightContent.src)
						}
					}
				}
			}
		}
		// Note: Challenge sections don't typically have images in RightContent
	}

	return [...new Set(upcomingImages)] // Remove duplicates
}

// eslint-disable-next-line max-lines-per-function, complexity
function RightContent({ careerData }: { careerData: CareerQuestData }): React.ReactNode {
	const rightContent = careerQuestClass.getRightContent(careerData.careerUUID)
	const isDataReady = careerQuestClass.hasRetrievedAllChallengesForCareer(careerData.careerUUID)
	const isTransitioning = careerQuestClass.getIsTransitioning(careerData.careerUUID)
	const upcomingImages = getUpcomingImages(careerData)

	// Preload upcoming images invisibly
	const preloadImages = (): ReactNode => {
		if (!isDataReady || upcomingImages.length === 0) return null

		return (
			<div style={{ display: "none" }} aria-hidden="true">
				{upcomingImages.map((src): ReactNode => (
					<Image
						key={`preload-${src}`}
						src={src}
						alt=""
						width={1}
						height={1}
						priority={true}
						style={{ pointerEvents: "none" }}
					/>
				))}
			</div>
		)
	}

	// Helper function to get transition props
	const getTransitionProps = (): MotionProps => {
		if (isTransitioning) {
			return {
				initial: { opacity: 1 },
				animate: { opacity: 1 },
				exit: { opacity: 1 },
				transition: { duration: 0 }
			}
		}
		return {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			transition: { duration: 0.3 }
		}
	}

	if (!isDataReady) {
		return <div className="h-full w-full flex items-center justify-center" />
	}

	if (rightContent.type === "chat") {
		return (
			<AnimatePresence mode="wait">
				<motion.div
					key={`${rightContent.type}-${careerData.careerUUID}`}
					{...getTransitionProps()}
					className="h-full w-full"
				>
					<CareerChatInterface careerUUID={careerData.careerUUID} />
				</motion.div>
			</AnimatePresence>
		)
	} else if (rightContent.type === "icon") {
		// Renamed from "image" to avoid confusion with actual images
		return (
			<AnimatePresence mode="wait">
				<motion.div
					key={`${rightContent.type}-${rightContent.iconKey}`}
					{...getTransitionProps()}
				>
					{getTriggerComponent(rightContent.iconKey)}
				</motion.div>
			</AnimatePresence>
		)
	} else if (rightContent.type === "image") {
		return (
			<AnimatePresence mode="wait">
				<motion.div
					key={`${rightContent.type}-${rightContent.src}`}
					{...getTransitionProps()}
					className="h-full w-full flex items-center justify-center p-8"
				>
					<div className="relative max-w-full max-h-full">
						<Image
							src={rightContent.src}
							alt={rightContent.alt}
							width={rightContent.width}
							height={rightContent.height}
							className="object-contain rounded-3xl"
							// style={{
							// 	mask: "radial-gradient(ellipse 55% 55% at center, black 70%, transparent 100%)",
							// 	WebkitMask: "radial-gradient(ellipse 70% 60% at center, black 40%, transparent 100%)"
							// }}
							priority={true}
						/>
					</div>
				</motion.div>
			</AnimatePresence>
		)
	} else if (rightContent.type === "video") {
		return (
			<AnimatePresence mode="wait">
				<motion.div
					key={`${rightContent.type}-${rightContent.src}`}
					{...getTransitionProps()}
					className="h-full w-full flex items-center justify-center p-4"
				>
					<video
						src={rightContent.src}
						poster={rightContent.poster}
						controls
						autoPlay={rightContent.autoplay || false}
						loop={rightContent.loop || false}
						muted={rightContent.muted || true} // Default muted for autoplay
						className="max-w-full max-h-full rounded-lg shadow-lg"
					>
						Your browser does not support the video tag.
					</video>
				</motion.div>
			</AnimatePresence>
		)
	} else if (rightContent.type === "component") {
		let componentContent: ReactNode
		if (typeof rightContent.component === "function") {
			componentContent = rightContent.component()
		} else if (typeof rightContent.component === "string") {
			componentContent = getContentComponent(rightContent.component)
		} else {
			componentContent = rightContent.component
		}

		return (
			<AnimatePresence mode="wait">
				<motion.div
					key={`${rightContent.type}-${Date.now()}`}
					{...getTransitionProps()}
					className="h-full w-full flex items-center justify-center"
				>
					{componentContent}
				</motion.div>
			</AnimatePresence>
		)
	} else if (rightContent.type === "challenge") {
		return (
			<AnimatePresence mode="wait">
				<motion.div
					key={`${rightContent.type}-${rightContent.challengeData.challengeUUID}`}
					{...getTransitionProps()}
					className="h-full w-full"
				>
					<ChallengeSection challengeData={rightContent.challengeData} />
				</motion.div>
			</AnimatePresence>
		)
	}

	return (
		<>
			{preloadImages()}
			<div className="h-full w-full flex items-center justify-center" />
		</>
	)
}

export default observer(RightContent)
