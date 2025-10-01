import Learn from "../../src/components/learn/learn"
import AuthenticatedLayout from "../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Learn",
	// eslint-disable-next-line max-len
	description: "Guide Pip through coding challenges like line-following and maze-solving to discover its purpose in a robotics adventure.",
	path: "/learn",
	keywords: ["robotics adventure", "coding challenges", "purpose discovery"]
})

export default function LearnPage(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<Learn />
		</AuthenticatedLayout>
	)
}
