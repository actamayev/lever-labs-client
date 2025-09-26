"use client"

import { ClassCode, ScoreboardUUID } from "@bluedotrobots/common-ts/types/utils"
import teacherClass from "../../../classes/teacher-class"
import updateIndividualStudentLightsStatus from "../update-individual-student-lights-status"

export default async function updateTeamLightsStatus(
	classCode: ClassCode,
	scoreboardId: ScoreboardUUID,
	teamNumber: 1 | 2,
	garageLightsStatus: boolean
): Promise<void> {
	const scoreboardData = teacherClass.getScoreboardData(scoreboardId)
	if (!scoreboardData) return

	const teamStudents = teamNumber === 1 ? scoreboardData.team1Stats.students : scoreboardData.team2Stats.students

	// Update lights status for each team member
	const updatePromises = teamStudents.map((student): Promise<void> =>
		updateIndividualStudentLightsStatus(classCode, student.studentId, garageLightsStatus)
	)

	await Promise.all(updatePromises)
}
