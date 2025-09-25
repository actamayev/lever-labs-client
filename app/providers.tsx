"use client"

import { ReactNode, useEffect } from "react"
import { Slide, ToastContainer } from "react-toastify"
import { GoogleOAuthProvider } from "@react-oauth/google"

// Custom hooks from your application
import authClass from "../src/classes/auth-class"
import personalInfoClass from "../src/classes/personal-info-class"
import retrieveClassrooms from "../src/utils/student/retrieve-classrooms"
import retrievePersonalInfo from "../src/utils/personal-info/retrieve-personal-info"
import useInitializeGoogleAnalytics from "@/hooks/analytics/use-initialize-google-analytics"

const retrieveInfo = async (): Promise<void> => {
	// Only retrieve if user is authenticated but we don't have personal info yet
	// This handles page refreshes where middleware knows user is auth but client state is empty
	if (!authClass.isLoggedIn || personalInfoClass.retrievedPersonalInfo) return
	try {
		await retrievePersonalInfo()
		void retrieveClassrooms()
		// void retrieveActivePipConnection()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		// If this fails, user might not actually be authenticated
		console.error("Data retrieval failed - user may not be authenticated")
	}
}

export default function Providers({ children }: { children: ReactNode }): React.ReactNode {
	useInitializeGoogleAnalytics()

	// Smart data retrieval - only if needed
	useEffect((): void => {
		void retrieveInfo()
	}, [])

	return (
		<GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
			{children}
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
