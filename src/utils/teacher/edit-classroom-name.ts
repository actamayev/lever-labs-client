"use client"

import isEqual from "lodash-es/isEqual"
import { Dispatch, SetStateAction } from "react"
import { ClassCode } from "@actamayev/lever-labs-common-ts/types/utils"
import authClass from "../../classes/auth-class"
import { isNonSuccessResponse } from "../type-checks"
import teacherClass from "../../classes/teacher-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

export default async function editClassroomName(
	classCode: ClassCode,
	newClassroomName: string,
	setError: Dispatch<SetStateAction<string>>
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		setError("")

		const editClassroomNameResponse = await leverLabsApiClient.teacherDataService.editClassroomName(newClassroomName, classCode)

		if (!isEqual(editClassroomNameResponse.status, 200) || isNonSuccessResponse(editClassroomNameResponse.data)) {
			throw Error("Unable to edit classroom name")
		}

		teacherClass.editClassroomName(classCode, newClassroomName)
	} catch (error) {
		console.error(error)
		setError("Unable to edit classroom name. Please try again.")
	}
}
