import isNull from "lodash-es/isNull"
import { useLocation } from "react-router"
import { useCallback, useEffect } from "react"
import { usePageTransitionContext } from "../../contexts/page-transition-context"

export default function useResetTransitionDirectionUseEffect(): void {
	const pageTransitionClass = usePageTransitionContext()
	const location = useLocation()

	// This is here to disable setting direction to null when the user in in the lesson.
	// Without this, if the user goes back from the demo to the reading, the page re-renders when the direction is set to null,
	// causing the scroll to reset to top
	const isCurrentLocationLesson = useCallback(() => {
		if (
			location.pathname.includes("/reading") ||
			location.pathname.includes("/demo") ||
			location.pathname.includes("/code")
		) {
			return true
		}
		return false
	}, [location.pathname])

	useEffect(() => {
		if (
			isNull(pageTransitionClass.direction) ||
			isCurrentLocationLesson()
		) return
		const timer = setTimeout(() => {
			pageTransitionClass.setDirection(null) // Reset after 1s
		}, 1000)

		return (): void => clearTimeout(timer) // Cleanup timer if direction changes quickly
	}, [isCurrentLocationLesson, pageTransitionClass, pageTransitionClass.direction])
}
