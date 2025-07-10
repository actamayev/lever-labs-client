import AuthenticatedLayout from "../../src/components/authenticated-layout"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"
import StudentPage from "../../src/components/student/student-page"

export const metadata = createMetadata({
	title: "Student",
	description: "Join your classroom with a teacher's code to access assignments, \
	track your robotics learning progress, and collaborate in a guided educational environment.",
	path: "/student",
	keywords: ["classroom", "student dashboard", "educational robotics"]
})

export default function StudentPageRoute() {
	return (
		<AuthenticatedLayout>
			<StudentPage />
		</AuthenticatedLayout>
	)
}
