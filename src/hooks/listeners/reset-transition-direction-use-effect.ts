"use client"

import isNull from "lodash-es/isNull"
import { usePathname } from "next/navigation"
import { useCallback, useEffect } from "react"
import { usePageTransitionContext } from "../../classes/page-transition-context"

export default function useResetTransitionDirectionUseEffect(): void {
	const pageTransitionClass = usePageTransitionContext()
	const pathname = usePathname()

	// This is here to disable setting direction to null when the user in in the lesson.
	// Without this, if the user goes back from the demo to the reading, the page re-renders when the direction is set to null,
	// causing the scroll to reset to top
	const isCurrentLocationLesson = useCallback(() => {
		if (
			pathname.includes("/reading") ||
			pathname.includes("/demo") ||
			pathname.includes("/code")
		) {
			return true
		}
		return false
	}, [pathname])

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
