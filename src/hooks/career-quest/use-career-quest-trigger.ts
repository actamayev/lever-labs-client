"use client"

import { useEffect, useRef } from "react"
import careerQuestTrigger from "../../utils/career-quest/career-quest-trigger"
import { CareerType, ValidTriggerMessageType } from "@lever-labs/common-ts/protocol"

interface Options {
	enterDelayMs?: number
	enabled?: boolean
}

// Triggers ENTER on mount (with optional delay) and EXIT on unmount/page hide/refresh
// Handles React 18 StrictMode double-invoke in dev and avoids duplicate EXITs
export default function useCareerQuestTrigger(
	careerType: CareerType,
	enterTrigger: ValidTriggerMessageType<CareerType> | null,
	exitTrigger: ValidTriggerMessageType<CareerType>,
	options: Options = {}
): void {
	const { enterDelayMs = 100, enabled = true } = options
	const hasExitedRef = useRef(false)
	const hasInitializedRef = useRef(false)

	useEffect((): (() => void) => {
		if (!enabled) return (): void => {}

		const triggerTimeout = setTimeout((): void => {
			if (enterTrigger) {
				void careerQuestTrigger(careerType, enterTrigger)
			}
		}, Math.max(0, enterDelayMs))

		const sendExitIfNeeded = (): void => {
			if (hasExitedRef.current) return
			hasExitedRef.current = true
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
				document.removeEventListener("visibilitychange", handleVisibilityChange)
				window.removeEventListener("beforeunload", handleBeforeUnload)
			}
		}

		return (): void => {
			clearTimeout(triggerTimeout)
			document.removeEventListener("visibilitychange", handleVisibilityChange)
			window.removeEventListener("beforeunload", handleBeforeUnload)
			sendExitIfNeeded()
		}
	}, [careerType, enterTrigger, exitTrigger, enterDelayMs, enabled])
}


