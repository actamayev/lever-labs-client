"use client"

import isEqual from "lodash-es/isEqual"
import { Dispatch, SetStateAction } from "react"
import { ClassCode } from "@lever-labs/common-ts/types/utils"
import { isNonSuccessResponse } from "../type-checks"
import authClass from "../../classes/auth-class"
import teacherClass from "../../classes/teacher-class"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"

export default async function createClassroom(
	classroomName: string,
	setError: Dispatch<SetStateAction<string>>,
	setSuccess: Dispatch<SetStateAction<string>>,
	onSuccess: (classCode: ClassCode) => void
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		setError("")
		setSuccess("")

		const createClassroomResponse = await blueDotApiClient.teacherDataService.createClassroom(classroomName)

		if (!isEqual(createClassroomResponse.status, 200) || isNonSuccessResponse(createClassroomResponse.data)) {
			throw Error("Unable to create classroom")
		}

		const { classCode } = createClassroomResponse.data

		// Add the new classroom to local state
		const newClassroom = { classroomName, classCode }
		teacherClass.addNewClassroom(newClassroom)

		setSuccess("Classroom created successfully!")
		onSuccess(classCode)

	} catch (error) {
		console.error(error)
		setError("Unable to create classroom. Please try again.")
	}
}
