"use client"

import isEqual from "lodash-es/isEqual"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import studentClass from "../../classes/student-class"

export default async function sendDinoScore(dinoScore: number): Promise<void> {
	try {
		const hubId = studentClass.getHubId()
		if (!hubId) return
		const sendDinoScoreResponse = await leverLabsApiClient.studentDataService.sendDinoScore(dinoScore, hubId)
		if (!isEqual(sendDinoScoreResponse.status, 200) || isNonSuccessResponse(sendDinoScoreResponse.data)) {
			throw Error("Unable to send dino score")
		}

	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to send dino score",
			description: "Please try again"
		})
	}
}
