import AuthenticatedLayout from "../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"
import WhiteboardPage from "../../src/components/whiteboard/whiteboard-page"

export const metadata = createMetadata({
	title: "Whiteboard",
	description: "Join your classroom with a teacher's code to access assignments, \
	track your robotics learning progress, and collaborate in a guided educational environment.",
	path: "/whiteboard",
	keywords: ["classroom", "student dashboard", "whiteboard"]
})

export default function WhiteboardPageRoute(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<WhiteboardPage />
		</AuthenticatedLayout>
	)
}
