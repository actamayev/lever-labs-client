import { notFound } from "next/navigation"
import { ClassCode } from "@bluedotrobots/common-ts/types/utils"

interface ScoreboardClassCodePageProps {
	params: Promise<{
		classCode: ClassCode
	}>
}

export default async function ScoreboardClassCodePage({ params }: ScoreboardClassCodePageProps): Promise<React.ReactNode> {
	const { classCode } = await params

	// Basic validation for class code format
	if (!classCode || !/^[A-Za-z0-9]{5}$/.test(classCode)) {
		notFound()
	}

	// This page should redirect to the class manager for this class
	// since there's no specific scoreboard selected
	notFound()
}
