import Mission from "../../src/test/support/mission"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Mission",
	// eslint-disable-next-line max-len
	description: "Our mission at Blue Dot Robots is to provide an accessible world-class robotics education.",
	path: "/mission",
	keywords: ["robotics accessibility", "educational innovation", "technology democratization"]
})

export default function MissionPage() {
	return <Mission />
}
