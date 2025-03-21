/* eslint-disable max-len */
import AuthenticatedLayout from "../../../src/components/authenticated-layout"
// import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"

// export const metadata = createMetadata({
// 	title: "Line Following",
// 	// eslint-disable-next-line max-len
// 	description: "Guide Pip through coding challenges like line-following and maze-solving to discover its purpose in a robotics adventure.",
// 	path: "/career-quest/line-following",
// 	keywords: ["robotics adventure", "coding challenges", "purpose discovery"]
// })

export default function LineFollowingPage() {
	return (
		<AuthenticatedLayout>
			<>Line following</>
		</AuthenticatedLayout>
	)
}
