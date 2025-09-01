import AuthenticatedLayout from "../../../src/components/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"
import { MEET_PIP } from "../../../src/utils/career-quest/career-quest-data"
import CareerActivityTemplate from "../../../src/components/career/career-activity-template"

export const metadata = createMetadata({
	title: "Meet",
	description: "Guide Pip through line-following to discover its purpose in a robotics adventure.",
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
