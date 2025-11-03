import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ClassCode, ScoreboardUUID } from "@lever-labs/common-ts/types/utils"
import RealScorecardPage from "../../../../src/components/scoreboard/real-scorecard-page"
import AuthenticatedLayout from "../../../../src/components/layouts/authenticated-layout"
import { createMetadata } from "../../../../src/utils/seo/create-metadata"

interface ScoreboardPageProps {
	params: Promise<{
		classCode: ClassCode
		scoreboardId: ScoreboardUUID
	}>
}

export async function generateMetadata({ params }: ScoreboardPageProps): Promise<Metadata> {
	const { classCode, scoreboardId } = await params

	return createMetadata({
		title: "Scoreboard",
		description: "View your scoreboard, track student progress, and assign robotics lessons.",
		path: `/scoreboard/${classCode}/${scoreboardId}`,
		keywords: ["scoreboard", "student tracking", "teacher dashboard"]
	})
}

export default async function ScoreboardRoutePage({ params }: ScoreboardPageProps): Promise<React.ReactNode> {
	const { classCode, scoreboardId } = await params

	// Basic validation for scoreboard id format (36 characters)
	if (!scoreboardId || !/^[A-Za-z0-9-]{36}$/.test(scoreboardId)) {
		notFound()
	}

	// Basic validation for class code format
	if (!classCode || !/^[A-Za-z0-9]{5}$/.test(classCode)) {
		notFound()
	}

	return (
		<AuthenticatedLayout>
			<RealScorecardPage classCode={classCode} scoreboardId={scoreboardId} />
		</AuthenticatedLayout>
	)
}
