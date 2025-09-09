import SchoolsPage from "../../src/page-components/schools"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"
import LayoutOnlyWrapper from "../../src/components/layouts/layout-only-wrapper"

export const metadata = createMetadata({
	title: "Schools | Blue Dot Robots",
	// eslint-disable-next-line max-len
	description: "Bring fun, accessible robotics education to your classroom with Pip! A complete curriculum that adapts to each student's pace, with easy progress tracking for teachers.",
	path: "/schools",
	keywords: ["classroom robotics", "robotics curriculum", "progress tracking"]
})

export default function Schools(): React.ReactNode {
	return (
		<LayoutOnlyWrapper>
			<SchoolsPage />
		</LayoutOnlyWrapper>
	)
}
