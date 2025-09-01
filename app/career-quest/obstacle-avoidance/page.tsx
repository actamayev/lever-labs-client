import AuthenticatedLayout from "../../../src/components/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"
import CareerActivityTemplate from "../../../src/components/career/career-activity-template"
import { OBSTACLE_AVOIDANCE_CAREER } from "../../../src/utils/career-quest/career-quest-data"

export const metadata = createMetadata({
	title: "Obstacle Avoidance",
	description: "Guide Pip through smart navigation challenges as it learns to detect and avoid obstacles in its robotics adventure.",
	path: "/career-quest/obstacle-avoidance",
	keywords: [
		"coding challenges",
		"obstacle avoidance robot",
		"navigation algorithms",
	]
})

export default function ObstacleAvoidancePage(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<CareerActivityTemplate careerData={OBSTACLE_AVOIDANCE_CAREER} />
		</AuthenticatedLayout>
	)
}
