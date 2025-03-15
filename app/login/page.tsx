"use client"
import dynamic from "next/dynamic"

// Dynamically import the RegisterPage component
const LoginPage = dynamic(() => import("../../src/test/auth/login-page"), {
	ssr: false, // Set to false if it uses browser-specific APIs
})

export default function Login() {
	return (
		<LoginPage />
	)
}
