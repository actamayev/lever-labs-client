import AuthenticatedLayout from "../../../src/components/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"
import CareerActivityTemplate from "../../../src/components/career/career-activity-template"
import NewObstacleAvoidance from "../../../src/components/career/obstacle-avoidance/new-obstacle-avoidance"

export const metadata = createMetadata({
	title: "Obstacle Avoidance",
	// eslint-disable-next-line max-len
	description: "Guide Pip through smart navigation challenges as it learns to detect and avoid obstacles in its robotics adventure.",
	path: "/career-quest/obstacle-avoidance",
	keywords: [
		"coding challenges",
		"obstacle avoidance robot",
		"navigation algorithms",
	]
})

export default function ObstacleAvoidancePage() {
	return (
		<AuthenticatedLayout>
			<CareerActivityTemplate>
				<NewObstacleAvoidance />
			</CareerActivityTemplate>
		</AuthenticatedLayout>
	)
}
