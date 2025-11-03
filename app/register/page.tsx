import { createMetadata } from "../../src/utils/seo/create-metadata"
import RegisterComponent from "../../src/components/auth/register/register-component"

export const metadata = createMetadata({
	title: "Register",
	description: "Create a Lever Labs account to help Pip discover his dream career, \
	access Career Quest for free, and bring your code to life with real robotics.",
	path: "/register",
	keywords: ["register", "learning platform signup", "sign up"]
})

export default function Register(): React.ReactNode {
	return <RegisterComponent />
}
