import { Metadata } from "next"
import { notFound } from "next/navigation"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import AuthenticatedLayout from "../../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"
import LearnPage from "../../../src/components/learn/learn-page"

interface SandboxProjectPageProps {
	params: Promise<{
		lessonId: LessonUUID
	}>
}

export async function generateMetadata({ params }: SandboxProjectPageProps): Promise<Metadata> {
	const { lessonId } = await params
	return createMetadata({
		title: "Learn",
		// eslint-disable-next-line max-len
		description: "Create, save, and edit custom Pip programs with an intuitive block-based or text coding interface in your personal project workspace.",
		path: `/learn/${lessonId}`,
		keywords: ["custom robot programs", "project workspace", "saved coding projects"]
	})
}

export default async function CustomSandboxProjectPage({ params }: SandboxProjectPageProps): Promise<React.ReactNode> {
	const { lessonId } = await params

	// Basic validation - adjust regex based on your UUID format

	if (!lessonId || !/^[a-fA-F0-9-]{36}$/.test(lessonId)) {
		notFound()
	}

	return (
		<AuthenticatedLayout>
			<LearnPage lessonId={lessonId} />
		</AuthenticatedLayout>
	)
}
