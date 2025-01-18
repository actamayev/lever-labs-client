import { useLocation } from "react-router"
import { useEffect, useState } from "react"

export default function useInitializeGoogleAnalytics(): void {
	const location = useLocation()
	const [analyticsInitialized, setAnalyticsInitialized] = useState(false)

	// Initialize GA only once when component mounts
	useEffect(() => {
		const initializeGA = async (): Promise<void> => {
			try {
				// Dynamically import ReactGA only when needed
				const ReactGA = (await import("react-ga4")).default
				ReactGA.initialize(process.env.REACT_APP_MEASUREMENT_ID as string)
				setAnalyticsInitialized(true)
			} catch (error) {
				console.error("Failed to initialize Google Analytics:", error)
			}
		}

		initializeGA()
	}, [])

	// Send pageview only after GA is initialized
	useEffect(() => {
		if (!analyticsInitialized) return

		const sendPageView = async (): Promise<void> => {
			const ReactGA = (await import("react-ga4")).default
			ReactGA.send({
				hitType: "pageview",
				page: location.pathname
			})
		}

		sendPageView()
	}, [location, analyticsInitialized])
}
