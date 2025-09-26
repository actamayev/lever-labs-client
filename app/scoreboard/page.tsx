import AuthenticatedLayout from "../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../src/utils/helmet-data/create-metadata"

export const metadata = createMetadata({
	title: "Scoreboard",
	description: "View your scoreboard, track student progress, and assign robotics lessons. \
	and oversee educational activities in your teacher dashboard.",
	path: "/scoreboard",
	keywords: ["scoreboard", "student tracking", "teacher dashboard"]
})

// This is for the /scoreboard page. Not sure what to put here (maybe a bank of available scoreboard templates)
export default function ScoreboardPage(): React.ReactNode {
	return (
		<AuthenticatedLayout>
			<div>Scoreboard</div>
		</AuthenticatedLayout>
	)
}
