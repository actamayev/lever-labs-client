import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ClassCode } from "@lever-labs/common-ts/types/utils"
import AuthenticatedLayout from "../../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../../src/utils/seo/create-metadata"
import SingleWhiteboardPage from "../../../src/components/whiteboard-page/single-whiteboard-page"

interface ClassroomPageProps {
	params: Promise<{
		classCode: ClassCode
	}>
}

export async function generateMetadata({ params }: ClassroomPageProps): Promise<Metadata> {
	const { classCode } = await params

	return createMetadata({
		title: "Whiteboard",
		description: "View your classroom whiteboard.",
		path: `/whiteboard/${classCode}`,
		keywords: ["whiteboard", "classroom", "student tracking"]
	})
}

export default async function WhiteboardRoutePage({ params }: ClassroomPageProps): Promise<React.ReactNode> {
	const { classCode } = await params

	// Basic validation for class code format (5 uppercase letters)
	if (!classCode || !/^[A-Za-z0-9]{5}$/.test(classCode)) {
		notFound()
	}

	return (
		<AuthenticatedLayout>
			<SingleWhiteboardPage classCode={classCode} />
		</AuthenticatedLayout>
	)
}
