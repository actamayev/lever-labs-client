"use client"

import isEqual from "lodash-es/isEqual"
import { Dispatch, SetStateAction } from "react"
import { ClassCode } from "@bluedotrobots/common-ts/types/utils"
import { isNonSuccessResponse } from "../type-checks"
import getAuthClass from "../../classes/auth-class"
import getTeacherClass from "../../classes/teacher-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function createClassroom(
	classroomName: string,
	setError: Dispatch<SetStateAction<string>>,
	setSuccess: Dispatch<SetStateAction<string>>,
	onSuccess: (classCode: ClassCode) => void
): Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return

		setError("")
		setSuccess("")

		const createClassroomResponse = await getBlueDotApiClientClass().teacherDataService.createClassroom(classroomName)

		if (!isEqual(createClassroomResponse.status, 200) || isNonSuccessResponse(createClassroomResponse.data)) {
			throw Error("Unable to create classroom")
		}

		const { classCode } = createClassroomResponse.data

		// Add the new classroom to local state
		const newClassroom = { classroomName, classCode }
		getTeacherClass().addNewClassroom(newClassroom)

		setSuccess("Classroom created successfully!")
		onSuccess(classCode)

	} catch (error) {
		console.error(error)
		setError("Unable to create classroom. Please try again.")
	}
}
