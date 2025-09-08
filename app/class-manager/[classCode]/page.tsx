import { notFound } from "next/navigation"
import { ClassCode } from "@bluedotrobots/common-ts"
import ClassroomPage from "../../../src/components/classroom/classroom-page"
import AuthenticatedLayout from "../../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"
import { Metadata } from "next"

interface ClassroomPageProps {
	params: Promise<{
		classCode: ClassCode
	}>
}

export async function generateMetadata({ params }: ClassroomPageProps): Promise<Metadata> {
	const { classCode } = await params

	return createMetadata({
		title: "Class Manager",
		description: "Manage your classroom, track student progress, and assign robotics lessons.",
		path: `/class-manager/${classCode}`,
		keywords: ["classroom management", "student tracking", "teacher dashboard"]
	})
}

export default async function ClassroomRoutePage({ params }: ClassroomPageProps): Promise<React.ReactNode> {
	const { classCode } = await params

	// Basic validation for class code format (5 uppercase letters)
	if (!classCode || !/^[A-Za-z0-9]{5}$/.test(classCode)) {
		notFound()
	}

	return (
		<AuthenticatedLayout>
			<ClassroomPage classCode={classCode} />
		</AuthenticatedLayout>
	)
}
