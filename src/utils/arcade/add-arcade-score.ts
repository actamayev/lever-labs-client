"use client"

import isEqual from "lodash-es/isEqual"
import { ArcadeGameType } from "@actamayev/lever-labs-common-ts/types/arcade"
import { isNonSuccessResponse } from "../type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import toastClass from "../../classes/toast-class"

export default async function addArcadeScore(arcadeGameName: ArcadeGameType, score: number): Promise<void> {
	try {
		const response = await leverLabsApiClient.arcadeDataService.addArcadeScore(arcadeGameName, score)

		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			throw new Error("Failed to add arcade score")
		}
	} catch (error) {
		console.error(error)
		toastClass.negative({ title: "Failed to save score", description: "Please try again later" })
	}
}
