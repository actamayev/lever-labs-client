import AuthenticatedLayout from "../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"
import ClassManager from "../../src/components/class-manager/class-manager-page"

export const metadata = createMetadata({
	title: "Class Manager",
	description: "Manage your classrooms, track student progress, assign robotics lessons, \
	and oversee educational activities in your teacher dashboard.",
	path: "/class-manager",
	keywords: ["teacher dashboard", "classroom management", "student tracking"]
})

export default function ClassManagerPage(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<ClassManager />
		</AuthenticatedLayout>
	)
}
