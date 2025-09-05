"use client"

import isNull from "lodash-es/isNull"
import { action, makeAutoObservable } from "mobx"
import { BasicTeacherClassroomData, DetailedClassroomData, ClassCode, TeacherViewHubData,
	TeacherData, StudentJoinedClassroom, StudentJoinedHub, StudentLeftHub } from "@bluedotrobots/common-ts"
import { UUID } from "crypto"

interface StudentFocusData {
	classCode: ClassCode
	hubId: UUID
}

class TeacherClass {
	public classroomData: BasicTeacherClassroomData[] = []
	public detailedClassroomData: Map<ClassCode, DetailedClassroomData> = new Map()
	public isRetrievingClassroomData = false
	public retrievedClassroomData = false
	public isRetrievingDetailedData = false
	public teacherData: TeacherData | null = null
	public isFocusingStudents: StudentFocusData | null = null

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
		classroom.students.push({ username: studentJoinedClassroom.studentUsername, inviteStatus: "ACCEPTED" })
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
		existingHub.studentsJoined = existingHub.studentsJoined.filter((student): boolean => student.userId !== studentJoinedHub.studentUserId)
	}

	public createHub(hub: TeacherViewHubData): void {
		const classroom = this.detailedClassroomData.get(hub.classCode)
		if (!classroom) return
		classroom.activeHubs.push(hub)
	}

	public deleteHub(classCode: ClassCode, hubId: UUID): void {
		const classroom = this.detailedClassroomData.get(classCode)
		if (!classroom) return
		classroom.activeHubs = classroom.activeHubs.filter((activeHub): boolean => activeHub.hubId !== hubId)
	}

	public setIsFocusingStudents = action((isFocusing: StudentFocusData | null): void => {
		this.isFocusingStudents = isFocusing
	})

	public logout(): void {
		this.classroomData = []
		this.detailedClassroomData.clear()
		this.isRetrievingClassroomData = false
		this.retrievedClassroomData = false
		this.isRetrievingDetailedData = false
		this.teacherData = null
		this.isFocusingStudents = null
	}
}

const teacherClass = new TeacherClass()
export default teacherClass
