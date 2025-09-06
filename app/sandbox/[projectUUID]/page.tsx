import { Metadata } from "next"
import { notFound } from "next/navigation"
import { SandboxProjectUUID } from "@bluedotrobots/common-ts"
import AuthenticatedLayout from "../../../src/components/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"
import SandboxProjectPage from "../../../src/components/sandbox/sandbox-project/sandbox-project-page"

interface SandboxProjectPageProps {
	params: Promise<{
		projectUUID: SandboxProjectUUID
	}>
}

export async function generateMetadata({ params }: SandboxProjectPageProps): Promise<Metadata> {
	const { projectUUID } = await params
	return createMetadata({
		title: "Sandbox Project",
		// eslint-disable-next-line max-len
		description: "Create, save, and edit custom Pip programs with an intuitive block-based or text coding interface in your personal project workspace.",
		path: `/sandbox/${projectUUID}`,
		keywords: ["custom robot programs", "project workspace", "saved coding projects"]
	})
}

export default async function CustomSandboxProjectPage({ params }: SandboxProjectPageProps): Promise<React.ReactNode> {
	const { projectUUID } = await params

	// Basic validation - adjust regex based on your UUID format

	if (!projectUUID || !/^[a-fA-F0-9-]{36}$/.test(projectUUID)) {
		notFound()
	}

	return (
		<AuthenticatedLayout>
			<SandboxProjectPage projectUUID={projectUUID} />
		</AuthenticatedLayout>
	)
}
