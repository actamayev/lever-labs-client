"use client"

import { ReactNode, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Slide, ToastContainer } from "react-toastify"

// Custom hooks from your application
import { observer } from "mobx-react"
import retrievePipInfo from "../src/utils/pip/retrieve-pip-info"
import ConditionalLayout from "../src/components/layouts/conditional-layout"
import retrievePersonalInfo from "../src/utils/personal-info/retrieve-personal-info"
import useLogoutListenerUseEffect from "@/hooks/listeners/logout-listener-use-effect"
import useSocketEventsUseEffect from "@/hooks/socket-events/socket-events-use-effect"
import useInitializeGoogleAnalytics from "@/hooks/analytics/initialize-google-analytics"
import useSiteThemeListenerUseEffect from "@/hooks/listeners/site-theme-listener-use-effect"
import useRedirectBackToRegisterUsername from "@/hooks/redirects/redirect-back-to-register-username"

function RedirectHandler() {
	useRedirectBackToRegisterUsername()
	return null
}

const ObserverRedirectHandler = observer(RedirectHandler)

export default function Providers({ children }: { children: ReactNode }) {
	useLogoutListenerUseEffect()
	useSiteThemeListenerUseEffect()
	useInitializeGoogleAnalytics()
	useEffect(() => void retrievePersonalInfo(), [])
	useSocketEventsUseEffect()
	useEffect(() => void retrievePipInfo(), [])

	return (
		<GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
			<ObserverRedirectHandler />
			<ConditionalLayout>
				<AnimatePresence mode="wait">
					{children}
				</AnimatePresence>
			</ConditionalLayout>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				transition={Slide}
				style={{ width: "min(400px, 90vw)" }}
				toastStyle={{ width: "min(400px, 90vw)" }}
				limit={1}
			/>
		</GoogleOAuthProvider>
	)
}
