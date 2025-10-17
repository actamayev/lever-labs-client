"use client"

import { useEffect, useRef, useCallback } from "react"
import careerQuestTrigger from "../../utils/career-quest/career-quest-trigger"
import { CareerType, ValidTriggerMessageType } from "@lever-labs/common-ts/protocol"
import isPipConnected from "../../utils/career-quest/is-pip-connected"
import pipClass from "../../classes/pip-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

interface Options {
	enterDelayMs?: number
	enabled?: boolean
	repeatIntervalMs?: number
}

// Triggers ENTER on mount (with optional delay), immediately when pip connects mid-session,
// and repeats every 15 seconds while connected. Triggers EXIT on unmount/page hide/refresh.
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
	const previousConnectionStateRef = useRef(false)

	// Helper function to send the enter trigger and start interval
	const sendEnterTriggerAndStartInterval = useCallback((): void => {
		if (!enterTrigger) return

		// Send the trigger immediately
		void careerQuestTrigger(careerType, enterTrigger)

		// Clear any existing interval
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}

		// Set up interval to repeat enter trigger every 15 seconds (or custom interval)
		if (repeatIntervalMs > 0) {
			intervalRef.current = setInterval((): void => {
				if (!hasExitedRef.current && enterTrigger) {
					void careerQuestTrigger(careerType, enterTrigger)
				}
			}, repeatIntervalMs)
		}
	}, [careerType, enterTrigger, repeatIntervalMs])

	// Effect to handle initial mount trigger
	useEffect((): (() => void) => {
		if (!enabled) return (): void => {}

		const triggerTimeout = setTimeout((): void => {
			if (!enterTrigger) return
			sendEnterTriggerAndStartInterval()
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
	}, [careerType, enterTrigger, exitTrigger, enterDelayMs, enabled, repeatIntervalMs, sendEnterTriggerAndStartInterval])

	// Effect to detect pip connection changes and trigger immediately
	// This effect tracks MobX observables directly to ensure reactivity
	useEffect((): void => {
		if (!enabled || !enterTrigger || hasExitedRef.current) return

		const currentConnectionState = isPipConnected()

		// Check if pip just connected (transition from false to true)
		if (currentConnectionState && !previousConnectionStateRef.current) {
			// Pip just connected, send trigger immediately and restart interval
			sendEnterTriggerAndStartInterval()
		}

		// Update previous connection state for next check
		previousConnectionStateRef.current = currentConnectionState
	// Track the specific MobX observables that affect connection state
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		enabled,
		enterTrigger,
		sendEnterTriggerAndStartInterval,
		serialConnectionManagerClass.pipTurnedOn,
		pipClass.selectedPip,
		pipClass.selectedPip?.pipConnectionStatus
	])
}
