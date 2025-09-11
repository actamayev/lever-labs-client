import { observer } from "mobx-react"
import { AnimatePresence, MotionProps, motion } from "framer-motion"
import Image from "next/image"
import ChallengeSection from "./challenge-section"
import careerQuestClass from "../../../classes/career-quest-class"
import CareerChatInterface from "../chat/career-chat-interface"
import navigationManagerClass from "../../../classes/navigation-manager-class"
import ViewOnlySandbox from "../../sandbox/view-only-sandbox/view-only-sandbox"

// eslint-disable-next-line max-lines-per-function
function RightContent({ careerData }: { careerData: CareerQuestData }): React.ReactNode {
	const rightContent = careerQuestClass.getRightContent(careerData.careerUUID)
	const isDataReady = careerQuestClass.hasRetrievedAllChallengesForCareer(careerData.careerUUID)
	const isTransitioning = navigationManagerClass.getIsTransitioning(careerData.careerUUID)

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
							priority={true}
						/>
					</div>
				</motion.div>
			</AnimatePresence>
		)
	} else if (rightContent.type === "component") {
		return (
			<AnimatePresence mode="wait">
				<motion.div
					key={`${rightContent.type}-${Date.now()}`}
					{...getTransitionProps()}
					className="h-full w-full flex items-center justify-center"
				>
					<rightContent.component />
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
	} else if (rightContent.type === "view-only-sandbox") {
		return (
			<AnimatePresence mode="wait">
				<motion.div
					key={`${rightContent.type}-${rightContent.blocklyJson.id}`}
					{...getTransitionProps()}
					className="h-full w-full"
				>
					<ViewOnlySandbox blocklyJson={rightContent.blocklyJson} />
				</motion.div>
			</AnimatePresence>
		)
	}

	return <div className="h-full w-full flex items-center justify-center" />
}

export default observer(RightContent)
