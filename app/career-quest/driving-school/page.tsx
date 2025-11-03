import AuthenticatedLayout from "../../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../../src/utils/seo/create-metadata"
import DRIVING_SCHOOL_CAREER from "../../../src/utils/career-quest/career-quest-right-content/driving-school-right-content"
import CareerActivityTemplate from "../../../src/components/career/career-activity-template"

export const metadata = createMetadata({
	title: "Driving School",
	description: "Learn the basics of driving a robot.",
	path: "/career-quest/driving-school",
	keywords: [
		"robotics adventure",
		"driving school",
		"introduction to robotics"
	]
})

export default function CareerQuestDrivingSchoolPage(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<CareerActivityTemplate careerData={DRIVING_SCHOOL_CAREER} />
		</AuthenticatedLayout>
	)
}
