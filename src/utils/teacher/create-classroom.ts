"use client"

import isEqual from "lodash-es/isEqual"
import { Dispatch, SetStateAction } from "react"
import { IncomingClassroomData, ClassCode } from "@bluedotrobots/common-ts"
import { isNonSuccessResponse } from "../type-checks"
import authClass from "../../classes/auth-class"
import teacherClass from "../../classes/teacher-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function createClassroom(
	classroomData: IncomingClassroomData,
	setError: Dispatch<SetStateAction<string>>,
	setSuccess: Dispatch<SetStateAction<string>>,
	onSuccess: (classCode: ClassCode) => void
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) {
			setError("Please complete signup before creating a classroom.")
			return
		}

		setError("")
		setSuccess("")

		const createClassroomResponse = await blueDotApiClientClass.teacherDataService.createClassroom(classroomData)

		if (!isEqual(createClassroomResponse.status, 200) || isNonSuccessResponse(createClassroomResponse.data)) {
			throw Error("Unable to create classroom")
		}

		const { classCode } = createClassroomResponse.data

		// Add the new classroom to local state
		const newClassroom = {
			classroomName: classroomData.classroomName,
			classroomDescription: classroomData.classroomDescription || null,
			classCode
		}
		teacherClass.addNewClassroom(newClassroom)

		setSuccess("Classroom created successfully!")
		onSuccess(classCode)

	} catch (error) {
		console.error(error)
		setError("Unable to create classroom. Please try again.")
	}
}
