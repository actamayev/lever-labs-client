"use client"

import { motion, AnimatePresence } from "framer-motion"
import { observer } from "mobx-react"
import careerQuestClass from "../../../classes/career-quest-class"

function TransitionOverlay({ careerData }: { careerData: CareerQuestData }) {
	const isTransitioning = careerQuestClass.getIsTransitioning(careerData.careerUUID)
	const duration = careerQuestClass.getCurrentTransitionDuration(careerData.careerUUID)

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
