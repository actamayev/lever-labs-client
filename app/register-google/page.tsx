
import RegisterGoogleInfoComponent from "../../src/components/auth/register-google-info/register-google-info-component"
import { createMetadata } from "../../src/utils/seo/create-metadata"

export const metadata = createMetadata({
	title: "Register Username",
	description: "Choose your unique username for Lever Labs to personalize your learning experience and start building with Pip.",
	path: "/register-google",
	keywords: ["username creation", "account setup", "google signup"]
})

export default function RegisterGoogle(): React.ReactNode {
	return <RegisterGoogleInfoComponent />
}
