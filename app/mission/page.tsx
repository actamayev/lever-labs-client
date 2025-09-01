import Mission from "../../src/page-components/mission"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Mission",
	description: "Our mission at Blue Dot Robots is to provide an accessible world-class robotics education.",
	path: "/mission",
	keywords: ["robotics accessibility", "educational innovation", "technology democratization"]
})

export default function MissionPage(): React.ReactNode {
	return <Mission />
}
