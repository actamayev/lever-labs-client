"use client"

import isEmpty from "lodash-es/isEmpty"
import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import getAuthClass from "../../classes/auth-class"
import getToastClass from "../../classes/toast-class"
import getStudentClass from "../../classes/student-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function retrieveClassrooms(): Promise<void> {
	try {
		if (
			getAuthClass().isFinishedWithSignup === false ||
			!isEmpty(getStudentClass().classroomData) ||
			getStudentClass().isRetrievingStudentData === true ||
			getStudentClass().retrievedStudentData === true
		) return

		getStudentClass().setIsRetrievingStudentData(true)

		const studentClassroomsResponse = await getBlueDotApiClientClass().studentDataService.retrieveStudentClassrooms()
		if (!isEqual(studentClassroomsResponse.status, 200) || isErrorResponse(studentClassroomsResponse.data)) {
			throw Error ("Unable to retrieve student classroom data")
		}
		const classroomInfo = studentClassroomsResponse.data.map((classroom): StudentClassroomDataWithHubs => ({
			...classroom,
			activeHubs: classroom.activeHubs.map((hub): ExtendedStudentViewHubData => ({ ...hub, isHubJoined: false }))
		}))
		getStudentClass().setRetrievedStudentData(classroomInfo)
	} catch (error) {
		console.error(error)
		getStudentClass().setIsRetrievingStudentData(false)
		return getToastClass().negative({
			title: "Unable to retrieve classroom data",
			description: "Please reload the page and try again"
		})
	}
}
