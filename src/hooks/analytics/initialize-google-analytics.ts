import ReactGA from "react-ga4"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function useInitializeGoogleAnalytics(): void {
	ReactGA.initialize(process.env.REACT_APP_MEASUREMENT_ID as string)

	const location = useLocation()

	useEffect(() => {
		ReactGA.send({
			hitType: "pageview",
			page: location.pathname
		})
	}, [location])
}
