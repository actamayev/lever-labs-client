import LoginWrapper from "./login-wrapper"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Login",
	description: "Login to your Blue Dot Robots account to access Career Quest, track your progress, \
	and continue helping Pip discover his perfect robot career.",
	path: "/login",
	keywords: ["login", "educational robotics", "student dashboard"]
})

export default function Login() {
	return <LoginWrapper />
}
