import LoginComponent from "../../src/components/auth/login/login-component"
import PublicOnlyPage from "../../src/components/layouts/public-only-page"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Login",
	// eslint-disable-next-line max-len
	description: "Sign in to your Lever Labs account to access Career Quest, track your progress, and continue helping Pip discover his perfect robot career.",
	path: "/login",
	keywords: ["login", "educational robotics", "sign in"]
})

// Simplified - no wrapper needed, middleware handles redirects
export default function Login(): React.ReactNode {
	return (
		<PublicOnlyPage>
			<LoginComponent />
		</PublicOnlyPage>
	)
}
