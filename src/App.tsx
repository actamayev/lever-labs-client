import { observer } from "mobx-react"
import { Routes, Route } from "react-router-dom"
import Lab from "./pages/lab"
import Home from "./pages/home"
// import Garage from "./pages/garage"
import Contact from "./pages/contact"
import Missing from "./pages/missing"
import Sandbox from "./pages/sandbox"
// import MyAccount from "./pages/account"
import LoginPage from "./pages/auth/login-page"
import RegisterPage from "./pages/auth/register-page"
import RegisterUsername from "./pages/auth/register-username"

import useScrollToTop from "./hooks/scroll-to-top"
import useRetrievePipInfoUseEffect from "./hooks/pip/retrieve-pip-info"
import useGetAuthDataFromStorage from "./hooks/auth/get-auth-data-from-storage"
import useLogoutListenerUseEffect from "./hooks/listeners/logout-listener-use-effect"
import useSocketEventsUseEffect from "./hooks/socket-events/socket-events-use-effect"
import useInitializeGoogleAnalytics from "./hooks/analytics/initialize-google-analytics"
import useSiteThemeListenerUseEffect from "./hooks/listeners/site-theme-listener-use-effect"
import useRedirectBackToRegisterUsername from "./hooks/redirects/redirect-back-to-register-username"
import useRetrievePersonalInfoUseEffect from "./hooks/personal-info/retrieve-personal-info-use-effect"

function App() {
	useScrollToTop()
	const getAuthDataFromStorage = useGetAuthDataFromStorage()
	getAuthDataFromStorage()
	useLogoutListenerUseEffect()
	useSiteThemeListenerUseEffect()
	useInitializeGoogleAnalytics()
	useRedirectBackToRegisterUsername()
	useRetrievePersonalInfoUseEffect()
	useSocketEventsUseEffect()
	useRetrievePipInfoUseEffect()

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/register-username" element={<RegisterUsername />} />

			{/* <Route path="/garage" element={<Garage />} /> */}
			<Route path="/lab" element={<Lab />} />
			<Route path="/sandbox" element={<Sandbox />} />

			{/* <Route path="/account" element={<MyAccount />} /> */}

			<Route path="/contact" element={<Contact />} />

			<Route path="*" element={<Missing />} />
		</Routes>
	)
}

export default observer(App)
