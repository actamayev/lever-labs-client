import { Metadata } from "next"
import { notFound } from "next/navigation"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import AuthenticatedLayout from "../../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../../src/utils/seo/create-metadata"
import QuestPage from "../../../src/components/learn/learn-page"

interface QuestPageProps {
	params: Promise<{
		lessonId: LessonUUID
	}>
}

export async function generateMetadata({ params }: QuestPageProps): Promise<Metadata> {
	const { lessonId } = await params
	return createMetadata({
		title: "Quest",
		// eslint-disable-next-line max-len
		description: "Guide Pip through coding challenges like line-following and maze-solving to discover its purpose in a robotics adventure.",
		path: `/quest/${lessonId}`,
		keywords: ["robotics adventure", "coding challenges", "purpose discovery"]
	})
}

export default async function CustomQuestPage({ params }: QuestPageProps): Promise<React.ReactNode> {
	const { lessonId } = await params

	if (!lessonId || !/^[a-fA-F0-9-]{36}$/.test(lessonId)) {
		console.error("Invalid lessonId:", lessonId)
		notFound()
	}

	return (
		<AuthenticatedLayout>
			<QuestPage lessonId={lessonId} />
		</AuthenticatedLayout>
	)
}
