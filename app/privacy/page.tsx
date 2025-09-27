import PrivacyPage from "../../src/page-components/privacy"
import LayoutOnlyWrapper from "../../src/components/layouts/layout-only-wrapper"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Privacy",
	description: "Your privacy is important to us. Read the Lever Labs privacy policy to learn more.",
	path: "/privacy",
	keywords: ["privacy", "lever labs", "privacy policy"]
})

export default function Privacy(): React.ReactNode {
	return (
		<LayoutOnlyWrapper>
			<PrivacyPage />
		</LayoutOnlyWrapper>
	)
}
