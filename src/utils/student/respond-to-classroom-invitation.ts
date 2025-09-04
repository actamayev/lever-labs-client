"use client"

import isEqual from "lodash-es/isEqual"
import { ClassCode, InviteResponse } from "@bluedotrobots/common-ts"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import studentClass from "../../classes/student-class"
import { isErrorResponse } from "../../utils/type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function respondToClassroomInvitation(
	classCode: ClassCode,
	inviteResponse: "accept" | "decline"
): Promise<boolean> {
	try {
		if (authClass.isFinishedWithSignup === false) return false

		const response = await blueDotApiClientClass.studentDataService.respondToClassroomInvitation(
			classCode,
			inviteResponse
		)

		if (!isEqual(response.status, 200) || isErrorResponse(response.data)) {
			throw Error("Unable to respond to classroom invitation")
		}

		// Update the classroom data based on the response
		const classroomData = studentClass.getClassroomData(classCode)
		if (classroomData) {
			if (inviteResponse === "accept") {
				// Update the invitation status to accepted
				const updatedClassroomData = {
					...classroomData,
					invitationStatus: "ACCEPTED" as const
				}
				studentClass.updateClassroomData(classCode, updatedClassroomData)

				toastClass.positive({
					title: "Invitation accepted",
					description: `You've successfully joined ${classroomData.classroomName}`
				})
			} else {
				// Remove the classroom from the student's data if declined
				studentClass.removeClassroomData(classCode)

				toastClass.positive({
					title: "Invitation declined",
					description: `You've declined the invitation to ${classroomData.classroomName}`
				})
			}
		}

		return true
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to respond to invitation",
			description: "Please reload the page and try again"
		})
		return false
	}
}
