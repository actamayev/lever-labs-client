import { Suspense, lazy } from "react"
import { observer } from "mobx-react"
import { Routes, Route } from "react-router"
// import Garage from "./pages/garage"

import labRoutes from "./routing/lab-routes-structure"

import useRetrievePipInfoUseEffect from "./hooks/pip/retrieve-pip-info"
import useGetAuthDataFromStorage from "./hooks/auth/get-auth-data-from-storage"
import useLogoutListenerUseEffect from "./hooks/listeners/logout-listener-use-effect"
import useSocketEventsUseEffect from "./hooks/socket-events/socket-events-use-effect"
import useInitializeGoogleAnalytics from "./hooks/analytics/initialize-google-analytics"
import useSiteThemeListenerUseEffect from "./hooks/listeners/site-theme-listener-use-effect"
import useRedirectBackToRegisterUsername from "./hooks/redirects/redirect-back-to-register-username"
import useRetrievePersonalInfoUseEffect from "./hooks/personal-info/retrieve-personal-info-use-effect"
import generateLabRoutes from "./utils/lab/generate-lab-routes"
import AddPip from "./pages/add-pip"
import { AnimatePresence } from "framer-motion"
import useResetTransitionDirectionUseEffect from "./hooks/listeners/reset-transition-direction-use-effect"

const Landing = lazy(() => import("./pages/landing"))
const LoginPage = lazy(() => import("./pages/auth/login-page"))
const RegisterPage = lazy(() => import("./pages/auth/register-page"))
const RegisterUsername = lazy(() => import("./pages/auth/register-username"))
const Lab = lazy(() => import("./pages/lab"))
const Settings = lazy(() => import("./pages/settings"))
const Contact = lazy(() => import("./pages/contact"))
const Missing = lazy(() => import("./pages/missing"))
const Sandbox = lazy(() => import("./pages/sandbox"))
// /add-pip is not being lazy loaded. When it is, there's a strange indexOf error

function App() {
	const getAuthDataFromStorage = useGetAuthDataFromStorage()
	getAuthDataFromStorage()
	useLogoutListenerUseEffect()
	useSiteThemeListenerUseEffect()
	useInitializeGoogleAnalytics()
	useRedirectBackToRegisterUsername()
	useRetrievePersonalInfoUseEffect()
	useSocketEventsUseEffect()
	useRetrievePipInfoUseEffect()
	useResetTransitionDirectionUseEffect()

	return (
		<Suspense>
			<AnimatePresence mode="wait">
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
			</AnimatePresence>
		</Suspense>
	)
}

export default observer(App)
