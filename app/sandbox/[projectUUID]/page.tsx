import { notFound } from "next/navigation"
import { ProjectUUID } from "@bluedotrobots/common-ts"
import AuthenticatedLayout from "../../../src/components/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"
import SandboxProjectPage from "../../../src/components/sandbox/sandbox-project/sandbox-project-page"

interface SandboxProjectPageProps {
    params: {
        projectUUID: ProjectUUID
    }
}

export function generateMetadata({ params }: SandboxProjectPageProps) {
	return createMetadata({
		title: "Sandbox Project",
		// eslint-disable-next-line max-len
		description: "Create, save, and edit custom Pip robot programs with an intuitive block-based or text coding interface in your personal project workspace.",
		path: `/sandbox/${params.projectUUID}`,
		keywords: ["custom robot programs", "project workspace", "saved coding projects"]
	})
}

export default function CustomSandboxProjectPage({ params }: SandboxProjectPageProps) {
	const { projectUUID } = params

	// Basic validation - adjust regex based on your UUID format
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!projectUUID || !/^[a-fA-F0-9-]{36}$/.test(projectUUID)) {
		notFound()
	}

	return (
		<AuthenticatedLayout>
			<SandboxProjectPage projectUUID={projectUUID} />
		</AuthenticatedLayout>
	)
}
