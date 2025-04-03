import AuthenticatedLayout from "../../src/components/authenticated-layout"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"
import TheSandboxPage from "../../src/components/sandbox/the-sandbox-page"

export const metadata = createMetadata({
	title: "Sandbox",
	// eslint-disable-next-line max-len
	description: "Freely control Pip with coding block primitives for open-ended exploration and experimentation in a boundless robotics playground.",
	path: "/sandbox",
	keywords: ["open robotics playground", "creative coding", "experimental learning"]
})

export default function SandboxPage() {
	return (
		<AuthenticatedLayout>
			<TheSandboxPage />
		</AuthenticatedLayout>
	)
}
