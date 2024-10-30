import { observer } from "mobx-react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import TheLab from "./pages/the-lab"
import Missing from "./pages/missing"
import Contact from "./pages/contact"
import LoginPage from "./pages/auth/login-page"
import RegisterPage from "./pages/auth/register-page"
import RegisterUsername from "./pages/auth/register-username"

import useGetAuthDataFromStorage from "./hooks/auth/get-auth-data-from-storage"
import useLogoutListenerUseEffect from "./hooks/listeners/logout-listener-use-effect"
import useInitializeGoogleAnalytics from "./hooks/analytics/initialize-google-analytics"
import useSiteThemeListenerUseEffect from "./hooks/listeners/site-theme-listener-use-effect"

function App() {
	const getAuthDataFromStorage = useGetAuthDataFromStorage()
	getAuthDataFromStorage()
	useLogoutListenerUseEffect()
	useSiteThemeListenerUseEffect()
	useInitializeGoogleAnalytics()

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/register-username" element={<RegisterUsername />} />
			<Route path="/the-lab" element={<TheLab />} />

			<Route path="/contact" element={<Contact />} />

			<Route path="*" element={<Missing />} />
		</Routes>
	)
}

export default observer(App)
