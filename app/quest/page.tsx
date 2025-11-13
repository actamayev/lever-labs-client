import Quest from "../../src/components/learn/learn"
import AuthenticatedLayout from "../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../src/utils/seo/create-metadata"

export const metadata = createMetadata({
	title: "Quest",
	// eslint-disable-next-line max-len
	description: "Guide Pip through coding challenges like line-following and maze-solving to discover its purpose in a robotics adventure.",
	path: "/quest",
	keywords: ["robotics adventure", "coding challenges", "purpose discovery"]
})

export default function QuestPage(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<Quest />
		</AuthenticatedLayout>
	)
}
