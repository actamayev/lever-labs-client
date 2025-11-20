import AuthenticatedLayout from "../../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../../src/utils/seo/create-metadata"
import CityDriverGame from "../../../src/components/arcade/city-driver"

export const metadata = createMetadata({
	title: "City Driver",
	description: "Drive through the city using wheel encoders to steer and control speed.",
	path: "/arcade/city-driver",
	keywords: ["robotics adventure", "city driver", "wheel encoders"]
})

export default function CityDriverPage(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<CityDriverGame />
		</AuthenticatedLayout>
	)
}

