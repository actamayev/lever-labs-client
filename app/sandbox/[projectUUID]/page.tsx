import AuthenticatedLayout from "../../../src/components/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"
import SandboxProjectPage from "../../../src/components/sandbox/sandbox-project/sandbox-project-page"

// TODO: Change all of this.
// The title should reflect the actual title, description needs changing
// path should be specific to the sandbox path
export const metadata = createMetadata({
	title: "Sandbox Project",
	// eslint-disable-next-line max-len
	description: "Freely control Pip with coding block primitives for open-ended exploration and experimentation in a boundless robotics playground.",
	path: "/sandbox",
	keywords: ["open robotics playground", "creative coding", "experimental learning"]
})

export default function SandboxPage() {
	return (
		<AuthenticatedLayout>
			<SandboxProjectPage />
		</AuthenticatedLayout>
	)
}
