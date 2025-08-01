import { createMetadata } from "../../src/utils/helmet-data/create-metadata"
import RegisterComponent from "../../src/components/auth/register/register-component"

export const metadata = createMetadata({
	title: "Register",
	description: "Create a Blue Dot Robots account to help Pip discover his dream career, \
	access Career Quest for free, and bring your code to life with real robotics.",
	path: "/register",
	keywords: ["register", "learning platform signup", "robot programming"]
})

export default function Register() {
	return <RegisterComponent />
}
