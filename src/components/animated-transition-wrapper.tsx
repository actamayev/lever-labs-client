import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { motion } from "framer-motion"
import { usePageTransitionContext } from "../contexts/page-transition-context"

// 2/18/25 TODO:
// Change this animation to be more like  https://tympanus.net/Development/PageTransitions/ differnet easing
const variants = {
	enter: (direction: PageTransitionDirections) => {
		if (isNull(direction)) return { x: "0%", opacity: 1 } // No animation if direction is null
		return {
			x: direction === "left" ? "100%" : "-100%",
			opacity: 0,
		}
	},
	center: { x: "0%", opacity: 1 },
	exit: (direction: PageTransitionDirections) => {
		if (isNull(direction)) return { x: "0%", opacity: 1 } // No exit animation if direction is null
		return {
			x: direction === "right" ? "-100%" : "100%",
			opacity: 0,
		}
	},
}

function PageWrapper({ children }: { children: React.ReactNode }) {
	const pageTransitionClass = usePageTransitionContext()

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
