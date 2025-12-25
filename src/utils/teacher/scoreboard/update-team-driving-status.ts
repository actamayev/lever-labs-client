"use client"

import { ClassCode, ScoreboardUUID } from "@actamayev/lever-labs-common-ts/types/utils"
import teacherClass from "../../../classes/teacher-class"
import updateIndividualStudentDrivingStatus from "../update-individual-student-driving-status"

export default async function updateTeamDrivingStatus(
	classCode: ClassCode,
	scoreboardId: ScoreboardUUID,
	teamNumber: 1 | 2,
	garageDrivingStatus: boolean
): Promise<void> {
	const scoreboardData = teacherClass.getScoreboardData(scoreboardId)
	if (!scoreboardData) return

	const teamStudents = teamNumber === 1 ? scoreboardData.team1Stats.students : scoreboardData.team2Stats.students

	// Update driving status for each team member
	const updatePromises = teamStudents.map((student): Promise<void> =>
		updateIndividualStudentDrivingStatus(classCode, student.studentId, garageDrivingStatus)
	)

	await Promise.all(updatePromises)
}
