import AuthenticatedLayout from "../../../src/components/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"
import SchoolSettingsPage from "../../../src/components/school/school-settings-page"

export const metadata = createMetadata({
	title: "School Settings",
	description: "Join classrooms by entering class codes or request to become a teacher to create and manage your own classes.",
	path: "/settings/schools",
	keywords: ["join class", "teacher request", "class code"]
})

export default function SchoolsSettings(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<SchoolSettingsPage />
		</AuthenticatedLayout>
	)
}
