import { useEffect } from "react"
import isNull from "lodash-es/isNull"
import { usePageTransitionContext } from "../../contexts/page-transition-context"

export default function useResetTransitionDirectionUseEffect(): void {
	const pageTransitionClass = usePageTransitionContext()

	useEffect(() => {
		// 2/18/25 TODO: When I go back to the reading from the demo,
		// if i scroll down a bit before 1 second, the page jumps back up to the top
		if (isNull(pageTransitionClass.direction)) return
		const timer = setTimeout(() => {
			pageTransitionClass.setDirection(null) // Reset after 1s
		}, 1000)

		return (): void => clearTimeout(timer) // Cleanup timer if direction changes quickly
	}, [pageTransitionClass, pageTransitionClass.direction])
}
