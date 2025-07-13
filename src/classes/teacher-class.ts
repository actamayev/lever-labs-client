"use client"

import { action, makeAutoObservable } from "mobx"
import { BasicTeacherClassroomData, DetailedClassroomData, ClassCode, TeacherData } from "@bluedotrobots/common-ts"
import { isNull } from "lodash-es"

class TeacherClass {
	public classroomData: BasicTeacherClassroomData[] = []
	public detailedClassroomData: Map<ClassCode, DetailedClassroomData> = new Map()
	public isRetrievingClassroomData = false
	public retrievedClassroomData = false
	public isRetrievingDetailedData = false
	public teacherData: TeacherData | null = null

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
		const classroom = this.classroomData.find((foundClassroom) => foundClassroom.classCode === classCode)
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

	public logout(): void {
		this.classroomData = []
		this.detailedClassroomData.clear()
		this.isRetrievingClassroomData = false
		this.retrievedClassroomData = false
		this.isRetrievingDetailedData = false
		this.teacherData = null
	}
}

const teacherClass = new TeacherClass()
export default teacherClass
