import AuthenticatedLayout from "../../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"
import { MEET_PIP } from "../../../src/utils/career-quest/career-quest-data"
import CareerActivityTemplate from "../../../src/components/career/career-activity-template"

export const metadata = createMetadata({
	title: "Meet Pip",
	description: "Learn the basics of programming, sensors, and robotics concepts as you begin your robotics journey.",
	path: "/career-quest/meet-pip",
	keywords: [
		"robotics adventure",
		"meet pip",
		"introduction to robotics"
	]
})

export default function CareerQuestMeetPipPage(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<CareerActivityTemplate careerData={MEET_PIP} />
		</AuthenticatedLayout>
	)
}
