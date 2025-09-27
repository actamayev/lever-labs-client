import Mission from "../../src/page-components/mission"
import LayoutOnlyWrapper from "../../src/components/layouts/layout-only-wrapper"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Mission",
	description: "Our mission at Lever Labs is to provide an accessible world-class robotics education.",
	path: "/mission",
	keywords: ["robotics accessibility", "educational innovation", "technology democratization"]
})

export default function MissionPage(): React.ReactNode {
	return (
		<LayoutOnlyWrapper>
			<Mission />
		</LayoutOnlyWrapper>
	)
}
