"use client"

/* eslint-disable no-nested-ternary */
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { motion } from "framer-motion"
import pageTransitionClass from "../classes/page-transition-class"

// 2/18/25 TODO:
// Change this animation to be more like  https://tympanus.net/Development/PageTransitions/ differnet easing
const variants = {
	enter: (direction: PageTransitionDirections) => {
		if (isNull(direction)) return { y: "0%", x: "0%", opacity: 1 }
		return {
			x: direction === "left" ? "100%" :
				direction === "right" ? "-100%" : "0%",
			y: direction === "up" ? "100%" :
				direction === "down" ? "-100%" : "0%",
			opacity: 0,
		}
	},
	center: { x: "0%", y: "0%", opacity: 1 },
	exit: (direction: PageTransitionDirections) => {
		if (isNull(direction)) return { y: "0%", x: "0%", opacity: 1 }
		return {
			x: direction === "right" ? "-100%" :
				direction === "left" ? "100%" : "0%",
			y: direction === "down" ? "-100%" :
				direction === "up" ? "100%" : "0%",
			opacity: 0,
		}
	},
}

function PageWrapper({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			className="absolute w-full h-full"
			key={pageTransitionClass.direction} // Force re-render when direction changes
			initial="enter"
			animate="center"
			exit="exit"
			variants={variants}
			transition={{ type: "tween", duration: 0.3 }}
			custom={pageTransitionClass.direction}
			onAnimationComplete={() => window.scrollTo(0, window.scrollY)}
		>
			{children}
		</motion.div>
	)
}

export default observer(PageWrapper)
