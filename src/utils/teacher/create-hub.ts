"use client"

import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import { CareerUUID, ClassCode, TeacherViewHubData } from "@bluedotrobots/common-ts"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import teacherClass from "../../classes/teacher-class"
import { careerData } from "../constants/career-quest/career-data"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default function useCreateHub(): (
	classCode: ClassCode,
	hubName: string,
	careerUUID: CareerUUID,
	slideId: string
) => Promise<void> {
	const navigate = useTypedNavigate()

	return useCallback(async (classCode: ClassCode, hubName: string, careerUUID: CareerUUID, slideId: string): Promise<void> => {
		try {
			if (authClass.isFinishedWithSignup === false) return

			const createHubResponse = await blueDotApiClientClass.teacherDataService.createHub(classCode, hubName, careerUUID, slideId)

			if (!isEqual(createHubResponse.status, 200) || isNonSuccessResponse(createHubResponse.data)) {
				throw Error("Unable to create hub")
			}

			// Add the new classroom to local state
			const newClassroom: TeacherViewHubData = {
				hubName, classCode, careerUUID, slideId,
				hubId: createHubResponse.data.hubId, studentsJoined: [] }
			teacherClass.createHub(newClassroom)
			teacherClass.setIsFocusingStudents(true)
			if (careerUUID === "3e5fd270-6265-4bd4-a7c9-f4fe0618332d") {
				navigate("/career-quest/meet-pip")
			} else {
				const career = careerData.find((singleCareerData): boolean => singleCareerData.careerUUID === careerUUID)
				if (career) {
					navigate(career.careerUrl)
				}
			}
		} catch (error) {
			console.error(error)
			toastClass.negative({
				title: "Unable to create hub",
				description: "Please try again"
			})
		}
	}, [navigate])
}
