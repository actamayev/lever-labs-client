import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Missing from "./pages/missing"
import Contact from "./components/contact"
import useInitializeTagManager from "./hooks/analytics/initialize-tag-manager"

export default function App() {
	useInitializeTagManager()

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/contact" element={<Contact />} />

			<Route path="*" element={<Missing />} />
		</Routes>
	)
}
