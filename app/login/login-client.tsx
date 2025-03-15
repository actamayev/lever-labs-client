// app/login/login-client.tsx
"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the LoginPage component
const LoginPage = dynamic(() => import("../../src/test/auth/login-page"), {
	ssr: false,
	loading: () => <div>Loading...</div>
})

export default function LoginClient() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<LoginPage />
		</Suspense>
	)
}
