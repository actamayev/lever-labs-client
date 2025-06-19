import AuthenticatedLayout from "../../../src/components/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"
import LineFollowing from "../../../src/components/career-quest/line-following"
import CareerActivityTemplate from "../../../src/components/career-quest/career-activity-template"

export const metadata = createMetadata({
	title: "Line Following",
	// eslint-disable-next-line max-len
	description: "Guide Pip through line-following to discover its purpose in a robotics adventure.",
	path: "/career-quest/line-following",
	keywords: [
		"robotics adventure",
		"coding challenges",
		"line following robot"
	]
})

export default function LineFollowingPage() {
	return (
		<AuthenticatedLayout>
			<CareerActivityTemplate>
				<LineFollowing />
			</CareerActivityTemplate>
		</AuthenticatedLayout>
	)
}
