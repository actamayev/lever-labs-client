"use client"

import { ReactNode } from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"
import ContextLevelComponent from "app/context-level-component"
import { AnimatePresence } from "framer-motion"

// Custom hooks from your application
import { observer } from "mobx-react"
import useGetAuthDataFromStorage from "@/hooks/auth/get-auth-data-from-storage"
import useLogoutListenerUseEffect from "@/hooks/listeners/logout-listener-use-effect"
import useSiteThemeListenerUseEffect from "@/hooks/listeners/site-theme-listener-use-effect"
import useInitializeGoogleAnalytics from "@/hooks/analytics/initialize-google-analytics"
import useRedirectBackToRegisterUsername from "@/hooks/redirects/redirect-back-to-register-username"
import useRetrievePersonalInfoUseEffect from "@/hooks/personal-info/retrieve-personal-info-use-effect"
import useSocketEventsUseEffect from "@/hooks/socket-events/socket-events-use-effect"
import useRetrievePipInfoUseEffect from "@/hooks/pip/retrieve-pip-info-use-effect"
import useResetTransitionDirectionUseEffect from "@/hooks/listeners/reset-transition-direction-use-effect"
import ConditionalLayout from "../src/components/layouts/conditional-layout"

function RedirectHandler() {
	useRedirectBackToRegisterUsername()
	return null
}

export const ObserverRedirectHandler = observer(RedirectHandler)

export default function Providers({ children }: { children: ReactNode }) {
	const getAuthDataFromStorage = useGetAuthDataFromStorage()
	getAuthDataFromStorage()
	useLogoutListenerUseEffect()
	useSiteThemeListenerUseEffect()
	useInitializeGoogleAnalytics()
	useRetrievePersonalInfoUseEffect()
	useSocketEventsUseEffect()
	useRetrievePipInfoUseEffect()
	useResetTransitionDirectionUseEffect()

	return (
		<GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
			<ContextLevelComponent>
				<ObserverRedirectHandler />
				<ConditionalLayout>
					<AnimatePresence mode="wait">
						{children}
					</AnimatePresence>
				</ConditionalLayout>
			</ContextLevelComponent>
		</GoogleOAuthProvider>
	)
}
