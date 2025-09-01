import CommunityGuidelines from "../../src/page-components/community-guidelines"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Community Guidelines | Blue Dot Robots",
	description: "Blue Dot Robots is a passionate community of robotics learners. \
	Read the guidelines for joining and contributing to the community.",
	path: "/community-guidelines",
	keywords: ["community guidelines", "blue dot robots", "contribute to community"]
})

export default function CommunityGuidelinesPage(): React.ReactNode {
	return <CommunityGuidelines />
}
