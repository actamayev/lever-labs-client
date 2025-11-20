import AuthenticatedLayout from "../../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../../src/utils/seo/create-metadata"
import FlappyBirdGame from "../../../src/components/arcade/flappy"

export const metadata = createMetadata({
	title: "Flappy Bird",
	description: "Control a bird using distance sensors and navigate through pipes.",
	path: "/arcade/flappy",
	keywords: ["robotics adventure", "flappy bird", "distance sensor"]
})

export default function FlappyPage(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<FlappyBirdGame />
		</AuthenticatedLayout>
	)
}

