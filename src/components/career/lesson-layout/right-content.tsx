import { observer } from "mobx-react"
import { AnimatePresence, MotionProps, motion } from "framer-motion"
import { ReactNode } from "react"
import Image from "next/image"
import ChallengeSection from "./challenge-section"
import careerQuestClass from "../../../classes/career-quest-class"
import CareerChatInterface from "../chat/career-chat-interface"
import { getTriggerComponent } from "../../../utils/career-quest/trigger-components"
import { getContentComponent } from "../../../utils/career-quest/career-quest-content"

// eslint-disable-next-line max-lines-per-function, complexity
function RightContent({ careerData }: { careerData: CareerQuestData }): React.ReactNode {
	const rightContent = careerQuestClass.getRightContent(careerData.careerUUID)
	const isDataReady = careerQuestClass.hasRetrievedAllChallengesForCareer(careerData.careerUUID)
	const isTransitioning = careerQuestClass.getIsTransitioning(careerData.careerUUID)

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
					className="h-full w-full flex items-center justify-center p-4"
				>
					<div className="relative max-w-full max-h-full">
						<Image
							src={rightContent.src}
							alt={rightContent.alt}
							width={rightContent.width}
							height={rightContent.height}
							className="object-contain rounded-lg"
							priority={true} // Since these are part of the main content flow
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

	return <div className="h-full w-full flex items-center justify-center" />
}

export default observer(RightContent)
