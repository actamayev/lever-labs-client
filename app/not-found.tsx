import Missing from "@/page-components/missing"
import { createMetadata } from "@/utils/seo/create-metadata"

export const metadata = createMetadata({
	title: "Page Not Found",
	// eslint-disable-next-line max-len
	description: "We couldn't find the page you're looking for. Return to the Lever Labs homepage to continue your robotics learning journey.",
	path: "/404",
	keywords: ["page not found", "navigation help", "robotics site map"],
	noIndex: true
})

export default function NotFoundPage(): React.ReactNode {
	return <Missing />
}
