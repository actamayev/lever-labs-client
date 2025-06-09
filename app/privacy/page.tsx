import PrivacyPage from "../../src/page-components/privacy"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Privacy | Blue Dot Robots",
	description: "Your privacy is important to us. Read the Blue Dot Robots privacy policy to learn more.",
	path: "/privacy",
	keywords: ["privacy", "blue dot robots", "privacy policy"]
})

export default function Privacy() {
	return <PrivacyPage />
}
