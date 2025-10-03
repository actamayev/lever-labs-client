import { Metadata } from "next"
import { notFound } from "next/navigation"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import AuthenticatedLayout from "../../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"
import LearnPage from "../../../src/components/learn/learn-page"

interface LearnPageProps {
	params: Promise<{
		lessonId: LessonUUID
	}>
}

export async function generateMetadata({ params }: LearnPageProps): Promise<Metadata> {
	const { lessonId } = await params
	return createMetadata({
		title: "Learn",
		// eslint-disable-next-line max-len
		description: "Guide Pip through coding challenges like line-following and maze-solving to discover its purpose in a robotics adventure.",
		path: `/learn/${lessonId}`,
		keywords: ["robotics adventure", "coding challenges", "purpose discovery"]
	})
}

export default async function CustomSandboxProjectPage({ params }: LearnPageProps): Promise<React.ReactNode> {
	const { lessonId } = await params

	if (!lessonId || !/^[a-fA-F0-9-]{36}$/.test(lessonId)) {
		console.error("Invalid lessonId:", lessonId)
		notFound()
	}

	return (
		<AuthenticatedLayout>
			<LearnPage lessonId={lessonId} />
		</AuthenticatedLayout>
	)
}
