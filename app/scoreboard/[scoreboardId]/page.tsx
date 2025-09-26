import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ScoreboardUUID } from "@bluedotrobots/common-ts/types/utils"
import RealScorecardPage from "../../../src/components/scoreboard/real-scorecard-page"
import AuthenticatedLayout from "../../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../../src/utils/helmet-data/create-metadata"

interface ScoreboardPageProps {
	params: Promise<{
		scoreboardId: ScoreboardUUID
	}>
}

export async function generateMetadata({ params }: ScoreboardPageProps): Promise<Metadata> {
	const { scoreboardId } = await params

	return createMetadata({
		title: "Scoreboard",
		description: "View your scoreboard, track student progress, and assign robotics lessons.",
		path: `/scoreboard/${scoreboardId}`,
		keywords: ["scoreboard", "student tracking", "teacher dashboard"]
	})
}

export default async function ScoreboardRoutePage({ params }: ScoreboardPageProps): Promise<React.ReactNode> {
	const { scoreboardId } = await params

	// Basic validation for scoreboard id format (36 characters)
	if (!scoreboardId || !/^[A-Za-z0-9-]{36}$/.test(scoreboardId)) {
		notFound()
	}

	return (
		<AuthenticatedLayout>
			<RealScorecardPage scoreboardId={scoreboardId} />
		</AuthenticatedLayout>
	)
}
