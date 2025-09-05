"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@bluedotrobots/common-ts"
import { isNonSuccessResponse } from "../type-checks"
import toastClass from "../../classes/toast-class"
import teacherClass from "../../classes/teacher-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function inviteStudent(
	classCode: ClassCode,
	username: string,
	setError: (error: string) => void
): Promise<boolean> {
	try {
		if (!username.trim()) {
			setError("Username is required")
			return false
		}

		const inviteResponse = await blueDotApiClientClass.teacherDataService.inviteStudentJoinClass(classCode, username.trim())

		if (!isEqual(inviteResponse.status, 200) || isNonSuccessResponse(inviteResponse.data)) {
			throw Error("Unable to invite student")
		}

		// Add the invited student to the teacher's class data
		const currentClassData = teacherClass.getDetailedClassroomData(classCode)
		if (currentClassData) {
			const updatedClassData = {
				...currentClassData,
				students: [
					...currentClassData.students,
					{ username: username.trim(), inviteStatus: "PENDING" as const }
				]
			}
			teacherClass.setDetailedClassroomData(classCode, updatedClassData)
		}

		toastClass.positive({
			title: "Student invited successfully",
			description: `Invitation sent to ${username}`
		})

		return true
	} catch (error) {
		console.error(error)
		setError("Unable to invite student. Please check the username and try again.")
		return false
	}
}
