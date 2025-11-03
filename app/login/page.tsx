import LoginComponent from "../../src/components/auth/login/login-component"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Login",
	// eslint-disable-next-line max-len
	description: "Sign in to your account to access the Lever Labs learning platform, track your progress, and continue helping Pip discover his perfect robot career.",
	path: "/login",
	keywords: ["login", "educational robotics", "sign in"]
})

export default function Login(): React.ReactNode {
	return <LoginComponent />
}
