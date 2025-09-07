"use client"

import { motion, AnimatePresence } from "framer-motion"
import { observer } from "mobx-react"
import navigationManagerClass from "../../../classes/navigation-manager-class"

function TransitionOverlay({ careerData }: { careerData: CareerQuestData }): React.ReactNode {
	const isTransitioning = navigationManagerClass.getIsTransitioning(careerData.careerUUID)
	const duration = navigationManagerClass.getCurrentTransitionDuration(careerData.careerUUID)

	return (
		<AnimatePresence>
			{isTransitioning && (
				<motion.div
					className="fixed inset-0 bg-black z-[9999] pointer-events-none"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{
						duration: duration / 1000 / 2, // Half duration for fade-in/out
						ease: "easeInOut"
					}}
				/>
			)}
		</AnimatePresence>
	)
}

export default observer(TransitionOverlay)
