import Contact from "../../src/page-components/contact"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Contact",
	description: "Reach out to the Blue Dot Robots team for support, feedback, or inquiries about Pip and our robotics education platform.",
	path: "/contact",
	keywords: ["robotics support", "educational robot help", "pip robot contact"]
})

export default function ContactPage() {
	return <Contact />
}
