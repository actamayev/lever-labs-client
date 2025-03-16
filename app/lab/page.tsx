import TheLabPage from "../../src/components/lab/lab-structure/the-lab-page"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Lab",
	// eslint-disable-next-line max-len
	description: "Explore guided tutorials, videos, and challenges to learn about the fundamental components of robotics, including robot sensors, motors, and basic control mechanisms, in a structured learning environment.",
	path: "/lab",
	keywords: ["interactive robotics", "coding tutorials", "hands-on learning"]
})

export default function TheLab() {
	return <TheLabPage />
}
