import Arcade from "../../src/components/arcade/arcade"
import AuthenticatedLayout from "../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../src/utils/seo/create-metadata"

export const metadata = createMetadata({
	title: "Arcade",

	description: "Play games with Pip to learn about coding and robotics.",
	path: "/arcade",
	keywords: ["robotics adventure", "coding challenges", "purpose discovery"]
})

export default function ArcadePage(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<Arcade />
		</AuthenticatedLayout>
	)
}
