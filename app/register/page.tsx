import RegisterComponent from "../../src/components/auth/register/register-component"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Register",
	description: "Create a Blue Dot Robots account to begin your robotics journey, \
	access the free Lab, and bring your code to life with Pip.",
	path: "/register",
	keywords: ["robotics account", "learning platform signup", "robot programming"]
})

export default function Register() {
	return <RegisterComponent />
}
