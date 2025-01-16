import React, { Suspense } from "react"
import { observer } from "mobx-react"
import { Routes, Route } from "react-router"
// import Garage from "./pages/garage"

import labRoutes from "./routing/lab-routes-structure"

import useScrollToTop from "./hooks/scroll-to-top"
import useRetrievePipInfoUseEffect from "./hooks/pip/retrieve-pip-info"
import useGetAuthDataFromStorage from "./hooks/auth/get-auth-data-from-storage"
import useLogoutListenerUseEffect from "./hooks/listeners/logout-listener-use-effect"
import useSocketEventsUseEffect from "./hooks/socket-events/socket-events-use-effect"
import useInitializeGoogleAnalytics from "./hooks/analytics/initialize-google-analytics"
import useSiteThemeListenerUseEffect from "./hooks/listeners/site-theme-listener-use-effect"
import useRedirectBackToRegisterUsername from "./hooks/redirects/redirect-back-to-register-username"
import useRetrievePersonalInfoUseEffect from "./hooks/personal-info/retrieve-personal-info-use-effect"
import generateLabRoutes from "./utils/generate-lab-routes"

const Landing = React.lazy(() => import("./pages/landing"))
const LoginPage = React.lazy(() => import("./pages/auth/login-page"))
const RegisterPage = React.lazy(() => import("./pages/auth/register-page"))
const RegisterUsername = React.lazy(() => import("./pages/auth/register-username"))
const Lab = React.lazy(() => import("./pages/lab"))
const AddPip = React.lazy(() => import("./pages/add-pip"))
const Settings = React.lazy(() => import("./pages/settings"))
const Contact = React.lazy(() => import("./pages/contact"))
const Missing = React.lazy(() => import("./pages/missing"))
const Sandbox = React.lazy(() => import("./pages/sandbox"))

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
		<Suspense>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/register-username" element={<RegisterUsername />} />
				<Route path="/lab" element={<Lab />}>
					{generateLabRoutes(labRoutes)}
				</Route>
				{/* <Route path="/garage" element={<Garage />} /> */}
				<Route path="/sandbox" element={<Sandbox />} />
				<Route path="/add-pip" element={<AddPip />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="*" element={<Missing />} />
			</Routes>
		</Suspense>
	)
}

export default observer(App)
