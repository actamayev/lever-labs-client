import { notFound } from "next/navigation"
import { ClassCode } from "@bluedotrobots/common-ts"
import AuthenticatedLayout from "../../../src/components/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"
import ClassroomPage from "../../../src/components/classroom/classroom-page"

interface ClassroomPageProps {
	params: {
		classCode: ClassCode
	}
}

export function generateMetadata({ params }: ClassroomPageProps) {
	return createMetadata({
		title: `Classroom ${params.classCode}`,
		description: "Manage your classroom, track student progress, and assign robotics lessons.",
		path: `/c/${params.classCode}`,
		keywords: ["classroom management", "student tracking", "teacher dashboard"]
	})
}

export default function ClassroomRoutePage({ params }: ClassroomPageProps) {
	const { classCode } = params

	// Basic validation for class code format (5 uppercase letters)
	if (!classCode || !/^[A-Z]{5}$/.test(classCode)) {
		notFound()
	}

	return (
		<AuthenticatedLayout>
			<ClassroomPage classCode={classCode} />
		</AuthenticatedLayout>
	)
}
