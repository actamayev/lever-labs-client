"use client"

import { UUID } from "crypto"
import { action, makeAutoObservable } from "mobx"
import { ClassCode, DeletedHub, UpdatedHubSlideId, StudentViewHubData } from "@bluedotrobots/common-ts"
import careerQuestClass from "./career-quest-class"

class StudentClass {
	public isRetrievingStudentData = false
	public retrievedStudentData = false
	public classroomData: StudentClassroomDataWithHubs[] = []
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

	// eslint-disable-next-line complexity
	public updateHubSlideId = action((updatedHubSlideId: UpdatedHubSlideId): void => {
		const classroom = this.classroomData.find((classroomData): boolean => classroomData.classCode === updatedHubSlideId.classCode)
		if (!classroom) return
		const hub = classroom.activeHubs.find((activeHub): boolean => activeHub.hubId === updatedHubSlideId.hubId)
		if (!hub) return

		// Parse navigation command from slideId
		// Format can be: "command:actualSlideId" or "command_with_params:actualSlideId" or just "actualSlideId"
		const slideIdWithCommand = updatedHubSlideId.newSlideId
		let navigationCommand: string | null = null
		let actualSlideId = slideIdWithCommand

		// Handle morphing commands which have format: "advance_morph:morphingTextId:actualSlideId"
		if (slideIdWithCommand.startsWith("advance_morph:") || slideIdWithCommand.startsWith("back_morph:")) {
			const parts = slideIdWithCommand.split(":")
			if (parts.length >= 3) {
				navigationCommand = `${parts[0]}:${parts[1]}` // "advance_morph:morphingTextId"
				actualSlideId = parts[2] // The actual slide ID
			}
		} else {
			// Handle other commands with format: "command:actualSlideId"
			const colonIndex = slideIdWithCommand.indexOf(":")
			if (colonIndex !== -1) {
				navigationCommand = slideIdWithCommand.substring(0, colonIndex)
				actualSlideId = slideIdWithCommand.substring(colonIndex + 1)
			}
		}

		// Update hub slide ID with actual slide ID (for UI display)
		hub.slideId = actualSlideId

		// Only trigger navigation if student is in this hub
		if (!hub.isHubJoined) return

		// Set student to focus mode when receiving hub updates
		this.setIsInFocusMode(true)

		// Execute navigation command if available, otherwise fall back to direct positioning
		if (navigationCommand) {
			const commandSuccess = careerQuestClass.executeNavigationCommand(hub.careerUUID, navigationCommand, actualSlideId)
			if (!commandSuccess) {
				console.warn("Navigation command failed, falling back to direct positioning:", {
					careerUUID: hub.careerUUID,
					command: navigationCommand,
					slideId: actualSlideId
				})
				// Fallback to direct positioning
				careerQuestClass.navigateToPosition(hub.careerUUID, actualSlideId)
			}
		} else {
			// No command, use direct positioning (backward compatibility)
			const navigationSuccess = careerQuestClass.navigateToPosition(hub.careerUUID, actualSlideId)
			if (!navigationSuccess) {
				console.warn("Failed to navigate student to hub position:", {
					careerUUID: hub.careerUUID,
					slideId: actualSlideId
				})
			}
		}
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

	public getHubId = (): UUID | null => {
		if (this.classroomData.length === 0) return null
		return this.classroomData[0].activeHubs[0].hubId
	}

	public logout(): void {
		this.setClassroomData([])
		this.setIsStudentDataRetrieved(false)
		this.setIsRetrievingStudentData(false)
		this.setIsInFocusMode(false)
	}
}

const studentClass = new StudentClass()

export default studentClass
