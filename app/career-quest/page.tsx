import CareerQuest from "../../src/components/career-quest/career-quest"
import AuthenticatedLayout from "../../src/components/authenticated-layout"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Career Quest",
	// eslint-disable-next-line max-len
	description: "Guide Pip through coding challenges like line-following and maze-solving to discover its purpose in a robotics adventure.",
	path: "/career-quest",
	keywords: ["robotics adventure", "coding challenges", "purpose discovery"]
})

export default function CareerQuestPage() {
	return (
		<AuthenticatedLayout>
			<CareerQuest />
		</AuthenticatedLayout>
	)
}
