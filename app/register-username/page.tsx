import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the RegisterUsernamePage component
const RegisterUsernamePage = dynamic(() => import("../../src/test/auth/register-username"), {
	ssr: false, // Set to false if it uses browser-specific APIs
	loading: () => <div>Loading...</div>
})

export default function RegisterUsername() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<RegisterUsernamePage />
		</Suspense>
	)
}
