import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the RegisterPage component
const RegisterPage = dynamic(() => import("../../src/test/auth/register-page"), {
	ssr: false, // Set to false if it uses browser-specific APIs
	loading: () => <div>Loading...</div>
})

export default function Register() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<RegisterPage />
		</Suspense>
	)
}
