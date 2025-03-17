import RegisterUsernameWrapper from "./register-username-wrapper"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Register Username",
	description: "Choose your unique username for Blue Dot Robots to personalize your learning experience and start building with Pip.",
	path: "/register-username",
	keywords: ["username creation", "account setup", "personalized learning"]
})

export default function RegisterUsername() {
	return <RegisterUsernameWrapper />
}
