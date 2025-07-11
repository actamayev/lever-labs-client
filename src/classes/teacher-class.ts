"use client"

import { makeAutoObservable } from "mobx"
import { BasicTeacherClassroomData, DetailedClassroomData, ClassCode } from "@bluedotrobots/common-ts"

class TeacherClass {
	public classroomData: BasicTeacherClassroomData[] = []
	public detailedClassroomData: Map<ClassCode, DetailedClassroomData> = new Map()
	public isRetrievingClassroomData = false
	public retrievedClassroomData = false
	public isRetrievingDetailedData = false

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

	public logout(): void {
		this.classroomData = []
		this.detailedClassroomData.clear()
		this.isRetrievingClassroomData = false
		this.retrievedClassroomData = false
		this.isRetrievingDetailedData = false
	}
}

const teacherClass = new TeacherClass()
export default teacherClass
