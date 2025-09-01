import { observer } from "mobx-react"
import { AnimatePresence, MotionProps, motion } from "framer-motion"
import { ReactNode } from "react"
import ChallengeSection from "./challenge-section"
import careerQuestClass from "../../../classes/career-quest-class"
import CareerChatInterface from "../chat/career-chat-interface"
import { getTriggerComponent } from "../../../utils/career-quest/trigger-components"
import { getContentComponent } from "../../../utils/career-quest/career-quest-content"

function RightContent({ careerData } : { careerData: CareerQuestData }): React.ReactNode {
	const rightContent = careerQuestClass.getRightContent(careerData.careerUUID)
	const isDataReady = careerQuestClass.hasRetrievedAllChallengesForCareer(careerData.careerUUID)
	const isTransitioning = careerQuestClass.getIsTransitioning(careerData.careerUUID)

	// Helper function to get transition props
	const getTransitionProps = (): MotionProps => {
		if (isTransitioning) {
			// During transitions, skip animations entirely
			return {
				initial: { opacity: 1 },
				animate: { opacity: 1 },
				exit: { opacity: 1 },
				transition: { duration: 0 }
			}
		}
		// Normal animations
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
	} else if (rightContent.type === "image") {
		return (
			<AnimatePresence mode="wait">
				<motion.div
					key={`${rightContent.type}-${rightContent.icon}`}
					{...getTransitionProps()}
				>
					{getTriggerComponent(rightContent.icon)}
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

	// This should never happen since "null" type is handled in setRightContent
	// But we need this for TypeScript completeness
	return <div className="h-full w-full flex items-center justify-center" />
}

export default observer(RightContent)
