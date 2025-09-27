import Contact from "../../src/page-components/contact"
import LayoutOnlyWrapper from "../../src/components/layouts/layout-only-wrapper"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Contact",
	description: "Reach out to the Lever Labs team for support, feedback, or inquiries about Pip and our robotics education platform.",
	path: "/contact",
	keywords: ["robotics support", "educational robot help", "contact"]
})

export default function ContactPage(): React.ReactNode {
	return (
		<LayoutOnlyWrapper>
			<Contact />
		</LayoutOnlyWrapper>
	)
}
