import AuthenticatedLayout from "../../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../../src/utils/seo/create-metadata"
import PipTurretGame from "../../../src/components/arcade/turret"

export const metadata = createMetadata({
	title: "Turret",
	description: "Learn the basics of driving a robot.",
	path: "/arcade/turret",
	keywords: ["robotics adventure", "turret", "introduction to robotics"]
})

export default function TurretPage(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<PipTurretGame />
		</AuthenticatedLayout>
	)
}
