"use client"

import { action, makeAutoObservable } from "mobx"
import { ClassCode, StudentClassroomData } from "@bluedotrobots/common-ts"

class StudentClass {
	public isRetrievingStudentData = false
	public retrievedStudentData = false
	public classroomData: StudentClassroomData[] = []

	constructor() {
		makeAutoObservable(this)
	}

	public setIsRetrievingStudentData = action((newState: boolean): void => {
		this.isRetrievingStudentData = newState
	})

	private setIsStudentDataRetrieved = action((newState: boolean): void => {
		this.retrievedStudentData = newState
	})

	public setRetrievedStudentData = action((retrievedData: StudentClassroomData[]): void => {
		this.setIsStudentDataRetrieved(true)
		this.setIsRetrievingStudentData(false)
		this.setClassroomData(retrievedData)
	})

	private setClassroomData = action((classroomInfo: StudentClassroomData[]): void => {
		this.classroomData = classroomInfo
	})

	public addClassroomData = action((classroomInfo: StudentClassroomData): void => {
		this.classroomData.push(classroomInfo)
	})

	public getClassroomData = (classCode: ClassCode): StudentClassroomData | undefined => {
		return this.classroomData.find((classroom) => classroom.classCode === classCode)
	}

	public logout(): void {
		this.setClassroomData([])
		this.setIsStudentDataRetrieved(false)
		this.setIsRetrievingStudentData(false)
	}
}

const studentClass = new StudentClass()

export default studentClass
