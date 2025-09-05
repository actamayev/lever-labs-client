import { UUID } from "crypto"
import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@bluedotrobots/common-ts"
import toastClass from "../../classes/toast-class"
import studentClass from "../../classes/student-class"
import useTypedNavigate from "../navigate/use-typed-navigate"
import { isNonSuccessResponse } from "../../utils/type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { careerData } from "../../utils/constants/career-quest/career-data"
import careerQuestClass from "../../classes/career-quest-class"

export default function useJoinHub():(
	classCode: ClassCode,
	hubId: UUID
) => Promise<void> {
	const navigate = useTypedNavigate()

	return useCallback(async (classCode: ClassCode, hubId: UUID): Promise<void> => {
		try {
			const isStudentInHub = studentClass.checkIfStudentInHub(classCode, hubId)
			if (isStudentInHub) {
				toastClass.positive({
					title: "You're already in this hub"
				})
				return
			}
			const joinHubResponse = await blueDotApiClientClass.studentDataService.joinHub(classCode, hubId)
			if (!isEqual(joinHubResponse.status, 200) || isNonSuccessResponse(joinHubResponse.data)) {
				throw Error("Unable to join hub")
			}

			studentClass.joinHub(joinHubResponse.data)
			
			// Position student at teacher's current location instead of resetting to beginning
			const hubSlideId = joinHubResponse.data.slideId
			if (hubSlideId) {
				// Parse navigation command from slideId if present (format: "command:actualSlideId" or just "actualSlideId")
				const colonIndex = hubSlideId.indexOf(":")
				const actualSlideId = colonIndex !== -1 ? hubSlideId.substring(colonIndex + 1) : hubSlideId
				careerQuestClass.navigateToPosition(joinHubResponse.data.careerUUID, actualSlideId)
			}
			
			if (joinHubResponse.data.careerUUID === "3e5fd270-6265-4bd4-a7c9-f4fe0618332d") {
				navigate("/career-quest/meet-pip")
			} else {
				const careerUUID = joinHubResponse.data.careerUUID
				const career = careerData.find((singleCareerData): boolean => singleCareerData.careerUUID === careerUUID)
				if (career) {
					navigate(career.careerUrl)
				}
			}
		} catch (error) {
			console.error(error)
			toastClass.negative({
				title: "Unable to join hub",
				description: "Please try again"
			})
		}
	}, [navigate])
}
