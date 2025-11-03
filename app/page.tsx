import Landing from "../src/page-components/landing"
import { createMetadata } from "../src/utils/seo/create-metadata"
import { structuredData } from "../src/utils/seo/landing-data"

export const metadata = createMetadata({
	title: "Lever Labs | Duolingo for Robotics",
	// eslint-disable-next-line max-len
	description: "Duolingo for Robotics. Learn to code with Pip, the educational robot designed to make learning robotics fun and seamless. From coding basics to advanced control algorithms, start your robotics journey today.",
	path: "/",
	keywords: [
		"educational robot",
		"learn robotics",
		"duolingo for robotics",
		"stem education",
		"coding for kids",
		"robotics platform"
	],
	needsLeverLabsSuffix: false
})

export default function Home(): React.ReactNode {
	return (
		<>
			{/* Structured data for search engines */}
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
