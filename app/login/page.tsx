import LoginComponent from "../../src/components/auth/login/login-component"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Login",
	// eslint-disable-next-line max-len
	description: "Login to your Blue Dot Robots account to access Career Quest, track your progress, and continue helping Pip discover his perfect robot career.",
	path: "/login",
	keywords: ["login", "educational robotics", "student dashboard"]
})

// Simplified - no wrapper needed, middleware handles redirects
export default function Login() {
	return <LoginComponent />
}
