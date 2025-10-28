import Landing from "../src/page-components/landing"
import { createMetadata } from "../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Lever Labs | The best way to learn robotics is with Pip",
	// eslint-disable-next-line max-len
	description: "Explore Pip, the educational robot designed to make learning robotics fun and seamless. From coding basics to advanced control algorithms, start your robotics journey today.",
	path: "/",
	keywords: ["educational robot", "learn robotics", "coding for beginners"],
	needsLeverLabsSuffix: false
})

export default function Home(): React.ReactNode {
	return <Landing />
}
