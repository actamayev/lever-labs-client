"use client"

import { UUID } from "crypto"
import { action, makeAutoObservable } from "mobx"
import { ClassCode, StudentInviteJoinClass,
	StudentViewHubData, DeletedHub, UpdatedHubSlideId } from "@bluedotrobots/common-ts"

class StudentClass {
	public isRetrievingStudentData = false
	public retrievedStudentData = false
	public classroomData: StudentClassroomDataWithHubs[] = []
	public pendingInvites: StudentInviteJoinClass[] = []
	public isInFocusMode = false

	constructor() {
		makeAutoObservable(this)
	}

	public setIsRetrievingStudentData = action((newState: boolean): void => {
		this.isRetrievingStudentData = newState
	})

	private setIsStudentDataRetrieved = action((newState: boolean): void => {
		this.retrievedStudentData = newState
	})

	public setRetrievedStudentData = action((retrievedData: StudentClassroomDataWithHubs[]): void => {
		this.setIsStudentDataRetrieved(true)
		this.setIsRetrievingStudentData(false)
		this.setClassroomData(retrievedData)
	})

	private setClassroomData = action((classroomInfo: StudentClassroomDataWithHubs[]): void => {
		this.classroomData = classroomInfo
	})

	public addClassroomData = action((classroomInfo: StudentClassroomDataWithHubs): void => {
		this.classroomData.push(classroomInfo)
	})

	public getClassroomData = (classCode: ClassCode): StudentClassroomDataWithHubs | undefined => {
		return this.classroomData.find((classroom): boolean => classroom.classCode === classCode)
	}

	public updateClassroomData = action((classCode: ClassCode, updatedData: StudentClassroomDataWithHubs): void => {
		const index = this.classroomData.findIndex((classroom): boolean => classroom.classCode === classCode)
		if (index !== -1) {
			this.classroomData[index] = updatedData
		}
	})

	public removeClassroomData = action((classCode: ClassCode): number => {
		this.classroomData = this.classroomData.filter((classroom): boolean => classroom.classCode !== classCode)
		return this.classroomData.length
	})

	public addPendingInvite = action((pendingInvite: StudentInviteJoinClass): void => {
		this.pendingInvites.push(pendingInvite)
	})

	private getHubData = (classCode: ClassCode, hubId: UUID): StudentViewHubData | undefined => {
		const classroom = this.classroomData.find((classroomData): boolean => classroomData.classCode === classCode)
		if (!classroom) return
		return classroom.activeHubs.find((hub): boolean => hub.hubId === hubId)
	}

	public addNewHub = action((newHub: StudentViewHubData): void => {
		const classroom = this.classroomData.find((classroomData): boolean => classroomData.classCode === newHub.classCode)
		if (!classroom) return
		if (this.getHubData(newHub.classCode, newHub.hubId)) return
		classroom.activeHubs.push({ ...newHub, isHubJoined: false })
	})

	public updateHubSlideId = action((updatedHubSlideId: UpdatedHubSlideId): void => {
		const classroom = this.classroomData.find((classroomData): boolean => classroomData.classCode === updatedHubSlideId.classCode)
		if (!classroom) return
		const hub = classroom.activeHubs.find((activeHub): boolean => activeHub.hubId === updatedHubSlideId.hubId)
		if (!hub) return
		hub.slideId = updatedHubSlideId.newSlideId
	})

	public deleteHub = action((deletedHub: DeletedHub): void => {
		const classroom = this.classroomData.find((classroomData): boolean => classroomData.classCode === deletedHub.classCode)
		if (!classroom) return
		classroom.activeHubs = classroom.activeHubs.filter((activeHub): boolean => activeHub.hubId !== deletedHub.hubId)
		this.setIsInFocusMode(false)
	})

	public checkIfStudentInHub = (classCode: ClassCode, hubId: UUID): boolean => {
		const classroom = this.classroomData.find((classroomData): boolean => classroomData.classCode === classCode)
		if (!classroom) return false
		return classroom.activeHubs.some((activeHub): boolean => (activeHub.hubId === hubId) && activeHub.isHubJoined)
	}

	public joinHub = action((joinedHub: StudentViewHubData): void => {
		const classroom = this.classroomData.find((classroomData): boolean => classroomData.classCode === joinedHub.classCode)
		if (!classroom) return
		const existingHub = classroom.activeHubs.find((activeHub): boolean => activeHub.hubId === joinedHub.hubId)
		if (existingHub) {
			existingHub.isHubJoined = true
		} else {
			classroom.activeHubs.push({ ...joinedHub, isHubJoined: true })
		}
	})

	public leaveHub = action((classCode: ClassCode, hubId: UUID): void => {
		const classroom = this.classroomData.find((classroomData): boolean => classroomData.classCode === classCode)
		if (!classroom) return
		classroom.activeHubs = classroom.activeHubs.map((activeHub): ExtendedStudentViewHubData => {
			if (activeHub.hubId === hubId) {
				return { ...activeHub, isHubJoined: false }
			}
			return activeHub
		})
	})

	public setIsInFocusMode = action((newState: boolean): void => {
		this.isInFocusMode = newState
	})

	public setPendingInvites = action((pendingInvites: StudentInviteJoinClass[]): void => {
		this.pendingInvites = pendingInvites
	})

	public logout(): void {
		this.setClassroomData([])
		this.setIsStudentDataRetrieved(false)
		this.setIsRetrievingStudentData(false)
		this.setIsInFocusMode(false)
		this.setPendingInvites([])
	}
}

const studentClass = new StudentClass()

export default studentClass
