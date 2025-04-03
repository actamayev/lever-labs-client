import AuthenticatedLayout from "../../src/components/authenticated-layout"
import TheGaragePage from "../../src/components/garage/the-garage-page"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Garage",
	// eslint-disable-next-line max-len
	description: "Monitor Pip's vital stats, check battery levels, manage WiFi connectivity, adjust volume settings, and access real-time sensor data in this comprehensive dashboard for your robot companion.",
	path: "/garage",
	keywords: ["robot dashboard", "sensor monitoring", "robot settings"]
})

export default function TheGarage() {
	return (
		<AuthenticatedLayout>
			<TheGaragePage />
		</AuthenticatedLayout>
	)
}
