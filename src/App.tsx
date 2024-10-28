import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Missing from "./pages/missing"
import Contact from "./components/contact"
import useInitializeGoogleAnalytics from "./hooks/analytics/initialize-google-analytics"

export default function App() {
	useInitializeGoogleAnalytics()

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/contact" element={<Contact />} />

			<Route path="*" element={<Missing />} />
		</Routes>
	)
}
