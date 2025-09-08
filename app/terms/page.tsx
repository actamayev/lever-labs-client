import TermsPage from "../../src/page-components/terms"
import LayoutOnlyWrapper from "../../src/components/layouts/layout-only-wrapper"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Terms | Blue Dot Robots",
	description: "Our terms govern the use of the Blue Dot Robots website. Read our terms to find out more",
	path: "/terms",
	keywords: ["terms of service", "blue dot robots", "terms and conditions"]
})

export default function Terms(): React.ReactNode {
	return (
		<LayoutOnlyWrapper>
			<TermsPage />
		</LayoutOnlyWrapper>
	)
}
