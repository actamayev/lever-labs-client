"use client"

import isEmpty from "lodash-es/isEmpty"
import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import studentClass from "../../classes/student-class"
import blueDotApiClient from "../../classes/lever-labs-api-client-class"
import garageClass from "../../classes/garage-class"

export default async function retrieveClassrooms(): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			!isEmpty(studentClass.classroomData) ||
			studentClass.isRetrievingStudentData === true ||
			studentClass.retrievedStudentData === true
		) return

		studentClass.setIsRetrievingStudentData(true)

		const studentClassroomsResponse = await blueDotApiClient.studentDataService.retrieveStudentClassrooms()
		if (!isEqual(studentClassroomsResponse.status, 200) || isErrorResponse(studentClassroomsResponse.data)) {
			throw Error ("Unable to retrieve student classroom data")
		}
		const classroomInfo = studentClassroomsResponse.data.map((classroom): StudentClassroomDataWithHubs => ({
			...classroom,
			activeHubs: classroom.activeHubs.map((hub): ExtendedStudentViewHubData => ({ ...hub, isHubJoined: false }))
		}))
		garageClass.setStudentGarageStatuses(classroomInfo)
		studentClass.setRetrievedStudentData(classroomInfo)
	} catch (error) {
		console.error(error)
		studentClass.setIsRetrievingStudentData(false)
		return toastClass.negative({
			title: "Unable to retrieve classroom data",
			description: "Please reload the page and try again"
		})
	}
}
