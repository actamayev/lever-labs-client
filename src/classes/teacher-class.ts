"use client"
import { ClassCode, HubUUID } from "@lever-labs/common-ts/types/utils"
import isNull from "lodash-es/isNull"
import { action, makeAutoObservable } from "mobx"
import { BasicTeacherClassroomData, DetailedClassroomData,
	TeacherData } from "@lever-labs/common-ts/types/api"
import { StudentJoinedClassroom, StudentLeftHub, StudentJoinedHub} from "@lever-labs/common-ts/types/socket"
import { TeacherViewHubData } from "@lever-labs/common-ts/types/hub"
import { Scoreboard } from "@lever-labs/common-ts/types/scoreboard"

interface StudentFocusData {
	classCode: ClassCode
	hubId: HubUUID
}

class TeacherClass {
	public classroomData: BasicTeacherClassroomData[] = []
	public detailedClassroomData: Map<ClassCode, DetailedClassroomData> = new Map()
	public isRetrievingClassroomData = false
	public retrievedClassroomData = false
	public isRetrievingDetailedData = false
	public teacherData: TeacherData | null = null
	public isFocusingStudents: StudentFocusData | null = null
	public isDeleteDialogOpen = false
	public hubToDelete: TeacherViewHubData | null = null

	constructor() {
		makeAutoObservable(this)
	}

	public setIsRetrievingClassroomData(isRetrieving: boolean): void {
		this.isRetrievingClassroomData = isRetrieving
	}

	public setRetrievedClassroomData(classrooms: BasicTeacherClassroomData[]): void {
		this.classroomData = classrooms
		this.retrievedClassroomData = true
		this.isRetrievingClassroomData = false
	}

	public setIsRetrievingDetailedData(isRetrieving: boolean): void {
		this.isRetrievingDetailedData = isRetrieving
	}

	public setDetailedClassroomData(classCode: ClassCode, detailedData: DetailedClassroomData): void {
		this.detailedClassroomData.set(classCode, detailedData)
		this.isRetrievingDetailedData = false
	}

	public getDetailedClassroomData(classCode: ClassCode): DetailedClassroomData | undefined {
		return this.detailedClassroomData.get(classCode)
	}

	public addNewClassroom(classroom: BasicTeacherClassroomData): void {
		this.classroomData.push(classroom)
	}

	public editClassroomName(classCode: ClassCode, newClassroomName: string): void {
		const classroom = this.classroomData.find((foundClassroom): boolean => foundClassroom.classCode === classCode)
		if (!classroom) return
		classroom.classroomName = newClassroomName
	}

	public setTeacherData = action((teacherData: TeacherData | null): void => {
		this.teacherData = teacherData
	})

	public setTeacherNameData = action((teacherFirstName: string, teacherLastName: string): void => {
		if (isNull(this.teacherData)) return
		Object.assign(this.teacherData, { teacherFirstName, teacherLastName })
	})

	public addStudentToClassroom(studentJoinedClassroom: StudentJoinedClassroom): void {
		const classroom = this.detailedClassroomData.get(studentJoinedClassroom.classCode)
		if (!classroom) return
		classroom.students.push({
			studentId: studentJoinedClassroom.studentId,
			username: studentJoinedClassroom.studentUsername,
			garageDrivingAllowed: true,
			garageTonesAllowed: true,
			garageLightsAllowed: true,
			garageDisplayAllowed: true
		})
	}

	public addStudentToHub(studentJoinedHub: StudentJoinedHub): void {
		const classroom = this.detailedClassroomData.get(studentJoinedHub.classCode)
		if (!classroom) return
		const existingHub = classroom.activeHubs.find((activeHub): boolean => activeHub.hubId === studentJoinedHub.hubId)
		if (!existingHub) return
		existingHub.studentsJoined.push({ username: studentJoinedHub.studentUsername, userId: studentJoinedHub.studentUserId })
	}

	public removeStudentFromHub(studentJoinedHub: StudentLeftHub): void {
		const classroom = this.detailedClassroomData.get(studentJoinedHub.classCode)
		if (!classroom) return
		const existingHub = classroom.activeHubs.find((activeHub): boolean => activeHub.hubId === studentJoinedHub.hubId)
		if (!existingHub) return
		existingHub.studentsJoined = existingHub.studentsJoined.filter(
			(student): boolean => student.userId !== studentJoinedHub.studentUserId
		)
	}

	public createHub(hub: TeacherViewHubData): void {
		const classroom = this.detailedClassroomData.get(hub.classCode)
		if (!classroom) return
		classroom.activeHubs.push(hub)
	}

	public deleteHub(classCode: ClassCode, hubId: HubUUID): void {
		const classroom = this.detailedClassroomData.get(classCode)
		if (!classroom) return
		classroom.activeHubs = classroom.activeHubs.filter((activeHub): boolean => activeHub.hubId !== hubId)
	}

	public updateDrivingStatusForAllStudents(classCode: ClassCode, drivingStatus: boolean): void {
		const classroom = this.detailedClassroomData.get(classCode)
		if (!classroom) return
		classroom.students.forEach((student): void => {
			student.garageDrivingAllowed = drivingStatus
		})
	}

	public updateTonesStatusForAllStudents(classCode: ClassCode, garageTonesStatus: boolean): void {
		const classroom = this.detailedClassroomData.get(classCode)
		if (!classroom) return
		classroom.students.forEach((student): void => {
			student.garageTonesAllowed = garageTonesStatus
		})
	}

	public updateLightsStatusForAllStudents(classCode: ClassCode, garageLightsStatus: boolean): void {
		const classroom = this.detailedClassroomData.get(classCode)
		if (!classroom) return
		classroom.students.forEach((student): void => {
			student.garageLightsAllowed = garageLightsStatus
		})
	}

	public updateDisplayStatusForAllStudents(classCode: ClassCode, garageDisplayStatus: boolean): void {
		const classroom = this.detailedClassroomData.get(classCode)
		if (!classroom) return
		classroom.students.forEach((student): void => {
			student.garageDisplayAllowed = garageDisplayStatus
		})
	}

	public updateIndividualStudentDrivingStatus(classCode: ClassCode, studentId: number, garageDrivingStatus: boolean): void {
		const classroom = this.detailedClassroomData.get(classCode)
		if (!classroom) return
		const student = classroom.students.find((foundStudent): boolean => foundStudent.studentId === studentId)
		if (!student) return
		student.garageDrivingAllowed = garageDrivingStatus
	}

	public updateIndividualStudentTonesStatus(classCode: ClassCode, studentId: number, garageTonesStatus: boolean): void {
		const classroom = this.detailedClassroomData.get(classCode)
		if (!classroom) return
		const student = classroom.students.find((foundStudent): boolean => foundStudent.studentId === studentId)
		if (!student) return
		student.garageTonesAllowed = garageTonesStatus
	}

	public updateIndividualStudentLightsStatus(classCode: ClassCode, studentId: number, garageLightsStatus: boolean): void {
		const classroom = this.detailedClassroomData.get(classCode)
		if (!classroom) return
		const student = classroom.students.find((foundStudent): boolean => foundStudent.studentId === studentId)
		if (!student) return
		student.garageLightsAllowed = garageLightsStatus
	}

	public updateIndividualStudentDisplayStatus(classCode: ClassCode, studentId: number, garageDisplayStatus: boolean): void {
		const classroom = this.detailedClassroomData.get(classCode)
		if (!classroom) return
		const student = classroom.students.find((foundStudent): boolean => foundStudent.studentId === studentId)
		if (!student) return
		student.garageDisplayAllowed = garageDisplayStatus
	}

	public setIsFocusingStudents = action((isFocusing: StudentFocusData | null): void => {
		this.isFocusingStudents = isFocusing
	})

	public setIsDeleteDialogOpen = action((isOpen: boolean): void => {
		this.isDeleteDialogOpen = isOpen
	})

	public setHubToDelete = action((hub: TeacherViewHubData | null): void => {
		this.hubToDelete = hub
	})

	public createScoreboard(scoreboard: Scoreboard): void {
		const classroom = this.detailedClassroomData.get(scoreboard.classCode)
		if (!classroom) return
		classroom.scoreboards.push(scoreboard)
	}

	public getScoreboardData(scoreboardId: string): Scoreboard | undefined {
		for (const classroom of this.detailedClassroomData.values()) {
			const scoreboard = classroom.scoreboards.find((s): boolean => s.scoreboardId === scoreboardId)
			if (scoreboard) return scoreboard
		}
		return undefined
	}

	public updateScoreboardTime(scoreboardId: string, timeInSeconds: number): void {
		for (const classroom of this.detailedClassroomData.values()) {
			const scoreboard = classroom.scoreboards.find((s): boolean => s.scoreboardId === scoreboardId)
			if (scoreboard) {
				scoreboard.timeRemaining = timeInSeconds
				return
			}
		}
	}

	public updateScoreboardTeamScore(scoreboardId: string, teamNumber: 1 | 2, newScore: number): void {
		for (const classroom of this.detailedClassroomData.values()) {
			const scoreboard = classroom.scoreboards.find((s): boolean => s.scoreboardId === scoreboardId)
			if (scoreboard) {
				if (teamNumber === 1) {
					scoreboard.team1Stats.score = newScore
				} else {
					scoreboard.team2Stats.score = newScore
				}
				return
			}
		}
	}

	public deleteScoreboard(scoreboardId: string): void {
		for (const classroom of this.detailedClassroomData.values()) {
			const scoreboardIndex = classroom.scoreboards.findIndex((s): boolean => s.scoreboardId === scoreboardId)
			if (scoreboardIndex !== -1) {
				classroom.scoreboards.splice(scoreboardIndex, 1)
				return
			}
		}
	}

	public addStudentToScoreboard(scoreboardId: string, studentId: number, teamNumber: 1 | 2 = 1): void {
		for (const classroom of this.detailedClassroomData.values()) {
			const scoreboard = classroom.scoreboards.find((s): boolean => s.scoreboardId === scoreboardId)
			if (!scoreboard) continue

			const student = classroom.students.find((s): boolean => s.studentId === studentId)
			if (!student) continue

			const targetTeam = teamNumber === 1 ? scoreboard.team1Stats : scoreboard.team2Stats
			const existingStudent = targetTeam.students.find((s): boolean => s.studentId === studentId)
			if (existingStudent) continue

			targetTeam.students.push({
				studentId: student.studentId,
				username: student.username
			})
			return
		}
	}

	public removeStudentFromScoreboard(scoreboardId: string, studentId: number, teamNumber: 1 | 2): void {
		for (const classroom of this.detailedClassroomData.values()) {
			const scoreboard = classroom.scoreboards.find((s): boolean => s.scoreboardId === scoreboardId)
			if (scoreboard) {
				// Remove from both teams
				if (teamNumber === 1) {
					scoreboard.team1Stats.students = scoreboard.team1Stats.students.filter((s): boolean => s.studentId !== studentId)
				} else {
					scoreboard.team2Stats.students = scoreboard.team2Stats.students.filter((s): boolean => s.studentId !== studentId)
				}
				return
			}
		}
	}

	public getTeamDrivingStatus(classCode: ClassCode, scoreboardId: string, teamNumber: 1 | 2): boolean | null {
		const classroom = this.detailedClassroomData.get(classCode)
		if (!classroom) return null

		const scoreboard = classroom.scoreboards.find((s): boolean => s.scoreboardId === scoreboardId)
		if (!scoreboard) return null

		const teamStudents = teamNumber === 1 ? scoreboard.team1Stats.students : scoreboard.team2Stats.students
		if (teamStudents.length === 0) return null

		// Check if all team members have the same driving status
		const firstStudent = classroom.students.find((s): boolean => s.studentId === teamStudents[0].studentId)
		if (!firstStudent) return null

		const firstStatus = firstStudent.garageDrivingAllowed
		const allSameStatus = teamStudents.every((teamStudent): boolean => {
			const student = classroom.students.find((s): boolean => s.studentId === teamStudent.studentId)
			return student?.garageDrivingAllowed === firstStatus
		})

		return allSameStatus ? firstStatus : null
	}

	public getTeamLightsStatus(classCode: ClassCode, scoreboardId: string, teamNumber: 1 | 2): boolean | null {
		const classroom = this.detailedClassroomData.get(classCode)
		if (!classroom) return null

		const scoreboard = classroom.scoreboards.find((s): boolean => s.scoreboardId === scoreboardId)
		if (!scoreboard) return null

		const teamStudents = teamNumber === 1 ? scoreboard.team1Stats.students : scoreboard.team2Stats.students
		if (teamStudents.length === 0) return null

		// Check if all team members have the same lights status
		const firstStudent = classroom.students.find((s): boolean => s.studentId === teamStudents[0].studentId)
		if (!firstStudent) return null

		const firstStatus = firstStudent.garageLightsAllowed
		const allSameStatus = teamStudents.every((teamStudent): boolean => {
			const student = classroom.students.find((s): boolean => s.studentId === teamStudent.studentId)
			return student?.garageLightsAllowed === firstStatus
		})

		return allSameStatus ? firstStatus : null
	}

	public logout(): void {
		this.classroomData = []
		this.detailedClassroomData.clear()
		this.isRetrievingClassroomData = false
		this.retrievedClassroomData = false
		this.isRetrievingDetailedData = false
		this.teacherData = null
		this.isFocusingStudents = null
		this.isDeleteDialogOpen = false
		this.hubToDelete = null
	}
}

const teacherClass = new TeacherClass()

export default teacherClass
