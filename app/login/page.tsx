import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the LoginPage component
const LoginPage = dynamic(() => import("../../src/test/auth/login-page"), {
	ssr: false, // Set to false if it uses browser-specific APIs
	loading: () => <div>Loading...</div>
})

export default function Login() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<LoginPage />
		</Suspense>
	)
}
