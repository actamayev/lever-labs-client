import CommunityGuidelines from "../../src/page-components/community-guidelines"
import LayoutOnlyWrapper from "../../src/components/layouts/layout-only-wrapper"
import { createMetadata } from "../../src/utils/seo/create-metadata"

export const metadata = createMetadata({
	title: "Community Guidelines",
	description: "Lever Labs is a passionate community of robotics learners. \
	Read the guidelines for joining and contributing to the community.",
	path: "/community-guidelines",
	keywords: ["community guidelines", "lever labs", "contribute to community"]
})

export default function CommunityGuidelinesPage(): React.ReactNode {
	return (
		<LayoutOnlyWrapper>
			<CommunityGuidelines />
		</LayoutOnlyWrapper>
	)
}
