import AuthenticatedLayout from "../../../src/components/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"
import SandboxProjectPage from "../../../src/components/sandbox/sandbox-project/sandbox-project-page"

export const metadata = createMetadata({
	title: "Sandbox Project",
	// eslint-disable-next-line max-len
	description: "Create, save, and edit custom Pip robot programs with an intuitive block-based or text coding interface in your personal project workspace.",
	path: "/sandbox", // This will be the base path, the actual path includes the dynamic projectUUID
	keywords: ["custom robot programs", "project workspace", "saved coding projects"]
})

export default function CustomSandboxProjectPage() {
	return (
		<AuthenticatedLayout>
			<SandboxProjectPage />
		</AuthenticatedLayout>
	)
}
