"use client"

import { ReactNode } from "react"
import { AnimatePresence } from "framer-motion"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Slide, ToastContainer } from "react-toastify"

// Custom hooks from your application
import { observer } from "mobx-react"
import ConditionalLayout from "../src/components/layouts/conditional-layout"
import useRetrievePipInfoUseEffect from "@/hooks/pip/retrieve-pip-info-use-effect"
import useLogoutListenerUseEffect from "@/hooks/listeners/logout-listener-use-effect"
import useSocketEventsUseEffect from "@/hooks/socket-events/socket-events-use-effect"
import useInitializeGoogleAnalytics from "@/hooks/analytics/initialize-google-analytics"
import useSiteThemeListenerUseEffect from "@/hooks/listeners/site-theme-listener-use-effect"
import useRedirectBackToRegisterUsername from "@/hooks/redirects/redirect-back-to-register-username"
import useRetrievePersonalInfoUseEffect from "@/hooks/personal-info/retrieve-personal-info-use-effect"
import useResetTransitionDirectionUseEffect from "@/hooks/listeners/reset-transition-direction-use-effect"

function RedirectHandler() {
	useRedirectBackToRegisterUsername()
	return null
}

const ObserverRedirectHandler = observer(RedirectHandler)

export default function Providers({ children }: { children: ReactNode }) {
	useLogoutListenerUseEffect()
	useSiteThemeListenerUseEffect()
	useInitializeGoogleAnalytics()
	useRetrievePersonalInfoUseEffect()
	useSocketEventsUseEffect()
	useRetrievePipInfoUseEffect()
	useResetTransitionDirectionUseEffect()

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
