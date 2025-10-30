import Landing from "../src/page-components/landing"
import { createMetadata } from "../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Lever Labs | Duolingo for Robotics",
	// eslint-disable-next-line max-len
	description: "Duolingo for Robotics. Learn to code your own robots with Pip, the educational robot designed to make learning robotics fun and seamless. From coding basics to advanced control algorithms, start your robotics journey today.",
	path: "/",
	keywords: ["educational robot", "learn robotics", "duolingo for robotics"],
	needsLeverLabsSuffix: false
})

export default function Home(): React.ReactNode {
	return <Landing />
}
