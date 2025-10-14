"use client"

import { useEffect, useRef } from "react"
import careerQuestTrigger from "../../utils/career-quest/career-quest-trigger"
import { CareerType, ValidTriggerMessageType } from "@lever-labs/common-ts/protocol"
import pipClass from "../../classes/pip-class"
import isNull from "lodash-es/isNull"

interface Options {
	enterDelayMs?: number
	enabled?: boolean
	repeatIntervalMs?: number
}

// Triggers ENTER on mount (with optional delay) and EXIT on unmount/page hide/refresh
// Handles React 18 StrictMode double-invoke in dev and avoids duplicate EXITs
export default function useCareerQuestTrigger(
	careerType: CareerType,
	enterTrigger: ValidTriggerMessageType<CareerType> | null,
	exitTrigger: ValidTriggerMessageType<CareerType>,
	options: Options = {}
): void {
	const { enterDelayMs = 100, enabled = true, repeatIntervalMs = 15000 } = options
	const hasExitedRef = useRef(false)
	const hasInitializedRef = useRef(false)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	useEffect((): (() => void) => {
		if (!enabled) return (): void => {}

		const triggerTimeout = setTimeout((): void => {
			if (
				!enterTrigger ||
				isNull(pipClass.selectedPip)
			) return
			void careerQuestTrigger(careerType, enterTrigger)

			// Set up interval to repeat enter trigger every 15 seconds (or custom interval)
			if (repeatIntervalMs > 0) {
				intervalRef.current = setInterval((): void => {
					if (!hasExitedRef.current && enterTrigger) {
						console.log("Repeating enter trigger")
						void careerQuestTrigger(careerType, enterTrigger)
					}
				}, repeatIntervalMs)
			}
		}, Math.max(0, enterDelayMs))

		const sendExitIfNeeded = (): void => {
			if (hasExitedRef.current) return
			hasExitedRef.current = true

			// Clear the interval when exiting
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
				intervalRef.current = null
			}

			void careerQuestTrigger(careerType, exitTrigger)
		}

		const handleVisibilityChange = (): void => {
			if (document.visibilityState === "hidden") {
				sendExitIfNeeded()
			}
		}

		const handleBeforeUnload = (): void => {
			sendExitIfNeeded()
		}

		document.addEventListener("visibilitychange", handleVisibilityChange)
		window.addEventListener("beforeunload", handleBeforeUnload)

		// Ignore EXIT on the initial StrictMode cleanup (dev-only double-invoke)
		if (!hasInitializedRef.current) {
			hasInitializedRef.current = true
			return (): void => {
				clearTimeout(triggerTimeout)
				if (intervalRef.current) {
					clearInterval(intervalRef.current)
				}
				document.removeEventListener("visibilitychange", handleVisibilityChange)
				window.removeEventListener("beforeunload", handleBeforeUnload)
			}
		}

		return (): void => {
			clearTimeout(triggerTimeout)
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
			document.removeEventListener("visibilitychange", handleVisibilityChange)
			window.removeEventListener("beforeunload", handleBeforeUnload)
			sendExitIfNeeded()
		}
	}, [careerType, enterTrigger, exitTrigger, enterDelayMs, enabled, repeatIntervalMs])
}
