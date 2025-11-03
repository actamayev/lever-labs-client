import Landing from "../src/page-components/landing"
import { createMetadata } from "../src/utils/seo/create-metadata"
import { structuredData } from "../src/utils/seo/landing-data"

export const metadata = createMetadata({
	title: "Lever Labs | Duolingo for Robotics",
	// eslint-disable-next-line max-len
	description: "Learn robotics and coding with Pip, the educational robot that makes STEM fun. Bite-sized lessons, hands-on learning, no subscription fees. Perfect for ages 8+.",
	path: "/",
	keywords: [
		"educational robot",
		"learn robotics",
		"duolingo for robotics",
		"stem education",
		"coding for kids",
		"robotics platform",
		"pip robot",
		"learn to code"
	],
	needsLeverLabsSuffix: false
})

export default function Home(): React.ReactNode {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData)
				}}
			/>
			<Landing />
		</>
	)
}
