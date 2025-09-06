import { UUID } from "crypto"
import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import { ClassCode } from "@bluedotrobots/common-ts"
import toastClass from "../../classes/toast-class"
import studentClass from "../../classes/student-class"
import useTypedNavigate from "../navigate/use-typed-navigate"
import { isNonSuccessResponse } from "../../utils/type-checks"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { careerData, meetPipData } from "../../utils/constants/career-quest/career-data"
import careerQuestClass from "../../classes/career-quest-class"

export default function useJoinHub():(
	classCode: ClassCode,
	hubId: UUID
) => Promise<void> {
	const navigate = useTypedNavigate()

	// eslint-disable-next-line complexity
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

			// Set saved position to teacher's current location instead of resetting to beginning
			// This ensures the career quest will restore to the hub position when data loads
			const hubSlideId = joinHubResponse.data.slideId
			if (hubSlideId) {
				// Parse navigation command from slideId if present
				let actualSlideId = hubSlideId

				// Handle morphing commands which have format: "advance_morph:morphingTextId:actualSlideId"
				if (hubSlideId.startsWith("advance_morph:") || hubSlideId.startsWith("back_morph:")) {
					const parts = hubSlideId.split(":")
					// eslint-disable-next-line max-depth
					if (parts.length >= 3) {
						actualSlideId = parts[2] // The actual slide ID
					}
				} else {
					// Handle other commands with format: "command:actualSlideId"
					const colonIndex = hubSlideId.indexOf(":")
					// eslint-disable-next-line max-depth
					if (colonIndex !== -1) {
						actualSlideId = hubSlideId.substring(colonIndex + 1)
					}
				}

				// Set saved position so career quest restores to hub position when it loads
				careerQuestClass.setSavedPosition(joinHubResponse.data.careerUUID, actualSlideId)
			}

			if (joinHubResponse.data.careerUUID === meetPipData.careerUUID) {
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
