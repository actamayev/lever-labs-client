"use client"

import isEqual from "lodash-es/isEqual"
import { Dispatch, SetStateAction } from "react"
import { IncomingTeacherRequestData } from "@bluedotrobots/common-ts/types/api"
import { TeacherName } from "@bluedotrobots/common-ts/types/teacher"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import toastClass from "../../classes/toast-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import teacherClass from "../../classes/teacher-class"

export default async function editTeacherData(
	teacherNameData: IncomingTeacherRequestData,
	setError: Dispatch<SetStateAction<string>>,
	setSuccess: Dispatch<SetStateAction<string>>
) : Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return

		// Check if no changes were made
		if (
			teacherNameData.teacherFirstName === teacherClass.teacherData?.teacherFirstName &&
			teacherNameData.teacherLastName === teacherClass.teacherData.teacherLastName
		) {
			setError("No changes detected. Please modify your information before updating.")
			return
		}

		const { teacherFirstName, teacherLastName } = teacherNameData
		const nameOnlyData: TeacherName = { teacherFirstName, teacherLastName }

		const updateNameResponse = await blueDotApiClientClass.teacherDataService.editTeacherNameData(nameOnlyData)

		if (!isEqual(updateNameResponse.status, 200) || isErrorResponses(updateNameResponse.data)) {
			throw Error("Unable to edit teacher name data")
		}

		// Update the local data
		teacherClass.setTeacherNameData(teacherNameData.teacherFirstName, teacherNameData.teacherLastName)

		// Set success message
		setSuccess("Teacher information updated successfully!")
	} catch (error) {
		console.error(error)

		// Set error message for the UI
		setError("Unable to update teacher information. Please try again.")

		// Also show toast for additional feedback (optional - you might want to remove this)
		toastClass.negative({
			title: "Unable to edit teacher name data",
			description: "Please reload the page and try again"
		})
	}
}
