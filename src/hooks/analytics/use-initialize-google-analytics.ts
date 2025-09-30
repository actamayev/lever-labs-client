"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function useInitializeGoogleAnalytics(): void {
	const pathname = usePathname() // This returns the current path as a string
	const [analyticsInitialized, setAnalyticsInitialized] = useState(false)

	// Initialize GA only once when component mounts
	useEffect((): void => {
		const initializeGA = async (): Promise<void> => {
			try {
				console.log("process.env.VERCEL_ENV", process.env.VERCEL_ENV)
				console.log("process.env.NODE_ENV", process.env.NODE_ENV)
				// Dynamically import ReactGA only when needed

				const ReactGA = (await import("react-ga4")).default
				ReactGA.initialize(process.env.NEXT_PUBLIC_MEASUREMENT_ID as string)
				setAnalyticsInitialized(true)
			} catch (error) {
				console.error("Failed to initialize Google Analytics:", error)
			}
		}

		initializeGA()
	}, [])


	// Send pageview only after GA is initialized
	useEffect((): void => {
		if (!analyticsInitialized) return

		const sendPageView = async (): Promise<void> => {
			console.log("process.env.VERCEL_ENV", process.env.VERCEL_ENV)
			console.log("process.env.NODE_ENV", process.env.NODE_ENV)
			const ReactGA = (await import("react-ga4")).default
			ReactGA.send({
				hitType: "pageview",
				page: pathname
			})
		}

		sendPageView()
	}, [pathname, analyticsInitialized]) // Change dependency from location to pathname
}
