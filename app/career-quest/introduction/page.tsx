import AuthenticatedLayout from "../../../src/components/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"
import { INTRODUCTION_CAREER } from "../../../src/utils/career-quest/career-quest-data"
import CareerActivityTemplate from "../../../src/components/career/career-activity-template"

export const metadata = createMetadata({
	title: "Career Quest Introduction",
	description: "Guide Pip through line-following to discover its purpose in a robotics adventure.",
	path: "/career-quest/introduction",
	keywords: [
		"robotics adventure",
		"coding challenges",
		"introduction to robotics"
	]
})

export default function CareerQuestIntroductionPage(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<CareerActivityTemplate careerData={INTRODUCTION_CAREER} />
		</AuthenticatedLayout>
	)
}
